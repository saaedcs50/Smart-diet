import { StorageKeys, brandStorageSlug } from './storageKeys';

const LOCAL_OFFLINE_TOKEN = 'local-offline';

function tokenKey() {
  return StorageKeys.coachSessionToken();
}
function unlockKey() {
  return StorageKeys.coachUnlocked();
}
function pinHashKey() {
  return StorageKeys.coachPinHash();
}

export function getCoachSessionToken(): string | null {
  try {
    const t = sessionStorage.getItem(tokenKey());
    if (!t || t === LOCAL_OFFLINE_TOKEN) return null;
    return t;
  } catch {
    return null;
  }
}

export function isCoachSessionUnlocked(): boolean {
  try {
    return sessionStorage.getItem(unlockKey()) === 'true';
  } catch {
    return false;
  }
}

export function isLocalOfflineCoachSession(): boolean {
  try {
    return sessionStorage.getItem(tokenKey()) === LOCAL_OFFLINE_TOKEN;
  } catch {
    return false;
  }
}

export type CoachUnlockResult =
  | { ok: true; offline?: boolean }
  | { ok: false; error: string };

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function pinHashPayload(pin: string): string {
  return `clinidiet:${brandStorageSlug()}:coach-pin:${pin}`;
}

async function storePinHash(pin: string): Promise<void> {
  try {
    const hash = await sha256Hex(pinHashPayload(pin));
    localStorage.setItem(pinHashKey(), hash);
  } catch {
    // ignore quota
  }
}

async function matchesStoredPinHash(pin: string): Promise<boolean> {
  try {
    const stored = localStorage.getItem(pinHashKey());
    if (!stored) return false;
    const hash = await sha256Hex(pinHashPayload(pin));
    return stored === hash;
  } catch {
    return false;
  }
}

function unlockLocalOffline(): void {
  sessionStorage.setItem(tokenKey(), LOCAL_OFFLINE_TOKEN);
  sessionStorage.setItem(unlockKey(), 'true');
}

function isNetworkOrServerFailure(res?: Response): boolean {
  if (!res) return true;
  return res.status === 404 || res.status === 408 || res.status >= 500;
}

/**
 * يفتح جلسة الأخصائي عبر السيرفر (COACH_PIN).
 * لو السيرفر غير متاح: يتحقق من هاش PIN محفوظ بعد أول دخول ناجح (بدون تخزين الرقم نفسه).
 */
export async function unlockCoachSession(pin: string): Promise<CoachUnlockResult> {
  const trimmed = String(pin || '').trim();
  if (!trimmed) {
    return { ok: false, error: 'أدخل رمز PIN.' };
  }

  try {
    const res = await fetch('/api/coach-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: trimmed }),
    });

    let data: { ok?: boolean; token?: string; error?: string } = {};
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (res.ok && data.ok && data.token) {
      sessionStorage.setItem(tokenKey(), data.token);
      sessionStorage.setItem(unlockKey(), 'true');
      await storePinHash(trimmed);
      return { ok: true };
    }

    if (!isNetworkOrServerFailure(res)) {
      return {
        ok: false,
        error: data.error || (res.status === 429
          ? 'تم إيقاف المحاولات مؤقتًا. حاول لاحقًا.'
          : 'رمز PIN غير صحيح.'),
      };
    }

    return fallbackOfflineUnlock(trimmed);
  } catch {
    return fallbackOfflineUnlock(trimmed);
  }
}

async function fallbackOfflineUnlock(pin: string): Promise<CoachUnlockResult> {
  const ok = await matchesStoredPinHash(pin);
  if (ok) {
    unlockLocalOffline();
    return { ok: true, offline: true };
  }
  const hasHash = !!localStorage.getItem(pinHashKey());
  if (!hasHash) {
    return {
      ok: false,
      error:
        'تعذر الاتصال بالخادم. أول دخول للوحة يحتاج إنترنت. بعد نجاح أول مرة يمكن الفتح بدون سيرفر بنفس الرمز.',
    };
  }
  return { ok: false, error: 'رمز PIN غير صحيح.' };
}

export async function logoutCoachSession(): Promise<void> {
  const token = getCoachSessionToken();
  try {
    if (token) {
      await fetch('/api/coach-session', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-coach-session': token,
        },
        body: JSON.stringify({ token }),
      });
    }
  } catch {
    // ignore
  } finally {
    try {
      sessionStorage.removeItem(tokenKey());
      sessionStorage.removeItem(unlockKey());
    } catch {
      // ignore
    }
  }
}
