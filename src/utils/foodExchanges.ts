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
  examples: string[];
}

export const FOOD_EXCHANGE_GROUPS: ExchangeGroup[] = [
  {
    id: 'starches',
    nameAr: 'النشويات والخبز',
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
    portionUnit: 'حصة',
    examples: [
      '1/2 رغيف بلدي صغير',
      '1/2 كوب شوفان مطبوخ',
      '3 ملاعق كبيرة أرز مطبوخ',
      '3 ملاعق كبيرة معكرونة مطبوخة',
      '1 حبة بطاطس مسلوقة متوسطة (100ج)',
      '1/2 حبة بطاطا حلوة مشوية',
      '3 ملاعق كبيرة فريكة أو برغل',
      '2 كعكة أرز (Rice Cakes)',
      '1/3 كوب حمص أو عدس مطبوخ',
      '3 ملاعق كبيرة كينوا مطبوخة',
    ],
  },
  {
    id: 'lean_protein',
    nameAr: 'بروتين قليل الدهون',
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
    portionUnit: 'حصة (30ج)',
    examples: [
      '30ج صدور دجاج مشوية بدون جلد',
      '30ج سمك فيليه مشوي أو تونة مصفاة',
      '30ج جبن قريش (جبنة قريش)',
      '2 أبيض بيض (صفار منفصل)',
      '30ج أرانب أو رومي فصوص',
      '30ج جمبري أو كابوريا مسلوق',
    ],
  },
  {
    id: 'med_protein',
    nameAr: 'بروتين متوسط الدهون',
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
    portionUnit: 'حصة (30ج)',
    examples: [
      '1 حبة بيض كاملة مسلوقة',
      '30ج لحم بقر كنداك قليل الدسم',
      '30ج جبن فيتا لايت أو جبن موزاريلا لايت',
      '30ج سمك سلمون أو بوري مشوي',
      '30ج كبدة دجاج أو بقر مشوية',
    ],
  },
  {
    id: 'vegetables',
    nameAr: 'الخضروات الطازجة والمطبوخة',
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
    portionUnit: 'حصة',
    examples: [
      '1 كوب طبق سلطة طازج (خيار، طماطم، خس، جرجير، فلفل)',
      '1/2 كوب خضار مطبوخ (كوسة، فاصوليا خضراء، سبانخ، ملوخية)',
      '1 كوب بروكلي أو قرنبيط طازج/مسلوق',
      '1/2 كوب بامية أو باذنجان مشوي بدون زيت',
    ],
  },
  {
    id: 'fruits',
    nameAr: 'الفواكه الطازجة',
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
    portionUnit: 'حصة',
    examples: [
      '1 حبة تفاح متوسطة (120ج)',
      '1 حبة موز صغيرة (90ج)',
      '1 حبة برتقال أو يوسفي متوسطة',
      '1 كوب فراولة أو جوافة طازجة',
      '2 حبة تين طازج أو 2 حبة تمر متوسط',
      '1/2 كوب أناناس أو كيوي مقطع',
      '1 شريحة بطيخ أو شمام (150ج)',
    ],
  },
  {
    id: 'dairy',
    nameAr: 'الحليب والألبان والزبادي',
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
    portionUnit: 'حصة (كوب)',
    examples: [
      '1 كوب حليب قليل الدسم (200 مل)',
      '1 علبة زبادي طبيعي لايت (170ج)',
      '1 كوب لبن رايب طازج (200 مل)',
      '1/2 كوب كفير أو زبادي يوناني لايت',
    ],
  },
  {
    id: 'fats',
    nameAr: 'الدهون الصحية والزيوت',
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
    portionUnit: 'حصة',
    examples: [
      '1 ملعقة صغيرة زيت زيتون أو زيت ذرة (5 مل)',
      '6 حبات لوز أو لوز نيء (10ج)',
      '1/8 حبة أفوكادو متوسطة (20ج)',
      '1 ملعقة صغيرة طحينة بيضاء',
      '10 حبات زيتون أخضر/أسود صغير',
      '1 ملعقة صغيرة زبدة طبيعية أو سمن بلدي',
      '2 عين جمل (جوز)',
    ],
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
 * Smart generator that turns exchange allocations into readable Arabic meal text & 2-3 structured alternatives
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

  // Create 3 realistic menu variation sets
  const primaryParts: string[] = [];
  const alt1Parts: string[] = [];
  const alt2Parts: string[] = [];

  FOOD_EXCHANGE_GROUPS.forEach((group) => {
    const qty = exchanges[group.id] || 0;
    if (qty <= 0) return;

    const exList = group.examples;
    
    // Pick 3 distinct items or scale quantity
    if (group.id === 'starches') {
      if (qty === 1) {
        primaryParts.push(exList[0]); // 1/2 رغيف بلدي صغير
        alt1Parts.push(exList[1]);   // 1/2 كوب شوفان مطبوخ
        alt2Parts.push(exList[2]);   // 3 ملاعق كبيرة أرز مطبوخ
      } else if (qty === 2) {
        primaryParts.push('1 رغيف بلدي كامل');
        alt1Parts.push('1 كوب شوفان مطبوخ بالماء أو ألبان');
        alt2Parts.push('6 ملاعق كبيرة أرز مطبوخ أو معكرونة');
      } else {
        primaryParts.push(`${qty / 2} رغيف بلدي (${qty} حصص نشويات)`);
        alt1Parts.push(`${qty * 3} ملاعق كبيرة أرز أو معكرونة مطبوخة`);
        alt2Parts.push(`${qty * 100}ج بطاطس مسلوقة أو بطاطا حلوة`);
      }
    } else if (group.id === 'lean_protein') {
      const grams = qty * 30;
      primaryParts.push(`${grams}ج صدور دجاج مشوية`);
      alt1Parts.push(`${grams}ج سمك فيليه مشوي أو تونة مصفاة`);
      alt2Parts.push(`${grams}ج جبنة قريش قليل الدسم`);
    } else if (group.id === 'med_protein') {
      if (qty === 1) {
        primaryParts.push('1 حبة بيض مسلوقة');
        alt1Parts.push('30ج جبن فيتا لايت');
        alt2Parts.push('30ج لحم بقر كنداك مشوي');
      } else if (qty === 2) {
        primaryParts.push('2 حبة بيض مسلوقة');
        alt1Parts.push('60ج جبن فيتا لايت');
        alt2Parts.push('60ج لحم بقر كنداك قليل الدسم');
      } else {
        const grams = qty * 30;
        primaryParts.push(`${grams}ج لحم بقر كنداك مشوي`);
        alt1Parts.push(`${qty} حبات بيض مسلوق`);
        alt2Parts.push(`${grams}ج جبن موزاريلا/فيتا لايت`);
      }
    } else if (group.id === 'vegetables') {
      if (qty === 1) {
        primaryParts.push('1 طبق سلطة خضراء طازجة (خيار وطماطم وجرجير)');
        alt1Parts.push('1/2 كوب خضار مطبوخ (كوسة/فاصوليا خضراء)');
        alt2Parts.push('1 كوب بروكلي أو قرنبيط مسلوق');
      } else {
        primaryParts.push(`1 طبق سلطة خضراء كبير + ${qty - 1} حصة خضار مطبوخ`);
        alt1Parts.push(`${qty * 0.5} كوب خضار مطبوخ مشكل بدون دهون`);
        alt2Parts.push(`طبق سلطة خضراء مع ${qty * 100}ج خضار مشوي`);
      }
    } else if (group.id === 'fruits') {
      if (qty === 1) {
        primaryParts.push('1 حبة تفاح متوسطة أو موز صغير');
        alt1Parts.push('1 كوب فراولة طازجة أو جوافة');
        alt2Parts.push('2 حبة تمر متوسط أو تين طازج');
      } else {
        primaryParts.push(`${qty} ثمار فاكهة طازجة (تفاح / برتقال)`);
        alt1Parts.push(`${qty} كوب فراولة أو أناناس طازج`);
        alt2Parts.push(`${qty * 2} حبات تمر طازج`);
      }
    } else if (group.id === 'dairy') {
      if (qty === 1) {
        primaryParts.push('1 كوب حليب قليل الدسم (200 مل)');
        alt1Parts.push('1 علبة زبادي طبيعي لايت (170ج)');
        alt2Parts.push('1 كوب لبن رايب طازج');
      } else {
        primaryParts.push(`${qty} كوب حليب قليل الدسم`);
        alt1Parts.push(`${qty} علبة زبادي لايت`);
        alt2Parts.push(`${qty} كوب لبن رايب طازج`);
      }
    } else if (group.id === 'fats') {
      if (qty === 1) {
        primaryParts.push('1 ملعقة صغيرة زيت زيتون');
        alt1Parts.push('6 حبات لوز نيء');
        alt2Parts.push('1 ملعقة صغيرة طحينة بيضاء');
      } else if (qty === 2) {
        primaryParts.push('2 ملعقة صغيرة زيت زيتون');
        alt1Parts.push('12 حبة لوز نيء (20ج)');
        alt2Parts.push('1/4 حبة أفوكادو متوسطة (40ج)');
      } else {
        primaryParts.push(`${qty} ملاعق صغيرة زيت زيتون (${qty * 5} مل)`);
        alt1Parts.push(`${qty * 6} حبات لوز نيء أو جوز`);
        alt2Parts.push(`${qty} ملاعق صغيرة طحينة بيضاء`);
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

  return { primaryItems, alternatives };
}
