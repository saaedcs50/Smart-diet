// ============================================================================
// Batch 3.2: قوالب PDF متعددة الهوية — منطق نقي لاختيار القالب وهوية الترويسة
// منطق التوليد نفسه (jspdf/html2canvas) لا يتغير؛ هذا الملف يقرر فقط:
// أي قالب؟ وهل يظهر الشعار أم تسقط الترويسة لنص؟
// ============================================================================

export type PlanPdfTemplateId = 'classic' | 'brand' | 'compact';

export interface PlanPdfTemplate {
  id: PlanPdfTemplateId;
  label: string;
  description: string;
}

export const PLAN_PDF_TEMPLATES: PlanPdfTemplate[] = [
  {
    id: 'classic',
    label: 'كلاسيك',
    description: 'القالب الحالي كما هو — ترويسة العيادة وكل الأقسام القابلة للضبط.',
  },
  {
    id: 'brand',
    label: 'هوية ملونة',
    description: 'ألوان وشعار واسم علامة هذه النسخة (brand) في الترويسة والعناوين.',
  },
  {
    id: 'compact',
    label: 'مختصر صفحة واحدة',
    description: 'الوجبات والتنبيهات الأساسية فقط — بلا ماكروز ولا أدوية ولا عادات.',
  },
];

const TEMPLATE_IDS: PlanPdfTemplateId[] = ['classic', 'brand', 'compact'];

/** أي قيمة غير معروفة تسقط للكلاسيك الآمن */
export function resolvePlanPdfTemplate(id: unknown): PlanPdfTemplateId {
  return typeof id === 'string' && (TEMPLATE_IDS as string[]).includes(id)
    ? (id as PlanPdfTemplateId)
    : 'classic';
}

export function isCompactTemplate(id: unknown): boolean {
  return resolvePlanPdfTemplate(id) === 'compact';
}

export interface BrandHeaderInput {
  clinicName?: string;
  doctorName?: string;
  logoPath?: string;
  themeColor?: string;
  accentColor?: string;
}

export interface BrandHeaderResolution {
  /** true فقط عند وجود شعار حقيقي مهيأ لهذه النسخة */
  showLogo: boolean;
  logoSrc: string | null;
  /** نص الترويسة البديل عند غياب الشعار (اسم العيادة ثم الأخصائية) */
  fallbackLabel: string;
  primary: string;
  accent: string;
}

/**
 * الشعار الافتراضي العام (/icon.svg) لا يُعد شعار علامة — عندها تسقط الترويسة
 * لنص اسم العيادة دون أي فراغ، كما تشترط المواصفة.
 */
export function resolveBrandHeader(brand: BrandHeaderInput): BrandHeaderResolution {
  const logo = (brand.logoPath || '').trim();
  const hasRealLogo = logo.length > 0 && logo !== '/icon.svg';
  return {
    showLogo: hasRealLogo,
    logoSrc: hasRealLogo ? logo : null,
    fallbackLabel: (brand.clinicName || '').trim() || (brand.doctorName || '').trim() || 'Smart Diet Clinic',
    primary: (brand.themeColor || '').trim() || '#5B2482',
    accent: (brand.accentColor || '').trim() || '#E21B6D',
  };
}
