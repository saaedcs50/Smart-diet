import { EgyptianMedication } from './types';

export const GASTRO_INTESTINAL_MEDS: EgyptianMedication[] = [
  // ==========================================
  // PPIs & Antacids (أدوية الحموضة وارتجاع المريء وقرحة المعدة)
  // ==========================================
  {
    id: 'nexium_20_40',
    tradeName: 'نيكسيوم 20 / 40 مجم (Nexium)',
    tradeNameEn: 'Nexium 20mg, 40mg (Esomeprazole Magnesium - AstraZeneca)',
    scientificName: 'إيزوميبرازول ماغنسيوم (Esomeprazole)',
    category: 'gastro',
    categoryAr: 'مثبط مضخة البروتون الأقوى لعلاج ارتجاع المريء وقرحة المعدة',
    categoryIcon: '🫄',
    defaultTiming: 'صباحاً على الريق قبل تناول وجبة الإفطار بـ 30-60 دقيقة مع كوب ماء كامل',
    dosageForm: 'أقراص مغلفة بتقنية MUPS',
    commonDoses: ['20 مجم', '40 مجم مرة يومياً'],
    clinicalNotes: 'يجب تناوله على معدة فارغة قبل الأكل بنصف ساعة لتثبيط مضخات الحمض فور تنشيطها بالطعام. لا تمضغ أو تسحق الحبة، ولكن يمكن إذابتها في قليل من الماء غير الغازي لمن يصعب عليهم البلع.',
    searchTokens: ['نيكسيوم', 'nexium', 'esomeprazole', 'حموضة', 'ارتجاع مريء', 'قرحة', 'حرقان الصدر']
  },
  {
    id: 'controloc_20_40',
    tradeName: 'كونترولوك 20 / 40 مجم (Controloc)',
    tradeNameEn: 'Controloc 20mg, 40mg (Pantoprazole - Takeda)',
    scientificName: 'بانتوبرازول صوديوم (Pantoprazole)',
    category: 'gastro',
    categoryAr: 'علاج الحموضة الأكثر أماناً مع أدوية القلب ومميعات الدم (بلافيكس)',
    categoryIcon: '🫄',
    defaultTiming: 'قبل الإفطار بـ 30 دقيقة على معدة فارغة',
    dosageForm: 'أقراص مغلفة معوياً',
    commonDoses: ['20 مجم', '40 مجم'],
    clinicalNotes: 'أقل مثبطات مضخة البروتون تداخلاً مع إنزيم CYP2C19، مما يجعله الاختيار الأول والأكثر أماناً لمرضى القلب الذين يتناولون عقار بلافيكس (Clopidogrel).',
    searchTokens: ['كونترولوك', 'controloc', 'pantoloc', 'pantoprazole', 'بانتوبرازول', 'حموضة مع بلافيكس']
  },
  {
    id: 'dexilant_30_60',
    tradeName: 'ديكسيلانت 30 / 60 مجم (Dexilant)',
    tradeNameEn: 'Dexilant 30mg, 60mg (Dexlansoprazole Dual Delayed Release)',
    scientificName: 'ديكسلانسوبرازول ثنائي الإفراز الزمني (Dexlansoprazole)',
    category: 'gastro',
    categoryAr: 'مثبط الحموضة الممتد على مرحلتين لتغطية الحرقان الليلي والنهاري',
    categoryIcon: '🫄',
    defaultTiming: 'كبسولة واحدة في أي وقت من اليوم مع أو بدون طعام',
    dosageForm: 'كبسولات ذات إطلاق ثنائي معدل (DDR)',
    commonDoses: ['30 مجم', '60 مجم'],
    clinicalNotes: 'تقنية الإطلاق المزدوج تطلق جرعة أولى فورية وجرعة ثانية بعد 4-5 ساعات داخل الأمعاء، مما يوفر راحة تامة من الحموضة طوال 24 ساعة دون التقيد بوقت الأكل.',
    searchTokens: ['ديكسيلانت', 'dexilant', 'dexlansoprazole', 'حموضة 24 ساعة', 'ارتجاع ليلي']
  },
  {
    id: 'gaviscon_advance',
    tradeName: 'جافيسكون أدفانس (Gaviscon Advance)',
    tradeNameEn: 'Gaviscon Advance Liquid / Tablets (Sodium Alginate + Potassium Bicarbonate)',
    scientificName: 'ألجينات الصوديوم النقية + بيكربونات البوتاسيوم (Raft Former)',
    category: 'gastro',
    categoryAr: 'الحاجز الرغوي الميكانيكي الفوري لمنع ارتداد الحمض للمريء',
    categoryIcon: '🫄',
    defaultTiming: 'بعد الوجبات الرئيسية بـ 15-30 دقيقة وعند النوم مباشرة (10 مل شراب أو قرصين للمضغ الجيد)',
    dosageForm: 'معلق فموي كثيف بنكهة النعناع / أقراص مضغ',
    commonDoses: ['5-10 مل بعد الأكل وقبل النوم'],
    clinicalNotes: 'يتفاعل مع حمض المعدة ليكون طبقة هلامية طافية كالسد فوق السائل المعدي تمنع صعود الحمض للمريء والحنجرة تماماً. آمن 100% للحوامل.',
    searchTokens: ['جافيسكون', 'gaviscon', 'حرقان فوري', 'حموضة الحامل', 'طافي', 'ارتجاع حنجري']
  },

  // ==========================================
  // IBS & Gut Antispasmodics (القولون العصبي والتقلصات)
  // ==========================================
  {
    id: 'duspatalin_retard_200',
    tradeName: 'ديسباتالين ريتارد 200 مجم (Duspatalin Retard)',
    tradeNameEn: 'Duspatalin Retard 200mg (Mebeverine HCl - Viatris)',
    scientificName: 'ميبيفيرين هيدروكلوريد ممتد المفعول (Mebeverine Retard)',
    category: 'gastro',
    categoryAr: 'مضاد تقلصات القولون المتخصص المباشر بدون أثر على العين أو الفم',
    categoryIcon: '🫄',
    defaultTiming: 'كبسولة صباحاً ومساءً قبل الأكل بـ 20 دقيقة مع كوب ماء كامل',
    dosageForm: 'كبسولات ممتدة المفعول',
    commonDoses: ['135 مجم أقراص 3 مرات', '200 مجم Retard كبسولة مرتين يومياً'],
    clinicalNotes: 'يرخي العضلات الملساء لجدار القولون مباشرة دون التأثير على حركة الأمعاء الطبيعية ودون التسبب في جفاف الحلق أو زغللة العين.',
    searchTokens: ['ديسباتالين', 'duspatalin', 'mebeverine', 'قولون عصبي', 'مغص قولون', 'ريتارد']
  },
  {
    id: 'colona_tabs',
    tradeName: 'كولونا أقراص للقولون (Colona)',
    tradeNameEn: 'Colona (Mebeverine 100mg + Sulpiride 25mg - Rameda)',
    scientificName: 'ميبيفيرين 100 مجم + سولبيريد 25 مجم مهدئ لتوتر القولون',
    category: 'gastro',
    categoryAr: 'علاج متلازمة القولون العصبي المصحوب بالتوتر والقلق والانتفاخ',
    categoryIcon: '🫄',
    defaultTiming: 'قرص قبل الوجبات بـ 20 دقيقة (2-3 مرات يومياً)',
    dosageForm: 'أقراص مغلفة وردية',
    commonDoses: ['قرص 2-3 مرات يومياً قبل الأكل'],
    clinicalNotes: 'يجمع بين بسط تقلصات الأمعاء وتهدئة الإشارات العصبية المركزية المنعكسة على القولون، فعال جداً في حالات القولون التوتري.',
    searchTokens: ['كولونا', 'colona', 'mebeverine sulpiride', 'قولون توتري', 'غازات وتوتر']
  },
  {
    id: 'coloverin_d_a',
    tradeName: 'كولوفيرين دي / إيه (Coloverin D / A)',
    tradeNameEn: 'Coloverin D (Mebeverine + Dimethicone) / Coloverin A',
    scientificName: 'ميبيفيرين + ديميثيكون طارد للغازات (أو كلورديازيبوكسيد)',
    category: 'gastro',
    categoryAr: 'مضاد تقلصات القولون وطارد للغازات والانتفاخات الشديدة',
    categoryIcon: '🫄',
    defaultTiming: 'قرص قبل الوجبات بـ 20 دقيقة 3 مرات يومياً',
    dosageForm: 'أقراص',
    commonDoses: ['قرص 3 مرات يومياً قبل الأكل'],
    clinicalNotes: 'كولوفيرين دي يزيل تشنجات البطن ويفتت فقاعات الغازات المحبوسة في تجويف الأمعاء لراحة فورية من الانتفاخ.',
    searchTokens: ['كولوفيرين', 'coloverin', 'كولوفيرين دي', 'انتفاخ وغازات', 'طارد غازات']
  },

  // ==========================================
  // Digestive Enzymes & Gas Relief (الإنزيمات الهاضمة وطرد الغازات)
  // ==========================================
  {
    id: 'spasmo_digestin_digestin',
    tradeName: 'سبازمو دايجستين / دايجستين (Spasmo-Digestin / Digestin)',
    tradeNameEn: 'Spasmo-Digestin (Papain + Sanzyme + Pancreatin + Dehydrocholic Acid + Simethicone)',
    scientificName: 'إنزيمات هاضمة للبروتين والدهون والنشويات + مضاد للتقلصات وطارد للغازات',
    category: 'gastro',
    categoryAr: 'الإنزيمات الهاضمة الشاملة لعلاج عسر الهضم والتخمة والانتفاخ بعد الوجبات',
    categoryIcon: '🫄',
    defaultTiming: 'وسط الوجبة أو مع أول لقمة من الطعام مباشرة',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['قرص إلى قرصين وسط الوجبات الدسمة'],
    clinicalNotes: 'يحتوي على إنزيمات البابين والبنكرياتين التي تكسر البروتينات المعقدة والدهون والنشويات، ممتاز جداً لمن يعانون من عسر هضم أو خضعوا لعمليات استئصال المرارة وجراحات السمنة.',
    searchTokens: ['سبازمو دايجستين', 'دايجستين', 'spasmo digestin', 'digestin', 'انزيمات هاضمة', 'عسر هضم', 'تخمة']
  },
  {
    id: 'disflatyl_chewable',
    tradeName: 'ديسفلاتيل أقراص للمضغ (Disflatyl 40mg)',
    tradeNameEn: 'Disflatyl 40mg Chewable Tablets (Simethicone)',
    scientificName: 'سيميثيكون نقي 40 مجم (Simethicone)',
    category: 'gastro',
    categoryAr: 'أقراص مضغ سريعة المفعول لتفتيت غازات البطن والتطبل',
    categoryIcon: '🫄',
    defaultTiming: 'يمضغ قرص إلى قرصين جيداً بالفم بعد الوجبات وعند النوم',
    dosageForm: 'أقراص للمضغ بنكهة النعناع',
    commonDoses: ['1-2 قرص للمضغ بعد الأكل'],
    clinicalNotes: 'يقلل التوتر السطحي لفقاعات الغازات داخل الأمعاء فتندمج معاً ويتم طردها بسهولة دون أي امتصاص للدواء إلى الدم.',
    searchTokens: ['ديسفلاتيل', 'disflatyl', 'simethicone', 'سيميثيكون', 'مضغ غازات', 'انتفاخ البطن']
  },

  // ==========================================
  // Probiotics & Gut Flora (البروبيوتيك وبكتيريا الأمعاء النافعة)
  // ==========================================
  {
    id: 'lacteol_fort',
    tradeName: 'لاكتيول فورت (Lacteol Fort)',
    tradeNameEn: 'Lacteol Fort Sachets / Capsules (Lactobacillus LB 10 Billion Postbiotics)',
    scientificName: 'مستنبت بكتيريا لاكتوباسيلوس إل بي المعالجة حرارياً 10 مليارات (Lactobacillus LB)',
    category: 'gastro',
    categoryAr: 'ترميم ميكروبيوم الأمعاء، إيقاف الإسهال، وعلاج متلازمة تسرب الأمعاء والقولون',
    categoryIcon: '🫄',
    defaultTiming: 'كيس أو كبسولة مرتين يومياً مذابة في قليل من الماء مع أو بعد الأكل',
    dosageForm: 'أكياس بودرة بنكهة لطيفة / كبسولات',
    commonDoses: ['1-2 كيس يومياً مع بداية الأعراض'],
    clinicalNotes: 'يعيد بناء الغشاء المخاطي المعوي ويطرد البكتيريا الممرضة، رائع بعد كورسات المضادات الحيوية ولعلاج اضطرابات القولون والإسهال المفاجئ.',
    searchTokens: ['لاكتيول فورت', 'lacteol fort', 'بروبيوتيك', 'بكتيريا نافعة', 'اسهال', 'ميكروبيوم']
  },

  // ==========================================
  // Bowel Regularity & Safe Laxatives (تنظيم الإخراج وعلاج الإمساك في الدايت)
  // ==========================================
  {
    id: 'agiolax_granules',
    tradeName: 'أجيولاكس حبيبات (Agiolax)',
    tradeNameEn: 'Agiolax Granules (Plantago Ovata / Psyllium + Senna Pods - Madaus)',
    scientificName: 'حبيبات بذور وألياف السيليوم (Psyllium Husk) + ثمار السنا الطبيعية',
    category: 'gastro',
    categoryAr: 'الملين العشبي الطبيعي المزدوج الأكثر أماناً لإمساك الحميات الغذائية',
    categoryIcon: '🫄',
    defaultTiming: 'ملعقة صغيرة تبلع دون مضغ مساءً بعد العشاء مع شرب كوبين ماء كبيرين على الأقل',
    dosageForm: 'حبيبات مغلفة صغيرة تؤخذ بالملعقة',
    commonDoses: ['ملعقة شاي مساءً (ويمكن ملعقة صباحاً عند اللزوم)'],
    clinicalNotes: 'تجمع ألياف السيليوم لزيادة حجم وليونة البراز مع تحفيز خفيف من السنا الطبيعية. شرط أساسي: شرب كمية وفيرة من الماء لتعمل الألياف بكفاءة.',
    searchTokens: ['اجيولاكس', 'أجيولاكس', 'agiolax', 'ملين دايت', 'الياف سيليوم', 'امساك الرجيم']
  },
  {
    id: 'movicol_forlax_peg',
    tradeName: 'موفيكول / فورلاكس (Movicol / Forlax)',
    tradeNameEn: 'Forlax 10g / Movicol Sachets (Macrogol 4000 / Polyethylene Glycol - PEG)',
    scientificName: 'ماكروجول 4000 أوسموتي نقي (Macrogol 4000 / PEG)',
    category: 'gastro',
    categoryAr: 'الملين الأسموزي الذهبي الآمن للاستخدام المزمن دون تعود أو كسل للأمعاء',
    categoryIcon: '🫄',
    defaultTiming: 'يذاب الكيس في كوب ماء كامل ويشرب صباحاً مع وجبة الإفطار',
    dosageForm: 'أكياس بودرة قابلة للذوبان التام',
    commonDoses: ['1-2 كيس يومياً صباحاً'],
    clinicalNotes: 'يحمل جزيئات الماء معه إلى داخل القولون لترطيب وتليين البراز بصورة فسيولوجية تماماً دون امتصاص في الدم ودون أي مغص، آمن تماماً لمرضى السكري والقلب والمسنين وكبار السن.',
    searchTokens: ['موفيكول', 'فورلاكس', 'movicol', 'forlax', 'macrogol', 'ملين بدون مغص', 'امساك مزمن']
  },
  {
    id: 'duphalac_syrup',
    tradeName: 'دوفالاك شراب (Duphalac)',
    tradeNameEn: 'Duphalac Syrup (Lactulose 66.7g/100ml - Abbott)',
    scientificName: 'لاكتولوز نقي (Lactulose)',
    category: 'gastro',
    categoryAr: 'ملين أسموزي ومغذي للبكتيريا النافعة (Prebiotic) وخافض للأمونيا',
    categoryIcon: '🫄',
    defaultTiming: '15-30 مل يومياً بعد الإفطار مع كوب ماء',
    dosageForm: 'شراب سكري لزج لطيف المذاق',
    commonDoses: ['15 إلى 30 مل يومياً'],
    clinicalNotes: 'سكر غير قابل للامتصاص تخمره بكتيريا القولون فيلين الفضلات ويحفز نمو البكتيريا المفيدة ويمنع امتصاص الأمونيا لمرضى الكبد.',
    searchTokens: ['دوفالاك', 'duphalac', 'lactulose', 'لاكتولوز', 'امساك حوامل', 'ملين كبد']
  },

  // ==========================================
  // Gastric Motility & Anti-Nausea (تنظيم حركة المعدة وعلاج الغثيان)
  // ==========================================
  {
    id: 'motilium_gastromotil_10',
    tradeName: 'موتيليوم / جاستروموتيل (Motilium / Gastromotil)',
    tradeNameEn: 'Motilium 10mg Tablets / Suspension (Domperidone - Janssen)',
    scientificName: 'دومبيريدون نقي 10 مجم (Domperidone)',
    category: 'gastro',
    categoryAr: 'محفز تفريغ المعدة ومضاد الغثيان والامتلاء بعد الأكل',
    categoryIcon: '🫄',
    defaultTiming: 'قرص واحد قبل الوجبات بـ 15-30 دقيقة (حتى 3 مرات يومياً عند اللزوم)',
    dosageForm: 'أقراص مغلفة / معلق شراب',
    commonDoses: ['10 مجم قبل الأكل بنصف ساعة'],
    clinicalNotes: 'يسرع حركة تفريغ الطعام من المعدة نحو الأمعاء ويغلق فتحة الفؤاد العلوية، فيقضي على الشعور بالغثيان والثقل بعد الطعام ويمنع الارتجاع.',
    searchTokens: ['موتيليوم', 'motilium', 'جاستروموتيل', 'gastromotil', 'domperidone', 'ترجيع', 'غثيان', 'تفريغ معدة']
  },
  {
    id: 'ganaton_itopride_50',
    tradeName: 'جاناتون 50 مجم (Ganaton / Itopride)',
    tradeNameEn: 'Ganaton 50mg (Itopride Hydrochloride - Abbott)',
    scientificName: 'إيتوبرايد هيدروكلوريد (Itopride HCl 50mg)',
    category: 'gastro',
    categoryAr: 'المنظم الحركي المعوي الحديث لعلاج عسر الهضم الوظيفي والانتفاخ المستمر',
    categoryIcon: '🫄',
    defaultTiming: 'قرص واحد قبل الوجبات بـ 15-20 دقيقة 3 مرات يومياً',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['50 مجم 3 مرات يومياً قبل الأكل'],
    clinicalNotes: 'يزيد إفراز الأستيل كولين الطبيعي في عضلات الجهاز الهضمي، ممتاز لمرضى خمول المعدة وتأخر الهضم وحرقة الفؤاد دون أي تداخل مع ضربات القلب.',
    searchTokens: ['جاناتون', 'ganaton', 'itopride', 'ايتوبرايد', 'عسر هضم وظيفي', 'حركة معدة']
  },

  // ==========================================
  // Gut Antiseptics & Anti-Diarrheal (المطهرات المعوية وعلاج النزلات المعوية)
  // ==========================================
  {
    id: 'antinal_200_caps',
    tradeName: 'أنتينال 200 مجم (Antinal)',
    tradeNameEn: 'Antinal 200mg Capsules / Suspension (Nifuroxazide - Amoun)',
    scientificName: 'نيفوروكسازيد 200 مجم مطهر معوي واسع المدى (Nifuroxazide)',
    category: 'gastro',
    categoryAr: 'المطهر المعوي الأشهر في مصر لعلاج النزلات المعوية والإسهال البكتيري',
    categoryIcon: '🫄',
    defaultTiming: 'كبسولة واحدة كل 6-8 ساعات (3-4 مرات يومياً) بعد الأكل لمدة 3-5 أيام',
    dosageForm: 'كبسولات صفراء / معلق شراب للأطفال',
    commonDoses: ['كبسولة 4 مرات يومياً للبالغين'],
    clinicalNotes: 'يعمل داخل تجويف الأمعاء فقط دون أن يُمتص إلى الدم، يطرد البكتيريا الممرضة دون القضاء على البكتيريا المعوية النافعة، آمن وفعال جداً.',
    searchTokens: ['انتينال', 'أنتينال', 'antinal', 'nifuroxazide', 'مطهر معوي', 'اسهال', 'نزلة معوية']
  },
  {
    id: 'flagyl_amrizole_500',
    tradeName: 'فلاجيل / أمريزول 500 مجم (Flagyl / Amrizole)',
    tradeNameEn: 'Flagyl 500mg Tablets / Suspension (Metronidazole - Sanofi) / Amrizole',
    scientificName: 'ميترونيدازول 500 مجم (Metronidazole)',
    category: 'gastro',
    categoryAr: 'مطهر معوي وقاتل للطفيليات والأميبا والجيارديا والبكتيريا اللاهوائية',
    categoryIcon: '🫄',
    defaultTiming: 'قرص واحد وسط أو بعد الوجبات 3 مرات يومياً مع كوب ماء كامل',
    dosageForm: 'أقراص مغلفة / شراب',
    commonDoses: ['500 مجم 3 مرات يومياً لمدة 7-10 أيام'],
    clinicalNotes: 'العلاج الأساسي للدوسنتاريا الأميبية ورائحة الفم الكريهة والتهابات اللثة. يمنع تناول أي مشروبات كحولية معه لمنع تفاعل Disulfiram-like الشديد.',
    searchTokens: ['فلاجيل', 'flagyl', 'امريزول', 'amrizole', 'metronidazole', 'اميبي', 'جيارديا', 'طفيليات']
  },

  // ==========================================
  // Psychosomatic IBS & Severe Spasms (القولون النفسي والتقلصات المعوية الحادة)
  // ==========================================
  {
    id: 'librax_green_tabs',
    tradeName: 'ليبراكس أقراص خضراء (Librax)',
    tradeNameEn: 'Librax (Clidinium Bromide 2.5mg + Chlordiazepoxide 5mg - Meda / Viatris)',
    scientificName: 'كليدينيوم بروميد مضاد إفراز وتقلص + كلورديازيبوكسيد مهدئ للتوتر العصبي',
    category: 'gastro',
    categoryAr: 'العلاج الكلاسيكي الأشهر لقرحة المعدة والقولون العصبي المرتبط بالقلق والتوتر',
    categoryIcon: '🫄',
    defaultTiming: 'قرص واحد قبل الوجبات بـ 30 دقيقة 3-4 مرات يومياً وقبل النوم',
    dosageForm: 'أقراص مغلفة خضراء',
    commonDoses: ['1-2 قرص قبل الأكل وعند النوم'],
    clinicalNotes: 'يقطع الإشارات العصبية المسببة لفرط إفراز أحماض المعدة وتقلصات القولون الناتجة عن الضغط النفسي والعصبي.',
    searchTokens: ['ليبراكس', 'librax', 'قولون نفسي', 'قرحة توتر', 'مهدئ قولون']
  },
  {
    id: 'visceralgine_buscopan_plus',
    tradeName: 'فيسيرالجين / بوسكوبان بلس (Visceralgine / Buscopan Plus)',
    tradeNameEn: 'Visceralgine (Tiemonium Methylsulfate 50mg) / Buscopan Plus (Hyoscine + Paracetamol)',
    scientificName: 'تيمونيوم ميثيل سلفات / هيوسين بيوتيل بروميد + باراسيتامول',
    category: 'gastro',
    categoryAr: 'مضاد التقلصات السريع للمغص الكلوي والمعوي والمراري وتقلصات الدورة',
    categoryIcon: '🫄',
    defaultTiming: 'قرص عند اللزوم بعد الأكل أو مع قليل من الماء (حتى 3 مرات يومياً)',
    dosageForm: 'أقراص مغلفة / أمبولات حقن عضلية ووريدية / شراب',
    commonDoses: ['1-2 قرص عند اشتداد المغص والتقلص'],
    clinicalNotes: 'يرخي العضلات الملساء المتقلصة في الجهاز الهضمي والمسالك والرحم بسرعة وأمان عالي دون هبوط بالضغط.',
    searchTokens: ['فيسيرالجين', 'visceralgine', 'بوسكوبان', 'buscopan', 'مغص بطن', 'تقلصات معوية']
  },
  {
    id: 'rowachol_caps',
    tradeName: 'رواكول كبسول للمرارة (Rowachol)',
    tradeNameEn: 'Rowachol Capsules (Menthol, Menthone, Pinene, Borneol, Cineol - Rowa)',
    scientificName: 'زيوت تربينية عطرية طبيعية منشطة لإفراز وتسييل العصارة الصفراوية',
    category: 'gastro',
    categoryAr: 'مذيب وواقي من حصوات المرارة ومنشط طبيعي لوظائف الكبد والمرارة',
    categoryIcon: '🫄',
    defaultTiming: 'كبسولة إلى كبسولتين قبل الوجبات بـ 30 دقيقة 3 مرات يومياً مع ماء وفير',
    dosageForm: 'كبسولات جيلاتينية كروية خضراء',
    commonDoses: ['1-2 كبسولة 3 مرات يومياً قبل الأكل'],
    clinicalNotes: 'يزيد إنتاج العصارة الصفراوية ويقلل تشبع الكوليسترول فيها فيمنع تكلس وركود المرارة ويحسن هضم الدهون الدسمة.',
    searchTokens: ['رواكول', 'rowachol', 'مرارة', 'تسييل العصارة', 'هضم دهون']
  }
];
