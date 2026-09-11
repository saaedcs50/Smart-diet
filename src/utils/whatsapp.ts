import { BRAND } from '../config/brand';

/**
 * يحوّل رقم العيادة لصيغة wa.me الدولية (أرقام فقط).
 * أمثلة: +20 10 1234 5678 | 00201012345678 | 01012345678 | 201012345678
 */
export function normalizeWhatsAppNumber(raw: string): string {
  let digits = String(raw || '').replace(/[^\d]/g, '');
  if (!digits) return '';

  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  // مصري محلي 01xxxxxxxxx → 201xxxxxxxxx
  if (digits.length === 11 && digits.startsWith('01')) {
    digits = `2${digits}`;
  }
  // 10 أرقام تبدأ بـ 1: 10xxxxxxxx → 2010xxxxxxxx
  if (digits.length === 10 && digits.startsWith('1')) {
    digits = `20${digits}`;
  }

  return digits;
}

export function clinicWhatsAppNumber(): string {
  return normalizeWhatsAppNumber(BRAND.whatsapp);
}

/**
 * رابط واتساب للتقرير للعيادة:
 * - لو رقم العيادة موجود → يفتح شات الرقم مباشرة
 * - لو فاضي → شير عام (يختار المستخدم المحادثة)
 *
 * ملاحظة: تصدير الخطة من لوحة الأخصائي يجب أن يبقى شير عام
 * لأن المستلم هو العميل وليس رقم العيادة.
 */
export function buildWhatsAppUrl(text: string): string {
  const encoded = encodeURIComponent(text);
  const number = clinicWhatsAppNumber();
  if (number.length >= 10 && number.length <= 15) {
    return `https://wa.me/${number}?text=${encoded}`;
  }
  return `https://wa.me/?text=${encoded}`;
}

export function openWhatsAppShare(text: string): void {
  window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
}

/** شير عام بدون رقم: لتصدير الخطط من لوحة الأخصائي إلى العميل */
export function openWhatsAppShareGeneric(text: string): void {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text)}`,
    '_blank',
    'noopener,noreferrer'
  );
}
