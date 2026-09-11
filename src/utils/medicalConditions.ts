import { ConditionItem, PlanConfig } from '../types';

export interface MedicalConditionMeta {
 id: string;
 label: string;
 category: 'metabolic' | 'endocrine' | 'digestive' | 'cardiorenal' | 'allergies_other';
 categoryLabel: string;
 icon: string;
 shortDescription: string;
 macroRuleSummary: string;
}

export const SUPPORTED_CONDITIONS: MedicalConditionMeta[] = [
 // 1. الأيض ومقاومة الإنسولين
 {
 id: 'insulin_resistance',
 label: 'مقاومة إنسولين / ما قبل السكري',
 category: 'metabolic',
 categoryLabel: 'الأيض والسكري',
 icon: '',
 shortDescription: 'اضطراب استجابة الخلايا للإنسولين يتطلب ضبط الحمل السكري وتجنب الارتفاع المفاجئ للجلوكوز.',
 macroRuleSummary: 'تقليل الكارب الصافي (25-30% من السعرات)، رفع البروتين المشبع، وزيادة الألياف.',
 },
 {
 id: 't2dm',
 label: 'سكري نوع 2 (T2DM)',
 category: 'metabolic',
 categoryLabel: 'الأيض والسكري',
 icon: '',
 shortDescription: 'يتطلب تحكماً دقيقاً في نسبة السكريات المعقدة وتوزيع متوازن للوجبات وتجنب السكريات البسيطة.',
 macroRuleSummary: 'كارب منخفض-معتدل محسوب بدقة، بروتين كافٍ لمنع هدم العضلات، ودهون غير مشبعة.',
 },
 {
 id: 't1dm',
 label: 'سكري نوع 1 (T1DM)',
 category: 'metabolic',
 categoryLabel: 'الأيض والسكري',
 icon: '',
 shortDescription: 'اعتماد كلي على الإنسولين الخارجي؛ يتطلب حساب جرامات الكارب بدقة وتناسق التوقيت.',
 macroRuleSummary: 'تثبيت جرامات الكارب في كل وجبة لتسهيل حساب جرعات الإنسولين بدقة مع الطبيب المعالج.',
 },

 // 2. الهرمونات والغدد
 {
 id: 'pcos',
 label: 'تكيس مبايض (PCOS)',
 category: 'endocrine',
 categoryLabel: 'الهرمونات والغدد',
 icon: '',
 shortDescription: 'يرتبط بمقاومة الإنسولين وخلل الأندروجينات، يستجيب بامتياز للدايت المنخفض في المؤشر الجلايسيمي.',
 macroRuleSummary: 'كارب معقد أقل (30-35%)، دهون صحية غنية بأوميجا 3، وبروتين عالي (1.8-2g/kg).',
 },
 {
 id: 'hypothyroidism',
 label: 'قصور غدة درقية (Hypothyroidism)',
 category: 'endocrine',
 categoryLabel: 'الهرمونات والغدد',
 icon: '',
 shortDescription: 'انخفاض معدل الأيض الأساسي مع ميل لاحتباس السوائل والإمساك.',
 macroRuleSummary: 'عجز سعرات معتدل (تجنب الحرمان الشديد لتفادي تباطؤ الغدة)، بروتين عالٍ لرفع الأيض.',
 },
 {
 id: 'hyperthyroidism',
 label: 'فرط نشاط غدة درقية (Hyperthyroidism)',
 category: 'endocrine',
 categoryLabel: 'الهرمونات والغدد',
 icon: '',
 shortDescription: 'ارتفاع معدل الأيض وسرعة تكسير العضلات والوزن.',
 macroRuleSummary: 'زيادة السعرات التقديرية بنسبة 15-20% مع بروتين عالي لحماية الكتلة العضلية.',
 },

 // 3. الجهاز الهضمي والقولون
 {
 id: 'ibs',
 label: 'قولون عصبي (IBS)',
 category: 'digestive',
 categoryLabel: 'الجهاز الهضمي والقولون',
 icon: '',
 shortDescription: 'حساسية الأمعاء للانتفاخ والغازات؛ يستفيد من إرشادات Low-FODMAP ومصادر الألياف الذائبة.',
 macroRuleSummary: 'توزيع معتدل للماكروز مع التركيز على ألياف هادئة وتجنب مهيجات القولون.',
 },
 {
 id: 'gerd',
 label: 'ارتجاع مريئي وحموضة معدة (GERD)',
 category: 'digestive',
 categoryLabel: 'الجهاز الهضمي والقولون',
 icon: '',
 shortDescription: 'ارتجاع حمض المعدة؛ يتطلب تجنب الوجبات الدسمة المليئة بالدهون والأطعمة الحارة والحمضية.',
 macroRuleSummary: 'خفض نسبة الدهون الإجمالية (<25%)، تقسيم الوجبات إلى وجبات أصغر حجماً.',
 },

 // 4. القلب والأوعية والكلى والنقرس
 {
 id: 'hypertension',
 label: 'ارتفاع ضغط الدم (Hypertension)',
 category: 'cardiorenal',
 categoryLabel: 'القلب والأوعية والكلى',
 icon: '',
 shortDescription: 'يتطلب تقليل الصوديوم، زيادة البوتاسيوم والمغنيسيوم (نظام DASH الغذائي).',
 macroRuleSummary: 'دهون غير مشبعة، ألياف عالية، وترطيب يومي لا يقل عن 3.5 لتر.',
 },
 {
 id: 'hyperlipidemia',
 label: 'كوليسترول ودهون دم مرتفعة',
 category: 'cardiorenal',
 categoryLabel: 'القلب والأوعية والكلى',
 icon: '',
 shortDescription: 'ارتفاع الكوليسترول الضار LDL أو الدهون الثلاثية؛ يتطلب تقليل الدهون المشبعة والسكريات البسيطة.',
 macroRuleSummary: 'الحد من الدهون المشبعة إلى أقل من 7%، رفع أوميجا 3 والألياف الذائبة.',
 },
 {
 id: 'gout',
 label: 'نقرس / حمض يوريك مرتفع (Gout / Hyperuricemia)',
 category: 'cardiorenal',
 categoryLabel: 'القلب والأوعية والكلى',
 icon: '',
 shortDescription: 'ترسب بلورات اليوريك في المفاصل؛ يتطلب تقليل اللحوم الحمراء والفركتوز والكحول.',
 macroRuleSummary: 'بروتين معتدل (1.2-1.5g/kg مع تفضيل مصادر النباتات والبيض والألبان)، ماء وفير.',
 },
 {
 id: 'ckd',
 label: 'أمراض كلى مزمنة (Chronic Kidney Disease)',
 category: 'cardiorenal',
 categoryLabel: 'القلب والأوعية والكلى',
 icon: '',
 shortDescription: 'انخفاض كفاءة الترشيح الكلوي؛ يتطلب تقييداً سريرياً دقيقاً لكميات البروتين والفوسفور والصوديوم.',
 macroRuleSummary: 'تقييد البروتين بحذر (0.6 - 0.8g/kg للمراحل غير الغسيل)، استشارة الطبيب حتمية.',
 },

 // 5. الدم والمناعة والحساسية
 {
 id: 'anemia',
 label: 'أنيميا ونقص حديد (Iron Deficiency Anemia)',
 category: 'allergies_other',
 categoryLabel: 'الدم والمناعة والحساسية',
 icon: '',
 shortDescription: 'انخفاض الهيموجلوبين ومخزون الحديد؛ يتطلب مصادر حديد هيمي ونباتي مع فيتامين C.',
 macroRuleSummary: 'بروتين كافٍ مع وجبات غنية بالحديد، وفصل مكملات الكالسيوم والشاي عن وجبات الحديد.',
 },
 {
 id: 'food_allergy',
 label: 'حساسية / عدم تحمل طعام (جلوتين، لاكتوز، مكسرات...)',
 category: 'allergies_other',
 categoryLabel: 'الدم والمناعة والحساسية',
 icon: '',
 shortDescription: 'استجابة مناعية أو هضمية تحسسية لمكونات معينة؛ تتطلب استبعاداً صارماً للمحفزات.',
 macroRuleSummary: 'استبدال المكونات بمصادر بديلة مكافئة في القيمة الغذائية (مثل بدائل الحليب أو الحبوب الخالية من الجلوتين).',
 },
 {
 id: 'other',
 label: 'حالة مرضية أخرى (مخصصة)',
 category: 'allergies_other',
 categoryLabel: 'الدم والمناعة والحساسية',
 icon: '',
 shortDescription: 'تشخيص طبي أو ملاحظات خاصة يسجلها الأخصائي في حقل الملاحظات.',
 macroRuleSummary: 'تعديل مرن حسب التقييم السريري للأخصائي.',
 },
];

