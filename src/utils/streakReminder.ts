import { DayLog } from '../types';

/**
 * Batch 1.4 — منطق نقي لتنبيه «السلسلة في خطر» + كشف أي نشاط في اليوم.
 * دوال خالصة بلا أي وصول للتخزين أو المتصفح حتى تُختبر بالكامل.
 */

/** هل سجّل العميل أي نشاط يُذكر في هذا اليوم؟ */
export function hasAnyDayActivity(day?: DayLog | null): boolean {
  if (!day) return false;
  if ((day.water || 0) > 0 || (day.waterLogs || 0) > 0) return true;
  if (day.meals && Object.keys(day.meals).length > 0) return true;
  if (day.checks && Object.values(day.checks).some(Boolean)) return true;
  if (day.supps && Object.values(day.supps).some(Boolean)) return true;
  if (day.medications && Object.keys(day.medications).length > 0) return true;
  if (day.weight != null) return true;
  if (day.sleep || day.wake || day.quality || (day.sleepHours ?? 0) > 0) return true;
  if (day.mood != null) return true;
  if ((day.exercise || 0) > 0) return true;
  if ((day.notes || '').trim() !== '') return true;
  if (day.symptoms && Object.values(day.symptoms).some(Boolean)) return true;
  if ((day.consumedCalories || 0) > 0) return true;
  if (day.isFreeze) return true;
  return false;
}

export interface StreakReminderInput {
  /** المفتاح الرئيسي لمنظومة الإشعارات */
  masterEnabled: boolean;
  /** تفعيل تنبيه السلسلة نفسه */
  reminderEnabled: boolean;
  /** وقت التنبيه المضبوط (HH:mm) */
  reminderTime: string;
  /** الوقت الحالي (HH:mm) */
  currentTime: string;
  /** طول السلسلة المعرّضة للخطر (حتى أمس) */
  streak: number;
  /** سجل اليوم الحالي */
  day?: DayLog | null;
  /** إذن الإشعارات الحالي */
  permission: NotificationPermission | 'unsupported';
}

/**
 * شرط إطلاق تنبيه السلسلة:
 * مفعّل + الوقت مطابق + سلسلة ≥ 3 + لا نشاط اليوم + ليس يوم تجميد + الإذن ممنوح.
 */
export function shouldFireStreakReminder(input: StreakReminderInput): boolean {
  if (!input.masterEnabled) return false;
  if (!input.reminderEnabled) return false;
  if (input.permission !== 'granted') return false;
  if (input.reminderTime !== input.currentTime) return false;
  if (input.streak < 3) return false;
  if (input.day?.isFreeze) return false;
  if (hasAnyDayActivity(input.day)) return false;
  return true;
}

/** نص الإشعار الودي — بلا أي ضغط. */
export function buildStreakReminderMessage(streak: number): string {
  return `سلسلتك ${streak} يوم — سجّل أي حاجة بسيطة الليلة عشان تكمل`;
}
