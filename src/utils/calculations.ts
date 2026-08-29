import { DayLog, PlanConfig } from '../types';
import { loadDayLog } from './storage';
import { getHungerInfo } from './hungerScale';
import { getAllScheduledDoses, calculateDailyMedicationAdherence, APPETITE_EFFECT_LABELS, WEIGHT_EFFECT_LABELS } from './medications';
import { getCycleInfo, CYCLE_SYMPTOMS, CLINICAL_FLAGS_META, getWeightVsRecentAverage } from './cycleTracking';
import { formatLabSummaryForWhatsApp } from './labTracking';

export function calculateEffectiveWaterGoal(plan: PlanConfig, day: DayLog): number {
  if (day.weight && day.weight > 0) {
    return Math.round(day.weight * 35);
  }
  const lastWeight = findLatestWeight();
  if (lastWeight && lastWeight > 0) {
    return Math.round(lastWeight * 35);
  }
  return plan.dailyWaterGoalMl || 3000;
}

export function findLatestWeight(): number | null {
  const d = new Date();
  for (let i = 0; i < 60; i++) {
    const cur = new Date(d);
    cur.setDate(d.getDate() - i);
    const dateStr = cur.toISOString().slice(0, 10);
    const log = loadDayLog(dateStr);
    if (log && log.weight && log.weight > 0) {
      return log.weight;
    }
  }
  return null;
}

export function parseSleepHours(sleep: string, wake: string): number {
  if (!sleep || !wake) return 0;
  const [sh, sm] = sleep.split(':').map(Number);
  const [wh, wm] = wake.split(':').map(Number);
  if (isNaN(sh) || isNaN(sm) || isNaN(wh) || isNaN(wm)) return 0;
  let startMinutes = sh * 60 + sm;
  let endMinutes = wh * 60 + wm;
  if (endMinutes <= startMinutes) {
    endMinutes += 1440; // overnight
  }
  return Number(((endMinutes - startMinutes) / 60).toFixed(1));
}

export function getEffectiveSleepHours(day: DayLog): number {
  if (typeof day.sleepHours === 'number' && day.sleepHours > 0) {
    return day.sleepHours;
  }
  if (day.sleep && day.wake) {
    return parseSleepHours(day.sleep, day.wake);
  }
  return 0;
}

export function formatDurationString(hoursDecimal: number): string {
  if (hoursDecimal <= 0) return 'لم يسجل';
  const hours = Math.floor(hoursDecimal);
  const minutes = Math.round((hoursDecimal - hours) * 60);
  if (minutes === 0) {
    if (hours === 1) return 'ساعة واحدة';
    if (hours === 2) return 'ساعتان';
    if (hours >= 3 && hours <= 10) return `${hours} ساعات`;
    return `${hours} ساعة`;
  }
  return `${hours}س ${minutes}د`;
}

export interface ScoreBreakdown {
  total: number;
  checklist: number;
  water: number;
  sleep: number;
  meals: number;
}

