import { EgyptianMedication } from './types';

export const SUPPLEMENTS_VITAMINS_MEDS: EgyptianMedication[] = [
  // ==========================================
  // Vitamin D & Bone Calcification (فيتامين د3 وصحة العظام)
  // ==========================================
  {
    id: 'vidrop_oral_drops',
    tradeName: 'فيدروب نقط فموية (Vidrop)',
    tradeNameEn: 'Vidrop Oral Drops 2800 IU/ml (Vitamin D3)',
    scientificName: 'كوليكالسيفيرول نقي (Cholecalciferol - Vitamin D3)',
    category: 'supplements',
    categoryAr: 'فيتامين د3 النقي عالي الامتصاص للأطفال والبالغين',
    categoryIcon: '💊',
    defaultTiming: 'مع وجبة الإفطار أو الغداء المحتوية على دهون صحية (زيت زيتون، بيض، أفوكادو)',
    dosageForm: 'قطارة فموية (كل نقطة تعادل 100 وحدة دولية)',
    commonDoses: ['10-20 نقطة يومياً للوقاية (1000-2000 وحدة)', 'زجاجة كاملة أو نصف زجاجة أسبوعياً للتعويض'],
    clinicalNotes: 'فيتامين ذائب في الدهون، يجب تناوله مع وجبة تحتوي على دهون لامتصاصه بنسبة 100%. ممتاز لرفع المناعة وتثبيت الكالسيوم في العظام والأسنان.',
    searchTokens: ['فيدروب', 'vidrop', 'vitamin d3', 'فيتامين د', 'نقط فيدروب', 'كوليكالسيفيرول', 'هشاشة']
  },
  {
    id: 'devarol_s_200k',
    tradeName: 'ديفارول-إس 200,000 وحدة (Devarol-S)',
    tradeNameEn: 'Devarol-S 200,000 IU / 2ml Ampoule (Memphis Egypt)',
    scientificName: 'فيتامين د3 تركيز علاجي مكثف (Vitamin D3 200,000 IU)',
    category: 'supplements',
    categoryAr: 'أمبولات علاج النقص الحاد في فيتامين د3 (حقن أو شرب)',
    categoryIcon: '💊',
    defaultTiming: 'حقنة عضلية عميقة كل شهر، أو تفرغ محتويات الأمبولة على نصف كوب حليب أو عصير وتشرب بعد وجبة دسمة',
    dosageForm: 'أمبولات زيتية 2 مل',
    commonDoses: ['أمبولة واحدة كل 2 إلى 4 أسابيع حسب شدة النقص في التحليل'],
    clinicalNotes: 'علاج صدمي سريع لرفع مستويات فيتامين د من تحت 20 نانوجرام إلى المستوى المثالي (40-60 نانوجرام/مل). آمنة للشرب الفموي أو الحقن العضلي.',
    searchTokens: ['ديفارول', 'devarol', 'حقنة فيتامين د', 'فيتامين د 200 الف', 'نقص فيتامين د']
  },
  {
    id: 'davitindi_5000_10000',
    tradeName: 'دافيتيندي (Davitindi 5000 / 10000 IU)',
    tradeNameEn: 'Davitindi 5,000 IU / 10,000 IU Tablets',
    scientificName: 'فيتامين د3 أقراص عالية التركيز (Cholecalciferol)',
    category: 'supplements',
    categoryAr: 'أقراص فيتامين د3 الأسبوعية أو اليومية سهلة التناول',
    categoryIcon: '💊',
    defaultTiming: 'بعد وجبة الغداء الدسمة مع كوب ماء',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['قرص 5000 وحدة يومياً', 'أو قرص 10000 وحدة مرتين أسبوعياً', 'أو قرص 50000 وحدة أسبوعياً'],
    clinicalNotes: 'خيار ممتاز لمن يفضلون الأقراص على النقط أو الحقن لضبط المناعة والتمثيل الغذائي.',
    searchTokens: ['دافيتيندي', 'davitindi', 'vitamin d tablets', 'فيتامين د 5000', 'فيتامين د 10000']
  },

  // ==========================================
  // Vitamin B-Complex & Neuropathy (فيتامين ب المركب والأعصاب)
  // ==========================================
  {
    id: 'milga_advance',
    tradeName: 'ميلجا أدفانس أقراص (Milga Advance)',
    tradeNameEn: 'Milga Advance (Benfotiamine 300mg + B6 100mg + B12 250mcg)',
    scientificName: 'بينفوتيامين 300 مجم + بيريدوكسين 100 مجم + سيانوكوبالامين',
    category: 'supplements',
    categoryAr: 'أقوى مقوي أعصاب ومضاد لالتهاب الأعصاب الطرفية لمرضى السكري',
    categoryIcon: '💊',
    defaultTiming: 'قرص واحد يومياً بعد وجبة الإفطار أو الغداء مع كوب ماء',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['قرص يومياً بعد الأكل'],
    clinicalNotes: 'البينفوتيامين هو فيتامين B1 الذائب في الدهون الذي يخترق الأغلفة العصبية بكفاءة تفوق فيتامين B1 المائي بـ 5 أضعاف لعلاج وخز وتنميل اليدين والقدمين وإجهاد العضلات.',
    searchTokens: ['ميلجا', 'ميلجا ادفانس', 'milga advance', 'benfotiamine', 'تنميل اطراف', 'اعصاب السكر', 'بينفوتيامين']
  },
  {
    id: 'neuroton_tabs_amp',
    tradeName: 'نيوروتون أقراص / أمبول (Neuroton)',
    tradeNameEn: 'Neuroton (Vit B1, B2, B6, B12, Folic Acid, Orotic Acid)',
    scientificName: 'مجمع فيتامين ب المركز + حمض الفوليك وحمض الأوروتيك',
    category: 'supplements',
    categoryAr: 'منشط الأعصاب الشامل ومجدد خلايا الكبد وتكوين الدم',
    categoryIcon: '💊',
    defaultTiming: 'أقراص: قرص بعد الأكل مرتين يومياً / أمبول: عضل يوم بعد يوم أو مرتين أسبوعياً',
    dosageForm: 'أقراص مغلفة / أمبولات حقن عضلي',
    commonDoses: ['1-2 قرص يومياً', 'أمبولة عضل كل 3 أيام'],
    clinicalNotes: 'تركيبة غنية تعزز الطاقة، تمنع الخمول، وتحسن توصيل الإشارات العصبية وتعالج آلام الرقبة وأسفل الظهر.',
    searchTokens: ['نيوروتون', 'neuroton', 'حقن نيوروتون', 'فيتامين ب مركب', 'اعصاب']
  },
  {
    id: 'depovit_b12_amp',
    tradeName: 'ديبوفيت ب12 أمبول (Depovit B12)',
    tradeNameEn: 'Depovit B12 1000mcg / Ampoule (Hydroxocobalamin)',
    scientificName: 'هيدروكسوكوبالامين طويل المفعول 1000 ميكروجرام',
    category: 'supplements',
    categoryAr: 'حقن فيتامين B12 ممتدة المفعول لمخزون الدم والأعصاب',
    categoryIcon: '💊',
    defaultTiming: 'حقنة عضلية عميقة كل أسبوع إلى أسبوعين (أو كل شهر للوقاية)',
    dosageForm: 'أمبولات للحقن العضلي',
    commonDoses: ['أمبولة أسبوعياً لمدة شهر ثم أمبولة كل أسبوعين إلى شهر'],
    clinicalNotes: 'يرتبط ببروتينات الدم ويمكث في الكبد لفترة أطول بكثير من السيانوكوبالامين العادي، أساسي جداً لمن يتناولون الميتفورمين أو أدوية حموضة المعدة لفترات طويلة.',
    searchTokens: ['ديبوفيت', 'depovit', 'b12', 'فيتامين ب12', 'حقن ديبوفيت', 'هيدروكسوكوبالامين', 'انيميا']
  },
  {
    id: 'methylcobal_500',
    tradeName: 'ميثيلكوبال 500 ميكروجرام (Methylcobal)',
    tradeNameEn: 'Methylcobal 500mcg (Methylcobalamin)',
    scientificName: 'ميثيل كوبالامين النشط حيوياً (Active B12)',
    category: 'supplements',
    categoryAr: 'الصورة النشطة المباشرة لفيتامين B12 دون الحاجة لتحويل كبدي',
    categoryIcon: '💊',
    defaultTiming: 'قرص 3 مرات يومياً بعد الوجبات',
    dosageForm: 'أقراص مغلفة صغيرة',
    commonDoses: ['500 ميكروجرام 1-3 مرات يومياً'],
    clinicalNotes: 'ممتاز لمرضى الكبد أو كبار السن الذين يعانون من ضعف تحويل الفيتامينات إلى صورها النشطة، يحسن تجدد غمد الميالين العصبي.',
    searchTokens: ['ميثيلكوبال', 'methylcobal', 'methylcobalamin', 'ميثيل كوبالامين', 'b12 نشط']
  },

  // ==========================================
  // Iron & Hemoglobin Builders (علاجات الأنيميا والحديد)
  // ==========================================
  {
    id: 'ferotron_caps',
    tradeName: 'فيروترون كبسول (Ferotron)',
    tradeNameEn: 'Ferotron (Iron Amino Acid Chelate + Minerals + B-Complex + C)',
    scientificName: 'حديد مخلبي على أحماض أمينية 15 مجم + زنك + نحاس + فيتامينات',
    category: 'supplements',
    categoryAr: 'الحديد المخلبي اللطيف على المعدة بدون إمساك أو غثيان',
    categoryIcon: '💊',
    defaultTiming: 'بعد وجبة الغداء أو الإفطار بساعة مع كوب ماء أو عصير برتقال طازج',
    dosageForm: 'كبسولات جيلاتينية',
    commonDoses: ['كبسولة واحدة يومياً (أو كبسولتان في حالات فقر الدم الشديد)'],
    clinicalNotes: 'تقنية التخلب الأميني تجعله يمتص في الأمعاء مباشرة كبروتين دون أن يتهيج جدار المعدة أو يسبب إمساكاً شديداً أو طعماً معدنياً. تجنب الشاي والقهوة والحليب لمدة ساعتين حول الجرعة.',
    searchTokens: ['فيروترون', 'ferotron', 'حديد مخلبي', 'علاج الانيميا', 'بدون امساك', 'هيموجلوبين']
  },
  {
    id: 'feroglobin_caps',
    tradeName: 'فيروجلوبين كبسول (Feroglobin B12)',
    tradeNameEn: 'Feroglobin B12 Capsules / Liquid (Vitabiotics UK)',
    scientificName: 'حديد لطيف بطيء الإطلاق + زنك + حمض الفوليك + B12',
    category: 'supplements',
    categoryAr: 'كبسولات الحديد الإنجليزية بطيئة الإطلاق لصحة الشعر والدم والطاقة',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة يومياً بعد الوجبة الرئيسية مباشرة مع كوب ماء بارد',
    dosageForm: 'كبسولات بطيئة الإطلاق (Slow Release Pellets)',
    commonDoses: ['كبسولة يومياً بعد الغداء'],
    clinicalNotes: 'حبيبات دقيقة تنطلق تدريجياً داخل الأمعاء لضمان امتصاص متوازن وتفادي ثقل المعدة وتساقط الشعر الناتج عن نقص مخزون الحديد (Ferritin).',
    searchTokens: ['فيروجلوبين', 'feroglobin', 'حديد وشعر', 'فيتابيوتكس', 'انيميا تساقط الشعر']
  },
  {
    id: 'pravotin_lactoferrin',
    tradeName: 'برافوتين أكياس لاكتوفيرين (Pravotin 100mg)',
    tradeNameEn: 'Pravotin 100mg Lactoferrin Sachets (Hygint Egypt)',
    scientificName: 'لاكتوفيرين بقري عالي النقاوة 100 مجم (Lactoferrin)',
    category: 'supplements',
    categoryAr: 'بروتين نقل وتثبيت الحديد ورفع المناعة وامتصاص الفيريتين السريع',
    categoryIcon: '💊',
    defaultTiming: 'يذاب الكيس في ربع كوب ماء أو حليب دافئ ويشرب قبل الأكل بربع ساعة على معدة فارغة',
    dosageForm: 'أكياس بودرة بنكهات مقبولة',
    commonDoses: ['كيس إلى كيسين يومياً صباحاً ومساءً لمدة شهر إلى 3 أشهر'],
    clinicalNotes: 'يرتبط بالحديد الحر ويوجهه مباشرة لمستقبلات الخلايا فيرفع الهيموجلوبين ومخزون الحديد بسرعة قياسية دون أي آثار جانبية هضمية. كما يمتلك خواص مضادة للبكتيريا والفيروسات.',
    searchTokens: ['برافوتين', 'pravotin', 'لاكتوفيرين', 'lactoferrin', 'رفع الهيموجلوبين', 'مخزون الحديد', 'فيريتين']
  },

  // ==========================================
  // Magnesium & Muscle Relaxation (المغنيسيوم والعضلات والنوم)
  // ==========================================
  {
    id: 'mag_g_glycinate',
    tradeName: 'ماج-جي / مغنيسيوم جلايسينات (Mag-G Glycinate)',
    tradeNameEn: 'Magnesium Bisglycinate 200mg / 400mg Chelate',
    scientificName: 'مغنيسيوم بيسجلايسينات مخلبي (Magnesium Bisglycinate)',
    category: 'supplements',
    categoryAr: 'الصورة الأرقى للمغنيسيوم للاسترخاء، علاج الشد العضلي، وتحسين جودة النوم العميق',
    categoryIcon: '💊',
    defaultTiming: 'مساءً قبل النوم بـ 30-60 دقيقة مع كوب ماء',
    dosageForm: 'كبسولات / أقراص مخلبية',
    commonDoses: ['200 مجم إلى 400 مجم قبل النوم'],
    clinicalNotes: 'أعلى صور المغنيسيوم امتصاصاً وألطفها على القولون إطلاقاً (لا يسبب أي إسهال مقارنة بالأكسيد أو السترات). يعبر الحاجز الدموي الدماغي لتهدئة الجهاز العصبي وعلاج الأرق وشد بطات الساق ليلاً.',
    searchTokens: ['مغنيسيوم جلايسينات', 'magnesium glycinate', 'ماج جي', 'mag g', 'شد عضلي', 'ارق', 'نوم عميق']
  },
  {
    id: 'magnesium_plus_tabs',
    tradeName: 'ماجنيسيوم بلس أقراص (Magnesium Plus)',
    tradeNameEn: 'Magnesium Plus (Magnesium Lactate 470mg + Vit B6 5mg)',
    scientificName: 'لاكتات المغنيسيوم + فيتامين B6',
    category: 'supplements',
    categoryAr: 'مكمل المغنيسيوم المصري الاقتصادي لعلاج التقلصات العضلية والصداع',
    categoryIcon: '💊',
    defaultTiming: 'قرص بعد وجبة الغداء أو العشاء',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['1-2 قرص يومياً'],
    clinicalNotes: 'يعمل فيتامين B6 على تسهيل دخول المغنيسيوم لداخل الخلايا العضلية والعصبية لتخفيف الإجهاد العضلي والتوتر والصداع النصفي.',
    searchTokens: ['ماجنيسيوم بلس', 'magnesium plus', 'تقلصات عضلية', 'ماغنسيوم', 'صداع نصفي']
  },
  {
    id: 'epimag_eff_sachets',
    tradeName: 'إبيماج فوار (Epimag)',
    tradeNameEn: 'Epimag Effervescent Sachets (Magnesium Citrate)',
    scientificName: 'سترات المغنيسيوم الفوارة (Magnesium Citrate)',
    category: 'supplements',
    categoryAr: 'فوار إذابة أملاح الأوكسالات والإمساك العارض',
    categoryIcon: '💊',
    defaultTiming: 'يذاب الكيس في نصف كوب ماء بعد الوجبة 3 مرات يومياً',
    dosageForm: 'أكياس فوارة',
    commonDoses: ['كيس 1-3 مرات يومياً'],
    clinicalNotes: 'يرتبط بسترات الكالسيوم ويمنع ترسب بلورات أوكسالات الكالسيوم في الكلى والمسالك، وله تأثير ملين خفيف للأمعاء.',
    searchTokens: ['ابيماج', 'إبيماج', 'epimag', 'سترات مغنيسيوم', 'املاح اوكسالات', 'فوار كلى']
  },

  // ==========================================
  // Calcium & Bone Density (الكالسيوم وبناء العظام)
  // ==========================================
  {
    id: 'calcitron_caps',
    tradeName: 'كالسيترون كبسول (Calcitron)',
    tradeNameEn: 'Calcitron (Calcium Amino Acid Chelate + Mg + Zinc + D3 + Boron)',
    scientificName: 'كالسيوم مخلبي 134 مجم + مغنيسيوم + زنك + بورون + سيليكون + فيتامينات',
    category: 'supplements',
    categoryAr: 'تركيبة الكالسيوم المخلبي المتكاملة لمنع الهشاشة والترسب في الشرايين',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة بعد وجبة الغداء أو العشاء مع كوب ماء كبير',
    dosageForm: 'كبسولات',
    commonDoses: ['1-2 كبسولة يومياً بعد الأكل'],
    clinicalNotes: 'وجود المغنيسيوم والبورون وفيتامين D يوجه الكالسيوم لبناء العظام بدلاً من الترسب في الأوعية الدموية أو الكلى. يفصل ساعتين عن الشاي والحديد وأدوية الغدة.',
    searchTokens: ['كالسيترون', 'calcitron', 'كالسيوم مخلبي', 'هشاشة عظام', 'كالسيوم بدون حصوات']
  },
  {
    id: 'osteocare_tabs_syrup',
    tradeName: 'أوستيوكير (Osteocare)',
    tradeNameEn: 'Osteocare Tablets / Liquid (Vitabiotics UK)',
    scientificName: 'كالسيوم 400 مجم + مغنيسيوم 150 مجم + فيتامين د3 + زنك',
    category: 'supplements',
    categoryAr: 'مكمل العظام والأسنان الإنجليزي القياسي لجميع الفئات',
    categoryIcon: '💊',
    defaultTiming: 'قرص مرتين يومياً مع وجبات الطعام الرئيسية مع كوب ماء',
    dosageForm: 'أقراص مغلفة كبيرة / شراب للأطفال وكبار السن',
    commonDoses: ['1-2 قرص يومياً مع الوجبة'],
    clinicalNotes: 'نسبة متوازنة ومدروسة علمياً 2:1 بين الكالسيوم والمغنيسيوم تضمن أقصى كثافة عظمية وملاءمة ممتازة للحوامل والمرضعات.',
    searchTokens: ['اوستيوكير', 'أوستيوكير', 'osteocare', 'كالسيوم بريطاني', 'عظام واسنان']
  },

  // ==========================================
  // Zinc, Antioxidants & Multivitamins (الزنك ومضادات الأكسدة)
  // ==========================================
  {
    id: 'zinctron_caps',
    tradeName: 'زنكترون كبسول (Zinctron)',
    tradeNameEn: 'Zinctron (Zinc Amino Acid Chelate 11mg + Copper + Vit C, B6, Citrus Bioflavonoids)',
    scientificName: 'زنك مخلبي 11 مجم + نحاس 1 مجم + فيتامين C و B6 وفلافونويدات',
    category: 'supplements',
    categoryAr: 'الزنك المخلبي المتوازن مع النحاس للمناعة وصحة الجلد والشعر وهرمون التستوستيرون',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة يومياً بعد وجبة الغداء مباشرة (تجنب تناوله على معدة خاوية منعاً للغثيان)',
    dosageForm: 'كبسولات جيلاتينية',
    commonDoses: ['كبسولة واحدة يومياً بعد الأكل'],
    clinicalNotes: 'إضافة النحاس مع الزنك تمنع حدوث نقص النحاس الذي يصاحب تناول الزنك المنفرد لفترات طويلة. يدعم المناعة الخلوية وسرعة التئام الجروح وتخليق البروتين.',
    searchTokens: ['زنكترون', 'zinctron', 'زنك مخلبي', 'تساقط شعر', 'مناعة', 'تستوستيرون']
  },
  {
    id: 'octatron_caps',
    tradeName: 'أوكتاترون كبسول (Octatron)',
    tradeNameEn: 'Octatron (Chelated Zinc, Selenium, Molybdnum, Vit A, C, E, Citrus Bioflavonoids)',
    scientificName: 'زنك وسيلينيوم وموليبدنوم مخلبية + فيتامينات مضادة للأكسدة A, C, E',
    category: 'supplements',
    categoryAr: 'مضاد الأكسدة الشامل المخلبي لحماية الخلايا ومكافحة الشوارد الحرة والخصوبة',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة يومياً بعد وجبة الإفطار أو الغداء',
    dosageForm: 'كبسولات',
    commonDoses: ['كبسولة واحدة يومياً'],
    clinicalNotes: 'يحمي أغشية الخلايا من الإجهاد التأكسدي والالتهابات الصامتة، ممتاز لدعم جودة البويضات والحيوانات المنوية ونضارة البشرة.',
    searchTokens: ['اوكتاترون', 'أوكتاترون', 'octatron', 'مضادات اكسدة', 'سيلينيوم وزنك', 'خصوبة']
  },
  {
    id: 'kerovit_caps',
    tradeName: 'كيروفيت كبسول (Kerovit)',
    tradeNameEn: 'Kerovit (46 Elements Multi-vitamins + Minerals + Royal Jelly + Ginseng + CoQ10)',
    scientificName: '46 عنصراً غذائياً شاملاً + غذاء ملكات النحل + جنسنج + كوإنزيم Q10',
    category: 'supplements',
    categoryAr: 'المالتي فيتامين الأكثر شمولاً في مصر للطاقة والنشاط والحيوية الذهنية',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة صباحاً بعد وجبة الإفطار',
    dosageForm: 'كبسولات حمراء رخوة',
    commonDoses: ['كبسولة واحدة يومياً صباحاً'],
    clinicalNotes: 'يعطي دفعة طاقة ونشاط للجسم والمخ. تنبيه: لا يفضل تناوله مساءً حتى لا يسبب صعوبة في النوم بفضل وجود الجنسنج وغذاء الملكات.',
    searchTokens: ['كيروفيت', 'kerovit', 'مالتي فيتامين', 'رويال جيلي', 'جنسنج', 'طاقة وتركيز']
  },
  {
    id: 'vitamount_women_men',
    tradeName: 'فيتاماونت (Vitamount for Women / Men)',
    tradeNameEn: 'Vitamount for Women / Vitamount for Men (Amoun)',
    scientificName: 'فيتامينات ومعادن مصممة خصيصاً للاحتياجات الهرمونية والفسيولوجية للرجال أو النساء',
    category: 'supplements',
    categoryAr: 'مالتي فيتامين مخصص لاحتياجات المرأة اليومية أو الرجل',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة يومياً بعد الإفطار',
    dosageForm: 'كبسولات جيلاتينية رخوة',
    commonDoses: ['كبسولة يومياً'],
    clinicalNotes: 'نسخة السيدات تحتوي على حديد وحمض فوليك وكالسيوم أعلى، بينما نسخة الرجال تركز على الزنك ومضادات الأكسدة العضلية.',
    searchTokens: ['فيتاماونت', 'vitamount', 'فيتاماونت سيدات', 'فيتاماونت رجال', 'امون']
  },
  {
    id: 'biotin_forte_5mg',
    tradeName: 'بيوتين فورت 5 مجم (Biotin Forte)',
    tradeNameEn: 'Biotin Forte 5mg Capsules',
    scientificName: 'بيوتين عالي التركيز 5000 ميكروجرام (فيتامين B7)',
    category: 'supplements',
    categoryAr: 'فيتامين نمو الشعر وتقوية الأظافر ونضارة البشرة',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة يومياً بعد وجبة الإفطار أو الغداء مع كوب ماء كبير',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['5 مجم (5000 ميكروجرام) يومياً'],
    clinicalNotes: 'يدعم إنتاج بروتين الكيراتين الأساسي للشعر والأظافر. تنبيه سريري: يجب إيقاف البيوتين قبل إجراء تحاليل الغدة الدرقية (TSH, Free T3, Free T4) بـ 3 أيام لأنه يتداخل مع أجهزة القياس المخبرية ويعطي نتائج غير دقيقة.',
    searchTokens: ['بيوتين فورت', 'biotin forte', 'بيوتين 5000', 'تساقط شعر', 'تقوية اظافر', 'كيراتين']
  },

  // ==========================================
  // Omega-3 & Essential Fatty Acids (أوميجا 3 وزيوت السمك)
  // ==========================================
  {
    id: 'omega_3_plus_sed',
    tradeName: 'أوميجا 3 بلس (Omega 3 Plus SED)',
    tradeNameEn: 'Omega 3 Plus (Fish Oil 1000mg + Wheat Germ Oil 100mg - SEDCO)',
    scientificName: 'زيت سمك 1000 مجم (EPA/DHA) + زيت جنين القمح غني بفيتامين E',
    category: 'supplements',
    categoryAr: 'زيت السمك الأكثر انتشاراً في مصر لصحة القلب والمخ والدهون الثلاثية',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة إلى كبسولتين يومياً وسط وجبة الغداء أو العشاء مع كوب ماء بارد',
    dosageForm: 'كبسولات جيلاتينية رخوة',
    commonDoses: ['1-3 كبسولات يومياً مع الوجبات الدسمة'],
    clinicalNotes: 'يخفض الدهون الثلاثية (Triglycerides)، يقلل الالتهابات المفصلية، ويدعم التركيز الذهني وصحة الأوعية الدموية. تناول الكبسولة وسط الأكل مع ماء بارد يمنع التجشؤ بنكهة السمك.',
    searchTokens: ['اوميجا 3 بلس', 'أوميجا 3 بلس', 'omega 3 plus', 'زيت سمك', 'زيت جنين القمح', 'دهون ثلاثية']
  },
  {
    id: 'mega_sept_ultra_omega',
    tradeName: 'ميجا سيبت / ألترا أوميجا 3 (Mega-Sept / Ultra Omega 3)',
    tradeNameEn: 'Mega-Sept / Ultra Omega-3 High Potency EPA & DHA',
    scientificName: 'أوميجا 3 مركز عالي النقاوة مع محتوى مضاعف من EPA 500mg و DHA 250mg',
    category: 'supplements',
    categoryAr: 'أوميجا 3 المركز عالي التركيز للمفاصل والالتهابات وتحسين المزاج',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة يومياً مع الأكل',
    dosageForm: 'كبسولات مغلفة معوياً لمنع طعم السمك',
    commonDoses: ['1-2 كبسولة يومياً'],
    clinicalNotes: 'تركيز عالٍ من أحماض EPA المضادة للالتهاب والمحسنة للمزاج والاستشفاء الرياضي وصحة الشرايين.',
    searchTokens: ['ميجا سيبت', 'mega sept', 'ultra omega 3', 'اوميجا مركز', 'التهاب مفاصل']
  },

  // ==========================================
  // Sports, Fitness & Longevity (المكملات الرياضية ومضادات الشيخوخة)
  // ==========================================
  {
    id: 'creatine_monohydrate',
    tradeName: 'كرياتين مونوهايدرات (Creatine Monohydrate Creapure)',
    tradeNameEn: 'Creatine Monohydrate 100% Micronized / Creapure',
    scientificName: 'كرياتين مونوهايدرات ميكرونايزد نقي 5000 مجم (Pure Creatine)',
    category: 'supplements',
    categoryAr: 'أقوى مكمل مثبت علمياً لزيادة القوة والكتلة العضلية والذاكرة',
    categoryIcon: '💊',
    defaultTiming: '5 جرام (مكيال واحد) يومياً في أي وقت ثابت، يفضل بعد التمرين مع مصدر كربوهيدرات أو بروتين مع شرب وفرة من الماء طوال اليوم',
    dosageForm: 'بودرة نقية تذاب في الماء أو العصير',
    commonDoses: ['5 جرام يومياً للاستمرار دون حاجة لمرحلة تحميل'],
    clinicalNotes: 'يعيد شحن جزيئات الطاقة ATP داخل الألياف العضلية وخلايا الدماغ. هام جداً: شرب 3-4 لتر ماء يومياً. يرفع نسبة الكرياتينين في البول بشكل مؤقت وطبيعي نتيجة تكسر الكرياتين دون أي ضرر حقيقي على وظائف الكلى لدى الأصحاء.',
    searchTokens: ['كرياتين', 'creatine', 'creapure', 'قوة عضلية', 'بناء عضلات', 'مونوهايدرات']
  },
  {
    id: 'ashwagandha_ksm66',
    tradeName: 'أشواغاندا كيه إس إم 66 (Ashwagandha KSM-66)',
    tradeNameEn: 'Ashwagandha Root Extract KSM-66 600mg (Withania Somnifera)',
    scientificName: 'خلاصة جذور الأشواغاندا القياسية 5% ويذانوليدات (Withanolides)',
    category: 'supplements',
    categoryAr: 'الأدابتوجين الأقوى لخفض هرمون التوتر (الكورتيزول) وزيادة الاستشفاء',
    categoryIcon: '💊',
    defaultTiming: 'مساءً بعد العشاء أو قبل النوم بساعة مع كوب ماء',
    dosageForm: 'كبسولات نباتية مركزة',
    commonDoses: ['300 مجم إلى 600 مجم يومياً'],
    clinicalNotes: 'تخفض مستويات هرمون الكورتيزول المرتفع بنسبة تصل لـ 28%، تقلل التوتر العصبي والشراهة العاطفية للطعام (Emotional Eating)، وتحسن جودة النوم وزيادة هرمون التستوستيرون لدى الرجال.',
    searchTokens: ['اشواغاندا', 'أشواغاندا', 'ashwagandha', 'ksm66', 'كورتيزول', 'توتر', 'قلق', 'استشفاء']
  },
  {
    id: 'coq10_100_200',
    tradeName: 'كو-إنزيم كيو 10 (Coenzyme Q10)',
    tradeNameEn: 'CoQ10 100mg / 200mg (Ubiquinone / Ubiquinol)',
    scientificName: 'مساعد الإنزيم كيو 10 (Coenzyme Q10)',
    category: 'supplements',
    categoryAr: 'طاقة الميتوكوندريا وحامي عضلة القلب ومضاد آلام أدوية الكوليسترول (الستاتين)',
    categoryIcon: '💊',
    defaultTiming: 'صباحاً بعد وجبة الإفطار المحتوية على دهون',
    dosageForm: 'كبسولات جيلاتينية',
    commonDoses: ['100 مجم إلى 200 مجم يومياً'],
    clinicalNotes: 'ضروري جداً لكل من يتناول أدوية الكوليسترول (الستاتينات مثل ليبيتور وكريستور) لأنها توقف إنتاج CoQ10 الطبيعي في الجسم مسببة آلام وإرهاق العضلات.',
    searchTokens: ['كوانزيم', 'كو انزيم', 'coq10', 'ميتوكوندريا', 'الام الستاتين', 'صحة القلب']
  },
  {
    id: 'thiotacid_300_600',
    tradeName: 'ثيوتاكيد 300 / 600 مجم (Thiotacid / Thiotacid Compound)',
    tradeNameEn: 'Thiotacid 300mg, 600mg / Thiotacid Compound (EVA Pharma)',
    scientificName: 'حمض ألفا ليبويك (Alpha Lipoic Acid - ALA) + B1 + B12',
    category: 'supplements',
    categoryAr: 'مضاد الأكسدة الذهبي لالتهاب الأعصاب الطرفية وحساسية الأنسولين',
    categoryIcon: '💊',
    defaultTiming: 'على معدة فارغة قبل الأكل بـ 30 دقيقة أو بعد الأكل بساعتين',
    dosageForm: 'أقراص مغلفة / كبسولات',
    commonDoses: ['600 مجم مرة يومياً على الريق صباحاً (أو 300 مجم مرتين)'],
    clinicalNotes: 'يذوب في الماء والدهون معاً، يعالج حرقان وتنميل أطراف مرضى السكري ويحسن استجابة الخلايا للأنسولين.',
    searchTokens: ['ثيوتاكيد', 'thiotacid', 'alpha lipoic acid', 'الفا ليبويك', 'حرقان القدمين', 'اعصاب السكر']
  },

  // ==========================================
  // Comprehensive Daily Multivitamins (مالتي فيتامينات يومية متكاملة بالسوق المصري)
  // ==========================================
  {
    id: 'limitless_man_woman_max',
    tradeName: 'ليمتلس مان ماكس / ليمتلس وومان ماكس (Limitless Man / Woman Max)',
    tradeNameEn: 'Limitless Man Max / Limitless Woman Max (26+ Vitamins & Minerals - EVA Pharma)',
    scientificName: 'تركيبة متوازنة فائقة التركيز من الفيتامينات، المعادن، ومضادات الأكسدة المخصصة للرجال والنساء',
    category: 'supplements',
    categoryAr: 'المالتي فيتامين الأكثر رواجاً وتكاملاً للنشاط اليومي والمناعة وصحة الشعر والبشرة',
    categoryIcon: '💊',
    defaultTiming: 'قرص واحد يومياً بعد وجبة الإفطار أو الغداء مباشرة مع كوب ماء كبير',
    dosageForm: 'أقراص مغلفة سهلة البلع',
    commonDoses: ['1 قرص يومياً بعد الوجبة الرئيسية'],
    clinicalNotes: 'يحتوي على كافة الاحتياجات اليومية من فيتامينات B, C, D3, E, زنك، مغنيسيوم، وسيلينيوم لتعزيز الطاقة الذهنية والبدنية وتفادي الإجهاد في فترات الدايت وضغط العمل.',
    searchTokens: ['ليمتلس', 'ليمتلس مان', 'ليمتلس وومان', 'limitless', 'limitless man max', 'limitless woman', 'مالتي فيتامين مصر']
  },
  {
    id: 'royal_jelly_1000_caps',
    tradeName: 'رويال جيلي 1000 مجم (Royal Jelly 1000mg)',
    tradeNameEn: 'Royal Jelly 1000mg Capsules (Pure Lyophilized Royal Jelly - PHARCO)',
    scientificName: 'غذاء ملكات النحل النقي المجفف تجميدياً 1000 مجم (10-HDA)',
    category: 'supplements',
    categoryAr: 'منشط طبيعي فائق للحيوية والخصوبة والمناعة وتجديد طاقة الجسم',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة صباحاً بعد وجبة الإفطار مباشرة',
    dosageForm: 'كبسولات جيلاتينية رخوة',
    commonDoses: ['1 كبسولة يومياً صباحاً'],
    clinicalNotes: 'يعزز كفاءة الجهاز المناعي ويرفع مستويات الطاقة والتركيز ويدعم الخصوبة لدى الرجال والنساء. ينصح بتجنبه لمن لديهم حساسية من منتجات النحل أو حبوب اللقاح.',
    searchTokens: ['رويال جيلي', 'royal jelly', 'غذاء ملكات النحل', 'نشاط وطاقة', 'خصوبة', 'مناعة']
  },
  {
    id: 'vitazinc_caps',
    tradeName: 'فيتازينك كبسول (Vitazinc)',
    tradeNameEn: 'Vitazinc Capsules (Zinc Gluconate + Vitamin A + Vitamin E - EVA Pharma)',
    scientificName: 'زنك جلوكونات مخلبي + فيتامين أ + فيتامين هـ مضاد الأكسدة',
    category: 'supplements',
    categoryAr: 'ثلاثي النقاء لصحة البشرة، تساقط الشعر، حب الشباب، ومناعة الجهاز التنفسي',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة يومياً بعد وجبة الغداء بساعة مع كوب ماء كامل',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['1 كبسولة يومياً بعد الأكل'],
    clinicalNotes: 'مزيج مخصص لدعم التئام الجلد وتقوية بصيلات الشعر ومكافحة الالتهابات الجلدية وحب الشباب دون إحداث غثيان معوي.',
    searchTokens: ['فيتازينك', 'vitazinc', 'زنك للشعر', 'حب شباب', 'فيتامين ا', 'فيتامين هـ']
  },
  {
    id: 'folic_acid_5mg_el_nasr',
    tradeName: 'حمض الفوليك 5 مجم (Folic Acid 5mg)',
    tradeNameEn: 'Folic Acid 5mg Tablets (El-Nasr / CID Egypt)',
    scientificName: 'حمض الفوليك النقي 5 مجم (Vitamin B9)',
    category: 'supplements',
    categoryAr: 'فيتامين B9 الأساسي لتكوين كرات الدم الحمراء وصحة الحوامل والوقاية من العيوب الخلقية',
    categoryIcon: '💊',
    defaultTiming: 'قرص واحد يومياً بعد وجبة الإفطار مع كوب ماء',
    dosageForm: 'أقراص صغيرة صفراء',
    commonDoses: ['500 ميكروجرام إلى 5 مجم يومياً'],
    clinicalNotes: 'ضروري جداً قبل التخطيط للحمل وخلال الأشهر الثلاثة الأولى لمنع تشوهات القناة العصبية للجنين (Neural Tube Defects)، ومساند رئيسي في علاج أنيميا نقص الفولات.',
    searchTokens: ['فوليك اسيد', 'حمض الفوليك', 'folic acid', 'فوليك 5 مجم', 'فيتامين ب9', 'حمل']
  },
  {
    id: 'tothema_drinkable_ampoules',
    tradeName: 'توت هيما أمبولات شرب (Tot\'hema Drinkable Ampoules)',
    tradeNameEn: 'Tot\'hema (Ferrous Gluconate + Manganese + Copper Drinkable Ampoules - Innothera)',
    scientificName: 'جلوكونات الحديد السائل + منجنيز + نحاس لسرعة الامتصاص',
    category: 'supplements',
    categoryAr: 'أمبولات الحديد السائلة سريعة الامتصاص لعلاج الأنيميا الحادة للحوامل والمرضعات',
    categoryIcon: '💊',
    defaultTiming: 'تفرغ الأمبولة في نصف كوب ماء أو عصير برتقال وتشرب بالشاليموه قبل الأكل أو بين الوجبات',
    dosageForm: 'أمبولات زجاجية ذات طرفين للشرب الفموي بنكهة الكراميل اللطيفة',
    commonDoses: ['1-2 أمبولة يومياً لمدة شهر إلى شهرين'],
    clinicalNotes: 'نصيحة إكلينيكية هامة: يفضل شربها باستخدام ماصة (شاليموه) لتجنب صبغ الأسنان المؤقت باللون الداكن، وخلطها بعصير البرتقال يزيد سرعة امتصاص الحديد بفضل فيتامين C.',
    searchTokens: ['توت هيما', 'توت هيما امبولات', 'tothema', 'حديد شرب', 'انيميا حوامل', 'رفع الهيموجلوبين سريع']
  },
  {
    id: 'c_retard_500_cevarol',
    tradeName: 'سي-ريتارد 500 مجم / سيفارول فوار (C-Retard 500 / Cevarol)',
    tradeNameEn: 'C-Retard 500mg Sustained Release / Cevarol Effervescent 1000mg',
    scientificName: 'حمض الأسكوربيك (فيتامين C نقي ممتد المفعول / فوار)',
    category: 'supplements',
    categoryAr: 'فيتامين سي لتعزيز إنتاج الكولاجين، امتصاص الحديد، ومقاومة نزلات البرد',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة C-Retard بعد الإفطار مع ماء (أو قرص Cevarol يذاب في نصف كوب ماء ويشرب فوراً)',
    dosageForm: 'كبسولات ممتدة المفعول بخرزات دقيقة / أقراص فوارة',
    commonDoses: ['500 مجم إلى 1000 مجم يومياً'],
    clinicalNotes: 'تقنية الخرزات في C-Retard تطلق فيتامين C ببطء طوال اليوم مما يمنع فقدانه السريع في البول ويحمي المعدة من الحموضة.',
    searchTokens: ['سي ريتارد', 'c retard', 'سيفارول', 'فيتامين سي', 'vitamin c', 'مناعة برد', 'امتصاص حديد']
  },
  {
    id: 'neurobion_trio_b',
    tradeName: 'نيوروبيون / تريو-بي (Neurobion / Trio-B)',
    tradeNameEn: 'Neurobion (B1 100mg + B6 200mg + B12 200mcg - Merck/P&G) / Trio-B',
    scientificName: 'التركيبة الثلاثية الكلاسيكية لفيتامينات B1 + B6 + B12 لتغذية الأعصاب',
    category: 'supplements',
    categoryAr: 'علاج التهابات وتلف الأعصاب وتنشيط التمثيل الغذائي للبروتينات والكربوهيدرات',
    categoryIcon: '💊',
    defaultTiming: 'قرص واحد يومياً بعد وجبة الإفطار أو الغداء (أو حقنة عضلية كل 3 أيام)',
    dosageForm: 'أقراص مغلفة / أمبولات حقن عضلية',
    commonDoses: ['1 قرص يومياً أو أمبولة عضلية 2-3 مرات أسبوعياً'],
    clinicalNotes: 'يعيد بناء غلاف المايلين العازل للألياف العصبية ويخفف آلام التنميل والوخز وآلام عرق النسا والفقرات.',
    searchTokens: ['نيوروبيون', 'neurobion', 'تريو بي', 'trio b', 'فيتامين ب مركب', 'تنميل اعصاب', 'حقن اعصاب']
  },

  // ==========================================
  // Sports Nutrition, Muscle Retention & Recovery (التغذية الرياضية، الاستشفاء، وحماية العضلات)
  // ==========================================
  {
    id: 'whey_protein_isolate',
    tradeName: 'واي بروتين أيزوليت نقي (Whey Protein Isolate - ISO 100 / Gold Standard)',
    tradeNameEn: '100% Hydrolyzed Whey Protein Isolate (25g Protein, <1g Carb/Fat)',
    scientificName: 'بروتين مصل اللبن المعزول سريع الامتصاص خالي من اللاكتوز والدهون',
    category: 'supplements',
    categoryAr: 'البروتين الأعلى نقاوة لبناء العضلات الصافية، حمايتها أثناء الدايت، وتسريع الشبع',
    categoryIcon: '💊',
    defaultTiming: 'مكيال واحد (سكوب) يخلط مع 250 مل ماء بارد بعد التمرين مباشرة أو بين الوجبات كوجبة بروتينية خفيفة',
    dosageForm: 'بودرة بنكهات شيكولاتة / فانيليا / فراولة',
    commonDoses: ['1-2 سكوب يومياً حسب الاحتياج اليومي للبروتين (1.6-2.2 جم/كجم)'],
    clinicalNotes: 'أعلى قيمة حيوية بروتينية (Biological Value 104)، غني بالأحماض الأمينية متفرعة السلسلة (BCAAs وخاصة الليوسين) لإطلاق عملية تخليق البروتين العضلي (MPS) ومنع الهدم في فترات عجز السعرات.',
    searchTokens: ['واي بروتين', 'whey protein', 'ايزوليت', 'iso 100', 'بروتين دايت', 'بناء عضلات', 'سد شهية بروتين']
  },
  {
    id: 'eaa_bcaa_electrolytes',
    tradeName: 'أحماض أمينية أساسية إي أيه أيه (EAA + BCAA + Electrolytes)',
    tradeNameEn: 'Essential Amino Acids Complex 7-10g with Raw Coconut Water Electrolytes',
    scientificName: 'مجمع الأحماض الأمينية التسعة الأساسية (Leucine, Isoleucine, Valine, Lysine, Threonine, etc.) + أملاح الترطيب',
    category: 'supplements',
    categoryAr: 'حماية الكتلة العضلية من الهدم أثناء تمارين الصيام المتقطع والكارديو القاسي',
    categoryIcon: '💊',
    defaultTiming: 'مكيال يذاب في 500 مل ماء ويشرب رشفات أثناء التمرين (Intra-Workout) أو أثناء ساعات الصيام',
    dosageForm: 'بودرة فورية منعشة بنكهات الفواكه',
    commonDoses: ['سكوب واحد (10 جم) أثناء التمرين أو فترات الجهد البدني'],
    clinicalNotes: 'لا يحتوي على سعرات حرارية تكسر الصيام، يمنع انهيار الأنسجة العضلية ويحافظ على ترطيب الخلايا وكهرباء العضلات بفضل البوتاسيوم والمغنيسيوم.',
    searchTokens: ['eaa', 'bcaa', 'احماض امينية', 'ترطيب عضلات', 'صيام متقطع تمرين', 'استشفاء عضلي']
  },
  {
    id: 'l_glutamine_pure',
    tradeName: 'إل-جلوتامين 5000 مجم (L-Glutamine Kyowa Quality)',
    tradeNameEn: 'L-Glutamine 5000mg Micronized Pure Powder (Ajinomoto / Kyowa)',
    scientificName: 'حمض إل-جلوتامين النقي الحر (L-Glutamine)',
    category: 'supplements',
    categoryAr: 'ترميم جدار الأمعاء (علاج ارتشاح الأمعاء Leaky Gut)، تعزيز المناعة، والاستشفاء العضلي',
    categoryIcon: '💊',
    defaultTiming: '5 جرام (مكيال صغير) تذاب في ماء فاتر صباحاً على معدة فارغة أو بعد التمرين وقبل النوم',
    dosageForm: 'بودرة نقية عديمة الطعم',
    commonDoses: ['5-10 جرام يومياً مقسمة على جرعتين'],
    clinicalNotes: 'الغذاء الأساسي لخلايا بطانة الأمعاء (Enterocytes) وخلايا المناعة، يسد الثغرات الميكروسكوبية في جدار الجهاز الهضمي ويمنع نفاذ السموم المسببة للالتهابات المزمنة والانتفاخات.',
    searchTokens: ['جلوتامين', 'glutamine', 'ارتشاح الامعاء', 'leaky gut', 'استشفاء', 'مناعة الجهاز الهضمي']
  },
  {
    id: 'hydrolyzed_collagen_complex',
    tradeName: 'كولاجين ببتيدات متحلل + فيتامين C + هيالورونيك (Hydrolyzed Collagen)',
    tradeNameEn: 'Multi Collagen Peptides Type I, II, III (10,000mg) + Vit C + Hyaluronic Acid + Biotin',
    scientificName: 'ببتيدات كولاجين بقري/بحري متحللة مائياً منخفضة الوزن الجزيئي',
    category: 'supplements',
    categoryAr: 'مرونة الجلد، شد الترهلات بعد نزول الوزن، صحة الغضاريف والمفاصل، وكثافة الشعر',
    categoryIcon: '💊',
    defaultTiming: 'مكيال واحد يذاب في كوب ماء أو قهوة أو عصير صباحاً على الريق مع فيتامين C',
    dosageForm: 'بودرة سريعة الذوبان / أكياس فوارة',
    commonDoses: ['10 جرامات (10,000 مجم) يومياً لمدة 3 أشهر'],
    clinicalNotes: 'التحلل المائي يكسر الكولاجين إلى ببتيدات دقيقة ثلاثية الأحماض (Glycine-Proline-Hydroxyproline) يمتصها الجسم بسهولة لتدخل مباشرة في ترميم شبكة الأدمة وحماية الجلد من الترهل بعد خسارة الوزن الكبيرة.',
    searchTokens: ['كولاجين', 'collagen', 'كولاجين بحري', 'شد ترهلات', 'نضارة بشرة', 'غضاريف']
  },
  {
    id: 'melatonin_fast_dissolve',
    tradeName: 'ميلاتونين سريع الذوبان (Melatonin 3mg / 5mg / 10mg)',
    tradeNameEn: 'Melatonin Fast Dissolve / Sublingual Tablets (Pure Sleep Regulator)',
    scientificName: 'ميلاتونين نقي مطابق للهرمون الفسيولوجي الطبيعي للغدة الصنوبرية',
    category: 'supplements',
    categoryAr: 'تنظيم الساعة البيولوجية، تسريع الدخول في النوم العميق، ومضاد أكسدة عصبي',
    categoryIcon: '💊',
    defaultTiming: 'قرص واحد يذوب تحت اللسان قبل النوم بـ 30-45 دقيقة في غرفة مظلمة تماماً',
    dosageForm: 'أقراص استحلاب تحت اللسان بنكهة التوت السريعة',
    commonDoses: ['1.5 مجم إلى 5 مجم قبل النوم (لا يسبب أي إدمان أو اعتياد)'],
    clinicalNotes: 'يقلل زمن الكمون للدخول في النوم (Sleep Latency) ويحسن جودة مراحل النوم العميق (REM) التي يتم فيها إفراز هرمون النمو (GH) وحرق الدهون والاستشفاء العضلي والدماغي.',
    searchTokens: ['ميلاتونين', 'melatonin', 'هرمون النوم', 'ارق', 'نوم عميق', 'ساعة بيولوجية']
  },

  // ==========================================
  // Gut Microbiome, Liver & Cellular Health (البروبيوتيك، صحة الكبد، ومضادات السموم)
  // ==========================================
  {
    id: 'probiotics_50_billion',
    tradeName: 'بروبيوتيك متطور 50 مليار خلية نافعة (Probiotics 50 Billion CFU)',
    tradeNameEn: 'Multi-Strain Probiotics 50 Billion CFU + Organic Prebiotics Inulin (10-16 Strains)',
    scientificName: '16 سلالة نشطة من بكتيريا اللاكتوباسيلس والبيفيدوباكتيريوم المعوية المفيدة + ألياف الإنولين',
    category: 'supplements',
    categoryAr: 'إعادة التوازن الميكروبي للقولون، مكافحة الغازات، تحسين امتصاص المغذيات والمناعة',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة صباحاً على معدة شبه فارغة قبل الإفطار بـ 20 دقيقة مع ماء بارد',
    dosageForm: 'كبسولات معوية نباتية مقاومة لأحماض المعدة (DRcaps)',
    commonDoses: ['1 كبسولة يومياً لمدة شهر إلى 3 أشهر'],
    clinicalNotes: 'تدعم محور الأمعاء-المخ (Gut-Brain Axis)، تخفف أعراض القولون العصبي والانتفاخ، وتفرز أحماض دهنية قصيرة السلسلة (SCFAs مثل البيوتيرات) التي تزيد الحرق الأيضي وتقلل مقاومة الأنسولين.',
    searchTokens: ['بروبيوتيك', 'probiotics', 'بكتيريا نافعة', 'ميكروبيوم', 'غازات قولون', 'عسر هضم بكتيريا']
  },
  {
    id: 'milk_thistle_silymarin',
    tradeName: 'ليجالون / هيباتوماكس / شوك الجمل (Silymarin / Milk Thistle)',
    tradeNameEn: 'Legalon 140mg / Silymarin Milk Thistle Extract 80% Standardization',
    scientificName: 'مستخلص السيليمارين القياسي 140 مجم (Silymarin Flavonolignans)',
    category: 'supplements',
    categoryAr: 'الحامي الأقوى لخلايا الكبد، تجديد مضاد الأكسدة الجلوتاثيون، وتفريغ دهون الكبد',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة بعد الوجبات مرتين إلى 3 مرات يومياً مع كوب ماء',
    dosageForm: 'كبسولات / أقراص مغلفة',
    commonDoses: ['140 مجم 2-3 مرات يومياً'],
    clinicalNotes: 'يثبت الأغشية الخلوية لخلايا الكبد (Hepatocytes) ويمنع اختراق السموم، ويحفز تخليق البروتينات الكبدية ومضاد الأكسدة الداخلي (Glutathione)، أساسي لمرضى الكبد الدهني (Fatty Liver).',
    searchTokens: ['سيليمارين', 'ليجالون', 'legalon', 'silymarin', 'شوك الجمل', 'milk thistle', 'دهون الكبد', 'انزيمات كبد']
  },
  {
    id: 'vitamin_k2_mk7',
    tradeName: 'فيتامين ك2 إم كيه-7 (Vitamin K2 MK-7 100mcg)',
    tradeNameEn: 'Natural Vitamin K2 (Menaquinone-7 from Natto) 100mcg',
    scientificName: 'ميناكينون-7 النقي من مصدر طبيعي متخمر (All-Trans MK-7)',
    category: 'supplements',
    categoryAr: 'توجيه الكالسيوم حصراً إلى العظام والأسنان ومنع تكلس الشرايين وصمامات القلب',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة يومياً بعد وجبة دسمة مع فيتامين د3',
    dosageForm: 'كبسولات زيتية نباتية',
    commonDoses: ['100 إلى 200 ميكروجرام يومياً'],
    clinicalNotes: 'ينشط بروتين الأوستيوكالسين (Osteocalcin) لدمج الكالسيوم في مصفوفة العظام، وينشط بروتين MGP الذي يمنع ترسب الكالسيوم على جدران الشرايين التاجية وأنسجة الكلى، رفيق إلزامي لجرعات فيتامين D3 المرتفعة.',
    searchTokens: ['فيتامين ك2', 'vitamin k2', 'mk7', 'ميناكينون', 'تكلس شرايين', 'تثبيت كالسيوم']
  },
  {
    id: 'quatrefolic_methylfolate',
    tradeName: 'ميثيل فولات النشط كواتريفوليك (Methylfolate 5-MTHF 1000mcg)',
    tradeNameEn: 'Quatrefolic (6S)-5-Methyltetrahydrofolic Acid Glucosamine Salt 1000mcg',
    scientificName: 'الصورة النشطة ميثيل تتراهيدروفولات (L-Methylfolate - Active B9)',
    category: 'supplements',
    categoryAr: 'حمض الفوليك النشط الذي يتجاوز طفرة جين MTHFR لتخفيض الهوموسيستين ودعم الحمل والخصوبة',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة صباحاً بعد وجبة الإفطار',
    dosageForm: 'كبسولات نباتية صغيرة',
    commonDoses: ['400 إلى 1000 ميكروجرام يومياً'],
    clinicalNotes: 'يمتص فوراً دون حاجة لإنزيم MTHFR (الذي يعاني 40% من البشر من طفرة في كفاءته)، يخفض مستويات الهوموسيستين الضارة بالشرايين، يدعم صحة بطانة الرحم وإنتاج النواقل العصبية (الدوبامين والسيروتونين).',
    searchTokens: ['ميثيل فولات', 'methylfolate', 'quatrefolic', '5 mthf', 'طفرة mthfr', 'هوموسيستين', 'فولات نشط']
  },
  {
    id: 'keto_electrolytes_hydration',
    tradeName: 'إلكترولايتس وأملاح الترطيب للكيتو والرياضة (Electrolytes Hydration Powder)',
    tradeNameEn: 'Zero-Sugar Electrolytes Hydration Complex (Sodium, Potassium Citrate 1000mg, Magnesium Malate 120mg)',
    scientificName: 'مزيج أيونات المعادن الأساسية النقية بدون سكر (سترات البوتاسيوم + ملح الهيمالايا البحري + مالات المغنيسيوم)',
    category: 'supplements',
    categoryAr: 'علاج إنفلونزا الكيتو والصداع والإجهاد والشد العضلي في حميات قلة النشويات والصيام',
    categoryIcon: '💊',
    defaultTiming: 'مكيال يذاب في 500-750 مل ماء ويشرب تدريجياً طوال النهار أو أثناء التمرين',
    dosageForm: 'مسحوق فوار بنكهات الليمون والبرتقال خالي من السعرات والسكر',
    commonDoses: ['مكيال إلى مكيالين يومياً في الماء'],
    clinicalNotes: 'عند خفض الكربوهيدرات تفرز الكلى كميات كبيرة من الصوديوم والماء، مما يسبب الصداع والهبوط وخفقان القلب وضعف التركيز (Keto Flu)، وتناول هذا المزيج يعيد توازن السوائل الخلوية فورياً.',
    searchTokens: ['الكترولايتس', 'electrolytes', 'املاح كيتو', 'كيتو فلو', 'صداع دايت', 'ترطيب كيتو', 'بوتاسيوم وصوديوم']
  },
  {
    id: 'zinc_picolinate_50',
    tradeName: 'زنك بيكولينات عالي الامتصاص (Zinc Picolinate 50mg)',
    tradeNameEn: 'Zinc Picolinate 50mg Superior Bioavailability Capsules',
    scientificName: 'زنك بيكولينات نقي عالي التوافر الحيوي (Zinc Picolinate)',
    category: 'supplements',
    categoryAr: 'الصورة الأعلى امتصاصاً للزنك لرفع التستوستيرون، صحة البروستاتا، والمناعة والجلد',
    categoryIcon: '💊',
    defaultTiming: 'كبسولة واحدة بعد وجبة الغداء بساعة مع كوب ماء (تجنب تناوله على معدة فارغة)',
    dosageForm: 'كبسولات نباتية',
    commonDoses: ['30 إلى 50 مجم يومياً بعد وجبة دسمة'],
    clinicalNotes: 'حمض البيكولينيك يعمل كمخلب طبيعي يمرر الزنك بسهولة فائقة عبر خلايا الأمعاء إلى مجرى الدم، يعزز تحويل هرمون الغدة الدرقية T4 إلى T3 النشط، ويدعم انقسام الخلايا وإنتاج السائل المنوي.',
    searchTokens: ['زنك بيكولينات', 'zinc picolinate', 'زنك 50', 'تستوستيرون زنك', 'غدة درقية زنك', 'مناعة الزنك']
  }
];

