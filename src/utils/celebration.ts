import { DayLog } from '../types';

/**
 * Batch 1.3 — منطق نقي لـ«لحظة إنجاز اليوم»:
 * الاحتفال يظهر مرة واحدة فقط، لليوم الحالي فقط، عند وصول النقاط إلى 100.
 */

export interface CelebrationInput {
  scoreTotal: number;
  /** التاريخ المعروض حاليًا (YYYY-MM-DD) */
  currentDate: string;
  /** تاريخ اليوم الفعلي (YYYY-MM-DD) */
  todayDate: string;
  /** هل عُرض الاحتفال لهذا اليوم من قبل؟ (DayLog.celebrationShown) */
  alreadyShown?: boolean;
  /** أيام التجميد نتيجتها 100 تقنيًا لكنها ليست إنجاز التزام */
  isFreezeDay?: boolean;
}

export function shouldShowCelebration(input: CelebrationInput): boolean {
  if (input.alreadyShown) return false;
  if (input.isFreezeDay) return false;
  if (input.currentDate !== input.todayDate) return false;
  return input.scoreTotal >= 100;
}

/** نسخة من السجل بعد تعليمه بأن الاحتفال عُرض — تُحفظ فورًا لمنع التكرار. */
export function markCelebrationShown(day: DayLog): DayLog {
  return { ...day, celebrationShown: true };
}