export function calculateDayScore(plan: PlanConfig, day: DayLog): ScoreBreakdown {
  if (day.isFreeze) {
    return {
      total: 100,
      checklist: plan.scoreWeights.checklist,
      water: plan.scoreWeights.water,
      sleep: plan.scoreWeights.sleep,
      meals: plan.scoreWeights.meals,
    };
  }

  const weights = plan.scoreWeights || { checklist: 30, water: 25, sleep: 15, meals: 30 };
  const sumWeights = (weights.checklist || 0) + (weights.water || 0) + (weights.sleep || 0) + (weights.meals || 0) || 100;
  const norm = {
    checklist: (weights.checklist / sumWeights) * 100,
    water: (weights.water / sumWeights) * 100,
    sleep: (weights.sleep / sumWeights) * 100,
    meals: (weights.meals / sumWeights) * 100,
  };

  // 1. Checklist
  const totalChecks = plan.checklist.length || 1;
  let completedChecks = 0;
  plan.checklist.forEach((c) => {
    if (day.checks && day.checks[c.id]) completedChecks++;
  });
  const checkScore = Math.round((completedChecks / totalChecks) * norm.checklist);

  // 2. Water
  const goalWater = calculateEffectiveWaterGoal(plan, day);
  const waterRatio = Math.min(1.2, (day.water || 0) / goalWater);
  const waterScore = Math.round(Math.min(1, waterRatio) * norm.water);

  // 3. Sleep (Strictly 0 if not logged!)
  const sleepHrs = getEffectiveSleepHours(day);
  let sleepRatio = 0;
  if (sleepHrs > 0) {
    if (sleepHrs >= 7 && sleepHrs <= 9) {
      sleepRatio = 0.75;
    } else if (sleepHrs >= 6 && sleepHrs < 7) {
      sleepRatio = 0.60;
    } else if (sleepHrs > 9 && sleepHrs <= 10) {
      sleepRatio = 0.60;
    } else if (sleepHrs >= 5 && sleepHrs < 6) {
      sleepRatio = 0.40;
    } else if (sleepHrs >= 4 && sleepHrs < 5 || sleepHrs > 10) {
      sleepRatio = 0.25;
    } else {
      sleepRatio = 0.15;
    }

    // Quality bonus
    if (day.quality === 'نوم مريح وعميق' || day.quality === 'ممتاز' || day.quality === 'نوم مريح وممتاز ✨') {
      sleepRatio = Math.min(1, sleepRatio + 0.25);
    } else if (day.quality === 'جيد وطبيعي' || day.quality === 'كويس' || day.quality === 'كويس 🙂') {
      sleepRatio = Math.min(1, sleepRatio + 0.15);
    } else if (day.quality === 'متقطع' || day.quality === 'متوسط' || day.quality === 'نص نص 😐') {
      sleepRatio = Math.min(1, sleepRatio + 0.05);
    } else if (!day.quality) {
      // If quality was not specified, scale up duration proportionally
      sleepRatio = Math.min(1, sleepRatio * 1.33);
    }
  }

  const sleepScore = Math.round(Math.min(1, sleepRatio) * norm.sleep);

  // 4. Meals & Mindful Eating (Hunger-Fullness Scale 1-10)
  const totalMeals = plan.meals.length || 1;
  let mealPoints = 0;
  plan.meals.forEach((m) => {
    const st = day.meals && day.meals[m.id];
    if (!st) return;
    const isCommitted = st.eval === 'yes' || ((st.type === 'default' || st.type === 'alt') && st.eval !== 'no');
    
    if (isCommitted) {
      let pts = 0.60; // base adherence
      if (st.protein) pts += 0.10;
      if (st.veggies) pts += 0.10;

      // Mindful Eating before hunger scale (1-10)
      if (typeof st.hungerBefore === 'number' && st.hungerBefore >= 1 && st.hungerBefore <= 10) {
        // Ideal starting hunger zone is 3-4 (gives full 0.10), acceptable gives 0.06
        const isIdealBefore = st.hungerBefore >= 3 && st.hungerBefore <= 4;
        pts += isIdealBefore ? 0.10 : 0.06;
      }

      // Mindful Eating after fullness scale (1-10)
      if (typeof st.fullnessAfter === 'number' && st.fullnessAfter >= 1 && st.fullnessAfter <= 10) {
        // Ideal stopping fullness zone is 6-7 (gives full 0.10), acceptable gives 0.06
        const isIdealAfter = st.fullnessAfter >= 6 && st.fullnessAfter <= 7;
        pts += isIdealAfter ? 0.10 : 0.06;
      }

      mealPoints += Math.min(1.0, pts);
    } else {
      // Even if not fully matched, reward mindful self-awareness and honesty
      let mindfulBonus = 0;
      if (typeof st.hungerBefore === 'number' && st.hungerBefore >= 1) mindfulBonus += 0.12;
      if (typeof st.fullnessAfter === 'number' && st.fullnessAfter >= 1) mindfulBonus += 0.12;
      mealPoints += mindfulBonus;
    }
  });

  const mealScore = Math.round((mealPoints / totalMeals) * norm.meals);
  const total = Math.min(100, Math.round(checkScore + waterScore + sleepScore + mealScore));

  return {
    total,
    checklist: checkScore,
    water: waterScore,
    sleep: sleepScore,
    meals: mealScore,
  };
}

