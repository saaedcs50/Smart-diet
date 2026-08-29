import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Calendar,
  Zap,
  Check,
  Info,
  Droplets,
  Settings,
  Heart
} from 'lucide-react';
import { DayLog, PlanConfig } from '../types';
import {
  getCycleInfo,
  CYCLE_SYMPTOMS,
  CYCLE_DISCLAIMER,
  CLINICAL_FLAGS_META
} from '../utils/cycleTracking';

interface CycleTrackerCardProps {
  plan: PlanConfig;
  day: DayLog;
  currentDate: string;
  onUpdateDay: (updater: (prev: DayLog) => DayLog) => void;
  onUpdatePlan: (updater: (prev: PlanConfig) => PlanConfig) => void;
  onNotify?: (msg: string) => void;
}

export const CycleTrackerCard: React.FC<CycleTrackerCardProps> = ({
  plan,
  day,
  currentDate,
  onUpdateDay,
  onUpdatePlan,
  onNotify,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // Settings form state
  const cycleConfig = plan.cycleTracking;
  const [tempStartDate, setTempStartDate] = useState<string>(cycleConfig?.lastPeriodStart || currentDate);
  const [tempCycleLength, setTempCycleLength] = useState<number>(cycleConfig?.typicalCycleLength || 28);
  const [tempPeriodLength, setTempPeriodLength] = useState<number>(cycleConfig?.typicalPeriodLength || 5);
  const [tempRegularity, setTempRegularity] = useState<'regular' | 'irregular' | 'unknown'>(cycleConfig?.regularity || 'regular');

  if (!cycleConfig || !cycleConfig.enabled) {
    return null;
  }

  const cycleInfo = getCycleInfo(cycleConfig, currentDate);
  const cycleLog = day.cycleDay || { symptoms: [] };
  const selectedSymptoms = cycleLog.symptoms || [];

  // Toggle a symptom
  const handleToggleSymptom = (symptomId: string) => {
    onUpdateDay((prev) => {
      const current = prev.cycleDay || { symptoms: [] };
      const exists = (current.symptoms || []).includes(symptomId);
      const newSymptoms = exists
        ? (current.symptoms || []).filter((id) => id !== symptomId)
        : [...(current.symptoms || []), symptomId];

      return {
        ...prev,
        cycleDay: {
          ...current,
          symptoms: newSymptoms,
          ...(symptomId === 'spotting' ? { spotting: !exists } : {}),
        },
      };
    });
  };

  // Set energy
  const handleSetEnergy = (level: number) => {
    onUpdateDay((prev) => {
      const current = prev.cycleDay || { symptoms: [] };
      const newEnergy = current.energy === level ? null : level;
      return {
        ...prev,
        cycleDay: {
          ...current,
          energy: newEnergy,
        },
      };
    });
  };

  // Set note
  const handleSetNote = (noteText: string) => {
    onUpdateDay((prev) => {
      const current = prev.cycleDay || { symptoms: [] };
      return {
        ...prev,
        cycleDay: {
          ...current,
          note: noteText,
        },
      };
    });
  };

  // Quick button: "بدأ الحيض اليوم"
  const handlePeriodStartedToday = () => {
    // 1. Update Day Log
    onUpdateDay((prev) => {
      const current = prev.cycleDay || { symptoms: [] };
      return {
        ...prev,
        cycleDay: {
          ...current,
          periodStartedToday: true,
        },
      };
    });

    // 2. Update Plan Cycle Tracking
    onUpdatePlan((prev) => {
      const prevConfig = prev.cycleTracking || {
        enabled: true,
        showPhaseToClient: true,
        regularity: 'regular',
        typicalCycleLength: 28,
        typicalPeriodLength: 5,
        clinicalFlags: [],
      };

      const starts = prevConfig.cycleStarts ? [...prevConfig.cycleStarts] : [];
      if (!starts.includes(currentDate)) {
        starts.push(currentDate);
        starts.sort();
      }

      return {
        ...prev,
        cycleTracking: {
          ...prevConfig,
          lastPeriodStart: currentDate,
          cycleStarts: starts,
          lastUpdatedAt: new Date().toISOString(),
          lastUpdatedBy: 'client',
        },
      };
    });

    onNotify?.('تم تسجيل بداية الحيض اليوم بنجاح وإعادة ضبط أيام الدورة 🩸');
  };

  // Save Settings Modal
  const handleSaveSettings = () => {
    onUpdatePlan((prev) => {
      const prevConfig = prev.cycleTracking || {
        enabled: true,
        showPhaseToClient: true,
        regularity: 'regular',
        typicalCycleLength: 28,
        typicalPeriodLength: 5,
        clinicalFlags: [],
      };

      const starts = prevConfig.cycleStarts ? [...prevConfig.cycleStarts] : [];
      if (tempStartDate && !starts.includes(tempStartDate)) {
        starts.push(tempStartDate);
        starts.sort();
      }

      return {
        ...prev,
        cycleTracking: {
          ...prevConfig,
          lastPeriodStart: tempStartDate,
          typicalCycleLength: tempCycleLength,
          typicalPeriodLength: tempPeriodLength,
          regularity: tempRegularity,
          cycleStarts: starts,
          lastUpdatedAt: new Date().toISOString(),
          lastUpdatedBy: 'client',
        },
      };
    });

    setShowSettingsModal(false);
    onNotify?.('تم تحديث إعدادات الدورة الشهرية بنجاح 🌸');
  };

  const energyLabels: Record<number, { label: string; icon: string; color: string }> = {
    1: { label: 'منخفضة جداً', icon: '🔋', color: 'text-rose-500' },
    2: { label: 'هادئة / مجهدة', icon: '🪫', color: 'text-amber-500' },
    3: { label: 'معتدلة', icon: '⚡', color: 'text-yellow-500' },
    4: { label: 'نشيطة', icon: '✨', color: 'text-teal-500' },
    5: { label: 'طاقة عالية', icon: '🔥', color: 'text-emerald-500' },
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-rose-100 dark:border-rose-950/60 shadow-sm overflow-hidden transition-all">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-rose-50/80 via-pink-50/40 to-white dark:from-rose-950/30 dark:via-pink-950/10 dark:to-slate-900 border-b border-rose-100/70 dark:border-rose-950/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold shadow-sm">
            🌸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                دورة اليوم والأعراض
              </h3>
              {cycleConfig.showPhaseToClient !== false && cycleInfo.dayOfCycle !== null && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${cycleInfo.colorClass.badge}`}
                >
                  {cycleInfo.phaseBadge}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              متابعة الطور الهرموني، الأعراض، ومستوى الطاقة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowSettingsModal(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-rose-100/50 dark:hover:bg-rose-950/40 transition-colors text-xs flex items-center gap-1"
            title="تعديل تواريخ وإعدادات الدورة"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-medium">الإعدادات</span>
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-rose-100/50 dark:hover:bg-rose-950/40 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Phase Banner & Quick Info */}
          <div className={`p-3 rounded-xl border ${cycleInfo.colorClass.border} ${cycleInfo.colorClass.bg}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <span className="text-sm">{cycleInfo.icon}</span>
                  <span className={cycleInfo.colorClass.text}>{cycleInfo.phaseName}</span>
                  {cycleInfo.dayOfCycle && (
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                      (اليوم {cycleInfo.dayOfCycle} من الدورة)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cycleInfo.description}
                </p>
                <div className="pt-1 flex items-start gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">إرشاد غذائي: </strong>
                    {cycleInfo.nutritionTip}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Period Start Action */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-dashed border-rose-200 dark:border-rose-900/60">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-rose-500 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {cycleLog.periodStartedToday ? '✅ تم تسجيل بداية الحيض اليوم' : 'هل بدأ الحيض اليوم؟'}
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {cycleConfig.lastPeriodStart
                    ? `آخر بداية مسجلة: ${cycleConfig.lastPeriodStart}`
                    : 'سجّلي أول يوم لإعادة احتساب الطور بدقة'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePeriodStartedToday}
              disabled={cycleLog.periodStartedToday}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                cycleLog.periodStartedToday
                  ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 cursor-default'
                  : 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95'
              }`}
            >
              <span>🩸</span>
              <span>{cycleLog.periodStartedToday ? 'بدأ اليوم (مسجل)' : 'بدأ الحيض اليوم'}</span>
            </button>
          </div>

          {/* Energy Scale (1 to 5) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>مستوى الطاقة والنشاط اليوم:</span>
              </label>
              {cycleLog.energy && (
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  {energyLabels[cycleLog.energy]?.label} ({cycleLog.energy}/5)
                </span>
              )}
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((lvl) => {
                const isSelected = cycleLog.energy === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleSetEnergy(lvl)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 border transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-600 shadow-sm scale-[1.02]'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                    }`}
                  >
                    <span className="text-xs">{energyLabels[lvl]?.icon}</span>
                    <span className="text-[11px]">{lvl}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Symptoms Chips */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>أعراض الدورة والتقلبات اليومية (اختياري):</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CYCLE_SYMPTOMS.map((sym) => {
                const isChecked = selectedSymptoms.includes(sym.id);
                return (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => handleToggleSymptom(sym.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                      isChecked
                        ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-800'
                    }`}
                  >
                    <span>{sym.icon}</span>
                    <span>{sym.label}</span>
                    {isChecked && <Check className="w-3 h-3 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note Field */}
          <div className="space-y-1">
            <input
              type="text"
              value={cycleLog.note || ''}
              onChange={(e) => handleSetNote(e.target.value)}
              placeholder="ملاحظة قصيرة عن اليوم (مثال: انتفاخ شديد بالمساء، نوم متقطع...)"
              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-rose-400 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {/* Clinical Flags Note (If set by coach) */}
          {cycleConfig.clinicalFlags && cycleConfig.clinicalFlags.length > 0 && (
            <div className="p-2.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40 text-[11px] text-teal-800 dark:text-teal-300 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>سياق سريري معتمد من الأخصائية:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cycleConfig.clinicalFlags.map((flag) => {
                  const meta = CLINICAL_FLAGS_META[flag];
                  return (
                    <span
                      key={flag}
                      className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-[10px] font-bold"
                    >
                      {meta?.label || flag}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fixed Disclaimer */}
          <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed text-center">
            🔒 {CYCLE_DISCLAIMER}
          </p>
        </div>
      )}

      {/* Client Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-sm w-full p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span>🌸</span>
                <span>إعدادات تتبع الدورة</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  تاريخ بداية آخر حيض:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={tempStartDate}
                    onChange={(e) => setTempStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    طول الدورة المعتاد (يوم):
                  </label>
                  <input
                    type="number"
                    min={21}
                    max={45}
                    value={tempCycleLength}
                    onChange={(e) => setTempCycleLength(parseInt(e.target.value) || 28)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                  <span className="text-[10px] text-slate-400">افتراضي 28 (21–45)</span>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    أيام الحيض المعتادة:
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={10}
                    value={tempPeriodLength}
                    onChange={(e) => setTempPeriodLength(parseInt(e.target.value) || 5)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                  <span className="text-[10px] text-slate-400">افتراضي 5 (2–10)</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  انتظام الدورة:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { id: 'regular', label: 'منتظمة' },
                      { id: 'irregular', label: 'غير منتظمة' },
                      { id: 'unknown', label: 'غير معروف' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTempRegularity(opt.id)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                        tempRegularity === opt.id
                          ? 'bg-rose-600 text-white border-rose-700'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              >
                حفظ الإعدادات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
