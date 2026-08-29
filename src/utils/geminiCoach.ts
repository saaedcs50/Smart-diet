// Client-side helper for Coach AI tasks - All calls go strictly via /api/gemini-coach with ephemeral in-memory session token

export interface ImproveMealResult {
  ok: boolean;
  items?: string;
  alternatives?: string[];
  warnings?: string[];
  error?: string;
}

export interface AllocateDayResult {
  meals?: Array<{
    name: string;
    exchanges: Record<string, number>;
  }>;
  warnings?: string[];
  ok: boolean;
  error?: string;
}

export interface WeeklyDraftResult {
  ok: boolean;
  whatsappDraft?: string;
  error?: string;
}

// Ephemeral in-memory token (never saved to localStorage)
let activeCoachToken: string | null = null;

export function setCoachSessionToken(token: string | null) {
  activeCoachToken = token;
}

export function getCoachSessionToken(): string | null {
  return activeCoachToken;
}

/**
 * Request an ephemeral session token from the server upon coach PIN verification
 */
export async function createCoachSession(): Promise<{ ok: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch('/api/coach-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return { ok: false, error: `فشل فتح الجلسة (${res.status})` };
    }

    const data = await res.json();
    if (data.ok && data.token) {
      activeCoachToken = data.token;
      return { ok: true, token: data.token };
    }
    return { ok: false, error: 'تعذر إصدار رمز الجلسة المؤقت' };
  } catch {
    return { ok: false, error: 'تعذر الاتصال بالخادم لفتح جلسة الأخصائية' };
  }
}

/**
 * Destroy the ephemeral session token upon closing the coach modal
 */
export async function destroyCoachSession(tokenOverride?: string | null): Promise<void> {
  const token = tokenOverride || activeCoachToken;
  activeCoachToken = null;

  if (!token) return;

  try {
    await fetch('/api/coach-session', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-coach-session': token,
      },
      body: JSON.stringify({ token }),
    });
  } catch {
    // Silent catch on destroy
  }
}

/**
 * Check if the server has GEMINI_API_KEY set
 */
export async function checkGeminiStatus(): Promise<{ configured: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return { configured: false };
    const data = await res.json();
    return { configured: !!data.geminiConfigured };
  } catch {
    return { configured: false };
  }
}

/**
 * 1. Improve Meal & Generate 4 clinical alternatives
 */
export async function requestImproveMeal(
  payload: {
    mealName: string;
    exchanges: Record<string, number>;
    currentItems?: string;
    allergies?: string[];
    conditionIds?: string[];
    groupExamples?: Record<string, string[]>;
  },
  sessionToken?: string | null
): Promise<ImproveMealResult> {
  const token = sessionToken || activeCoachToken;
  if (!token) {
    return {
      ok: false,
      error: 'انتهت جلسة الأخصائية — يرجى فتح لوحة الأخصائي أولاً.',
    };
  }

  try {
    const res = await fetch('/api/gemini-coach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-coach-session': token,
      },
      body: JSON.stringify({
        task: 'improveMeal',
        payload,
      }),
    });

    if (res.status === 403) {
      return {
        ok: false,
        error: 'انتهت جلسة الأخصائية أو غير مصرح — افتحي لوحة الأخصائي أولاً.',
      };
    }

    if (!res.ok) {
      return { ok: false, error: 'تعذر الاتصال بخدمة الاقتراحات الذكية' };
    }

    const data: ImproveMealResult = await res.json();
    return data;
  } catch {
    return { ok: false, error: 'تعذر الاتصال بخدمة الاقتراحات الذكية' };
  }
}

/**
 * 2. Smart Day Exchanges Allocation based on Target Macros
 */
export async function requestAllocateDay(
  payload: {
    mealCount: number;
    mealNames: string[];
    targetCalories: number;
    targetProtein: number;
    targetCarbs: number;
    targetFats: number;
    conditionIds?: string[];
    allergies?: string[];
    groupIds: string[];
    groupMacros: Array<{
      id: string;
      calories: number;
      proteinGrams: number;
      carbsGrams: number;
      fatsGrams: number;
    }>;
  },
  sessionToken?: string | null
): Promise<AllocateDayResult> {
  const token = sessionToken || activeCoachToken;
  if (!token) {
    return {
      ok: false,
      error: 'انتهت جلسة الأخصائية — يرجى فتح لوحة الأخصائي أولاً.',
    };
  }

  try {
    const res = await fetch('/api/gemini-coach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-coach-session': token,
      },
      body: JSON.stringify({
        task: 'allocateDay',
        payload,
      }),
    });

    if (res.status === 403) {
      return {
        ok: false,
        error: 'انتهت جلسة الأخصائية أو غير مصرح — افتحي لوحة الأخصائي أولاً.',
      };
    }

    if (!res.ok) {
      return { ok: false, error: 'تعذر الاتصال بخدمة التوزيع الذكي' };
    }

    const data: AllocateDayResult = await res.json();
    return data;
  } catch {
    return { ok: false, error: 'تعذر الاتصال بخدمة التوزيع الذكي' };
  }
}

/**
 * 3. Weekly Summary Message Draft (Coach Panel Only)
 */
export async function requestWeeklyDraft(
  payload: {
    clientName: string;
    avgAdherence: number;
    bestDay: string;
    weightChange?: number | null;
    avgWater?: number | null;
    exerciseDays?: number;
    medsAdherence?: number | null;
    goal?: string;
    rangeDays?: number;
  },
  sessionToken?: string | null
): Promise<WeeklyDraftResult> {
  const token = sessionToken || activeCoachToken;
  if (!token) {
    return {
      ok: false,
      error: 'انتهت جلسة الأخصائية — يرجى فتح لوحة الأخصائي أولاً.',
    };
  }

  try {
    const res = await fetch('/api/gemini-coach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-coach-session': token,
      },
      body: JSON.stringify({
        task: 'weeklyDraft',
        payload,
      }),
    });

    if (res.status === 403) {
      return {
        ok: false,
        error: 'انتهت جلسة الأخصائية أو غير مصرح — افتحي لوحة الأخصائي أولاً.',
      };
    }

    if (!res.ok) {
      return { ok: false, error: 'تعذر الاتصال بمولد المسودة الأسبوعية' };
    }

    const data: WeeklyDraftResult = await res.json();
    return data;
  } catch {
    return { ok: false, error: 'تعذر الاتصال بمولد المسودة الأسبوعية' };
  }
}