export function calculateStreak(refDateStr: string, plan: PlanConfig): number {
  let streak = 0;
  const d = new Date(refDateStr);
  for (let i = 0; i < 90; i++) {
    const cur = new Date(d);
    cur.setDate(d.getDate() - i);
    const dateStr = cur.toISOString().slice(0, 10);
    const log = loadDayLog(dateStr);
    const score = calculateDayScore(plan, log).total;
    if (score >= 75 || log.isFreeze) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function countFreezeDaysInMonth(refDateStr: string): number {
  const d = new Date(refDateStr);
  const year = d.getFullYear();
  const month = d.getMonth();
  let count = 0;
  for (let day = 1; day <= 31; day++) {
    const checkDate = new Date(year, month, day);
    if (checkDate.getMonth() !== month) break;
    const dateStr = checkDate.toISOString().slice(0, 10);
    if (dateStr === refDateStr) continue;
    const log = loadDayLog(dateStr);
    if (log && log.isFreeze) count++;
  }
  return count;
}

export function calculateBMI(weight: number | null, heightCm: number | null): { val: string; label: string; color: string } {
  if (!weight || !heightCm || heightCm < 100 || weight <= 0) {
    return { val: '--', label: 'سجّل وزنك وطولك', color: 'text-slate-400' };
  }
  const hM = heightCm / 100;
  const bmi = weight / (hM * hM);
  const val = bmi.toFixed(1);
  if (bmi < 18.5) {
    return { val, label: 'نحافة محتاجة زيادة عضل (< 18.5)', color: 'text-blue-500' };
  } else if (bmi < 25) {
    return { val, label: 'وزن مثالي وطبيعي تماماً ✅ (18.5 - 24.9)', color: 'text-emerald-600' };
  } else if (bmi < 30) {
    return { val, label: 'زيادة وزن بسيطة محتاجة تظبيط ⚠️ (25 - 29.9)', color: 'text-amber-500' };
  } else if (bmi < 35) {
    return { val, label: 'سمنة درجة أولى 🚨 (30 - 34.9)', color: 'text-rose-500' };
  } else {
    return { val, label: 'سمنة مفرطة محتاجة التزام جاد 🚨 (35+)', color: 'text-red-600' };
  }
}

export function calculateWHtR(waistCm: number | null, heightCm: number | null): { val: string; label: string; color: string } {
  if (!waistCm || !heightCm || heightCm < 100 || waistCm <= 0) {
    return { val: '--', label: 'سجّل محيط وسطك وطولك', color: 'text-slate-400' };
  }
  const ratio = waistCm / heightCm;
  const val = ratio.toFixed(2);
  if (ratio < 0.4) {
    return { val, label: 'نحافة مفرطة في الوسط (< 0.4)', color: 'text-blue-500' };
  } else if (ratio <= 0.5) {
    return { val, label: 'وسط مشدود وصحي جداً ✅ (أقل من 0.5)', color: 'text-emerald-600' };
  } else if (ratio <= 0.6) {
    return { val, label: 'دهون بطن متوسطة محتاجة تركيز ⚠️ (0.51 - 0.6)', color: 'text-amber-500' };
  } else {
    return { val, label: 'تراكم دهون حشوية خطر 🚨 (أكبر من 0.6)', color: 'text-rose-600' };
  }
}

export function calculateBMR(weightKg: number, heightCm: number, ageYears: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5);
  } else {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161);
  }
}

export function calculateTDEE(bmr: number, activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active'): number {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725,
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.375));
}

