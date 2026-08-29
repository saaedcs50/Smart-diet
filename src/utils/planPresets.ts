import { PlanConfig, MealItem, CheckItem, SupplementItem, SectionVisibility } from '../types';

export interface PlanPreset {
  id: string;
  name: string;
  category: 'medical' | 'weight_loss' | 'fitness' | 'keto' | 'maintenance' | 'custom';
  badge: string;
  icon: string;
  tagColor: string;
  summary: string;
  description: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  dailyWaterGoalMl: number;
  fastingHours: number;
  mealsCount: number;
  supplementsCount: number;
  isCustom?: boolean;
  createdAt?: string;
  planData: Omit<PlanConfig, 'clientName' | 'startWeight' | 'targetWeight' | 'heightCm' | 'targetWaist' | 'adminPin'>;
}

export const getCustomPresets = loadCustomPresets;

export const PRESET_PCOS_INSULIN: PlanPreset = {
  id: 'preset_pcos_insulin',
  name: 'علاج مقاومة الإنسولين وتكيسات المبايض (PCOS)',
  category: 'medical',
  badge: 'علاجي متقدم 🩺',
  icon: '🩺',
  tagColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-700',
  summary: 'صيام 16:8 + نشويات منخفضة المؤشر الجلايسيمي + بروتين مشبع ومكملات إينوزيتول وخل تفاح',
  description: 'خطة طبية دقيقة لخفض مستويات هرمون الإنسولين، تقليل مقاومة الخلايا، تنظيم التبويض وعلاج تكيس المبايض مع نزول دهون البطن والحشوية.',
  targetCalories: 1550,
  targetProtein: 115,
  targetCarbs: 85,
  targetFats: 70,
  dailyWaterGoalMl: 3500,
  fastingHours: 16,
  mealsCount: 3,
  supplementsCount: 5,
  planData: {
    targetCalories: 1550,
    targetProtein: 115,
    targetCarbs: 85,
    targetFats: 70,
    dailyWaterGoalMl: 3500,
    enableFastingTimer: true,
    fastingTargetHours: 16,
    enableMacrosTracker: true,
    freezeDaysPerMonth: 2,
    scoreWeights: { checklist: 30, water: 25, sleep: 15, meals: 30 },
    meals: [
      {
        id: 'pcos_m1',
        name: 'وجبة كسر الصيام (إفطار غني بالبروتين والدهون الصحية) 🍳',
        items: '٣ بيضات مسلوقة أو أومليت بزيت زيتون بكر + ١/٢ حبة أفوكادو + طبق سلطة ورقية غني بالجرجير والخيار والبقدونس مع ملعقة زيت زيتون + ربع رغيف بلدي ردة أو شريحة خبز حبة كاملة',
        alternatives: [
          '٤ ملاعق جبنة قريش بزيت زيتون وحبة البركة وبذور الكتان + طبق سلطة خضراء + ربع رغيف بلدي',
          'أومليت بالخضار والمشروم (٣ بيضات) + ١/٢ ثمرة أفوكادو + سلطة ورقية كبيرة بدون خبز',
          'سلطة تونة مصفاة (علبة ١٤٠ جم) بزيت الزيتون والليمون والخيار والجرجير'
        ],
        calories: 450,
        proteinGrams: 32,
      },
      {
        id: 'pcos_m2',
        name: 'وجبة الغداء الرئيسية (بروتين صافي + ألياف + كارب معقد) 🥗',
        items: '٢٠٠ جم صدر دجاج مشوي أو مطهو بالفرن + طبق خضار سوتيه/مطهو بزيت زيتون (كوسة، فاصوليا خضراء، بروكلي) + ٤ ملاعق كينوا مسلوقة أو أرز بني + طبق سلطة خضراء بخل التفاح',
        alternatives: [
          '٢٥٠ جم سمك مشوي (سلمون أو بلطي أو بوري) + خضار مشوي بالفرن + ٣ ملاعق أرز بني',
          '١٨٠ جم لحم بقر ستيك قليل الدهن + طبق بروكلي وسوتيه كبير + طبق سلطة خضراء',
          'علبة تونة دايت كبيرة + طبق سلطة يونانية غني بالخيار والخس وجبن فيتا أصلي وزيتون'
        ],
        calories: 550,
        proteinGrams: 48,
      },
      {
        id: 'pcos_m3',
        name: 'وجبة العشاء الخفيف وسناك الأنسولين 🥣',
        items: 'كوب زبادي يوناني كامل الدسم غير محلى (١٧٠ جم) + ملعقة بذور شيا + ملعقة بذور كتان مطحونة + حفنة مكسرات نية (١٠ حبات لوز وجوز) + رشة قرفة سيلانية',
        alternatives: [
          'شريحة توست حبة كاملة + ٢ ملعقة لبنة أو جبن قريش + خيار وخس ورشة زعتر وزيت زيتون',
          '٢ بيضة مسلوقة + خضار ورقي طازج + حفنة لوز ني (١٢ حبة)',
          'مشروب بروتين نباتي أو واي مع حليب لوز غير محلى وبذور الشيا'
        ],
        calories: 320,
        proteinGrams: 24,
      },
    ],
    checklist: [
      { id: 'pcos_c1', label: 'كوب ماء دافئ + ملعقة خل تفاح عضوي قبل وجبة الغداء بـ ١٥ دقيقة' },
      { id: 'pcos_c2', label: 'تناول الخضار والسلطة أولاً، ثم البروتين، وأخيراً النشويات في كل وجبة' },
      { id: 'pcos_c3', label: 'مشي خفيف لمدة ١٠ إلى ١٥ دقيقة فور الانتهاء من الوجبة الرئيسية' },
      { id: 'pcos_c4', label: 'الامتناع التام عن السكر الأبيض والمخبوزات والعصائر المحلاة' },
      { id: 'pcos_c5', label: 'شرب ٣.٥ لتر ماء موزع على مدار ساعات الإفطار' },
      { id: 'pcos_c6', label: 'إتمام ساعات الصيام المتقطع (١٦ ساعة) بنجاح' },
    ],
    supplements: [
      { id: 'pcos_s1', name: 'Myo-Inositol (إينوزيتول 2000mg)', time: 'صباحاً ومساءً مع الماء' },
      { id: 'pcos_s2', name: 'أوميجا 3 عالي النقاوة (EPA/DHA 1000mg)', time: 'بعد وجبة الغداء مباشرة' },
      { id: 'pcos_s3', name: 'مغنيسيوم جلايسينات (Magnesium Glycinate 400mg)', time: 'قبل النوم بساعة' },
      { id: 'pcos_s4', name: 'فيتامين د3 (Vitamin D3 5000 IU)', time: 'مع وجبة الإفطار أو الغداء' },
      { id: 'pcos_s5', name: 'خل تفاح عضوي أم Mother', time: 'مخفف على كوب ماء قبل الوجبات' },
    ],
    tips: [
      'ترتيب تناول الطعام يغير استجابة الإنسولين تماماً: ابدأ بالألياف والسلطة، ثم البروتين، والنشويات المعقدة في النهاية.',
      'خل التفاح العضوي قبل الوجبة يحسن حساسية الإنسولين ويقلل قفزة السكر في الدم بنسبة تصل إلى 30%.',
      'المشي 10 دقائق بعد الوجبة يجبر العضلات على حرق الجلوكوز بدون الحاجة لإفراز كميات إنسولين عالية.',
      'النوم المبكر العميق (7-8 ساعات) يقلل هرمون الكورتيزول ويساعد على انتظام الدورة والتبويض.'
    ],
    visibleSections: {
      scoreCard: true,
      macrosTracker: true,
      fastingTimer: true,
      tipsBanner: true,
      mealsList: true,
      waterTracker: true,
      sleepTracker: true,
      moodTracker: true,
      exerciseTracker: true,
      checklistTracker: true,
      supplementsTracker: true,
      symptomsTracker: true,
      doctorNotes: true,
      quickReportBtn: true,
      bodyTab: true,
      reportsTab: true,
    },
    symptomsList: [
      { id: 'sym_sugar_cravings', label: 'شراهة ورغبة شديدة في السكريات' },
      { id: 'sym_energy_crash', label: 'خمول وهبوط طاقة بعد الأكل' },
      { id: 'sym_bloating', label: 'انتفاخ وغازات في البطن' },
      { id: 'sym_headache', label: 'صداع خفيف' },
      { id: 'sym_sleep_disturb', label: 'أرق أو صعوبة في النوم' },
    ],
  },
};

