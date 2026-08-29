import React, { useState } from 'react';
import { Droplets, Plus, RotateCcw, Sparkles } from 'lucide-react';
import { DayLog, PlanConfig } from '../types';
import { calculateEffectiveWaterGoal } from '../utils/calculations';

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
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center font-bold text-sm">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
              استهلاك الماء اليومي 💧
            </h3>
            <span className="text-[11px] text-slate-400">
              الهدف اليومي: {goal} مل ({Math.round(goal / 250)} كوب تقريباً)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowCustom(!showCustom)}
            className="text-xs font-bold px-2 py-1 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
          >
            {showCustom ? 'إلغاء' : '+ كمية محددة'}
          </button>
          {current > 0 && !confirmReset && (
            <button
              onClick={() => setConfirmReset(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
              title="إعادة تعيين العداد"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {confirmReset && (
            <div className="flex items-center gap-1 animate-in fade-in">
              <button
                onClick={handleReset}
                className="px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[10px] font-bold"
              >
                تأكيد التصفير
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-1.5 py-0.5 rounded-lg text-slate-400 text-[10px]"
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
          <span className="text-slate-700 dark:text-slate-200">
            {current} مل من {goal} مل
          </span>
          <span className="text-blue-600 dark:text-blue-400">
            {percentage}% {percentage >= 100 && ' (اكتمل الهدف)'}
          </span>
        </div>

        {/* Fluid bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleAddWater(200)}
          className="py-2.5 px-2 rounded-2xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-800 dark:text-blue-200 border border-blue-200/80 dark:border-blue-900/50 font-bold text-xs transition-colors flex flex-col items-center gap-0.5 shadow-xs"
        >
          <span className="text-sm">🥛</span>
          <span>+200 مل</span>
          <span className="text-[10px] text-blue-500 font-normal">كوب صغير</span>
        </button>

        <button
          onClick={() => handleAddWater(300)}
          className="py-2.5 px-2 rounded-2xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-800 dark:text-blue-200 border border-blue-200/80 dark:border-blue-900/50 font-bold text-xs transition-colors flex flex-col items-center gap-0.5 shadow-xs"
        >
          <span className="text-sm">☕</span>
          <span>+300 مل</span>
          <span className="text-[10px] text-blue-500 font-normal">كوب كبير</span>
        </button>

        <button
          onClick={() => handleAddWater(500)}
          className="py-2.5 px-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex flex-col items-center gap-0.5 shadow-xs"
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
            className="flex-1 text-xs font-semibold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
          >
            إضافة
          </button>
        </form>
      )}
    </div>
  );
};
