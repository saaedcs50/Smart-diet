import { PlanConfig, DayLog, SectionVisibility } from '../types';

export const DEFAULT_VISIBLE_SECTIONS: SectionVisibility = {
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
  medicationsTracker: true,
  cycleTracker: true,
  labTracker: true,
  doctorNotes: true,
  quickReportBtn: true,
  bodyTab: true,
  reportsTab: true,
};

export function isSectionVisible(plan?: PlanConfig | null, key?: keyof SectionVisibility): boolean {
  if (!plan || !key) return true;
  if (plan.visibleSections && typeof plan.visibleSections[key] === 'boolean') {
    return plan.visibleSections[key]!;
  }
  // Backwards compatibility with boolean flags
  if (key === 'macrosTracker' && plan.enableMacrosTracker === false) return false;
  if (key === 'fastingTimer' && plan.enableFastingTimer === false) return false;
  return true;
}

export const DEFAULT_PLAN: PlanConfig = {
  clientName: 'المتدرب',
  dailyWaterGoalMl: 3000,
  heightCm: 175,
  startWeight: 88,
  targetWeight: 75,
  targetWaist: 82,
  freezeDaysPerMonth: 2,
  adminPin: '1234',
  targetCalories: 2000,
  targetProtein: 140,
  targetCarbs: 180,
  targetFats: 55,
  enableMacrosTracker: true,
  enableFastingTimer: true,
  fastingTargetHours: 16,
  visibleSections: DEFAULT_VISIBLE_SECTIONS,
  scoreWeights: {
    checklist: 30,
    water: 25,
    sleep: 15,
    meals: 30,
  },
  meals: [
    {
      id: 'm_breakfast',
      name: 'وجبة الإفطار',
      items: '3 بيضات مسلوقة أو أومليت بقليل من زيت الزيتون + نصف رغيف خبز بلدي + خضار طازج',
      alternatives: [
        '120 جم جبن قريش بزيت الزيتون والزعتر + شريحة توست أسمر + خضار',
        '4 ملاعق شوفان مع حليب خالي الدسم وحصة بروتين وموزة صغيرة',
      ],
      calories: 450,
      proteinGrams: 30,
    },
    {
      id: 'm_lunch',
      name: 'وجبة الغداء',
      items: '180 جم صدور دجاج مشوية أو مسلوقة + 6 ملاعق أرز مسلوق + طبق سلطة خضراء كبير',
      alternatives: [
        '200 جم سمك مشوي + 150 جم بطاطس مشوية + سلطة خضراء',
        'علبة تونة مصفاة من الزيت + خبز أسمر أو بطاطس مسلوقة + سلطة خضراء',
      ],
      calories: 600,
      proteinGrams: 48,
    },
    {
      id: 'm_snack',
      name: 'وجبة خفيفة (سناك)',
      items: 'حبة فاكهة (تفاح أو موز) + 15 حبة لوز أو مكسرات نيئة غير مملحة',
      alternatives: [
        'كوب زبادي يوناني أو قليل الدسم + ملعقة بذور شيا',
        'قهوة سادة أو شاي أخضر + مكعبين شوكولاتة داكنة (70%+)',
      ],
      calories: 220,
      proteinGrams: 10,
    },
    {
      id: 'm_dinner',
      name: 'وجبة العشاء',
      items: 'زبادي قليل الدسم + عصرة ليمون + طبق سلطة خضراء',
      alternatives: [
        'بيضتان مسلوقتان مع طبق خضار ورقي وخيار',
        '100 جم جبن قريش مع طماطم وخيار',
      ],
      calories: 280,
      proteinGrams: 22,
    },
  ],
  checklist: [
    { id: 'c_morning_water', label: 'شرب 500 مل ماء فور الاستيقاظ' },
    { id: 'c_veggies', label: 'تناول حصة خضار طازج أو ورقي مع الوجبات' },
    { id: 'c_no_sugar', label: 'الامتناع عن السكريات المضافة والمشروبات الغازية' },
    { id: 'c_steps', label: 'المشي من 8,000 إلى 10,000 خطوة يومياً' },
    { id: 'c_early_dinner', label: 'التوقف عن تناول الطعام قبل النوم بـ 2-3 ساعات' },
  ],
  supplements: [
    { id: 's_multivitamin', name: 'فيتامينات متعددة (بعد الإفطار)', time: 'صباحاً' },
    { id: 's_omega3', name: 'أوميجا 3 (مع وجبة الغداء)', time: 'ظهراً' },
    { id: 's_magnesium', name: 'مغنيسيوم (قبل النوم)', time: 'مساءً' },
    { id: 's_vit_d', name: 'فيتامين د3', time: 'صباحاً' },
  ],
  tips: [
    'احرص على شرب كوب ماء قبل كل وجبة بربع ساعة للمساعدة في الشعور بالامتلاء.',
    'ابدأ الوجبة بالسلطة والخضار ثم مصدر البروتين قبل الكربوهيدرات لضبط مستويات السكر في الدم.',
    'في حال الشعور برغبة مفاجئة في تناول الطعام، اشرب الماء أولاً للتأكد من عدم وجود جفاف.',
    'النوم المنتظم من 7 إلى 8 ساعات يومياً يعزز معدلات الأيض ويقلل من هرمونات التوتر والشهية.',
  ],
  symptomsList: [
    { id: 'sy_fatigue', label: 'إرهاق وخمول' },
    { id: 'sy_headache', label: 'صداع خفيف' },
    { id: 'sy_bloating', label: 'انتفاخ وغازات' },
    { id: 'sy_constipation', label: 'إمساك' },
    { id: 'sy_extreme_hunger', label: 'جوع شديد غير معتاد' },
    { id: 'sy_sugar_cravings', label: 'اشتهاء حلويات وسكريات' },
    { id: 'sy_mood_swings', label: 'عصبية أو تقلب مزاج' },
    { id: 'sy_insomnia', label: 'أرق وصعوبة نوم' },
    { id: 'sy_muscle_cramps', label: 'شد عضلي' },
    { id: 'sy_dizziness', label: 'دوخة أو هبوط ضغط' },
  ],
};

