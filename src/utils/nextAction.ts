import { DayLog, MealItem, PlanConfig } from '../types';
import { getAllScheduledDoses, MedicationDoseSlotInstance } from './medications';

/**
 * Batch 1.2 — استخراج مشترك لمنطق «الإجراء التالي».
 * مصدر الحقيقة الواحد الذي يعمل به NextMealSpotlight و QuickActionBar معًا،
 * حتى لا يتكرر منطق اختيار الوجبة/الدواء التالي في مكانين.
 */

/** هل سُجّلت هذه الوجبة؟ (نفس قاعدة NextMealSpotlight القائمة) */
export function isMealLogged(day: DayLog, mealId: string): boolean {
  const log = day.meals?.[mealId];
  return !!log && (!!log.eval || log.type === 'alt');
}

/** الوجبة التالية غير المسجلة، أو null لو اكتملت كل الوجبات. */
export function getNextMeal(plan: PlanConfig, day: DayLog): MealItem | null {
  if (!plan.meals || plan.meals.length === 0) return null;
  return plan.meals.find((meal) => !isMealLogged(day, meal.id)) || null;
}

/** الجرعة التالية غير المأخوذة (تُستبعد جرعات «عند اللزوم» لأنها بلا موعد)، أو null. */
export function getNextMedication(plan: PlanConfig, day: DayLog): MedicationDoseSlotInstance | null {
  const items = plan.medicationPlan?.items || [];
  if (items.length === 0) return null;
  const scheduled = getAllScheduledDoses(items).filter((d) => !d.isPRN);
  return scheduled.find((dose) => day.medications?.[dose.key]?.status !== 'taken') || null;
}

export interface QuickActionState {
  nextMeal: MealItem | null;
  nextMedication: MedicationDoseSlotInstance | null;
  /** اكتملت الوجبات والأدوية المجدولة معًا */
  allDone: boolean;
}

export function getQuickActionState(plan: PlanConfig, day: DayLog): QuickActionState {
  const nextMeal = getNextMeal(plan, day);
  const nextMedication = getNextMedication(plan, day);
  return {
    nextMeal,
    nextMedication,
    allDone: nextMeal === null && nextMedication === null,
  };
}

/** تعليم الوجبة كمأخوذة — يعكس سلوك NextMealSpotlight تمامًا. */
export function markMealDone(day: DayLog, mealId: string): DayLog {
  return {
    ...day,
    meals: {
      ...day.meals,
      [mealId]: {
        ...(day.meals?.[mealId] || {}),
        eval: 'yes',
        type: 'default',
        protein: true,
        veggies: true,
      },
    },
  };
}

/** تعليم جرعة كمأخوذة — يعكس سلوك MedicationsTracker. */
export function markMedicationTaken(day: DayLog, doseKey: string, now: Date = new Date()): DayLog {
  const currentEntry = day.medications?.[doseKey];
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  return {
    ...day,
    medications: {
      ...(day.medications || {}),
      [doseKey]: {
        ...(currentEntry || {}),
        status: 'taken',
        time: currentEntry?.time || timeStr,
        loggedAt: now.getTime(),
      },
    },
  };
}

/** إضافة كوب ماء (250 مل افتراضيًا) — يعكس سلوك WaterTracker. */
export function addWaterCup(day: DayLog, amountMl: number = 250): DayLog {
  return {
    ...day,
    water: Math.max(0, (day.water || 0) + amountMl),
    waterLogs: (day.waterLogs || 0) + (amountMl > 0 ? 1 : 0),
  };
}
