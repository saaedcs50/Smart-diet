import React, { useState } from 'react';
import { 
  Check, 
  X, 
  RotateCw, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Leaf, 
  Beef,
  Sparkles,
  Info,
  Scale
} from 'lucide-react';
import { MealItem, MealLogState } from '../types';
import { HungerFullnessPicker } from './HungerFullnessPicker';

interface MealCardProps {
  meal: MealItem;
  state?: MealLogState;
  onUpdate: (state: MealLogState) => void;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, state, onUpdate }) => {
  const currentLog: MealLogState = state || {};
  const [showAlts, setShowAlts] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const isCommitted = currentLog.eval === 'yes';
  const isSlipped = currentLog.eval === 'no';
  const isAlternative = currentLog.type === 'alt';

  const handleSetCommitted = () => {
    onUpdate({
      ...currentLog,
      eval: 'yes',
      type: currentLog.type || 'default',
      protein: currentLog.protein ?? true,
      veggies: currentLog.veggies ?? true,
    });
  };

  const handleSetSlipped = () => {
    onUpdate({
      ...currentLog,
      eval: 'no',
      type: 'none',
    });
  };

  const handleSelectAlternative = (altText: string) => {
    onUpdate({
      ...currentLog,
      type: 'alt',
      detail: altText,
      eval: 'yes',
    });
    setShowAlts(false);
  };

  const handleToggleProtein = () => {
    onUpdate({ ...currentLog, protein: !currentLog.protein });
  };

  const handleToggleVeggies = () => {
    onUpdate({ ...currentLog, veggies: !currentLog.veggies });
  };

  return (
    <div
      className={`rounded-3xl p-4 sm:p-5 border transition-all duration-200 ${
        isCommitted
          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300/80 dark:border-emerald-800/60 shadow-xs'
          : isSlipped
          ? 'bg-amber-50/30 dark:bg-amber-950/20 border-amber-300/70 dark:border-amber-800/60'
          : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
      }`}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
              {meal.name}
            </h3>
            {isAlternative && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-300/60">
                بديل معتمد 🔄
              </span>
            )}
            {meal.calories && (
              <span className="text-[10px] font-bold text-slate-400">
                ~{meal.calories} سعرة
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isAlternative && currentLog.detail ? (
              <span className="text-blue-700 dark:text-blue-300 font-semibold">
                ⭐ البديل المختار: {currentLog.detail}
              </span>
            ) : (
              meal.items
            )}
          </p>
        </div>

        {/* Commitment Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleSetCommitted}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1 ${
              isCommitted
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>تم الالتزام</span>
          </button>

          <button
            onClick={handleSetSlipped}
            className={`px-2.5 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1 ${
              isSlipped
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-700'
            }`}
            title="تغيير بالوجبة"
          >
            <X className="w-3.5 h-3.5" />
            <span>تغيير</span>
          </button>
        </div>
      </div>

      {/* Note input if not fully committed */}
      {isSlipped && (
        <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 animate-in fade-in">
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            تدوين ما تم تناوله أو سبب التغيير لإطلاع د. شيماء:
          </p>
          <input
            type="text"
            placeholder="مثال: تم تناول وجبة سريعة مع الأصدقاء..."
            value={currentLog.reason || ''}
            onChange={(e) => onUpdate({ ...currentLog, reason: e.target.value })}
            className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      )}

      {/* Mindful Eating: Hunger & Fullness Scale 1-10 (Before & After Meal) */}
      <HungerFullnessPicker
        hungerBefore={currentLog.hungerBefore}
        fullnessAfter={currentLog.fullnessAfter}
        onChange={(updates) => onUpdate({ ...currentLog, ...updates })}
      />

      {/* Action Footer: Quality Pills + Always Visible Alternatives Button */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        {/* Quality Toggles (Visible when committed) */}
        {isCommitted ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleProtein}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                currentLog.protein
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <Beef className="w-3.5 h-3.5" />
              <span>بروتين كافٍ</span>
            </button>

            <button
              onClick={handleToggleVeggies}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                currentLog.veggies
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>خضار / سلطة</span>
            </button>
          </div>
        ) : (
          <span className="text-[11px] text-slate-400">
            اضغط على "تم الالتزام" لتسجيل جودة الوجبة
          </span>
        )}

        {/* Alternatives Toggle Button - ALWAYS VISIBLE */}
        {meal.alternatives && meal.alternatives.length > 0 && (
          <button
            onClick={() => setShowAlts(!showAlts)}
            className="px-2.5 py-1 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800/60 transition-colors flex items-center gap-1 mr-auto"
          >
            <RotateCw className="w-3 h-3" />
            {showAlts ? 'إخفاء البدائل' : 'البدائل المعتمدة'}
          </button>
        )}
      </div>

      {/* Alternative items accordion - Always Accessible */}
      {showAlts && meal.alternatives && meal.alternatives.length > 0 && (
        <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 animate-in slide-in-from-top duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              اختر البديل المعتمد من د. شيماء:
            </span>
            {isAlternative && (
              <button
                onClick={() => {
                  onUpdate({
                    ...currentLog,
                    type: 'default',
                    detail: undefined,
                  });
                }}
                className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline"
              >
                الرجوع للوجبة الأساسية
              </button>
            )}
          </div>
          <div className="space-y-1.5">
            {meal.alternatives.map((alt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAlternative(alt)}
                className={`w-full text-right p-2.5 rounded-xl text-xs font-semibold border transition-colors flex items-center justify-between ${
                  currentLog.detail === alt && isAlternative
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
                    : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{alt}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  {currentLog.detail === alt && isAlternative ? 'محدد حالياً ✓' : 'اختيار البديل'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
