import { describe, it, expect, beforeEach } from 'vitest';

// بذرة تخزين داخل الذاكرة لمحاكاة localStorage/sessionStorage في بيئة Node
function makeStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => (map.has(k) ? (map.get(k) as string) : null),
    setItem: (k: string, v: string) => void map.set(k, String(v)),
    removeItem: (k: string) => void map.delete(k),
    clear: () => map.clear(),
    _map: map,
  };
}

const local = makeStorage();
const session = makeStorage();
(globalThis as unknown as { localStorage: unknown }).localStorage = local;
(globalThis as unknown as { sessionStorage: unknown }).sessionStorage = session;

import {
  hasCoachPin,
  setupCoachPin,
  unlockCoachSession,
  isCoachSessionUnlocked,
  logoutCoachSession,
  getRemainingAttempts,
} from '../src/utils/coachAuth';

beforeEach(() => {
  local.clear();
  session.clear();
});

describe('coachAuth — no default PINs exist anymore', () => {
  it('rejects the old hardcoded PINs when nothing is set up', async () => {
    for (const pin of ['32184', '12345']) {
      const res = await unlockCoachSession(pin);
      expect(res.ok).toBe(false);
      if (!res.ok) expect(res.needsSetup).toBe(true);
    }
    expect(isCoachSessionUnlocked()).toBe(false);
  });
});

describe('coachAuth — first-time setup', () => {
  it('rejects mismatched confirmation', async () => {
    const res = await setupCoachPin('56789', '56788');
    expect(res.ok).toBe(false);
    expect(hasCoachPin()).toBe(false);
  });

  it('rejects PINs shorter than 5 digits', async () => {
    const res = await setupCoachPin('123', '123');
    expect(res.ok).toBe(false);
    expect(hasCoachPin()).toBe(false);
  });

  it('accepts a valid setup and then unlocks with the same PIN', async () => {
    const setup = await setupCoachPin('56789', '56789');
    expect(setup.ok).toBe(true);
    expect(hasCoachPin()).toBe(true);

    const res = await unlockCoachSession('56789');
    expect(res.ok).toBe(true);
    expect(isCoachSessionUnlocked()).toBe(true);

    logoutCoachSession();
    expect(isCoachSessionUnlocked()).toBe(false);
  });

  it('setup is refused when a PIN already exists', async () => {
    await setupCoachPin('56789', '56789');
    const again = await setupCoachPin('99999', '99999');
    expect(again.ok).toBe(false);
  });

  it('stored value is a salted v2 hash, not the PIN itself', async () => {
    await setupCoachPin('56789', '56789');
    const values = [...local._map.values()];
    const hashValue = values.find((v) => v.startsWith('v2$'));
    expect(hashValue).toBeTruthy();
    expect(values.join(' ')).not.toContain(':56789');
    expect(hashValue).not.toContain('56789');
  });
});

describe('coachAuth — wrong PIN handling and lockout', () => {
  it('wrong PIN decrements remaining attempts', async () => {
    await setupCoachPin('56789', '56789');
    const res = await unlockCoachSession('00000');
    expect(res.ok).toBe(false);
    expect(getRemainingAttempts()).toBe(4);
  });

  it('locks out after 5 wrong attempts', async () => {
    await setupCoachPin('56789', '56789');
    let last;
    for (let i = 0; i < 5; i++) {
      last = await unlockCoachSession('00000');
    }
    expect(last?.ok).toBe(false);
    if (last && !last.ok) expect(last.lockedSeconds).toBeGreaterThan(0);
    // حتى الرمز الصحيح مرفوض أثناء القفل
    const duringLock = await unlockCoachSession('56789');
    expect(duringLock.ok).toBe(false);
  });
});
