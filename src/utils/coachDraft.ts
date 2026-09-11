/**
 * Local helper for Coach Weekly Follow-up Message Generation (100% Offline & Template-based)
 */
import { BRAND } from '../config/brand';

export interface WeeklyDraftParams {
  clientName: string;
  avgAdherence: number;
  bestDay: string;
  weightChange?: number | null;
  avgWater?: number | null;
  exerciseDays?: number;
  medsAdherence?: number | null;
  goal?: string;
  rangeDays?: number;
}

export function generateLocalWeeklyDraft(params: WeeklyDraftParams): string {
  const {
    clientName,
    avgAdherence,
    bestDay,
    weightChange,
    avgWater,
    exerciseDays = 0,
    medsAdherence,
    goal,
  } = params;

  let weightNote = '';
  if (weightChange !== null && weightChange !== undefined) {
    if (weightChange < 0) {
      weightNote = `خسارة ${Math.abs(weightChange)} كجم في الوزن خلال الأسبوع 🎯`;
    } else if (weightChange > 0) {
      weightNote = `تغير طفيف +${weightChange} كجم (طبيعي مع بناء العضلات أو احتباس السوائل المؤقت)`;
    } else {
      weightNote = `ثبات الوزن مع استمرار حرق الدهون وتحسن المقاسات`;
    }
  }

  let clinicalAdvice = '';
  if (avgAdherence >= 80) {
    clinicalAdvice = 'الالتزام جيد بالخطة. يُرجى الاستمرار في متابعة كميات الماء ومواعيد النوم.';
  } else if (avgAdherence >= 60) {
    clinicalAdvice = 'يُرجى التركيز في الأسبوع القادم على تنظيم مواعيد الوجبات والوصول لكمية الماء المقررة.';
  } else {
    clinicalAdvice = 'يُرجى التركيز خلال الأسبوع القادم على الالتزام بتسجيل الوجبات أولاً بأول.';
  }

  const lines = [
    `مرحباً ${clientName || 'المشترك'}، معك ${BRAND.doctorName}`,
    `تقرير متابعة الأسبوع لخطتك (${goal || 'إدارة التغذية والوزن'}):`,
    ``,
    `ملخص النتائج:`,
    `• متوسط الالتزام العام: ${avgAdherence}%`,
    `• أعلى يوم التزام: ${bestDay}`,
    weightNote ? `• تطور الوزن: ${weightNote}` : null,
    avgWater ? `• متوسط شرب الماء: ${avgWater} كوب/يوم` : null,
    `• أيام النشاط البدني: ${exerciseDays} أيام`,
    medsAdherence !== null && medsAdherence !== undefined ? `• الالتزام بالمكملات/الأدوية: ${medsAdherence}%` : null,
    ``,
    `الملاحظات والتوجيهات:`,
    clinicalAdvice,
    ``,
    `لأي استفسار أو تعديل في الوجبات يمكنك التواصل في أي وقت.`,
  ].filter((l) => l !== null);

  return lines.join('\n');
}
