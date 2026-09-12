import { StorageKeys, brandStorageSlug } from './storageKeys';

const HARDCODED_PIN = '32184';
const DEFAULT_PINS = [HARDCODED_PIN, '12345'];
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

function unlockKey() {
  return StorageKeys.coachUnlocked();
}

function pinHashKey() {
  return StorageKeys.coachPinHash();
}

function rateLimitKey() {
  return `sd_${brandStorageSlug()}_coach_rate_limit`;
}

interface RateLimitState {
  attempts: number;
  lockedUntil: number;
}

function getRateLimitState(): RateLimitState {
  try {
    const raw = localStorage.getItem(rateLimitKey());
    if (!raw) return { attempts: 0, lockedUntil: 0 };
    const parsed = JSON.parse(raw);
    return {
      attempts: typeof parsed.attempts === 'number' ? parsed.attempts : 0,
      lockedUntil: typeof parsed.lockedUntil === 'number' ? parsed.lockedUntil : 0,
    };
  } catch {
    return { attempts: 0, lockedUntil: 0 };
  }
}

function saveRateLimitState(state: RateLimitState): void {
  try {
    localStorage.setItem(rateLimitKey(), JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function getLockoutRemainingSeconds(): number {
  const state = getRateLimitState();
  if (state.lockedUntil > Date.now()) {
    return Math.ceil((state.lockedUntil - Date.now()) / 1000);
  }
  return 0;
}

export function isCoachLockedOut(): boolean {
  return getLockoutRemainingSeconds() > 0;
}

export function getRemainingAttempts(): number {
  const state = getRateLimitState();
  if (isCoachLockedOut()) return 0;
  return Math.max(0, MAX_ATTEMPTS - state.attempts);
}

export function isCoachSessionUnlocked(): boolean {
  try {
    return sessionStorage.getItem(unlockKey()) === 'true';
  } catch {
    return false;
  }
}

export type CoachUnlockResult =
  | { ok: true }
  | { ok: false; error: string; remainingAttempts?: number; lockedSeconds?: number };

async function sha256Hex(text: string): Promise<string> {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const data = new TextEncoder().encode(text);
      const buf = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }
  } catch {
    // fallback below
  }
  // simple fallback hash
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return `h_${hash}`;
}

function pinHashPayload(pin: string): string {
  return `clinidiet:${brandStorageSlug()}:local-pin:${pin.trim()}`;
}

export async function setCoachCustomPin(newPin: string): Promise<boolean> {
  const trimmed = String(newPin || '').trim();
  if (!trimmed || trimmed.length < 4) return false;
  try {
    const hash = await sha256Hex(pinHashPayload(trimmed));
    localStorage.setItem(pinHashKey(), hash);
    return true;
  } catch {
    return false;
  }
}

/**
 * يتحقق من صحة رمز الـ PIN محليًا بالكامل بدون أي اتصال بالإنترنت أو الخادم
 * مع تطبيق Rate Limiting محلي (5 محاولات كحد أقصى ثم قفل لمدة 5 دقائق)
 */
export async function unlockCoachSession(pin: string): Promise<CoachUnlockResult> {
  const trimmed = String(pin || '').trim();
  if (!trimmed) {
    return { ok: false, error: 'يرجى إدخال رمز PIN للدخول.' };
  }

  // 1. فحص الـ Rate Limiting
  const remainingLockout = getLockoutRemainingSeconds();
  if (remainingLockout > 0) {
    const mins = Math.floor(remainingLockout / 60);
    const secs = remainingLockout % 60;
    const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return {
      ok: false,
      error: `تم إيقاف المحاولات مؤقتًا بسبب تكرار المحاولات الخاطئة. يرجى الانتظار (${timeFormatted}).`,
      lockedSeconds: remainingLockout,
      remainingAttempts: 0,
    };
  }

  // 2. فحص الرمز محليًا
  let isCorrect = false;

  const customStoredHash = localStorage.getItem(pinHashKey());
  if (customStoredHash) {
    const inputHash = await sha256Hex(pinHashPayload(trimmed));
    if (customStoredHash === inputHash) {
      isCorrect = true;
    }
  }

  // إذا لم يكن هناك PIN مخصص أو تطابق مع الرموز الافتراضية المعتمدة
  if (!isCorrect) {
    if (DEFAULT_PINS.includes(trimmed)) {
      isCorrect = true;
      // حفظ الهاش محليًا للمرات القادمة
      try {
        const hash = await sha256Hex(pinHashPayload(trimmed));
        localStorage.setItem(pinHashKey(), hash);
      } catch {
        // ignore
      }
    }
  }

  // 3. في حالة النجاح
  if (isCorrect) {
    // تصفير عداد المحاولات الخاطئة
    saveRateLimitState({ attempts: 0, lockedUntil: 0 });
    try {
      sessionStorage.setItem(unlockKey(), 'true');
    } catch {
      // ignore
    }
    return { ok: true };
  }

  // 4. في حالة الخطأ -> زيادة عداد المحاولات
  const state = getRateLimitState();
  const nextAttempts = state.attempts + 1;

  if (nextAttempts >= MAX_ATTEMPTS) {
    const lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    saveRateLimitState({ attempts: 0, lockedUntil });
    return {
      ok: false,
      error: 'تم تجاوز الحد الأقصى للمحاولات (5 محاولات). تم قفل الدخول مؤقتًا لمدة 5 دقائق لحماية البيانات.',
      remainingAttempts: 0,
      lockedSeconds: 300,
    };
  } else {
    saveRateLimitState({ attempts: nextAttempts, lockedUntil: 0 });
    const remaining = MAX_ATTEMPTS - nextAttempts;
    return {
      ok: false,
      error: `رمز PIN غير صحيح. متبقي ${remaining} ${remaining === 1 ? 'محاولة واحدة' : 'محاولات'} قبل القفل المؤقت.`,
      remainingAttempts: remaining,
    };
  }
}

export function logoutCoachSession(): void {
  try {
    sessionStorage.removeItem(unlockKey());
  } catch {
    // ignore
  }
}

