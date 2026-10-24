import { DayLog } from '../types';
import { parseLocalDate, getTodayDateString } from './storage';

/**
 * Batch 2.2 — الوزن المتوقع مقابل الفعلي: منطق نقي لبناء المسار والشارة.
 *
 * المعدل الآمن: منظومة الحاسبات الإكلينيكية القائمة (clinicalCalculators)
 * تعرّف الخسارة الآمنة بـ 0.5%–1% من وزن الجسم أسبوعيًا؛ المسار المتوقع
 * يستخدم منتصف هذا النطاق (0.75% من وزن البداية أسبوعيًا) ولا يتجاوز
 * الوزن المستهدف أبدًا في أي اتجاه.
 *
 * مرساة المسار: لا يوجد حقل «تاريخ بداية الخطة» في PlanConfig، فالمرساة
 * هي تاريخ أول قياس وزن فعلي في السجلات، والوزن عندها = startWeight.
 * المسار «استرشادي» وليس وعدًا طبيًا — النص يظهر للمستخدم كما هو.
 */

export const SAFE_WEEKLY_RATE_MIN_FRACTION = 0.005;
export const SAFE_WEEKLY_RATE_MAX_FRACTION = 0.01;
export const EXPECTED_WEEKLY_RATE_FRACTION = 0.0075;
export const TRAJECTORY_TOLERANCE_KG = 0.5;

export interface WeightPoint {
  date: string;
  weight: number;
}

/** كل قياسات الوزن الصالحة مرتبة زمنيًا من سجلات الأيام. */
export function collectWeightPoints(logs: Record<string, DayLog> | undefined | null): WeightPoint[] {
  if (!logs) return [];
  return Object.entries(logs)
    .filter(([, log]) => typeof log?.weight === 'number' && (log.weight as number) > 0)
    .map(([date, log]) => ({ date, weight: log.weight as number }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function addDays(dateStr: string, days: number): string {
  const d = parseLocalDate(dateStr);
  d.setDate(d.getDate() + days);
  return getTodayDateString(d);
}

function diffDays(fromStr: string, toStr: string): number {
  const a = parseLocalDate(fromStr).getTime();
  const b = parseLocalDate(toStr).getTime();
  return Math.round((b - a) / 86400000);
}

/** الوزن المتوقع في تاريخ ما على المسار الآمن من وزن البداية للهدف. */
export function expectedWeightAt(
  startWeight: number,
  targetWeight: number,
  anchorDateISO: string,
  dateISO: string
): number {
  const weeks = Math.max(0, diffDays(anchorDateISO, dateISO) / 7);
  const weeklyDelta = startWeight * EXPECTED_WEEKLY_RATE_FRACTION;
  if (targetWeight < startWeight) {
    return Math.max(targetWeight, startWeight - weeklyDelta * weeks);
  }
  if (targetWeight > startWeight) {
    return Math.min(targetWeight, startWeight + weeklyDelta * weeks);
  }
  return startWeight;
}

/** سلسلة المسار المتوقع بنقاط أسبوعية من المرساة حتى تاريخ النهاية. */
export function buildExpectedSeries(
  startWeight: number,
  targetWeight: number,
  anchorDateISO: string,
  endDateISO: string
): WeightPoint[] {
  const points: WeightPoint[] = [];
  const totalDays = Math.max(0, diffDays(anchorDateISO, endDateISO));
  for (let d = 0; d <= totalDays; d += 7) {
    const date = addDays(anchorDateISO, d);
    points.push({ date, weight: round1(expectedWeightAt(startWeight, targetWeight, anchorDateISO, date)) });
  }
  if (totalDays % 7 !== 0) {
    points.push({
      date: endDateISO,
      weight: round1(expectedWeightAt(startWeight, targetWeight, anchorDateISO, endDateISO)),
    });
  }
  return points;
}

export type TrajectoryStatus = 'on-track' | 'faster' | 'slower';

export const TRAJECTORY_STATUS_LABELS: Record<TrajectoryStatus, string> = {
  'on-track': 'على المسار',
  faster: 'أسرع من المخطط',
  slower: 'أبطأ — طبيعي أحيانًا',
};

/**
 * حالة الالتزام بالمسار بهامش ±0.5 كجم حول المتوقع اليوم.
 * في اتجاه الخسارة: فعلي أقل من المتوقع = أسرع. في اتجاه الزيادة ينعكس المعنى.
 */
export function getTrajectoryStatus(
  actualWeight: number,
  expectedWeight: number,
  startWeight: number,
  targetWeight: number
): TrajectoryStatus {
  const diff = actualWeight - expectedWeight; // موجب = أثقل من المتوقع
  if (Math.abs(diff) <= TRAJECTORY_TOLERANCE_KG) return 'on-track';
  const losing = targetWeight < startWeight;
  if (losing) return diff < 0 ? 'faster' : 'slower';
  return diff > 0 ? 'faster' : 'slower';
}

export interface TrajectoryData {
  actualPoints: WeightPoint[];
  expectedPoints: WeightPoint[];
  anchorDate: string;
  latestActual: WeightPoint;
  expectedToday: number;
  status: TrajectoryStatus;
  statusLabel: string;
}

/**
 * يبني بيانات البطاقة كاملة أو يعيد null عندما لا تتوفر الشروط:
 * ≥3 قياسات فعلية + وزن بداية + وزن هدف مختلف عنه.
 */
export function buildTrajectory(
  logs: Record<string, DayLog> | undefined | null,
  startWeight?: number | null,
  targetWeight?: number | null,
  todayISO?: string
): TrajectoryData | null {
  if (!startWeight || !targetWeight || startWeight === targetWeight) return null;
  const actualPoints = collectWeightPoints(logs);
  if (actualPoints.length < 3) return null;

  const anchorDate = actualPoints[0].date;
  const today = todayISO || getTodayDateString();
  const endDate = today > actualPoints[actualPoints.length - 1].date ? today : actualPoints[actualPoints.length - 1].date;
  const expectedPoints = buildExpectedSeries(startWeight, targetWeight, anchorDate, endDate);
  const latestActual = actualPoints[actualPoints.length - 1];
  const expectedToday = round1(expectedWeightAt(startWeight, targetWeight, anchorDate, latestActual.date));
  const status = getTrajectoryStatus(latestActual.weight, expectedToday, startWeight, targetWeight);

  return {
    actualPoints,
    expectedPoints,
    anchorDate,
    latestActual,
    expectedToday,
    status,
    statusLabel: TRAJECTORY_STATUS_LABELS[status],
  };
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
