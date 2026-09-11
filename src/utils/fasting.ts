// ============================================================================
// وحدة الصيام المتقدم الذكية (إسلامي / مسيحي / متقطع)
// ============================================================================

import { 
  PlanConfig, 
  DayLog, 
  FastingPlanConfig, 
  FastingType, 
  IslamicFastingPattern, 
  ChristianFastType 
} from '../types';

export interface TodayFastingStatus {
  isFasting: boolean;
  type: FastingType;
  titleAr: string;
  subtitleAr: string;
  badgeLabel: string;
  // Islamic specific
  fajrTime?: string;
  maghribTime?: string;
  isDaytimeFasting?: boolean; // currently between Fajr and Maghrib
  rehydrationCups?: { time: string; amountMl: number; label: string }[];
  // Christian specific
  fastName?: string;
  allowFish?: boolean;
  isStrictVegan?: boolean;
  abstinenceEndTime?: string;
  isAbstinenceActive?: boolean; // currently before abstinence end time
  // Intermittent specific
  targetHours?: number;
  eatingWindowStart?: string;
  eatingWindowEnd?: string;
}

/**
 * دالة مساعدة لحساب ما إذا كان اليوم صياماً وفق نمط الصيام الإسلامي
 */
export function isIslamicFastingDate(pattern: IslamicFastingPattern, dateStr: string): boolean {
  const d = new Date(dateStr);
  const dayOfWeek = d.getDay(); // 0 = Sunday, 1 = Monday, 4 = Thursday

  switch (pattern) {
    case 'single_day':
      return true;
    case 'mon_thu':
      return dayOfWeek === 1 || dayOfWeek === 4; // Monday or Thursday
    case 'white_days': {
      // Approximation for 13, 14, 15 of lunar month or mid-month
      const dayOfMonth = d.getDate();
      return dayOfMonth >= 13 && dayOfMonth <= 15;
    }
    case 'ramadan':
      return true; // Active Ramadan plan
    case 'custom_dates':
      return true;
    default:
      return false;
  }
}

const DEFAULT_NON_FASTING_STATUS: TodayFastingStatus = {
  isFasting: false,
  type: 'none',
  titleAr: 'نمط الأكل الاعتيادي',
  subtitleAr: 'بدون صيام اليوم',
  badgeLabel: 'اعتيادي',
};

/**
 * فحص وتحديد حالة الصيام لليوم المعين بناءً على خطة الأخصائي وسجل اليوم
 */
export function getTodayFastingStatus(plan?: PlanConfig, day?: DayLog, dateStr?: string): TodayFastingStatus {
  const defaultStatus = DEFAULT_NON_FASTING_STATUS;

  if (!plan) return defaultStatus;

  const fastingPlan: FastingPlanConfig = plan.fastingPlan || {
    enabled: plan.enableFastingTimer || false,
    type: plan.enableFastingTimer ? 'intermittent' : 'none',
    intermittent: {
      targetHours: plan.fastingTargetHours || 16,
    },
  };

  if (!fastingPlan.enabled || fastingPlan.type === 'none') {
    // If trainee manually enabled fasting for today
    if (day?.isFastingDay && day.fastingTypeOverride && day.fastingTypeOverride !== 'none') {
      return buildFastingStatus(day.fastingTypeOverride, fastingPlan, day, dateStr);
    }
    return defaultStatus;
  }

  // Trainee override has priority if explicitly set
  if (day?.isFastingDay !== undefined) {
    if (!day.isFastingDay) {
      return defaultStatus;
    }
    const type = day.fastingTypeOverride || fastingPlan.type;
    return buildFastingStatus(type, fastingPlan, day, dateStr);
  }

  // Follow plan configuration
  return buildFastingStatus(fastingPlan.type, fastingPlan, day, dateStr);
}

