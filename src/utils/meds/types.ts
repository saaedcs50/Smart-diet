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
