// ============================================================================
// بنك البدائل الذكي المتقدم الشامل (Comprehensive Smart Substitutions & Meal Library)
// مكتبة موسعة تشمل كل ما يخطر على البال من وجبات وبدائل صيامية ونباتية وبحرية وصحية
// ============================================================================

export interface FastingSubItem {
  id: string;
  original: string;         // المكون / الوجبة الأصلية
  category: 'poultry' | 'meat' | 'dairy' | 'eggs' | 'seafood' | 'legumes_grains' | 'suhur' | 'snacks_desserts';
  plantAlternative: string; // البديل النباتي الصيامي المتوازن
  fishAlternative?: string; // البديل البحري (إذا كان الصوم مسموحاً بالسمك)
  proteinGrams: number;     // كمية البروتين التقريبية (جم)
  caloriesApprox?: number;  // السعرات التقريبية
  notesAr: string;          // نصيحة إكلينيكية وغذائية
  tags?: string[];          // وسوم البحث
}

export const SMART_SUBSTITUTIONS_BANK: FastingSubItem[] = [
  // ==========================================
  // 1. الدواجن والطيور (Poultry & Birds)
  // ==========================================
  {
    id: 'chicken_breast',
    original: 'صدور دجاج مشوية / مسلوقة (100-150 جم)',
    category: 'poultry',
    plantAlternative: '150 جم مشروم مشوي + 5 ملاعق كبيرة حمص مسلوق (أو 120 جم توفو صلب متبل مشوي بالأعشاب)',
    fishAlternative: '150 جم سمك فيليه أبيض (بلطي/قشارة) مشوي بالليمون والثوم أو علبة تونة مصفاة',
    proteinGrams: 24,
    caloriesApprox: 180,
    notesAr: 'دمج المشروم مع الحمص يعطي إحساساً لحمياً وقيمة بروتينية وأليافاً عالية تمنح شبعاً طويلاً.',
    tags: ['دجاج', 'صدر', 'فراخ', 'مشوي', 'بروتين', 'chicken']
  },
  {
    id: 'chicken_thigh',
    original: 'أوراك دجاج مشوية أو بالفرن',
    category: 'poultry',
    plantAlternative: 'برجر عدس بني وفول صويا مشوي + ملعقة طحينة خام سمسمية + سلطة خضراء',
    fishAlternative: '150 جم سمك سلمون نرويجي مشوي مع روزماري وليمون',
    proteinGrams: 22,
    caloriesApprox: 240,
    notesAr: 'العدس مع الطحينة يعوض الأحماض الدهنية الصحية والمعادن الدقيقة الموجودة في اللحوم الداكنة.',
    tags: ['وراك', 'أوراك', 'دجاج', 'فراخ', 'thigh']
  },
  {
    id: 'shish_tawook',
    original: 'شيش طاووق دجاج متبل على الفحم',
    category: 'poultry',
    plantAlternative: 'أسياخ توفو ومشروم وفلفل ملون وبصل متبلة ببهارات الشيش والليمون ومشوية',
    fishAlternative: 'أسياخ جمبري متبل مشوي مع فلفل ألوان وطماطم كرزية',
    proteinGrams: 20,
    caloriesApprox: 190,
    notesAr: 'تتبيلة الخردل والبابريكا والليمون تجعل التوفو والمشروم يمتصان نفس النكهة المشوية اللذيذة.',
    tags: ['شيش', 'طاووق', 'أسياخ', 'مشاوي', 'دجاج']
  },
  {
    id: 'chicken_shawarma',
    original: 'شاورما دجاج متبلة بالثومية',
    category: 'poultry',
    plantAlternative: 'شاورما مشروم وفاصوليا حمراء متبلة ببهارات الشاورما + صوص طحينة بالثوم وليمون',
    fishAlternative: 'شاورما سمك فيليه مقطع ومطهو ببهارات الشاورما والبصل والسماق',
    proteinGrams: 18,
    caloriesApprox: 220,
    notesAr: 'صوص الطحينة مع الثوم بديل نباتي صيامي صحي وغني بالدهون غير المشبعة بدلاً من الثومية التقليدية.',
    tags: ['شاورما', 'دجاج', 'فراخ', 'shawarma']
  },
  {
    id: 'smoked_turkey',
    original: 'شرائح تركي / صدر حبش مدخن',
    category: 'poultry',
    plantAlternative: 'شرائح تيمبيه أو توفو مدخن مع أوراق جرجير ومستردة خردل ديجون',
    fishAlternative: 'شرائح سلمون مدخن (Smoked Salmon) مع عصرة ليمون وشبت',
    proteinGrams: 16,
    caloriesApprox: 130,
    notesAr: 'السلمون المدخن والتيمبيه بدائل ممتازة للسندويشات الصباحية والسلطات السريعة.',
    tags: ['تركي', 'حبش', 'مدخن', 'لانشون', 'turkey']
  },
  {
    id: 'chicken_kofta',
    original: 'كفتة دجاج مفروم مشوية',
    category: 'poultry',
    plantAlternative: 'كفتة حمص وكينوا وبقدونس مشوية بالفرن أو القلاية الهوائية + طحينة',
    fishAlternative: 'كفتة جمبري وسمك فيليه بالأعشاب والكمون مشوية',
    proteinGrams: 20,
    caloriesApprox: 200,
    notesAr: 'الكينوا تمنح الكفتة النباتية تماسكاً مثالياً وبروتيناً كاملاً يحتوي على جميع الأحماض الأمينية الـ 9.',
    tags: ['كفتة', 'دجاج', 'فراخ', 'مفروم']
  },

  // ==========================================
  // 2. اللحوم الحمراء (Red Meat & Beef)
  // ==========================================
  {
    id: 'red_meat_steak',
    original: 'ستيك لحم بقري صافي / فلتو مشوي (120-150 جم)',
    category: 'meat',
    plantAlternative: 'كوب عدس بني مسلوق مطهو مع بصل وثوم + 3 ملاعق كينوا + طبق سبانخ سوتيه بزيت الزيتون',
    fishAlternative: '150 جم ستيك سمك تونة طازج مشوي (أو سلمون غني بأوميجا 3)',
    proteinGrams: 26,
    caloriesApprox: 230,
    notesAr: 'العدس البني والسبانخ يعوضان الحديد النباتي (Non-heme) وحمض الفوليك، وتناول الليمون معهما يضاعف الامتصاص 3 مرات.',
    tags: ['لحم', 'ستيك', 'بقري', 'فلتو', 'لحمة', 'steak', 'beef']
  },
  {
    id: 'ground_beef_kofta',
    original: 'لحم مفروم / كفتة حاتي مشوية',
    category: 'meat',
    plantAlternative: 'كفتة برغل وعدس أسود بالأعشاب والبصل والبهارات المشكلة مشوية بالفرن + سلطة طحينة',
    fishAlternative: 'كفتة سمك فيليه مفروم مع بقدونس وثوم وبهارات سمك مشوية',
    proteinGrams: 20,
    caloriesApprox: 210,
    notesAr: 'خلط البرغل مع العدس يكمل مصفوفة الأحماض الأمينية (Lysine + Methionine) لتكوين بروتين كامل كفاءته كاللحم.',
    tags: ['كفتة', 'لحم مفروم', 'كباب', 'مفروم', 'kofta']
  },
  {
    id: 'beef_burger',
    original: 'برجر لحم بقري مشوي',
    category: 'meat',
    plantAlternative: 'برجر فاصوليا سوداء ومشروم وشوفان مطحون مشوي في خبز حبة كاملة مع خس وطماطم ومستردة',
    fishAlternative: 'برجر سمك سلمون أو تونة مشوي مع صوص أفوكادو وليمون',
    proteinGrams: 21,
    caloriesApprox: 260,
    notesAr: 'برجر الفاصوليا السوداء والمشروم مشبع جداً ويحتوي على 12 جم ألياف قابلة للذوبان تضبط سكر الدم.',
    tags: ['برجر', 'همبرجر', 'لحم', 'burger']
  },
  {
    id: 'beef_shawarma',
    original: 'شاورما لحم بقري مع بقدونس وبصل وسماق',
    category: 'meat',
    plantAlternative: 'شاورما سيتان (Seitan) أو فطر بورتوبيللو متبل بالسماق وخل التفاح وزيت الزيتون',
    fishAlternative: 'شاورما سمك قاروص أو فيليه تونة مشوحة مع شرائح بصل وطماطم وبقدونس',
    proteinGrams: 22,
    caloriesApprox: 220,
    notesAr: 'السيتان (بروتين القمح الصافي) يوفر أكثر من 25 جم بروتين لكل 100 جم بدون أي دهون مشبعة.',
    tags: ['شاورما لحم', 'شاورما', 'لحمة']
  },
  {
    id: 'liver_alex',
    original: 'كبدة بقري أو دجاج إسكندراني بالفلفل والثوم',
    category: 'meat',
    plantAlternative: 'مشروم وفطر محاري (Oyster Mushroom) مشوح بالثوم والكمون والفلفل الحار والليمون + سلطة طحينة',
    fishAlternative: 'جمبري مشوح بنفس التتبيلة الإسكندرانية (ثوم، فلفل حار، كمون، ليمون، خل)',
    proteinGrams: 18,
    caloriesApprox: 170,
    notesAr: 'الفطر المحاري يعطي نفس ملمس الكبدة الإسكندرانية تماماً وغني جداً بفيتامينات ب والزنك النباتي.',
    tags: ['كبدة', 'كبده', 'إسكندراني', 'liver']
  },
  {
    id: 'lamb_chops',
    original: 'ريش ضاني / لحم غنم مشوي',
    category: 'meat',
    plantAlternative: 'ستيك فطر بورتوبيللو كبير مشوي بزيت الزيتون والروزماري والثوم + مجدرة برغل وعدس',
    fishAlternative: 'سمك ماكريل زيتي مشوي بالردة والليمون الغني بالدهون المفيدة',
    proteinGrams: 20,
    caloriesApprox: 250,
    notesAr: 'المجدرة مع البرغل توفر طاقة هادئة وثابتة بدون الدهون الثلاثية الموجودة في اللحوم الدسمة.',
    tags: ['ضاني', 'غنم', 'ريش', 'موزة']
  },

  // ==========================================
  // 3. البيض والأومليت (Eggs & Breakfast)
  // ==========================================
  {
    id: 'boiled_eggs',
    original: '2-3 بيضات مسلوقة',
    category: 'eggs',
    plantAlternative: '5 ملاعق كبيرة فول مدمس بزيت زيتون وليمون ورشة كمون وبذور كتان + ربع رغيف بلدي',
    fishAlternative: 'علبة تونة بالماء مصفاة ومتبلة بليمون وشرائح خيار وطماطم وخس',
    proteinGrams: 16,
    caloriesApprox: 200,
    notesAr: 'الفول المدمس بزيت الزيتون غني بالألياف والبروتين بطيء الامتصاص الذي يدوم 5-6 ساعات.',
    tags: ['بيض', 'مسلوق', 'بيض مسلوق', 'eggs', 'boiled']
  },
  {
    id: 'scrambled_eggs_veg',
    original: 'أومليت بيض بالخضار والجبن',
    category: 'eggs',
    plantAlternative: 'أومليت التوفو بالأعشاب والكركم (Scrambled Tofu) مع فلفل ملون، سبانخ، وبصل أخضر',
    fishAlternative: 'أومليت بياض بيض مع سلمون مدخن أو سلطة تونة دافئة بالخضار',
    proteinGrams: 17,
    caloriesApprox: 180,
    notesAr: 'الكركم والكمون مع التوفو يمنحان نفس لون ونكهة وقوام البيض المخفوق تماماً وبدون كوليسترول.',
    tags: ['أومليت', 'اومليت', 'مخفوق', 'scrambled']
  },
  {
    id: 'shakshuka',
    original: 'شكشوكة بيض بالصلصة والفلفل والبصل',
    category: 'eggs',
    plantAlternative: 'شكشوكة حمص وتوفو في صلصة الطماطم الطازجة مع الفلفل الرومي والكمون والكزبرة',
    fishAlternative: 'شكشوكة الجمبري الصغير أو قطع السمك الفيليه في صوص الطماطم والكمون',
    proteinGrams: 18,
    caloriesApprox: 210,
    notesAr: 'الليكوبين الموجود في صلصة الطماطم المطبوخة مضاد أكسدة قوي جداً لصحة القلب والأوعية.',
    tags: ['شكشوكة', 'شكشوكه', 'طماطم بيض']
  },
  {
    id: 'egg_whites',
    original: '4-5 بياض بيض نقي',
    category: 'eggs',
    plantAlternative: '1 كوب ترمس مسلوق متبل بالكمون والليمون (يحتوي على 26 جم بروتين نقي بدون دهون)',
    fishAlternative: '120 جم سمك فيليه أبيض مسلوق أو مشوي على البخار',
    proteinGrams: 24,
    caloriesApprox: 140,
    notesAr: 'الترمس المسلوق هو بطل البروتين النباتي الخارق، يحتوي على نسبة بروتين أعلى من معظم اللحوم!',
    tags: ['بياض بيض', 'بياض', 'egg white']
  },

  // ==========================================
  // 4. الألبان والأجبان (Dairy & Cheeses)
  // ==========================================
  {
    id: 'cottage_cheese',
    original: 'جبنة قريش طبيعية (100-150 جم)',
    category: 'dairy',
    plantAlternative: 'جبنة توفو نباتية بيضاء مهروسة مع ملعقة زيت زيتون، زعتر دقة، وخيار وطماطم',
    fishAlternative: 'سلطة تونة خفيفة بالخس والخيار والليمون والكمون',
    proteinGrams: 16,
    caloriesApprox: 140,
    notesAr: 'التوفو المهروس مع زيت الزيتون والزعتر يحاكي ملمس وطعم الجبن القريش وخالٍ تماماً من اللاكتوز.',
    tags: ['جبنة قريش', 'قريش', 'جبن قريش', 'cottage cheese']
  },
  {
    id: 'greek_yogurt',
    original: 'زبادي يوناني كامل الدسم / لايت (170 جم)',
    category: 'dairy',
    plantAlternative: 'زبادي صويا طبيعي مدعم أو زبادي جوز هند غير محلى + ملعقة بذور شيا + رشة قرفة',
    fishAlternative: 'سناك بروتيني بحري خفيف أو سموذي بروتين نباتي مع حليب اللوز',
    proteinGrams: 14,
    caloriesApprox: 150,
    notesAr: 'بذور الشيا في الزبادي النباتي تمتص السوائل وتصنع قواماً كريمياً غنياً بالأوميجا 3 والكالسيوم.',
    tags: ['زبادي يوناني', 'يوناني', 'زبادي', 'رائب', 'greek yogurt']
  },
  {
    id: 'halloumi_cheese',
    original: 'جبن حلوم مشوي',
    category: 'dairy',
    plantAlternative: 'شرائح توفو صلب متبلة بالأوريجانو والملح البحري وزيت الزيتون ومشوية حتى القرمشة',
    fishAlternative: 'قطع سالمون مشوية ومقرمشة مع رشة ملح وليمون',
    proteinGrams: 15,
    caloriesApprox: 180,
    notesAr: 'التوفو المشوي يعطي نفس المتعة المقرمشة الخارجية والطرية الداخلية للجبن الحلوم.',
    tags: ['حلوم', 'جبن حلوم', 'halloumi']
  },
  {
    id: 'feta_cheese',
    original: 'جبن فيتا يوناني بالسلطة',
    category: 'dairy',
    plantAlternative: 'مكعبات توفو متبلة بالليمون وزيت الزيتون والخل والزعتر والزيتون الكالاماتا',
    fishAlternative: 'سلطة خضراء مع قطع سردين أو ماكريل مدخن',
    proteinGrams: 12,
    caloriesApprox: 130,
    notesAr: 'نقع التوفو في ماء مملح مع ليمون وخل وزعتر يمنحه نفس حدة ونكهة الفيتا الأصيلة.',
    tags: ['فيتا', 'جبن فيتا', 'feta']
  },
  {
    id: 'cow_milk',
    original: 'كوب حليب بقري (250 مل)',
    category: 'dairy',
    plantAlternative: 'كوب حليب صويا غير محلى مدعم بالكالسيوم وفيتامين د (أو حليب لوز / شوفان غير محلى)',
    proteinGrams: 8,
    caloriesApprox: 90,
    notesAr: 'حليب الصويا هو المشروب النباتي الوحيد المطابق للحليب البقري في محتوى البروتين (7-8 جم/كوب).',
    tags: ['حليب', 'لبن', 'milk', 'حليب بقري']
  },
  {
    id: 'labneh',
    original: 'لبنة بلدية بزيت الزيتون والنعناع',
    category: 'dairy',
    plantAlternative: 'حمص ناعم بالطحينة والليمون وزيت الزيتون ورشة بابريكا (أو لبنة الكاجو المخمرة)',
    proteinGrams: 10,
    caloriesApprox: 160,
    notesAr: 'الحمص بالطحينة بديل كريمي ممتع ومشبع جداً على الفطور أو السحور.',
    tags: ['لبنة', 'لبنه', 'labneh']
  },

  // ==========================================
  // 5. الأسماك والمأكولات البحرية (Seafood)
  // ==========================================
  {
    id: 'canned_tuna',
    original: 'علبة تونة مصفاة بالماء أو زيت الزيتون',
    category: 'seafood',
    plantAlternative: 'سلطة الحمص المهروس (Chickpea Tuna) مع كرفس، بصل، شبت، خردل وعصرة ليمون',
    fishAlternative: 'علبة سلمون معلب بالماء أو سردين بالليمون',
    proteinGrams: 18,
    caloriesApprox: 180,
    notesAr: 'سلطة الحمص المهروس مع الطحينة والخردل والشبت تعطي نفس قوام وطعم سلطة التونة التقليدية.',
    tags: ['تونة', 'تونه', 'tuna', 'علبة تونة']
  },
  {
    id: 'grilled_salmon',
    original: 'شريحة سلمون مشوي (150 جم)',
    category: 'seafood',
    plantAlternative: 'كوب كينوا مسلوقة + 2 ملعقة بذور كتان مطحونة + نصف ثمرة أفوكادو + 10 حبات عين جمل',
    fishAlternative: '150 جم سمك ماكريل مشوي بالليمون الغني بالأوميجا 3',
    proteinGrams: 20,
    caloriesApprox: 280,
    notesAr: 'بذور الكتان وعين الجمل والأفوكادو توفر أحماض ALA الدهنية الأساسية التي تعوض أوميجا 3 السلمون.',
    tags: ['سلمون', 'سالمون', 'salmon']
  },
  {
    id: 'shrimp_calamari',
    original: 'جمبري أو سبيط مشوي بالأعشاب والليمون',
    category: 'seafood',
    plantAlternative: 'مشروم محاري (Oyster) مقطع ومشوي بخلطة الثوم والكزبرة والليمون + إدامامي مسلوق',
    fishAlternative: 'بلح البحر أو محار مطهو على البخار بالليمون والأعشاب',
    proteinGrams: 22,
    caloriesApprox: 160,
    notesAr: 'الإدامامي (فول الصويا الأخضر) يحتوي على 18 جم بروتين لكل كوب وهو غني جداً بالمعادن.',
    tags: ['جمبري', 'سبيط', 'روبيان', 'shrimp']
  },
  {
    id: 'tilapia_fish',
    original: 'سمك بلطي أو بوري مشوي بالردة والليمون',
    category: 'seafood',
    plantAlternative: 'طاجن فاصوليا بيضاء بالصلصة ومكعبات الخضار وزيت الزيتون + أرز بني مسلوق',
    fishAlternative: 'سمك دنيس أو قاروص مشوي بالفرن مع شرائح الخضار',
    proteinGrams: 22,
    caloriesApprox: 210,
    notesAr: 'الفاصوليا البيضاء غنية بالبوتاسيوم والمغنيسيوم وتساعد على خفض ضغط الدم والارتواء.',
    tags: ['بلطي', 'بوري', 'سمك', 'fish']
  },

  // ==========================================
  // 6. البقوليات والبروتينات النباتية الخارقة (Legumes & Super Plant Proteins)
  // ==========================================
  {
    id: 'lupini_beans',
    original: 'ترمس حلو مسلوق (كوب 150 جم) - بروتين خارق',
    category: 'legumes_grains',
    plantAlternative: 'ترمس مسلوق متبل بالكمون والشطة والليمون (سناك بروتين 26 جم صافي بدون دهون)',
    fishAlternative: 'علبة تونة دايت مع ليمون وكمون وخيار',
    proteinGrams: 26,
    caloriesApprox: 190,
    notesAr: 'الترمس يحتوي على 40% بروتين وألياف ذائبة تخفض الكوليسترول الضار بنسبة 15%.',
    tags: ['ترمس', 'سناك بروتين', 'lupini', 'بقوليات']
  },
  {
    id: 'edamame_beans',
    original: 'إدامامي / فول صويا أخضر مسلوق (كوب)',
    category: 'legumes_grains',
    plantAlternative: 'إدامامي مسلوق في قرونه ومملح بالملح البحري والبابريكا (18 جم بروتين كامل)',
    fishAlternative: '120 جم سمك فيليه مشوي خفيف',
    proteinGrams: 18,
    caloriesApprox: 180,
    notesAr: 'الإدامامي مصدر بروتين كامل (Complete Protein) يحتوي على كل الأحماض الأمينية الأساسية.',
    tags: ['إدامامي', 'صويا خضراء', 'edamame']
  },
  {
    id: 'falafel_airfryer',
    original: 'طعمية / فلافل بيتي بالقلاية الهوائية (4 حبات)',
    category: 'legumes_grains',
    plantAlternative: '4 حبات فلافل حمص وفول خضراء مخبوزة بدون زيت عميق + سلطة طحينة بخل التفاح + رغيف بلدي',
    fishAlternative: 'كفتة تونة مشوية بالأعشاب',
    proteinGrams: 15,
    caloriesApprox: 230,
    notesAr: 'الفلافل المخبوزة في القلاية الهوائية توفر كل نكهة الفلافل الشرقية بدون دهون مهدرجة وسعرات مضاعفة.',
    tags: ['طعمية', 'فلافل', 'falafel', 'فول']
  },
  {
    id: 'koshari_healthy',
    original: 'كشري مصري متوازن (عدس وحمص بكمية مضاعفة)',
    category: 'legumes_grains',
    plantAlternative: 'كشري صحي: 60% عدس بني وحمص + 20% أرز بني + 20% مكرونة شوفان + صلصة طماطم بالخل والثوم ودقة كمون بدون بصل محمر بالزيت',
    fishAlternative: 'أرز بالسمك الفيليه والجمبري',
    proteinGrams: 22,
    caloriesApprox: 380,
    notesAr: 'مضاعفة العدس والحمص في الكشري يجعله وجبة رياضية نباتية متكاملة ترفع هرمون الشبع (GLP-1).',
    tags: ['كشري', 'عدس', 'حمص', 'koshari']
  },
  {
    id: 'lentil_soup',
    original: 'شوربة عدس أصفر بالخضار والكمون (طبق كبير)',
    category: 'legumes_grains',
    plantAlternative: 'شوربة عدس مهروسة مع جزر وكوسة وبصل وكمون وكركم + ملعقة زيت زيتون بكر + عصرة ليمون',
    fishAlternative: 'شوربة سي فود خفيفة بالليمون والأعشاب بدون كريمة',
    proteinGrams: 16,
    caloriesApprox: 210,
    notesAr: 'العدس الأصفر سهل الهضم وسريع الامتصاص ومثالي كبداية إفطار بعد ساعات صيام طويلة.',
    tags: ['شوربة عدس', 'عدس أصفر', 'شوربة', 'lentil']
  },

  // ==========================================
  // 7. وجبات السحور والإفطار الذكية (Smart Suhur & Fasting Meals)
  // ==========================================
  {
    id: 'suhur_ultimate_power',
    original: 'سحور القوة والشبع المديد (8-10 ساعات طاقة)',
    category: 'suhur',
    plantAlternative: 'طبق فول مدمس بزيت الزيتون والليمون وبذور الكتان + نصف ثمرة أفوكادو + شريحة خبز ردة كامل + ثمرة موز غنية بالبوتاسيوم',
    fishAlternative: 'سلطة سلمون أو تونة بالخضار والأفوكادو + خبز شوفان + موزة',
    proteinGrams: 20,
    caloriesApprox: 420,
    notesAr: 'البوتاسيوم في الموز والأفوكادو يمنع العطش تماماً، والألياف في الفول والخبز الأسمر تحافظ على استقرار السكر 8 ساعات.',
    tags: ['سحور', 'رمضان', 'فول', 'شبع', 'suhur']
  },
  {
    id: 'suhur_light_hydration',
    original: 'سحور الترطيب ومكافحة العطش الخفيف',
    category: 'suhur',
    plantAlternative: 'كوب زبادي صويا أو جوز هند + 2 ملعقة بذور شيا منقوعة + شرائح خيار وخس وفيرة + شريحة توست شوفان مع لبنة حمص',
    fishAlternative: 'سناك تونة خفيف مع خيار وخس وفير',
    proteinGrams: 14,
    caloriesApprox: 240,
    notesAr: 'الخيار والخس يحتويان على 96% ماء مع إلكترولايت طبيعية ترطب الخلايا طوال نهار الصيام.',
    tags: ['سحور خفيف', 'ترطيب', 'عطش', 'زبادي']
  },
  {
    id: 'suhur_oats_chia_pudding',
    original: 'سحور بودينغ الشوفان والشيا بالقرفة',
    category: 'suhur',
    plantAlternative: 'نصف كوب شوفان كامل منقوع في حليب صويا + ملعقة بذور شيا + رشة قرفة سيلانية + ملعقة زبدة فول سوداني طبيعية + حبة تمر مقطعة',
    proteinGrams: 18,
    caloriesApprox: 350,
    notesAr: 'الشوفان يحتوي على ألياف بيتا جلوكان التي تبطئ إفراغ المعدة وتمد العضلات بالجليكوجين لساعات الصيام.',
    tags: ['شوفان', 'بودينغ', 'شيا', 'سحور حلو', 'oats']
  },

  // ==========================================
  // 8. السناكات والحلويات الصحية البديلة (Healthy Snacks & Desserts)
  // ==========================================
  {
    id: 'dates_peanut_butter',
    original: 'تمر محشي مكسرات وزبدة فول سوداني (سناك كسر صيام)',
    category: 'snacks_desserts',
    plantAlternative: '2 حبة تمر مجدول محشوة بلوز ني وملعقة صغيرة زبدة فول سوداني طبيعية 100% بدون سكر مضاف',
    proteinGrams: 6,
    caloriesApprox: 160,
    notesAr: 'التمر يوفر سكريات سريعة لتغذية الدماغ فور الإفطار، والدهون الصحية في الفول السوداني تمنع الارتفاع الحاد للإنسولين.',
    tags: ['تمر', 'فول سوداني', 'سناك', 'dates']
  },
  {
    id: 'chia_cocoa_pudding',
    original: 'بودينغ الشوكولاتة والشيا الصيامي',
    category: 'snacks_desserts',
    plantAlternative: '2 ملعقة بذور شيا منقوعة في كوب حليب لوز غير محلى + ملعقة كاكاو خام عضوي + قطرات ستيفيا + رشة فانيليا',
    proteinGrams: 7,
    caloriesApprox: 130,
    notesAr: 'الكاكاو الخام غني بالبوليفينول والمغنيسيوم لتحسين المزاج واسترخاء العضلات.',
    tags: ['بودينغ', 'شوكولاتة', 'شيا', 'كاكاو', 'حلو']
  },
  {
    id: 'roasted_spiced_chickpeas',
    original: 'مقرمشات الحمص المحمص بالأعشاب والبابريكا',
    category: 'snacks_desserts',
    plantAlternative: 'كوب حمص مسلوق مجفف ومحمص في القلاية الهوائية مع زيت زيتون، بابريكا مدخنة، كمون، وثوم بودرة',
    proteinGrams: 12,
    caloriesApprox: 170,
    notesAr: 'بديل صحي فائق القرمشة بدلاً من الشيبسي والمقرمشات المقلية المشبعة بالدهون المتحولة.',
    tags: ['حمص محمص', 'مقرمشات', 'سناك مالح', 'chickpeas']
  },
  {
    id: 'dark_chocolate_nuts',
    original: 'شوكولاتة داكنة ولوز ني (سناك استرخاء)',
    category: 'snacks_desserts',
    plantAlternative: '20 جم شوكولاتة داكنة 85% + 12 حبة لوز أو عين جمل ني',
    proteinGrams: 5,
    caloriesApprox: 180,
    notesAr: 'مزيج غني جداً بمضادات الأكسدة والدهون الأحادية غير المشبعة التي تدعم صحة القلب والشرايين.',
    tags: ['شوكولاتة داكنة', 'لوز', 'مكسرات', 'dark chocolate']
  },
];

