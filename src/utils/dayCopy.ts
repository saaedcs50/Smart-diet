import { DayLog, MealLogState } from '../types';
import { createEmptyDayLog } from './storage';

/**
 * Batch 1.1 — «انسخ أمس»: بناء سجل يوم جديد من سجل الأمس.
 *
 * يُنسخ فقط ما يتكرر يوميًا بطبيعته:
 * - حالات الوجبات (بدون الجوع قبل/الشبع بعد — بيانات خاصة بيومها)
 * - جرعات الأدوية بحالة «taken» فقط
 * - الماء (الكمية وعدد مرات التسجيل)
 * - بنود قائمة المهام اليومية (checks)
 *
 * لا يُنسخ أبدًا: الوزن، القياسات، النوم، المزاج، الأعراض، الملاحظات،
 * بيانات الصيام، الرياضة، الماكروز، أو يوم التجميد — كلها خاصة بيومها.
 */

export interface CopySummary {
  mealsCount: number;
  medicationsTakenCount: number;
  waterMl: number;
  checksCount: number;
}

function sanitizeMealState(state: MealLogState): MealLogState {
  const clone: MealLogState = { ...state };
  // الجوع قبل الأكل والشبع بعده قياسات لحظية خاصة بيوم التسجيل الأصلي
  delete clone.hungerBefore;
  delete clone.fullnessAfter;
  return clone;
}

/** هل يحمل السجل أي محتوى قابل للنسخ؟ */
export function hasCopyableContent(day?: DayLog | null): boolean {
  if (!day) return false;
  if (day.meals && Object.keys(day.meals).length > 0) return true;
  if ((day.water || 0) > 0) return true;
  if (day.checks && Object.values(day.checks).some(Boolean)) return true;
  if (day.medications && Object.values(day.medications).some((e) => e?.status === 'taken')) return true;
  return false;
}

/** ملخص ما سيُنسخ — يُعرض في نافذة التأكيد قبل التنفيذ. */
export function getCopySummary(source: DayLog): CopySummary {
  return {
    mealsCount: source.meals ? Object.keys(source.meals).length : 0,
    medicationsTakenCount: source.medications
      ? Object.values(source.medications).filter((e) => e?.status === 'taken').length
      : 0,
    waterMl: source.water || 0,
    checksCount: source.checks ? Object.values(source.checks).filter(Boolean).length : 0,
  };
}

/**
 * هل اليوم الهدف فارغ أو جزئي (بالنسبة للحقول القابلة للنسخ)؟
 * يُستخدم لإظهار زر «انسخ أمس» فقط عندما تكون النسخة مفيدة.
 */
export function isDayEmptyOrPartial(day?: DayLog | null): boolean {
  if (!day) return true;
  const categoriesPresent = [
    !!day.meals && Object.keys(day.meals).length > 0,
    (day.water || 0) > 0,
    !!day.checks && Object.values(day.checks).some(Boolean),
    !!day.medications && Object.values(day.medications).some((e) => e?.status === 'taken'),
  ].filter(Boolean).length;
  return categoriesPresent < 4;
}

/**
 * يبني سجل اليوم الهدف بعد نسخ الحقول القابلة للتكرار من سجل المصدر.
 * حقول اليوم الهدف الخاصة به (وزن/نوم/...) تُحفظ كما هي من `target` إن وُجد.
 * المعامل targetDate توثيقي (تاريخ اليوم الهدف) — التاريخ نفسه يعيش في مفتاح التخزين.
 */
export function buildCopiedDayLog(source: DayLog, targetDate: string, target?: DayLog): DayLog {
  void targetDate;
  const base: DayLog = target ? { ...target } : createEmptyDayLog();

  const meals: Record<string, MealLogState> = {};
  Object.entries(source.meals || {}).forEach(([mealId, state]) => {
    if (state) meals[mealId] = sanitizeMealState(state);
  });

  const medications: NonNullable<DayLog['medications']> = {};
  Object.entries(source.medications || {}).forEach(([key, entry]) => {
    if (entry?.status === 'taken') medications[key] = { ...entry };
  });

  return {
    ...base,
    meals,
    medications,
    water: source.water || 0,
    waterLogs: source.waterLogs || 0,
    checks: { ...(source.checks || {}) },
  };
}