export interface SuggestedMacrosResult {
 suggestedCalories: number;
 suggestedProtein: number;
 suggestedCarbs: number;
 suggestedFats: number;
 suggestedWaterMl: number;
 rationalePoints: string[];
 clinicalCautions: string[];
 appliedConditionsCount: number;
}

/**
 * Smart safe calculation engine for clinical macro recommendations
 */
export function calculateClinicalMacrosSuggestion(
 selectedConditions: ConditionItem[],
 plan: PlanConfig
): SuggestedMacrosResult {
 const activeIds = new Set(selectedConditions.map((c) => c.id));
 const clientWeight = plan.startWeight || 80;
 const clientHeight = plan.heightCm || 170;

 // 1. Calculate Baseline Safe TDEE estimate
 // Harris-Benedict baseline
 const estimatedBMR = Math.round(10 * clientWeight + 6.25 * clientHeight - 5 * 30 + 5);
 let baseCalories = Math.round(estimatedBMR * 1.35); // Light-moderate activity base

 // Calorie targets based on user existing goal or sensible baseline
 let targetCalories = plan.targetCalories || baseCalories;

 // Safe lower limit floor
 const safeCalorieFloor = 1350;
 if (targetCalories < safeCalorieFloor) {
 targetCalories = safeCalorieFloor;
 }

 // Baseline Macronutrient distribution ratios (Percentages)
 let proteinRatio = 0.28; // 28%
 let carbsRatio = 0.42; // 42%
 let fatsRatio = 0.30; // 30%

 let proteinGramsPerKg = 1.8;
 const rationalePoints: string[] = [];
 const clinicalCautions: string[] = [];

 // Rules Engine Adjustments:

 // 1. Insulin Resistance / Diabetes T2
 if (activeIds.has('insulin_resistance') || activeIds.has('t2dm')) {
 carbsRatio = 0.25; // 25% low carb glycemic load
 proteinRatio = 0.35; // 35%
 fatsRatio = 0.40; // 40% healthy monounsaturated & polyunsaturated
 proteinGramsPerKg = 2.0;
 rationalePoints.push('تم تقليل نسبة الكاربوهيدرات إلى ~25-30% لتقليل إفراز الإنسولين وضبط مستويات سكر الدم بعد الوجبات.');
 rationalePoints.push('تم رفع نسبة البروتين والدهون الصحية لزيادة الشبع والحفاظ على حساسية الخلايا للإنسولين.');
 }

 // 2. PCOS (Polycystic Ovary Syndrome)
 if (activeIds.has('pcos')) {
 carbsRatio = Math.min(carbsRatio, 0.28);
 proteinRatio = Math.max(proteinRatio, 0.32);
 fatsRatio = Math.max(fatsRatio, 0.38);
 rationalePoints.push('حمية تكيس المبايض (PCOS): تقليل الكارب البسيط والاعتماد على مصادر غنية بأوميجا 3 ومضادات الالتهاب.');
 }

 // 3. Chronic Kidney Disease (CKD) - Critical Safety Adjustment!
 if (activeIds.has('ckd')) {
 // Restrict protein strictly for kidney safety (unless advised otherwise)
 proteinGramsPerKg = 0.8;
 proteinRatio = 0.15;
 carbsRatio = 0.55;
 fatsRatio = 0.30;
 clinicalCautions.push(' تنبيه كلى سريري: تم تقييد البروتين إلى ~0.8g لكل كجم لحماية وظائف الكلى من العبء النيتروجيني.');
 rationalePoints.push('تقييد البروتين الإجمالي لمريض الكلى غير الغسيل لتجنب إجهاد الكبيبات الكلوية.');
 }

 // 4. Gout / Hyperuricemia
 if (activeIds.has('gout')) {
 proteinGramsPerKg = Math.min(proteinGramsPerKg, 1.4);
 rationalePoints.push('النقرس: يفضل الاعتماد على البروتين النباتي والألبان منخفضة الدسم والبيض والحد من اللحوم الحمراء ومأكولات البحر الغنية بالبيورين.');
 }

 // 5. Hypothyroidism
 if (activeIds.has('hypothyroidism')) {
 // Keep calorie deficit gentle, do not starve
 if (targetCalories < 1500) targetCalories = 1500;
 rationalePoints.push('قصور الغدة الدرقية: تم ضبط عجز السعرات ليكون معتدلاً لتفادي مزيد من تباطؤ هرمونات الأيض (T3/T4).');
 }

 // 6. Hyperthyroidism
 if (activeIds.has('hyperthyroidism')) {
 targetCalories = Math.round(targetCalories * 1.15);
 proteinGramsPerKg = Math.max(proteinGramsPerKg, 2.0);
 rationalePoints.push('فرط نشاط الغدة: تمت زيادة السعرات والبروتين لتعويض فرط الحرق ومنع الهدم العضلي السريع.');
 }

 // 7. GERD / Acid Reflux
 if (activeIds.has('gerd')) {
 fatsRatio = Math.min(fatsRatio, 0.25); // Lower fats to speed gastric emptying
 carbsRatio = Math.max(carbsRatio, 0.45);
 rationalePoints.push('الارتجاع المريئي (GERD): تم تقليل نسبة الدهون لتسريع إفراغ المعدة وتقليل ارتخاء الصمام الفؤادي.');
 }

 // 8. Hypertension & Hyperlipidemia
 if (activeIds.has('hypertension') || activeIds.has('hyperlipidemia')) {
 rationalePoints.push('صحة القلب والأوعية: التركيز على دهون أحادية غير مشبعة (زيت زيتون، مكسرات، أفوكادو) والحد من الدهون المشبعة.');
 }

 // 9. IBS
 if (activeIds.has('ibs')) {
 rationalePoints.push('القولون العصبي (IBS): التوزيع متوازن، مع التوصية السريرية باختيار ألياف ذائبة متدرجة وتجنب أطعمة FODMAP المهيجة.');
 }

 // Normalize ratios if sum!= 1.0
 const sumRatios = proteinRatio + carbsRatio + fatsRatio;
 proteinRatio = proteinRatio / sumRatios;
 carbsRatio = carbsRatio / sumRatios;
 fatsRatio = fatsRatio / sumRatios;

 // Calculate final gram values safely
 let suggestedProtein = Math.round((targetCalories * proteinRatio) / 4);
 // Also check kg multiplier bounds
 if (!activeIds.has('ckd')) {
 const proteinByWeight = Math.round(clientWeight * proteinGramsPerKg);
 suggestedProtein = Math.round((suggestedProtein + proteinByWeight) / 2);
 } else {
 suggestedProtein = Math.round(clientWeight * 0.8);
 }

 let suggestedFats = Math.round((targetCalories * fatsRatio) / 9);
 let caloriesFromProtAndFat = suggestedProtein * 4 + suggestedFats * 9;
 let remainingCalsForCarbs = Math.max(200, targetCalories - caloriesFromProtAndFat);
 let suggestedCarbs = Math.round(remainingCalsForCarbs / 4);

 // Recalculate true calories sum
 const finalCalories = suggestedProtein * 4 + suggestedCarbs * 4 + suggestedFats * 9;

 // Hydration calculation
 let suggestedWaterMl = plan.dailyWaterGoalMl || 3000;
 if (activeIds.has('hypertension') || activeIds.has('gout') || activeIds.has('insulin_resistance')) {
 suggestedWaterMl = Math.max(suggestedWaterMl, 3500);
 }
 if (activeIds.has('ckd')) {
 // Caution for renal fluid intake
 clinicalCautions.push(' سوائل الكلى: يجب التأكد من حجم السوائل المسموح به يومياً وفق إرشادات الطبيب المشرف على الكلى.');
 }

 if (rationalePoints.length === 0) {
 rationalePoints.push('توزيع غذائي علاجي متوازن يعزز الشبع، بناء الكتلة اللادهنية، واستقرار الطاقة على مدار اليوم.');
 }

 return {
 suggestedCalories: finalCalories,
 suggestedProtein: Math.max(50, suggestedProtein),
 suggestedCarbs: Math.max(40, suggestedCarbs),
 suggestedFats: Math.max(30, suggestedFats),
 suggestedWaterMl,
 rationalePoints,
 clinicalCautions,
 appliedConditionsCount: selectedConditions.length,
 };
}