export function generateDailyReportText(plan: PlanConfig, day: DayLog, dateStr: string): string {
  const breakdown = calculateDayScore(plan, day);
  const streak = calculateStreak(dateStr, plan);
  const waterGoal = calculateEffectiveWaterGoal(plan, day);
  const sleepHrs = getEffectiveSleepHours(day);

  // Fasting calculations
  let fastingReport = '';
  const fastingTarget = plan.fastingTargetHours || 16;
  if (day.completedFastingHours && day.completedFastingHours > 0) {
    fastingReport = `${day.completedFastingHours} ساعة صيام (الهدف: ${fastingTarget}h) ✅`;
  } else if (day.isFasting && day.fastingStartTime) {
    const elapsed = Number(((Date.now() - day.fastingStartTime) / 3600000).toFixed(1));
    fastingReport = `جاري الصيام (${elapsed} ساعة حتى الآن من هدف ${fastingTarget}h) ⏳`;
  } else if (plan.enableFastingTimer) {
    fastingReport = `نافذة الأكل مفتوحة (الهدف: ${fastingTarget} ساعة صيام)`;
  }

  const moodTexts = ['', 'منخفض جداً 😞', 'مرهق / متوتر 😐', 'معتدل ومستقر 🙂', 'نشيط وإيجابي 😊', 'ممتاز ومرتفع 🤩'];
  const moodStr = day.mood ? moodTexts[day.mood] || '—' : 'لم يسجل';

  let report = `📋 *تقرير المتابعة اليومي - د. شيماء*\n`;
  report += `👤 *الاسم:* ${plan.clientName}\n`;
  report += `📅 *التاريخ:* ${dateStr}\n`;
  report += `────────────────────────\n`;
  report += `🎯 *معدل الالتزام الكلي:* ${breakdown.total}%\n`;
  if (streak >= 1) {
    report += `🔥 *سلسلة الالتزام:* ${streak} ${streak === 1 ? 'يوم' : streak === 2 ? 'يومان' : 'أيام متتالية'}\n`;
  }
  if (day.isFreeze) {
    report += `❄️ *يوم راحة مسجل (Free Day)*\n`;
  }

  // 1. Body & Measurements
  report += `\n⚖️ *الوزن والقياسات:*\n`;
  if (day.weight && day.weight > 0) {
    report += `• الوزن الحالي: ${day.weight} كجم`;
    if (plan.heightCm) {
      const bmi = (day.weight / Math.pow(plan.heightCm / 100, 2)).toFixed(1);
      report += ` (BMI: ${bmi})`;
    }
    if (plan.targetWeight) {
      const diff = Number((day.weight - plan.targetWeight).toFixed(1));
      report += ` | المتبقي للمثالي: ${Math.abs(diff)} كجم`;
    }
    report += `\n`;
  } else {
    report += `• الوزن: لم يسجل اليوم\n`;
  }

  if (day.meas?.waist) {
    report += `• محيط الخصر: ${day.meas.waist} سم`;
    if (plan.heightCm) {
      const whtr = (day.meas.waist / plan.heightCm).toFixed(2);
      report += ` (نسبة الوسط للطول: ${whtr})`;
    }
    report += `\n`;
  }
  if (day.meas?.chest) report += `• محيط الصدر: ${day.meas.chest} سم\n`;
  if (day.meas?.hips) report += `• محيط الأرداف: ${day.meas.hips} سم\n`;
  if (day.meas?.arm) report += `• محيط الذراع: ${day.meas.arm} سم\n`;
  if (day.meas?.thigh) report += `• محيط الفخذ: ${day.meas.thigh} سم\n`;

  // 1.5 Lab Tests Summary (Latest 3 Tests)
  if (plan.labTracking?.entries && plan.labTracking.entries.length > 0) {
    const labLine = formatLabSummaryForWhatsApp(plan.labTracking.entries, 3);
    if (labLine) {
      report += `\n${labLine}\n`;
    }
  }

  // 2. Intermittent Fasting
  if (fastingReport) {
    report += `\n⏳ *الصيام المتقطع:*\n• ${fastingReport}\n`;
  }

  // 3. Hydration
  const waterPercent = Math.round(((day.water || 0) / waterGoal) * 100);
  report += `\n💧 *استهلاك الماء:*\n`;
  report += `• الكمية: ${day.water || 0} / ${waterGoal} مل (${waterPercent}%) - سجل ${day.waterLogs || 0} مرات\n`;

  // 4. Sleep
  report += `\n😴 *ساعات النوم والراحة:*\n`;
  if (sleepHrs > 0) {
    let sleepDetails = `${formatDurationString(sleepHrs)}`;
    if (day.sleep && day.wake) {
      sleepDetails += ` (من ${day.sleep} إلى ${day.wake})`;
    }
    if (day.quality) {
      sleepDetails += ` - جودة: ${day.quality}`;
    }
    report += `• ساعات النوم الفعلية: ${sleepDetails}\n`;
  } else {
    report += `• ساعات النوم: لم تسجل اليوم ⏳\n`;
  }

  // 5. Activity & Mood
  report += `\n🏃 *النشاط والمزاج:*\n`;
  if (day.exercise > 0) {
    report += `• النشاط الرياضي: ${day.exercise} دقيقة (~${day.exercise * 7} كالوري)\n`;
  } else {
    report += `• النشاط الرياضي: لم يسجل تمرين\n`;
  }
  report += `• المزاج ومستوى الطاقة: ${moodStr}\n`;

  // 6. Calories & Macros (if tracked)
  if (day.consumedCalories || day.consumedProtein || day.consumedCarbs || day.consumedFats) {
    report += `\n🔥 *السعرات والماكروز اليومية:*\n`;
    report += `• السعرات: ${day.consumedCalories || 0} / ${plan.targetCalories || '—'} سعرة\n`;
    report += `• بروتين: ${day.consumedProtein || 0} / ${plan.targetProtein || '—'} جم | كارب: ${day.consumedCarbs || 0} جم | دهون: ${day.consumedFats || 0} جم\n`;
  }

  // 7. Full Meal Details & Mindful Hunger-Fullness Scale
  let mindfulLoggedCount = 0;
  plan.meals.forEach((m) => {
    const st = day.meals[m.id];
    if (st && (st.hungerBefore || st.fullnessAfter)) {
      mindfulLoggedCount++;
    }
  });

  report += `\n🍽️ *تفاصيل الوجبات ومقياس الجوع والشبع:*\n`;
  if (mindfulLoggedCount > 0) {
    report += `🧠 *مؤشر الأكل الواعي:* تم تقييم مقياس الجوع/الشبع لـ ${mindfulLoggedCount} من ${plan.meals.length} وجبات ✨\n\n`;
  }

  plan.meals.forEach((m, idx) => {
    const st = day.meals[m.id] || {};
    let statusText = '⏳ لم تسجل';
    if (st.eval === 'yes') {
      statusText = st.type === 'alt' ? '🔄 تم الالتزام ببديل معتمد' : '✅ تم الالتزام الكامل';
    } else if (st.eval === 'no') {
      statusText = '⚠️ غير مطابق للخطة';
    }

    report += `${idx + 1}. *${m.name}* [${statusText}]\n`;
    if (st.type === 'alt' && st.detail) {
      report += `   ⭐ البديل المتناول: ${st.detail}\n`;
    } else if (st.eval === 'no' && (st.detail || st.reason)) {
      report += `   ⚠️ ما تم تناوله/السبب: ${st.detail || st.reason}\n`;
    } else {
      report += `   📋 المحتوى المقترح: ${m.items}\n`;
    }

    const qualityChecks: string[] = [];
    if (st.protein) qualityChecks.push('بروتين كافٍ ✅');
    if (st.veggies) qualityChecks.push('خضار وسلطة 🥗');
    if (qualityChecks.length > 0) {
      report += `   ✨ الجودة: ${qualityChecks.join(' • ')}\n`;
    }

    // Hunger-Fullness Scale details
    const hungerInfo = getHungerInfo(st.hungerBefore);
    const fullnessInfo = getHungerInfo(st.fullnessAfter);

    if (hungerInfo && fullnessInfo) {
      report += `   📊 مقياس الجوع والشبع (1-10):\n`;
      report += `      • قبل الأكل: ${hungerInfo.level}/10 (${hungerInfo.shortLabel})\n`;
      report += `      • بعد الأكل: ${fullnessInfo.level}/10 (${fullnessInfo.shortLabel})\n`;
    } else if (hungerInfo) {
      report += `   📊 مقياس الجوع قبل الأكل: ${hungerInfo.level}/10 (${hungerInfo.shortLabel})\n`;
    } else if (fullnessInfo) {
      report += `   📊 مقياس الشبع بعد الأكل: ${fullnessInfo.level}/10 (${fullnessInfo.shortLabel})\n`;
    }
  });

  // 8. Habits Checklist
  if (plan.checklist && plan.checklist.length > 0) {
    report += `\n✅ *العادات والالتزامات الصحية:*\n`;
    plan.checklist.forEach((c) => {
      const isDone = !!day.checks[c.id];
      report += `• ${isDone ? '✅' : '⏳'} ${c.label}\n`;
    });
  }

  // 9. Supplements
  if (plan.supplements && plan.supplements.length > 0) {
    report += `\n💊 *المكملات والفيتامينات:*\n`;
    plan.supplements.forEach((s) => {
      const isDone = !!day.supps[s.id];
      report += `• ${isDone ? '💊' : '⏳'} ${s.name}${s.time ? ` (${s.time})` : ''}\n`;
    });
  }

  // 9.5 Daily Medications & Adherence (Independent)
  const medItems = plan.medicationPlan?.items || [];
  const activeMeds = medItems.filter((m) => m.active !== false);
  if (plan.medicationPlan?.showToClient !== false && activeMeds.length > 0) {
    const scheduledDoses = getAllScheduledDoses(activeMeds);
    const medAdh = calculateDailyMedicationAdherence(activeMeds, day);
    const medLogs = day.medications || {};

    report += `\n💊 *سجل الأدوية والالتزام الدوائي اليومي:*\n`;
    if (medAdh.totalScheduledNonPRN > 0) {
      report += `• الالتزام الدوائي: ${medAdh.totalTaken}/${medAdh.totalScheduledNonPRN} جرعة (${medAdh.adherencePercentage}%)\n`;
    }

    scheduledDoses.forEach((d) => {
      const entry = medLogs[d.key];
      const statusIcon = entry?.status === 'taken' ? '✅ أُخذت' : entry?.status === 'skipped' ? '❌ لم تؤخذ' : entry?.status === 'postponed' ? '⏳ مؤجلة' : '⏳ لم تُسجل بعد';
      let line = `• ${d.medicationName} (${d.dose}) [${d.slotLabel}]: ${statusIcon}`;
      if (entry?.time) line += ` (سُجلت ${entry.time})`;
      if (entry?.note) line += ` | ملاحظة: "${entry.note}"`;
      report += `${line}\n`;
    });

    // Mention any notable appetite/weight effects noted by doctor
    const notedEffects: string[] = [];
    activeMeds.forEach((m) => {
      if (m.appetiteEffect && m.appetiteEffect !== 'none' && m.appetiteEffect !== 'unknown') {
        notedEffects.push(`${m.name}: ${APPETITE_EFFECT_LABELS[m.appetiteEffect].label}`);
      }
      if (m.weightEffect && m.weightEffect !== 'none' && m.weightEffect !== 'unknown') {
        notedEffects.push(`${m.name}: ${WEIGHT_EFFECT_LABELS[m.weightEffect].label}`);
      }
    });

    if (notedEffects.length > 0) {
      report += `💡 *تأثيرات دوائية متوقعة:* ${notedEffects.join(' • ')}\n`;
    }
  }

  // 9.8 Menstrual Cycle & Energy Context (If enabled)
  if (plan.cycleTracking?.enabled) {
    const cycleInfo = getCycleInfo(plan.cycleTracking, dateStr);
    const weightAvg = getWeightVsRecentAverage(dateStr, day.weight);

    report += `\n🌸 *سياق الدورة الشهرية والطاقة (للمتابعة):*\n`;
    if (cycleInfo.dayOfCycle !== null) {
      report += `• الطور: اليوم ${cycleInfo.dayOfCycle} (${cycleInfo.phaseName})\n`;
    }
    if (day.cycleDay?.periodStartedToday) {
      report += `• 🩸 بداية الحيض: سُجلت بداية دورة جديدة اليوم\n`;
    }
    if (day.cycleDay?.energy) {
      report += `• مستوى الطاقة: ${day.cycleDay.energy}/5\n`;
    }
    if (day.cycleDay?.symptoms && day.cycleDay.symptoms.length > 0) {
      const symLabels = day.cycleDay.symptoms
        .map((id) => CYCLE_SYMPTOMS.find((s) => s.id === id)?.label || id)
        .join('، ');
      report += `• أعراض دورة مسجلة: ${symLabels}\n`;
    }
    if (day.cycleDay?.note?.trim()) {
      report += `• ملاحظة الدورة: "${day.cycleDay.note.trim()}"\n`;
    }
    if (weightAvg.diffFromAverage !== null) {
      const sign = weightAvg.diffFromAverage > 0 ? `+${weightAvg.diffFromAverage}` : `${weightAvg.diffFromAverage}`;
      report += `• تذبذب الوزن: ${sign} كجم عن متوسط الأسبوع (احتباس سوائل محتمل)\n`;
    }
    if (plan.cycleTracking.clinicalFlags && plan.cycleTracking.clinicalFlags.length > 0) {
      const flagLabels = plan.cycleTracking.clinicalFlags
        .map((f) => CLINICAL_FLAGS_META[f]?.label || f)
        .join(' • ');
      report += `• سياق سريري مسجل: ${flagLabels}\n`;
    }
  }

  // 10. Symptoms
  const activeSymptoms = plan.symptomsList.filter((s) => day.symptoms[s.id]).map((s) => s.label);
  if (activeSymptoms.length > 0 || day.symNotes?.trim()) {
    report += `\n🩺 *الأعراض والشكاوى الصحية:*\n`;
    if (activeSymptoms.length > 0) {
      report += `• الأعراض: ${activeSymptoms.join('، ')}\n`;
    }
    if (day.symNotes?.trim()) {
      report += `• تفاصيل الشكوى: "${day.symNotes.trim()}"\n`;
    }
  }

  // 11. Notes to Doctor
  if (day.notes?.trim()) {
    report += `\n💬 *رسالة واستفسار لـ د. شيماء:*\n"${day.notes.trim()}"\n`;
  }

  report += `\n────────────────────────\n`;
  report += `📱 *Smart Diet System - د. شيماء*`;

  return report;
}