/**
 * فحص النص الأصلي للوجبة واستخراج البدائل الصيامية الشاملة المناسبة
 */
export function detectFastingSubstitutions(mealText: string, allowFish: boolean = false): FastingSubItem[] {
  if (!mealText) return [];
  const text = mealText.toLowerCase();

  const results: FastingSubItem[] = [];

  const checkAndAdd = (id: string) => {
    const item = SMART_SUBSTITUTIONS_BANK.find((s) => s.id === id);
    if (item && !results.some(r => r.id === item.id)) {
      results.push(item);
    }
  };

  // 1. الدواجن
  if (text.includes('دجاج') || text.includes('فراخ') || text.includes('chicken') || text.includes('شيش') || text.includes('طاووق') || text.includes('شاورما دجاج')) {
    if (text.includes('شيش')) checkAndAdd('shish_tawook');
    else if (text.includes('شاورما')) checkAndAdd('chicken_shawarma');
    else if (text.includes('ورك') || text.includes('أوراك') || text.includes('وراك')) checkAndAdd('chicken_thigh');
    else if (text.includes('كفتة')) checkAndAdd('chicken_kofta');
    else checkAndAdd('chicken_breast');
  }

  // 2. الحبش والتركي
  if (text.includes('تركي') || text.includes('حبش') || text.includes('مدخن') || text.includes('لانشون') || text.includes('turkey')) {
    checkAndAdd('smoked_turkey');
  }

  // 3. اللحوم الحمراء
  if (text.includes('لحم') || text.includes('ستيك') || text.includes('beef') || text.includes('كفتة') || text.includes('مفروم') || text.includes('برجر') || text.includes('كبدة') || text.includes('ريش') || text.includes('ضاني')) {
    if (text.includes('برجر') || text.includes('همبرجر')) checkAndAdd('beef_burger');
    else if (text.includes('كبدة') || text.includes('كبده')) checkAndAdd('liver_alex');
    else if (text.includes('كفتة') || text.includes('مفروم')) checkAndAdd('ground_beef_kofta');
    else if (text.includes('شاورما')) checkAndAdd('beef_shawarma');
    else if (text.includes('ضاني') || text.includes('غنم') || text.includes('ريش')) checkAndAdd('lamb_chops');
    else checkAndAdd('red_meat_steak');
  }

  // 4. البيض
  if (text.includes('بيض') || text.includes('egg') || text.includes('أومليت') || text.includes('اومليت') || text.includes('شكشوكة') || text.includes('بياض')) {
    if (text.includes('شكشوكة') || text.includes('شكشوكه')) checkAndAdd('shakshuka');
    else if (text.includes('بياض')) checkAndAdd('egg_whites');
    else if (text.includes('أومليت') || text.includes('اومليت') || text.includes('خضار')) checkAndAdd('scrambled_eggs_veg');
    else checkAndAdd('boiled_eggs');
  }

  // 5. الألبان والأجبان
  if (text.includes('جبن') || text.includes('قريش') || text.includes('زبادي') || text.includes('لبن') || text.includes('حليب') || text.includes('حلوم') || text.includes('فيتا') || text.includes('لبنة') || text.includes('لبنه')) {
    if (text.includes('قريش')) checkAndAdd('cottage_cheese');
    else if (text.includes('يوناني') || text.includes('زبادي')) checkAndAdd('greek_yogurt');
    else if (text.includes('حلوم')) checkAndAdd('halloumi_cheese');
    else if (text.includes('فيتا')) checkAndAdd('feta_cheese');
    else if (text.includes('لبنة') || text.includes('لبنه')) checkAndAdd('labneh');
    else if (text.includes('حليب') || text.includes('لبن')) checkAndAdd('cow_milk');
    else checkAndAdd('cottage_cheese');
  }

  // 6. الأسماك
  if (text.includes('سمك') || text.includes('تونة') || text.includes('تونه') || text.includes('سلمون') || text.includes('سالمون') || text.includes('جمبري') || text.includes('بلطي') || text.includes('سبيط')) {
    if (text.includes('تونة') || text.includes('تونه')) checkAndAdd('canned_tuna');
    else if (text.includes('سلمون') || text.includes('سالمون')) checkAndAdd('grilled_salmon');
    else if (text.includes('جمبري') || text.includes('سبيط') || text.includes('روبيان')) checkAndAdd('shrimp_calamari');
    else checkAndAdd('tilapia_fish');
  }

  // 7. البقوليات والسحور إذا ذكرت صراحة
  if (text.includes('سحور') || text.includes('رمضان')) {
    checkAndAdd('suhur_ultimate_power');
    checkAndAdd('suhur_light_hydration');
  }

  return results;
}

