import { EgyptianMedication } from './types';

export const WEIGHT_LOSS_MEDS: EgyptianMedication[] = [
  // ==========================================
  // Lipase Inhibitors (مانعات امتصاص الدهون)
  // ==========================================
  {
    id: 'orlistat_120',
    tradeName: 'أورليستات 120 مجم (Orlistat)',
    tradeNameEn: 'Orlistat 120mg (Sigma / Eva Pharma)',
    scientificName: 'أورليستات (Orlistat)',
    category: 'weight_loss',
    categoryAr: 'مانع امتصاص الدهون المعوي المعتمد من FDA',
    categoryIcon: '⚖️',
    defaultTiming: 'أثناء تناول الوجبة الدسمة أو بعدها بما لا يتجاوز ساعة واحدة مع كوب ماء كبير',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['120 مجم مع كل وجبة تحتوي على دهون (حتى 3 مرات يومياً)'],
    clinicalNotes: 'يمنع هضم وامتصاص 30% من دهون الوجبة ويطردها مع الفضلات. قاعدة سريرية: إذا كانت الوجبة خالية من الدهون (مثل سلطة أو فاكهة فقط) يتم تخطي الجرعة. يجب تناول الفيتامينات الذائبة في الدهون (A, D, E, K) قبل النوم بفارق ساعتين على الأقل.',
    searchTokens: ['اورليستات', 'أورليستات', 'orlistat', 'تخسيس', 'حرق دهون', 'مانع دهون', 'براز دهني']
  },
  {
    id: 'regimax_120',
    tradeName: 'ريجيماكس 120 مجم (Regimax)',
    tradeNameEn: 'Regimax 120mg (Borg Pharma)',
    scientificName: 'أورليستات (Orlistat)',
    category: 'weight_loss',
    categoryAr: 'علاج السمنة وإنقاص الوزن الموضعي في الأمعاء',
    categoryIcon: '⚖️',
    defaultTiming: 'مع وجبة الغداء أو العشاء الدسمة',
    dosageForm: 'كبسولات',
    commonDoses: ['120 مجم كبسولة واحدة مع الوجبة'],
    clinicalNotes: 'مثيل مصري شهير وعالي الجودة للأورليستات يعمل داخل تجويف الأمعاء دون امتصاص للجسم.',
    searchTokens: ['ريجيماكس', 'regimax', 'orlistat', 'تخسيس', 'برج']
  },
  {
    id: 'quick_slim_120',
    tradeName: 'كويك سليم 120 مجم (Quick Slim)',
    tradeNameEn: 'Quick Slim 120mg',
    scientificName: 'أورليستات (Orlistat)',
    category: 'weight_loss',
    categoryAr: 'كبسولات تثبيط إنزيم الليباز وإنقاص الوزن',
    categoryIcon: '⚖️',
    defaultTiming: 'وسط الوجبة الدسمة مباشرة',
    dosageForm: 'كبسولات',
    commonDoses: ['120 مجم كبسولة مع الوجبات الرئيسية'],
    clinicalNotes: 'يقلل السعرات المكتسبة من الزيوت والدهون ويساعد على الالتزام بحمية عجز السعرات.',
    searchTokens: ['كويك سليم', 'quick slim', 'orlistat', 'تخسيس']
  },
  {
    id: 'xenical_120',
    tradeName: 'زينيكال 120 مجم الأصلي (Xenical)',
    tradeNameEn: 'Xenical 120mg (Roche / Cheplapharm)',
    scientificName: 'أورليستات الأصلي المبتكر (Orlistat)',
    category: 'weight_loss',
    categoryAr: 'عقار زينيكال الأصلي لإنقاص الوزن ومكافحة السمنة',
    categoryIcon: '⚖️',
    defaultTiming: 'مع الوجبة أو بعدها بساعة',
    dosageForm: 'كبسولات زرقاء مميزة',
    commonDoses: ['120 مجم مع الوجبات'],
    clinicalNotes: 'العلامة التجارية المبتكرة عالمياً للأورليستات، يمنع امتصاص ثلث الدهون الغذائية.',
    searchTokens: ['زينيكال', 'xenical', 'orlistat', 'روتش']
  },

  // ==========================================
  // Chitosan & Fat-Carb Binders (روابط الدهون والنشويات)
  // ==========================================
  {
    id: 'chitocal_caps',
    tradeName: 'شيتوكال كبسول (Chitocal)',
    tradeNameEn: 'Chitocal (High Density Chitosan + Ascorbic Acid + Gymnema)',
    scientificName: 'شيتوزان عالي الكثافة 500 مجم + فيتامين C + خلاصة الجيمنيما',
    category: 'weight_loss',
    categoryAr: 'مكمل ربط الدهون والنشويات وتقليل امتصاص السكريات',
    categoryIcon: '⚖️',
    defaultTiming: 'قبل الوجبة بـ 15-20 دقيقة مع كوبين من الماء الكبير',
    dosageForm: 'كبسولات',
    commonDoses: ['كبسولة إلى كبسولتين قبل الوجبات الثقيلة (مرتين لـ 3 مرات يومياً)'],
    clinicalNotes: 'يرتبط الشيتوزان بالدهون المشحونة سالباً في المعدة ويقلل امتصاص الكربوهيدرات بفضل خلاصة الجيمنيما. يشترط شرب وفرة من الماء لتجنب الإمساك.',
    searchTokens: ['شيتوكال', 'chitocal', 'chitosan', 'شيتوزان', 'ربط دهون', 'تخسيس قبل الاكل']
  },
  {
    id: 'chromax_caps',
    tradeName: 'كروماكس كبسول (Chromax)',
    tradeNameEn: 'Chromax (Garcinia Cambogia Extract + Chromium Picolinate)',
    scientificName: 'خلاصة الجارسينيا كامبوجيا (HCA) + كروميوم بيكولينات',
    category: 'weight_loss',
    categoryAr: 'حارق الدهون الطبيعي وكابح الشهية ومثبت سكر الدم',
    categoryIcon: '⚖️',
    defaultTiming: 'قبل الأكل بـ 30 دقيقة مع كوب ماء كبير (3 مرات يومياً)',
    dosageForm: 'كبسولات',
    commonDoses: ['كبسولة واحدة قبل كل وجبة بنصف ساعة'],
    clinicalNotes: 'حمض الهيدروكسي سيتريك (HCA) يثبط إنزيم Citrate Lyase المسؤول عن تحويل السكريات الفائضة لدهون مخزنة، والكروميوم يقلل الرغبة في تناول السكريات والحلويات (Sugar Cravings).',
    searchTokens: ['كروماكس', 'chromax', 'garcinia', 'جارسينيا', 'كروميوم', 'سد شهية', 'حرق دهون']
  },
  {
    id: 'top_ging_caps',
    tradeName: 'توب جينج كبسول (Top Ging)',
    tradeNameEn: 'Top Ging (Ginger + Green Tea + Garcinia + Chromium)',
    scientificName: 'خلاصة الزنجبيل + الشاي الأخضر + الجارسينيا + الكروميوم',
    category: 'weight_loss',
    categoryAr: 'محفز الأيض والحرق الحراري الطبيعي (Thermogenic)',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولة قبل الوجبات بـ 30 دقيقة مع كوب ماء',
    dosageForm: 'كبسولات',
    commonDoses: ['1-2 كبسولة قبل الغداء والعشاء'],
    clinicalNotes: 'يرفع معدل الحرق الحراري وينشط الدورة الدموية ويحسن الهضم ويحد من الشهية.',
    searchTokens: ['توب جينج', 'top ging', 'زنجبيل', 'شاي اخضر', 'حرق سعرات', 'معدل الحرق']
  },
  {
    id: 'sylvester_1_caps',
    tradeName: 'سيلفستر 1 كبسول (Sylvester 1)',
    tradeNameEn: 'Sylvester 1 (Gymnema Sylvestre + Fenugreek + Chromium)',
    scientificName: 'خلاصة أوراق الجيمنيما سيلفستر 500 مجم + الحلبة + الكروميوم',
    category: 'weight_loss',
    categoryAr: 'مدمر السكريات وقاطع الرغبة في الحلويات والنشويات',
    categoryIcon: '⚖️',
    defaultTiming: 'قبل الوجبة الرئيسية بـ 20-30 دقيقة مع ماء',
    dosageForm: 'كبسولات عشبية مركزة',
    commonDoses: ['كبسولة قبل الوجبات 2-3 مرات يومياً'],
    clinicalNotes: 'تعطل الجيمنيما مستقبلات التذوق الحلو على اللسان وتثبط امتصاص الجلوكوز في بطانة الأمعاء، ممتازة لعلاج إدمان السكريات والحلويات.',
    searchTokens: ['سيلفستر', 'sylvester 1', 'جيمنيما', 'gymnema', 'ادمان حلويات', 'تخسيس سكر']
  },
  {
    id: 'apple_lite_tabs',
    tradeName: 'أبل لايت أقراص (Apple Lite)',
    tradeNameEn: 'Apple Lite (Pure Apple Pectin + Gelatin)',
    scientificName: 'ألياف بكتين التفاح النقي 500 مجم',
    category: 'weight_loss',
    categoryAr: 'ألياف الامتلاء والشبع الطبيعي الممتد',
    categoryIcon: '⚖️',
    defaultTiming: 'قرص إلى قرصين قبل الوجبة بـ 30 دقيقة مع شرب كوبين ماء كبيرين',
    dosageForm: 'أقراص للمضغ أو البلع',
    commonDoses: ['1-2 قرص قبل الوجبة بنصف ساعة'],
    clinicalNotes: 'تنتفخ ألياف البكتين داخل المعدة لتشكل هلاماً يملأ حيزاً كبيراً ويعطي إحساساً مبكراً بالامتلاء والشبع ويقلل حجم الوجبة المستهلكة.',
    searchTokens: ['ابل لايت', 'أبل لايت', 'apple lite', 'بكتين تفاح', 'الياف شبع', 'امتلاء المعدة']
  },
  {
    id: 'l_carnitine_plus',
    tradeName: 'إل-كارنيتين بلس (L-Carnitine Plus)',
    tradeNameEn: 'L-Carnitine Plus 1000mg + Zinc (Mepaco)',
    scientificName: 'إل-كارنيتين تارتارات 1000 مجم + جلوكونات الزنك',
    category: 'weight_loss',
    categoryAr: 'ناقل الأحماض الدهنية للميتوكوندريا لتوليد الطاقة أثناء التمرين',
    categoryIcon: '⚖️',
    defaultTiming: 'قبل التمرين الرياضي أو المشي بـ 30-45 دقيقة على معدة شبه فارغة',
    dosageForm: 'أقراص مغلفة / أكياس فوارة',
    commonDoses: ['1000 مجم إلى 2000 مجم قبل الجهد البدني'],
    clinicalNotes: 'ينقل الأحماض الدهنية طويلة السلسلة إلى مصانع الطاقة (الميتوكوندريا) ليتم حرقها كوقود أثناء الكارديو والمجهود العضلي.',
    searchTokens: ['ال كارنيتين', 'إل كارنيتين', 'l carnitine', 'حرق دهون تمرين', 'كارنيتين بلس']
  },

  // ==========================================
  // Obesity Injections (حقن علاج السمنة المتخصصة المعتمدة)
  // ==========================================
  {
    id: 'saxenda_pen',
    tradeName: 'ساكسندا قلم حقن يومي للتخسيس (Saxenda)',
    tradeNameEn: 'Saxenda 3.0mg/day Solution for SC Injection (Novo Nordisk)',
    scientificName: 'ليراجلوتايد 6 مجم/مل معتمد رسمياً لعلاج السمنة',
    category: 'weight_loss',
    categoryAr: 'حقن التخسيس اليومية المعتمدة لعلاج السمنة ومؤشر الكتلة المرتفع',
    categoryIcon: '⚖️',
    defaultTiming: 'حقنة واحدة يومياً تحت الجلد في أي وقت دون ارتباط بالطعام',
    dosageForm: 'أقلام حقن مدرجة الجرعات (0.6, 1.2, 1.8, 2.4, 3.0 مجم)',
    commonDoses: ['تدرج أسبوعي يبدأ بـ 0.6 مجم وصولاً لجرعة التخسيس 3.0 مجم يومياً'],
    clinicalNotes: 'يعمل على مراكز الشبع في منطقة تحت المهاد (Hypothalamus) بالمخ لكبح الجوع وتأخير إفراغ المعدة. يساعد على خسارة 8-12% من وزن الجسم مع حمية محسوبة.',
    searchTokens: ['ساكسندا', 'saxenda', 'liraglutide', 'حقن تخسيس يومية', 'سمنة مفرطة']
  },
  {
    id: 'wegovy_pen',
    tradeName: 'ويجوفي قلم أسبوعي للتخسيس (Wegovy)',
    tradeNameEn: 'Wegovy 2.4mg Weekly SC Injection (Novo Nordisk)',
    scientificName: 'سيماجلوتايد بجرعة التخسيس القصوى 2.4 مجم (Semaglutide 2.4mg)',
    category: 'weight_loss',
    categoryAr: 'أقوى حقن أسبوعية معتمدة عالمياً للتخسيس وإنقاص الوزن',
    categoryIcon: '⚖️',
    defaultTiming: 'حقنة أسبوعية في نفس اليوم تحت الجلد بالبطن أو الفخذ',
    dosageForm: 'أقلام حقن مسبقة التعبئة بألوان مختلفة حسب التركيز',
    commonDoses: ['0.25 مجم ثم 0.5 ثم 1.0 ثم 1.7 وصولاً لجرعة الثبات 2.4 مجم أسبوعياً'],
    clinicalNotes: 'تحقق فقدان وزن يصل إلى 15-18% من وزن الجسم الكلي مع تحسين ضغط الدم ومقاومة الأنسولين وصحة القلب.',
    searchTokens: ['ويجوفي', 'wegovy', 'semaglutide 2.4', 'حقن تخسيس اسبوعية', 'سيماجلوتايد تخسيس']
  },

  // ==========================================
  // Metabolism, Fat Mobilizers & Satiety Supplements (حوارق الدهون، الكروميوم، وألياف الشبع)
  // ==========================================
  {
    id: 'chromium_picolinate_200',
    tradeName: 'كروميوم 200 ميكروجرام (Chromium Picolinate)',
    tradeNameEn: 'Chromium Picolinate 200mcg Capsules (MEPACO / EVA Pharma)',
    scientificName: 'بيكولينات الكروميوم العضوية عالية الامتصاص 200 مكجم',
    category: 'weight_loss',
    categoryAr: 'عنصر الكروميوم النقي لضبط حساسية مستقبلات الأنسولين ومنع نوبات هبوط السكر المفاجئ',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولة واحدة يومياً بعد وجبة الغداء مباشرة مع كوب ماء',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['200 إلى 400 ميكروجرام يومياً'],
    clinicalNotes: 'يدخل في تركيب عامل تحمل الجلوكوز (GTF)، يساعد الأنسولين على إدخال السكر للعضلات بدل تخزينه كدهون، ويمنع الخمول واشتهاء الحلويات بعد الوجبات الدسمة.',
    searchTokens: ['كروميوم', 'chromium', 'بيكولينات كروميوم', 'مقاومة انسولين', 'حرق سكر', 'شهية حلويات']
  },
  {
    id: 'garcinia_complex_green_tea',
    tradeName: 'جارسينيا كومبلكس / شاي أخضر (Garcinia Complex)',
    tradeNameEn: 'Garcinia Cambogia Extract 60% HCA + Green Tea 500mg',
    scientificName: 'مستخلص ثمار الجارسينيا كامبوجيا (حمض الهيدروكسي سيتريك HCA) + شاي أخضر',
    category: 'weight_loss',
    categoryAr: 'مثبط إنزيم تصنيع الدهون الكبدية (ATP Citrate Lyase) ومحفز الحرق الحراري',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولة قبل الوجبات الرئيسية بـ 30 دقيقة مع شرب كوبين ماء',
    dosageForm: 'كبسولات عشبية',
    commonDoses: ['1 كبسولة مرتين إلى 3 مرات يومياً قبل الأكل'],
    clinicalNotes: 'يمنع حمض HCA تحويل الكربوهيدرات الفائضة في الوجبة إلى دهون مخزنة، كما يرفع مستويات السيروتونين ليمنع نهم الأكل العصبي.',
    searchTokens: ['جارسينيا', 'garcinia', 'hca', 'شاي اخضر', 'حرق دهون طبيعي', 'تخسيس بطن']
  },
  {
    id: 'farcovit_b12_caps',
    tradeName: 'فاركوفيت ب12 كبسول (Farcovit B12)',
    tradeNameEn: 'Farcovit B12 (Vitamin B Complex + Inositol + Orotic Acid + Cynara / Artichoke Extract - PHARCO)',
    scientificName: 'فيتامينات ب المركبة + إينوزيتول + حمض الأوروتيك + خلاصة الخرشوف (Cynara)',
    category: 'weight_loss',
    categoryAr: 'منشط الأيض الكبدي وتصريف دهون الكبد وتسهيل حرق الشحوم الداخلية',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولة إلى كبسولتين بعد الوجبات 3 مرات يومياً مع كوب ماء',
    dosageForm: 'كبسولات جيلاتينية رخوة بنية',
    commonDoses: ['1-2 كبسولة 3 مرات يومياً بعد الطعام'],
    clinicalNotes: 'تركيبة مصرية كلاسيكية شهيرة تنشط خلايا الكبد وتسرع استقلاب الدهون والكربوهيدرات وتمنع تراكم الشحوم الحشوية.',
    searchTokens: ['فاركوفيت', 'farcovit', 'فاركوفيت ب12', 'خرشوف', 'دهون كبد', 'تنشيط ايض']
  },
  {
    id: 'bran_tablets_diet',
    tradeName: 'أقراص بران / ردة للتخسيس (Bran Tablets)',
    tradeNameEn: 'Bran Tablets (Wheat Bran Fiber + Calcium Phosphate - MEPACO)',
    scientificName: 'ألياف الردة الطبيعية النقية (Wheat Bran Fiber 500mg)',
    category: 'weight_loss',
    categoryAr: 'ألياف الشبع الميكانيكي الطبيعي لعلاج إمساك الرجيم وتقليل السعرات',
    categoryIcon: '⚖️',
    defaultTiming: 'قرصان إلى 3 أقراص قبل الوجبة بـ 20 دقيقة مع شرب كوبين ماء كبيرين على الأقل',
    dosageForm: 'أقراص من الردة الطبيعية قابلة للمضغ أو البلع',
    commonDoses: ['2-3 أقراص قبل كل وجبة بنصف ساعة'],
    clinicalNotes: 'تمتص الماء داخل المعدة ويتضاعف حجمها لتعطي إحساساً ممتداً بالشبع والامتلاء، كما تحسن حركة القولون وتقضي على الإمساك المصاحب للحميات.',
    searchTokens: ['بران', 'ردة', 'bran', 'اقراص ردة', 'شبع طبيعي', 'الياف ردة']
  },
  {
    id: 'cla_1000_tonalin',
    tradeName: 'سي إل إيه 1000 مجم (CLA 1000 / Tonalin)',
    tradeNameEn: 'Conjugated Linoleic Acid (CLA 1000mg Softgels)',
    scientificName: 'حمض اللينوليك المقترن النقي 1000 مجم (Pure CLA)',
    category: 'weight_loss',
    categoryAr: 'مستهدف دهون الخصر والبطن وتثبيت الكتلة العضلية أثناء الدايت',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولة مع وجبة الإفطار وكبسولة مع وجبة الغداء',
    dosageForm: 'كبسولات جيلاتينية رخوة نقية',
    commonDoses: ['1000 مجم مرتين إلى 3 مرات يومياً مع الأكل'],
    clinicalNotes: 'يثبط إنزيم Lipoprotein Lipase المسؤول عن تخزين الدهون في منطقة الخصر والأرداف، ويحفز حرق الدهون المخزنة مع الحفاظ على الأنسجة العضلية النشطة أيقونياً.',
    searchTokens: ['سي ال ايه', 'cla', 'حمض اللينوليك', 'دهون البطن', 'تخسيس الخصر', 'عضلات صافية']
  },

  // ==========================================
  // Dual Incretin Agonists & Advanced Anti-Obesity (محفزات هرمونات الشبع المزدوجة والأدوية المركزية)
  // ==========================================
  {
    id: 'mounjaro_tirzepatide',
    tradeName: 'مونجارو قلم أسبوعي (Mounjaro)',
    tradeNameEn: 'Mounjaro (Tirzepatide Dual GIP / GLP-1 Receptor Agonist - Eli Lilly)',
    scientificName: 'تيرزيباتيد محفز مزدوج لمستقبلات GIP و GLP-1 (Tirzepatide)',
    category: 'weight_loss',
    categoryAr: 'العقار الأقوى عالمياً لخفض الوزن وعلاج السمنة ومقاومة الأنسولين والسكر',
    categoryIcon: '⚖️',
    defaultTiming: 'حقنة واحدة أسبوعياً تحت الجلد في نفس اليوم (البطن، الفخذ، أو أعلى الذراع)',
    dosageForm: 'أقلام حقن مفردة الجرعة مسبقة التعبئة (2.5, 5, 7.5, 10, 12.5, 15 مجم)',
    commonDoses: ['يبدأ بجرعة 2.5 مجم أسبوعياً لمدة 4 أسابيع ثم التدرج إلى 5 مجم وصولاً لجرعة الفاعلية المستهدفة'],
    clinicalNotes: 'يعمل بازدواجية فريدة على هرموني GIP و GLP-1 مما يحقق خسارة وزن تفوق 20-22% من وزن الجسم الكلي، مع تحسين استثنائي لحساسية الأنسولين وضغط الدم ومحيط الخصر.',
    searchTokens: ['مونجارو', 'mounjaro', 'tirzepatide', 'تيرزيباتيد', 'حقن مونجارو', 'تخسيس هرموني', 'اقوى حقن تخسيس']
  },
  {
    id: 'zepbound_tirzepatide',
    tradeName: 'زيباوند قلم التخسيس المعتمد (Zepbound)',
    tradeNameEn: 'Zepbound (Tirzepatide for Chronic Weight Management - Eli Lilly)',
    scientificName: 'تيرزيباتيد المخصص والمعتمد رسمياً من FDA لعلاج السمنة المزمنة',
    category: 'weight_loss',
    categoryAr: 'الاسم التجاري المعتمد للتيرزيباتيد لعلاج السمنة وإدارة الوزن طويل المدى',
    categoryIcon: '⚖️',
    defaultTiming: 'حقنة أسبوعية تحت الجلد في أي وقت مع أو بدون وجبات',
    dosageForm: 'أقلام حقن أوتوماتيكية سريعة وسهلة الاستخدام',
    commonDoses: ['2.5 مجم ثم 5 مجم ثم 7.5 ثم 10 ثم 12.5 ثم 15 مجم أسبوعياً'],
    clinicalNotes: 'يخمد شهية الأكل والشراهة للسكريات، ويؤخر الهضم ليعطي امتلاءً دائماً مع الحفاظ على الحرق الأيضي النشط وتراجع دهون الكبد.',
    searchTokens: ['زيباوند', 'zepbound', 'تيرزيباتيد تخسيس', 'علاج السمنة المفرطة', 'eli lilly']
  },
  {
    id: 'contrave_mysimba',
    tradeName: 'كونتراف / ميسيمبا (Contrave / Mysimba)',
    tradeNameEn: 'Contrave / Mysimba (Bupropion HCl 90mg + Naltrexone HCl 8mg ER)',
    scientificName: 'بيوبروبيون ممتد المفعول + نالتريكسون هيدروكلوريد',
    category: 'weight_loss',
    categoryAr: 'علاج إدمان الطعام والشهية العاطفية ونوبات الشراهة (Binge Eating)',
    categoryIcon: '⚖️',
    defaultTiming: 'قرص صباحاً ومساءً مع وجبة خفيفة قليلة الدهون (تجنب الوجبات عالية الدسم منعاً لزيادة الامتصاص السريع)',
    dosageForm: 'أقراص ممتدة المفعول ثنائية الطبقة',
    commonDoses: ['التدرج أسبوعياً من قرص صباحاً حتى قرصين صباحاً وقرصين مساءً (4 أقراص يومياً كحد أقصى)'],
    clinicalNotes: 'يستهدف مسار المكافأة والدوبامين في المخ ليقطع الرغبة القهرية في تناول الطعام والسكريات والمأكولات السريعة ليلاً. ممنوع لمن لديهم تاريخ صرع أو تشنجات.',
    searchTokens: ['كونتراف', 'contrave', 'ميسيمبا', 'mysimba', 'شراهة اكل', 'ادمان سكريات', 'بيوبروبيون', 'نالتريكسون']
  },
  {
    id: 'qsymia_combo',
    tradeName: 'كوسيميا (Qsymia)',
    tradeNameEn: 'Qsymia (Phentermine 3.75mg-15mg + Topiramate ER 23mg-92mg)',
    scientificName: 'فينترمين كابح شهية محفز + توبيرامات ممتد المفعول',
    category: 'weight_loss',
    categoryAr: 'التركيبة المزدوجة المعتمدة من FDA للتحكم الحاد في الشهية وزيادة الإحساس بالشبع',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولة واحدة يومياً صباحاً مع أو بدون إفطار (تجنب المساء منعاً للأرق)',
    dosageForm: 'كبسولات ممتدة المفعول بجرعات متدرجة',
    commonDoses: ['جرعة بدء 3.75/23 مجم لمدة 14 يوماً ثم التدرج للجرعة العلاجية 7.5/46 مجم يومياً'],
    clinicalNotes: 'يجمع بين التحفيز السريع لكبح الشهية العصبي مع تغيير حاسة التذوق وتقليل الرغبة في الأكل. يجب فحص ضغط الدم بانتظام أثناء الاستخدام.',
    searchTokens: ['كوسيميا', 'qsymia', 'phentermine', 'topiramate', 'فينترمين', 'توبيرامات', 'تخسيس مركزي']
  },

  // ==========================================
  // Natural Satiety, Glucose Disposal & Thermogenics (المكملات الطبيعية، تنظيم الأنسولين، والحرق الحراري)
  // ==========================================
  {
    id: 'berberine_500_hcl',
    tradeName: 'بربرين 500 مجم (Berberine HCL - الميتفورمين الطبيعي)',
    tradeNameEn: 'Berberine HCl 500mg (Active Botanical Alkaloid)',
    scientificName: 'هيدروكلوريد البربرين النقي 500 مجم (Pure Berberine Extract)',
    category: 'weight_loss',
    categoryAr: 'المحفز النباتي لإنزيم AMPK لحرق الدهون وتنظيم سكر الدم ومقاومة الأنسولين',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولة قبل الوجبات الرئيسية بـ 15 دقيقة مع كوب ماء (مرتين لـ 3 مرات يومياً)',
    dosageForm: 'كبسولات نباتية صفراء',
    commonDoses: ['500 مجم 2-3 مرات يومياً مع أو قبل الوجبات'],
    clinicalNotes: 'ينشط إنزيم AMPK (مفتاح الحرق الأيضي الرئيسي في الجسم)، يماثل تأثير الميتفورمين في خفض سكر الدم التراكمي وتفريغ دهون الكبد وخفض الكوليسترول الضار.',
    searchTokens: ['بربرين', 'بيربيرين', 'berberine', 'ميتفورمين طبيعي', 'حرق سكر', 'مقاومة انسولين', 'ampk']
  },
  {
    id: 'apple_cider_vinegar_caps',
    tradeName: 'كبسولات خل التفاح مع أم الخل (Apple Cider Vinegar with Mother)',
    tradeNameEn: 'Organic Apple Cider Vinegar 500mg-1000mg + Ginger + Cayenne',
    scientificName: 'مسحوق خل التفاح العضوي الخام غير المصفى (حمض الأسيتيك 5%)',
    category: 'weight_loss',
    categoryAr: 'تحسين حموضة المعدة، كبح طفرات الجلوكوز بعد الوجبات، وتخفيف الانتفاخ',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولة إلى كبسولتين قبل الوجبة الرئيسية بـ 15-20 دقيقة مع كوب ماء',
    dosageForm: 'كبسولات أو أقراص جيلاتينية (بدون إتلاف مينا الأسنان)',
    commonDoses: ['500-1000 مجم قبل الوجبات الكبيرة'],
    clinicalNotes: 'تبطئ كبسولات خل التفاح سرعة خروج الطعام من المعدة وتقلل القفزة الحادة في سكر الدم والأنسولين بعد الكربوهيدرات بنسبة تصل لـ 30% دون حرق المريء أو تآكل الأسنان.',
    searchTokens: ['خل التفاح', 'apple cider vinegar', 'كبسولات خل التفاح', 'عسر هضم', 'تخسيس طبيعي', 'حموضة معدة']
  },
  {
    id: 'myo_inositol_dchiro',
    tradeName: 'مايو-إينوزيتول + دي-كايرو إينوزيتول (Inositol 40:1 / Ovacyst)',
    tradeNameEn: 'Myo-Inositol 2000mg + D-Chiro Inositol 50mg (Optimal 40:1 Ratio) + Folate',
    scientificName: 'مايو-إينوزيتول نقي 2000 مجم + دي-كايرو إينوزيتول 50 مجم + حمض الفوليك',
    category: 'weight_loss',
    categoryAr: 'العلاج الذهبي لتكيس المبايض ومقاومة الأنسولين وتخسيس دهون البطن الهرمونية',
    categoryIcon: '⚖️',
    defaultTiming: 'كيس يذاب في كوب ماء صباحاً على الريق أو كبسولتان مرتين يومياً قبل الوجبات',
    dosageForm: 'أكياس فوارة سريعة الذوبان / كبسولات',
    commonDoses: ['2000 مجم إلى 4000 مجم يومياً مقسمة على جرعتين'],
    clinicalNotes: 'يعيد حساسية مستقبلات الأنسولين والمبايض لطبيعتها، ينظم التبويض والدورة الشهرية، يقلل تساقط الشعر الهرموني والشعر الزائد، ويساعد في إذابة دهون الخصر العنيدة.',
    searchTokens: ['اينوزيتول', 'مايو اينوزيتول', 'myo inositol', 'ovacyst', 'تكيس مبايض', 'مقاومة انسولين دهون']
  },
  {
    id: 'glucomannan_konjac_fiber',
    tradeName: 'جلوكومانان / ألياف الكونجاك 1000 مجم (Glucomannan)',
    tradeNameEn: 'Glucomannan Konjac Root Extract 1000mg Capsules',
    scientificName: 'ألياف جذور نبات الكونجاك القابلة للذوبان فائقة التمدد (Glucomannan)',
    category: 'weight_loss',
    categoryAr: 'الألياف الأكثر قدرة على التمدد عالمياً لملء المعدة وتقليص حجم الوجبة',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولتان قبل الأكل بـ 30-45 دقيقة مع شرب كوبين كاملين من الماء الدافئ إلزامياً',
    dosageForm: 'كبسولات نباتية',
    commonDoses: ['1000 مجم (كبسولتان) 3 مرات يومياً قبل كل وجبة رئيسية'],
    clinicalNotes: 'يمتص الماء حتى 50 ضعف وزنه داخل المعدة مشكلاً مصفوفة هلامية ضخمة تملأ فراغ المعدة وترسل إشارات الشبع المبكرة للدماغ وتطرد الكوليسترول الضار.',
    searchTokens: ['جلوكومانان', 'glucomannan', 'الياف كونجاك', 'شبع سريع', 'امتلاء المعدة', 'تكميم طبيعي']
  },
  {
    id: 'lipo6_black_ultra',
    tradeName: 'ليبو 6 بلاك ألترا (Lipo-6 Black Ultra Concentrate)',
    tradeNameEn: 'Lipo-6 Black Ultra Concentrate (Nutrex Research)',
    scientificName: 'تركيبة مركزة فائقة الحرق الحراري: كافيين لا مائي + يوهيمبين + ثيوبرومين + راوولسين',
    category: 'weight_loss',
    categoryAr: 'حارق الدهون الرياضي الحراري عالي الطاقة لتنشيط معدل الحرق في الجيم',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولة واحدة صباحاً قبل الإفطار بـ 30 دقيقة، أو قبل تمرين الكارديو صباحاً (لا تتناولها بعد الساعة 4 عصراً)',
    dosageForm: 'كبسولات سائلة سريعة الامتصاص سوداء',
    commonDoses: ['كبسولة واحدة فقط صباحاً (تجنب تجاوز كبسولة واحدة في الجرعة منعاً لخفقان القلب)'],
    clinicalNotes: 'يرفع حرارة الجسم الداخلية ومعدل الأيض الأساسي (BMR) ويحرر الأحماض الدهنية العالقة في الأنسجة العنيدة بفضل تثبيط مستقبلات Alpha-2 الأدرينالية.',
    searchTokens: ['ليبو 6', 'lipo 6', 'lipo6 black', 'حارق دهون جيم', 'تنشيف عضلات', 'كافيين مركز']
  },
  {
    id: 'animal_cuts_powder',
    tradeName: 'أنيمال كتس أكياس / بودرة (Animal Cuts)',
    tradeNameEn: 'Universal Nutrition Animal Cuts Complete Fat Burner & Water Shredder',
    scientificName: 'مجمع التنشيف الشامل: محفزات حرارية + طارد سوائل محبوسة + معززات الغدة الدرقية والكورتيزول',
    category: 'weight_loss',
    categoryAr: 'كورس التنشيف الرياضي الشامل لتصريف السوائل المحتبسة وحرق دهون البطن',
    categoryIcon: '⚖️',
    defaultTiming: 'كيس واحد صباحاً على الريق قبل الإفطار وكيس ثانٍ بعد 4-6 ساعات قبل التمرين',
    dosageForm: 'أكياس تحتوي على كبسولات متعددة الألوان / بودرة للشرب',
    commonDoses: ['كيس يومياً لمدة 3 أسابيع متتالية يعقبها أسبوع راحة'],
    clinicalNotes: 'يستهدف الدهون العنيدة مع طرد الماء الزائد تحت الجلد بفضل الأعشاب المدرة الطبيعية (Taraxacum & Uva Ursi)، مع الحفاظ التام على حجم العضلات الصافية.',
    searchTokens: ['انيمال كتس', 'animal cuts', 'تنشيف دهون', 'طرد مياه محبوسة', 'مكملات رياضية تخسيس']
  },
  {
    id: 'spirulina_chlorella_diet',
    tradeName: 'سبيرولينا وكلوريلا عضوية (Organic Spirulina & Chlorella)',
    tradeNameEn: 'Spirulina & Chlorella Superfood 1000mg (Rich in Phycocyanin & Chlorophyll)',
    scientificName: 'طحالب سبيرولينا وكلوريلا الخضراء المزرقة العضوية النقية (Microalgae)',
    category: 'weight_loss',
    categoryAr: 'سوبر فود مغذي لمنع الضعف وتساقط الشعر أثناء الدايت وتطهير الجسم',
    categoryIcon: '⚖️',
    defaultTiming: 'قرصان إلى 3 أقراص قبل الغداء بنصف ساعة مع كوب ماء',
    dosageForm: 'أقراص خضراء داكنة مضغوطة من الطحالب النقية',
    commonDoses: ['1000 مجم إلى 3000 مجم يومياً'],
    clinicalNotes: 'تحتوي على 65% بروتين نباتي كامل مع كافة الأحماض الأمينية وفيتامينات B والحديد والزنك ومضاد الأكسدة القوي (Phycocyanin)، تمنع الخمول والإرهاق المصاحب لرجيم عجز السعرات.',
    searchTokens: ['سبيرولينا', 'spirulina', 'كلوريلا', 'chlorella', 'طحالب خضراء', 'دايت بدون انيميا', 'سوبرفود']
  },
  {
    id: 'moringa_leaf_extract',
    tradeName: 'مورينجا أوليفيرا 1000 مجم (Moringa Oleifera)',
    tradeNameEn: 'Pure Moringa Oleifera Leaf Extract 1000mg Capsules',
    scientificName: 'مستخلص أوراق المورينجا أوليفيرا المجففة الغنية بمضادات الأكسدة والبوليفينول',
    category: 'weight_loss',
    categoryAr: 'شجرة الحياة لتسريع الأيض وخفض الالتهابات وموازنة هرمونات الجوع',
    categoryIcon: '⚖️',
    defaultTiming: 'كبسولة صباحاً بعد الإفطار وكبسولة بعد الغداء',
    dosageForm: 'كبسولات نباتية خضراء',
    commonDoses: ['1000-2000 مجم يومياً'],
    clinicalNotes: 'غنية بمركب حمض الكلوروجينيك (Chlorogenic Acid) والايزوثيوسيانات التي تدعم حرق الدهون وتنظم هرمون الليبتين وتكافح دهون الخصر.',
    searchTokens: ['مورينجا', 'moringa', 'اوراق مورينجا', 'تخسيس طبيعي', 'مضادات التهاب']
  }
];

