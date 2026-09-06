/**
 * Local helper for Coach Weekly Follow-up Message Generation (100% Offline & Template-based)
 */

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
    clinicalAdvice = 'ما شاء الله التزامك ممتاز ومجهود رائع! استمري بنفس الحماس والتركيز على شرب الماء والنوم المنتظم.';
  } else if (avgAdherence >= 60) {
    clinicalAdvice = 'بداية جيدة وخطوات ممتازة! ركزي في الأسبوع القادم على تنظيم مواعيد الوجبات وزيادة شرب الماء لرفع معدل الحرق.';
  } else {
    clinicalAdvice = 'كل بداية تحتاج صبراً، لا تقلقي من أي تقصير سابق! دعينا نبدأ الأسبوع الجديد بتركيز أكبر على تتبع الوجبات اليومية.';
  }

  const lines = [
    `أهلاً يا ${clientName || 'البطل'}، معكي د. شيماء 🩺`,
    `متابعة الأسبوع لخطتك (${goal || 'نمط حياة صحي وإدارة الوزن'}):`,
    ``,
    `📊 ملخص نتائج الأسبوع:`,
    `• متوسط الالتزام العام: ${avgAdherence}%`,
    `• أفضل يوم التزام: ${bestDay}`,
    weightNote ? `• تطور الوزن: ${weightNote}` : null,
    avgWater ? `• متوسط شرب الماء: ${avgWater} كوب/يوم` : null,
    `• أيام النشاط والرياضة: ${exerciseDays} أيام`,
    medsAdherence !== null && medsAdherence !== undefined ? `• التزام الأدوية والمكملات: ${medsAdherence}%` : null,
    ``,
    `💡 توجيهات الأسبوع الجديد:`,
    clinicalAdvice,
    ``,
    `جاهزة لأي استفسار أو تعديل في الوجبات. بالتوفيق دائماً! 🌸`,
  ].filter((l) => l !== null);

  return lines.join('\n');
}
