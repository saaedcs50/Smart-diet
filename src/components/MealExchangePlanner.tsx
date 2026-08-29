import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Sparkles, 
  Plus, 
  Minus, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Flame,
  PieChart,
  RefreshCw,
  Layers,
  Wand2,
  X,
  Check,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { MealItem, PlanConfig } from '../types';
import { 
  FOOD_EXCHANGE_GROUPS, 
  calculateMealExchangeMacros, 
  calculatePlanTotalExchanges, 
  generateMealContentFromExchanges,
  ExchangeGroup 
} from '../utils/foodExchanges';
import { 
  requestImproveMeal, 
  requestAllocateDay, 
  checkGeminiStatus 
} from '../utils/geminiCoach';

interface MealExchangePlannerProps {
  draft: PlanConfig;
  coachSessionUnlocked?: boolean;
  coachToken?: string | null;
  onUpdateDraft: (updated: PlanConfig) => void;
  onNotify: (msg: string) => void;
}

export const MealExchangePlanner: React.FC<MealExchangePlannerProps> = ({
  draft,
  coachSessionUnlocked,
  coachToken,
  onUpdateDraft,
  onNotify,
}) => {
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(draft.meals[0]?.id || null);
  const [isGeminiReady, setIsGeminiReady] = useState<boolean | null>(null);

  // Gemini loading states
  const [improvingMealIdx, setImprovingMealIdx] = useState<number | null>(null);
  const [isAllocatingDay, setIsAllocatingDay] = useState(false);

  // Review Modals
  const [improveReview, setImproveReview] = useState<{
    mealIdx: number;
    mealName: string;
    items: string;
    alternatives: string[];
    warnings?: string[];
  } | null>(null);

  const [allocateReview, setAllocateReview] = useState<{
    meals: Array<{ name: string; exchanges: Record<string, number> }>;
    warnings?: string[];
  } | null>(null);

  useEffect(() => {
    checkGeminiStatus().then((res) => setIsGeminiReady(res.configured));
  }, []);

  // Calculate cumulative totals across all meals
  const { totalExchanges, totals } = calculatePlanTotalExchanges(draft.meals);

  const targetCal = draft.targetCalories || 2000;
  const targetProt = draft.targetProtein || 150;
  const targetCarbs = draft.targetCarbs || 180;
  const targetFats = draft.targetFats || 60;

  const calPct = Math.round((totals.calories / (targetCal || 1)) * 100);
  const protPct = Math.round((totals.proteinGrams / (targetProt || 1)) * 100);
  const carbsPct = Math.round((totals.carbsGrams / (targetCarbs || 1)) * 100);
  const fatsPct = Math.round((totals.fatsGrams / (targetFats || 1)) * 100);

  const handleUpdateExchange = (mealIdx: number, groupId: string, delta: number) => {
    const updatedMeals = [...draft.meals];
    const meal = { ...updatedMeals[mealIdx] };
    const currentExchanges = { ...(meal.exchanges || {}) };
    
    const currentQty = currentExchanges[groupId] || 0;
    const newQty = Math.max(0, currentQty + delta);
    
    currentExchanges[groupId] = newQty;
    meal.exchanges = currentExchanges;

    // Recalculate calories and protein on meal if needed
    const mealMacros = calculateMealExchangeMacros(currentExchanges);
    meal.calories = mealMacros.calories;
    meal.proteinGrams = mealMacros.proteinGrams;

    updatedMeals[mealIdx] = meal;
    onUpdateDraft({ ...draft, meals: updatedMeals });
  };

  // Local Default Generator (Always works 100% offline without AI)
  const handleAutoGenerateMeal = (mealIdx: number) => {
    const meal = draft.meals[mealIdx];
    if (!meal.exchanges || Object.values(meal.exchanges).every((v) => !v || Number(v) <= 0)) {
      alert('الرجاء زيادة حصة واحدة على الأقل من المجموعات الغذائية قبل التوليد.');
      return;
    }

    const { primaryItems, alternatives } = generateMealContentFromExchanges(meal.exchanges);
    const updatedMeals = [...draft.meals];
    updatedMeals[mealIdx] = {
      ...meal,
      items: primaryItems,
      alternatives: alternatives,
    };

    onUpdateDraft({ ...draft, meals: updatedMeals });
    onNotify(`تم تركيب مكونات الوجبة وتوليد ${alternatives.length} بدائل مطابقة للحصص بنجاح ✨`);
  };

  // Gemini Feature 1: Improve Meal & Alternatives
  const handleGeminiImproveMeal = async (mealIdx: number) => {
    const meal = draft.meals[mealIdx];
    if (!meal.exchanges || Object.values(meal.exchanges).every((v) => !v || Number(v) <= 0)) {
      alert('الرجاء تحديد حصص الوجبة أولاً للاستفادة من تحسين Gemini.');
      return;
    }

    setImprovingMealIdx(mealIdx);

    const groupExamples: Record<string, string[]> = {};
    FOOD_EXCHANGE_GROUPS.forEach((g) => {
      groupExamples[g.id] = g.examples;
    });

    const allergies = draft.medicalConditions?.allergies || [];
    const conditionIds = (draft.medicalConditions?.conditions || []).map((c) => c.label || c.id);

    const res = await requestImproveMeal({
      mealName: meal.name,
      exchanges: meal.exchanges,
      currentItems: meal.items,
      allergies,
      conditionIds,
      groupExamples,
    }, coachToken);

    setImprovingMealIdx(null);

    if (!res.ok || !res.items) {
      onNotify(res.error || 'تعذر الاتصال بـ Gemini، يمكنك استخدام التوليد المحلي الافتراضي.');
      return;
    }

    // Open review modal for coach confirmation
    setImproveReview({
      mealIdx,
      mealName: meal.name,
      items: res.items,
      alternatives: res.alternatives || [],
      warnings: res.warnings,
    });
  };

  const handleConfirmImproveMeal = () => {
    if (!improveReview) return;
    const { mealIdx, items, alternatives } = improveReview;
    const updatedMeals = [...draft.meals];
    const meal = { ...updatedMeals[mealIdx] };

    meal.items = items;
    meal.alternatives = alternatives;
    updatedMeals[mealIdx] = meal;

    onUpdateDraft({ ...draft, meals: updatedMeals });
    setImproveReview(null);
    onNotify(`تم اعتماد نصوص وبدائل «${meal.name}» المحسنة بـ Gemini بنجاح ✨`);
  };

  // Gemini Feature 2: Smart Day Allocation across meals
  const handleGeminiAllocateDay = async () => {
    if (draft.meals.length === 0) {
      alert('الرجاء إضافة وجبات أولاً قبل التوزيع.');
      return;
    }

    setIsAllocatingDay(true);

    const groupMacros = FOOD_EXCHANGE_GROUPS.map((g) => ({
      id: g.id,
      calories: g.calories,
      proteinGrams: g.proteinGrams,
      carbsGrams: g.carbsGrams,
      fatsGrams: g.fatsGrams,
    }));

    const allergies = draft.medicalConditions?.allergies || [];
    const conditionIds = (draft.medicalConditions?.conditions || []).map((c) => c.label || c.id);

    const res = await requestAllocateDay({
      mealCount: draft.meals.length,
      mealNames: draft.meals.map((m) => m.name),
      targetCalories: targetCal,
      targetProtein: targetProt,
      targetCarbs: targetCarbs,
      targetFats: targetFats,
      conditionIds,
      allergies,
      groupIds: FOOD_EXCHANGE_GROUPS.map((g) => g.id),
      groupMacros,
    }, coachToken);

    setIsAllocatingDay(false);

    if (!res.ok || !res.meals || res.meals.length === 0) {
      onNotify(res.error || 'تعذر توزيع الحصص بالذكاء الاصطناعي.');
      return;
    }

    // Open review modal for Day Allocation
    setAllocateReview({
      meals: res.meals,
      warnings: res.warnings,
    });
  };

  const handleConfirmAllocateDay = () => {
    if (!allocateReview) return;

    // Apply allocated exchanges to draft meals matching by index, keeping meal id and name
    const updatedMeals = draft.meals.map((meal, idx) => {
      const allocatedMeal = allocateReview.meals[idx] || allocateReview.meals.find((m) => m.name === meal.name);
      if (allocatedMeal && allocatedMeal.exchanges) {
        const mealMacros = calculateMealExchangeMacros(allocatedMeal.exchanges);
        return {
          ...meal,
          exchanges: allocatedMeal.exchanges,
          calories: mealMacros.calories,
          proteinGrams: mealMacros.proteinGrams,
        };
      }
      return meal;
    });

    onUpdateDraft({ ...draft, meals: updatedMeals });
    setAllocateReview(null);
    onNotify('تم اعتماد وتطبيق توزيع الحصص على وجبات اليوم بنجاح 🎯');
  };

  const handleGenerateAllMeals = () => {
    let generatedCount = 0;
    const updatedMeals = draft.meals.map((meal) => {
      if (meal.exchanges && Object.values(meal.exchanges).some((v) => Number(v) > 0)) {
        const { primaryItems, alternatives } = generateMealContentFromExchanges(meal.exchanges);
        generatedCount++;
        return {
          ...meal,
          items: primaryItems,
          alternatives: alternatives,
        };
      }
      return meal;
    });

    if (generatedCount === 0) {
      alert('لم يتم تحديد أي حصص في الوجبات بعد. يرجى إضافة حصص أولاً.');
      return;
    }

    onUpdateDraft({ ...draft, meals: updatedMeals });
    onNotify(`تم توليد نصوص والبدائل تلقائياً لعدد ${generatedCount} وجبة بناءً على نظام البدائل 🚀`);
  };

  return (
    <div className="space-y-4 text-right dir-rtl">
      {/* Header Info & Actions Bar */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              نظام بدائل الأغذية الإكلينيكي (Clinical Exchange List) 📊
            </h4>
            {isGeminiReady !== null && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isGeminiReady 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}>
                {isGeminiReady ? '✨ الاقتراحات الذكية جاهزة' : '⚠️ أضيفي GEMINI_API_KEY في Secrets'}
              </span>
            )}
          </div>
          <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300 mt-0.5">
            وزّعي الحصص الغذائية على الوجبات وسيقوم النظام بحساب السعرات وتوليد الوجبات والبدائل تلقائياً
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Smart Allocation with Gemini */}
          <button
            type="button"
            disabled={isAllocatingDay}
            onClick={handleGeminiAllocateDay}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50"
            title="توزيع الحصص تلقائياً بالذكاء الاصطناعي لتطابق أهداف السعرات والماكروز"
          >
            {isAllocatingDay ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>جاري التوزيع الذكي...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5 text-amber-200" />
                <span>وزّع الحصص حسب الأهداف ✨</span>
              </>
            )}
          </button>

          {/* Local Default Batch Generator */}
          <button
            type="button"
            onClick={handleGenerateAllMeals}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-2xs cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>توليد الكل تلقائياً 🪄</span>
          </button>

          {/* Catalog Guide */}
          <button
            type="button"
            onClick={() => setShowCatalogModal(!showCatalogModal)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center justify-center gap-1 shadow-2xs"
          >
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            <span>دليل الحصص</span>
          </button>
        </div>
      </div>

      {/* Catalog Quick View Drawer/Accordion */}
      {showCatalogModal && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 shadow-md animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2">
            <h5 className="text-xs font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-emerald-500" />
              جدول القيمة الغذائية لكل حصة (1 Exchange Standard)
            </h5>
            <button
              onClick={() => setShowCatalogModal(false)}
              className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              إغلاق الدليل ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {FOOD_EXCHANGE_GROUPS.map((g) => (
              <div
                key={g.id}
                className={`p-2.5 rounded-xl border ${g.colorClass.bg} ${g.colorClass.border} space-y-1.5 text-xs`}
              >
                <div className="flex items-center justify-between font-black">
                  <span className="flex items-center gap-1 text-slate-800 dark:text-slate-100">
                    <span>{g.icon}</span>
                    <span>{g.nameAr}</span>
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${g.colorClass.badge}`}>
                    {g.calories} سعرة
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1 text-[10px] font-bold text-center bg-white/70 dark:bg-slate-900/60 p-1.5 rounded-lg">
                  <div>
                    <span className="text-amber-600 block">كارب</span>
                    <span>{g.carbsGrams}g</span>
                  </div>
                  <div>
                    <span className="text-emerald-600 block">بروتين</span>
                    <span>{g.proteinGrams}g</span>
                  </div>
                  <div>
                    <span className="text-purple-600 block">دهون</span>
                    <span>{g.fatsGrams}g</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight">
                  <span className="font-bold text-slate-700 dark:text-slate-200">أمثلة الحصة ({g.portionUnit}): </span>
                  {g.examples.slice(0, 3).join(' ، ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Exchange Target vs Actual Smart Comparison Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-3 shadow-sm border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-black">
              تغطية السعرات والماكروز اليومية بحصص البدائل
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold">
            <span className={`px-2 py-0.5 rounded-full ${calPct >= 90 && calPct <= 110 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
              المجموع: {totals.calories} / {targetCal} سعرة ({calPct}%)
            </span>
          </div>
        </div>

        {/* Macros Progress Grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {/* Protein */}
          <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>🥩 بروتين</span>
              <span className={protPct >= 90 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>{protPct}%</span>
            </div>
            <div className="text-xs font-black text-emerald-300">
              {totals.proteinGrams}g / <span className="text-slate-400 font-normal">{targetProt}g</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all" 
                style={{ width: `${Math.min(100, protPct)}%` }} 
              />
            </div>
          </div>

          {/* Carbs */}
          <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>🌾 نشويات</span>
              <span className={carbsPct >= 90 ? 'text-amber-400 font-bold' : 'text-slate-400'}>{carbsPct}%</span>
            </div>
            <div className="text-xs font-black text-amber-300">
              {totals.carbsGrams}g / <span className="text-slate-400 font-normal">{targetCarbs}g</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all" 
                style={{ width: `${Math.min(100, carbsPct)}%` }} 
              />
            </div>
          </div>

          {/* Fats */}
          <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>🥑 دهون</span>
              <span className={fatsPct >= 90 ? 'text-purple-400 font-bold' : 'text-slate-400'}>{fatsPct}%</span>
            </div>
            <div className="text-xs font-black text-purple-300">
              {totals.fatsGrams}g / <span className="text-slate-400 font-normal">{targetFats}g</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-purple-500 h-full rounded-full transition-all" 
                style={{ width: `${Math.min(100, fatsPct)}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Summary Exchanged Quantities Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-bold text-slate-300 border-t border-slate-800">
          <span className="text-slate-400">إجمالي الحصص الموزعة:</span>
          {FOOD_EXCHANGE_GROUPS.map((g) => {
            const count = totalExchanges[g.id] || 0;
            if (count <= 0) return null;
            return (
              <span
                key={g.id}
                className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1"
              >
                <span>{g.icon}</span>
                <span>{g.shortName}: {count}</span>
              </span>
            );
          })}
          {Object.values(totalExchanges).every((v) => !v) && (
            <span className="text-slate-500 italic">لم يتم توزيع أي حصص بعد...</span>
          )}
        </div>
      </div>

      {/* Meals Allocators Accordion List */}
      <div className="space-y-3">
        {draft.meals.map((meal, mealIdx) => {
          const isExpanded = expandedMealId === meal.id;
          const mealMacros = calculateMealExchangeMacros(meal.exchanges);
          const hasExchanges = meal.exchanges && Object.values(meal.exchanges).some((v) => Number(v) > 0);
          const isThisMealImproving = improvingMealIdx === mealIdx;

          return (
            <div
              key={meal.id || mealIdx}
              className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-all shadow-2xs"
            >
              {/* Meal Card Header */}
              <div
                onClick={() => setExpandedMealId(isExpanded ? null : meal.id)}
                className="p-3.5 bg-slate-50/80 dark:bg-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-750 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-black">
                    #{mealIdx + 1}
                  </span>
                  <div>
                    <h5 className="font-black text-xs sm:text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <span>{meal.name}</span>
                      {hasExchanges && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
                          {mealMacros.calories} سعرة
                        </span>
                      )}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs sm:max-w-md mt-0.5">
                      {meal.items || 'اضغط هنا لتصميم الوجبة بالحصص وتوليد المكونات...'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    <span className="text-amber-600">كارب: {mealMacros.carbsGrams}g</span> | 
                    <span className="text-emerald-600">بروتين: {mealMacros.proteinGrams}g</span> | 
                    <span className="text-purple-600">دهون: {mealMacros.fatsGrams}g</span>
                  </div>

                  <button type="button" className="p-1 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Meal Exchange Controls (Body) */}
              {isExpanded && (
                <div className="p-4 space-y-4 border-t border-slate-200 dark:border-slate-700/80">
                  {/* Exchange Steppers Grid */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                      <span>تحديد عدد الحصص لهذه الوجبة:</span>
                      <span className="text-[10px] text-emerald-600 font-bold">
                        إجمالي سعرات الوجبة: {mealMacros.calories} ك.س ({mealMacros.proteinGrams}g بروتين)
                      </span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {FOOD_EXCHANGE_GROUPS.map((group) => {
                        const qty = meal.exchanges?.[group.id] || 0;

                        return (
                          <div
                            key={group.id}
                            className={`p-2.5 rounded-xl border ${group.colorClass.bg} ${group.colorClass.border} flex items-center justify-between gap-2`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{group.icon}</span>
                              <div>
                                <span className="text-xs font-black block text-slate-800 dark:text-slate-100">
                                  {group.shortName}
                                </span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                                  {group.calories} ك.س | {group.carbsGrams > 0 ? `${group.carbsGrams}ك` : ''} {group.proteinGrams > 0 ? `${group.proteinGrams}ب` : ''} {group.fatsGrams > 0 ? `${group.fatsGrams}د` : ''}
                                </span>
                              </div>
                            </div>

                            {/* Stepper Controls */}
                            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                              <button
                                type="button"
                                onClick={() => handleUpdateExchange(mealIdx, group.id, -0.5)}
                                className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 font-black text-xs cursor-pointer active:scale-90"
                                title="-0.5 حصة"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-xs font-black text-slate-800 dark:text-slate-100">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleUpdateExchange(mealIdx, group.id, 0.5)}
                                className="w-6 h-6 rounded-md bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white font-black text-xs cursor-pointer active:scale-90"
                                title="+0.5 حصة"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dual Generator Buttons Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-center gap-2">
                      {/* 1. Local Default Generator */}
                      <button
                        type="button"
                        onClick={() => handleAutoGenerateMeal(mealIdx)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                        title="توليد فوري للمكونات والبدائل بناءً على الكتالوج المحلي"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                        <span>توليد محلي 🪄</span>
                      </button>

                      {/* 2. Gemini Clinical Improver */}
                      <button
                        type="button"
                        disabled={isThisMealImproving || !hasExchanges}
                        onClick={() => handleGeminiImproveMeal(mealIdx)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
                        title="تحسين صياغة الوجبة وتوليد 4 بدائل عربية متنوعة بذكاء Gemini مع المراجعة"
                      >
                        {isThisMealImproving ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>جاري التحسين بـ Gemini...</span>
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-3.5 h-3.5 text-amber-200" />
                            <span>تحسين البدائل بـ Gemini ✨</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      التوليد المحلي فوري بدون إنترنت، وGemini يبتكر 4 بدائل إكلينيكية بعد مراجعتك.
                    </div>
                  </div>

                  {/* Generated Meal Items & Alternatives View / Manual Edit */}
                  <div className="space-y-2.5 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">
                        المكونات الأساسية المقررة:
                      </label>
                      <textarea
                        rows={2}
                        value={meal.items}
                        onChange={(e) => {
                          const updated = [...draft.meals];
                          updated[mealIdx].items = e.target.value;
                          onUpdateDraft({ ...draft, meals: updated });
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 resize-none font-medium"
                        placeholder="اختر الحصص واضغط توليد الوجبة تلقائياً..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-amber-600 dark:text-amber-400 mb-1">
                        البدائل المتاحة (افصل بينها بـ |):
                      </label>
                      <input
                        type="text"
                        value={(meal.alternatives || []).join(' | ')}
                        onChange={(e) => {
                          const updated = [...draft.meals];
                          updated[mealIdx].alternatives = e.target.value
                            .split('|')
                            .map((s) => s.trim())
                            .filter(Boolean);
                          onUpdateDraft({ ...draft, meals: updated });
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium"
                        placeholder="بديل 1 | بديل 2 | بديل 3"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Review Modal 1: Improve Meal Proposal with Gemini */}
      {improveReview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-5 border border-emerald-200 dark:border-emerald-800 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                    مراجعة اقتراح Gemini لوجبة: {improveReview.mealName}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    طابق المكونات والبدائل المقترحة قبل الاعتماد النهائي
                  </p>
                </div>
              </div>

              <button
                onClick={() => setImproveReview(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Warnings if any */}
            {improveReview.warnings && improveReview.warnings.length > 0 && (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>تنبيهات إكلينيكية للوجبة:</span>
                </div>
                <ul className="list-disc list-inside text-[11px] text-amber-800 dark:text-amber-300">
                  {improveReview.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Primary Suggested Items */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                🥗 نص الوجبة الأساسي المقترح:
              </span>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                {improveReview.items}
              </div>
            </div>

            {/* Alternatives List */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block">
                🔄 البدائل المقترحة المطابقة للحصص ({improveReview.alternatives.length}):
              </span>
              <div className="space-y-1.5">
                {improveReview.alternatives.map((alt, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2"
                  >
                    <span className="font-bold text-amber-700 dark:text-amber-400 shrink-0">#{i + 1}</span>
                    <span>{alt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleConfirmImproveMeal}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>اعتماد وتطبيق على الوجبة</span>
              </button>

              <button
                type="button"
                onClick={() => setImproveReview(null)}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal 2: Day Allocation Proposal with Gemini */}
      {allocateReview && (() => {
        const proposedTotal = calculatePlanTotalExchanges(allocateReview.meals);
        const proposedCal = proposedTotal.totals.calories;
        const proposedProt = proposedTotal.totals.proteinGrams;
        const proposedCarbs = proposedTotal.totals.carbsGrams;
        const proposedFats = proposedTotal.totals.fatsGrams;

        return (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl p-5 border border-emerald-200 dark:border-emerald-800 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center font-bold">
                    <Wand2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                      مراجعة توزيع حصص اليوم المقترح ✨
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      قارن إجمالي الحصص الموزعة مقابل أهداف الخطة قبل الاعتماد
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAllocateReview(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Target vs Proposed Summary Card */}
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>مقارنة الأهداف بالحصص المقترحة:</span>
                  <span className="text-emerald-400">
                    {proposedCal} ك.س (الهدف: {targetCal})
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">🥩 بروتين</span>
                    <span className="font-black text-emerald-400">{proposedProt}g / {targetProt}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">🌾 نشويات</span>
                    <span className="font-black text-amber-400">{proposedCarbs}g / {targetCarbs}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">🥑 دهون</span>
                    <span className="font-black text-purple-400">{proposedFats}g / {targetFats}g</span>
                  </div>
                </div>
              </div>

              {/* Meals Allocation Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  تفصيل الحصص الموزعة لكل وجبة ({allocateReview.meals.length} وجبة):
                </span>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {allocateReview.meals.map((m, idx) => {
                    const mMacros = calculateMealExchangeMacros(m.exchanges);
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-black">
                          <span>{m.name || `وجبة ${idx + 1}`}</span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                            {mMacros.calories} ك.س ({mMacros.proteinGrams}g بروتين)
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 text-[10px]">
                          {Object.entries(m.exchanges || {}).map(([gid, qty]) => {
                            const numQty = Number(qty);
                            if (!numQty || numQty <= 0) return null;
                            const grp = FOOD_EXCHANGE_GROUPS.find((g) => g.id === gid);
                            return (
                              <span
                                key={gid}
                                className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                              >
                                {grp?.icon} {grp?.shortName || gid}: {numQty}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleConfirmAllocateDay}
                  className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>اعتماد وتطبيق التوزيع</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAllocateReview(null)}
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
