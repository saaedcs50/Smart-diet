import { EgyptianMedication } from './types';

export const JOINTS_PAIN_MEDS: EgyptianMedication[] = [
  // ==========================================
  // Cartilage Rebuilders & Joint Lubricants (بناء الغضاريف وتزييت المفاصل)
  // ==========================================
  {
    id: 'genuphil_advance_sachets',
    tradeName: 'جينوفيل أدفانس أكياس / جينوفيل أقراص (Genuphil / Genuphil Advance)',
    tradeNameEn: 'Genuphil Advance Sachets / Tablets (Glucosamine + Chondroitin + MSM + Collagen + Hyaluronic Acid - EVA Pharma)',
    scientificName: 'جلوكوزامين 1500 مجم + كوندرويتين 1000 مجم + MSM 1000 مجم + كولاجين + هيالورونات الصوديوم',
    category: 'joints_bones',
    categoryAr: 'التركيبة الخماسية الشاملة لترميم غضاريف الركبة وتخفيف خشونة المفاصل والفقرات',
    categoryIcon: '🦴',
    defaultTiming: 'كيس واحد يومياً يذاب في نصف كوب ماء بعد وجبة الغداء أو الإفطار (أو قرص 3 مرات يومياً)',
    dosageForm: 'أكياس فوارة سريعة الامتصاص / أقراص مغلفة',
    commonDoses: ['كيس واحد يومياً لمدة 3-6 أشهر كورس علاجي مكثف'],
    clinicalNotes: 'يعيد بناء المادة الزلالية المفصلية (Synovial Fluid) ويثبط الإنزيمات المسببة لتآكل الغضروف. آمن للمعدة ومثالي مع ممارسة المشي وتمارين تقوية عضلات الفخذ.',
    searchTokens: ['جينوفيل', 'genuphil', 'جينوفيل ادفانس', 'خشونة ركبة', 'غضاريف', 'كولاجين مفاصل', 'مفاصل']
  },
  {
    id: 'dorofen_capsules',
    tradeName: 'دوروفين كبسول (Dorofen)',
    tradeNameEn: 'Dorofen Capsules (Glucosamine Sulfate 500mg + Ginkgo Biloba 50mg - Liptis Egypt)',
    scientificName: 'سلفات الجلوكوزامين 500 مجم + خلاصة الجنكة بيلوبا (Ginkgo Biloba)',
    category: 'joints_bones',
    categoryAr: 'علاج خشونة المفاصل وتحسين الدورة الدموية الطرفية في الأطراف السفلية والركبتين',
    categoryIcon: '🦴',
    defaultTiming: 'كبسولة بعد الأكل 3 مرات يومياً (ويمكن تقليلها لكبسولة واحدة يومياً بعد تحسن الأعراض)',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['1 كبسولة 3 مرات يومياً بعد الوجبات'],
    clinicalNotes: 'تجمع بين تغذية الغضاريف بفضل الجلوكوزامين وتنشيط وصول الدم للأنسجة المجهدة بفضل الجنكة، ممتاز لمرضى خشونة الركبة المصحوبة ببرودة أو ثقل الساقين.',
    searchTokens: ['دوروفين', 'dorofen', 'جنكة', 'خشونة مفاصل', 'دورة دموية ساقين', 'غضروف']
  },
  {
    id: 'cursoma_curcumin_caps',
    tradeName: 'كرسوما / كبسولات الكركمين النقي (Cursoma / Pure Curcumin)',
    tradeNameEn: 'Cursoma (Curcumin Extract + Piperine for High Bioavailability)',
    scientificName: 'مستخلص الكركمين النقي المعزز بالبيبيرين لامتصاص فائق بنسبة 2000%',
    category: 'joints_bones',
    categoryAr: 'مضاد الالتهاب المفصلي الطبيعي الأقوى والآمن تماماً على المعدة والكلى',
    categoryIcon: '🦴',
    defaultTiming: 'كبسولة إلى كبسولتين يومياً مع وجبة تحتوي على دهون صحية (كوجبة الغداء)',
    dosageForm: 'كبسولات جيلاتينية رخوة',
    commonDoses: ['1 كبسولة مرتين يومياً بعد الأكل'],
    clinicalNotes: 'يثبط مسار NF-kB ومستقبلات COX-2 الالتهابية في الجسم دون إحداث أي تهيج لبطانة المعدة، بديل طبيعي ممتاز للمسكنات الكيميائية لمن يعانون من قرحة المعدة أو ارتفاع ضغط الدم.',
    searchTokens: ['كرسوما', 'cursoma', 'كركمين', 'curcumin', 'التهاب مفاصل طبيعي', 'مضاد التهاب بدون مسكنات']
  },

  // ==========================================
  // Safe NSAIDs & Selective Pain Relievers (المسكنات ومضادات الالتهاب الآمنة)
  // ==========================================
  {
    id: 'celebrex_200_celebrex',
    tradeName: 'سيليبريكس 200 مجم (Celebrex)',
    tradeNameEn: 'Celebrex 100mg, 200mg (Celecoxib Selective COX-2 Inhibitor - Pfizer / Viatris)',
    scientificName: 'سيليكوكسيب انتقائي عالي النقاء (Celecoxib)',
    category: 'joints_bones',
    categoryAr: 'المسكن الانتقائي الألطف على المعدة لآلام المفاصل والعمود الفقري والخشونة',
    categoryIcon: '🦴',
    defaultTiming: 'كبسولة واحدة 200 مجم يومياً بعد وجبة الغداء مع كوب ماء كبير',
    dosageForm: 'كبسولات صلبة',
    commonDoses: ['200 مجم مرة يومياً', 'أو 100 مجم مرتين يومياً'],
    clinicalNotes: 'يثبط إنزيم COX-2 المسؤول عن الألم والالتهاب فقط ويحافظ على إنزيم COX-1 الحامي لغشاء المعدة، لذا فهو أقل تسبيباً لقرحة المعدة من المسكنات التقليدية. تحذير: يستخدم بحذر لمرضى الشرايين التاجية غير المستقرة.',
    searchTokens: ['سيليبريكس', 'celebrex', 'celecoxib', 'مسكن امن للمعدة', 'التهاب مفاصل', 'خشونة فقرات']
  },
  {
    id: 'mobitil_meloxicam_15',
    tradeName: 'موبيتيل 15 مجم / موفيكس (Mobitil / Mobic)',
    tradeNameEn: 'Mobitil 15mg Tablets / Ampoules (Meloxicam - Medical Union Pharma)',
    scientificName: 'ميلوكسيكام شبه انتقائي (Meloxicam 15mg)',
    category: 'joints_bones',
    categoryAr: 'مضاد التهاب ومسكن ممتد المفعول للروماتيزم وآلام الظهر والانزلاق الغضروفي',
    categoryIcon: '🦴',
    defaultTiming: 'قرص واحد يومياً بعد وجبة الغداء مباشرة مع كوب ماء كامل',
    dosageForm: 'أقراص مغلفة / أمبولات عضلية',
    commonDoses: ['7.5 مجم', '15 مجم مرة واحدة يومياً'],
    clinicalNotes: 'مفعوله يمتد 24 ساعة، يخفف التيبس الصباحي لمرضى المفاصل والروماتويد مع معدل أمان معوي جيد مقارنة بالديكلوفيناك.',
    searchTokens: ['موبيتيل', 'mobitil', 'mobic', 'meloxicam', 'ميلوكسيكام', 'مسكن روماتيزم', 'انزلاق غضروفي']
  },
  {
    id: 'cataflam_voltaren_50_100',
    tradeName: 'كتافلام 50 / فولتارين 100 مجم (Cataflam / Voltaren)',
    tradeNameEn: 'Cataflam 50mg (Diclofenac Potassium - Fast Acting) / Voltaren SR 100mg',
    scientificName: 'ديكلوفيناك بوتاسيوم سريع المفعول / ديكلوفيناك صوديوم ممتد المفعول',
    category: 'joints_bones',
    categoryAr: 'المسكن السريع للآلام الحادة والالتهابات والأسنان والمغص والشد المفاجئ',
    categoryIcon: '🦴',
    defaultTiming: 'بعد الأكل مباشرة دائماً مع كوب ماء كبير (يمنع تماماً تناوله على معدة خاوية)',
    dosageForm: 'أقراص سكرية سريعة المفعول / أقراص ممتدة المفعول SR / أمبولات',
    commonDoses: ['كتافلام 50 قرص عند اللزوم بعد الأكل حتى 3 مرات يومياً', 'فولتارين 100 قرص واحد يومياً'],
    clinicalNotes: 'قاعدة إكلينيكية هامة: تناوله دائماً بعد وجبة كاملة لتجنب تهيج جدار المعدة، يفضل إضافة حامي معدة (مثل كونترولوك) لمن يتناولونه لأكثر من 5 أيام متواصلة. يفضل تجنبه لمن لديهم قصور كلوي أو ضغط غير منضبط.',
    searchTokens: ['كتافلام', 'فولتارين', 'cataflam', 'voltaren', 'diclofenac', 'ديكلوفيناك', 'مسكن اسنان', 'مسكن سريع']
  },
  {
    id: 'panadol_extra_advance',
    tradeName: 'بنادول إكسترا / بنادول جوينت للمفاصل (Panadol Extra / Joint)',
    tradeNameEn: 'Panadol Extra (Paracetamol 500mg + Caffeine 65mg) / Panadol Joint 665mg',
    scientificName: 'باراسيتامول نقي عالي الأمان + كافيين منشط لسرعة التسكين (أو طبقتين ممتدتين)',
    category: 'joints_bones',
    categoryAr: 'المسكن الأكثر أماناً لمرضى الضغط وقرحة المعدة والسيولة والقصور الكلوي',
    categoryIcon: '🦴',
    defaultTiming: 'قرص إلى قرصين كل 6-8 ساعات عند اللزوم بعد الأكل أو مع كوب ماء',
    dosageForm: 'أقراص مع تقنية Optizorb لسرعة الامتصاص',
    commonDoses: ['1-2 قرص حتى 4 مرات يومياً (بحد أقصى 4000 مجم باراسيتامول يومياً)'],
    clinicalNotes: 'الخيار الأول والآمن تماماً لمرضى القلب وقرحة المعدة والسيولة. لا يرفع ضغط الدم ولا يضر الكلى عند تناوله بالجرعات العلاجية المقررة.',
    searchTokens: ['بنادول', 'بانادول', 'panadol', 'paracetamol', 'باراسيتامول', 'مسكن امن للمعدة', 'صداع']
  },

  // ==========================================
  // Muscle Relaxants (باسطات العضلات والتشنجات العضلية والعمود الفقري)
  // ==========================================
  {
    id: 'dimra_tablets',
    tradeName: 'ديمرا أقراص (Dimra)',
    tradeNameEn: 'Dimra (Diclofenac Potassium 50mg + Methocarbamol 400mg - Marcyrl)',
    scientificName: 'ديكلوفيناك بوتاسيوم 50 مجم + ميثوكاربامول 400 مجم باسط للعضلات',
    category: 'joints_bones',
    categoryAr: 'التركيبة الأقوى لبسط تشنج عضلات الظهر والرقبة والفقرات وتسكين الألم',
    categoryIcon: '🦴',
    defaultTiming: 'قرص واحد بعد الوجبات مرتين إلى 3 مرات يومياً',
    dosageForm: 'أقراص مغلفة',
    commonDoses: ['1 قرص مرتين إلى 3 مرات يومياً بعد الأكل'],
    clinicalNotes: 'يعالج الشد العضلي الحاد في الرقبة (Lumbago / Torticollis) وأسفل الظهر مع تسكين مباشر. قد يسبب نعاساً خفيفاً، لذا يفضل الحذر أثناء القيادة.',
    searchTokens: ['ديمرا', 'dimra', 'باسط عضلات', 'شد عضلي', 'تشنج رقبة', 'ميثوكاربامول', 'وجع ظهر']
  },
  {
    id: 'myofen_mark_fast',
    tradeName: 'مايوفين / مارك فاست (Myofen / Mark Fast)',
    tradeNameEn: 'Myofen (Paracetamol 300mg + Chlorzoxazone 250mg - EVA Pharma)',
    scientificName: 'باراسيتامول 300 مجم + كلورزوكسازون 250 مجم باسط للعضلات الهيكلية',
    category: 'joints_bones',
    categoryAr: 'باسط عضلات متوسط القوة خفيف على المعدة لعلاج آلام العضلات والمفاصل',
    categoryIcon: '🦴',
    defaultTiming: 'كبسولة واحدة بعد الأكل 3 مرات يومياً مع كوب ماء',
    dosageForm: 'كبسولات صلبة ملونة',
    commonDoses: ['1 كبسولة 3 مرات يومياً بعد الوجبات'],
    clinicalNotes: 'يحتوي على باراسيتامول مما يجعله لطيفاً على جدار المعدة مقارنة بباسطات العضلات التي تحتوي على الديكلوفيناك. قد يحول لون البول للون داكن/برتقالي غير ضار مؤقتاً.',
    searchTokens: ['مايوفين', 'myofen', 'مارك فاست', 'mark fast', 'كلورزوكسازون', 'باسط عضلات خفيف', 'تشنج عضلي']
  }
];