function buildFastingStatus(
  type: FastingType, 
  config: FastingPlanConfig, 
  day?: DayLog, 
  dateStr: string = new Date().toISOString().slice(0, 10)
): TodayFastingStatus {
  if (type === 'islamic') {
    const islamic = config.islamic || {
      pattern: 'mon_thu',
      fajrTime: '04:30',
      maghribTime: '18:15',
      autoRemapMeals: true,
      rehydrationPlan: true,
      suhurTips: true,
    };

    const isFastingToday = day?.isFastingDay !== undefined 
      ? day.isFastingDay 
      : isIslamicFastingDate(islamic.pattern, dateStr);

    if (!isFastingToday) {
      return {
        isFasting: false,
        type: 'islamic',
        titleAr: 'يوم إفطار اعتيادي (خارج أيام الصيام)',
        subtitleAr: 'الخطة مصممة بصيام إسلامي في أيام محددة',
        badgeLabel: 'يوم فطر',
      };
    }

    const fajr = islamic.fajrTime || '04:30';
    const maghrib = islamic.maghribTime || '18:15';

    // Pattern Arabic title
    const patternTitles: Record<IslamicFastingPattern, string> = {
      single_day: 'صيام تطوع / قضاء',
      mon_thu: 'صيام الإثنين والخميس',
      white_days: 'صيام الأيام البيض',
      ramadan: 'صيام شهر رمضان المبارك',
      custom_dates: 'صيام مخصص',
    };

    // Calculate rehydration timeline between Maghrib and Fajr
    const rehydrationCups = [
      { time: maghrib, amountMl: 500, label: 'كوبان ماء مع تمرات الإفطار' },
      { time: '19:30', amountMl: 250, label: 'كوب ماء بعد الوجبة الرئيسية' },
      { time: '20:30', amountMl: 250, label: 'كوب ماء (أثناء التراويح/الحركة)' },
      { time: '22:00', amountMl: 300, label: 'كوب ماء مع السناك الخفيف' },
      { time: '23:30', amountMl: 250, label: 'كوب ماء قبل النوم' },
      { time: '03:30', amountMl: 300, label: 'كوب ماء عند الاستيقاظ للسحور' },
      { time: fajr, amountMl: 400, label: 'كوبان ماء قبل مدفع الإمساك' },
    ];

    return {
      isFasting: true,
      type: 'islamic',
      titleAr: patternTitles[islamic.pattern] || 'صيام إسلامي',
      subtitleAr: `انقطاع من الفجر (${fajr}) حتى المغرب (${maghrib})`,
      badgeLabel: 'صيام إسلامي',
      fajrTime: fajr,
      maghribTime: maghrib,
      rehydrationCups,
    };
  }

  if (type === 'christian') {
    const christian = config.christian || {
      fastType: 'strict_vegan',
      abstinenceHoursEnabled: true,
      abstinenceEndTime: '12:00',
      allowFish: false,
      plantProteinCombiner: true,
      supplementReminders: ['b12', 'iron', 'zinc', 'calcium'],
    };

    const allowFish = day?.christianFishOverride !== undefined 
      ? day.christianFishOverride 
      : christian.fastType === 'with_fish' || !!christian.allowFish;

    const fastTitles: Record<ChristianFastType, string> = {
      with_fish: 'صيام مسيحي (مسموح بالأسماك)',
      strict_vegan: 'صيام نباتي صرف (بدون أسماك)',
      custom: christian.fastName || 'صيام مسيحي نباتي',
    };

    return {
      isFasting: true,
      type: 'christian',
      titleAr: fastTitles[christian.fastType] || 'صيام مسيحي',
      subtitleAr: allowFish ? 'نظام نباتي صيامي مع سماح الأسماك البحرية' : 'نظام نباتي صيامي بحت (خالٍ من المشتقات الحيوانية والأسماك)',
      badgeLabel: allowFish ? 'صيامي + سمك' : 'نباتي صيامي',
      fastName: christian.fastName || (allowFish ? 'صيام مع سمك' : 'صيام نباتي'),
      allowFish,
      isStrictVegan: !allowFish,
      abstinenceEndTime: christian.abstinenceHoursEnabled ? (christian.abstinenceEndTime || '12:00') : undefined,
    };
  }

  if (type === 'intermittent') {
    const targetHours = config.intermittent?.targetHours || 16;
    return {
      isFasting: true,
      type: 'intermittent',
      titleAr: `صيام متقطع (${targetHours}:${24 - targetHours})`,
      subtitleAr: `الهدف اليومي: ${targetHours} ساعة صيام مستمر`,
      badgeLabel: `متقطع ${targetHours}h`,
      targetHours,
      eatingWindowStart: config.intermittent?.eatingWindowStart || '12:00',
      eatingWindowEnd: config.intermittent?.eatingWindowEnd || '20:00',
    };
  }

  return DEFAULT_NON_FASTING_STATUS;
}

