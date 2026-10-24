import { DayLog, PlanConfig, WeeklyFocusConfig } from '../types';
import { parseLocalDate, getTodayDateString } from './storage';
import { getEffectiveSleepHours } from './calculations';

/**
 * Batch 2.4 — هدف الأسبوع الواحد: حساب نقي للتقدم من سجلات الأسبوع.
 *
 * قواعد العرض:
 * - خلال الأسبوع (من weekStartISO حتى +6 أيام): البطاقة نشطة بتقدم جارٍ.
 * - اليوم التالي لنهاية الأسبوع (+7): تُعرض النتيجة النهائية ليوم واحد فقط.
 * - بعد ذلك: تختفي إن لم تُجدَّد من الأخصائية. وبلا هدف مضبوط: لا بطاقة أصلًا.
 * - «مخصص» يُحسب بعدّ الأيام التي ضغط فيها العميل «أنجزت اليوم»
 *   (DayLog.focusDone) — مرة واحدة في اليوم بحكم الحقل نفسه.
 */

export const WEEKLY_FOCUS_TYPE_LABELS: Record<WeeklyFocusConfig['type'], string> = {
  water: 'شرب الماء',
  sleep: 'النوم',
  meals: 'الالتزام بالوجبات',
  checklist: 'بنود المهام اليومية',
  custom: 'هدف مخصص',
};

export const WEEKLY_FOCUS_UNITS: Record<WeeklyFocusConfig['type'], string> = {
  water: 'مل',
  sleep: 'ساعة',
  meals: 'وجبة',
  checklist: 'بند',
  custom: 'يوم',
};

export function addDaysISO(dateStr: string, days: number): string {
  const d = parseLocalDate(dateStr);
  d.setDate(d.getDate() + days);
  return getTodayDateString(d);
}

/** تواريخ أيام الأسبوع السبعة بدءًا من weekStartISO. */
export function getWeekDates(weekStartISO: string): string[] {
  return Array.from({ length: 7 }, (_, i) => addDaysISO(weekStartISO, i));
}

function isMealRecorded(log: DayLog, mealId: string): boolean {
  const state = log.meals?.[mealId];
  return !!state && (state.type === 'default' || state.type === 'alt');
}

/** تقدم نوع واحد خلال أسبوع من السجلات الخام. */
export function computeFocusTypeProgress(
  focus: WeeklyFocusConfig,
  plan: PlanConfig,
  logs: Record<string, DayLog> | undefined | null
): number {
  if (!logs) return 0;
  const dates = getWeekDates(focus.weekStartISO);
  let total = 0;

  for (const date of dates) {
    const log = logs[date];
    if (!log) continue;
    switch (focus.type) {
      case 'water':
        total += log.water || 0;
        break;
      case 'sleep':
        total += getEffectiveSleepHours(log);
        break;
      case 'meals':
        (plan.meals || []).forEach((meal) => {
          if (isMealRecorded(log, meal.id)) total++;
        });
        break;
      case 'checklist':
        total += Object.values(log.checks || {}).filter(Boolean).length;
        break;
      case 'custom':
        if (log.focusDone) total++;
        break;
    }
  }
  return Math.round(total * 10) / 10;
}

export interface WeeklyFocusProgress {
  current: number;
  target: number;
  percent: number;
  completed: boolean;
}

export function computeWeeklyFocusProgress(
  focus: WeeklyFocusConfig,
  plan: PlanConfig,
  logs: Record<string, DayLog> | undefined | null
): WeeklyFocusProgress {
  const current = computeFocusTypeProgress(focus, plan, logs);
  const target = Math.max(0, focus.target || 0);
  const percent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  return { current, target, percent, completed: target > 0 && current >= target };
}

export type WeeklyFocusVisibility = 'active' | 'final-day' | 'hidden';

/** حالة عرض البطاقة في يوم معين بالنسبة لأسبوع الهدف. */
export function getWeeklyFocusVisibility(
  focus: WeeklyFocusConfig | undefined | null,
  dateISO: string
): WeeklyFocusVisibility {
  if (!focus || !focus.weekStartISO || !(focus.target > 0)) return 'hidden';
  const start = focus.weekStartISO;
  const endExclusive = addDaysISO(start, 7);
  const finalDay = addDaysISO(start, 7);
  const dayAfterFinal = addDaysISO(start, 8);
  if (dateISO >= start && dateISO < endExclusive) return 'active';
  if (dateISO >= finalDay && dateISO < dayAfterFinal) return 'final-day';
  return 'hidden';
}

/** سطر ملخص واحد للتقرير الأسبوعي. */
export function formatWeeklyFocusSummary(
  focus: WeeklyFocusConfig,
  progress: WeeklyFocusProgress
): string {
  const label = focus.type === 'custom' ? focus.label || 'هدف مخصص' : WEEKLY_FOCUS_TYPE_LABELS[focus.type];
  const unit = WEEKLY_FOCUS_UNITS[focus.type];
  const state = progress.completed ? '✅ اكتمل' : `${progress.percent}%`;
  return `🎯 هدف الأسبوع (${label}): ${progress.current}/${progress.target} ${unit} — ${state}`;
}
