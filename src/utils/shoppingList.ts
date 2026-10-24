import { MealItem } from '../types';
import { StorageKeys } from './storageKeys';
import { parseLocalDate, getTodayDateString } from './storage';

/**
 * Batch 2.1 — قائمة التسوق الأسبوعية: توليد نقي من وجبات الخطة + تخزين أسبوعي.
 *
 * قرارات موثّقة:
 * - بداية الأسبوع = الاثنين (ISO) — مفتاح التخزين مبني عليها.
 * - عناصر الوجبة نص حر يُقسَّم على «+» و«؛» و«،»؛ الكمية تُستخرج من بداية
 *   كل جزء إن وُجد رقم. النص الأصلي لكل عنصر يبقى محفوظًا دائمًا بجانب أي
 *   رقم مُجمَّع — التجميع العددي تقريبي بطبيعته ولا يحذف الأصل أبدًا.
 * - التجميع بالاسم بعد نزع الكمية من أوله وتوحيد المسافات.
 */

export interface ShoppingItem {
  /** معرّف ثابت من الاسم المُجمَّع عليه أو «manual-...» للبنود اليدوية */
  id: string;
  name: string;
  /** النص الأصلي كما ظهر في الخطة (أول ظهور) — لا يُحذف أبدًا */
  originalText: string;
  /** مجموع رقمي تقريبي بعد الضرب في الأيام والأفراد (null عند تعذّر التحليل) */
  totalQuantity: number | null;
  unit?: string;
  /** أسماء الوجبات التي جاء منها العنصر */
  sources: string[];
  /** كم مرة يظهر أسبوعيًا قبل الضرب في الأفراد */
  occurrencesPerWeek: number;
  checked?: boolean;
  manual?: boolean;
  deleted?: boolean;
}

export interface ShoppingListState {
  weekStartISO: string;
  days: number;
  people: number;
  items: ShoppingItem[];
  updatedAt: string;
}

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

export function normalizeDigits(raw: string): string {
  return String(raw || '').replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));
}

const QUANTITY_RE =
  /^([\d]+(?:[.,][\d]+)?)\s*(جم|كجم|كغ|مل|لتر|ملعقة|ملاعق|معلقة|كوب|أكواب|حبة|حبات|عدد|قرص|أقراص|علبة|علب|شريحة|شرائح)?\s+/;

/** يفصل بادئة الكمية عن اسم العنصر داخل جزء نصي واحد من وجبة. */
export function parseItemSegment(segment: string): { name: string; quantity: number | null; unit?: string } {
  const text = normalizeDigits(String(segment || '')).trim();
  const m = text.match(QUANTITY_RE);
  if (m) {
    const quantity = parseFloat(m[1].replace(',', '.'));
    const name = text.slice(m[0].length).trim();
    if (name) {
      return { name, quantity: isNaN(quantity) ? null : quantity, unit: m[2] || undefined };
    }
  }
  return { name: text, quantity: null };
}

/** تقسيم نص عناصر وجبة إلى أجزاء مستقلة. */
export function splitMealItemsText(itemsText: string): string[] {
  return String(itemsText || '')
    .split(/[+؛;،]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function itemIdFromName(name: string): string {
  return `gen:${name.replace(/\s+/g, ' ').trim().toLowerCase()}`;
}

/**
 * توليد القائمة من وجبات الخطة.
 * كل وجبة تتكرر يوميًا؛ البدائل (alternatives) لا تدخل القائمة لأنها ليست
 * الخطة الأساسية — العنصر الأساسي هو meal.items فقط.
 */
export function generateShoppingList(
  meals: MealItem[] | undefined | null,
  days = 7,
  people = 1
): ShoppingItem[] {
  const safeDays = Math.max(1, Math.floor(days) || 7);
  const safePeople = Math.max(1, Math.floor(people) || 1);
  const byName = new Map<string, ShoppingItem>();

  (meals || []).forEach((meal) => {
    splitMealItemsText(meal.items || '').forEach((segment) => {
      const parsed = parseItemSegment(segment);
      if (!parsed.name) return;
      const id = itemIdFromName(parsed.name);
      const existing = byName.get(id);
      if (existing) {
        existing.occurrencesPerWeek += safeDays;
        if (parsed.quantity != null && existing.totalQuantity != null && (existing.unit || '') === (parsed.unit || '')) {
          existing.totalQuantity += parsed.quantity * safeDays * safePeople;
        } else if (parsed.quantity != null && existing.totalQuantity == null) {
          // ظهور سابق بلا كمية — لا نخترع مجموعًا جزئيًا
          existing.totalQuantity = null;
        }
        if (!existing.sources.includes(meal.name)) existing.sources.push(meal.name);
      } else {
        byName.set(id, {
          id,
          name: parsed.name,
          originalText: segment.trim(),
          totalQuantity: parsed.quantity != null ? parsed.quantity * safeDays * safePeople : null,
          unit: parsed.unit,
          sources: [meal.name],
          occurrencesPerWeek: safeDays,
        });
      }
    });
  });

  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, 'ar'));
}

