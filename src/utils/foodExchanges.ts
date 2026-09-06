export interface FoodExchangeItem {
  id: string;
  nameAr: string;
  servingAr: string;
  tags: string[];
  notes?: string;
}

export interface MixedDishNote {
  nameAr: string;
  breakdown: string;
  servingAdvice?: string;
}

export interface ExchangeGroup {
  id: string;
  nameAr: string;
  shortName: string;
  category: 'carbs' | 'protein' | 'veg' | 'fruit' | 'dairy' | 'fat';
  carbsGrams: number;
  proteinGrams: number;
  fatsGrams: number;
  calories: number;
  icon: string;
  colorClass: {
    bg: string;
    text: string;
    border: string;
    badge: string;
  };
  portionUnit: string;
  clinicalStandard: string;
  items: FoodExchangeItem[];
  egyptianExamples: string[];
  globalExamples: string[];
  examples: string[];
  tips?: string;
}

export const MIXED_DISHES_NOTES: MixedDishNote[] = [
  {
    nameAr: 'كشري مصري',
    breakdown: 'نشويات متعددة (أرز + مكرونة + عدس + حمص) + دهون (بصل مقلي وزيت الصلصة والشطة)',
    servingAdvice: 'الطبق الصغير يعادل 3-4 حصص نشويات + 1-2 حصة دهون + 1 حصة بروتين نباتي.',
  },
  {
    nameAr: 'محشي مشكل (كوسة / كرنب / ورق عنب / باذنجان)',
    breakdown: 'نشا (أرز الحشو) + خضار (خضرة المحشي والورق) ± بروتين ودهون (شوربة أو لحم مفروم)',
    servingAdvice: 'كل 4-5 أصابع محشي متوسطة تحسب كحصة نشويات + حصة خضار.',
  },
  {
    nameAr: 'ملوخية مصرية بدجاج / أرانب',
    breakdown: 'خضار غير نشوي (ملوخية خضراء) + بروتين قليل الدهن (صدر دجاج/أرانب) ± دهون (تقلية الثوم والكزبرة)',
    servingAdvice: 'طبق الملوخية يعادل 1-2 حصة خضار + حصة دهون إن كانت التقلية بالسمن البلدي.',
  },
  {
    nameAr: 'مسقعة مصرية باللحمة المفرومة',
    breakdown: 'خضار (باذنجان وفلفل رومي) + دهون (قلي الباذنجان أو مسحة زيت) + بروتين متوسط (لحم مفروم عصاج)',
    servingAdvice: 'المسقعة اللايت بالفرن توفر دهون القلي الغزير، وتحسب كحصة خضار + حصة بروتين متوسط + حصة دهن.',
  },
  {
    nameAr: 'فتة مصرية باللحم والخل والثوم',
    breakdown: 'نشويات (عيش بلدي محمص + أرز مصري) + بروتين (لحم بتلو/كنداك مسلوق) + دهون وصلصة (دقة وثوم وسمن)',
    servingAdvice: 'الطبق المتوسط يعادل 3-4 حصص نشويات + 2-3 حصص بروتين + 2 حصة دهون.',
  },
  {
    nameAr: 'فول مدمس بالزيت الحار والليمون والعيش البلدي',
    breakdown: 'نشا وبروتين نباتي (فول مدمس) + نشا (عيش بلدي) + دهون صحية (زيت حار بذر كتان أو طحينة)',
    servingAdvice: '4 ملاعق فول + ¼ رغيف بلدي + ملعقة صغيرة زيت حار = 2 حصة نشويات + 1 حصة دهون صحية.',
  },
  {
    nameAr: 'طعمية (فلافل) سخنة',
    breakdown: 'نشا وبروتين نباتي (فول مدشوش وخضرة) + دهون (قلي الزيت الغزير)',
    servingAdvice: '2 قرص طعمية مقلي يعادل 1 حصة نشويات + 1 حصة دهون. الأفضل عملها بالقلاية الهوائية أو بالفرن.',
  },
  {
    nameAr: 'حواوشي بلدي',
    breakdown: 'بروتين متوسط/عالي الدهن (لحم مفروم مع لية/دهن) + نشا (رغيف عيش بلدي كامل) + دهون دهن اللحم',
    servingAdvice: 'نصف رغيف حواوشي يعادل 2 حصة نشويات + 2 حصة بروتين متوسط + 2 حصة دهون.',
  },
  {
    nameAr: 'شاورما لحم أو دجاج',
    breakdown: 'بروتين (دجاج أو لحم) + دهون (تتبيلة وزيت وطحينة/تومية) ± نشا (عيش صاج أو فينو)',
    servingAdvice: 'ساندوتش الشاورما الصغير يعادل 2 حصة نشويات + 2-3 حصص بروتين + 1-2 حصة دهن.',
  },
  {
    nameAr: 'بصارة مصرية بالتقلية',
    breakdown: 'نشا وبروتين نباتي (فول مدشوش وكزبرة وشبت) + دهون (بصل محمر على الوجه)',
    servingAdvice: 'طبق البصارة الصغير يعادل 1.5 حصة نشويات + 1 حصة دهون.',
  },
  {
    nameAr: 'بامية باللحمة الضاني أو الكنداك',
    breakdown: 'خضار (بامية وصلصة طماطم وثوم) + بروتين (لحم) ± دهون التسبيك واللحم',
    servingAdvice: 'طبق البامية باللحمة يعادل 1 حصة خضار + 2 حصة بروتين متوسط.',
  },
  {
    nameAr: 'سمك بوري / بلطي مشوي بالردة مع زيت وليمون',
    breakdown: 'بروتين (سمك بحري/نهري) + دهون صحية أوميجا-3 ± مسحة زيت زيتون',
    servingAdvice: 'سمكة بلطي متوسطة (150-200 جم لحم صافي) تعادل 4-5 حصص بروتين قليل الدهن.',
  },
  {
    nameAr: 'كشك مصري / صعيدي',
    breakdown: 'نشا (قمح مطحون/دقيق) + ألبان (لبن زبادي أو حليب) + دهون (بصل محمر)',
    servingAdvice: 'طبق الكشك الصغير يعادل 1 حصة نشويات + 1 حصة ألبان + 1 حصة دهون.',
  },
  {
    nameAr: 'أرز باللبن / مهلبية / أم علي',
    breakdown: 'نشويات + ألبان + سكريات ودهون مضافة (سمن/مكسرات/سكر)',
    servingAdvice: 'أطباق حلى استثنائية تحسب كحصص نشويات وألبان وسكريات ولا تدرج كبديل يومي حر.',
  },
];

