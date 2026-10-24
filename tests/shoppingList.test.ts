import { describe, it, expect } from 'vitest';
import { MealItem } from '../src/types';
import {
  parseItemSegment,
  splitMealItemsText,
  generateShoppingList,
  getWeekStartISO,
  mergeRegeneratedItems,
  buildShoppingShareText,
  ShoppingItem,
  ShoppingListState,
} from '../src/utils/shoppingList';

const MEALS: MealItem[] = [
  {
    id: 'm1',
    name: 'وجبة الإفطار',
    items: '3 بيضات مسلوقة + نصف رغيف خبز بلدي + خضار طازج',
    alternatives: [],
  },
  {
    id: 'm2',
    name: 'وجبة الغداء',
    items: '180 جم صدور دجاج مشوية + 6 ملاعق أرز مسلوق + طبق سلطة خضراء',
    alternatives: [],
  },
  {
    id: 'm3',
    name: 'وجبة خفيفة',
    items: 'حبة فاكهة + 15 حبة لوز',
    alternatives: [],
  },
];

describe('shoppingList — parse & split (Batch 2.1)', () => {
  it('extracts numeric quantity and unit from segment start', () => {
    expect(parseItemSegment('180 جم صدور دجاج مشوية')).toEqual({
      name: 'صدور دجاج مشوية',
      quantity: 180,
      unit: 'جم',
    });
    expect(parseItemSegment('6 ملاعق أرز مسلوق')).toEqual({ name: 'أرز مسلوق', quantity: 6, unit: 'ملاعق' });
  });

  it('keeps quantity-less segments intact with null quantity', () => {
    expect(parseItemSegment('خضار طازج')).toEqual({ name: 'خضار طازج', quantity: null });
    expect(parseItemSegment('نصف رغيف خبز بلدي').quantity).toBeNull();
  });

  it('converts Arabic-Indic digits before parsing', () => {
    expect(parseItemSegment('١٨٠ جم دجاج').quantity).toBe(180);
  });

  it('splits meal text on +, ؛ and ،', () => {
    expect(splitMealItemsText('أ + ب؛ ج، د')).toEqual(['أ', 'ب', 'ج', 'د']);
    expect(splitMealItemsText('')).toEqual([]);
  });
});

describe('shoppingList — generate (Batch 2.1)', () => {
  it('generates one item per segment with weekly quantities (days × people)', () => {
    const list = generateShoppingList(MEALS, 7, 1);
    const chicken = list.find((i) => i.name === 'صدور دجاج مشوية');
    expect(chicken).toBeTruthy();
    expect(chicken!.totalQuantity).toBe(180 * 7);
    expect(chicken!.unit).toBe('جم');
    expect(chicken!.sources).toEqual(['وجبة الغداء']);
    expect(chicken!.originalText).toContain('180 جم');
  });

  it('multiplies by people as well', () => {
    const list = generateShoppingList(MEALS, 7, 2);
    const chicken = list.find((i) => i.name === 'صدور دجاج مشوية');
    expect(chicken!.totalQuantity).toBe(180 * 7 * 2);
  });

  it('aggregates identical names across meals and keeps the original text', () => {
    const meals: MealItem[] = [
      { id: 'a', name: 'إفطار', items: '100 جم جبن قريش', alternatives: [] },
      { id: 'b', name: 'عشاء', items: '100 جم جبن قريش', alternatives: [] },
    ];
    const list = generateShoppingList(meals, 7, 1);
    const cheese = list.filter((i) => i.name === 'جبن قريش');
    expect(cheese).toHaveLength(1);
    expect(cheese[0].totalQuantity).toBe(100 * 7 * 2);
    expect(cheese[0].sources).toEqual(['إفطار', 'عشاء']);
    expect(cheese[0].originalText).toBe('100 جم جبن قريش');
  });

  it('reflects plan changes: new plan items produce a new list', () => {
    const changed: MealItem[] = [{ id: 'x', name: 'غداء', items: '200 جم سمك مشوي', alternatives: [] }];
    const list = generateShoppingList(changed, 7, 1);
    expect(list.map((i) => i.name)).toEqual(['سمك مشوي']);
  });

  it('empty plan produces an empty list', () => {
    expect(generateShoppingList([], 7, 1)).toEqual([]);
    expect(generateShoppingList([{ id: 'e', name: 'فارغة', items: '', alternatives: [] }], 7, 1)).toEqual([]);
  });
});

describe('shoppingList — week key, regenerate merge, share text (Batch 2.1)', () => {
  it('week start is the Monday of the week', () => {
    // 2026-10-24 is a Saturday
    expect(getWeekStartISO('2026-10-24')).toBe('2026-10-19');
    expect(getWeekStartISO('2026-10-19')).toBe('2026-10-19');
    expect(getWeekStartISO('2026-10-25')).toBe('2026-10-19');
  });

  it('regeneration keeps manual items and does not resurrect deleted generated ones', () => {
    const previous: ShoppingItem[] = generateShoppingList(MEALS, 7, 1).map((i) =>
      i.name === 'أرز مسلوق' ? { ...i, deleted: true } : { ...i, checked: true }
    );
    previous.push({
      id: 'manual-1',
      name: 'قهوة عربي',
      originalText: 'قهوة عربي',
      totalQuantity: null,
      sources: [],
      occurrencesPerWeek: 0,
      manual: true,
    });
    const merged = mergeRegeneratedItems(previous, generateShoppingList(MEALS, 7, 1));
    expect(merged.find((i) => i.name === 'قهوة عربي')).toBeTruthy();
    expect(merged.find((i) => i.name === 'أرز مسلوق')).toBeFalsy();
    // generated checks are reset after explicit regeneration
    expect(merged.filter((i) => !i.manual).every((i) => !i.checked)).toBe(true);
  });

  it('share text is complete, sectioned, and includes original text for quantified items', () => {
    const state: ShoppingListState = {
      weekStartISO: '2026-10-19',
      days: 7,
      people: 2,
      items: generateShoppingList(MEALS, 7, 2),
      updatedAt: new Date().toISOString(),
    };
    const text = buildShoppingShareText(state, 'سارة');
    expect(text).toContain('قائمة تسوق الأسبوع');
    expect(text).toContain('سارة');
    expect(text).toContain('وجبة الغداء');
    expect(text).toContain('صدور دجاج مشوية');
    expect(text).toContain('الأصل: 180 جم صدور دجاج مشوية');
  });
});
