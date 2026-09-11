import { EgyptianMedication } from './types';

export const CARDIO_HYPERTENSION_MEDS: EgyptianMedication[] = [
  // ==========================================
  // Beta Blockers (حاصرات بيتا)
  // ==========================================
  {
    id: 'concor_5',
    tradeName: 'كونكور 5 مجم (Concor)',
    tradeNameEn: 'Concor 5mg',
    scientificName: 'بيسوبرولول فيومارات (Bisoprolol Fumarate)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط والقلب (بيتا بلوكر)',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً بعد الإفطار مع كوب ماء',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['2.5 مجم', '5 مجم', '10 مجم'],
    clinicalNotes: 'مثبط مستقبلات بيتا الانتقائي للقلب، ينظم نبضات القلب ويخفض ضغط الدم. لا يوقف فجأة لتجنب الارتداد.',
    searchTokens: ['كونكور', 'concor', 'bisoprolol', 'بيسوبرولول', 'ضغط', 'بيتا بلوكر', 'قلب', 'نبض']
  },
  {
    id: 'concor_plus',
    tradeName: 'كونكور بلس 5/12.5 مجم (Concor Plus)',
    tradeNameEn: 'Concor Plus 5/12.5mg',
    scientificName: 'بيسوبرولول + هيدروكلوروثيازيد (Bisoprolol + Hydrochlorothiazide)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط المركبة ومدرات البول',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً بعد الإفطار',
    dosageForm: 'أقراص',
    commonDoses: ['5/12.5 مجم', '10/25 مجم'],
    clinicalNotes: 'مزيج خافض للضغط ومدر خفيف للبول. يفضل تناوله نهاراً لتجنب الاستيقاظ للتبول ليلاً.',
    searchTokens: ['كونكور بلس', 'concor plus', 'مدر بول', 'ضغط مركب', 'ثيازيد']
  },
  {
    id: 'bisocard_5',
    tradeName: 'بيسوكارد 5 مجم (Bisocard)',
    tradeNameEn: 'Bisocard 5mg',
    scientificName: 'بيسوبرولول (Bisoprolol)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط والقلب (بديل مصري للكونكور)',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً بعد الأكل',
    dosageForm: 'أقراص',
    commonDoses: ['2.5 مجم', '5 مجم', '10 مجم'],
    clinicalNotes: 'مثيل محلي عالي الجودة للكونكور لضبط الضغط وتسارع النبض.',
    searchTokens: ['بيسوكارد', 'bisocard', 'bisoprolol', 'ضغط', 'قلب']
  },
  {
    id: 'nebilet_5',
    tradeName: 'نيبيلت 5 مجم (Nebilet)',
    tradeNameEn: 'Nebilet 5mg',
    scientificName: 'نيبيفولول هيدروكلوريد (Nebivolol HCl)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط الموسعة للشرايين (بيتا بلوكر الجيل الثالث)',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً في نفس الموعد يومياً بعد الطعام',
    dosageForm: 'أقراص قابلة للكسر صليبية',
    commonDoses: ['2.5 مجم', '5 مجم'],
    clinicalNotes: 'بيتا بلوكر حديث يحفز إفراز أكسيد النيتريك الموسع للأوعية، ذو أثر جانبي طفيف جداً على الكفاءة الجنسية.',
    searchTokens: ['نيبيلت', 'nebilet', 'nevilob', 'nebivolol', 'نيبيفولول', 'ضغط', 'شرايين']
  },
  {
    id: 'nevilob_5',
    tradeName: 'نيفيلوب 5 مجم (Nevilob)',
    tradeNameEn: 'Nevilob 5mg',
    scientificName: 'نيبيفولول (Nebivolol)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط والقلب (بديل مصري للنيبيلت)',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً بعد الإفطار',
    dosageForm: 'أقراص',
    commonDoses: ['2.5 مجم', '5 مجم'],
    clinicalNotes: 'خافض لضغط الدم موسع للشرايين الطرفية يحسن مرونة الأوعية الدموية.',
    searchTokens: ['نيفيلوب', 'nevilob', 'nebivolol', 'ضغط']
  },
  {
    id: 'seloken_zok_50',
    tradeName: 'سيلوكين زوك 50 مجم (Seloken ZOK)',
    tradeNameEn: 'Seloken ZOK 50mg',
    scientificName: 'ميتوبرولول سكسينات ممتد المفعول (Metoprolol Succinate)',
    category: 'hypertension',
    categoryAr: 'أدوية القلب والضغط ممتدة المفعول',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً مع كوب ماء (تبلع الحبة كاملة دون مضغ أو سحق)',
    dosageForm: 'أقراص ممتدة الإفراز',
    commonDoses: ['25 مجم', '50 مجم', '100 مجم'],
    clinicalNotes: 'ممتاز لمرضى قصور القلب والذبحة الصدرية وتنظيم ضربات القلب. لا تمضغ الحبة حفاظاً على الإفراز الممتد.',
    searchTokens: ['سيلوكين', 'seloken', 'zok', 'metoprolol', 'ميتوبرولول', 'بيتالوك', 'betaloc']
  },
  {
    id: 'inderal_10_40',
    tradeName: 'إندرال 10 / 40 مجم (Inderal)',
    tradeNameEn: 'Inderal 10mg / 40mg',
    scientificName: 'بروبرانولول هيدروكلوريد (Propranolol HCl)',
    category: 'hypertension',
    categoryAr: 'أدوية ضربات القلب والقلق والخفقان والصداع النصفي',
    categoryIcon: '💓',
    defaultTiming: 'قبل الأكل أو بعده بانتظام',
    dosageForm: 'أقراص',
    commonDoses: ['10 مجم', '40 مجم'],
    clinicalNotes: 'بيتا بلوكر غير انتقائي يخفف الرعشة وخفقان القلب المصاحب للتوتر أو زيادة نشاط الغدة الدرقية. يمنع لمرضى الربو والحساسية الصدرية.',
    searchTokens: ['اندرال', 'إندرال', 'inderal', 'propranolol', 'بروبرانولول', 'خفقان', 'توتر', 'رعشة']
  },
  {
    id: 'dilatrend_carvid',
    tradeName: 'ديلاتريند / كارفيد (Dilatrend / Carvid)',
    tradeNameEn: 'Dilatrend / Carvid 6.25, 12.5, 25mg',
    scientificName: 'كارفيديلول (Carvedilol)',
    category: 'hypertension',
    categoryAr: 'علاج قصور عضلة القلب وضغط الدم الشرياني',
    categoryIcon: '💓',
    defaultTiming: 'مع الطعام لتقليل خطر انخفاض الضغط المفاجئ',
    dosageForm: 'أقراص',
    commonDoses: ['6.25 مجم', '12.5 مجم', '25 مجم'],
    clinicalNotes: 'يحجب مستقبلات ألفا وبيتا معاً ويحسن كفاءة عضلة القلب الانقباضية. يجب تناوله مع وجبة طعام لتقليل هبوط الضغط الانتصابي.',
    searchTokens: ['ديلاتريند', 'dilatrend', 'carvid', 'كارفيد', 'carvedilol', 'كارفيديلول', 'قصور قلب']
  },
  {
    id: 'tenormin_50',
    tradeName: 'تينورمين 50 / 100 مجم (Tenormin)',
    tradeNameEn: 'Tenormin 50mg / 100mg',
    scientificName: 'أتينولول (Atenolol)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط والذبحة الصدرية',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً مع كوب ماء',
    dosageForm: 'أقراص',
    commonDoses: ['50 مجم', '100 مجم'],
    clinicalNotes: 'يقلل الجهد على عضلة القلب ويضبط الضغط. يفرز كلوياً لذا تعدل الجرعة لمرضى القصور الكلوي.',
    searchTokens: ['تينورمين', 'tenormin', 'atenolol', 'أتينولول', 'ضغط']
  },

  // ==========================================
  // ARBs & Combinations (مضادات مستقبلات الأنجيوتنسين)
  // ==========================================
  {
    id: 'exforge_5_160',
    tradeName: 'إكسفورج 5/160 مجم (Exforge)',
    tradeNameEn: 'Exforge 5/160mg, 10/160mg',
    scientificName: 'أملوديبين + فالسارتان (Amlodipine + Valsartan)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط المركبة الثنائية',
    categoryIcon: '💓',
    defaultTiming: 'يومياً صباحاً أو مساءً مع أو بدون طعام',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['5/80 مجم', '5/160 مجم', '10/160 مجم'],
    clinicalNotes: 'مزيج قوي يجمع موسع الكالسيوم مع حاصب الأنجيوتنسين لضبط الضغط المقاوم وحماية الكلى.',
    searchTokens: ['اكسفورج', 'إكسفورج', 'exforge', 'amlodipine', 'valsartan', 'فالسارتان', 'أملوديبين']
  },
  {
    id: 'exforge_hct',
    tradeName: 'إكسفورج إتش سي تي (Exforge HCT)',
    tradeNameEn: 'Exforge HCT 5/160/12.5mg, 10/160/12.5mg',
    scientificName: 'أملوديبين + فالسارتان + هيدروكلوروثيازيد',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط الثلاثية المتقدمة',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً مع كوب ماء',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['5/160/12.5', '10/160/12.5', '10/160/25'],
    clinicalNotes: 'علاج ثلاثي المفعول للضغط المرتفع الشديد المقاوم للعلاجات الفردية.',
    searchTokens: ['اكسفورج اتش', 'exforge hct', 'ثلاثي', 'ضغط مقاوم']
  },
  {
    id: 'tareg_diovan_80_160',
    tradeName: 'تارج / ديوفان (Tareg / Diovan)',
    tradeNameEn: 'Tareg / Diovan 80mg, 160mg, 320mg',
    scientificName: 'فالسارتان (Valsartan)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط وحماية الكلى لمرضى السكر',
    categoryIcon: '💓',
    defaultTiming: 'يومياً في نفس الموعد مع أو بدون طعام',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['80 مجم', '160 مجم', '320 مجم'],
    clinicalNotes: 'يحمي الكلى ويقلل الزلال في البول لمرضى السكري والضغط. لا يسبب السعال الجاف.',
    searchTokens: ['تارج', 'tareg', 'ديوفان', 'diovan', 'valsartan', 'فالسارتان', 'كلى']
  },
  {
    id: 'co_tareg_co_diovan',
    tradeName: 'كو-تارج / كو-ديوفان (Co-Tareg / Co-Diovan)',
    tradeNameEn: 'Co-Tareg / Co-Diovan 80/12.5, 160/12.5, 160/25mg',
    scientificName: 'فالسارتان + هيدروكلوروثيازيد (Valsartan + HCTZ)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط المركبة بمدر للبول',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً بعد وجبة الإفطار',
    dosageForm: 'أقراص',
    commonDoses: ['80/12.5 مجم', '160/12.5 مجم', '160/25 مجم'],
    clinicalNotes: 'يجمع حماية الأوعية والكلى مع التخلص من احتباس السوائل والأملاح.',
    searchTokens: ['كو تارج', 'co tareg', 'كو ديوفان', 'co diovan', 'valsartan hctz']
  },
  {
    id: 'blopress_atacand',
    tradeName: 'بلوبرس / أتاكاند (Blopress / Atacand)',
    tradeNameEn: 'Blopress / Atacand 8mg, 16mg',
    scientificName: 'كانديسارتان سيليكسيتيل (Candesartan Cilexetil)',
    category: 'hypertension',
    categoryAr: 'حاصرات مستقبلات الأنجيوتنسين طويلة المفعول',
    categoryIcon: '💓',
    defaultTiming: 'مرة واحدة يومياً في موعد ثابت',
    dosageForm: 'أقراص',
    commonDoses: ['4 مجم', '8 مجم', '16 مجم', '32 مجم'],
    clinicalNotes: 'فعالية ممتدة على مدار 24 ساعة وممتاز للوقاية من الصداع والجلطات الدماغية.',
    searchTokens: ['بلوبرس', 'blopress', 'اتاكاند', 'أتاكاند', 'atacand', 'candesartan', 'كانديسارتان']
  },
  {
    id: 'micardis_80',
    tradeName: 'ميكارديس 40 / 80 مجم (Micardis)',
    tradeNameEn: 'Micardis 40mg / 80mg',
    scientificName: 'تيلميسارتان (Telmisartan)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط وحماية القلب ومتلازمة الأيض',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً مع أو بدون طعام',
    dosageForm: 'أقراص',
    commonDoses: ['40 مجم', '80 مجم', 'Micardis Plus 80/12.5'],
    clinicalNotes: 'عمر نصفي طويل جداً (24 ساعة) ويحفز مستقبلات PPAR-gamma مما يمنحه ميزة إضافية في تحسين حساسية الأنسولين وضبط الدهون.',
    searchTokens: ['ميكارديس', 'micardis', 'telmisartan', 'تيلميسارتان', 'ميكارديس بلس']
  },
  {
    id: 'aprovel_150_300',
    tradeName: 'أبروفيل / كو-أبروفيل (Aprovel / Co-Aprovel)',
    tradeNameEn: 'Aprovel 150mg, 300mg / Co-Aprovel',
    scientificName: 'إربيسارتان (Irbesartan)',
    category: 'hypertension',
    categoryAr: 'علاج الضغط وحماية وظائف الكلى لمرضى السكري',
    categoryIcon: '💓',
    defaultTiming: 'مرة يومياً مع أو بدون طعام',
    dosageForm: 'أقراص',
    commonDoses: ['150 مجم', '300 مجم', 'Co-Aprovel 150/12.5, 300/12.5'],
    clinicalNotes: 'أثبتت الدراسات كفاءته في إبطاء تدهور اعتلال الكلى السكري وتقليل بروتين البول.',
    searchTokens: ['ابروفيل', 'أبروفيل', 'aprovel', 'co aprovel', 'irbesartan', 'إربيسارتان']
  },
  {
    id: 'edarbi_40_80',
    tradeName: 'إداربي / إداربيكلور (Edarbi / Edarbyclor)',
    tradeNameEn: 'Edarbi 40mg, 80mg / Edarbyclor',
    scientificName: 'أزيلسارتان ميدوكسوميل (Azilsartan Medoxomil)',
    category: 'hypertension',
    categoryAr: 'أحدث حاصرات الأنجيوتنسين لخفض الضغط القوي',
    categoryIcon: '💓',
    defaultTiming: 'مرة يومياً دون ارتباط بالطعام',
    dosageForm: 'أقراص',
    commonDoses: ['40 مجم', '80 مجم', 'Edarbyclor 40/12.5, 40/25'],
    clinicalNotes: 'أعلى حاصرات الأنجيوتنسين في قوة الارتباط بالمستقبلات لخفض الضغط على مدار اليوم والليل.',
    searchTokens: ['اداربي', 'إداربي', 'edarbi', 'edarbyclor', 'azilsartan', 'أزيلسارتان']
  },

  // ==========================================
  // ACE Inhibitors (مثبطات الإنزيم المحول للأنجيوتنسين)
  // ==========================================
  {
    id: 'capoten_25_50',
    tradeName: 'كابوتن 25 / 50 مجم (Capoten)',
    tradeNameEn: 'Capoten 25mg / 50mg',
    scientificName: 'كابتوبريل (Captopril)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط سريعة المفعول والطوارئ',
    categoryIcon: '💓',
    defaultTiming: 'قبل الأكل بساعة على معدة فارغة',
    dosageForm: 'أقراص',
    commonDoses: ['25 مجم', '50 مجم'],
    clinicalNotes: 'يؤخذ على معدة فارغة لأن الطعام يقلل امتصاصه بنسبة 30-40%. قد يستخدم تحت اللسان في ارتفاع الضغط الطارئ تحت إشراف طبي.',
    searchTokens: ['كابوتن', 'capoten', 'captopril', 'كابتوبريل', 'ضغط طارئ', 'تحت اللسان']
  },
  {
    id: 'coversyl_5_10',
    tradeName: 'كوفرسيل / كوفرسيل بلس (Coversyl / Coversyl Plus)',
    tradeNameEn: 'Coversyl 5mg, 10mg',
    scientificName: 'بيريندوبريل أرجينين (Perindopril Arginine)',
    category: 'hypertension',
    categoryAr: 'أدوية حماية الشرايين والقلب بعد الجلطات',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً قبل الإفطار مباشرة مع كوب ماء',
    dosageForm: 'أقراص مغلفة سهلة التناول',
    commonDoses: ['2.5 مجم', '5 مجم', '10 مجم', 'Coversyl Plus 5/1.25'],
    clinicalNotes: 'مثبط ACE عالي الكفاءة يحمي بطانة الأوعية الدموية ويقلل من خطورة الحوادث القلبية الوعائية.',
    searchTokens: ['كوفرسيل', 'coversyl', 'perindopril', 'بيريندوبريل', 'كوفرسيل بلس']
  },
  {
    id: 'tritace_2_5_5_10',
    tradeName: 'تريتاس / تريتاس بروتكت (Tritace / Tritace Protect)',
    tradeNameEn: 'Tritace 2.5mg, 5mg, 10mg',
    scientificName: 'راميبريل (Ramipril)',
    category: 'hypertension',
    categoryAr: 'علاج الضغط والوقاية من الجلطات القلبية',
    categoryIcon: '💓',
    defaultTiming: 'يومياً في نفس الموعد مع أو بدون طعام',
    dosageForm: 'كبسولات / أقراص',
    commonDoses: ['2.5 مجم', '5 مجم', '10 مجم', 'Tritace Plus 5/25'],
    clinicalNotes: 'مثبت علمياً في دراسة HOPE لتقليل الوفيات القلبية والسكتات الدماغية واعتلال الكلى.',
    searchTokens: ['تريتاس', 'tritace', 'ramipril', 'راميبريل', 'تريتاس بروتكت']
  },
  {
    id: 'zestril_sinopril',
    tradeName: 'زيستريل / سينوبريل (Zestril / Sinopril)',
    tradeNameEn: 'Zestril / Sinopril 5mg, 10mg, 20mg',
    scientificName: 'ليزينوبريل (Lisinopril)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط وقصور القلب',
    categoryIcon: '💓',
    defaultTiming: 'مرة واحدة يومياً في موعد ثابت',
    dosageForm: 'أقراص',
    commonDoses: ['5 مجم', '10 مجم', '20 مجم', 'Zestoretic (with diuretic)'],
    clinicalNotes: 'يذوب في الماء ولا يعتمد على التمثيل الكبدي، فعال جداً لمرضى السكري والضغط.',
    searchTokens: ['زيستريل', 'zestril', 'سينوبريل', 'sinopril', 'lisinopril', 'ليزينوبريل']
  },

  // ==========================================
  // Calcium Channel Blockers (غالقات قنوات الكالسيوم)
  // ==========================================
  {
    id: 'norvasc_5_10',
    tradeName: 'نورفاسك 5 / 10 مجم (Norvasc)',
    tradeNameEn: 'Norvasc 5mg / 10mg',
    scientificName: 'أملوديبين بيسيلات (Amlodipine Besylate)',
    category: 'hypertension',
    categoryAr: 'موسعات الشرايين التاجية والطرفية',
    categoryIcon: '💓',
    defaultTiming: 'مرة واحدة يومياً صباحاً أو مساءً',
    dosageForm: 'أقراص',
    commonDoses: ['5 مجم', '10 مجم'],
    clinicalNotes: 'موسع شرايين فعال. تنبيه: قد يسبب تورماً خفيفاً في الكاحلين أو القدمين كأثر جانبي وعائي طبيعي.',
    searchTokens: ['نورفاسك', 'norvasc', 'amlodipine', 'أملوديبين', 'تورم القدمين']
  },
  {
    id: 'plendil_5_10',
    tradeName: 'بلينديل 5 / 10 مجم (Plendil)',
    tradeNameEn: 'Plendil 5mg / 10mg',
    scientificName: 'فيلوديبين ممتد المفعول (Felodipine Extended Release)',
    category: 'hypertension',
    categoryAr: 'أدوية الضغط الموسعة للأوعية ممتدة المفعول',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً على معدة فارغة أو بعد إفطار خفيف (لا يمضغ)',
    dosageForm: 'أقراص ممتدة المفعول',
    commonDoses: ['5 مجم', '10 مجم'],
    clinicalNotes: 'تجنب شرب عصير الجريب فروت معه لأنه يضاعف تركيز الدواء في الدم بشكل مفرط.',
    searchTokens: ['بلينديل', 'plendil', 'felodipine', 'فيلوديبين', 'جريب فروت']
  },
  {
    id: 'adalat_epilat_retard',
    tradeName: 'أدالات إل إيه / إبيلات ريتارد (Adalat LA / Epilat Retard)',
    tradeNameEn: 'Adalat LA 30, 60mg / Epilat Retard 20mg',
    scientificName: 'نيفيديبين ممتد المفعول (Nifedipine GITS / Retard)',
    category: 'hypertension',
    categoryAr: 'علاج الذبحة الصدرية وضغط الدم وتقلصات الأوعية',
    categoryIcon: '💓',
    defaultTiming: 'تبلع الحبة كاملة مع كوب ماء في موعد ثابت يومياً',
    dosageForm: 'أقراص ذات نظام تحرر مضغوط (GITS)',
    commonDoses: ['20 مجم Retard', '30 مجم LA', '60 مجم LA'],
    clinicalNotes: 'آمن أيضاً في حالات ارتفاع ضغط الدم أثناء الحمل تحت المتابعة الطبية. لا يكسر ولا يسحق.',
    searchTokens: ['ادالات', 'أدالات', 'adalat', 'epilat', 'ابيلات', 'nifedipine', 'نيفيديبين', 'ضغط الحمل']
  },

  // ==========================================
  // Diuretics (مدرات البول)
  // ==========================================
  {
    id: 'natrilix_sr',
    tradeName: 'ناتريليكس إس آر 1.5 مجم (Natrilix SR)',
    tradeNameEn: 'Natrilix SR 1.5mg',
    scientificName: 'إنداباميد ممتد المفعول (Indapamide SR)',
    category: 'hypertension',
    categoryAr: 'مدر بول وموسع للشرايين ممتد المفعول',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً بعد وجبة الإفطار',
    dosageForm: 'أقراص مغلفة ممتدة الإفراز',
    commonDoses: ['1.5 مجم SR', '2.5 مجم'],
    clinicalNotes: 'مدر بول ذكي لا يؤثر سلباً على مستويات سكر الدم أو الدهون، ممتاز لكبار السن.',
    searchTokens: ['ناتريليكس', 'natrilix', 'indapamide', 'انداباميد', 'مدر بول']
  },
  {
    id: 'lasix_40',
    tradeName: 'لازيكس 40 مجم (Lasix)',
    tradeNameEn: 'Lasix 40mg (Furosemide)',
    scientificName: 'فوروسيميد (Furosemide)',
    category: 'hypertension',
    categoryAr: 'مدرات البول العروية السريعة للتخلص من السوائل الزائدة',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً على معدة فارغة أو بعد الإفطار',
    dosageForm: 'أقراص / أمبولات',
    commonDoses: ['20 مجم', '40 مجم'],
    clinicalNotes: 'مدر سريع لتخفيف تورم القدمين وارتشاح الرئة. يلزم متابعة مستوى البوتاسيوم بالدم دورياً والحرص على شرب السوائل.',
    searchTokens: ['لازيكس', 'lasix', 'furosemide', 'فوروسيميد', 'تورم', 'احتباس ماء', 'مدر']
  },
  {
    id: 'aldactone_25_100',
    tradeName: 'ألداكتون 25 / 100 مجم (Aldactone)',
    tradeNameEn: 'Aldactone 25mg / 100mg',
    scientificName: 'سبيرونولاكتون (Spironolactone)',
    category: 'hypertension',
    categoryAr: 'مدر بول حابس للبوتاسيوم ومضاد للألدوستيرون وتكيس المبايض',
    categoryIcon: '💓',
    defaultTiming: 'مع أو بعد الإفطار نهاراً',
    dosageForm: 'أقراص',
    commonDoses: ['25 مجم', '50 مجم', '100 مجم'],
    clinicalNotes: 'مدر حابس للبوتاسيوم ويستخدم أيضاً في علاج قصور القلب واستسقاء الكبد، وأيضاً لعلاج شعرانية وتكيس المبايض لدى النساء بحجب الأندروجين.',
    searchTokens: ['الداكتون', 'ألداكتون', 'aldactone', 'spironolactone', 'سبيرونولاكتون', 'تكيس مبايض', 'بوتاسيوم']
  },

  // ==========================================
  // Heart Failure & Vasodilators (قصور القلب والموسعات)
  // ==========================================
  {
    id: 'entresto_50_100_200',
    tradeName: 'إنتريستو (Entresto)',
    tradeNameEn: 'Entresto 50mg (24/26), 100mg (49/51), 200mg (97/103)',
    scientificName: 'ساكوبيتريل + فالسارتان (Sacubitril + Valsartan)',
    category: 'hypertension',
    categoryAr: 'علاج طفرة قصور وضعف عضلة القلب (ARNI)',
    categoryIcon: '💓',
    defaultTiming: 'مرتين يومياً (صباحاً ومساءً) مع أو بدون طعام',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['50 مجم (24/26)', '100 مجم (49/51)', '200 مجم (97/103)'],
    clinicalNotes: 'أحدث بروتوكولات علاج ضعف عضلة القلب، يقلل الوفيات ودخول المستشفى ويحسن القدرة الوظيفية لعضلة القلب.',
    searchTokens: ['انتريستو', 'إنتريستو', 'entresto', 'sacubitril', 'valsartan', 'ضعف القلب', 'قصور القلب']
  },
  {
    id: 'cardura_1_2_4',
    tradeName: 'كاردورا 1 / 2 / 4 مجم (Cardura)',
    tradeNameEn: 'Cardura 1mg, 2mg, 4mg / Cardura XL',
    scientificName: 'دوكسازوسين (Doxazosin Mesylate)',
    category: 'hypertension',
    categoryAr: 'حاصرات ألفا لعلاج تضخم البروستاتا وضغط الدم',
    categoryIcon: '💓',
    defaultTiming: 'مساءً قبل النوم لتقليل الدوار وهبوط الضغط',
    dosageForm: 'أقراص عادية / أقراص ممتدة المفعول XL',
    commonDoses: ['1 مجم', '2 مجم', '4 مجم', 'Cardura XL 4mg'],
    clinicalNotes: 'يرخي عنق المثانة والبروستاتا ويسهل تدفق البول مع خفض ضغط الدم. يؤخذ قبل النوم لتجنب الدوخة عند الوقوف.',
    searchTokens: ['كاردورا', 'cardura', 'doxazosin', 'دوكسازوسين', 'بروستاتا', 'حصر بول']
  },
  {
    id: 'aldomet_250',
    tradeName: 'ألدوميت 250 مجم (Aldomet)',
    tradeNameEn: 'Aldomet 250mg',
    scientificName: 'ميثيل دوبا (Methyldopa)',
    category: 'hypertension',
    categoryAr: 'علاج ضغط الدم الآمن المعتمد أثناء الحمل',
    categoryIcon: '💓',
    defaultTiming: 'مقسم على جرعات مع وجبات الطعام',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['250 مجم مرتين إلى 4 مرات يومياً'],
    clinicalNotes: 'الدواء الأول تاريخياً والأكثر أماناً لضبط ضغط الدم أثناء فترة الحمل والرضاعة دون ضرر على الجنين.',
    searchTokens: ['الدوميت', 'ألدوميت', 'aldomet', 'methyldopa', 'ميثيل دوبا', 'ضغط الحمل', 'حوامل']
  },

  // ==========================================
  // Antiplatelets & Anticoagulants (السيولة والجلطات)
  // ==========================================
  {
    id: 'aspirin_protect_100',
    tradeName: 'أسبيرين بروتكت 100 مجم (Aspirin Protect)',
    tradeNameEn: 'Aspirin Protect 100mg',
    scientificName: 'حمض أسيتيل ساليسيليك مغلف معوياً (Acetylsalicylic Acid)',
    category: 'hypertension',
    categoryAr: 'مضادات التجلط والوقاية من الجلطات القلبية والدماغية',
    categoryIcon: '💓',
    defaultTiming: 'بعد وجبة الغداء الرئيسية مع كوب ماء كبير',
    dosageForm: 'أقراص مغلفة معوياً لحماية جدار المعدة',
    commonDoses: ['100 مجم يومياً'],
    clinicalNotes: 'مغلف معوياً ليذوب في الأمعاء الدقيقة بدلاً من المعدة لتقليل القرح والحموضة. يبلع كاملاً دون كسر.',
    searchTokens: ['اسبرين', 'أسبيرين بروتكت', 'aspirin protect', 'acetylsalicylic', 'سيولة', 'جلطات']
  },
  {
    id: 'ezacard_aspocid_75',
    tradeName: 'إيزاكارد 75 مجم / أسبوسيد أطفال (Ezacard / Aspocid)',
    tradeNameEn: 'Ezacard 75mg / Aspocid 75mg Chewable',
    scientificName: 'أسيتيل ساليسيليك أسيد 75 مجم (Aspirin 75mg)',
    category: 'hypertension',
    categoryAr: 'جرعة وقائية يومية لسيولة الدم وحماية الأوعية',
    categoryIcon: '💓',
    defaultTiming: 'بعد الغداء مباشرة (أسبوسيد للمضغ، إيزاكارد للبلع)',
    dosageForm: 'أقراص للمضغ / أقراص مغلفة',
    commonDoses: ['75 مجم قرص واحد يومياً'],
    clinicalNotes: 'جرعة وقائية قياسية لمنع تراكم الصفائح الدموية ودعم تدفق الدم المشيمي للحوامل ومتابعي صحة القلب.',
    searchTokens: ['ايزاكارد', 'إيزاكارد', 'ezacard', 'aspocid', 'اسبوسيد', 'اسبرين اطفال', 'سيولة']
  },
  {
    id: 'plavix_75',
    tradeName: 'بلافيكس 75 مجم (Plavix)',
    tradeNameEn: 'Plavix 75mg',
    scientificName: 'كلوبيدوجريل (Clopidogrel Bisulfate)',
    category: 'hypertension',
    categoryAr: 'مضاد تجمع الصفائح الدموية بعد تركيب الدعامات والجلطات',
    categoryIcon: '💓',
    defaultTiming: 'مرة واحدة يومياً في موعد ثابت مع أو بدون طعام',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['75 مجم قرص يومياً'],
    clinicalNotes: 'أساسي بعد تركيب دعامات الشرايين التاجية. تنبيه: تجنب تناوله مع أوميبرازول واستبدله بـ بانتوبرازول (كونترولوك) لعدم إضعاف فعاليته.',
    searchTokens: ['بلافيكس', 'plavix', 'clopidogrel', 'كلوبيدوجريل', 'دعامات', 'قسطرة']
  },
  {
    id: 'brilinta_90',
    tradeName: 'بريلينتا 90 مجم (Brilinta)',
    tradeNameEn: 'Brilinta 90mg, 60mg',
    scientificName: 'تيكاجريلور (Ticagrelor)',
    category: 'hypertension',
    categoryAr: 'مضاد صفائح قوي ومباشر لمتلازمة الشريان التاجي الحادة',
    categoryIcon: '💓',
    defaultTiming: 'قرص مرتين يومياً (كل 12 ساعة) مع أو بدون طعام',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['90 مجم مرتين يومياً', '60 مجم'],
    clinicalNotes: 'مضاد صفائح سريع وقوي يؤخذ مع جرعة منخفضة من الأسبرين (75-100 مجم). قد يسبب شعوراً عابراً بضيق التنفس.',
    searchTokens: ['بريلينتا', 'brilinta', 'ticagrelor', 'تيكاجريلور', 'جلطة قلب']
  },
  {
    id: 'xarelto_10_15_20',
    tradeName: 'زارلتو (Xarelto)',
    tradeNameEn: 'Xarelto 10mg, 15mg, 20mg',
    scientificName: 'ريفاروكسابان (Rivaroxaban)',
    category: 'hypertension',
    categoryAr: 'مضادات التخثر الفموية المباشرة الحديثة (NOACs)',
    categoryIcon: '💓',
    defaultTiming: 'جرعة 15 و 20 مجم تؤخذ إلزامياً مع وجبة طعام رئيسية لضمان الامتصاص الكامل',
    dosageForm: 'أقراص مغلفة ملونة',
    commonDoses: ['10 مجم', '15 مجم', '20 مجم'],
    clinicalNotes: 'علاج ووقاية من الجلطات الوريدية والرفرفة الأذينية. هام جداً: جرعات 15 و 20 مجم تتطلب وجبة طعام للامتصاص السليم.',
    searchTokens: ['زارلتو', 'xarelto', 'rivaroxaban', 'ريفاروكسابان', 'سيولة حديثة', 'رفرفة اذينية']
  },
  {
    id: 'eliquis_2_5_5',
    tradeName: 'إليكويس 2.5 / 5 مجم (Eliquis)',
    tradeNameEn: 'Eliquis 2.5mg / 5mg',
    scientificName: 'أبيكسابان (Apixaban)',
    category: 'hypertension',
    categoryAr: 'مضادات التخثر الحديثة الأقل إحداثاً للنزيف المعوي',
    categoryIcon: '💓',
    defaultTiming: 'قرص مرتين يومياً صباحاً ومساءً مع أو بدون طعام',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['2.5 مجم مرتين يومياً', '5 مجم مرتين يومياً'],
    clinicalNotes: 'أعلى مضادات التخثر أماناً على الجهاز الهضمي والوقاية من السكتات الدماغية لمرضى الرفرفة الأذينية.',
    searchTokens: ['اليكويس', 'إليكويس', 'eliquis', 'apixaban', 'ابيكسابان', 'سيولة']
  },
  {
    id: 'marevan_warfarin',
    tradeName: 'ماريفان 1 / 3 / 5 مجم (Marevan / Warfarin)',
    tradeNameEn: 'Marevan 1mg, 3mg, 5mg',
    scientificName: 'وارفارين صوديوم (Warfarin Sodium)',
    category: 'hypertension',
    categoryAr: 'مضاد التخثر التقليدي لصمامات القلب الميكانيكية والجلطات',
    categoryIcon: '💓',
    defaultTiming: 'مساءً في نفس الساعة يومياً (الساعة 6-8 مساءً) على معدة فارغة أو مع ماء',
    dosageForm: 'أقراص ملونة حسب الجرعة',
    commonDoses: ['1 مجم (بني)', '3 مجم (أزرق)', '5 مجم (وردي)'],
    clinicalNotes: 'تنبيه غذائي صارم: يلزم تثبيت كمية الخضروات الورقية الخضراء الغنية بفيتامين K (السبانخ، البروكلي، الجرجير، البقدونس) يومياً لمنع تذبذب تحليل السيولة (INR).',
    searchTokens: ['ماريفان', 'marevan', 'warfarin', 'وارفارين', 'صمام ميكانيكي', 'inr', 'فيتامين k']
  },

  // ==========================================
  // Venous Tone, Hemorrhoids & Vascular Protection (أدوية الأوردة والدوالي والبواسير)
  // ==========================================
  {
    id: 'daflon_500_1000',
    tradeName: 'دافلوون 500 / 1000 مجم (Daflon)',
    tradeNameEn: 'Daflon 500mg, 1000mg (Micronized Purified Flavonoid Fraction - Servier)',
    scientificName: 'مركبات الفلافونويد النقية الدقيقة (ديوسمين 90% + هيسبيريدين 10%)',
    category: 'hypertension',
    categoryAr: 'مقوي جدران الأوردة والشعيرات وعلاج الدوالي وثقل الساقين ونوبات البواسير الحادة',
    categoryIcon: '💓',
    defaultTiming: 'قرص مع وجبة الغداء وقرص مع وجبة العشاء (بروتوكول البواسير: 6 أقراص يومياً لمدة 4 أيام ثم 4 أقراص لمدة 3 أيام)',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['500 مجم قرصان يومياً للقصور الوريدي', '1000 مجم قرص واحد يومياً', 'جرعة هجومية للبواسير الحادة'],
    clinicalNotes: 'يزيد التوتر الوريدي ويقلل نفاذية الشعيرات الدموية والركود الوريدي وتورم الساقين. آمن وفعال جداً ويؤخذ دائماً مع الوجبات.',
    searchTokens: ['دافلون', 'دافلوون', 'daflon', 'diosmin', 'ديوسمين', 'دوالي', 'بواسير', 'تورم ساقين']
  },

  // ==========================================
  // LMWH Injectable Anticoagulants (حقن السيولة تحت الجلد)
  // ==========================================
  {
    id: 'clexane_innohep',
    tradeName: 'كليكسان 20 / 40 / 60 / 80 مجم (Clexane / Innohep)',
    tradeNameEn: 'Clexane (Enoxaparin Sodium Prefilled Syringes - Sanofi)',
    scientificName: 'إينوكسابارين صوديوم منخفض الوزن الجزيئي (LMWH)',
    category: 'hypertension',
    categoryAr: 'حقن السيولة الفورية للوقاية والعلاج من الجلطات الوريدية وتجلطات الحمل والعمليات',
    categoryIcon: '💓',
    defaultTiming: 'حقنة تحت الجلد في جدار البطن (حول السرة بـ 5 سم يميناً أو يساراً) بزاوية 90 درجة مع طية جلدية ودون فرك موضع الحقن',
    dosageForm: 'سرنجات جاهزة معبأة مسبقاً',
    commonDoses: ['20 مجم', '40 مجم وقائي', '60 مجم', '80 مجم علاجي مرتين يومياً'],
    clinicalNotes: 'يمنع تفريغ فقاعة الهواء الصغيرة من السرنجة لأنها تضمن دفع كامل الجرعة الدوائية. يمنع تدليك مكان الحقن لتجنب حدوث كدمات زرقاء.',
    searchTokens: ['كليكسان', 'clexane', 'اينوكسابارين', 'enoxaparin', 'حقن سيولة', 'جلطة ساق', 'سيولة حمل']
  },

  // ==========================================
  // Antiarrhythmics & Nitrates (تنظيم ضربات القلب وتوسيع الشرايين التاجية)
  // ==========================================
  {
    id: 'cordarone_200',
    tradeName: 'كوردارون 200 مجم (Cordarone)',
    tradeNameEn: 'Cordarone 200mg (Amiodarone HCl - Sanofi)',
    scientificName: 'أميودارون هيدروكلوريد (Amiodarone 200mg)',
    category: 'hypertension',
    categoryAr: 'منظم ضربات القلب القوي لعدم انتظام النبض والرفرفة الأذينية والبطينية',
    categoryIcon: '💓',
    defaultTiming: 'مع وجبة الغداء أو الإفطار في نفس الوقت يومياً مع تجنب شرب الجريب فروت تماماً',
    dosageForm: 'أقراص مقسمة',
    commonDoses: ['200 مجم يومياً كجرعة صيانة بعد جرعة التحميل'],
    clinicalNotes: 'يحتوي على جزيئات اليود لذا يتطلب فحص وظائف الغدة الدرقية (TSH) ووظائف الكبد سنوياً، وينصح باستخدام واقي شمس عند الخروج نهاراً لتجنب حساسية الضوء.',
    searchTokens: ['كوردارون', 'cordarone', 'amiodarone', 'اميودارون', 'ضربات قلب', 'رفرفة قلب']
  },
  {
    id: 'effox_monomak_isosorbide',
    tradeName: 'إيفوكس / مونوماك 20 / 40 مجم (Effox / Monomak)',
    tradeNameEn: 'Effox 20, 40mg / Monomak (Isosorbide Mononitrate)',
    scientificName: 'أيزوسوربيد أحادي النترات (Isosorbide Mononitrate)',
    category: 'hypertension',
    categoryAr: 'موسع الشرايين التاجية والوقاية من نوبات الذبحة الصدرية وألم الصدر',
    categoryIcon: '💓',
    defaultTiming: 'صباحاً بعد الإفطار مع كوب ماء (وفي حال الجرعتين تؤخذ الأولى صباحاً والثانية بعد 7 ساعات لترك فترة راحة نتراتية ليلاً لمنع التعود)',
    dosageForm: 'أقراص عادية وممتدة المفعول (Effox Long 50)',
    commonDoses: ['20 مجم مرتين يومياً بفارق 7 ساعات', 'Effox Long 50 مجم صباحاً'],
    clinicalNotes: 'تحذير خطير جداً: يمنع منعاً باتاً استخدامه مع منشطات الفياجرا والسياليس (PDE5 inhibitors) لأن الجمع بينهما يسبب هبوطاً حاداً مميتاً في ضغط الدم.',
    searchTokens: ['ايفوكس', 'إيفوكس', 'effox', 'monomak', 'مونوماك', 'ذبحة صدرية', 'توسيع شرايين تاجية']
  },
  {
    id: 'natrixam_twynsta_combo',
    tradeName: 'ناتريكسام / توينستا (Natrixam / Twynsta)',
    tradeNameEn: 'Natrixam (Indapamide 1.5mg + Amlodipine 5mg/10mg) / Twynsta (Telmisartan + Amlodipine)',
    scientificName: 'تركيبات متطورة مزدوجة لضبط الضغط المرتفع العنيد والمقاوم',
    category: 'hypertension',
    categoryAr: 'التحكم الفائق في ضغط الدم المرتفع وحماية شرايين المخ والكلى',
    categoryIcon: '💓',
    defaultTiming: 'قرص واحد صباحاً بعد الإفطار مع كوب ماء كامل',
    dosageForm: 'أقراص ممتدة المفعول',
    commonDoses: ['Natrixam 1.5/5mg', 'Natrixam 1.5/10mg', 'Twynsta 80/5mg'],
    clinicalNotes: 'يجمع بين موسع قوي للشرايين (الأملوديبين) ومدر نبيبي وقائي (إنداباميد أو تيلميسارتان)، مما يعطي استقراراً تاماً لضغط الدم طوال 24 ساعة دون تذبذب.',
    searchTokens: ['ناتريكسام', 'natrixam', 'توينستا', 'twynsta', 'ضغط عنيد', 'ضغط مركب حديث']
  }
];