export const PRESET_FLEXIBLE_LOW_CARB: PlanPreset = {
  id: 'preset_flexible_low_carb',
  name: 'لوكارب مرن لنزول الوزن السريع (Flexible Low-Carb)',
  category: 'weight_loss',
  badge: 'نزول دهون سريع ⚡',
  icon: '⚡',
  tagColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  summary: '3 وجبات + سناك | تقليل نشويات | 35% بروتين | عجز سعرات ذكي بدون حرمان',
  description: 'خطة متوازنة لنزول الوزن الصافي من دهون الجسم دون فقدان الكتلة العضلية، مع مرونة عالية في تبديل الوجبات وشبع مستمر طوال اليوم.',
  targetCalories: 1500,
  targetProtein: 130,
  targetCarbs: 95,
  targetFats: 65,
  dailyWaterGoalMl: 3500,
  fastingHours: 14,
  mealsCount: 4,
  supplementsCount: 4,
  planData: {
    targetCalories: 1500,
    targetProtein: 130,
    targetCarbs: 95,
    targetFats: 65,
    dailyWaterGoalMl: 3500,
    enableFastingTimer: true,
    fastingTargetHours: 14,
    enableMacrosTracker: true,
    freezeDaysPerMonth: 2,
    scoreWeights: { checklist: 25, water: 25, sleep: 15, meals: 35 },
    meals: [
      {
        id: 'lc_m1',
        name: 'وجبة الإفطار (بروتين مشبع وطاقة نقية) 🍳',
        items: '٣ بياض بيض + بيضة كاملة مسلوقة أو أومليت خفيف + ٥٠ جم جبن قريش أو فيتا لايت + شرائح خيار وطماطم وخس + شريحة توست سن حبة كاملة',
        alternatives: [
          '١٥٠ جم زبادي يوناني لايت + سكوب واي بروتين صغير + ملعقة بذور شيا + نصف ثمرة تفاح مقطعة',
          'علبة تونة مصفاة بزيت الزيتون والليمون + طبق سلطة خضراء + ربع رغيف بلدي',
          '٤ ملاعق فول بزيت حار خفيف وليمون وكمون + بيضة مسلوقة + سلطة خضراء'
        ],
        calories: 380,
        proteinGrams: 32,
      },
      {
        id: 'lc_m2',
        name: 'وجبة الغداء الرئيسية (بروتين صافي + خضروات وفيرة) 🍗',
        items: '٢٠٠ جم صدور دجاج مشوية أو مسحبة + طبق كبير خضار مشكل مطهو أو سوتيه + ٤ ملاعق أرز بسمتي مسلوق أو بطاطس مسلوقة (١٠٠ جم) + سلطة خضراء بخل التفاح',
        alternatives: [
          '٢٥٠ جم سمك فيليه أو جمبري مشوي + سلطة جرجير وطماطم + ٤ ملاعق أرز صيادية خفيف الزيت',
          '١٨٠ جم كفتة لحم بقري صافي مشوية بالفرن + سلطة طحينة خفيفة بليمون + خضار مشوي',
          'علبتين تونة دايت بالخضار والليمون + طبق سلطة يونانية كبير'
        ],
        calories: 520,
        proteinGrams: 50,
      },
      {
        id: 'lc_m3',
        name: 'سناك العصر الصحي (طاقة وضبط شهية) ☕',
        items: 'كوب قهوة أمريكانو أو شاي أخضر + حفنة مكسرات مشكلة نية (١٥ حبة لوز/عين جمل) + مكعب شوكولاتة داكنة 85%',
        alternatives: [
          'ثمرة تفاح أو كمثرى متوسطة + ملعقة زبدة فول سوداني طبيعية بدون سكر',
          'كوب زبادي طبيعي صغير + رشة قرفة وبذور كتان',
          'كوب خيار وجزر مقطع شرائح + ٢ ملعقة حمص شامي بيتي'
        ],
        calories: 180,
        proteinGrams: 6,
      },
      {
        id: 'lc_m4',
        name: 'وجبة العشاء الخفيف 🥗',
        items: 'طبق سلطة خضراء كبير بالجرجير والخس + ١٢٠ جم جبن قريش بزيت زيتون بكر وزعتر وطماطم',
        alternatives: [
          '٢ بيضة مسلوقة + طبق سلطة تونة خفيف بدون زيت + خيار',
          'كوب زبادي يوناني لايت (١٧٠ جم) + رشة بذور شيا وقرفة',
          'شوربة خضار بروكلي وكوسة مسلوقة مع قطع دجاج مسحب (١٠٠ جم)'
        ],
        calories: 280,
        proteinGrams: 28,
      },
    ],
    checklist: [
      { id: 'lc_c1', label: 'شرب 3.5 لتر ماء على مدار اليوم' },
      { id: 'lc_c2', label: 'المشي 8000 إلى 10000 خطوة يومياً' },
      { id: 'lc_c3', label: 'الامتناع عن السكر الأبيض والمقليات والمشروبات الغازية' },
      { id: 'lc_c4', label: 'إيقاف تناول الطعام قبل النوم بـ 3 ساعات على الأقل' },
      { id: 'lc_c5', label: 'الالتزام بمواعيد الوجبات وتجنب اللقمات الجانبية' },
    ],
    supplements: [
      { id: 'lc_s1', name: 'مالتي فيتامين شامل (Multivitamin)', time: 'صباحاً بعد وجبة الإفطار' },
      { id: 'lc_s2', name: 'أوميجا 3 (Omega 3 - 1000mg)', time: 'مع وجبة الغداء' },
      { id: 'lc_s3', name: 'مغنيسيوم (Magnesium 350mg)', time: 'قبل النوم' },
      { id: 'lc_s4', name: 'فيتامين سي + زنك', time: 'صباحاً' },
    ],
    tips: [
      'اشرب كوبين ماء قبل كل وجبة بـ 20 دقيقة، يساعد جداً على الشبع وتقليل السعرات المتناولة.',
      'احرص على ألا تخلو أي وجبة من مصدر بروتين عالي الجودة لرفع معدل الحرق والحفاظ على الكتلة العضلية.',
      'الخضروات الورقية والخيار والألياف مسموحة بكميات سخية جداً عند الشعور بالجوع المفاجئ.'
    ],
    visibleSections: {
      scoreCard: true,
      macrosTracker: true,
      fastingTimer: true,
      tipsBanner: true,
      mealsList: true,
      waterTracker: true,
      sleepTracker: true,
      moodTracker: true,
      exerciseTracker: true,
      checklistTracker: true,
      supplementsTracker: true,
      symptomsTracker: true,
      doctorNotes: true,
      quickReportBtn: true,
      bodyTab: true,
      reportsTab: true,
    },
    symptomsList: [
      { id: 'sym_hunger', label: 'جوع شديد في المساء' },
      { id: 'sym_thirst', label: 'عطش مستمر وجفاف فم' },
      { id: 'sym_constipation', label: 'إمساك أو بطء هضم' },
      { id: 'sym_fatigue', label: 'إرهاق عام' },
    ],
  },
};

