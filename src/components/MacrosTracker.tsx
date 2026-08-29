import React, { useState } from 'react';
import { Flame, PieChart, Plus, Check } from 'lucide-react';
import { DayLog, PlanConfig } from '../types';

interface MacrosTrackerProps {
  plan: PlanConfig;
  day: DayLog;
  onUpdateDay: (updated: DayLog) => void;
}

export const MacrosTracker: React.FC<MacrosTrackerProps> = ({ plan, day, onUpdateDay }) => {
  const [showEdit, setShowEdit] = useState(false);

  const targetCal = plan.targetCalories || 2000;
  const targetProt = plan.targetProtein || 140;
  const targetCarbs = plan.targetCarbs || 180;
  const targetFats = plan.targetFats || 55;

  const currentCal = day.consumedCalories || 0;
  const currentProt = day.consumedProtein || 0;
  const currentCarbs = day.consumedCarbs || 0;
  const currentFats = day.consumedFats || 0;

  const calPercent = Math.min(100, Math.round((currentCal / targetCal) * 100));
  const protPercent = Math.min(100, Math.round((currentProt / targetProt) * 100));
  const carbsPercent = Math.min(100, Math.round((currentCarbs / targetCarbs) * 100));
  const fatsPercent = Math.min(100, Math.round((currentFats / targetFats) * 100));

  const handleSaveIntake = (updates: Partial<DayLog>) => {
    onUpdateDay({ ...day, ...updates });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 flex items-center justify-center font-bold text-sm">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
              السعرات والماكروز المستهدفة
            </h3>
            <span className="text-[11px] text-slate-400">
              هدف اليوم: {targetCal} سعرة حرارية
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowEdit(!showEdit)}
          className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {showEdit ? 'إغلاق ✕' : 'تعديل الاستهلاك ✏️'}
        </button>
      </div>

      {/* Main Calorie Progress Bar */}
      <div>
        <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
          <span className="text-slate-700 dark:text-slate-300">
            السعرات: {currentCal} / {targetCal} ك.كالوري
          </span>
          <span className="text-orange-600 dark:text-orange-400">
            {calPercent}%
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${calPercent}%` }}
          />
        </div>
      </div>

      {/* 3 Macros Columns (Protein, Carbs, Fats) */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        {/* Protein */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">
            🥩 بروتين
          </span>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 block my-0.5">
            {currentProt} / {targetProt} جم
          </span>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${protPercent}%` }} />
          </div>
        </div>

        {/* Carbs */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 block">
            🌾 نشويات
          </span>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 block my-0.5">
            {currentCarbs} / {targetCarbs} جم
          </span>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${carbsPercent}%` }} />
          </div>
        </div>

        {/* Fats */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block">
            🥑 دهون صحية
          </span>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 block my-0.5">
            {currentFats} / {targetFats} جم
          </span>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${fatsPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Manual Quick Intake Input Form */}
      {showEdit && (
        <div className="p-3.5 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 space-y-2.5 animate-in slide-in-from-top duration-150">
          <span className="text-xs font-bold text-orange-900 dark:text-orange-200 block">
            سجّل إجمالي أكلك الفعلي للنهاردة:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">السعرات (ك.كالوري)</label>
              <input
                type="number"
                value={day.consumedCalories || ''}
                onChange={(e) => handleSaveIntake({ consumedCalories: parseInt(e.target.value, 10) || 0 })}
                placeholder="2000"
                className="w-full text-xs font-bold p-2 rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">بروتين (جم)</label>
              <input
                type="number"
                value={day.consumedProtein || ''}
                onChange={(e) => handleSaveIntake({ consumedProtein: parseInt(e.target.value, 10) || 0 })}
                placeholder="140"
                className="w-full text-xs font-bold p-2 rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">نشويات (جم)</label>
              <input
                type="number"
                value={day.consumedCarbs || ''}
                onChange={(e) => handleSaveIntake({ consumedCarbs: parseInt(e.target.value, 10) || 0 })}
                placeholder="180"
                className="w-full text-xs font-bold p-2 rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">دهون (جم)</label>
              <input
                type="number"
                value={day.consumedFats || ''}
                onChange={(e) => handleSaveIntake({ consumedFats: parseInt(e.target.value, 10) || 0 })}
                placeholder="55"
                className="w-full text-xs font-bold p-2 rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
