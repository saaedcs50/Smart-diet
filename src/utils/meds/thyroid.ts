import { EgyptianMedication } from './types';

export const THYROID_MEDS: EgyptianMedication[] = [
  // ==========================================
  // Hypothyroidism (علاجات خمول وقصور الغدة الدرقية)
  // ==========================================
  {
    id: 'eltroxin_50_100',
    tradeName: 'إلتروكسين (Eltroxin)',
    tradeNameEn: 'Eltroxin 50mcg, 100mcg (GlaxoSmithKline)',
    scientificName: 'ليفوثيروكسين صوديوم (Levothyroxine Sodium)',
    category: 'thyroid',
    categoryAr: 'هرمون الغدة الدرقية التعويضي لخمول الغدة',
    categoryIcon: '🦋',
    defaultTiming: 'صباحاً على الريق فور الاستيقاظ قبل الإفطار بـ 60 دقيقة كاملة مع كوب ماء نقي فقط',
    dosageForm: 'أقراص سهلة البلع',
    commonDoses: ['25 ميكروجرام', '50 ميكروجرام', '100 ميكروجرام'],
    clinicalNotes: 'قاعدة دوائية ذهبية: يفصل 4 ساعات كاملة عن مكملات الكالسيوم، الحديد، مضادات الحموضة، وفول الصويا والقهوة الصباحية لأنها ترتبط بالدواء وتمنع امتصاصه تماماً.',
    searchTokens: ['التروكسين', 'إلتروكسين', 'eltroxin', 'levothyroxine', 'ليفوثيروكسين', 'خمول الغدة', 'على الريق', 'غدة درقية']
  },
  {
    id: 'euthyrox_25_50_100_150',
    tradeName: 'إيثيروكس (Euthyrox)',
    tradeNameEn: 'Euthyrox 25, 50, 88, 100, 112, 125, 137, 150mcg (Merck)',
    scientificName: 'ليفوثيروكسين نقي عالي الدقة (Levothyroxine Sodium)',
    category: 'thyroid',
    categoryAr: 'هرمون الغدة الدرقية بجرعات متناهية الدقة',
    categoryIcon: '🦋',
    defaultTiming: 'على الريق قبل الإفطار بساعة (أو قبل النوم بـ 3-4 ساعات بعد آخر وجبة عشاء)',
    dosageForm: 'أقراص مقسمة دقيقة المعايرة',
    commonDoses: ['25 ميكروجرام', '50 ميكروجرام', '88 ميكروجرام', '100 ميكروجرام', '112 ميكروجرام', '125 ميكروجرام', '150 ميكروجرام'],
    clinicalNotes: 'تعدد التركيزات يتيح ضبط هرمون TSH بدقة شديدة دون الحاجة لكسر الأقراص. استقرار الامتصاص يتطلب تناوله بنفس الطريقة والموعد يومياً.',
    searchTokens: ['ايثيروكس', 'إيثيروكس', 'euthyrox', 'levothyroxine', 'ثيروكسين', 'خمول الغدة', 'تظبيط TSH']
  },
  {
    id: 'thyroxine_egypt',
    tradeName: 'ثيروكسين أقراص (Thyroxine)',
    tradeNameEn: 'Thyroxine 50mcg, 100mcg',
    scientificName: 'ليفوثيروكسين صوديوم',
    category: 'thyroid',
    categoryAr: 'علاج قصور الغدة الدرقية البديل',
    categoryIcon: '🦋',
    defaultTiming: 'على الريق مع ماء صافي قبل الإفطار بساعة',
    dosageForm: 'أقراص',
    commonDoses: ['50 ميكروجرام', '100 ميكروجرام'],
    clinicalNotes: 'يعوض نقص هرمون الثيروكسين الطبيعي ويزيد معدل الحرق الأيضي الأساسي (BMR) ويعالج الخمول والإمساك وزيادة الوزن.',
    searchTokens: ['ثيروكسين', 'thyroxine', 'غدة']
  },

  // ==========================================
  // Hyperthyroidism (علاجات فرط ونشاط الغدة الدرقية)
  // ==========================================
  {
    id: 'carbimazole_5',
    tradeName: 'كاربيمازول 5 مجم (Carbimazole CID)',
    tradeNameEn: 'Carbimazole 5mg (CID Egypt)',
    scientificName: 'كاربيمازول (Carbimazole)',
    category: 'thyroid',
    categoryAr: 'مثبط إفراز هرمونات الغدة الدرقية لفرط النشاط وجريفز',
    categoryIcon: '🦋',
    defaultTiming: 'مقسم على جرعات متساوية مع وجبات الطعام لتقليل الغثيان',
    dosageForm: 'أقراص صغيرة',
    commonDoses: ['5 مجم', '10 مجم', '20-40 مجم مقسمة يومياً في البداية'],
    clinicalNotes: 'يقلل تكوين هرمونات T3 و T4 الزائدة. تنبيه: في حال حدوث التهاب حلق أو حمى غير مبررة يجب عمل تحليل صورة دم كاملة (CBC) للتأكد من كريات الدم البيضاء.',
    searchTokens: ['كاربيمازول', 'carbimazole', 'نشاط الغدة', 'فرط الغدة', 'جريفز', 'سيد']
  },
  {
    id: 'thyrozol_5_10_20',
    tradeName: 'ثيروزول (Thyrozol)',
    tradeNameEn: 'Thyrozol 5mg, 10mg, 20mg (Merck)',
    scientificName: 'ثيامازول / ميثيمازول (Thiamazole / Methimazole)',
    category: 'thyroid',
    categoryAr: 'العلاج المباشر عالي النقاوة لفرط نشاط الغدة الدرقية والتسمم الدرقي',
    categoryIcon: '🦋',
    defaultTiming: 'جرعة واحدة صباحاً بعد الإفطار أو مقسمة بعد الوجبات',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['5 مجم', '10 مجم', '20 مجم'],
    clinicalNotes: 'المادة الفعالة المباشرة النشطة بيولوجياً لضبط تسمم الغدة الدرقية وتسارع ضربات القلب وفقدان الوزن المرضي.',
    searchTokens: ['ثيروزول', 'thyrozol', 'thiamazole', 'methimazole', 'ثيامازول', 'نشاط الغدة']
  },
  {
    id: 'propycil_50',
    tradeName: 'بروبيسيل 50 مجم (Propycil)',
    tradeNameEn: 'Propycil 50mg (Propylthiouracil / PTU)',
    scientificName: 'بروبيل ثيويوراسيل (Propylthiouracil - PTU)',
    category: 'thyroid',
    categoryAr: 'علاج فرط نشاط الغدة المعتمد أثناء الثلث الأول من الحمل',
    categoryIcon: '🦋',
    defaultTiming: 'كل 8 ساعات بانتظام مع الوجبات',
    dosageForm: 'أقراص',
    commonDoses: ['50 مجم', '100-300 مجم يومياً مقسمة'],
    clinicalNotes: 'الخيار العلاجي الأول لفرط نشاط الغدة خلال الشهور الثلاثة الأولى من الحمل ولعلاج العاصفة الدرقية الحادة لمنع تحول T4 إلى T3 في الأنسجة.',
    searchTokens: ['بروبيسيل', 'propycil', 'ptu', 'propylthiouracil', 'نشاط الغدة للحامل']
  },
  {
    id: 'selenium_ace_thyroid',
    tradeName: 'سيلينيوم إيه سي إي (Selenium ACE)',
    tradeNameEn: 'Selenium ACE (Selenium 50mcg + Vit A, C, E)',
    scientificName: 'سيلينيوم + فيتامينات مضادة للأكسدة A, C, E',
    category: 'thyroid',
    categoryAr: 'مكمل داعم لوظائف الغدة ومضادات أجسام هاشيموتو',
    categoryIcon: '🦋',
    defaultTiming: 'قرص واحد يومياً بعد وجبة الغداء',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['قرص يومياً (50-200 ميكروجرام سيلينيوم)'],
    clinicalNotes: 'عنصر غذائي أساسي لعمل إنزيم دييوديناز (Deiodinase) لتحويل هرمون T4 الخامل إلى T3 النشط بيولوجياً وخفض الأجسام المضادة (Anti-TPO) في مرض هاشيموتو.',
    searchTokens: ['سيلينيوم', 'selenium ace', 'selenium', 'هاشيموتو', 'اجسام مضادة', 'تحويل الغدة']
  }
];
