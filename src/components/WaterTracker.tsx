import React, { useState } from 'react';
import { Droplets, Plus, RotateCcw, Sparkles } from 'lucide-react';
import { DayLog, PlanConfig } from '../types';
import { calculateEffectiveWaterGoal } from '../utils/calculations';
import { HelpButton } from './FeatureHelpModal';

interface WaterTrackerProps {
  plan: PlanConfig;
  day: DayLog;
  onUpdateDay: (updated: DayLog) => void;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({ plan, day, onUpdateDay }) => {
  const [customMl, setCustomMl] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const goal = calculateEffectiveWaterGoal(plan, day);
  const current = day.water || 0;
  const percentage = Math.min(100, Math.round((current / goal) * 100));

  const handleAddWater = (amount: number) => {
    onUpdateDay({
      ...day,
      water: current + amount,
      waterLogs: (day.waterLogs || 0) + 1,
    });
  };

  const handleReset = () => {
    onUpdateDay({
      ...day,
      water: 0,
      waterLogs: 0,
    });
    setConfirmReset(false);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customMl, 10);
    if (!isNaN(val) && val > 0) {
      handleAddWater(val);
      setCustomMl('');
      setShowCustom(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#2D103E] border border-[#D8C4E9]/80 dark:border-[#542870]/80 rounded-3xl p-5 shadow-sm transition-colors space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#0284C7]/10 dark:bg-[#0284C7]/20 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center font-bold text-sm">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-sm">
                استهلاك الماء اليومي 💧
              </h3>
              <HelpButton featureId="waterTracker" size="sm" />
            </div>
            <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4]">
              الهدف اليومي: {goal} مل ({Math.round(goal / 250)} كوب تقريباً)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowCustom(!showCustom)}
            className="text-xs font-bold px-2 py-1 rounded-lg text-[#0284C7] dark:text-[#38BDF8] hover:bg-[#0284C7]/10 transition-colors cursor-pointer"
          >
            {showCustom ? 'إلغاء' : '+ كمية محددة'}
          </button>
          {current > 0 && !confirmReset && (
            <button
              onClick={() => setConfirmReset(true)}
              className="p-1.5 rounded-lg text-[#6F5A7D] hover:text-[#E21B6D] transition-colors cursor-pointer"
              title="إعادة تعيين العداد"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {confirmReset && (
            <div className="flex items-center gap-1 animate-in fade-in">
              <button
                onClick={handleReset}
                className="px-2 py-0.5 rounded-lg bg-[#E21B6D] text-white text-[10px] font-bold cursor-pointer"
              >
                تأكيد التصفير
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-1.5 py-0.5 rounded-lg text-[#6F5A7D] text-[10px] cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress display */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-[#3A124D] dark:text-[#EDE5F5]">
            {current} مل من {goal} مل
          </span>
          <span className="text-[#0284C7] dark:text-[#38BDF8]">
            {percentage}% {percentage >= 100 && ' (اكتمل الهدف)'}
          </span>
        </div>

        {/* Fluid bar */}
        <div className="w-full bg-[#F1E9F8] dark:bg-[#3D1B53] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#D8C4E9]/50 dark:border-[#542870]/50">
          <div
            className="h-full bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#10B981] rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleAddWater(200)}
          className="py-2.5 px-2 rounded-2xl bg-[#0284C7]/10 dark:bg-[#0284C7]/20 hover:bg-[#0284C7]/20 text-[#0284C7] dark:text-[#38BDF8] border border-[#0284C7]/30 dark:border-[#0284C7]/40 font-bold text-xs transition-colors flex flex-col items-center gap-0.5 shadow-xs cursor-pointer"
        >
          <span className="text-sm">🥛</span>
          <span>+200 مل</span>
          <span className="text-[10px] text-[#0284C7]/80 dark:text-[#38BDF8]/80 font-normal">كوب صغير</span>
        </button>

        <button
          onClick={() => handleAddWater(300)}
          className="py-2.5 px-2 rounded-2xl bg-[#0284C7]/10 dark:bg-[#0284C7]/20 hover:bg-[#0284C7]/20 text-[#0284C7] dark:text-[#38BDF8] border border-[#0284C7]/30 dark:border-[#0284C7]/40 font-bold text-xs transition-colors flex flex-col items-center gap-0.5 shadow-xs cursor-pointer"
        >
          <span className="text-sm">☕</span>
          <span>+300 مل</span>
          <span className="text-[10px] text-[#0284C7]/80 dark:text-[#38BDF8]/80 font-normal">كوب كبير</span>
        </button>

        <button
          onClick={() => handleAddWater(500)}
          className="py-2.5 px-2 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs transition-colors flex flex-col items-center gap-0.5 shadow-xs cursor-pointer"
        >
          <span className="text-sm">🍶</span>
          <span>+500 مل</span>
          <span className="text-[10px] text-blue-100 font-normal">عبوة ماء كاملة</span>
        </button>
      </div>

      {/* Custom Input */}
      {showCustom && (
        <form onSubmit={handleAddCustom} className="flex gap-2 pt-1 animate-in fade-in">
          <input
            type="number"
            value={customMl}
            onChange={(e) => setCustomMl(e.target.value)}
            placeholder="أدخل الكمية بالمل..."
            autoFocus
            className="flex-1 text-xs font-semibold p-2.5 rounded-xl border border-[#D8C4E9]/80 dark:border-[#542870]/80 bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#3A124D] dark:text-[#EDE5F5] outline-none focus:ring-2 focus:ring-[#0284C7]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs transition-colors cursor-pointer"
          >
            إضافة
          </button>
        </form>
      )}
    </div>
  );
};