/** بداية أسبوع (الاثنين) لأي تاريخ YYYY-MM-DD. */
export function getWeekStartISO(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  const dow = d.getDay(); // 0=Sunday .. 6=Saturday
  const diffToMonday = (dow + 6) % 7;
  d.setDate(d.getDate() - diffToMonday);
  return getTodayDateString(d);
}

/**
 * دمج إعادة التوليد بعد تأكيد صريح: البنود اليدوية تبقى دائمًا، والبنود
 * المولّدة تُستبدل بالجديدة (تُصفَّر تعليماتها)، والمحذوفة يدويًا لا تعود
 * إلا لو تغيّرت الخطة فظهرت باسم جديد.
 */
export function mergeRegeneratedItems(
  previous: ShoppingItem[],
  regenerated: ShoppingItem[]
): ShoppingItem[] {
  const manual = previous.filter((i) => i.manual && !i.deleted);
  const deletedIds = new Set(previous.filter((i) => i.deleted && !i.manual).map((i) => i.id));
  const fresh = regenerated.filter((i) => !deletedIds.has(i.id));
  return [...fresh, ...manual].sort((a, b) => a.name.localeCompare(b.name, 'ar'));
}

/** نص مشاركة واتساب منسّق بأقسام حسب الوجبة المصدر. */
export function buildShoppingShareText(state: ShoppingListState, clientName?: string): string {
  const visible = state.items.filter((i) => !i.deleted);
  let text = `🛒 *قائمة تسوق الأسبوع* (تبدأ ${state.weekStartISO})\n`;
  if (clientName) text += `👤 ${clientName}\n`;
  text += `📅 ${state.days} أيام × ${state.people} فرد\n\n`;

  const sections = new Map<string, ShoppingItem[]>();
  visible.forEach((item) => {
    const section = item.manual
      ? 'إضافات يدوية'
      : item.sources.length === 1
        ? item.sources[0]
        : 'مشتركة بين الوجبات';
    const list = sections.get(section) || [];
    list.push(item);
    sections.set(section, list);
  });

  sections.forEach((items, section) => {
    text += `*${section}:*\n`;
    items.forEach((item) => {
      const qty =
        item.totalQuantity != null ? ` — ${item.totalQuantity}${item.unit ? ` ${item.unit}` : ''}` : '';
      text += `${item.checked ? '☑️' : '☐'} ${item.name}${qty}\n`;
      if (item.totalQuantity != null) text += `   (الأصل: ${item.originalText})\n`;
    });
    text += '\n';
  });

  return text.trim();
}

// ── التخزين الأسبوعي ────────────────────────────────────────────────────

export function loadShoppingList(weekStartISO: string): ShoppingListState | null {
  try {
    const raw = localStorage.getItem(StorageKeys.shoppingListWeek(weekStartISO));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ShoppingListState;
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveShoppingList(state: ShoppingListState): void {
  try {
    localStorage.setItem(
      StorageKeys.shoppingListWeek(state.weekStartISO),
      JSON.stringify({ ...state, updatedAt: new Date().toISOString() })
    );
  } catch {
    // مساحة ممتلئة/وضع خاص — القائمة تبقى في الذاكرة لهذه الجلسة
  }
}