/**
 * تحويل مسميات الوجبات تلقائياً بما يلائم أيام الصيام الإسلامي
 */
export function getRemappedMealName(originalName: string, index: number, isIslamicFasting: boolean): string {
  if (!isIslamicFasting) return originalName;

  const lower = originalName.toLowerCase();

  if (lower.includes('سحور') || lower.includes('إفطار') || lower.includes('افطار')) {
    return originalName;
  }

  if (index === 0 || lower.includes('فطور') || lower.includes('فطار') || lower.includes('breakfast')) {
    return 'وجبة الإفطار الرئيسية (عند أذان المغرب)';
  }

  if (index === 1 || lower.includes('غداء') || lower.includes('سناك') || lower.includes('lunch') || lower.includes('snack')) {
    return 'وجبة خفيفة / سناك (بين الإفطار والسحور)';
  }

  if (index === 2 || lower.includes('عشاء') || lower.includes('dinner')) {
    return 'وجبة السحور المتكاملة (قبل أذان الفجر)';
  }

  return `وجبة الصيام ${index + 1}: ${originalName}`;
}

/**
 * إرشادات دمج البروتين النباتي للصيام المسيحي للحصول على قيمة حيوية كاملة
 */
export const PLANT_PROTEIN_COMBOS = [
  {
    title: 'البقوليات + الحبوب الكاملة',
    examples: 'كشري (أرز + عدس)، فول مدمس + خبز بلدي حبة كاملة، حمص + توست أسمر',
    benefit: 'يكمل النقص في أحماض اللايسين والميثيونين لتكوين بروتين كامل كالحيواني.',
  },
  {
    title: 'المشروم + البقوليات أو التوفو',
    examples: '150 جم مشروم مشوي + 4 ملاعق حمص أو تيمبيه/فول صويا',
    benefit: 'يعطي إحساساً عالياً بالشبع والألياف مع أحماض أمينية ممتازة.',
  },
  {
    title: 'الكينوا وبذور الشيا',
    examples: 'سلطة كينوا مع خضار مشكل + بذور الشيا وبذور اليقطين',
    benefit: 'الكينوا من النباتات النادرة التي تحتوي على الـ 9 أحماض أمينية الأساسية كاملة.',
  },
  {
    title: 'الشوفان + المكسرات وزبدة الفول السوداني',
    examples: 'شوفان بحليب الصويا مع ملعقة زبدة فول سوداني وبذور كتان',
    benefit: 'وجبة غنية بالبروتين والدهون الصحية والمعادن الأساسية.',
  },
];

/**
 * نصائح السحور الذكي لتقليل العطش والجوع نهاراً
 */
export const SUHUR_SMART_TIPS = [
  {
    title: 'أغذية غنية بالبوتاسيوم لمنع العطش',
    items: ['الموز', 'الأفوكادو', 'التمر', 'الزبادي اليوناني', 'السبانخ والخيار'],
    desc: 'البوتاسيوم يحافظ على توازن السوائل داخل الخلايا ويقلل الشعور بالعطش لساعات طويلة.',
  },
  {
    title: 'كربوهيدرات بطيئة الامتصاص لمنع هبوط الطاقة',
    items: ['الشوفان كامل الحبة', 'الخبز الأسمر البلدي', 'البطاطا المشوية', 'الفول المدمس'],
    desc: 'تمنح تياراً مستمراً من الجلوكوز وتمنع الجوع المفاجئ في منتصف النهار.',
  },
  {
    title: 'محاذير يجب تجنبها في السحور',
    items: ['المخللات والأجبان المالحة', 'المقليات والزيوت المهدرجة', 'الحلويات الشرقية عالية السكر', 'الكافيين الزائد'],
    desc: 'تسبب سحب الماء من الخلايا والعطش الشديد والإجهاد السريع.',
  },
];
