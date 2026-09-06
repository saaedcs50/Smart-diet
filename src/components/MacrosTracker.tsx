import React, { useState } from 'react';
import { Flame, PieChart, Plus, Check } from 'lucide-react';
import { DayLog, PlanConfig } from '../types';
import { HelpButton } from './FeatureHelpModal';

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
    <div className="bg-white dark:bg-[#2D103E] border border-[#D8C4E9]/80 dark:border-[#542870]/80 rounded-3xl p-5 shadow-sm transition-colors space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E0922D]/10 dark:bg-[#E0922D]/20 text-[#E0922D] dark:text-[#F2C66D] flex items-center justify-center font-bold text-sm">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-sm">
                السعرات والماكروز المستهدفة
              </h3>
              <HelpButton featureId="macrosTracker" size="sm" />
            </div>
            <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4]">
              هدف اليوم: {targetCal} سعرة حرارية
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowEdit(!showEdit)}
          className="text-xs font-bold px-2.5 py-1 rounded-xl bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#3A124D] dark:text-[#EDE5F5] hover:bg-[#F1E9F8] dark:hover:bg-[#3D1B53] border border-[#D8C4E9]/60 dark:border-[#542870]/60 transition-colors cursor-pointer"
        >
          {showEdit ? 'إغلاق ✕' : 'تعديل الاستهلاك ✏️'}
        </button>
      </div>

      {/* Main Calorie Progress Bar */}
      <div>
        <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
          <span className="text-[#3A124D] dark:text-[#EDE5F5]">
            السعرات: {currentCal} / {targetCal} ك.كالوري
          </span>
          <span className="text-[#E0922D] dark:text-[#F2C66D]">
            {calPercent}%
          </span>
        </div>
        <div className="w-full bg-[#F1E9F8] dark:bg-[#3D1B53] h-3 rounded-full overflow-hidden p-0.5 border border-[#D8C4E9]/50 dark:border-[#542870]/50">
          <div
            className="h-full bg-gradient-to-r from-[#E0922D] via-[#E21B6D] to-[#5B2482] rounded-full transition-all duration-500"
            style={{ width: `${calPercent}%` }}
          />
        </div>
      </div>

      {/* 3 Macros Columns (Protein, Carbs, Fats) */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        {/* Protein */}
        <div className="bg-[#F8F7F9] dark:bg-[#3D1B53]/50 p-2.5 rounded-2xl border border-[#D8C4E9]/50 dark:border-[#542870]/50 text-center">
          <span className="text-[10px] font-bold text-[#0D9488] dark:text-[#2DD4BF] block">
            🥩 بروتين
          </span>
          <span className="text-xs font-extrabold text-[#3A124D] dark:text-[#EDE5F5] block my-0.5">
            {currentProt} / {targetProt} جم
          </span>
          <div className="w-full bg-[#E5D7F2] dark:bg-[#542870] h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-[#0D9488] h-full rounded-full" style={{ width: `${protPercent}%` }} />
          </div>
        </div>

        {/* Carbs */}
        <div className="bg-[#F8F7F9] dark:bg-[#3D1B53]/50 p-2.5 rounded-2xl border border-[#D8C4E9]/50 dark:border-[#542870]/50 text-center">
          <span className="text-[10px] font-bold text-[#0284C7] dark:text-[#38BDF8] block">
            🌾 نشويات
          </span>
          <span className="text-xs font-extrabold text-[#3A124D] dark:text-[#EDE5F5] block my-0.5">
            {currentCarbs} / {targetCarbs} جم
          </span>
          <div className="w-full bg-[#E5D7F2] dark:bg-[#542870] h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-[#0284C7] h-full rounded-full" style={{ width: `${carbsPercent}%` }} />
          </div>
        </div>

        {/* Fats */}
        <div className="bg-[#F8F7F9] dark:bg-[#3D1B53]/50 p-2.5 rounded-2xl border border-[#D8C4E9]/50 dark:border-[#542870]/50 text-center">
          <span className="text-[10px] font-bold text-[#E0922D] dark:text-[#F2C66D] block">
            🥑 دهون صحية
          </span>
          <span className="text-xs font-extrabold text-[#3A124D] dark:text-[#EDE5F5] block my-0.5">
            {currentFats} / {targetFats} جم
          </span>
          <div className="w-full bg-[#E5D7F2] dark:bg-[#542870] h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-[#E0922D] h-full rounded-full" style={{ width: `${fatsPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Manual Quick Intake Input Form */}
      {showEdit && (
        <div className="p-3.5 rounded-2xl bg-[#E0922D]/10 dark:bg-[#E0922D]/15 border border-[#E0922D]/30 space-y-2.5 animate-in slide-in-from-top duration-150">
          <span className="text-xs font-bold text-[#E0922D] dark:text-[#F2C66D] block">
            سجّل إجمالي أكلك الفعلي للنهاردة:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-[#6F5A7D] dark:text-[#B792D4] mb-0.5">السعرات (ك.كالوري)</label>
              <input
                type="number"
                value={day.consumedCalories || ''}
                onChange={(e) => handleSaveIntake({ consumedCalories: parseInt(e.target.value, 10) || 0 })}
                placeholder="2000"
                className="w-full text-xs font-bold p-2 rounded-xl border border-[#D8C4E9]/70 dark:border-[#542870]/70 bg-white dark:bg-[#2D103E] text-[#3A124D] dark:text-[#EDE5F5]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#6F5A7D] dark:text-[#B792D4] mb-0.5">بروتين (جم)</label>
              <input
                type="number"
                value={day.consumedProtein || ''}
                onChange={(e) => handleSaveIntake({ consumedProtein: parseInt(e.target.value, 10) || 0 })}
                placeholder="140"
                className="w-full text-xs font-bold p-2 rounded-xl border border-[#D8C4E9]/70 dark:border-[#542870]/70 bg-white dark:bg-[#2D103E] text-[#3A124D] dark:text-[#EDE5F5]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#6F5A7D] dark:text-[#B792D4] mb-0.5">نشويات (جم)</label>
              <input
                type="number"
                value={day.consumedCarbs || ''}
                onChange={(e) => handleSaveIntake({ consumedCarbs: parseInt(e.target.value, 10) || 0 })}
                placeholder="180"
                className="w-full text-xs font-bold p-2 rounded-xl border border-[#D8C4E9]/70 dark:border-[#542870]/70 bg-white dark:bg-[#2D103E] text-[#3A124D] dark:text-[#EDE5F5]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#6F5A7D] dark:text-[#B792D4] mb-0.5">دهون (جم)</label>
              <input
                type="number"
                value={day.consumedFats || ''}
                onChange={(e) => handleSaveIntake({ consumedFats: parseInt(e.target.value, 10) || 0 })}
                placeholder="55"
                className="w-full text-xs font-bold p-2 rounded-xl border border-[#D8C4E9]/70 dark:border-[#542870]/70 bg-white dark:bg-[#2D103E] text-[#3A124D] dark:text-[#EDE5F5]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