export const PRESET_HIGH_PROTEIN_CUT: PlanPreset = {
  id: 'preset_high_protein_cut',
  name: 'التنشيف وبناء العضلات عالي البروتين (High-Protein Cut & Shape)',
  category: 'fitness',
  badge: 'تنشيف ولياقة 💪',
  icon: '💪',
  tagColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-700',
  summary: '150g بروتين | وجبات محيطة بالتمرين | كرياتين وواي بروتين | رسم العضلات ونحت الجسم',
  description: 'خطة مخصصة للمتدربين الراغبين في خفض نسبة الدهون ونحت الجسم مع تعزيز البناء العضلي والاستشفاء التدريبي السريع.',
  targetCalories: 1800,
  targetProtein: 155,
  targetCarbs: 160,
  targetFats: 50,
  dailyWaterGoalMl: 4000,
  fastingHours: 12,
  mealsCount: 4,
  supplementsCount: 5,
  planData: {
    targetCalories: 1800,
    targetProtein: 155,
    targetCarbs: 160,
    targetFats: 50,
    dailyWaterGoalMl: 4000,
    enableFastingTimer: false,
    fastingTargetHours: 12,
    enableMacrosTracker: true,
    freezeDaysPerMonth: 2,
    scoreWeights: { checklist: 25, water: 25, sleep: 20, meals: 30 },
    meals: [
      {
        id: 'hp_m1',
        name: 'وجبة الإفطار (بناء واستشفاء عضلي) 🍳',
        items: '٤ بيضات (٣ بياض + ١ كاملة) أومليت بالخضار والسبانخ + ٥٠ جم شوفان مطبوخ بالماء أو حليب قليل الدسم مع قرفة وسكوب بروتين أو ملعقة عسل + ثمرة موز',
        alternatives: [
          'بان كيك بروتين صحي (شوفان + بيض + سكوب بروتين) مع توت أو فراولة',
          '١٥٠ جم جبن قريش بزيت زيتون + ٢ توست بني حبة كاملة + ٢ بيضة مسلوقة + سلطة خضراء',
          'ساندويتش ديك رومي مدخن وجبن شيدر لايت + بيضتين + خضار طازج'
        ],
        calories: 480,
        proteinGrams: 42,
      },
      {
        id: 'hp_m2',
        name: 'وجبة الغداء (ما قبل أو بعد التمرين) 🍗',
        items: '٢٢٠ جم صدر دجاج مشوي أو متبل بالليمون والأعشاب + ١٥٠ جم أرز بسمتي أو بطاطا حلوة مشوية + طبق خضار سوتيه/بروكلي على البخار + سلطة خضراء بزيت زيتون خفيف',
        alternatives: [
          '٢٠٠ جم لحم ستيك بقري صافي + بطاطس مهروسة مسلوقة (١٥٠ جم) + خضار مشوي',
          '٢٥٠ جم سمك سلمون أو قاروص مشوي + ٦ ملاعق أرز بني + سلطة جرجير',
          'علبتين تونة دايت (٢٤٠ جم صافي) + مكرونة مسلوقة دايت (١٠٠ جم) + صلصة طماطم بيتي وسلطة'
        ],
        calories: 600,
        proteinGrams: 58,
      },
      {
        id: 'hp_m3',
        name: 'سناك استشفاء التمرين (Post-Workout Recovery) 🥤',
        items: 'سكوب واي بروتين (Whey Protein Isolate - 25g) مع ماء أو حليب لوز + ثمرة موز أو ٣ حبات تمر + ٥ جم كرياتين مونوهايدريت',
        alternatives: [
          'كوب زبادي يوناني كامل الدسم (١٧٠ جم) + ملعقة عسل نحل طبيعي + حفنة لوز',
          'شريحة توست بني + ملعقة كبيرة زبدة فول سوداني + شرائح موز ورشة قرفة',
          'بروتين بار صحي قليل السكر (20g protein)'
        ],
        calories: 260,
        proteinGrams: 28,
      },
      {
        id: 'hp_m4',
        name: 'وجبة العشاء (بروتين بطيء الامتصاص ونوم عميق) 🥣',
        items: '١٥٠ جم جبن قريش أو كازين بروتين + ملعقة بذور شيا + طبق سلطة خضراء غني بزيت الزيتون والليمون والخيار',
        alternatives: [
          'علبة تونة مصفاة + خضار ورقي طازج + بيضة مسلوقة',
          'صدر دجاج مشوي صغير (١٢٠ جم) + شوربة بروكلي خفيفة بدون كريمة',
          'أومليت بياض بيض بالجبن الفيتا لايت والسبانخ'
        ],
        calories: 320,
        proteinGrams: 34,
      },
    ],
    checklist: [
      { id: 'hp_c1', label: 'إتمام تمرين المقاومة / الحديد اليومي المجدول' },
      { id: 'hp_c2', label: 'تناول 5 جم كرياتين مونوهايدريت يومياً بانتظام' },
      { id: 'hp_c3', label: 'شرب 4 لتر ماء لتسهيل الاستشفاء وتصريف الأملاح' },
      { id: 'hp_c4', label: 'النوم من 7 إلى 8.5 ساعات لتعظيم إفراز هرمون النمو GH' },
      { id: 'hp_c5', label: 'إكمال هدف البروتين اليومي (150 جم على الأقل)' },
    ],
    supplements: [
      { id: 'hp_s1', name: 'كرياتين مونوهايدريت (Creatine Monohydrate 5g)', time: 'يومياً بعد التمرين أو صباحاً' },
      { id: 'hp_s2', name: 'واي بروتين آيزوليت (Whey Protein Isolate)', time: 'فور انتهاء التمرين' },
      { id: 'hp_s3', name: 'أوميجا 3 (Omega 3 - 2000mg)', time: 'مع وجبة الغداء' },
      { id: 'hp_s4', name: 'زنك ومغنيسيوم وفيتامين ب6 (ZMA)', time: 'قبل النوم بـ 45 دقيقة' },
      { id: 'hp_s5', name: 'فيتامين د3 (Vitamin D3 5000 IU)', time: 'مع وجبة دسمة' },
    ],
    tips: [
      'توزيع البروتين على 4 جرعات متباعدة (30-40 جم في كل جرعة) يرفع تحفيز البناء العضلي (Muscle Protein Synthesis) لأقصى درجة.',
      'الكرياتين يعمل بالتراكم في الخلايا العضلية؛ داوم على 5 جم يومياً حتى في أيام الراحة مع شرب ماء وفير.',
      'لا تهمل النوم، 80% من الاستشفاء وإعادة بناء الألياف العضلية يحدث أثناء مراحل النوم العميق.'
    ],
    visibleSections: {
      scoreCard: true,
      macrosTracker: true,
      fastingTimer: false,
      tipsBanner: true,
      mealsList: true,
      waterTracker: true,
      sleepTracker: true,
      moodTracker: true,
      exerciseTracker: true,
      checklistTracker: true,
      supplementsTracker: true,
      symptomsTracker: true,
      doctorNotes: true,
      quickReportBtn: true,
      bodyTab: true,
      reportsTab: true,
    },
    symptomsList: [
      { id: 'sym_muscle_soreness', label: 'ألم واستشفاء عضلي متأخر (DOMS)' },
      { id: 'sym_cramps', label: 'شد أو تقلصات عضلية' },
      { id: 'sym_joint_pain', label: 'ألم في المفاصل أو الأوتار' },
      { id: 'sym_fatigue', label: 'إجهاد تدريبي زائد' },
    ],
  },
};

