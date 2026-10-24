import { DayLog, PlanConfig } from '../types';
import { parseLocalDate, getTodayDateString } from './storage';
import { StorageKeys } from './storageKeys';
import { hasAnyDayActivity } from './streakReminder';

/**
 * Batch 1.5 — «عودة بعد غياب».
 * بلا سحابة: الاستقبال يحدث داخل التطبيق نفسه على جهاز العميل،
 * والأخصائية ترى «آخر نشاط» فقط عندما تفتح اللوحة على الجهاز نفسه.
 */

/** آخر تاريخ (YYYY-MM-DD) فيه أي نشاط مسجل، أو null لو لا يوجد. */
export function findLastActivityDate(logs: Record<string, DayLog>): string | null {
  const dates = Object.keys(logs)
    .filter((dateStr) => hasAnyDayActivity(logs[dateStr]))
    .sort();
  return dates.length > 0 ? dates[dates.length - 1] : null;
}

export interface AbsenceGap {
  lastActivityDate: string | null;
  /** عدد الأيام بين آخر نشاط واليوم (0 لو النشاط اليوم نفسه) */
  gapDays: number;
}

export function computeAbsenceGap(logs: Record<string, DayLog>, todayDate: string): AbsenceGap {
  const lastActivityDate = findLastActivityDate(logs);
  if (!lastActivityDate) return { lastActivityDate: null, gapDays: 0 };
  const last = parseLocalDate(lastActivityDate).getTime();
  const today = parseLocalDate(todayDate).getTime();
  const gapDays = Math.max(0, Math.round((today - last) / (1000 * 60 * 60 * 24)));
  return { lastActivityDate, gapDays };
}

/**
 * تظهر البطاقة مرة واحدة لكل فجوة:
 * الفجوة ≥ 3 أيام، ولم تُعرض من قبل لنفس تاريخ آخر نشاط.
 */
export function shouldShowWelcomeBack(gap: AbsenceGap, lastShownGapDate?: string | null): boolean {
  if (!gap.lastActivityDate) return false;
  if (gap.gapDays < 3) return false;
  if (lastShownGapDate === gap.lastActivityDate) return false;
  return true;
}

export function buildWelcomeBackMessage(gapDays: number): string {
  return `وحشتنا! بقالك ${gapDays} يوم — نبدأ من جديد؟`;
}

/** نص واتساب جاهز يرسله العميل العائد لأخصائيته. */
export function buildWelcomeBackWhatsAppText(plan: PlanConfig, gapDays: number): string {
  const name = plan.clientName || 'المتدرب';
  return (
    `👋 أهلاً، أنا ${name}.\n` +
    `رجعت أتابع من جديد بعد غياب ${gapDays} يوم، وجاهز أكمل خطتي من النهاردة 💪\n` +
    `📅 تاريخ العودة: ${getTodayDateString()}`
  );
}

/** قراءة/حفظ معرّف الفجوة المعروضة (تاريخ آخر نشاط) — مرة واحدة لكل فجوة. */
export function getLastWelcomeBackGapDate(): string | null {
  try {
    return localStorage.getItem(StorageKeys.lastWelcomeBackGapDate());
  } catch {
    return null;
  }
}

export function markWelcomeBackShown(gapId: string): void {
  try {
    localStorage.setItem(StorageKeys.lastWelcomeBackGapDate(), gapId);
  } catch {
    // التخزين غير متاح — البطاقة قد تظهر مجددًا، بلا أي كسر
  }
}
