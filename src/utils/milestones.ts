import { DayLog, PlanConfig } from '../types';
import { StorageKeys } from './storageKeys';
import { parseLocalDate, getTodayDateString } from './storage';
import { calculateDayScore } from './calculations';
import { hasAnyDayActivity } from './streakReminder';

/**
 * Batch 2.3 — المعالم والبشارات: تعريفات + حساب نقي من السجلات + تخزين.
 *
 * قواعد:
 * - الفتح يحدث مرة واحدة: أول تاريخ تحقّق فيه الشرط هو تاريخ الفتح المحفوظ.
 * - الحساب الرجعي عند أول تشغيل بعد التحديث: كل المعالم المتحققة من بيانات
 *   قديمة تُعلَّم مفتوحة، ويُحتفل بآخر واحدة فقط (الأحدث تاريخًا) — لا
 *   احتفالات جماعية متتالية.
 * - غياب وزن البداية يعطّل معالم نسب الخسارة فقط.
 */

export interface MilestoneDefinition {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const MILESTONE_DEFINITIONS: MilestoneDefinition[] = [
  { id: 'first_day', label: 'أول يوم مسجل', description: 'بدأت رحلتك وسجّلت أول يوم', icon: '🌱' },
  { id: 'streak_7', label: 'سلسلة 7 أيام', description: 'أسبوع كامل من الالتزام المتواصل', icon: '🔥' },
  { id: 'streak_30', label: 'سلسلة 30 يوم', description: 'شهر كامل من الالتزام المتواصل', icon: '🔥' },
  { id: 'streak_100', label: 'سلسلة 100 يوم', description: 'مائة يوم من الالتزام المتواصل', icon: '🏆' },
  { id: 'weight_loss_2', label: 'خسارة 2%', description: 'خسرت 2% من وزن البداية', icon: '📉' },
  { id: 'weight_loss_5', label: 'خسارة 5%', description: 'خسرت 5% من وزن البداية', icon: '📉' },
  { id: 'weight_loss_10', label: 'خسارة 10%', description: 'خسرت 10% من وزن البداية', icon: '🎯' },
  { id: 'logging_30', label: '30 يوم تسجيل', description: 'سجّلت نشاطك في 30 يومًا (تراكمي)', icon: '🗓️' },
  { id: 'first_report', label: 'أول تقرير مُشارك', description: 'شاركت تقريرك مع أخصائيتك لأول مرة', icon: '📤' },
];

export type MilestonesUnlocked = Record<string, string>;

function nextDateStr(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  d.setDate(d.getDate() + 1);
  return getTodayDateString(d);
}

/**
 * حساب المعالم المتحققة من كل السجلات مع تاريخ أول تحقق لكل معلم.
 * reportSharedAt: ISO datetime أو YYYY-MM-DD لأول مشاركة تقرير (إن وُجدت).
 */
export function computeMilestones(
  plan: PlanConfig,
  logs: Record<string, DayLog> | undefined | null,
  reportSharedAt?: string | null
): MilestonesUnlocked {
  const unlocked: MilestonesUnlocked = {};
  if (!logs) {
    if (reportSharedAt) unlocked['first_report'] = reportSharedAt.slice(0, 10);
    return unlocked;
  }

  const dates = Object.keys(logs).sort();
  const startWeight = plan.startWeight && plan.startWeight > 0 ? plan.startWeight : null;

  let activeDays = 0;
  let streakRun = 0;
  let prevDate: string | null = null;

  for (const date of dates) {
    const log = logs[date];
    if (!log) continue;
    const active = hasAnyDayActivity(log);

    if (active) {
      if (!unlocked['first_day']) unlocked['first_day'] = date;
      activeDays++;
      if (activeDays >= 30 && !unlocked['logging_30']) unlocked['logging_30'] = date;
    }

    // السلسلة بنفس قاعدة calculateStreak: نقاط ≥ 75 أو يوم تجميد، وأيام متتالية تقويميًا
    const qualifies = log.isFreeze || calculateDayScore(plan, log).total >= 75;
    if (qualifies) {
      streakRun = prevDate && nextDateStr(prevDate) === date ? streakRun + 1 : 1;
      if (streakRun >= 7 && !unlocked['streak_7']) unlocked['streak_7'] = date;
      if (streakRun >= 30 && !unlocked['streak_30']) unlocked['streak_30'] = date;
      if (streakRun >= 100 && !unlocked['streak_100']) unlocked['streak_100'] = date;
    } else {
      streakRun = 0;
    }
    prevDate = date;

    if (startWeight && typeof log.weight === 'number' && log.weight > 0) {
      const lossPct = ((startWeight - log.weight) / startWeight) * 100;
      if (lossPct >= 2 && !unlocked['weight_loss_2']) unlocked['weight_loss_2'] = date;
      if (lossPct >= 5 && !unlocked['weight_loss_5']) unlocked['weight_loss_5'] = date;
      if (lossPct >= 10 && !unlocked['weight_loss_10']) unlocked['weight_loss_10'] = date;
    }
  }

  if (reportSharedAt && !unlocked['first_report']) {
    unlocked['first_report'] = reportSharedAt.slice(0, 10);
  }
  return unlocked;
}

export interface MilestoneResolution {
  /** الحالة النهائية للدمج والحفظ */
  unlocked: MilestonesUnlocked;
  /** معالم لم تكن محفوظة من قبل */
  newlyUnlocked: string[];
  /** المعلم الوحيد الذي يُحتفل به الآن (الأحدث) أو null */
  celebrationId: string | null;
}

/**
 * يدمج المحفوظ مع المحسوب: تاريخ الفتح المحفوظ أولًا لا يتغيّر أبدًا.
 * الاحتفال دائمًا لمعلم واحد فقط — الأحدث بين الجدد — سواء كان التشغيل
 * رجعيًا (أول مرة) أو فتحًا حيًا جديدًا.
 */
export function resolveMilestoneState(
  stored: MilestonesUnlocked,
  computed: MilestonesUnlocked
): MilestoneResolution {
  const newlyUnlocked = Object.keys(computed).filter((id) => !(id in stored));
  const unlocked: MilestonesUnlocked = { ...computed, ...stored };

  let celebrationId: string | null = null;
  if (newlyUnlocked.length > 0) {
    const order = MILESTONE_DEFINITIONS.map((d) => d.id);
    celebrationId = [...newlyUnlocked].sort((a, b) => {
      const byDate = (computed[a] || '').localeCompare(computed[b] || '');
      return byDate !== 0 ? byDate : order.indexOf(a) - order.indexOf(b);
    })[newlyUnlocked.length - 1];
  }

  return { unlocked, newlyUnlocked, celebrationId };
}

/** المعلم التالي الأقرب للفتح (لعرضه كبطاقة مختصرة) أو null لو فُتح الكل. */
export function getNextMilestone(unlocked: MilestonesUnlocked): MilestoneDefinition | null {
  return MILESTONE_DEFINITIONS.find((d) => !(d.id in unlocked)) || null;
}

// ── التخزين ──────────────────────────────────────────────────────────────

export function loadMilestonesUnlocked(): MilestonesUnlocked {
  try {
    const raw = localStorage.getItem(StorageKeys.milestonesUnlocked());
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveMilestonesUnlocked(unlocked: MilestonesUnlocked): void {
  try {
    localStorage.setItem(StorageKeys.milestonesUnlocked(), JSON.stringify(unlocked));
  } catch {
    // تجاهل أخطاء المساحة/الوضع الخاص
  }
}

export function isMilestonesInitialized(): boolean {
  try {
    return localStorage.getItem(StorageKeys.milestonesInitialized()) === '1';
  } catch {
    return false;
  }
}

export function markMilestonesInitialized(): void {
  try {
    localStorage.setItem(StorageKeys.milestonesInitialized(), '1');
  } catch {
    // تجاهل
  }
}

export function getReportSharedAt(): string | null {
  try {
    return localStorage.getItem(StorageKeys.reportSharedAt());
  } catch {
    return null;
  }
}

/** يسجّل أول مشاركة تقرير فقط — المرات اللاحقة لا تغيّر التاريخ. */
export function markReportShared(): string {
  const existing = getReportSharedAt();
  if (existing) return existing;
  const now = new Date().toISOString();
  try {
    localStorage.setItem(StorageKeys.reportSharedAt(), now);
  } catch {
    // تجاهل
  }
  return now;
}