export const PRESET_CLINICAL_KETO: PlanPreset = {
  id: 'preset_clinical_keto',
  name: 'الكيتو دايت العلاجي المنضبط (Clinical Keto)',
  category: 'keto',
  badge: 'كيتو علاجي 🥑',
  icon: '🥑',
  tagColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border-teal-300 dark:border-teal-700',
  summary: '75% دهون صحية | <25g كارب صافي | إلكترولايت كاملة | حرق دهون متواصل',
  description: 'خطة كيتوجينيك علاجية دقيقة لتحويل الجسم إلى الحالة الكيتوزية، مع تعويض الإلكترولايت والماء لحرق الدهون العنيدة وتنظيم سكر الدم.',
  targetCalories: 1650,
  targetProtein: 85,
  targetCarbs: 20,
  targetFats: 135,
  dailyWaterGoalMl: 4000,
  fastingHours: 16,
  mealsCount: 3,
  supplementsCount: 5,
  planData: {
    targetCalories: 1650,
    targetProtein: 85,
    targetCarbs: 20,
    targetFats: 135,
    dailyWaterGoalMl: 4000,
    enableFastingTimer: true,
    fastingTargetHours: 16,
    enableMacrosTracker: true,
    freezeDaysPerMonth: 1,
    scoreWeights: { checklist: 30, water: 25, sleep: 15, meals: 30 },
    meals: [
      {
        id: 'keto_m1',
        name: 'إفطار كيتوني دسم ومشبع 🍳',
        items: '٣ بيضات مقلية بالسمن البلدي أو زيت الزيتون + ثمرة أفوكادو كاملة مع ملح هملايا وليمون + شرائح جرجير وخيار بالزيتون + ٥٠ جم جبن حلوم أو فيتا يوناني أصلي',
        alternatives: [
          'أومليت بالسبانخ والجبن الموتزاريلا الطبيعي والزبدة الطبيعية (٣ بيضات) + سلطة ورقية غنية بزيت الزيتون',
          'سلطة تونة بالمايونيز البيتي وزيت الزيتون والخس والأفوكادو',
          'شكشوكة بيض كيتونية بالزبدة الطبيعية والطماطم والفلفل الأخضر + جبن كيري/فيتا'
        ],
        calories: 550,
        proteinGrams: 28,
      },
      {
        id: 'keto_m2',
        name: 'وجبة الغداء الكيتونية الرئيسية 🥩',
        items: '٢٠٠ جم لحم بقري مفروم دسم أو ريب آي ستيك مطهو بالزبدة + طبق بروكلي وقرنبيط سوتيه بزيت الزيتون والثوم + سلطة خضراء غنية بزيت الزيتون والليمون والأفوكادو',
        alternatives: [
          '٢٥٠ جم سمك سلمون مشوي غني بالدهون + خضار ورقي سوتيه بزيت جوز الهند',
          'أوراك دجاج مشوية بالجلد (قطعتين) + صوص طحينة كيتوني أصلي بليمون وزيت زيتون + سلطة',
          'طاجن كفتة لحم دسمة بالجبن الشيدر والخضار الكيتوني'
        ],
        calories: 700,
        proteinGrams: 42,
      },
      {
        id: 'keto_m3',
        name: 'عشاء كيتوني خفيف أو سناك مكسرات 🥣',
        items: 'حفنة مكسرات كيتونية (عين جمل، بيكان، مكسرات مكاديميا ولوز - ٤٠ جم) + كوب حليب لوز غير محلى ببذور الشيا وقرفة',
        alternatives: [
          'كوب قهوة بوليت بروف (Bulletproof Coffee: قهوة + ملعقة زيت MCT أو زبدة عضوية)',
          'شريحتين جبن جودا أو شيدر عالي الدسم + خيار وخس وزيتون مخلل',
          'سلطة بيض مسلوق (بيضتين) بالمايونيز والخردل والجرجير'
        ],
        calories: 350,
        proteinGrams: 16,
      },
    ],
    checklist: [
      { id: 'keto_c1', label: 'إضافة ملعقة صغيرة ملح هملايا/بحري للماء لتعويض الصوديوم' },
      { id: 'keto_c2', label: 'حساب الكارب الصافي بدقة والتأكد أنه أقل من 20-25 جم يومياً' },
      { id: 'keto_c3', label: 'شرب 4 لتر ماء لمساعدة الكلى في تصريف الأجسام الكيتونية' },
      { id: 'keto_c4', label: 'الامتناع التام عن أي سكريات أو نشويات أو فاكهة عدا التوت والأفوكادو' },
      { id: 'keto_c5', label: 'إتمام ساعات الصيام المتقطع (16:8)' },
    ],
    supplements: [
      { id: 'keto_s1', name: 'إلكترولايت متكامل (صوديوم + بوتاسيوم + مغنيسيوم)', time: 'مذاب في لتر ماء طوال اليوم' },
      { id: 'keto_s2', name: 'سترات المغنيسيوم (Magnesium Citrate 400mg)', time: 'قبل النوم' },
      { id: 'keto_s3', name: 'أوميجا 3 (Omega 3)', time: 'مع الوجبة' },
      { id: 'keto_s4', name: 'فيتامين د3 مع K2', time: 'صباحاً مع دهون صحية' },
      { id: 'keto_s5', name: 'زيت MCT النقي (اختياري)', time: 'مع القهوة الصباحية' },
    ],
    tips: [
      'في أول أسبوعين من الكيتو، الملح هو أهم عنصر على الإطلاق! قلة الملح والماء هي السبب الرئيسي لأعراض الكيتو فلو (الصداع والخمول).',
      'ركز على الدهون الصحية غير المصنعة: زيت الزيتون البكر، الأفوكادو، الزبدة والسمن الطبيعي، المكسرات النية والأسماك الدهنية.',
      'الكارب الصافي = الكارب الكلي - الألياف. لا تقلق من الخضروات الورقية الخضراء فهي غنية بالألياف والمعادن.'
    ],
    visibleSections: {
      scoreCard: true,
      macrosTracker: true,
      fastingTimer: true,
      tipsBanner: true,
      mealsList: true,
      waterTracker: true,
      sleepTracker: true,
      moodTracker: true,
      exerciseTracker: true,
      checklistTracker: true,
      supplementsTracker: true,
      symptomsTracker: true,
      doctorNotes: true,
      quickReportBtn: true,
      bodyTab: true,
      reportsTab: true,
    },
    symptomsList: [
      { id: 'sym_keto_flu', label: 'أعراض كيتو فلو (صداع / خمول)' },
      { id: 'sym_dizziness', label: 'دوخة أو هبوط ضغط عند الوقوف' },
      { id: 'sym_cramps', label: 'تقلص في عضلات الساق' },
      { id: 'sym_palpitations', label: 'تسارع في نبضات القلب' },
      { id: 'sym_dry_mouth', label: 'عطش وجفاف فم كيتوني' },
    ],
  },
};

