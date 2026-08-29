import { LabEntry, LabTrackingConfig } from '../types';

export const LAB_DISCLAIMER_NOTE =
  'النطاقات المرجعية المعروضة إرشادية وتثقيفية عامة؛ تختلف المعايير المرجعية الدقيقة باختلاف المختبر والأجهزة والتشخيص السريري. لا تُعتبر تشخيصاً طبياً قاطعاً.';

export interface LabTestCatalogItem {
  id: string;
  nameAr: string;
  shortName: string;
  defaultUnit: string;
  altUnits?: string[];
  category: 'glycemic' | 'vitamins_minerals' | 'lipids' | 'hormones' | 'custom';
  categoryLabel: string;
  icon: string;
  color: {
    bg: string;
    border: string;
    text: string;
    dot: string;
  };
  rangeGuidance: {
    min?: number;
    max?: number;
    text: string;
    hint: string;
  };
  // Evaluate reading
  evaluator?: (val: number) => {
    status: 'within' | 'above' | 'below' | 'guideline';
    label: string;
    badgeClass: string;
  };
}

export const LAB_CATALOG: LabTestCatalogItem[] = [
  {
    id: 'fasting_glucose',
    nameAr: 'سكر صائم (Fasting Blood Glucose)',
    shortName: 'سكر صائم',
    defaultUnit: 'mg/dL',
    altUnits: ['mg/dL', 'mmol/L'],
    category: 'glycemic',
    categoryLabel: 'السكر والأيض',
    icon: '🩸',
    color: {
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      border: 'border-rose-200 dark:border-rose-900/50',
      text: 'text-rose-700 dark:text-rose-300',
      dot: '#e11d48',
    },
    rangeGuidance: {
      min: 70,
      max: 99,
      text: '70 – 99 mg/dL',
      hint: 'مؤشر لحساسية الأنسولين وضبط الوجبات والكاربوهيدرات.',
    },
    evaluator: (val: number) => {
      if (val < 70) {
        return {
          status: 'below',
          label: 'أقل من النطاق الإرشادي (< 70)',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      }
      if (val <= 99) {
        return {
          status: 'within',
          label: 'ضمن النطاق الإرشادي (70–99)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      if (val <= 125) {
        return {
          status: 'above',
          label: 'أعلى من الإرشادي (100–125 مرحلة ما قبل السكري)',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      }
      return {
        status: 'above',
        label: 'مرتفع عن النطاق الإرشادي (≥ 126)',
        badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      };
    },
  },
  {
    id: 'hba1c',
    nameAr: 'السكر التراكمي (HbA1c)',
    shortName: 'السكر التراكمي',
    defaultUnit: '%',
    category: 'glycemic',
    categoryLabel: 'السكر والأيض',
    icon: '📊',
    color: {
      bg: 'bg-red-50 dark:bg-red-950/40',
      border: 'border-red-200 dark:border-red-900/50',
      text: 'text-red-700 dark:text-red-300',
      dot: '#dc2626',
    },
    rangeGuidance: {
      max: 5.7,
      text: '< 5.7 %',
      hint: 'يعكس متوسط السكر في الدم خلال آخر 2 إلى 3 أشهر.',
    },
    evaluator: (val: number) => {
      if (val < 5.7) {
        return {
          status: 'within',
          label: 'ضمن النطاق الإرشادي (< 5.7%)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      if (val <= 6.4) {
        return {
          status: 'above',
          label: 'أعلى من الإرشادي (5.7–6.4% مرحلة ما قبل السكري)',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      }
      return {
        status: 'above',
        label: 'مرتفع عن الإرشادي (≥ 6.5%)',
        badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      };
    },
  },
  {
    id: 'vitamin_d',
    nameAr: 'فيتامين د 25-OH (Vitamin D)',
    shortName: 'فيتامين د',
    defaultUnit: 'ng/mL',
    altUnits: ['ng/mL', 'nmol/L'],
    category: 'vitamins_minerals',
    categoryLabel: 'الفيتامينات والمعادن',
    icon: '☀️',
    color: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-900/50',
      text: 'text-amber-700 dark:text-amber-300',
      dot: '#d97706',
    },
    rangeGuidance: {
      min: 30,
      max: 100,
      text: '30 – 100 ng/mL',
      hint: 'ضروري لصحة العظام والمناعة ومستويات الطاقة واستجابة الإنسولين.',
    },
    evaluator: (val: number) => {
      if (val < 20) {
        return {
          status: 'below',
          label: 'نقص دون النطاق الإرشادي (< 20)',
          badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        };
      }
      if (val < 30) {
        return {
          status: 'below',
          label: 'غير كافٍ إرشادياً (20–29)',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      }
      if (val <= 100) {
        return {
          status: 'within',
          label: 'كافٍ وضمن النطاق الإرشادي (30–100)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      return {
        status: 'above',
        label: 'أعلى من النطاق المعتاد (> 100)',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      };
    },
  },
  {
    id: 'ferritin',
    nameAr: 'مخزون الحديد (Ferritin)',
    shortName: 'فيريتين',
    defaultUnit: 'ng/mL',
    category: 'vitamins_minerals',
    categoryLabel: 'الفيتامينات والمعادن',
    icon: '🧲',
    color: {
      bg: 'bg-orange-50 dark:bg-orange-950/40',
      border: 'border-orange-200 dark:border-orange-900/50',
      text: 'text-orange-700 dark:text-orange-300',
      dot: '#ea580c',
    },
    rangeGuidance: {
      min: 20,
      max: 200,
      text: '20 – 200 ng/mL',
      hint: 'مؤشر مخزون الحديد بالجسم، يرتبط بالطاقة وتساقط الشعر والنشاط.',
    },
    evaluator: (val: number) => {
      if (val < 20) {
        return {
          status: 'below',
          label: 'منخفض عن الإرشادي (< 20)',
          badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        };
      }
      if (val < 40) {
        return {
          status: 'within',
          label: 'ضمن الحد الأدنى الإرشادي (20–40)',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      }
      if (val <= 200) {
        return {
          status: 'within',
          label: 'ضمن النطاق الإرشادي (40–200)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      return {
        status: 'above',
        label: 'أعلى من النطاق المعتاد (> 200)',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      };
    },
  },
  {
    id: 'iron',
    nameAr: 'حديد المصل (Serum Iron)',
    shortName: 'حديد مصل',
    defaultUnit: 'µg/dL',
    category: 'vitamins_minerals',
    categoryLabel: 'الفيتامينات والمعادن',
    icon: '🔬',
    color: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-900/50',
      text: 'text-amber-700 dark:text-amber-300',
      dot: '#b45309',
    },
    rangeGuidance: {
      min: 60,
      max: 170,
      text: '60 – 170 µg/dL',
      hint: 'كمية الحديد الحرة السارية بالدم.',
    },
    evaluator: (val: number) => {
      if (val < 60) {
        return {
          status: 'below',
          label: 'أقل من النطاق الإرشادي (< 60)',
          badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        };
      }
      if (val <= 170) {
        return {
          status: 'within',
          label: 'ضمن النطاق الإرشادي (60–170)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      return {
        status: 'above',
        label: 'أعلى من النطاق الإرشادي (> 170)',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      };
    },
  },
  {
    id: 'ldl',
    nameAr: 'كوليسترول ضار (LDL-C)',
    shortName: 'LDL',
    defaultUnit: 'mg/dL',
    category: 'lipids',
    categoryLabel: 'الدهون وصحة القلب',
    icon: '🫀',
    color: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-200 dark:border-indigo-900/50',
      text: 'text-indigo-700 dark:text-indigo-300',
      dot: '#4f46e5',
    },
    rangeGuidance: {
      max: 100,
      text: '< 100 mg/dL',
      hint: 'الهدف المثالي للأصحاء أقل من 100 لحماية الأوعية الدموية.',
    },
    evaluator: (val: number) => {
      if (val < 100) {
        return {
          status: 'within',
          label: 'مثالي إرشادياً (< 100)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      if (val <= 129) {
        return {
          status: 'within',
          label: 'شبه مثالي (100–129)',
          badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-200 dark:border-teal-800',
        };
      }
      if (val <= 159) {
        return {
          status: 'above',
          label: 'حد مرتفع عن الإرشادي (130–159)',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      }
      return {
        status: 'above',
        label: 'مرتفع عن النطاق الإرشادي (≥ 160)',
        badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      };
    },
  },
  {
    id: 'hdl',
    nameAr: 'كوليسترول نافع (HDL-C)',
    shortName: 'HDL',
    defaultUnit: 'mg/dL',
    category: 'lipids',
    categoryLabel: 'الدهون وصحة القلب',
    icon: '🛡️',
    color: {
      bg: 'bg-teal-50 dark:bg-teal-950/40',
      border: 'border-teal-200 dark:border-teal-900/50',
      text: 'text-teal-700 dark:text-teal-300',
      dot: '#0d9488',
    },
    rangeGuidance: {
      min: 50,
      text: '> 50 mg/dL',
      hint: 'ارتفاعه إيجابي ويحمي الشرايين، يزداد بالنشاط والدهون الصحية.',
    },
    evaluator: (val: number) => {
      if (val >= 50) {
        return {
          status: 'within',
          label: 'ممتاز وضمن النطاق الإرشادي (≥ 50)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      if (val >= 40) {
        return {
          status: 'within',
          label: 'مقبول (40–49)',
          badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-200 dark:border-teal-800',
        };
      }
      return {
        status: 'below',
        label: 'منخفض عن الإرشادي (< 40)',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      };
    },
  },
  {
    id: 'triglycerides',
    nameAr: 'الدهون الثلاثية (Triglycerides)',
    shortName: 'دهون ثلاثية',
    defaultUnit: 'mg/dL',
    category: 'lipids',
    categoryLabel: 'الدهون وصحة القلب',
    icon: '🧪',
    color: {
      bg: 'bg-cyan-50 dark:bg-cyan-950/40',
      border: 'border-cyan-200 dark:border-cyan-900/50',
      text: 'text-cyan-700 dark:text-cyan-300',
      dot: '#0891b2',
    },
    rangeGuidance: {
      max: 150,
      text: '< 150 mg/dL',
      hint: 'ترتبط باستهلاك النشويات المكررة والسكريات والدهون الحشوية.',
    },
    evaluator: (val: number) => {
      if (val < 150) {
        return {
          status: 'within',
          label: 'ضمن النطاق الإرشادي (< 150)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      if (val <= 199) {
        return {
          status: 'above',
          label: 'حد مرتفع عن الإرشادي (150–199)',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      }
      return {
        status: 'above',
        label: 'مرتفع عن النطاق الإرشادي (≥ 200)',
        badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      };
    },
  },
  {
    id: 'total_cholesterol',
    nameAr: 'كوليسترول كلي (Total Cholesterol)',
    shortName: 'كوليسترول كلي',
    defaultUnit: 'mg/dL',
    category: 'lipids',
    categoryLabel: 'الدهون وصحة القلب',
    icon: '🫧',
    color: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-900/50',
      text: 'text-blue-700 dark:text-blue-300',
      dot: '#2563eb',
    },
    rangeGuidance: {
      max: 200,
      text: '< 200 mg/dL',
      hint: 'المجموع الكلي للكوليسترول في الدم.',
    },
    evaluator: (val: number) => {
      if (val < 200) {
        return {
          status: 'within',
          label: 'ضمن النطاق الإرشادي (< 200)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      if (val <= 239) {
        return {
          status: 'above',
          label: 'حد مرتفع إرشادياً (200–239)',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      }
      return {
        status: 'above',
        label: 'مرتفع عن الإرشادي (≥ 240)',
        badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      };
    },
  },
  {
    id: 'tsh',
    nameAr: 'هرمون الغدة الدرقية (TSH)',
    shortName: 'TSH',
    defaultUnit: 'mIU/L',
    category: 'hormones',
    categoryLabel: 'الهرمونات والغدد',
    icon: '🦋',
    color: {
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      border: 'border-purple-200 dark:border-purple-900/50',
      text: 'text-purple-700 dark:text-purple-300',
      dot: '#9333ea',
    },
    rangeGuidance: {
      min: 0.4,
      max: 4.0,
      text: '0.4 – 4.0 mIU/L',
      hint: 'المنظم الرئيسي لنشاط الغدة ومعدلات حرق الدهون والطاقة.',
    },
    evaluator: (val: number) => {
      if (val < 0.4) {
        return {
          status: 'below',
          label: 'أقل من النطاق الإرشادي (< 0.4)',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      }
      if (val <= 4.0) {
        return {
          status: 'within',
          label: 'ضمن النطاق الإرشادي (0.4–4.0)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      return {
        status: 'above',
        label: 'أعلى من النطاق الإرشادي (> 4.0)',
        badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      };
    },
  },
  {
    id: 'b12',
    nameAr: 'فيتامين ب12 (Vitamin B12)',
    shortName: 'فيتامين B12',
    defaultUnit: 'pg/mL',
    altUnits: ['pg/mL', 'pmol/L'],
    category: 'vitamins_minerals',
    categoryLabel: 'الفيتامينات والمعادن',
    icon: '⚡',
    color: {
      bg: 'bg-yellow-50 dark:bg-yellow-950/40',
      border: 'border-yellow-200 dark:border-yellow-900/50',
      text: 'text-yellow-700 dark:text-yellow-300',
      dot: '#ca8a04',
    },
    rangeGuidance: {
      min: 200,
      max: 900,
      text: '200 – 900 pg/mL',
      hint: 'أساسي لسلامة الأعصاب وتكوين الدم والتركيز والطاقة.',
    },
    evaluator: (val: number) => {
      if (val < 200) {
        return {
          status: 'below',
          label: 'نقص دون النطاق الإرشادي (< 200)',
          badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        };
      }
      if (val < 350) {
        return {
          status: 'within',
          label: 'ضمن الحد الأدنى الإرشادي (200–349)',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      }
      if (val <= 900) {
        return {
          status: 'within',
          label: 'ضمن النطاق الإرشادي (350–900)',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      }
      return {
        status: 'above',
        label: 'أعلى من النطاق المعتاد (> 900)',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      };
    },
  },
  {
    id: 'custom',
    nameAr: 'تحليل آخر مخصص (Custom Test)',
    shortName: 'تحليل مخصص',
    defaultUnit: '',
    category: 'custom',
    categoryLabel: 'تحاليل أخرى',
    icon: '📑',
    color: {
      bg: 'bg-slate-50 dark:bg-slate-800/60',
      border: 'border-slate-200 dark:border-slate-700',
      text: 'text-slate-700 dark:text-slate-300',
      dot: '#64748b',
    },
    rangeGuidance: {
      text: 'حسب إرشادات المختبر',
      hint: 'قراءة مخصصة محددة من قبل الأخصائي أو العميل.',
    },
  },
];

/**
 * Get metadata for a testId (catalog or custom)
 */
export function getLabTestMeta(testId: string, customName?: string): LabTestCatalogItem {
  const found = LAB_CATALOG.find((item) => item.id === testId);
  if (found) {
    if (testId === 'custom' && customName?.trim()) {
      return {
        ...found,
        nameAr: customName.trim(),
        shortName: customName.trim(),
      };
    }
    return found;
  }
  // Fallback for custom or unrecognized
  return {
    id: testId,
    nameAr: customName?.trim() || testId,
    shortName: customName?.trim() || testId,
    defaultUnit: '',
    category: 'custom',
    categoryLabel: 'تحاليل أخرى',
    icon: '📑',
    color: {
      bg: 'bg-slate-50 dark:bg-slate-800/60',
      border: 'border-slate-200 dark:border-slate-700',
      text: 'text-slate-700 dark:text-slate-300',
      dot: '#64748b',
    },
    rangeGuidance: {
      text: 'حسب إرشادات المختبر',
      hint: 'تحليل خاص',
    },
  };
}

export type TrendDirection = 'up' | 'down' | 'same' | 'none';

export interface TestTrendSummary {
  current: LabEntry;
  previous: LabEntry | null;
  trend: TrendDirection;
  diff: number | null;
  percentChange: number | null;
  allSorted: LabEntry[];
}

/**
 * Calculate trend for a list of entries belonging to the same test
 */
export function calculateTestTrend(entries: LabEntry[]): TestTrendSummary | null {
  if (!entries || entries.length === 0) return null;

  // Sort chronologically ascending
  const sorted = [...entries].sort((a, b) => {
    const cmp = a.date.localeCompare(b.date);
    if (cmp !== 0) return cmp;
    return (a.createdAt || '').localeCompare(b.createdAt || '');
  });

  const current = sorted[sorted.length - 1];
  const previous = sorted.length > 1 ? sorted[sorted.length - 2] : null;

  if (!previous) {
    return {
      current,
      previous: null,
      trend: 'none',
      diff: null,
      percentChange: null,
      allSorted: sorted,
    };
  }

  const diff = Math.round((current.value - previous.value) * 100) / 100;
  // If difference is negligible (< 0.5% of previous value or diff == 0)
  const isPracticallyZero = Math.abs(diff) <= 0.0001 || (previous.value !== 0 && Math.abs(diff / previous.value) < 0.005);

  let trend: TrendDirection = 'same';
  if (!isPracticallyZero) {
    trend = diff > 0 ? 'up' : 'down';
  }

  const percentChange = previous.value !== 0 ? Math.round((diff / previous.value) * 1000) / 10 : null;

  return {
    current,
    previous,
    trend,
    diff,
    percentChange,
    allSorted: sorted,
  };
}

/**
 * Group lab entries by a composite test key: testId or `custom__${customName}`
 */
export function groupLabEntriesByTest(entries: LabEntry[]): Record<string, LabEntry[]> {
  const grouped: Record<string, LabEntry[]> = {};
  if (!entries) return grouped;

  for (const entry of entries) {
    const key = entry.testId === 'custom' && entry.customName?.trim()
      ? `custom__${entry.customName.trim().toLowerCase()}`
      : entry.testId;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(entry);
  }

  return grouped;
}

/**
 * Get the latest 3 updated lab test summaries for reports
 */
export function getLatestLabSummary(
  entries: LabEntry[],
  limit = 3
): Array<{
  testKey: string;
  meta: LabTestCatalogItem;
  latest: LabEntry;
  previous: LabEntry | null;
  trend: TrendDirection;
  diff: number | null;
}> {
  const grouped = groupLabEntriesByTest(entries);
  const results: Array<{
    testKey: string;
    meta: LabTestCatalogItem;
    latest: LabEntry;
    previous: LabEntry | null;
    trend: TrendDirection;
    diff: number | null;
    latestDate: string;
  }> = [];

  for (const [key, testEntries] of Object.entries(grouped)) {
    const summary = calculateTestTrend(testEntries);
    if (!summary) continue;

    const sample = summary.current;
    const meta = getLabTestMeta(sample.testId, sample.customName);

    results.push({
      testKey: key,
      meta,
      latest: summary.current,
      previous: summary.previous,
      trend: summary.trend,
      diff: summary.diff,
      latestDate: summary.current.date,
    });
  }

  // Sort by latest date descending
  results.sort((a, b) => b.latestDate.localeCompare(a.latestDate));

  return results.slice(0, limit);
}

/**
 * Format brief summary of latest lab tests for WhatsApp Coach Reports
 */
export function formatLabSummaryForWhatsApp(entries: LabEntry[], limit = 3): string {
  const latestList = getLatestLabSummary(entries, limit);
  if (latestList.length === 0) return '';

  const itemsText = latestList
    .map((item) => {
      const name = item.meta.shortName;
      const val = `${item.latest.value}${item.latest.unit ? ` ${item.latest.unit}` : ''}`;
      if (item.previous && item.trend !== 'none') {
        const arrow = item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→';
        return `${name}: ${val} (${arrow} عن ${item.previous.value})`;
      }
      return `${name}: ${val}`;
    })
    .join(' • ');

  return `🧪 *تحاليل حديثة:* ${itemsText}`;
}