export const FOOD_EXCHANGE_GROUPS: ExchangeGroup[] = [
  {
    id: 'starches',
    nameAr: 'النشويات والخبز والحبوب والدرنات والبقوليات',
    shortName: 'نشويات',
    category: 'carbs',
    carbsGrams: 15,
    proteinGrams: 3,
    fatsGrams: 1,
    calories: 80,
    icon: '🍞',
    colorClass: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-800 dark:text-amber-200',
      border: 'border-amber-200 dark:border-amber-800/80',
      badge: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200',
    },
    portionUnit: 'حصة نشويات (15 جم كارب = ~80 ك.س)',
    clinicalStandard: 'المعهد القومي للتغذية (NNI) والجمعية الأمريكية للسكري (ADA/AND)',
    items: [
      { id: 'aish_baladi', nameAr: 'عيش بلدي (قمح كامل وردة)', servingAr: '¼ رغيف كبير أو ½ رغيف صغير ≈ 30 جم', tags: ['egyptian', 'bread', 'staple'] },
      { id: 'aish_shami', nameAr: 'عيش شامي / صاج', servingAr: '¼ رغيف ≈ 30 جم', tags: ['egyptian', 'bread'] },
      { id: 'aish_fino', nameAr: 'عيش فينو / كيزر', servingAr: '½ رغيفة صغيرة ≈ 30 جم', tags: ['egyptian', 'bread'] },
      { id: 'toast', nameAr: 'توست أبيض أو أسمر كامل الحبوب', servingAr: '1 شريحة توست ≈ 30 جم', tags: ['bread', 'global'] },
      { id: 'bataw', nameAr: 'بتاو فلاحي / مخبوز قروي', servingAr: 'قطعة متوسطة ≈ 30 جم', tags: ['egyptian', 'bread', 'rural'] },
      { id: 'shaboora', nameAr: 'شابورة / بقسماط سن / بسكويت مالح خفيف', servingAr: '2 قطعة أو إصبع ≈ 20–25 جم', tags: ['egyptian', 'snack'] },
      { id: 'egyptian_rice', nameAr: 'أرز مصري مسلوق / مفلفل خفيف', servingAr: '⅓ كوب مطبوخ (3 ملاعق كبيرة)', tags: ['egyptian', 'rice', 'staple'] },
      { id: 'basmati_rice', nameAr: 'أرز بسمتي مسلوق', servingAr: '½ كوب مطبوخ', tags: ['rice', 'global'] },
      { id: 'brown_rice', nameAr: 'أرز بني كامل الحبة مسلوق', servingAr: '⅓ كوب مطبوخ', tags: ['rice', 'global'] },
      { id: 'rice_vermicelli', nameAr: 'أرز بالشعرية (مفلفل بزيت خفيف)', servingAr: '⅓ كوب مطبوخ', tags: ['egyptian', 'rice'] },
      { id: 'freek', nameAr: 'فريك أخضر بلدي مسلوق', servingAr: '⅓ كوب مطبوخ (3 ملاعق كبيرة)', tags: ['egyptian', 'grain', 'high-fiber'] },
      { id: 'burghul', nameAr: 'برغل خشن مسلوق', servingAr: '½ كوب مطبوخ', tags: ['grain', 'high-fiber'] },
      { id: 'barley', nameAr: 'شعير بلدي مسلوق / بليلة شعير', servingAr: '½ كوب مطبوخ', tags: ['grain', 'egyptian'] },
      { id: 'balila', nameAr: 'بليلة قمح كامل مسلوقة (بدون سكر)', servingAr: '½ كوب مسلوق', tags: ['egyptian', 'grain'] },
      { id: 'oats', nameAr: 'شوفان مطبوخ / رقائق شوفان جافة', servingAr: '½ كوب مطبوخ أو 3 ملاعق كبيرة جاف (25-30 جم)', tags: ['grain', 'global'] },
      { id: 'pasta', nameAr: 'مكرونة مسلوقة / لسان عصفور / شعرية', servingAr: '⅓–½ كوب مطبوخ (3 ملاعق كبيرة)', tags: ['pasta', 'staple'] },
      { id: 'couscous', nameAr: 'كسكسي مسلوق سادة', servingAr: '⅓ كوب مطبوخ', tags: ['grain', 'egyptian'] },
      { id: 'potato', nameAr: 'بطاطس مسلوقة / مشوية بالفرن', servingAr: '½ حبة متوسطة أو ½ كوب مكعبات (حجم بيضة ≈ 100 جم)', tags: ['starchy_veg', 'staple'] },
      { id: 'sweet_potato', nameAr: 'بطاطا حلوة مشوية / مسلوقة', servingAr: '½ حبة متوسطة أو ½ كوب (100 جم)', tags: ['starchy_veg', 'egyptian'] },
      { id: 'corn', nameAr: 'ذرة حبوب مسلوقة صفراء/بيضاء', servingAr: '½ كوب حبوب مسلوقة', tags: ['starchy_veg'] },
      { id: 'corn_cob', nameAr: 'كوز ذرة بلدي مشوي', servingAr: '½ كوز متوسط', tags: ['egyptian', 'starchy_veg', 'street-food'] },
      { id: 'peas', nameAr: 'بسلة خضراء مطبوخة', servingAr: '½ كوب مطبوخ', tags: ['starchy_veg'] },
      { id: 'ful_medames', nameAr: 'فول مدمس مهروس بالشوكة', servingAr: '⅓–½ كوب (4 ملاعق كبيرة ممتلئة)', tags: ['egyptian', 'legume', 'staple'] },
      { id: 'lentils', nameAr: 'عدس أصفر / عدس بجبة مسلوق', servingAr: '⅓ كوب مسلوق', tags: ['legume', 'high-fiber'] },
      { id: 'chickpeas', nameAr: 'حمص الشام مسلوق', servingAr: '⅓ كوب مسلوق', tags: ['legume', 'egyptian'] },
      { id: 'white_beans', nameAr: 'فاصوليا بيضاء جافة مسلوقة', servingAr: '⅓ كوب مسلوق', tags: ['legume'] },
      { id: 'black_eyed_peas', nameAr: 'لوبيا مسلوقة', servingAr: '⅓ كوب مسلوق', tags: ['egyptian', 'legume'] },
      { id: 'termes', nameAr: 'ترمس بلدي مسلوق (قليل الملح)', servingAr: '⅓ كوب مسلوق', tags: ['egyptian', 'legume', 'snack'] },
      { id: 'popcorn', nameAr: 'فشار بالهواء الساخن بدون زيت', servingAr: '3 أكواب منتفخة', tags: ['snack', 'global'] },
      { id: 'rice_cakes', nameAr: 'كعك أرز منتفخ (Rice Cakes)', servingAr: '2 كعكة متوسطة', tags: ['snack', 'global'] },
      { id: 'taameya_baked', nameAr: 'طعمية (فلافل) بالفرن / قلاية هوائية', servingAr: '2 قرص معمولين بمسحة زيت خفيفة', tags: ['egyptian', 'legume'] },
    ],
    egyptianExamples: [
      '¼ رغيف عيش بلدي مصري كبير كامل الردة (أو ½ رغيف صغير ≈ 30 جم)',
      '¼ رغيف شامي أو ½ رغيفة فينو أو قطعة بتاو فلاحي (30 جم)',
      '⅓ كوب أرز مصري مسلوق أو مفلفل خفيف (3 ملاعق كبيرة)',
      '⅓ كوب أرز بالشعرية أو فريك بلدي مطبوخ',
      '⅓–½ كوب مكرونة مسلوقة أو لسان عصفور',
      '½ كوب بليلة قمح كامل مسلوقة بدون سكر',
      '½ حبة بطاطس مسلوقة أو مشوية (100 جم) أو ½ حبة بطاطا حلوة',
      '½ كوز ذرة مشوي بلدي أصفر أو أبيض',
      '⅓–½ كوب فول مدمس بالكمون والليمون (4 ملاعق كبيرة)',
      '⅓ كوب عدس أصفر/بجبة مسلوق أو حمص الشام أو لوبيا أو فاصوليا بيضاء',
      '⅓ كوب ترمس بلدي مسلوق خفيف الملح',
      '2 قرص طعمية بالفرن أو القلاية الهوائية',
    ],
    globalExamples: [
      '1 شريحة خبز توست بني / حبوب كاملة (Whole Wheat Toast ~30g)',
      '½ كوب شوفان مطبوخ (أو 3 ملاعق كبيرة شوفان جاف ~25-30g)',
      '½ كوب أرز بسمتي أو أرز بني مسلوق',
      '⅓ كوب كينوا مطبوخة أو كسكسي كامل',
      '2 كعكة أرز منتفخ (Rice Cakes)',
      '3 أكواب فشار هواء بدون زيت (Air-popped Popcorn)',
      '½ كوب مكرونة قمح كامل مسلوقة (Al Dente)',
      '½ كوب ذرة حلوة مسلوقة',
    ],
    examples: [
      '¼ رغيف بلدي مصري كامل الردة (30 جم)',
      '1 شريحة توست أسمر كامل الحبوب',
      '⅓ كوب أرز مصري أو بسمتي مسلوق (3 ملاعق كبيرة)',
      '⅓ كوب مكرونة أو فريك بلدي مسلوق',
      '½ كوب شوفان مطبوخ أو 3 م.ك شوفان جاف',
      '½ حبة بطاطس مسلوقة/مشوية (100 جم)',
      '½ حبة بطاطا حلوة مشوية (100 جم)',
      '½ كوز ذرة مشوي بلدي',
      '½ كوب بليلة قمح كامل مسلوق',
      '4 ملاعق كبيرة فول مدمس مهروس',
      '⅓ كوب عدس أو حمص أو لوبيا مسلوقة',
      '3 أكواب فشار بدون زيت أو 2 كعكة أرز',
    ],
    tips: 'يفضل دائماً الحبوب الكاملة ذات المؤشر الجلايسيمي المنخفض الغنية بالردة والألياف لزيادة الشبع وتنظيم سكر الدم ومقاومة الإنسولين.',
  },
  {
    id: 'lean_protein',
    nameAr: 'البروتين قليل الدهون (Lean Protein)',
    shortName: 'بروتين خفيف',
    category: 'protein',
    carbsGrams: 0,
    proteinGrams: 7,
    fatsGrams: 3,
    calories: 55,
    icon: '🍗',
    colorClass: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-800 dark:text-emerald-200',
      border: 'border-emerald-200 dark:border-emerald-800/80',
      badge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200',
    },
    portionUnit: 'حصة (30 جم مطبوخ = 7 جم بروتين / 0-3 جم دهن)',
    clinicalStandard: 'قوائم التغذية الإكلينيكية (ADA / NNI Lean Meat Exchange)',
    items: [
      { id: 'chicken_breast', nameAr: 'صدور دجاج بدون جلد مشوية أو مسلوقة', servingAr: '30 جم مطبوخ (حجم علبة كبريت)', tags: ['poultry', 'lean', 'staple'] },
      { id: 'turkey_breast', nameAr: 'صدور ديك رومي (حبش) مسلوقة أو مشوية', servingAr: '30 جم مطبوخ', tags: ['poultry', 'lean'] },
      { id: 'tilapia', nameAr: 'سمك بلطي طازج مشوي بالردة أو بالفرن', servingAr: '30 جم مطبوخ', tags: ['egyptian', 'fish', 'staple'] },
      { id: 'bolti_fish', nameAr: 'سمك قليل الدهن (وقار / قشر بياض / لوت / موسى / مرجان)', servingAr: '30 جم مطبوخ', tags: ['egyptian', 'fish'] },
      { id: 'shrimp', nameAr: 'جمبري أو كابوريا مسلوقة أو مشوية (بدون زبدة)', servingAr: '30 جم لحم صافي (حوالي 3-4 حبات متوسطة)', tags: ['seafood', 'lean'] },
      { id: 'tuna_water', nameAr: 'تونة معلبة في ماء أو مصفاة ومغسولة بالخل', servingAr: '30 جم (¼ علبة صغيرة)', tags: ['fish', 'lean', 'staple'] },
      { id: 'lean_beef', nameAr: 'لحم بقري/جاموسي/بتلو أحمر خالي الشحم (موزة حمراء أو فلتو)', servingAr: '30 جم مطبوخ', tags: ['meat', 'lean', 'egyptian'] },
      { id: 'rabbit_meat', nameAr: 'لحم أرانب بلدي مسلوق أو مشوي', servingAr: '30 جم مطبوخ', tags: ['meat', 'egyptian', 'very-lean'] },
      { id: 'liver', nameAr: 'كبدة دجاج أو بقري مشوية (باعتدال للحديد)', servingAr: '30 جم مطبوخ', tags: ['meat', 'egyptian', 'rich-iron'] },
      { id: 'egg_white', nameAr: 'بياض بيض كبير مسلوق', servingAr: '2 بياض بيض (بدون الصفار)', tags: ['egg', 'very-lean', 'staple'] },
      { id: 'qareesh_protein', nameAr: 'جبنة قريش فلاحي طبيعية قليلة الدسم', servingAr: '¼–½ كوب (≈ 45 جم = 2 ملعقة كبيرة ممتلئة)', tags: ['egyptian', 'dairy_protein', 'staple'] },
      { id: 'white_cheese_lean', nameAr: 'جبنة بيضاء طبيعية خالية أو قليلة الدسم', servingAr: '≈ 30 جم (شريحة صغيرة)', tags: ['egyptian', 'dairy_protein'] },
    ],
    egyptianExamples: [
      '45 جم جبنة قريش فلاحي طبيعية (¼–½ كوب ≈ 2 ملعقة كبيرة ممتلئة)',
      '30 جم سمك بلطي مشوي بالردة بالليمون والكمون',
      '30 جم سمك قشر بياض أو وقار أو لوت أو مرجان مشوي',
      '30 جم صدور دجاج مخلية منزوعة الجلد مشوية أو مسلوقة',
      '30 جم لحم أرانب بلدي مسلوق أو مشوي',
      '30 جم تونة قطع خفيفة مصفاة ومغسولة بالخل والليمون',
      '30 جم صدور ديك رومي فصوص مسلوقة أو مشوية',
      '30 جم جمبري مسلوق أو مشوي بدون دهون',
      '30 جم لحم بتلو أحمر خالي الشحم تماماً',
      '30 جم كبدة مشوية خفيفة بمسحة زيت (باعتدال)',
      '2 بياض بيض كبير مسلوق',
    ],
    globalExamples: [
      '30g Skinless Grilled Chicken Breast',
      '30g Roasted Turkey Breast Slices',
      '30g White Fish Fillet (Cod, Tilapia, Seabass, Sole)',
      '30g Water-packed Canned Light Tuna (Drained)',
      '30g Boiled Shrimps / Prawns',
      '45g Low-fat Cottage Cheese',
      '2 Large Egg Whites',
      '30g Lean Veal / Eye of Round Steak (Trimmed)',
    ],
    examples: [
      '45 جم جبن قريش فلاحي مصري (2 ملعقة كبيرة)',
      '30 جم صدور دجاج مشوية/مسلوقة بدون جلد',
      '30 جم سمك بلطي أو قشر بياض مشوي بالردة',
      '30 جم تونة لايت مصفاة من الزيت',
      '30 جم صدور رومي مشوية',
      '30 جم جمبري مسلوق أو مشوي',
      '30 جم لحم أرانب أو بتلو أحمر',
      '2 بياض بيض مسلوق',
      '30 جم كبدة مشوية خفيفة',
    ],
    tips: 'البروتين الخفيف ممتاز لبناء الألياف العضلية ورفع الحرق الأيضي وتقليل الدهون الكبدية والحشوية.',
  },
  {
    id: 'med_protein',
    nameAr: 'البروتين متوسط الدهون (Medium-Fat Protein)',
    shortName: 'بروتين متوسط',
    category: 'protein',
    carbsGrams: 0,
    proteinGrams: 7,
    fatsGrams: 5,
    calories: 75,
    icon: '🥩',
    colorClass: {
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      text: 'text-rose-800 dark:text-rose-200',
      border: 'border-rose-200 dark:border-rose-800/80',
      badge: 'bg-rose-100 text-rose-900 dark:bg-rose-900/60 dark:text-rose-200',
    },
    portionUnit: 'حصة (30 جم مطبوخ = 7 جم بروتين + 5 جم دهن = ~75 ك.س)',
    clinicalStandard: 'قوائم التغذية الإكلينيكية (ADA / NNI Medium-Fat Protein)',
    items: [
      { id: 'whole_egg', nameAr: 'بيض كامل مسلوق أو أومليت خفيف', servingAr: '1 بيضة كاملة كبيرة', tags: ['egg', 'staple', 'rich-choline'] },
      { id: 'chicken_thigh', nameAr: 'أوراك دجاج بدون جلد أو دجاج مسلوق بالجلد خفيف', servingAr: '30 جم مطبوخ', tags: ['poultry'] },
      { id: 'beef_regular', nameAr: 'لحم كنداك أحمر مسلوق أو مشوي (موزة / فلتو)', servingAr: '30 جم مطبوخ', tags: ['meat', 'staple', 'egyptian'] },
      { id: 'minced_meat', nameAr: 'لحم مفروم متوسط الدهن عصاج أو كفتة حاتي بيتي', servingAr: '30 جم مطبوخ', tags: ['meat', 'egyptian'] },
      { id: 'lamb', nameAr: 'لحم ضأن / خروف متوسط الدهن مسلوق أو مشوي', servingAr: '30 جم مطبوخ', tags: ['meat', 'fatty'] },
      { id: 'oily_fish', nameAr: 'سمك بوري / سلمون / ماكريل / سردين بلدي مشوي بالردة والليمون', servingAr: '30 جم مطبوخ (غني بأوميجا-3)', tags: ['fish', 'omega3', 'egyptian'] },
      { id: 'liver_alex', nameAr: 'كبدة إسكندراني بثوم وفلفل بمسحة زيت خفيفة', servingAr: '30 جم مطبوخ', tags: ['meat', 'egyptian'] },
      { id: 'basturma', nameAr: 'بسطرمة بلدي منزوعة الشحم والملح الزائد', servingAr: 'شريحة رفيعة ≈ 25–30 جم', tags: ['egyptian', 'processed', 'high-sodium'] },
      { id: 'feta_cheese', nameAr: 'جبنة فيتا قليلة الدسم والملح أو جبن دمياطي لايت', servingAr: '≈ 30 جم (شريحة بحجم علبة كبريت)', tags: ['dairy', 'cheese', 'egyptian'] },
      { id: 'mozzarella_light', nameAr: 'جبنة موزاريلا لايت / حلوم خفيف', servingAr: '≈ 30 جم مبشور أو شريحة', tags: ['dairy', 'cheese'] },
      { id: 'rumi_cheese', nameAr: 'جبنة رومي / تركي كاملة الدسم (باعتدال للصوديوم والدهن)', servingAr: '≈ 20–30 جم', tags: ['egyptian', 'cheese', 'high-fat'] },
      { id: 'taameya_fried', nameAr: 'طعمية مقلية عادية (تحسب بروتين + نشا + دهن)', servingAr: '1 قرص طعمية مقلي متوسط', tags: ['egyptian', 'fried'] },
      { id: 'hawawshi_item', nameAr: 'حواوشي لحم بلدي (يفكك كحصص)', servingAr: 'سدس رغيف حواوشي ≈ 30 جم لحم + عيش', tags: ['egyptian', 'mixed'] },
    ],
    egyptianExamples: [
      '1 حبة بيض كاملة مسلوقة أو أومليت بنقطة زيت',
      '30 جم لحم كنداك أحمر مسلوق أو مشوي',
      '30 جم كفتة حاتي مشوية بيتي بمفروم قليل الدهن',
      '30 جم سمك بوري أو سلمون أو ماكريل أو سردين بلدي مشوي بالردة',
      '30 جم كبدة إسكندراني بالثوم والفلفل بمسحة زيت خفيفة',
      '30 جم جبنة فيتا لايت أو جبن دمياطي قليل الملح',
      '30 جم أوراك دجاج منزوعة الجلد مشوية',
      'شريحة بسطرمة رفيعة (30 جم) منزوعة الملح الزائد',
      '20–30 جم جبنة رومي بلدي (باعتدال)',
    ],
    globalExamples: [
      '1 Whole Large Egg (Boiled or Poached)',
      '30g Lean Beef Tenderloin / Sirloin Steak',
      '30g Grilled Salmon / Mackerel Fillet (Rich in Omega-3)',
      '30g Low-fat Feta Cheese or Halloumi Light',
      '30g Part-skim Mozzarella Cheese',
      '30g Beef Liver (Grilled with Garlic & Herbs)',
      '30g Skinless Chicken Thigh (Cooked)',
    ],
    examples: [
      '1 حبة بيض كاملة مسلوقة',
      '30 جم لحم بقري أحمر مسلوق أو مشوي',
      '30 جم سمك بوري أو سلمون أو ماكريل مشوي',
      '30 جم كفتة لحم مشوية قليلة الدهن',
      '30 جم جبنة فيتا لايت أو موزاريلا',
      '30 جم كبدة إسكندراني مشوية',
      '30 جم أوراك دجاج بدون جلد',
    ],
    tips: 'تحتوي على أحماض أوميجا-3 الأساسية والكولين للذاكرة والأعصاب والهرمونات مع دهون صحية غير مشبعة.',
  },
  {
    id: 'vegetables',
    nameAr: 'الخضروات غير النشوية الطازجة والمطبوخة',
    shortName: 'خضار',
    category: 'veg',
    carbsGrams: 5,
    proteinGrams: 2,
    fatsGrams: 0,
    calories: 25,
    icon: '🥦',
    colorClass: {
      bg: 'bg-teal-50 dark:bg-teal-950/40',
      text: 'text-teal-800 dark:text-teal-200',
      border: 'border-teal-200 dark:border-teal-800/80',
      badge: 'bg-teal-100 text-teal-900 dark:bg-teal-900/60 dark:text-teal-200',
    },
    portionUnit: 'حصة (1 كوب طازج نيء أو ½ كوب مطبوخ = 25 ك.س)',
    clinicalStandard: 'قوائم الخضار غير النشوي (ADA / NNI Non-starchy Veg)',
    items: [
      { id: 'molokhia', nameAr: 'ملوخية مصرية خضراء مطبوخة خفيفة', servingAr: '½ كوب مطبوخ', tags: ['egyptian', 'staple', 'low-carb'] },
      { id: 'spinach', nameAr: 'سبانخ / سلق مطبوخ أو طازج', servingAr: '½ كوب مطبوخ أو 1 كوب نيء', tags: ['greens', 'rich-iron'] },
      { id: 'gargeer', nameAr: 'جرجير فلاحي طازج', servingAr: '1 كوب أوراق طازجة', tags: ['egyptian', 'greens', 'free'] },
      { id: 'lettuce', nameAr: 'خس بلدي / كابوتشا / لولو روسو', servingAr: '1 كوب مفروم', tags: ['greens', 'free'] },
      { id: 'cabbage', nameAr: 'كرنب بلدي / سلطة كرنب بدون مايونيز', servingAr: '½ كوب مطبوخ أو 1 كوب طازج', tags: ['egyptian', 'cruciferous'] },
      { id: 'cauliflower', nameAr: 'قرنبيط مسلوق أو مشوي بالفرن', servingAr: '½ كوب مطبوخ أو 1 كوب زهرات', tags: ['cruciferous'] },
      { id: 'broccoli', nameAr: 'بروكلي مسلوق على البخار أو سوتيه', servingAr: '½ كوب مطبوخ أو 1 كوب زهرات', tags: ['cruciferous', 'global'] },
      { id: 'zucchini', nameAr: 'كوسة مطبوخة ني في ني أو مشوية', servingAr: '½ كوب مطبوخ (أو 1 حبة متوسطة)', tags: ['egyptian', 'staple', 'low-calorie'] },
      { id: 'eggplant', nameAr: 'باذنجان رومي مشوي بالفرن (بابا غنوج دايت)', servingAr: '½ كوب مطبوخ / مشوي', tags: ['egyptian', 'staple'] },
      { id: 'okra', nameAr: 'بامية مصرية مطبوخة ني في ني بالثوم والليمون', servingAr: '½ كوب مطبوخ', tags: ['egyptian', 'staple', 'high-fiber'] },
      { id: 'green_beans', nameAr: 'فاصوليا خضراء مطبوخة / سوتيه', servingAr: '½ كوب مطبوخ', tags: ['staple'] },
      { id: 'tomato', nameAr: 'طماطم بلدي طازجة أو صلصة طماطم بيتي خفيفة', servingAr: '1 كوب طازج مكعبات أو ½ كوب مطبوخ', tags: ['staple'] },
      { id: 'cucumber', nameAr: 'خيار بلدي طازج بقشره', servingAr: '1 كوب شرائح (حوالي 1-2 حبة متوسطة)', tags: ['staple', 'free'] },
      { id: 'bell_pepper', nameAr: 'فلفل رومي ألوان / فلفل حار بلدي', servingAr: '1 كوب شرائح (غني بفيتامين C)', tags: ['staple'] },
      { id: 'onion', nameAr: 'بصل أحمر / أبيض / بصل أخضر بلدي', servingAr: '½ كوب مفروم أو 1 حبة متوسطة', tags: ['egyptian', 'flavor'] },
      { id: 'carrot', nameAr: 'جزر أصفر طازج أو مسلوق خفيف', servingAr: '½ كوب مطبوخ أو 1 حبة متوسطة طازجة', tags: ['rich-vitA'] },
      { id: 'beet', nameAr: 'شمندر (بنجر) مسلوق قليل الملح', servingAr: '½ كوب شرائح مسلوقة', tags: ['egyptian', 'antioxidants'] },
      { id: 'radish', nameAr: 'فجل بلدي أحمر / أبيض', servingAr: '1 كوب شرائح طازجة', tags: ['egyptian', 'free'] },
      { id: 'parsley_herbs', nameAr: 'بقدونس / شبت / كزبرة خضراء', servingAr: '1 كوب مفروم طازج (أو حسب الرغبة)', tags: ['egyptian', 'herbs', 'free'] },
      { id: 'regla', nameAr: 'رجلة خضراء مصرية طازجة أو مطبوخة', servingAr: '1 كوب طازج (غنية بأوميجا-3 النباتي)', tags: ['egyptian', 'rural'] },
      { id: 'khobeza', nameAr: 'خبيزة مصرية مطبوخة بالسلق', servingAr: '½ كوب مطبوخ', tags: ['egyptian', 'rural'] },
      { id: 'pumpkin', nameAr: 'قرع عسلي سادة مسلوق أو مشوي (بدون سكر)', servingAr: '½ كوب مطبوخ', tags: ['low-calorie'] },
      { id: 'grape_leaves', nameAr: 'ورق عنب مسلوق (الورق نفسه بدون حشو أرز)', servingAr: '½ كوب مسلوق (أو 6-8 ورقات)', tags: ['egyptian', 'greens'] },
      { id: 'mushroom', nameAr: 'فطر (مشروم) طازج سوتيه أو مسلوق', servingAr: '½ كوب مطبوخ أو 1 كوب شرائح طازجة', tags: ['global', 'high-protein-veg'] },
      { id: 'artichoke', nameAr: 'خرشوف بلدي مسلوق أو بالفرن', servingAr: '½ كوب مسلوق (قلب 1-2 خرشوفة)', tags: ['egyptian', 'liver-health'] },
      { id: 'celery', nameAr: 'كرفس فرنسي أو بلدي طازج', servingAr: '1 كوب شرائح', tags: ['greens', 'free'] },
      { id: 'pickles', nameAr: 'مخللات بلدية خفيفة (خيار/لفت/ليمون)', servingAr: 'كمية صغيرة مع مراعاة ضغط الدم واحتباس السوائل', tags: ['egyptian', 'high-sodium'] },
    ],
    egyptianExamples: [
      '1 كوب طبق سلطة خضراء بلدي طازجة (خيار، طماطم، جرجير، خس، فلفل رومي، بقدونس)',
      '½ كوب ملوخية مصرية خضراء خفيفة',
      '½ كوب كوسة أو بامية مطبوخة ني في ني بالليمون والثوم',
      '½ كوب باذنجان رومي مشوي بالفرن (بابا غنوج دايت بدون طحينة مفرطة)',
      '½ كوب سبانخ أو فاصوليا خضراء مطبوخة بالصلصة الخفيفة',
      '½ كوب قرنبيط أو كرنب مسلوق أو مشوي بالفرن',
      '1 كوب جرجير وخس بلدي وخيار طازج',
      '½ كوب خرشوف بلدي مسلوق أو شوربة خضار مشكلة',
      '½ كوب خبيزة أو رجلة فلاحي طازجة',
      '½ كوب بنجر (شمندر) مسلوق أو جزر طازج',
    ],
    globalExamples: [
      '1 Cup Raw Mixed Salad Greens (Spinach, Lettuce, Arugula, Cucumbers)',
      '½ Cup Cooked Steamed Broccoli or Cauliflower Florets',
      '½ Cup Cooked Green Beans / Zucchini / Asparagus',
      '1 Cup Fresh Sliced Mushrooms (Sautéed without oil)',
      '½ Cup Cooked Tomato Purée (No added sugar)',
      '1 Cup Chopped Bell Peppers (Red, Yellow, Green)',
      '½ Cup Steamed Spinach / Swiss Chard / Kale',
    ],
    examples: [
      '1 كوب سلطة خضراء بلدي طازجة مشكلة',
      '½ كوب ملوخية مصرية خضراء',
      '½ كوب كوسة أو بامية مطبوخة ني في ني',
      '½ كوب باذنجان مشوي بالثوم والليمون',
      '½ كوب فاصوليا خضراء أو سبانخ مطبوخة',
      '1 كوب بروكلي أو قرنبيط مسلوق',
      '1 كوب خيار وجرجير وخس طازج',
      '½ كوب خرشوف مسلوق أو سوتيه مشكل',
    ],
    tips: 'الخضروات الورقية الخضراء حرة السعرات تقريباً، غنية بالبوتاسيوم والألياف والإنزيمات الهاضمة التي تمنع احتباس السوائل وتريح القولون.',
  },
  {
    id: 'fruits',
    nameAr: 'الفواكه الطازجة والمجففة',
    shortName: 'فواكه',
    category: 'fruit',
    carbsGrams: 15,
    proteinGrams: 0,
    fatsGrams: 0,
    calories: 60,
    icon: '🍎',
    colorClass: {
      bg: 'bg-orange-50 dark:bg-orange-950/40',
      text: 'text-orange-800 dark:text-orange-200',
      border: 'border-orange-200 dark:border-orange-800/80',
      badge: 'bg-orange-100 text-orange-900 dark:bg-orange-900/60 dark:text-orange-200',
    },
    portionUnit: 'حصة فاكهة (15 جم كارب فواكه طبيعي = 60 ك.س)',
    clinicalStandard: 'قوائم الفواكه المعتمدة (ADA / Egyptian NNI Fruit Exchange)',
    items: [
      { id: 'apple', nameAr: 'تفاح بلدي أو مستورد', servingAr: '1 حبة صغيرة إلى متوسطة (≈ 120 جم)', tags: ['staple', 'high-fiber'] },
      { id: 'pear', nameAr: 'كمثرى بلدي أو سكري', servingAr: '1 حبة صغيرة إلى متوسطة', tags: ['staple', 'high-fiber'] },
      { id: 'orange', nameAr: 'برتقال بلدي / سكري / أبو صرة', servingAr: '1 حبة متوسطة (≈ 150 جم)', tags: ['egyptian', 'rich-vitC', 'staple'] },
      { id: 'mandarin', nameAr: 'يوسفي (أفيندي / مندرين)', servingAr: '1–2 حبة حسب الحجم', tags: ['egyptian', 'rich-vitC'] },
      { id: 'banana', nameAr: 'موز بلدي أو صومالي', servingAr: '½ حبة كبيرة أو 1 حبة صغيرة (≈ 90 جم)', tags: ['staple', 'rich-potassium'] },
      { id: 'mango', nameAr: 'مانجو إسماعيلاوي (فص / عويس / زبدية)', servingAr: '½ حبة متوسطة أو ½ كوب شرائح (≈ 100 جم)', tags: ['egyptian', 'sweet'] },
      { id: 'guava', nameAr: 'جوافة بلدي طازجة', servingAr: '1 حبة متوسطة (غنية جداً بفيتامين C والألياف)', tags: ['egyptian', 'rich-vitC', 'staple'] },
      { id: 'pomegranate', nameAr: 'رمان منفلوطي أحمر', servingAr: '½ حبة متوسطة أو ½ كوب فصوص بذور', tags: ['egyptian', 'antioxidants'] },
      { id: 'grapes', nameAr: 'عنب بناتي أبيض أو أحمر أو أسود', servingAr: '12–15 حبة عنب', tags: ['staple'] },
      { id: 'watermelon', nameAr: 'بطيخ أحمر صيفي بلدي', servingAr: '1 إلى 1¼ كوب مكعبات (أو شريحة متوسطة ≈ 200 جم بالقشر)', tags: ['egyptian', 'summer', 'hydrating'] },
      { id: 'cantaloupe', nameAr: 'شمام / قاوون / كانتالوب', servingAr: '1 كوب مكعبات', tags: ['summer', 'hydrating'] },
      { id: 'strawberry', nameAr: 'فراولة بلدي طازجة', servingAr: '1¼ كوب فراولة كاملة (≈ 8–10 حبات)', tags: ['low-glycemic', 'rich-vitC'] },
      { id: 'fig_fresh', nameAr: 'تين طازج برشومي', servingAr: '2 حبة متوسطة', tags: ['egyptian', 'summer'] },
      { id: 'apricot', nameAr: 'مشمش بلدي طازج / حموي', servingAr: '3–4 حبات مشمش', tags: ['egyptian', 'summer'] },
      { id: 'peach', nameAr: 'خوخ بلدي / برقوق طازج', servingAr: '1 حبة متوسطة (خوخ) أو 2 حبة صغيرة (برقوق)', tags: ['egyptian', 'summer'] },
      { id: 'dates', nameAr: 'تمر جاف / بلح رطب / أمهات / سيوي / زغلول', servingAr: '3 حبات تمر أو رطب (≈ 20–25 جم)', tags: ['egyptian', 'staple', 'energy'] },
      { id: 'raisins', nameAr: 'زبيب بناتي مجفف', servingAr: '2 ملعقة كبيرة (≈ 20 جم)', tags: ['dried-fruit'] },
      { id: 'cactus_fruit', nameAr: 'تين شوكي بلدي طازج', servingAr: '1–2 حبة مقشرة', tags: ['egyptian', 'summer', 'high-fiber'] },
      { id: 'kiwi', nameAr: 'كيوي طازج', servingAr: '1 حبة كبيرة أو 2 صغيرة', tags: ['global', 'rich-vitC'] },
      { id: 'pineapple', nameAr: 'أناناس طازج مقطع', servingAr: '¾–1 كوب مكعبات', tags: ['global', 'digestive-enzymes'] },
      { id: 'papaya', nameAr: 'باباظ طازج مقطع', servingAr: '1 كوب مكعبات', tags: ['digestive-enzymes'] },
      { id: 'prunes', nameAr: 'قراصيا / تين مجفف / مشمشية (ياميش رمضان)', servingAr: '2 حبة مجففة متوسطة', tags: ['egyptian', 'ramadan', 'dried-fruit'] },
    ],
    egyptianExamples: [
      '1 حبة برتقال بلدي أو 2 يوسفي (أفيندي)',
      '1 حبة جوافة بلدي متوسطة (عالية بفيتامين C والألياف)',
      '1 شريحة بطيخ أحمر كبيرة (1¼ كوب مكعبات)',
      '1 كوب كانتالوب أو شمام إسماعيلاوي مقطع',
      '½ حبة مانجو متوسطة أو ½ كوب شرائح',
      '½ حبة رمان بلدي (½ كوب فصوص رمان)',
      '2 حبة تين برشومي طازج',
      '3 حبات بلح رطب أو تمر سوي أو أمهات',
      '1–2 حبة تين شوكي بلدي طازج',
      '3–4 حبات مشمش بلدي أو 1 حبة خوخ/برقوق',
      '1 حبة تفاح أو كمثرى بلدي أو ½ حبة موز',
      '12–15 حبة عنب بناتي',
    ],
    globalExamples: [
      '1 Medium Apple (120g)',
      '1 Small Banana (90g) or ½ Large Banana',
      '1¼ Cup Fresh Whole Strawberries',
      '¾ Cup Fresh Blueberries / Raspberries',
      '¾–1 Cup Fresh Diced Pineapple',
      '1–2 Fresh Kiwi Fruits',
      '2 Tablespoons Dried Raisins / Cranberries',
      '2 Dried Prunes or Dried Figs',
    ],
    examples: [
      '1 حبة تفاح أو كمثرى متوسطة',
      '1 حبة برتقال أو 2 يوسفي',
      '1 حبة موز صغيرة أو ½ كبيرة',
      '1 حبة جوافة بلدي متوسطة',
      '1¼ كوب فراولة طازجة (8-10 حبات)',
      '1 كوب مكعبات بطيخ أو شمام',
      '2 حبة تين طازج برشومي',
      '3 حبات تمر أو رطب أسود',
      '1–2 حبة تين شوكي',
      '¾ كوب أناناس أو 1 حبة كيوي كبيرة',
      '½ حبة رمان أو 12 حبة عنب',
    ],
    tips: 'يفضل دائماً تناول الفاكهة كاملة مع قشرتها وأليافها بدلاً من عصرها للحفاظ على الشعور بالشبع وتجنب ارتفاع سكر الدم المفاجئ.',
  },
  {
    id: 'dairy',
    nameAr: 'الحليب والألبان والزبادي والأجبان اللبنية',
    shortName: 'ألبان',
    category: 'dairy',
    carbsGrams: 12,
    proteinGrams: 8,
    fatsGrams: 3,
    calories: 110,
    icon: '🥛',
    colorClass: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      text: 'text-blue-800 dark:text-blue-200',
      border: 'border-blue-200 dark:border-blue-800/80',
      badge: 'bg-blue-100 text-blue-900 dark:bg-blue-900/60 dark:text-blue-200',
    },
    portionUnit: 'حصة ألبان (1 كوب حليب 240 مل أو علبة زبادي 170 جم = 110-120 ك.س)',
    clinicalStandard: 'قوائم الحليب قليل ومنزوع الدسم (ADA / NNI Low-Fat Dairy Exchange)',
    items: [
      { id: 'whole_milk', nameAr: 'لبن حليب بلدي أو معبأ كامل الدسم', servingAr: '1 كوب (240 مل) — دهنه أعلى (≈ 150 ك.س)', tags: ['dairy', 'full-fat'] },
      { id: 'lowfat_milk', nameAr: 'لبن حليب قليل الدسم (1.5%) أو خالي الدسم', servingAr: '1 كوب (240 مل)', tags: ['dairy', 'low-fat', 'staple'] },
      { id: 'yogurt_plain', nameAr: 'زبادي بلدي بدون وش أو زبادي طبيعي لايت', servingAr: '1 علبة متوسطة (170 جم / ¾–1 كوب)', tags: ['dairy', 'probiotic', 'staple'] },
      { id: 'greek_yogurt', nameAr: 'زبادي يوناني لايت عالي البروتين', servingAr: '¾ كوب (≈ 150 جم)', tags: ['dairy', 'high-protein', 'global'] },
      { id: 'rayeb', nameAr: 'لبن رايب بلدي أو معبأ قليل/خالي الدسم', servingAr: '1 كوب (200–240 مل)', tags: ['egyptian', 'dairy', 'probiotic', 'staple'] },
      { id: 'labneh', nameAr: 'لبنة قليلة الدسم', servingAr: '2 ملعقة كبيرة (≈ 40 جم)', tags: ['dairy', 'mediterranean'] },
      { id: 'qareesh_dairy', nameAr: 'جبنة قريش فلاحي طبيعية', servingAr: '¼–½ كوب (تحسب كبروتين خفيف أو ألبان حسب التوزيع)', tags: ['egyptian', 'dairy', 'staple'] },
      { id: 'white_cheese', nameAr: 'جبنة بيضاء طبيعية قليلة الملح والدسم', servingAr: '≈ 30 جم (شريحة بحجم علبة كبريت)', tags: ['egyptian', 'dairy'] },
      { id: 'domiati', nameAr: 'جبنة دمياطي / براميلي قليلة الدسم (ملح أعلى)', servingAr: '≈ 30 جم', tags: ['egyptian', 'high-sodium'] },
      { id: 'rumi_cheese_dairy', nameAr: 'جبنة رومي / تركي (دهون وأملاح أعلى)', servingAr: '≈ 20–30 جم (توزع كبروتين متوسط + دهن)', tags: ['egyptian', 'high-fat'] },
      { id: 'mish', nameAr: 'مش فلاحي مختمر (نكهة قوية وملح عالي)', servingAr: 'كمية صغيرة جداً للتذوق', tags: ['egyptian', 'high-sodium', 'traditional'] },
      { id: 'kishk_dairy', nameAr: 'كشك مصري مطبوخ باللبن', servingAr: 'حسب الوصفة (نشا + ألبان)', tags: ['egyptian', 'traditional'] },
      { id: 'soy_milk_fortified', nameAr: 'حليب صويا غير محلى مدعم بالكالسيوم', servingAr: '1 كوب (240 مل)', tags: ['dairy-free', 'vegan'] },
      { id: 'almond_milk_fortified', nameAr: 'حليب لوز غير محلى مدعم', servingAr: '1.5 كوب (منخفض البروتين)', tags: ['dairy-free', 'vegan'] },
    ],
    egyptianExamples: [
      '1 كوب لبن حليب بقري مغلي ومنزوع الوش (240 مل)',
      '1 كوب لبن رايب بلدي طازج قليل الدسم (200-240 مل)',
      '1 علبة زبادي بلدي بدون وش أو زبادي لايت (170 جم)',
      '¾ كوب زبادي يوناني لايت طبيعي (150 جم)',
      '¼–½ كوب جبنة قريش فلاحي مصري',
      '30 جم جبنة بيضاء أو دمياطي لايت قليلة الملح',
    ],
    globalExamples: [
      '1 Cup Skim / 1% Low-Fat Cow Milk (240ml)',
      '1 Container Low-Fat Plain Yogurt (170g / 6oz)',
      '¾ Cup Plain Non-Fat Greek Yogurt (150g)',
      '1 Cup Plain Fortified Soy Milk (Unsweetened)',
      '1 Cup Kefir / Probiotic Fermented Milk (200ml)',
      '2 Tablespoons Low-Fat Labneh (40g)',
    ],
    examples: [
      '1 كوب حليب قليل أو خالي الدسم (240 مل)',
      '1 علبة زبادي طبيعي لايت (170 جم)',
      '1 كوب لبن رايب طازج خالي الدسم',
      '¾ كوب زبادي يوناني لايت عالي البروتين',
      '1 كوب حليب صويا أو لوز غير محلى مدعم',
    ],
    tips: 'الزبادي واللبن الرايب واللبنة غنية بالبروبيوتيك والخمائر النافعة التي تدعم فلورا الأمعاء وتمنع الانتفاخات وتحسن الهضم والامتصاص.',
  },
  {
    id: 'fats',
    nameAr: 'الدهون الصحية والزيوت والمكسرات والبذور',
    shortName: 'دهون صحية',
    category: 'fat',
    carbsGrams: 0,
    proteinGrams: 0,
    fatsGrams: 5,
    calories: 45,
    icon: '🥑',
    colorClass: {
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      text: 'text-purple-800 dark:text-purple-200',
      border: 'border-purple-200 dark:border-purple-800/80',
      badge: 'bg-purple-100 text-purple-900 dark:bg-purple-900/60 dark:text-purple-200',
    },
    portionUnit: 'حصة دهون (5 جم دهون نقية = 45 ك.س)',
    clinicalStandard: 'قوائم الزيوت والدهون غير المشبعة الأحادية والمتعددة (ADA / NNI Fat Exchange)',
    items: [
      { id: 'olive_oil', nameAr: 'زيت زيتون بكر ممتاز نقي معصور على البارد', servingAr: '1 ملعقة صغيرة (5 مل = 5 جم)', tags: ['oil', 'monounsaturated', 'staple'] },
      { id: 'flaxseed_oil', nameAr: 'زيت حار مصري (زيت بذرة الكتان غني بأوميجا-3)', servingAr: '1 ملعقة صغيرة (5 مل)', tags: ['egyptian', 'oil', 'omega3', 'staple'] },
      { id: 'corn_oil', nameAr: 'زيت ذرة أو عباد شمس أو كانولا نقي', servingAr: '1 ملعقة صغيرة (5 مل)', tags: ['oil', 'polyunsaturated'] },
      { id: 'ghee', nameAr: 'سمن بلدي فلاحي طبيعي نقي', servingAr: '1 ملعقة صغيرة (5 جم)', tags: ['egyptian', 'saturated_natural'] },
      { id: 'butter', nameAr: 'زبدة فلاحي طبيعية نقية', servingAr: '1 ملعقة صغيرة (5 جم)', tags: ['egyptian', 'saturated_natural'] },
      { id: 'tahini', nameAr: 'طحينة سمسم بيضاء نقية (بدون دقيق مضاف)', servingAr: '1–2 ملعقة صغيرة (≈ 10 جم)', tags: ['egyptian', 'staple', 'sesame'] },
      { id: 'olives', nameAr: 'زيتون أخضر أو أسود مخلل قليل الملح', servingAr: '8–10 حبات متوسطة', tags: ['egyptian', 'mediterranean', 'staple'] },
      { id: 'avocado', nameAr: 'أفوكادو طازج مهروس', servingAr: '2 ملعقة كبيرة مهروس أو ⅛ حبة متوسطة (≈ 30 جم)', tags: ['global', 'monounsaturated'] },
      { id: 'peanuts', nameAr: 'فول سوداني مقشر محمص أو نيء غير مملح', servingAr: '10–20 حبة (≈ 10–12 جم)', tags: ['egyptian', 'nuts', 'staple'] },
      { id: 'almonds', nameAr: 'لوز نيء / كاجو / بندق غير مملح', servingAr: '6 حبات كاملة (≈ 10 جم)', tags: ['nuts', 'healthy'] },
      { id: 'walnuts', nameAr: 'عين جمل (جوز) كامل الحبة غني بأوميجا-3', servingAr: '2 حبة كاملة (4 أنصاف)', tags: ['nuts', 'omega3'] },
      { id: 'sesame', nameAr: 'سمسم أبيض أو محمص / بذور كتان مطحونة', servingAr: '1 ملعقة كبيرة (≈ 10 جم)', tags: ['seeds', 'egyptian'] },
      { id: 'chia_seeds', nameAr: 'بذور شيا / بذور قرع عسلي (لب أبيض غير مملح)', servingAr: '1 ملعقة كبيرة ممتلئة', tags: ['seeds', 'egyptian', 'superfood'] },
      { id: 'sunflower_seeds', nameAr: 'لب سوري (بذور عباد شمس) مقشر غير مملح', servingAr: '1 ملعقة كبيرة ممتلئة', tags: ['seeds', 'egyptian'] },
      { id: 'eshta', nameAr: 'قشطة فلاحي بلدي طبيعية من وش اللبن', servingAr: '1 ملعقة صغيرة (5–8 جم)', tags: ['egyptian', 'traditional', 'saturated'] },
      { id: 'peanut_butter', nameAr: 'زبدة فول سوداني نقية 100% بدون سكر أو زيت مهدرج', servingAr: '1 ملعقة صغيرة ممتلئة (≈ 8–10 جم)', tags: ['nuts', 'staple'] },
    ],
    egyptianExamples: [
      '1 ملعقة صغيرة زيت زيتون بكر ممتاز (5 مل)',
      '1 ملعقة صغيرة زيت حار مصري (بذرة الكتان)',
      '1–2 ملعقة صغيرة طحينة سمسم بيضاء نقية',
      '1 ملعقة صغيرة سمن بلدي طبيعي أو زبدة فلاحي',
      '8 إلى 10 حبات زيتون أسود أو أخضر قليل الملح',
      '15–20 حبة فول سوداني محمص غير مملح',
      '1 ملعقة كبيرة لب أبيض مقشر (بذور قرع عسلي) أو لب سوري',
      '1 ملعقة كبيرة سمسم أو بذور كتان مطحونة',
      '1 ملعقة صغيرة قشطة بلدي طبيعية',
    ],
    globalExamples: [
      '1 Teaspoon Extra Virgin Olive Oil (5ml)',
      '6 Raw Whole Almonds or Cashews or Hazelnuts (10g)',
      '2 Whole English Walnuts (4 Halves)',
      '2 Tablespoons Mashed Avocado (or ⅛ Medium Avocado ~30g)',
      '1 Tablespoon Whole Chia Seeds or Ground Flaxseeds',
      '1 Teaspoon Pure Peanut Butter or Almond Butter (No added sugar)',
      '8–10 Pitted Kalamata / Green Olives',
    ],
    examples: [
      '1 ملعقة صغيرة زيت زيتون بكر ممتاز (5 مل)',
      '1 ملعقة صغيرة زيت حار (بذر الكتان) أو زيت ذرة',
      '1–2 ملعقة صغيرة طحينة سمسم بيضاء نقية',
      '6 حبات لوز أو كاجو أو بندق نيء (10 جم)',
      '2 حبة عين جمل كاملة (جوز)',
      '15-20 حبة فول سوداني محمص غير مملح',
      '⅛ حبة أفوكادو متوسطة (30 جم)',
      '1 ملعقة كبيرة بذور شيا أو بذر كتان أو لب أبيض',
      '8-10 حبات زيتون أسود أو أخضر قليل الملح',
      '1 ملعقة صغيرة سمن بلدي طبيعي أو زبدة فلاحي',
    ],
    tips: 'الدهون الصحية غير المشبعة ضرورية لامتصاص الفيتامينات الذائبة في الدهون (A, D, E, K) وتخليق الهرمونات الحيوية والشعور بالشبع طويل المدى.',
  },
];

