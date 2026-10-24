import type { NotificationSettings } from './notifications';
import { StorageKeys } from './storageKeys';

// ============================================================================
// Batch 3.3: القوالب الموسمية (رمضان) — تفعيل بتاريخ يدوي + تنبيهات ماء ليلية
// جوهر البند: عند التفعيل تُحفَظ إعدادات ماء المستخدم الحالية داخل سجل التفعيل،
// وتُطبَّق قيم موسمية ليلية؛ وعند الانتهاء (أو الإلغاء) تُستعاد المحفوظة حرفيًا
// دون فقدان. كل المنطق هنا نقي وقابل للاختبار — التخزين طبقة رقيقة فوقه.
// ============================================================================

export type WaterReminderSettings = NotificationSettings['waterReminders'];

export interface SeasonalActivation {
  presetId: string;
  /** YYYY-MM-DD — أول يوم في الموسم */
  startDate: string;
  /** YYYY-MM-DD — آخر يوم في الموسم (شامل) */
  endDate: string;
  activatedAt: string;
  /** لقطة إعدادات ماء المستخدم قبل التفعيل — تُستعاد عند الانتهاء */
  savedWaterReminders: WaterReminderSettings;
}

export type SeasonalPhase = 'upcoming' | 'active' | 'ended';

/** قيم ماء موسمية: تذكير كل ٤٥ دقيقة من بعد الإفطار (١٨) حتى ٢٣ ليلًا */
export const SEASONAL_WATER_REMINDERS: WaterReminderSettings = {
  enabled: true,
  intervalMinutes: 45,
  startHour: 18,
  endHour: 23,
};

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidSeasonRange(startDate: string, endDate: string): boolean {
  return ISO_DATE_RE.test(startDate) && ISO_DATE_RE.test(endDate) && startDate <= endDate;
}

/** مقارنة معجمية آمنة لتواريخ ISO */
export function getSeasonalPhase(activation: SeasonalActivation, todayISO: string): SeasonalPhase {
  if (todayISO < activation.startDate) return 'upcoming';
  if (todayISO > activation.endDate) return 'ended';
  return 'active';
}

export function seasonalPhaseNotice(phase: SeasonalPhase): string | null {
  switch (phase) {
    case 'upcoming':
      return 'القالب الموسمي على وشك البدء — راجِع الخطة';
    case 'ended':
      return 'القالب الموسمي انتهى — راجِع الخطة';
    case 'active':
      return 'القالب الموسمي نشط حاليًا';
    default:
      return null;
  }
}

export function buildSeasonalActivation(
  presetId: string,
  startDate: string,
  endDate: string,
  currentSettings: NotificationSettings,
  activatedAt: string = new Date().toISOString(),
): SeasonalActivation {
  return {
    presetId,
    startDate,
    endDate,
    activatedAt,
    savedWaterReminders: { ...currentSettings.waterReminders },
  };
}

/** يطبّق القيم الموسمية على نسخة جديدة من الإعدادات (لا يعدّل الأصل) */
export function applySeasonalWaterReminders(settings: NotificationSettings): NotificationSettings {
  return {
    ...settings,
    waterReminders: { ...SEASONAL_WATER_REMINDERS },
  };
}

/** يستعيد إعدادات الماء المحفوظة قبل التفعيل حرفيًا */
export function restoreSeasonalWaterReminders(
  settings: NotificationSettings,
  activation: SeasonalActivation,
): NotificationSettings {
  return {
    ...settings,
    waterReminders: { ...activation.savedWaterReminders },
  };
}

export interface SeasonalReconcileResult {
  settings: NotificationSettings;
  changed: boolean;
  /** true عندما انتهى الموسم واستُعيدت الإعدادات — على المستدعي مسح سجل التفعيل */
  cleared: boolean;
  phase: SeasonalPhase | null;
}

/**
 * مصالحة عند إقلاع التطبيق:
 * - لا سجل → لا تغيير.
 * - الموسم منتهٍ → استعادة إعدادات ما قبل التفعيل + طلب مسح السجل.
 * - الموسم نشط → ضمان تطبيق القيم الموسمية (idempotent).
 * - لم يبدأ بعد → لا تغيير (تُطبق القيم عند دخول أول يوم).
 */
export function reconcileSeasonalActivation(
  settings: NotificationSettings,
  activation: SeasonalActivation | null,
  todayISO: string,
): SeasonalReconcileResult {
  if (!activation) return { settings, changed: false, cleared: false, phase: null };
  const phase = getSeasonalPhase(activation, todayISO);
  if (phase === 'ended') {
    const restored = restoreSeasonalWaterReminders(settings, activation);
    return {
      settings: restored,
      changed: JSON.stringify(restored.waterReminders) !== JSON.stringify(settings.waterReminders),
      cleared: true,
      phase,
    };
  }
  if (phase === 'active') {
    const applied = applySeasonalWaterReminders(settings);
    return {
      settings: applied,
      changed: JSON.stringify(applied.waterReminders) !== JSON.stringify(settings.waterReminders),
      cleared: false,
      phase,
    };
  }
  return { settings, changed: false, cleared: false, phase };
}

// ---------------------------------------------------------------------------
// طبقة التخزين (localStorage) — رقيقة فوق المنطق النقي أعلاه
// ---------------------------------------------------------------------------

export function loadSeasonalActivation(): SeasonalActivation | null {
  try {
    const raw = localStorage.getItem(StorageKeys.seasonalActivation());
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SeasonalActivation;
    if (
      !parsed ||
      typeof parsed.presetId !== 'string' ||
      !isValidSeasonRange(parsed.startDate || '', parsed.endDate || '') ||
      !parsed.savedWaterReminders
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveSeasonalActivation(activation: SeasonalActivation | null): void {
  try {
    const key = StorageKeys.seasonalActivation();
    if (activation === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(activation));
  } catch {
    // تجاهل أخطاء التخزين (وضع خاص/مساحة) — التفعيل يبقى داخل الجلسة
  }
}
