import { EgyptianMedication, MedicationCategoryType } from './meds/types';
import { CARDIO_HYPERTENSION_MEDS } from './meds/cardioHypertension';
import { DIABETES_ENDOCRINE_MEDS } from './meds/diabetesEndocrine';
import { THYROID_MEDS } from './meds/thyroid';
import { WEIGHT_LOSS_MEDS } from './meds/weightLoss';
import { SUPPLEMENTS_VITAMINS_MEDS } from './meds/supplementsVitamins';
import { LIPIDS_LIVER_MEDS } from './meds/lipidsLiver';
import { GASTRO_INTESTINAL_MEDS } from './meds/gastroIntestinal';
import { GOUT_RENAL_WOMENS_MEDS } from './meds/goutRenalWomens';
import { JOINTS_PAIN_MEDS } from './meds/jointsPain';
import { UROLOGY_PROSTATE_MEDS } from './meds/urologyProstate';
import { GLOBAL_COMMERCIAL_SUPPLEMENTS } from './meds/globalCommercialSupplements';
import { MORE_SUPPLEMENTS_AND_MEDS } from './meds/moreSupplementsAndMeds';
import { DWAPRICES_EGYPTIAN_MEDS } from './meds/dwapricesEgyptianMeds';

export type { EgyptianMedication, MedicationCategoryType };

/**
 * Verified Comprehensive Database of Egyptian & Global Market Medications & Supplements
 * Categorized & Double-Checked with Exact Clinical Pharmacology, Food Interactions & Timings
 */
export const EGYPTIAN_MEDICATIONS_DATABASE: EgyptianMedication[] = [
  ...CARDIO_HYPERTENSION_MEDS,
  ...DIABETES_ENDOCRINE_MEDS,
  ...THYROID_MEDS,
  ...WEIGHT_LOSS_MEDS,
  ...SUPPLEMENTS_VITAMINS_MEDS,
  ...GLOBAL_COMMERCIAL_SUPPLEMENTS,
  ...MORE_SUPPLEMENTS_AND_MEDS,
  ...DWAPRICES_EGYPTIAN_MEDS,
  ...LIPIDS_LIVER_MEDS,
  ...GASTRO_INTESTINAL_MEDS,
  ...GOUT_RENAL_WOMENS_MEDS,
  ...JOINTS_PAIN_MEDS,
  ...UROLOGY_PROSTATE_MEDS,
];

export const MEDICATION_CATEGORIES = [
  { id: 'all', label: 'الكل 🌐', icon: '🌐' },
  { id: 'hypertension', label: 'الضغط والقلب 💓', icon: '💓' },
  { id: 'diabetes', label: 'السكر والتمثيل 🩸', icon: '🩸' },
  { id: 'thyroid', label: 'الغدة الدرقية 🦋', icon: '🦋' },
  { id: 'weight_loss', label: 'التخسيس والوزن ⚖️', icon: '⚖️' },
  { id: 'supplements', label: 'الفيتامينات والمكملات 💊', icon: '💊' },
  { id: 'joints_bones', label: 'المفاصل والعظام والغضاريف 🦴', icon: '🦴' },
  { id: 'lipids', label: 'الدهون والكوليسترول 🧪', icon: '🧪' },
  { id: 'gastro', label: 'الجهاز الهضمي والقولون 🫄', icon: '🫄' },
  { id: 'urology', label: 'المسالك والبروستاتا 🚻', icon: '🚻' },
  { id: 'gout_renal', label: 'النقرس والأملاح والكلى 💧', icon: '💧' },
  { id: 'womens_health', label: 'صحة المرأة وتكيس المبايض 🌸', icon: '🌸' },
  { id: 'general', label: 'الأعصاب والمزاج والنوم 🧠', icon: '🧠' },
];

/**
 * Searches and filters medications with fuzzy matching across arabic, english, active ingredients, doses, and clinical uses.
 */
export function searchEgyptianMedications(query: string, categoryFilter: string = 'all'): EgyptianMedication[] {
  const cleanQuery = (query || '').trim().toLowerCase();
  
  let list = EGYPTIAN_MEDICATIONS_DATABASE;
  if (categoryFilter && categoryFilter !== 'all') {
    list = list.filter(m => m.category === categoryFilter);
  }

  if (!cleanQuery) {
    return list;
  }

  const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);

  return list.filter(med => {
    const haystacks = [
      med.tradeName.toLowerCase(),
      med.tradeNameEn.toLowerCase(),
      med.scientificName.toLowerCase(),
      med.categoryAr.toLowerCase(),
      med.clinicalNotes.toLowerCase(),
      med.defaultTiming.toLowerCase(),
      med.dosageForm.toLowerCase(),
      ...(med.commonDoses || []).map(d => d.toLowerCase()),
      ...med.searchTokens.map(t => t.toLowerCase())
    ];

    return queryTerms.every(term => haystacks.some(h => h.includes(term)));
  });
}
