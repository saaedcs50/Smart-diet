import React, { useState } from 'react';
import { 
  BarChart3, 
  Share2, 
  Calendar, 
  TrendingUp, 
  Award, 
  Flame, 
  Copy,
  Sparkles
} from 'lucide-react';
import { PlanConfig, DayLog } from '../types';
import { 
  calculateDayScore, 
  calculateStreak, 
  parseSleepHours, 
  calculateEffectiveWaterGoal,
  formatDurationString
} from '../utils/calculations';
import { loadDayLog, getAllStoredDayLogs } from '../utils/storage';
import { getCycleInfo, CLINICAL_FLAGS_META, CYCLE_SYMPTOMS, WEIGHT_FLUCTUATION_NOTE } from '../utils/cycleTracking';
import { formatLabSummaryForWhatsApp } from '../utils/labTracking';

interface ReportsTabProps {
  plan: PlanConfig;
  currentDate: string;
  isDarkMode: boolean;
  onNotify: (msg: string) => void;
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  plan,
  currentDate,
  isDarkMode,
  onNotify,
}) => {
  const [rangeDays, setRangeDays] = useState<number>(7);
  const [chartMetric, setChartMetric] = useState<'score' | 'weight' | 'water' | 'exercise'>('score');

  // Generate historical data points for the selected range
  const historyData = (() => {
    const list: { date: string; log: DayLog; score: number }[] = [];
    const ref = new Date(currentDate);

    for (let i = rangeDays - 1; i >= 0; i--) {
      const d = new Date(ref);
      d.setDate(ref.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const log = loadDayLog(dateStr);
      const score = calculateDayScore(plan, log).total;
      list.push({ date: dateStr, log, score });
    }
    return list;
  })();

  // Summary Metrics calculation
  const totalScores = historyData.reduce((acc, item) => acc + item.score, 0);
  const avgScore = Math.round(totalScores / (historyData.length || 1));

  const loggedWeights = historyData.map((d) => d.log.weight).filter((w): w is number => typeof w === 'number' && w > 0);
  const avgWeight = loggedWeights.length > 0
    ? (loggedWeights.reduce((a, b) => a + b, 0) / loggedWeights.length).toFixed(1)
    : null;

  const firstWeight = loggedWeights[0] || null;
  const lastWeight = loggedWeights[loggedWeights.length - 1] || null;
  const netWeightChange = firstWeight && lastWeight ? parseFloat((lastWeight - firstWeight).toFixed(1)) : null;

  const bestDay = historyData.reduce((prev, cur) => (cur.score > prev.score ? cur : prev), historyData[0]);

  // Generate Weekly WhatsApp Summary
  const handleCopyWeeklySummary = () => {
    let msg = `📊 *ملخص التطور الأسبوعي للكابتن*\n`;
    msg += `👤 *البطل:* ${plan.clientName}\n`;
    if (plan.medicalConditions?.conditions && plan.medicalConditions.conditions.length > 0) {
      msg += `🩺 *الحالات المرضية المسجلة:* ${plan.medicalConditions.conditions.map((c) => c.label).join(' • ')}\n`;
    }
    if (plan.medicalConditions?.allergies && plan.medicalConditions.allergies.length > 0) {
      msg += `🚫 *محظورات الطعام والحساسية:* ${plan.medicalConditions.allergies.join(' • ')}\n`;
    }
    if (plan.medicationPlan?.items && plan.medicationPlan.items.filter((m) => m.active !== false).length > 0) {
      msg += `💊 *الأدوية المعتمدة:* ${plan.medicationPlan.items.filter((m) => m.active !== false).map((m) => `${m.name} (${m.dose})`).join(' • ')}\n`;
    }
    if (plan.labTracking?.entries && plan.labTracking.entries.length > 0) {
      const labLine = formatLabSummaryForWhatsApp(plan.labTracking.entries, 3);
      if (labLine) msg += `${labLine}\n`;
    }
    if (plan.cycleTracking?.enabled) {
      const cycleInfo = getCycleInfo(plan.cycleTracking, currentDate);
      msg += `🌸 *طور الدورة الحالي:* اليوم ${cycleInfo.dayOfCycle || '–'} (${cycleInfo.phaseName})\n`;
      if (plan.cycleTracking.clinicalFlags && plan.cycleTracking.clinicalFlags.length > 0) {
        msg += `🩺 *سياق سريري:* ${plan.cycleTracking.clinicalFlags.map((f) => CLINICAL_FLAGS_META[f]?.label || f).join(' • ')}\n`;
      }
    }
    msg += `📅 *الفترة:* آخر ${rangeDays} أيام حتى ${currentDate}\n`;
    msg += `────────────────\n`;
    msg += `🎯 *متوسط الالتزام العام:* ${avgScore}%\n`;
    if (avgWeight) {
      msg += `⚖️ *متوسط الوزن:* ${avgWeight} كجم\n`;
    }
    if (netWeightChange !== null) {
      msg += `📈 *صافي تغير الوزن:* ${netWeightChange > 0 ? `+${netWeightChange}` : netWeightChange} كجم\n`;
    }
    msg += `🌟 *أفضل يوم التزام:* ${bestDay.date} (${bestDay.score}%)\n`;
    msg += `────────────────\n`;
    msg += `📱 *مبعوت من تطبيق متابع التغذية والصحة*`;

    navigator.clipboard.writeText(msg).then(() => {
      onNotify('تم نسخ ملخص الفترة للواتساب 📋');
    });
  };

  const handleShareWhatsApp = () => {
    let msg = `📊 *ملخص التطور الأسبوعي للكابتن*\n👤 *البطل:* ${plan.clientName}\n🎯 *متوسط الالتزام:* ${avgScore}%\n`;
    if (avgWeight) msg += `⚖️ *متوسط الوزن:* ${avgWeight} كجم\n`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-150">
      {/* 1. Summary Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center font-bold text-sm">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                ملخص وإحصائيات التطور 📊
              </h3>
              <span className="text-[11px] text-slate-400">
                متابعة نتائج التزامك ووزنك عبر الأيام
              </span>
            </div>
          </div>

          {/* Time range selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {[7, 14, 30].map((days) => (
              <button
                key={days}
                onClick={() => setRangeDays(days)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  rangeDays === days
                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {days} أيام
              </button>
            ))}
          </div>
        </div>

        {/* 4 Stat Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
              🎯 متوسط الالتزام
            </span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              {avgScore}%
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
              ⚖️ متوسط الوزن
            </span>
            <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">
              {avgWeight ? `${avgWeight} كجم` : '—'}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
              📉 صافي التغير
            </span>
            <span
              className={`text-base font-extrabold ${
                netWeightChange !== null && netWeightChange < 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : netWeightChange !== null && netWeightChange > 0
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-800 dark:text-slate-100'
              }`}
            >
              {netWeightChange !== null ? `${netWeightChange > 0 ? `+${netWeightChange}` : netWeightChange} كجم` : '—'}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
              👑 أفضل يوم
            </span>
            <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 block truncate">
              {bestDay ? `${bestDay.score}% (${bestDay.date.slice(5)})` : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Visual Bar Trend Graph */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">
            منحنى المتابعة اليومية
          </h4>

          {/* Metric switcher */}
          <div className="flex items-center gap-1">
            {[
              { id: 'score', label: 'الالتزام %' },
              { id: 'weight', label: 'الوزن' },
              { id: 'water', label: 'المية' },
              { id: 'exercise', label: 'الرياضة' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setChartMetric(m.id as any)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  chartMetric === m.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* CSS Flex Bar Chart */}
        <div className="h-44 flex items-end justify-between gap-1.5 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
          {historyData.map((pt, idx) => {
            let val = 0;
            let displayVal = '';
            let barHeightPercent = 0;

            if (chartMetric === 'score') {
              val = pt.score;
              displayVal = `${val}%`;
              barHeightPercent = val;
            } else if (chartMetric === 'weight') {
              val = pt.log.weight || 0;
              displayVal = val > 0 ? `${val}` : '—';
              barHeightPercent = val > 0 ? Math.min(100, Math.max(20, (val / 120) * 100)) : 0;
            } else if (chartMetric === 'water') {
              val = pt.log.water || 0;
              displayVal = `${val}`;
              barHeightPercent = Math.min(100, (val / 3500) * 100);
            } else if (chartMetric === 'exercise') {
              val = pt.log.exercise || 0;
              displayVal = `${val}د`;
              barHeightPercent = Math.min(100, (val / 60) * 100);
            }

            return (
              <div key={idx} className="flex-1 min-w-[28px] flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {displayVal}
                </span>

                <div className="w-full max-w-[24px] bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden h-32 flex items-end">
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      chartMetric === 'score'
                        ? val >= 80
                          ? 'bg-emerald-500'
                          : val >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                        : chartMetric === 'water'
                        ? 'bg-blue-500'
                        : chartMetric === 'exercise'
                        ? 'bg-purple-500'
                        : 'bg-teal-500'
                    }`}
                    style={{ height: `${Math.max(6, barHeightPercent)}%` }}
                  />
                </div>

                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">
                  {pt.date.slice(8)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2.5 Menstrual Cycle & Hormone Phase Review (Coach & Client insight) */}
      {plan.cycleTracking?.enabled && (() => {
        const cycleInfo = getCycleInfo(plan.cycleTracking, currentDate);
        // Collect symptoms recorded in this range
        const recordedSymptomsMap: Record<string, number> = {};
        historyData.forEach((d) => {
          d.log.cycleDay?.symptoms?.forEach((symId) => {
            recordedSymptomsMap[symId] = (recordedSymptomsMap[symId] || 0) + 1;
          });
        });
        const recordedSymptomsList = Object.entries(recordedSymptomsMap).sort((a, b) => b[1] - a[1]);

        return (
          <div className="bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 rounded-3xl p-5 shadow-xs transition-colors space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
                  🌸
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                    تقرير الدورة الشهرية والسياق الهرموني 🌸
                  </h3>
                  {cycleInfo.dayOfCycle !== null && (
                    <span className="text-[11px] text-slate-400">
                      اليوم {cycleInfo.dayOfCycle} من الدورة • طور: {cycleInfo.phaseName}
                    </span>
                  )}
                </div>
              </div>

              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cycleInfo.colorClass.badge}`}>
                {cycleInfo.phaseBadge}
              </span>
            </div>

            {/* Clinical context flags */}
            {plan.cycleTracking.clinicalFlags && plan.cycleTracking.clinicalFlags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {plan.cycleTracking.clinicalFlags.map((flag) => {
                  const meta = CLINICAL_FLAGS_META[flag];
                  return (
                    <span
                      key={flag}
                      className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                    >
                      🏷️ {meta?.label || flag}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Symptoms in this period */}
            {recordedSymptomsList.length > 0 ? (
              <div className="p-3 rounded-2xl bg-rose-50/50 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/30 space-y-1.5">
                <span className="text-xs font-bold text-rose-900 dark:text-rose-200 block">
                  الأعراض المسجلة خلال هذه الفترة ({rangeDays} أيام):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {recordedSymptomsList.map(([symId, count]) => {
                    const sym = CYCLE_SYMPTOMS.find((s) => s.id === symId);
                    return (
                      <span
                        key={symId}
                        className="px-2.5 py-1 rounded-xl text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-rose-200/60 dark:border-rose-900/40"
                      >
                        {sym?.icon} {sym?.label || symId} ({count}x)
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                لم يتم تسجيل أي أعراض دورة خاصة خلال هذه الفترة.
              </p>
            )}

            {/* Coach notes if any */}
            {plan.cycleTracking.coachNotes && (
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                  💡 إرشادات الأخصائية للهرمونات والتغذية:
                </span>
                {plan.cycleTracking.coachNotes}
              </div>
            )}
          </div>
        );
      })()}

      {/* 3. Export Summary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        <button
          onClick={handleShareWhatsApp}
          className="py-3 px-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          إرسال ملخص واتساب
        </button>

        <button
          onClick={handleCopyWeeklySummary}
          className="py-3 px-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Copy className="w-4 h-4" />
          نسخ الملخص
        </button>
      </div>
    </div>
  );
};
