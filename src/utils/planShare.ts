import { PlanConfig } from '../types';
import { DEFAULT_PLAN, DEFAULT_VISIBLE_SECTIONS } from './storage';

/**
 * Formats a complete, professional, human-readable WhatsApp message
 * containing all plan details, clinical instructions, and embedded sync data.
 */
export function generateWhatsAppPlanMessage(plan: PlanConfig): string {
  const dateStr = new Date().toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const waterCups = Math.round((plan.dailyWaterGoalMl || 3000) / 250);

  // Clean payload for sync
  const syncPayload: PlanConfig = {
    ...DEFAULT_PLAN,
    ...plan,
    visibleSections: {
      ...DEFAULT_VISIBLE_SECTIONS,
      ...(plan.visibleSections || {}),
    },
  };

  const encodedSyncData = btoa(unescape(encodeURIComponent(JSON.stringify(syncPayload))));

  let text = `🩺 *الخطة الغذائية والإرشادات العلاجية المعتمدة* 📋\n`;
  text += `👩‍⚕️ *د. شيماء - Smart Diet Clinic*\n`;
  text += `👤 *المتدرب:* ${plan.clientName || 'المتدرب'}\n`;
  text += `📅 *تاريخ الإصدار:* ${dateStr}\n`;

  if (plan.targetWeight || plan.targetWaist || plan.startWeight) {
    text += `\n🎯 *الأهداف البدنية:*\n`;
    if (plan.startWeight) text += `• وزن البداية: ${plan.startWeight} كجم\n`;
    if (plan.targetWeight) text += `• الوزن المستهدف: ${plan.targetWeight} كجم\n`;
    if (plan.targetWaist) text += `• محيط الخصر المستهدف: ${plan.targetWaist} سم\n`;
    if (plan.heightCm) text += `• الطول: ${plan.heightCm} سم\n`;
  }

  if (plan.medicalConditions?.conditions && plan.medicalConditions.conditions.length > 0) {
    text += `\n═══════════════════════\n`;
    text += `🩺 *التشخيصات والحالات الصحية المسجلة:*\n`;
    plan.medicalConditions.conditions.forEach((c) => {
      text += `• ${c.label}${c.severity ? ` (${c.severity === 'mild' ? 'خفيفة' : c.severity === 'moderate' ? 'متوسطة' : 'متقدمة'})` : ''}${c.notes ? ` - ${c.notes}` : ''}\n`;
    });
  }

  if (plan.medicalConditions?.allergies && plan.medicalConditions.allergies.length > 0) {
    text += `\n🚫 *محظورات الطعام والحساسية (Allergies):*\n`;
    text += `• ${plan.medicalConditions.allergies.join(' • ')}\n`;
  }

  if (plan.medicalConditions?.customConditionNotes) {
    text += `\n💡 *توجيهات طبية سريرية خاصة:*\n`;
    text += `${plan.medicalConditions.customConditionNotes}\n`;
  }

  text += `\n═══════════════════════\n`;
  text += `🔥 *الأهداف اليومية والسعرات والماكروز:*\n`;
  if (plan.targetCalories) {
    text += `• السعرات اليومية المستهدفة: *${plan.targetCalories}* سعرة حرارية\n`;
    text += `• توزيع الماكروز: بروتين *${plan.targetProtein || 0}g* | كارب *${plan.targetCarbs || 0}g* | دهون *${plan.targetFats || 0}g*\n`;
  }
  text += `• هدف شرب الماء: *${plan.dailyWaterGoalMl || 3000}* مل (حوالي ${waterCups} أكواب)\n`;
  if (plan.enableFastingTimer) {
    text += `• الصيام المتقطع: *${plan.fastingTargetHours || 16}* ساعة صيام يومياً\n`;
  }
  text += `• رصيد أيام الفري المسموحة: ${plan.freezeDaysPerMonth || 2} أيام شهرياً\n`;

  text += `\n═══════════════════════\n`;
  text += `🍽️ *جدول الوجبات والبدائل المعتمدة (${plan.meals?.length || 0} وجبات):*\n`;

  (plan.meals || []).forEach((meal, idx) => {
    text += `\n${idx + 1}. *${meal.name}*`;
    if (meal.calories || meal.proteinGrams) {
      text += ` (~${meal.calories || 0} سعرة | ${meal.proteinGrams || 0}g بروتين)`;
    }
    text += `:\n   🥣 *الوجبة الأساسية:* ${meal.items}\n`;
    if (meal.alternatives && meal.alternatives.length > 0) {
      text += `   🔄 *البدائل المتاحة:*\n`;
      meal.alternatives.forEach((alt, aIdx) => {
        text += `     ${aIdx + 1}) ${alt}\n`;
      });
    }
  });

  if (plan.supplements && plan.supplements.length > 0) {
    text += `\n═══════════════════════\n`;
    text += `💊 *الفيتامينات والمكملات المقررة:*\n`;
    plan.supplements.forEach((supp) => {
      text += `• ${supp.name} ${supp.time ? `(${supp.time})` : ''}\n`;
    });
  }

  if (plan.medicationPlan?.items && plan.medicationPlan.items.filter((m) => m.active !== false).length > 0) {
    text += `\n═══════════════════════\n`;
    text += `💊 *سجل الأدوية والعلاجات المعتمدة والتوقيت:*\n`;
    plan.medicationPlan.items.filter((m) => m.active !== false).forEach((med) => {
      const timingsStr = (med.timings || []).map((t) => t.label).join(' • ');
      text += `• *${med.name}* (${med.dose}) - المواعيد: [${timingsStr}]\n`;
      if (med.foodInteractionNote) {
        text += `   ⚠️ تنويه تفاعل الطعام: ${med.foodInteractionNote}\n`;
      }
      if (med.coachNotes) {
        text += `   💡 توجيه: ${med.coachNotes}\n`;
      }
    });
  }

  if (plan.checklist && plan.checklist.length > 0) {
    text += `\n═══════════════════════\n`;
    text += `✅ *العادات والمهام اليومية المطلوبة:*\n`;
    plan.checklist.forEach((item) => {
      text += `• ${item.label}\n`;
    });
  }

  if (plan.tips && plan.tips.length > 0) {
    text += `\n═══════════════════════\n`;
    text += `💡 *إرشادات وتوجيهات د. شيماء:*\n`;
    plan.tips.forEach((tip) => {
      text += `• ${tip}\n`;
    });
  }

  text += `\n═══════════════════════\n`;
  text += `📲 *طريقة تفعيل الخطة في التطبيق:*\n`;
  text += `1. انسخ هذه الرسالة بالكامل من الواتساب.\n`;
  text += `2. افتح التطبيق واضغط على زر *"📥 إضافة خطة الدكتورة"* في أعلى الصفحة.\n`;
  text += `3. الصق النص واضغط *"تطبيق الخطة"* وسيتم ضبط كل شيء تلقائياً! ✨\n\n`;

  text += `#START_PLAN_DATA#\n`;
  text += `${encodedSyncData}\n`;
  text += `#END_PLAN_DATA#\n`;

  return text;
}

