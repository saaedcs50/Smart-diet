import React, { useState } from 'react';
import { Calculator, X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { calculateBMR, calculateTDEE } from '../utils/calculations';

interface BMRCalculatorModalProps {
  initialWeight?: number | null;
  initialHeight?: number | null;
  onApplyCalories: (calories: number, protein: number, carbs: number, fats: number) => void;
  onClose: () => void;
}

export const BMRCalculatorModal: React.FC<BMRCalculatorModalProps> = ({
  initialWeight,
  initialHeight,
  onApplyCalories,
  onClose,
}) => {
  const [weight, setWeight] = useState(initialWeight || 80);
  const [height, setHeight] = useState(initialHeight || 175);
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'very_active'>('light');
  const [goal, setGoal] = useState<'cut_aggressive' | 'cut_moderate' | 'maintain' | 'bulk'>('cut_moderate');

  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activity);

  // Calorie adjustments based on goal
  let targetCalories = tdee;
  if (goal === 'cut_moderate') targetCalories = Math.round(tdee - 450);
  else if (goal === 'cut_aggressive') targetCalories = Math.round(tdee - 700);
  else if (goal === 'bulk') targetCalories = Math.round(tdee + 300);

  // Recommended Macros distribution (High Protein for retention)
  const targetProtein = Math.round(weight * 2.0); // 2g per kg
  const targetFats = Math.round(weight * 0.8); // 0.8g per kg
  const caloriesFromProtAndFat = targetProtein * 4 + targetFats * 9;
  const remainingCalsForCarbs = Math.max(200, targetCalories - caloriesFromProtAndFat);
  const targetCarbs = Math.round(remainingCalsForCarbs / 4);

  const handleApply = () => {
    onApplyCalories(targetCalories, targetProtein, targetCarbs, targetFats);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                حاسبة معدل الحرق والسعرات (BMR / TDEE) ⚡
              </h3>
              <p className="text-[11px] text-slate-400">حساب الاحتياج اليومي وعجز الدهون بدقة علمية</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {/* Gender */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setGender('male')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                gender === 'male'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              👨 ذكر
            </button>
            <button
              onClick={() => setGender('female')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                gender === 'female'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              👩 أنثى
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">الوزن (كجم)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full text-xs font-bold p-2 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">الطول (سم)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                className="w-full text-xs font-bold p-2 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-0.5">العمر (سنة)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10) || 0)}
                className="w-full text-xs font-bold p-2 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              مستوى النشاط اليومي والتمرين:
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as any)}
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              <option value="sedentary">قليل الحركة (شغل مكتبي وبدون تمرين)</option>
              <option value="light">نشاط خفيف (تمرين 1 - 3 أيام بالأسبوع)</option>
              <option value="moderate">نشاط متوسط (تمرين 3 - 5 أيام بالأسبوع)</option>
              <option value="very_active">نشاط عالي (تمرين شاق 6 - 7 أيام)</option>
            </select>
          </div>

          {/* Goal selection */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              الهدف الحالي:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'cut_moderate', label: 'تنشيف معتدل (-450)' },
                { id: 'cut_aggressive', label: 'تنشيف سريع (-700)' },
                { id: 'maintain', label: 'تثبيت وزن (ثبات)' },
                { id: 'bulk', label: 'بناء عضل وزيادة (+300)' },
              ].map((g) => {
                const isSelected = goal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id as any)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800 dark:to-indigo-950/40 border border-blue-200/80 dark:border-indigo-900/60 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 dark:text-slate-400">معدل الحرق الأساسي (BMR):</span>
              <strong className="text-slate-800 dark:text-slate-100">{bmr} سعرة</strong>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 dark:text-slate-400">إجمالي الحرق اليومي بالنشاط (TDEE):</span>
              <strong className="text-slate-800 dark:text-slate-100">{tdee} سعرة</strong>
            </div>

            <div className="pt-2 border-t border-blue-200 dark:border-indigo-900 flex justify-between items-center">
              <span className="font-extrabold text-sm text-blue-950 dark:text-blue-200">
                السعرات اليومية المقترحة للهدف:
              </span>
              <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                {targetCalories} ك.كالوري
              </span>
            </div>

            {/* Macros recommendation */}
            <div className="grid grid-cols-3 gap-1.5 pt-2 text-center text-[11px]">
              <div className="bg-white/80 dark:bg-slate-900/80 p-1.5 rounded-xl border">
                <span className="text-emerald-600 font-bold block">بروتين</span>
                <strong className="text-slate-800 dark:text-slate-100">{targetProtein} جم</strong>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/80 p-1.5 rounded-xl border">
                <span className="text-blue-600 font-bold block">نشويات</span>
                <strong className="text-slate-800 dark:text-slate-100">{targetCarbs} جم</strong>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/80 p-1.5 rounded-xl border">
                <span className="text-amber-600 font-bold block">دهون</span>
                <strong className="text-slate-800 dark:text-slate-100">{targetFats} جم</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300"
          >
            إلغاء
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Check className="w-4 h-4" />
            تطبيق هذه الأرقام في خطة العميل
          </button>
        </div>
      </div>
    </div>
  );
};
