import { EgyptianMedication } from './types';

export const MORE_SUPPLEMENTS_AND_MEDS: EgyptianMedication[] = [
  // =========================================================================
  // 1. Cardiovascular, Vascular & Endothelial Health (الشرايين، الأوعية الدموية، والدورة الدموية)
  // =========================================================================
  {
    id: 'nattokinase_2000_fu',
    tradeName: 'ناتوكينيز مذيب التجلط والمخثرات (Nattokinase 2000 FU - Doctor\'s Best / NOW Foods)',
    tradeNameEn: 'Nattokinase 2000 FU Systemic Fibrinolytic Enzyme (Derived from Fermented Natto)',
    scientificName: 'إنزيم الناتوكينيز الفايبرينوليتي المعياري 2000 وحدة تفكيك فايبرين (Nattokinase)',
    category: 'supplements',
    categoryAr: 'الإنزيم الطبيعي لإذابة الفايبرين وتخفيف لزوجة الدم وحماية الشرايين من الجلطات',
    categoryIcon: '🫀',
    defaultTiming: 'كبسولة واحدة (2000 FU) صباحاً أو قبل النوم على معدة فارغة مع كوب ماء',
    dosageForm: 'كبسولات معوية نباتية',
    commonDoses: ['2000 إلى 4000 FU يومياً على معدة فارغة'],
    clinicalNotes: 'يفكك شبكات الفايبرين المسببة للتجلط وتصلب الشرايين، يحسن مرونة جدران الأوعية الدموية، ويساعد في تخفيض ضغط الدم الانقباضي والانبساطي بشكل آمن وموثق إكلينيكياً.',
    searchTokens: ['ناتوكينيز', 'nattokinase', 'اذابة الجلطات', 'لزوجة الدم', 'فايبرين', 'ضغط الدم الشرياني']
  },
  {
    id: 'serrapeptase_120k_spu',
    tradeName: 'سيرا بيبتيز الإنزيم المضاد للتورم والندبات (Serrapeptase 120,000 SPU - Doctor\'s Best / Solaray)',
    tradeNameEn: 'High Potency Serrapeptase 120,000 SPU Enteric Coated Systemic Proteolytic Enzyme',
    scientificName: 'إنزيم السيرا بيبتيز البروتينوليتي المقاوم للأحماض المعوية (Serratiopeptidase)',
    category: 'supplements',
    categoryAr: 'تفكيك الأنسجة الندبية، الالتصاقات، التورمات، والتهابات الجيوب الأنفية والمفاصل',
    categoryIcon: '🩹',
    defaultTiming: 'كبسولة واحدة يومياً على معدة فارغة تماماً (قبل الأكل بساعة أو بعد الأكل بساعتين)',
    dosageForm: 'كبسولات مغلفة معوياً (Enteric Coated)',
    commonDoses: ['40,000 إلى 120,000 SPU يومياً على معدة فارغة'],
    clinicalNotes: 'يهضم البروتينات غير الحية كالأنسجة التالفة والندبات والثرات الالتهابي في الجيوب الأنفية دون المساس بالأنسجة الحية، مما يسرع التئام الجروح والعمليات الجراحية وتقليل الورم.',
    searchTokens: ['سيرا بيبتيز', 'serrapeptase', 'تورمات وتكتلات', 'انسداد الجيوب الأنفية', 'التصاقات', 'ندبات']
  },
  {
    id: 'grape_seed_extract_300',
    tradeName: 'مستخلص بذور العنب لدوالي الساقين (Grape Seed Extract 300mg 95% OPC - NOW / Healthy Origins)',
    tradeNameEn: 'Grape Seed Extract 300mg Standardized to 95% Polyphenols / Oligomeric Proanthocyanidins',
    scientificName: 'مستخلص بذور العنب المعياري بمركبات المونو-بروانثوسيانيدين 95% (OPCs)',
    category: 'supplements',
    categoryAr: 'تقوية جدران الشعيرات الدموية، علاج دوالي الساقين، ثقل الأوردة، والانتفاخات',
    categoryIcon: '🩸',
    defaultTiming: 'كبسولة واحدة يومياً بعد وجبة الإفطار أو الغداء مع ماء',
    dosageForm: 'كبسولات نباتية',
    commonDoses: ['100 إلى 300 مجم يومياً'],
    clinicalNotes: 'يرتبط بألياف الكولاجين والإيلاستين في جدران الأوردة والشعيرات الدموية فيقويها ويقلل نفاذيتها، مما يقضي على تورم وآلام وثقل الساقين الناتج عن القصور الوريدي المزمن (CVI).',
    searchTokens: ['بذور العنب', 'grape seed', 'دوالي الساقين', 'قصور وريدي', 'شعيرات دموية', 'تورم القدمين']
  },
  {
    id: 'pycnogenol_pine_bark_100',
    tradeName: 'بيكنوجينول فرنسا الأصلي (Pycnogenol 100mg French Maritime Pine Bark - Horphag / Life Extension)',
    tradeNameEn: 'Pycnogenol French Maritime Pine Bark Extract 100mg Patented Formula',
    scientificName: 'مستخلص لحاء الصنوبر البحري الفرنسي براءة اختراع بيكنوجينول (Pycnogenol)',
    category: 'supplements',
    categoryAr: 'محفز أكسيد النيتريك الوعائي، نضارة البشرة، تحسين تدفق الدم للأطراف والعمليات الذكورية',
    categoryIcon: '🫀',
    defaultTiming: 'كبسولة واحدة (100 مجم) صباحاً بعد الإفطار',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['50 إلى 100 مجم يومياً'],
    clinicalNotes: 'ينشط إنزيم eNOS لإفرز أكسيد النيتريك في جدران الشرايين بنسبة عالية، مما يعزز مرونة الشرايين وتدفق الدم الحيوي للمخ والأطراف والأجهزة التناسلية ويخفف تصبغ الأوردة.',
    searchTokens: ['بيكنوجينول', 'pycnogenol', 'لحاء الصنوبر', 'تدفق الدم', 'توسيع الشرايين', 'مرونة الأوعية']
  },
  {
    id: 'citrus_bergamot_500',
    tradeName: 'ستروس بيرجاموت لخفض الكوليسترول والدهون (Citrus Bergamot 500mg - Double Wood / Jarrow)',
    tradeNameEn: 'Citrus Bergamot Fruit Extract 500mg Standardized to 38% Polyphenolic Flavonoids',
    scientificName: 'مستخلص ثمار البيرجاموت الإيطالية المعياري بالبوليفينول (Brutieridin & Melitidin)',
    category: 'supplements',
    categoryAr: 'الستاتين الطبيعي لخفض الدهون الثلاثية، الكوليسترول الضار LDL، ورفع الكوليسترول النافع HDL',
    categoryIcon: '🧪',
    defaultTiming: 'كبسولة إلى كبسولتين يومياً قبل وجبتي الغداء والعشاء بـ 20 دقيقة',
    dosageForm: 'كبسولات نباتية',
    commonDoses: ['500 إلى 1000 مجم يومياً'],
    clinicalNotes: 'تحتوي على مركبات الفلافونويد النادرة التي تثبط إنزيم HMG-CoA Reductase في الكبد بنفس آلية أقراص الستاتين ولكن بدون آلام العضلات، مع خفض سكر الدم ودهون الكبد.',
    searchTokens: ['بيرجاموت', 'citrus bergamot', 'كوليسترول طبيعي', 'دهون ثلاثية', 'ستاتين طبيعي']
  },

  // =========================================================================
  // 2. Immune, Respiratory & Antiviral Defense (المناعة، الجهاز التنفسي، ومكافحة الفيروسات)
  // =========================================================================
  {
    id: 'elderberry_sambucus_black_1000',
    tradeName: 'البلسان الأسود سامبوكوس (Sambucus Black Elderberry 1000mg - Nature\'s Way / NOW)',
    tradeNameEn: 'European Black Elderberry Fruit Extract 1000mg Standardized Bioactives',
    scientificName: 'مستخلص ثمار البلسان الأسود الأوروبي العضوي (Sambucus nigra)',
    category: 'supplements',
    categoryAr: 'الحماية الفائقة وتقصير مدة نزلات البرد والإنفلونزا وتقوية مناعة الجهاز التنفسي',
    categoryIcon: '🫐',
    defaultTiming: 'كبسولة يومياً للوقاية، أو كبسولة 3 مرات يومياً عند بداية نزلات البرد',
    dosageForm: 'كبسولات / شراب / علوك جيلاتينية (Gummies)',
    commonDoses: ['500 إلى 1000 مجم يومياً عند الشعور بالبرد'],
    clinicalNotes: 'تلتصق مركبات الأنثوسيانين في البلسان الأسود بالشوائك البروتينية للفيروسات التنفسية فتمنع اختراقها لخلايا المجرى التنفسي وتخفض فترة الأعراض بمقدار 4 أيام.',
    searchTokens: ['بلسان اسود', 'elderberry', 'sambucus', 'سامبوكوس', 'مناعة برد', 'انفلونزا']
  },
  {
    id: 'black_seed_oil_thymoquinone',
    tradeName: 'زيت حبة البركة العضوي المعياري بالثيموكينون (Black Seed Oil 35% Thymoquinone - Amazing Herbs / Sports Research)',
    tradeNameEn: 'Cold-Pressed Organic Black Cumin Seed Oil (Nigella Sativa) 2%-3% Thymoquinone',
    scientificName: 'زيت بذور حبة البركة السوداء المعصور على البارد غني بالثيموكينون (Nigella Sativa)',
    category: 'supplements',
    categoryAr: 'مضاد التهابات الصدر والربو، تحسين حساسية الأنسولين، وتقوية كرات الدم البيضاء',
    categoryIcon: '🌱',
    defaultTiming: 'كبسولتان يومياً بعد الإفطار مع كوب ماء أو ملعقة صغيرة من الزيت',
    dosageForm: 'كبسولات رخوة جيلاتينية / زيت خام في زجاجة داكنة',
    commonDoses: ['1000 إلى 2000 مجم يومياً مع الطعام'],
    clinicalNotes: 'مركب الثيموكينون (Thymoquinone) موسع للشعيبات الهوائية ومضاد أكسدة قوي يثبط إنزيمات 5-LOX والإنترلوكين الالتهابي، مما يهدئ أزمات الربو وحساسية الصدر والمفاصل.',
    searchTokens: ['حبة البركة', 'black seed oil', 'ثيموكينون', 'thymoquinone', 'حبة سوداء', 'مناعة حساسية صدر']
  },
  {
    id: 'monolaurin_lauricidin_500',
    tradeName: 'مونولورين مستخلص حمض اللوريك (Monolaurin / Lauricidin 500mg - Ecological Formulas / Nature\'s Life)',
    tradeNameEn: 'Pure Monolaurin 500mg Glycerol Monolaurate (Derived from Organic Coconut Oil)',
    scientificName: 'جليسيرول مونولورات النقي الناتجة من حمض اللوريك في زيت جوز الهند (Monolaurin)',
    category: 'supplements',
    categoryAr: 'تدمير الغلاف الدهون لبعض الفيروسات والبكتيريا القشرية وعلاج الفطريات المزمنة',
    categoryIcon: '🥥',
    defaultTiming: 'كبسولة واحدة مرتين إلى 3 مرات يومياً مع الوجبات',
    dosageForm: 'كبسولات نباتية / حبيبات صغيرة',
    commonDoses: ['500 إلى 1500 مجم يومياً'],
    clinicalNotes: 'يذيب الغلاف الجليسريدي الدهني الواقي للفيروسات والبكتيريا الضارة دون الإضرار بالبكتيريا النافعة في الأمعاء، ممتاز لعلاج نزلات الفطريات وحبوب الجلد المزمنة.',
    searchTokens: ['مونولورين', 'monolaurin', 'lauricidin', 'لوريكيدين', 'مضاد فيروسات زيت جوز الهند', 'فطريات']
  },

  // =========================================================================
  // 3. Vision, Macular Health & Eye Strain Protection (صحة العين، الشبكية، وإجهاد الشاشات)
  // =========================================================================
  {
    id: 'lutein_zeaxanthin_macular',
    tradeName: 'لوتين وزياكسانثين لحماية الشبكية والعين (Lutein 20mg + Zeaxanthin 4mg - Doctor\'s Best / Jarrow)',
    tradeNameEn: 'Lutemax 2020 Lutein 20mg & Zeaxanthin 4mg Macular Carotenoid Complex',
    scientificName: 'مستخلص أزهار الماريجولد العضوي المعياري باللوتين وزياكسانثين (Lutemax 2020)',
    category: 'supplements',
    categoryAr: 'فلترة الضوء الأزرق الضار للشاشات، الوقاية من التحلل البقعي لشبكية العين، وترطيب العين',
    categoryIcon: '👁️',
    defaultTiming: 'كبسولة جيلاتينية واحدة يومياً بعد وجبة الغداء مباشرة مع كوب ماء',
    dosageForm: 'كبسولات رخوة زيتيّة',
    commonDoses: ['20 مجم لوتين + 4 مجم زياكسانثين يومياً'],
    clinicalNotes: 'يتراكمان نوعياً في الصبغة البقعية لشبكية العين (Macula)، حيث يعملان كـ "نظارة شمسية داخلية" تفرز وتصفي موجات الضوء الأزرق عالية الطاقة الصادرة عن الشاشات والـ LED وتمنع إجهاد وضبابية الرؤية.',
    searchTokens: ['لوتين', 'lutein', 'زياكسانثين', 'zeaxanthin', 'شبكية العين', 'ضوء ازرق شاشات', 'جفاف وتعب العين']
  },
  {
    id: 'bilberry_extract_anthocyanins',
    tradeName: 'مستخلص التوت الأزرق للرؤية الليلية (Bilberry Extract 80mg 25% Anthocyanins - NOW / Solgar)',
    tradeNameEn: 'European Bilberry Fruit Extract (Vaccinium myrtillus) 25% Anthocyanosides',
    scientificName: 'مستخلص ثمار التوت الأوروبي المعياري 25% أنثوسيانوسيدات (Bilberry Extract)',
    category: 'supplements',
    categoryAr: 'تحسين الرؤية الليلية وضبط تكيف العين مع الظلام وتقوية الشعيرات الدموية الدقيقة بالشبكية',
    categoryIcon: '👁️',
    defaultTiming: 'كبسولة واحدة مرتين يومياً بعد الوجبات',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['80 إلى 160 مجم يومياً'],
    clinicalNotes: 'يحفز إعادة تخليق بروتين الرودوبسين (Rhodopsin) في الخلايا العصوية بالشبكية المسؤول عن الرؤية في الضوء الخافت، كما يحمي مرضى السكري من اعتلال الشبكية السكري.',
    searchTokens: ['توت ازرق', 'bilberry', 'رؤية ليلية', 'اعتلال الشبكية السكري', 'رودوبسين']
  },

  // =========================================================================
  // 4. Joints, Connective Tissue & Tendon Regeneration (المفاصل، الأوتار، والغضاريف المتقدمة)
  // =========================================================================
  {
    id: 'uc_ii_undenatured_collagen_40',
    tradeName: 'كولاجين النوع الثاني غير المتغير يو سي تو (UC-II Undenatured Type II Collagen 40mg - NOW / InterHealth)',
    tradeNameEn: 'UC-II Undenatured Type II Collagen 40mg with Aquamin Sea Minerals',
    scientificName: 'غضروف دجاج معياري يحتوي على كولاجين النوع الثاني غير المتغير برابطته الثلاثية الأصيلة (UC-II)',
    category: 'supplements',
    categoryAr: 'جرعة حبة واحدة صغيرة يومياً لمنع التآكل المناعي للركبتين وتسكين خشونة المفاصل',
    categoryIcon: '🦴',
    defaultTiming: 'كبسولة واحدة صغيرة (40 مجم) يومياً قبل النوم مباشرة على معدة فارغة مع كوب ماء',
    dosageForm: 'كبسولات صغيرة جداً سهلة البلع',
    commonDoses: ['40 مجم مرة واحدة يومياً قبل النوم'],
    clinicalNotes: 'يعمل بتقنية التحمل المناعي الفموي (Oral Tolerance) عبر صفائح باير في الأمعاء؛ حيث يوقف هجوم خلايا T المناعية على كولاجين المفاصل الأصلي في الركبتين، مما يوقف تآكل الغضاريف بفاعلية تفوق الجلوكوزامين بـ 2.5 مرة.',
    searchTokens: ['يو سي تو', 'uc ii', 'كولاجين النوع الثاني', 'خشونة ركبة مناعية', 'تآكل الغضاريف', 'تخشين المفاصل']
  },
  {
    id: 'boswellia_5loxin_extract',
    tradeName: 'مستخلص اللبان الذكر المنشاري أباكس (Boswellia Serrata / 5-LOXIN 100mg - Life Extension / NOW)',
    tradeNameEn: '5-LOXIN Advanced Boswellia Serrata Extract (30% AKBA Acid)',
    scientificName: 'مستخلص صمغ اللبان الذكر المعياري بـ 30% حمض أستيل-كيتو-بيتا-بوسويليك (AKBA)',
    category: 'supplements',
    categoryAr: 'مضاد التهاب المفاصل والقولون السريع جداً عبر تثبيط إنزيم 5-LOX دون التأثير على المعدة',
    categoryIcon: '🌿',
    defaultTiming: 'كبسولة واحدة يومياً بعد وجبة الغداء مع ماء',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['100 مجم من 5-LOXIN أو 500 مجم من البوسويليا العادية يومياً'],
    clinicalNotes: 'يثبط بفعالية استثنائية إنزيم 5-Lipoxygenase المسؤول عن إنتاج الليوكوترينات المسببة للآلام الحادة وتلف الغضاريف والتهاب القولون التقرحي، ويبدأ مفعول تسكين الألم خلال 7 أيام فقط.',
    searchTokens: ['بوسويليا', 'boswellia', 'لبان ذكر', '5 loxin', 'التهاب مفاصل سريع', 'القولون التقرحي']
  },
  {
    id: 'cissus_quadrangularis_1000',
    tradeName: 'سيسوس كوادرانجولاريس لترميم العظام والأوتار (Cissus Quadrangularis 1000mg - PrimaForce)',
    tradeNameEn: 'Cissus Quadrangularis Extract 1000mg Standardized to 2.5%-5% Ketosteroids',
    scientificName: 'مستخلص نبتة السيسوس الكوادرانجولاريس المعياري بالكيتوستيرويدات العشبية',
    category: 'supplements',
    categoryAr: 'تسريع التئام كسور العظام، علاج التهاب الأوتار والرباط الصليبي، وتقوية المفاصل',
    categoryIcon: '🦴',
    defaultTiming: 'كبسولة واحدة مرتين يومياً قبل الوجبات بـ 30 دقيقة',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['1000 إلى 2000 مجم يومياً'],
    clinicalNotes: 'يحفز نشاط خلايا Osteoblasts البانية للعظام وينشط المكون الهيكلي للأوتار والأربطة، مما يقلل زمن التئام كسور العظام بالنصف ويخفف آلام أوتار الكتف والركبة الرياضية.',
    searchTokens: ['سيسوس', 'cissus', 'التئام الكسور', 'التهاب الأوتار', 'رباط صليبي', 'عظام أوتار']
  },

  // =========================================================================
  // 5. Relaxation, Neurotransmitters & Mood Support (الهدوء، النوم، والنواقل العصبية)
  // =========================================================================
  {
    id: '5_htp_serotonin_100',
    tradeName: 'فايف إتش تي بي لسيروتونين المزاج والشبع (5-HTP 100mg - Natrol / NOW Foods)',
    tradeNameEn: '5-HTP (5-Hydroxytryptophan) 100mg Derived from Griffonia simplicifolia Seeds',
    scientificName: 'مركب 5-هيدروكسي تريبتوفان النقي الطبيعي (5-HTP Extract)',
    category: 'supplements',
    categoryAr: 'سلف هرمون السعادة السيروتونين لعلاج تعكر المزاج، القلق، وشراهة الكربوهيدرات المسائية',
    categoryIcon: '🧠',
    defaultTiming: 'كبسولة واحدة (100 مجم) قبل النوم بساعة أو قبل الوجبة بـ 30 دقيقة لكبح الشهية',
    dosageForm: 'كبسولات نباتية / أقراص ممتدة المفعول',
    commonDoses: ['100 إلى 200 مجم مساءً'],
    clinicalNotes: 'يتحول مباشرة في الدماغ إلى سيروتونين دون الحاجة لخطوة التحكم المحددة للإنزيمات، مما يحسن المزاج ويقطع رغبة الأكل العصبي المسائي وينظم جودة النوم.',
    searchTokens: ['5htp', '5 htp', 'فايف اتش تي بي', 'سيروتونين', 'هرمون السعادة', 'اكل عصبي', 'تحسين المزاج']
  },
  {
    id: 'gaba_500_calm',
    tradeName: 'جامبا لتهدئة العقل والأفكار المتسارعة (GABA 500mg - NOW Foods / Thorne)',
    tradeNameEn: 'GABA (Gamma-Aminobutyric Acid) 500mg Pure Inhibitory Neurotransmitter',
    scientificName: 'حمض جاما-أمينوبوتيريك النقي الحر (GABA)',
    category: 'supplements',
    categoryAr: 'الناقل العصبي التثبيطي الرئيسي لإيقاف الأفكار المتسارعة، الاسترخاء العضلي، والهدوء',
    categoryIcon: '🧠',
    defaultTiming: 'كبسولة واحدة على معدة فارغة مع كوب ماء عند الشعور بالتوتر أو قبل النوم بساعة',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['500 إلى 1000 مجم عند اللزوم أو قبل النوم'],
    clinicalNotes: 'يرتبط بمستقبلات GABA-A في الجهاز العصبي المركزي، فيقلل الإثارة الزائدة في الخلايا العصبية ويجلب الهدوء الجسدي والعقلي الشامل دون إحداث خمول في النهار.',
    searchTokens: ['جاما', 'gaba', 'جابا', 'تهدئة الافكار', 'استرخاء عصبي', 'توتر وقلق']
  },
  {
    id: 'valerian_root_sleep_500',
    tradeName: 'جذور الناردين / الفاليريان للنوم الطبيعي (Valerian Root 500mg - Nature\'s Way / NOW)',
    tradeNameEn: 'Valerian Root Extract Standardized to 0.8% Valerenic Acids (Valeriana officinalis)',
    scientificName: 'مستخلص جذور حشيشة الناردين المعياري بأحماض الفاليرينيك (Valerian Root)',
    category: 'supplements',
    categoryAr: 'المنوم النباتي الطبيعي الكلاسيكي لتسريع الدخول في النوم ومكافحة الأرق المزمن',
    categoryIcon: '🌙',
    defaultTiming: 'كبسولتان قبل النوم بـ 30-60 دقيقة مع ماء دافئ',
    dosageForm: 'كبسولات نباتية',
    commonDoses: ['500 إلى 1000 مجم قبل النوم'],
    clinicalNotes: 'تزيد أحماض الفاليرينيك من توافر الناقل العصبي GABA وتمنع تكسيره في الدماغ، مما يقلل الزمن اللازم للدخول في النوم ويحسن بنية النوم بدون اعتياد أو آثار جانبية صباحية.',
    searchTokens: ['فاليريان', 'valerian', 'ناردين', 'حشيشة الناردين', 'ارق ونوم', 'منوم طبيعي']
  },

  // =========================================================================
  // 6. Women's & Men's Hormonal Optimization (موازنة الهرمونات التناسلية المتقدمة)
  // =========================================================================
  {
    id: 'dim_diindolylmethane_200',
    tradeName: 'ديم لتصريف وتنظيف الإستروجين (DIM Diindolylmethane 200mg - Smokey Mountain / NOW)',
    tradeNameEn: 'DIM 200mg Complex with BioPerine (Derived from Cruciferous Vegetables)',
    scientificName: 'ديإندوليل ميثان النقي 200 مجم + مستخلص الفلفل الأسود بيوبيرين لزيادة الامتصاص (DIM)',
    category: 'supplements',
    categoryAr: 'تحويل الإستروجين الضار إلى إستروجين نافع للرجال والنساء، وتخفيف آلام الثدي والدورة',
    categoryIcon: '🌸',
    defaultTiming: 'كبسولة واحدة يومياً بعد وجبة الإفطار أو الغداء مع ماء',
    dosageForm: 'كبسولات نباتية',
    commonDoses: ['100 إلى 200 مجم يومياً مع الأكل'],
    clinicalNotes: 'وجه استقلاب الإستروجين نحو المسار الآمن (2-hydroxyestrone) بدلاً من المسار الضار المسبب للتكتلات والتثدي لدى الرجال وآلام الثدي وتكيسات الرحم لدى النساء.',
    searchTokens: ['ديم', 'dim', 'diindolylmethane', 'تنظيف الاستروجين', 'تثدي الرجال', 'تكيسات وتكتلات']
  },
  {
    id: 'chasteberry_vitex_400',
    tradeName: 'كف مريم فيتكس لموازنة هرمونات المرأة (Vitex Chasteberry 400mg - Nature\'s Way / NOW)',
    tradeNameEn: 'Chaste Tree Berry Extract (Vitex agnus-castus) Standardized Agnusides',
    scientificName: 'مستخلص ثمار عشبة كف مريم المعياري بالأجنوسيدات (Vitex agnus-castus)',
    category: 'supplements',
    categoryAr: 'تحفيز إفراز البروجسترون الطبيعي، تنظيم الدورة الشهرية، وتخفيف متلازمة قبل الطمث PMS',
    categoryIcon: '🌸',
    defaultTiming: 'كبسولة واحدة صباحاً بعد وجبة الإفطار',
    dosageForm: 'كبسولات نباتية',
    commonDoses: ['400 مجم يومياً صباحاً'],
    clinicalNotes: 'تؤثر على الغدة النخامية لخفض هرمون الحليب البرولاكتين وتحفيز الجسم الأصفر لإفراز البروجسترون، مما يحل مشكلة تقارب أو تباعد الدورة وحبوب الوجه الهرمونية.',
    searchTokens: ['كف مريم', 'vitex', 'فيتكس', 'chasteberry', 'تنظيم دورة نسائية', 'pms', 'بروجسترون']
  },

  // ==========================================
  // 7. Pediatric & Maternal Clinical Essentials (مكملات الأطفال والحوامل الدوائية)
  // ==========================================
  {
    id: 'osteocare_syrup_calcium',
    tradeName: 'أوستيوكير شراب للأطفال والحوامل (Osteocare Syrup)',
    tradeNameEn: 'Osteocare Liquid (Calcium 300mg + Magnesium 150mg + Vit D3 150IU + Zinc 6mg - Vitabiotics)',
    scientificName: 'كربونات الكالسيوم + هيدروكسيد المغنيسيوم + فيتامين د3 + زنك معلق',
    category: 'supplements',
    categoryAr: 'المكمل الكلاسيكي لبناء عظام وأسنان الأطفال، وتقوية عظام الحامل والمرضع بنكهة البرتقال',
    categoryIcon: '🦴',
    defaultTiming: 'ملعقة كبيرة (10 مل) يومياً بعد وجبة الإفطار أو الغداء مباشرة',
    dosageForm: 'معلق شراب كثيف بنكهة البرتقال اللذيذة',
    commonDoses: ['5 مل للأطفال من 2-8 سنوات / 10 مل للأطفال أكبر من 9 سنوات والحوامل'],
    clinicalNotes: 'تركيبة هيدروديناميكية متوازنة تجمع الكالسيوم مع المغنيسيوم بنسبة 2:1 الموصى بها طبياً لمنع الإمساك، مع فيتامين D3 والزنك لضمان أعلى امتصاص وتوزيع عظمي.',
    searchTokens: ['اوستيوكير', 'osteocare', 'كالسيوم اطفال', 'كالسيوم للحوامل', 'تسنين', 'نمو العظام']
  },
  {
    id: 'lactoferrin_100_sachets',
    tradeName: 'لاكتوفيرين أكياس للأنيميا والمناعة (Lactoferrin 100mg Sachets - Pravitin / Lactomash)',
    tradeNameEn: 'Purified Bovine Lactoferrin 100mg Powder Sachets',
    scientificName: 'بروتين اللاكتوفيرين البقري المصفى النقي 100 مجم (Lactoferrin)',
    category: 'supplements',
    categoryAr: 'البروتين الناقل للحديد لعلاج الأنيميا الحادة لدى الحوامل والأطفال بدون طعم معدني أو إمساك',
    categoryIcon: '🥛',
    defaultTiming: 'كيس يذوب في نصف كوب ماء أو حليب أو زبادي صباحاً ومساءً قبل الأكل بـ 15 دقيقة',
    dosageForm: 'أكياس فوارة / بودرة سريعة الذوبان بنكهات الفواكه',
    commonDoses: ['1-2 كيس يومياً لكافة الأعمار والحوامل'],
    clinicalNotes: 'يرتبط بأيونات الحديد برابطة عالية الأنس المدى، فيمرر الحديد بصفة خاصة عبر مستقبلا LfR في الأمعاء الدقيقة، مما يرفع الفيريتين والهيموجلوبين بفاعلية تفوق أقراص الحديد بـ 4 أضعاف ودون تحفيز نمو البكتيريا الضارة.',
    searchTokens: ['لاكتوفيرين', 'lactoferrin', 'برافيتين', 'pravitin', 'حديد اطفال بدون امساك', 'رفع هيموجلوبين سريع', 'انيميا الحوامل']
  },
  {
    id: 'sanssovit_iron_syrup',
    tradeName: 'سانسوفيت بالحديد شراب للأطفال (Sanssovit with Iron)',
    tradeNameEn: 'Sanssovit Syrup with Essential Vitamins & Elemental Iron (Multivitamin + Iron)',
    scientificName: 'مجمّع فيتامينات أ، د3، ب المركب، ج + عنصر الحديد ثنائي التكافؤ معلق',
    category: 'supplements',
    categoryAr: 'فتح الشهية، تقوية المناعة، وفيتامينات النمو المتكاملة للأطفال والرضع',
    categoryIcon: '👶',
    defaultTiming: 'ملعقة صغيرة إلى متوسطة (5-10 مل) يومياً أثناء أو بعد وجبة الإفطار مباشرة',
    dosageForm: 'شراب لذيذ بنكهة الفواكه الطبيعية والقمع',
    commonDoses: ['5 مل يومياً للأطفال من عمر سنة'],
    clinicalNotes: 'تركيبة طفولية آمنة ومفضلة جداً تدعم التركيز المدرسي والنمو الجسدي وتفتح شهية الأطفال الرافضين للطعام مع الوقاية الكاملة من أنيميا نقص الحديد.',
    searchTokens: ['سانسوفيت', 'sanssovit', 'سانسوفيت بالحديد', 'فاتح شهية اطفال', 'فيتامينات اطفال', 'حديد اطفال']
  }
];