const PLAN_KEY = 'nt_v6_egypt_plan';
const DAY_PREFIX = 'nt_v6_egypt_day_';

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createEmptyDayLog(): DayLog {
  return {
    water: 0,
    waterLogs: 0,
    sleep: '',
    wake: '',
    sleepHours: null,
    quality: '',
    meals: {},
    checks: {},
    supps: {},
    medications: {},
    notes: '',
    weight: null,
    meas: {
      waist: null,
      chest: null,
      hips: null,
      arm: null,
      thigh: null,
      neck: null,
    },
    symptoms: {},
    symNotes: '',
    mood: null,
    exercise: 0,
    isFreeze: false,
    consumedCalories: 0,
    consumedProtein: 0,
    consumedCarbs: 0,
    consumedFats: 0,
    isFasting: false,
    fastingStartTime: null,
    fastingEndTime: null,
    completedFastingHours: null,
  };
}

export function loadPlanFromStorage(): PlanConfig {
  try {
    const raw = localStorage.getItem(PLAN_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_PLAN, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load plan', e);
  }
  return DEFAULT_PLAN;
}

export function savePlanToStorage(plan: PlanConfig): boolean {
  try {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    return true;
  } catch (e) {
    console.error('Failed to save plan', e);
    return false;
  }
}

export function loadDayLog(dateStr: string): DayLog {
  try {
    const raw = localStorage.getItem(DAY_PREFIX + dateStr);
    if (raw) {
      const parsed = JSON.parse(raw);
      const empty = createEmptyDayLog();
      return {
        ...empty,
        ...parsed,
        meas: { ...empty.meas, ...(parsed.meas || {}) },
        meals: parsed.meals || {},
        checks: parsed.checks || {},
        supps: parsed.supps || {},
        medications: parsed.medications || {},
        symptoms: parsed.symptoms || {},
      };
    }
  } catch (e) {
    console.error('Failed to load day log', e);
  }
  return createEmptyDayLog();
}

export function saveDayLog(dateStr: string, day: DayLog): boolean {
  try {
    localStorage.setItem(DAY_PREFIX + dateStr, JSON.stringify(day));
    return true;
  } catch (e) {
    console.error('Failed to save day log', e);
    return false;
  }
}

export function getAllStoredDayLogs(): Record<string, DayLog> {
  const result: Record<string, DayLog> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(DAY_PREFIX)) {
      const dateStr = key.slice(DAY_PREFIX.length);
      try {
        result[dateStr] = JSON.parse(localStorage.getItem(key) || '{}');
      } catch {
        // skip corrupted
      }
    }
  }
  return result;
}

export function exportFullBackupJSON(): string {
  const plan = loadPlanFromStorage();
  const dailyLogs = getAllStoredDayLogs();
  let notificationSettings = null;
  try {
    const rawNotifs = localStorage.getItem('nt_notification_settings');
    if (rawNotifs) notificationSettings = JSON.parse(rawNotifs);
  } catch (e) {}

  const backup = {
    app: 'NutritionTracker_Egypt_Pro',
    version: '7.0-PWA',
    releaseName: 'إصدار PWA التنبيهات الذكية وحاسبة الماكروز والصيام',
    exportedAt: new Date().toISOString(),
    plan,
    dailyLogs,
    notificationSettings,
  };
  return JSON.stringify(backup, null, 2);
}

export function importFullBackupJSON(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.plan) {
      savePlanToStorage(data.plan);
    }
    if (data.notificationSettings) {
      localStorage.setItem('nt_notification_settings', JSON.stringify(data.notificationSettings));
    }
    if (data.dailyLogs && typeof data.dailyLogs === 'object') {
      Object.entries(data.dailyLogs).forEach(([dateStr, log]) => {
        localStorage.setItem(DAY_PREFIX + dateStr, JSON.stringify(log));
      });
    }
    return true;
  } catch (e) {
    console.error('Failed to import backup', e);
    return false;
  }
}