export const PRESET_HEALTHY_MAINTENANCE: PlanPreset = {
  id: 'preset_healthy_maintenance',
  name: 'تثبيت الوزن ونمط الحياة الصحي المستدام (Maintenance & Balance)',
  category: 'maintenance',
  badge: 'تثبيت وتوازن ⚖️',
  icon: '⚖️',
  tagColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-700',
  summary: 'توازن ماكروز وسعرات الحفاظ | 2-3 أيام فري شهرياً | مرونة غذائية واستدامة مدى الحياة',
  description: 'خطة ذكية لتثبيت الوزن بعد الوصول للوزن المثالي، الحفاظ على صحة الأيض والكتلة العضلية مع حرية ومرونة اجتماعية مدروسة.',
  targetCalories: 2050,
  targetProtein: 120,
  targetCarbs: 210,
  targetFats: 65,
  dailyWaterGoalMl: 3000,
  fastingHours: 12,
  mealsCount: 4,
  supplementsCount: 3,
  planData: {
    targetCalories: 2050,
    targetProtein: 120,
    targetCarbs: 210,
    targetFats: 65,
    dailyWaterGoalMl: 3000,
    enableFastingTimer: false,
    fastingTargetHours: 12,
    enableMacrosTracker: true,
    freezeDaysPerMonth: 3,
    scoreWeights: { checklist: 25, water: 25, sleep: 20, meals: 30 },
    meals: [
      {
        id: 'main_m1',
        name: 'إفطار متوازن ومتكامل 🍳',
        items: '٢ بيضة مسلوقة أو مقلية بزيت زيتون + ٦٠ جم جبن أبيض قليل الملح أو قريش + رغيف بلدي صغير أو ٢ شريحة توست حبة كاملة + خضار مشكل طازج + ثمرة فاكهة',
        alternatives: [
          'طبق شوفان بالحليب والموز وبذور الشيا والمكسرات والبروتين',
          'ساندويتش جبن حلوم مشوي بالخضار والزعتر وزيت الزيتون + بيضة مسلوقة',
          'فول بالزيت والليمون + بيضتين + نصف رغيف بلدي + سلطة خضراء'
        ],
        calories: 500,
        proteinGrams: 28,
      },
      {
        id: 'main_m2',
        name: 'وجبة الغداء الصحية العائلية 🍲',
        items: '١٨٠ جم بروتين (دجاج أو لحم أو سمك) + ٦ إلى ٨ ملاعق أرز أو مكرونة أو حبة بطاطس كبيرة + طبق خضار مطبوخ أو سوتيه + سلطة خضراء متنوعة',
        alternatives: [
          'سمك مشوي مع أرز صيادية وسلطة طحينة وخضار',
          'طاجن خضار باللحم المفروم الصافي مع سلطة وأرز',
          'شيش طاووق مشوي مع بطاطس ودجز بالفرن وسلطة زبادي بالخيار'
        ],
        calories: 680,
        proteinGrams: 45,
      },
      {
        id: 'main_m3',
        name: 'سناك العصر والمشروبات ☕',
        items: 'كوب قهوة أو شاي + ثمرة فاكهة موسمية (تفاح، برتقال، موز) + حفنة مكسرات نية مشكلة (١٥ حبة)',
        alternatives: [
          'كوب زبادي فواكه طبيعي بيتي مع عسل نحل',
          'قطعة كيك شوفان صحية بيتي أو بسكويت نخالة',
          'فشار بيتي بدون زيت زائد (كوبين) مع مشروب دافئ'
        ],
        calories: 220,
        proteinGrams: 6,
      },
      {
        id: 'main_m4',
        name: 'عشاء خفيف ومريح للمعدة 🥣',
        items: 'كوب زبادي كبير أو جبن قريش بزيت الزيتون + ثمرة خيار وخس + شريحة توست بني أو ربع رغيف بلدي',
        alternatives: [
          'شوربة عدس أو خضار دافئة مع ليمون وقطعة توست محمص',
          'سلطة تونة خفيفة مع ذرة حلوة وخس وخيار',
          'أومليت بيض بالخضار مع خيار وطماطم بدون خبز'
        ],
        calories: 320,
        proteinGrams: 22,
      },
    ],
    checklist: [
      { id: 'main_c1', label: 'المحافظة على وزن الجسم أسبوعياً في نطاق ± 1.5 كجم' },
      { id: 'main_c2', label: 'شرب 3 لتر ماء يومياً بانتظام' },
      { id: 'main_c3', label: 'المشي أو ممارسة أي نشاط بدني 30 دقيقة يومياً' },
      { id: 'main_c4', label: 'تناول حصتين من الفاكهة الطازجة وحصص وفيرة من الخضار' },
      { id: 'main_c5', label: 'النوم من 7 إلى 8 ساعات يومياً' },
    ],
    supplements: [
      { id: 'main_s1', name: 'مالتي فيتامين عام (Multivitamin)', time: 'بعد الإفطار' },
      { id: 'main_s2', name: 'أوميجا 3 (Omega 3)', time: 'مع الغداء' },
      { id: 'main_s3', name: 'فيتامين د3 (جرعة وقائية)', time: 'أسبوعياً أو يومياً حسب التحليل' },
    ],
    tips: [
      'التثبيت هو تدريب على نمط حياة مستدام؛ لا يوجد حرمان بل اعتدال ووعي بكميات الطعام.',
      'وزن نفسك مرة واحدة فقط أسبوعياً في نفس اليوم ونفس التوقيت صباحاً على الريق.',
      'استخدم نظام 80/20: 80% من طعامك صحي ومغذي ومدروس، و20% مرونة للمناسبات الاجتماعية.'
    ],
    visibleSections: {
      scoreCard: true,
      macrosTracker: true,
      fastingTimer: false,
      tipsBanner: true,
      mealsList: true,
      waterTracker: true,
      sleepTracker: true,
      moodTracker: true,
      exerciseTracker: true,
      checklistTracker: true,
      supplementsTracker: true,
      symptomsTracker: true,
      doctorNotes: true,
      quickReportBtn: true,
      bodyTab: true,
      reportsTab: true,
    },
    symptomsList: [
      { id: 'sym_weight_gain', label: 'زيادة مفاجئة في الميزان' },
      { id: 'sym_water_retention', label: 'احتباس سوائل أو أملاح' },
      { id: 'sym_bloating', label: 'عسر هضم أو انتفاخ' },
    ],
  },
};