export interface MealExchangeTotals {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
}

/**
 * Calculates total macros & calories from exchange quantities for a single meal
 */
export function calculateMealExchangeMacros(exchanges?: Record<string, number>): MealExchangeTotals {
  if (!exchanges) {
    return { calories: 0, proteinGrams: 0, carbsGrams: 0, fatsGrams: 0 };
  }

  let calories = 0;
  let proteinGrams = 0;
  let carbsGrams = 0;
  let fatsGrams = 0;

  FOOD_EXCHANGE_GROUPS.forEach((group) => {
    const qty = exchanges[group.id] || 0;
    if (qty > 0) {
      calories += group.calories * qty;
      proteinGrams += group.proteinGrams * qty;
      carbsGrams += group.carbsGrams * qty;
      fatsGrams += group.fatsGrams * qty;
    }
  });

  return {
    calories: Math.round(calories),
    proteinGrams: Math.round(proteinGrams),
    carbsGrams: Math.round(carbsGrams),
    fatsGrams: Math.round(fatsGrams),
  };
}

/**
 * Calculates cumulative exchange counts and macros across all meals in a plan draft
 */
export function calculatePlanTotalExchanges(meals: Array<{ exchanges?: Record<string, number> }>): {
  totalExchanges: Record<string, number>;
  totals: MealExchangeTotals;
} {
  const totalExchanges: Record<string, number> = {};

  FOOD_EXCHANGE_GROUPS.forEach((g) => {
    totalExchanges[g.id] = 0;
  });

  meals.forEach((m) => {
    if (m.exchanges) {
      Object.entries(m.exchanges).forEach(([groupId, qty]) => {
        if (typeof qty === 'number' && qty > 0) {
          totalExchanges[groupId] = (totalExchanges[groupId] || 0) + qty;
        }
      });
    }
  });

  const totals = calculateMealExchangeMacros(totalExchanges);

  return { totalExchanges, totals };
}