/**
 * Extracts and parses PlanConfig from any text format:
 * 1. Text containing #START_PLAN_DATA# ... #END_PLAN_DATA# (Base64 or JSON)
 * 2. Markdown code blocks ```json ... ```
 * 3. Raw JSON text
 * 4. Full Backup format { plan: ... }
 */
export function extractPlanFromText(input: string): Partial<PlanConfig> | null {
  if (!input || typeof input !== 'string') return null;
  const raw = input.trim();

  // 1. Check for encoded/embedded tag #START_PLAN_DATA# ... #END_PLAN_DATA#
  const tagMatch = raw.match(/#START_PLAN_DATA#\s*([\s\S]*?)\s*#END_PLAN_DATA#/);
  if (tagMatch && tagMatch[1]) {
    const payload = tagMatch[1].trim();
    // Try base64 decode
    try {
      const decoded = decodeURIComponent(escape(atob(payload)));
      const parsed = JSON.parse(decoded);
      if (parsed && (parsed.meals || parsed.clientName || parsed.dailyWaterGoalMl)) {
        return parsed;
      }
    } catch (e) {
      // If not valid base64, try direct JSON parse
      try {
        const parsed = JSON.parse(payload);
        if (parsed) return parsed;
      } catch (err) {}
    }
  }

  // 2. Check for markdown code blocks ```json ... ``` or ``` ... ```
  const codeBlockMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch && codeBlockMatch[1]) {
    try {
      const parsed = JSON.parse(codeBlockMatch[1].trim());
      if (parsed) return parsed.plan || parsed;
    } catch (e) {}
  }

  // 3. Try direct JSON parse
  try {
    const parsed = JSON.parse(raw);
    if (parsed) return parsed.plan || parsed;
  } catch (e) {}

  // 4. Try finding the outer JSON object {...} in raw text
  const firstBrace = raw.indexOf('{');
  const lastBrace = raw.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      const potentialJson = raw.slice(firstBrace, lastBrace + 1);
      const parsed = JSON.parse(potentialJson);
      if (parsed && (parsed.meals || parsed.clientName || parsed.dailyWaterGoalMl)) {
        return parsed.plan || parsed;
      }
    } catch (e) {}
  }

  return null;
}