export const BUILT_IN_PRESETS: PlanPreset[] = [
  PRESET_PCOS_INSULIN,
  PRESET_FLEXIBLE_LOW_CARB,
  PRESET_HIGH_PROTEIN_CUT,
  PRESET_CLINICAL_KETO,
  PRESET_HEALTHY_MAINTENANCE,
];

const CUSTOM_PRESETS_STORAGE_KEY = 'nt_custom_plan_presets_v1';

export function loadCustomPresets(): PlanPreset[] {
  try {
    const data = localStorage.getItem(CUSTOM_PRESETS_STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading custom presets:', e);
    return [];
  }
}

export function saveCustomPreset(preset: PlanPreset): boolean {
  try {
    const existing = loadCustomPresets();
    const filtered = existing.filter((p) => p.id !== preset.id);
    const updated = [preset, ...filtered];
    localStorage.setItem(CUSTOM_PRESETS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Error saving custom preset:', e);
    return false;
  }
}

export function deleteCustomPreset(presetId: string): boolean {
  try {
    const existing = loadCustomPresets();
    const updated = existing.filter((p) => p.id !== presetId);
    localStorage.setItem(CUSTOM_PRESETS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Error deleting custom preset:', e);
    return false;
  }
}

export function getAllPresets(): PlanPreset[] {
  const custom = loadCustomPresets();
  return [...BUILT_IN_PRESETS, ...custom];
}

export function createPresetFromPlan(
  plan: PlanConfig,
  name: string,
  category: PlanPreset['category'] = 'custom',
  summary: string = '',
  description: string = ''
): PlanPreset {
  const mealsCount = plan.meals?.length || 0;
  const supplementsCount = plan.supplements?.length || 0;
  const id = `custom_${Date.now()}`;

  return {
    id,
    name: name.trim() || `قالب مخصص (${new Date().toLocaleDateString('ar-EG')})`,
    category,
    badge: 'قالب مخصص 💾',
    icon: '⭐',
    tagColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
    summary: summary || `خطة مخصصة تشمل ${mealsCount} وجبات و ${supplementsCount} مكملات`,
    description: description || 'قالب تم تصميمه وحفظه بواسطة د. شيماء للمتدربين.',
    targetCalories: plan.targetCalories || 1600,
    targetProtein: plan.targetProtein || 120,
    targetCarbs: plan.targetCarbs || 100,
    targetFats: plan.targetFats || 60,
    dailyWaterGoalMl: plan.dailyWaterGoalMl || 3000,
    fastingHours: plan.fastingTargetHours || 16,
    mealsCount,
    supplementsCount,
    isCustom: true,
    createdAt: new Date().toISOString(),
    planData: {
      targetCalories: plan.targetCalories,
      targetProtein: plan.targetProtein,
      targetCarbs: plan.targetCarbs,
      targetFats: plan.targetFats,
      dailyWaterGoalMl: plan.dailyWaterGoalMl,
      enableFastingTimer: plan.enableFastingTimer,
      fastingTargetHours: plan.fastingTargetHours,
      enableMacrosTracker: plan.enableMacrosTracker,
      freezeDaysPerMonth: plan.freezeDaysPerMonth,
      scoreWeights: JSON.parse(JSON.stringify(plan.scoreWeights || { checklist: 30, water: 25, sleep: 15, meals: 30 })),
      meals: JSON.parse(JSON.stringify(plan.meals || [])),
      checklist: JSON.parse(JSON.stringify(plan.checklist || [])),
      supplements: JSON.parse(JSON.stringify(plan.supplements || [])),
      tips: [...(plan.tips || [])],
      visibleSections: JSON.parse(JSON.stringify(plan.visibleSections || {})),
      symptomsList: JSON.parse(JSON.stringify(plan.symptomsList || [])),
      medicalConditions: plan.medicalConditions ? JSON.parse(JSON.stringify(plan.medicalConditions)) : undefined,
      medicationPlan: plan.medicationPlan ? JSON.parse(JSON.stringify(plan.medicationPlan)) : undefined,
    },
  };
}

export function applyPresetToPlanDraft(currentDraft: PlanConfig, preset: PlanPreset): PlanConfig {
  const p = preset.planData;
  return {
    ...currentDraft,
    targetCalories: p.targetCalories,
    targetProtein: p.targetProtein,
    targetCarbs: p.targetCarbs,
    targetFats: p.targetFats,
    dailyWaterGoalMl: p.dailyWaterGoalMl,
    enableFastingTimer: p.enableFastingTimer,
    fastingTargetHours: p.fastingTargetHours,
    enableMacrosTracker: p.enableMacrosTracker,
    freezeDaysPerMonth: p.freezeDaysPerMonth,
    scoreWeights: JSON.parse(JSON.stringify(p.scoreWeights)),
    meals: JSON.parse(JSON.stringify(p.meals)),
    checklist: JSON.parse(JSON.stringify(p.checklist)),
    supplements: JSON.parse(JSON.stringify(p.supplements || [])),
    tips: [...(p.tips || [])],
    visibleSections: JSON.parse(JSON.stringify(p.visibleSections || {})),
    symptomsList: JSON.parse(JSON.stringify(p.symptomsList || [])),
    ...(p.medicalConditions ? { medicalConditions: JSON.parse(JSON.stringify(p.medicalConditions)) } : {}),
    ...(p.medicationPlan ? { medicationPlan: JSON.parse(JSON.stringify(p.medicationPlan)) } : {}),
  };
}
