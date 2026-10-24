export type MedicationCategoryType =
  | 'hypertension'
  | 'diabetes'
  | 'thyroid'
  | 'weight_loss'
  | 'supplements'
  | 'lipids'
  | 'gastro'
  | 'gout_renal'
  | 'womens_health'
  | 'joints_bones'
  | 'urology'
  | 'general';

/**
 * إصدار قاعدة بيانات الأدوية — زِد الرقم وحدّث التاريخ عند أي تعديل على بيانات
 * الأدوية أو الأسعار (المصدر: مراجعة يدوية للسوق المصري).
 * يُعرض في تذييل دليل الأدوية حتى تعرف الأخصائية نُسخة البيانات التي تستخدمها.
 */
export const MEDS_DATA_VERSION = '2026.10';
export const MEDS_DATA_UPDATED_AT = '2026-10-04';

export interface EgyptianMedication {
  id: string;
  tradeName: string;
  tradeNameEn: string;
  scientificName: string;
  category: MedicationCategoryType;
  categoryAr: string;
  categoryIcon: string;
  defaultTiming: string;
  dosageForm: string;
  commonDoses: string[];
  clinicalNotes: string;
  searchTokens: string[];
}
