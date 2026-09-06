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
          ? 'bg-[#0D9488]/10 dark:bg-[#0D9488]/15 border-[#0D9488]/40 dark:border-[#0D9488]/40 shadow-xs'
          : isSlipped
          ? 'bg-[#E0922D]/10 dark:bg-[#E0922D]/15 border-[#E0922D]/40 dark:border-[#E0922D]/40'
          : 'bg-white dark:bg-[#2D103E] border-[#D8C4E9]/80 dark:border-[#542870]/80'
      }`}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-sm sm:text-base">
              {meal.name}
            </h3>
            {isAlternative && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5B2482]/10 dark:bg-[#5B2482]/30 text-[#5B2482] dark:text-[#D8C4E9] border border-[#5B2482]/20">
                بديل معتمد 🔄
              </span>
            )}
            {meal.calories && (
              <span className="text-[10px] font-medium text-[#6F5A7D] dark:text-[#B792D4]">
                ~{meal.calories} سعرة
              </span>
            )}
          </div>
          <p className="text-xs text-[#6F5A7D] dark:text-[#B792D4] mt-1 leading-relaxed">
            {isAlternative && currentLog.detail ? (
              <span className="text-[#5B2482] dark:text-[#D8C4E9] font-semibold">
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
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer ${
              isCommitted
                ? 'bg-[#0D9488] text-white shadow-xs'
                : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#3A124D] dark:text-[#EDE5F5] hover:bg-[#0D9488]/10 hover:text-[#0D9488]'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>تم الالتزام</span>
          </button>

          <button
            onClick={handleSetSlipped}
            className={`px-2.5 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer ${
              isSlipped
                ? 'bg-[#E0922D] text-white shadow-xs'
                : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#3A124D] dark:text-[#EDE5F5] hover:bg-[#E0922D]/10 hover:text-[#E0922D]'
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
        <div className="mt-3 p-3 rounded-2xl bg-[#F8F7F9] dark:bg-[#3D1B53]/60 border border-[#D8C4E9]/60 dark:border-[#542870]/60 text-xs text-[#3A124D] dark:text-[#EDE5F5] space-y-1.5 animate-in fade-in">
          <p className="text-[11px] leading-relaxed text-[#6F5A7D] dark:text-[#B792D4]">
            تدوين ما تم تناوله أو سبب التغيير لإطلاع د. شيماء:
          </p>
          <input
            type="text"
            placeholder="مثال: تم تناول وجبة سريعة مع الأصدقاء..."
            value={currentLog.reason || ''}
            onChange={(e) => onUpdate({ ...currentLog, reason: e.target.value })}
            className="w-full text-xs p-2 rounded-xl border border-[#D8C4E9]/70 dark:border-[#542870]/70 bg-white dark:bg-[#2D103E] text-[#3A124D] dark:text-[#EDE5F5] outline-none focus:ring-2 focus:ring-[#E21B6D]"
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
      <div className="mt-3 pt-2.5 border-t border-[#D8C4E9]/40 dark:border-[#542870]/40 flex flex-wrap items-center justify-between gap-2">
        {/* Quality Toggles (Visible when committed) */}
        {isCommitted ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleProtein}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                currentLog.protein
                  ? 'bg-[#0D9488] text-white shadow-xs'
                  : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#6F5A7D] dark:text-[#B792D4] hover:bg-[#F1E9F8]'
              }`}
            >
              <Beef className="w-3.5 h-3.5" />
              <span>بروتين كافٍ</span>
            </button>

            <button
              onClick={handleToggleVeggies}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                currentLog.veggies
                  ? 'bg-[#0D9488] text-white shadow-xs'
                  : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#6F5A7D] dark:text-[#B792D4] hover:bg-[#F1E9F8]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>خضار / سلطة</span>
            </button>
          </div>
        ) : (
          <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4]">
            اضغط على "تم الالتزام" لتسجيل جودة الوجبة
          </span>
        )}

        {/* Alternatives Toggle Button - ALWAYS VISIBLE */}
        {meal.alternatives && meal.alternatives.length > 0 && (
          <button
            onClick={() => setShowAlts(!showAlts)}
            className="px-2.5 py-1 rounded-xl text-xs font-bold text-[#5B2482] dark:text-[#D8C4E9] bg-[#5B2482]/10 dark:bg-[#5B2482]/30 hover:bg-[#5B2482]/20 border border-[#5B2482]/30 dark:border-[#542870] transition-colors flex items-center gap-1 mr-auto cursor-pointer"
          >
            <RotateCw className="w-3 h-3" />
            {showAlts ? 'إخفاء البدائل' : 'البدائل المعتمدة'}
          </button>
        )}
      </div>

      {/* Alternative items accordion - Always Accessible */}
      {showAlts && meal.alternatives && meal.alternatives.length > 0 && (
        <div className="mt-3 p-3 rounded-2xl bg-[#F8F7F9] dark:bg-[#3D1B53]/60 border border-[#D8C4E9]/70 dark:border-[#542870]/70 space-y-2 animate-in slide-in-from-top duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3A124D] dark:text-[#EDE5F5]">
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
                className="text-[11px] font-bold text-[#E21B6D] dark:text-[#FF4099] hover:underline cursor-pointer"
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
                className={`w-full text-right p-2.5 rounded-xl text-xs font-medium border transition-colors flex items-center justify-between cursor-pointer ${
                  currentLog.detail === alt && isAlternative
                    ? 'bg-[#0D9488]/15 dark:bg-[#0D9488]/25 text-[#0D9488] dark:text-[#2DD4BF] border-[#0D9488]/40'
                    : 'bg-white dark:bg-[#2D103E] hover:bg-[#F8F7F9] dark:hover:bg-[#3D1B53] text-[#3A124D] dark:text-[#EDE5F5] border-[#D8C4E9]/60 dark:border-[#542870]/60'
                }`}
              >
                <span>{alt}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-[#5B2482]/10 dark:bg-[#5B2482]/30 text-[#5B2482] dark:text-[#D8C4E9]">
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