/**
 * استبدال المكونات الحيوانية في نص الوجبة ببدائل نباتية / صيامية بضغطة واحدة وبشكل شامل
 */
export function autoConvertMealTextToFasting(mealText: string, allowFish: boolean = false): string {
  if (!mealText) return mealText;

  let converted = mealText;

  // Replacements
  if (allowFish) {
    converted = converted
      .replace(/صدور دجاج|صدر دجاج|دجاج مشوي|فراخ مشوية|دجاج مسحب/gi, '150 جم سمك فيليه مشوي أو علبة تونة مصفاة')
      .replace(/أوراك دجاج|وراك فراخ/gi, '150 جم سمك سلمون مشوي بالليمون والأعشاب')
      .replace(/شيش طاووق/gi, 'أسياخ جمبري وفلفل مشوي')
      .replace(/شاورما دجاج/gi, 'شاورما سمك فيليه متبلة بالبصل والسماق')
      .replace(/لحم مشوي|ستيك لحم|لحمة مسلوقة|لحم بقري/gi, '150 جم سمك سلمون أو ماكريل مشوي غني بالأوميجا 3')
      .replace(/كفتة لحم|كفتة حاتي|لحم مفروم/gi, 'كفتة سمك فيليه بالأعشاب والكمون مشوية')
      .replace(/كبدة إسكندراني|كبدة دجاج/gi, 'جمبري مشوح بالثوم والفلفل الحار والليمون')
      .replace(/برجر لحم|همبرجر/gi, 'برجر سمك سلمون أو تونة مشوي مع صوص أفوكادو')
      .replace(/بيض مسلوق|2 بيضة|3 بيضات|بيض أومليت/gi, 'علبة تونة مصفاة بالليمون والخيار أو فول بالزيت الحار')
      .replace(/شكشوكة/gi, 'شكشوكة الجمبري بالصلصة والكمون')
      .replace(/جبنة قريش|جبن قريش/gi, 'جبن توفو نباتي بالأعشاب وزيت الزيتون أو حمص بالطحينة')
      .replace(/زبادي يوناني|زبادي لايت/gi, 'زبادي صويا مدعم أو حليب لوز مع بذور الشيا')
      .replace(/جبن حلوم/gi, 'شرائح سلمون مشوية مقرمشة بالليمون')
      .replace(/جبن فيتا/gi, 'سلطة خضراء مع قطع سردين أو تونة')
      .replace(/حليب بقري|كوب لبن/gi, 'حليب صويا غير محلى مدعم أو حليب لوز');
  } else {
    converted = converted
      .replace(/صدور دجاج|صدر دجاج|دجاج مشوي|فراخ مشوية|دجاج مسحب/gi, '150 جم مشروم مشوي + 5 ملاعق حمص مسلوق (أو 120 جم توفو متبل مشوي)')
      .replace(/أوراك دجاج|وراك فراخ/gi, 'برجر عدس وفول صويا مشوي + ملعقة طحينة خام')
      .replace(/شيش طاووق/gi, 'أسياخ توفو ومشروم وفلفل ملون مشوية')
      .replace(/شاورما دجاج/gi, 'شاورما مشروم وفاصوليا حمراء بصوص الطحينة والثوم')
      .replace(/لحم مشوي|ستيك لحم|لحمة مسلوقة|لحم بقري/gi, 'كوب عدس بني مسلوق + 3 ملاعق كينوا مسلوقة + سلطة سبانخ')
      .replace(/كفتة لحم|كفتة حاتي|لحم مفروم/gi, 'كفتة برغل وعدس أسود بالأعشاب مشوية + سلطة طحينة')
      .replace(/كبدة إسكندراني|كبدة دجاج/gi, 'مشروم محاري مشوح بالثوم والكمون والفلفل الحار والليمون')
      .replace(/برجر لحم|همبرجر/gi, 'برجر فاصوليا سوداء ومشروم وشوفان مشوي')
      .replace(/بيض مسلوق|2 بيضة|3 بيضات/gi, '5 ملاعق كبيرة فول مدمس بزيت زيتون وليمون وبذور كتان')
      .replace(/بيض أومليت|أومليت بالخضار/gi, 'أومليت التوفو بالأعشاب والكركم والفلفل الملون')
      .replace(/شكشوكة/gi, 'شكشوكة حمص وتوفو في صلصة الطماطم والكمون')
      .replace(/جبنة قريش|جبن قريش/gi, '100 جم جبن توفو نباتي مهروس بزيت الزيتون والزعتر والخيار')
      .replace(/زبادي يوناني|زبادي لايت/gi, 'زبادي صويا طبيعي + ملعقة بذور شيا وقرفة')
      .replace(/جبن حلوم/gi, 'شرائح توفو مشوية مقرمشة بزيت الزيتون والأوريجانو')
      .replace(/جبن فيتا/gi, 'مكعبات توفو متبلة بالليمون وزيت الزيتون والزعتر وزيتون كالاماتا')
      .replace(/حليب بقري|كوب لبن/gi, 'كوب حليب صويا غير محلى مدعم بالكالسيوم')
      .replace(/سمك مشوي|تونة|سالمون|جمبري|سبيط/gi, '150 جم مشروم مشوي + كينوا وبقوليات مدمجة');
  }

  return converted;
}