/**
 * Smart generator that turns exchange allocations into readable Arabic meal text & 3 structured realistic alternatives
 */
export function generateMealContentFromExchanges(exchanges?: Record<string, number>): {
  primaryItems: string;
  alternatives: string[];
} {
  if (!exchanges || Object.values(exchanges).every((v) => !v || v <= 0)) {
    return {
      primaryItems: '',
      alternatives: [],
    };
  }

  // 1. Primary Set (Classic Balanced / مصري متوازن)
  const primaryParts: string[] = [];
  // 2. Alt 1 Set (Quick & Fit / عملي وصحي)
  const alt1Parts: string[] = [];
  // 3. Alt 2 Set (High Fiber & Satiety / غني بالألياف والشبع)
  const alt2Parts: string[] = [];
  // 4. Alt 3 Set (Traditional Variety / تشكيلة متنوعة)
  const alt3Parts: string[] = [];

  FOOD_EXCHANGE_GROUPS.forEach((group) => {
    const qty = exchanges[group.id] || 0;
    if (qty <= 0) return;

    if (group.id === 'starches') {
      if (qty === 0.5) {
        primaryParts.push('¼ رغيف بلدي صغير');
        alt1Parts.push('1 كعكة أرز (Rice Cake)');
        alt2Parts.push('1.5 ملعقة كبيرة شوفان جاف');
        alt3Parts.push('50 جم بطاطس مسلوقة');
      } else if (qty === 1) {
        primaryParts.push('¼ رغيف بلدي كبير (أو ½ صغير ≈ 30 جم)');
        alt1Parts.push('1 شريحة توست أسمر كامل الحبوب');
        alt2Parts.push('½ كوب شوفان مطبوخ أو 3 م.ك شوفان جاف');
        alt3Parts.push('⅓ كوب أرز مصري مسلوق (3 م.ك)');
      } else if (qty === 2) {
        primaryParts.push('½ رغيف بلدي كبير كامل (أو 1 صغير)');
        alt1Parts.push('2 شريحة توست أسمر حبوب كاملة');
        alt2Parts.push('1 كوب شوفان مطبوخ (أو 6 ملاعق شوفان)');
        alt3Parts.push('6 ملاعق كبيرة أرز مطبوخ أو مكرونة أو فريك');
      } else {
        primaryParts.push(`${qty / 2} رغيف بلدي كبير (${qty} حصص نشويات)`);
        alt1Parts.push(`${qty} شرائح توست أسمر`);
        alt2Parts.push(`${qty * 3} ملاعق كبيرة أرز أو مكرونة مسلوقة`);
        alt3Parts.push(`${qty * 100} جم بطاطس مسلوقة أو بطاطا حلوة مشوية`);
      }
    } else if (group.id === 'lean_protein') {
      const grams = Math.round(qty * 30);
      const cottageGrams = Math.round(qty * 45);

      if (qty <= 1) {
        primaryParts.push(`${cottageGrams} جم جبن قريش فلاحي مصري`);
        alt1Parts.push(`${grams} جم صدور دجاج مشوية بدون جلد`);
        alt2Parts.push(`${grams} جم سمك بلطي أو تونة مصفاة ومغسولة`);
        alt3Parts.push('2 بياض بيض كبير مسلوق');
      } else if (qty === 2) {
        primaryParts.push(`${grams} جم صدور دجاج مشوية بالليمون`);
        alt1Parts.push(`${cottageGrams} جم جبنة قريش بالزعتر وزيت خفيف`);
        alt2Parts.push(`${grams} جم سمك بلطي أو قشر بياض مشوي`);
        alt3Parts.push(`${grams} جم تونة مصفاة من الزيت`);
      } else {
        primaryParts.push(`${grams} جم صدور دجاج مخلية مشوية`);
        alt1Parts.push(`${grams} جم سمك بلطي أو قشر بياض مشوي بالردة`);
        alt2Parts.push(`${cottageGrams} جم جبن قريش طبيعي`);
        alt3Parts.push(`${grams} جم تونة لحم خفيف مصفاة`);
      }
    } else if (group.id === 'med_protein') {
      const grams = Math.round(qty * 30);
      if (qty === 1) {
        primaryParts.push('1 حبة بيض كاملة مسلوقة');
        alt1Parts.push('30 جم جبن فيتا لايت قليل الملح');
        alt2Parts.push('30 جم لحم بقر كنداك مشوي');
        alt3Parts.push('30 جم سمك بوري أو سلمون مشوي بالردة');
      } else if (qty === 2) {
        primaryParts.push('2 حبة بيض مسلوقة (أو أومليت خفيف)');
        alt1Parts.push('60 جم جبن فيتا لايت أو موزاريلا لايت');
        alt2Parts.push('60 جم لحم بقر كنداك أو كفتة مشوية بيتي');
        alt3Parts.push('60 جم سمك بوري أو سلمون مشوي بالردة والليمون');
      } else {
        primaryParts.push(`${grams} جم لحم بقر أحمر مسلوق أو مشوي`);
        alt1Parts.push(`${qty} حبات بيض مسلوق`);
        alt2Parts.push(`${grams} جم كفتة حاتي مشوية بيتي`);
        alt3Parts.push(`${grams} جم سمك بوري أو ماكريل مشوي`);
      }
    } else if (group.id === 'vegetables') {
      if (qty === 1) {
        primaryParts.push('1 طبق سلطة خضراء بلدي طازج (خيار، طماطم، جرجير)');
        alt1Parts.push('½ كوب ملوخية مصرية خفيفة');
        alt2Parts.push('½ كوب كوسة أو بامية مطبوخة ني في ني');
        alt3Parts.push('1 كوب خيار وخس وجرجير طازج');
      } else {
        primaryParts.push(`1 طبق سلطة خضراء كبير + ${qty - 1} حصة خضار سوتيه/مطبوخ`);
        alt1Parts.push(`1 طبق سلطة + ${qty - 1} حصة ملوخية أو بامية`);
        alt2Parts.push(`${qty * 0.5} كوب خضار مشكل مطبوخ بدون دهون`);
        alt3Parts.push(`طبق سلطة خضراء بلدي مع ${qty * 100} جم خضار مشوي بالفرن`);
      }
    } else if (group.id === 'fruits') {
      if (qty === 1) {
        primaryParts.push('1 حبة تفاح متوسطة (أو برتقالة)');
        alt1Parts.push('1 كوب فراولة طازجة أو جوافة بلدي');
        alt2Parts.push('1 حبة موز صغيرة أو 2 يوسفي');
        alt3Parts.push('1 شريحة بطيخ كبيرة (أو 2 تين برشومي أو 3 تمرات)');
      } else {
        primaryParts.push(`${qty} ثمار فاكهة طازجة (تفاح / برتقال / جوافة)`);
        alt1Parts.push(`${qty} كوب فراولة أو أناناس طازج`);
        alt2Parts.push(`${qty * 3} حبات بلح رطب أو تمر`);
        alt3Parts.push(`${qty} شريحة بطيخ أو كوب كانتالوب`);
      }
    } else if (group.id === 'dairy') {
      if (qty === 1) {
        primaryParts.push('1 كوب حليب قليل الدسم (240 مل)');
        alt1Parts.push('1 علبة زبادي طبيعي لايت (170 جم)');
        alt2Parts.push('1 كوب لبن رايب بلدي طازج');
        alt3Parts.push('¾ كوب زبادي يوناني لايت');
      } else {
        primaryParts.push(`${qty} كوب حليب قليل الدسم`);
        alt1Parts.push(`${qty} علبة زبادي لايت`);
        alt2Parts.push(`${qty} كوب لبن رايب طازج`);
        alt3Parts.push(`${qty * 0.75} كوب زبادي يوناني لايت`);
      }
    } else if (group.id === 'fats') {
      if (qty === 1) {
        primaryParts.push('1 ملعقة صغيرة زيت زيتون بكر');
        alt1Parts.push('1 ملعقة صغيرة طحينة سمسم بيضاء');
        alt2Parts.push('6 حبات لوز نيء (أو 2 حبة جوز)');
        alt3Parts.push('1 ملعقة صغيرة زيت حار (بذر الكتان)');
      } else if (qty === 2) {
        primaryParts.push('2 ملعقة صغيرة زيت زيتون');
        alt1Parts.push('2 ملعقة صغيرة طحينة بيضاء');
        alt2Parts.push('12 حبة لوز نيء (20 جم)');
        alt3Parts.push('¼ حبة أفوكادو متوسطة (40 جم)');
      } else {
        primaryParts.push(`${qty} ملاعق صغيرة زيت زيتون (${qty * 5} مل)`);
        alt1Parts.push(`${qty} ملاعق صغيرة طحينة سمسم بيضاء`);
        alt2Parts.push(`${qty * 6} حبات لوز أو مكسرات نية`);
        alt3Parts.push(`${qty * 15} حبة فول سوداني غير مملح`);
      }
    }
  });

  const primaryItems = primaryParts.join(' + ');
  const alternatives: string[] = [];

  if (alt1Parts.length > 0) {
    alternatives.push(alt1Parts.join(' + '));
  }
  if (alt2Parts.length > 0) {
    alternatives.push(alt2Parts.join(' + '));
  }
  if (alt3Parts.length > 0) {
    alternatives.push(alt3Parts.join(' + '));
  }

  return { primaryItems, alternatives };
}
