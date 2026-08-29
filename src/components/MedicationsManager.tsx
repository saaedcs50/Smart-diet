import React, { useState } from 'react';
import {
  Pill,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertCircle,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
  Info,
  TrendingDown,
  TrendingUp,
  Scale,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  PlanConfig,
  MedicationItem,
  MedicationPlanConfig,
  MedicationSlot,
  WithFoodOption,
  AppetiteEffect,
  WeightEffect,
} from '../types';
import {
  MEDICATION_SLOT_OPTIONS,
  WITH_FOOD_LABELS,
  APPETITE_EFFECT_LABELS,
  WEIGHT_EFFECT_LABELS,
} from '../utils/medications';

interface MedicationsManagerProps {
  draft: PlanConfig;
  onUpdateDraft: (updated: PlanConfig) => void;
  onNotify: (msg: string) => void;
}

export const MedicationsManager: React.FC<MedicationsManagerProps> = ({
  draft,
  onUpdateDraft,
  onNotify,
}) => {
  const currentPlan: MedicationPlanConfig = draft.medicationPlan || {
    showToClient: true,
    items: [],
  };

  const [editingMedId, setEditingMedId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Partial<MedicationItem>>({
    name: '',
    dose: '',
    timesPerDay: 1,
    timings: [],
    withFood: 'unspecified',
    appetiteEffect: 'unknown',
    weightEffect: 'unknown',
    foodInteractionNote: '',
    coachNotes: '',
    active: true,
  });

  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleToggleShowToClient = () => {
    const nextVal = !currentPlan.showToClient;
    const updated: MedicationPlanConfig = {
      ...currentPlan,
      showToClient: nextVal,
      lastUpdatedAt: new Date().toISOString(),
      lastUpdatedBy: 'coach',
    };
    onUpdateDraft({
      ...draft,
      medicationPlan: updated,
    });
    onNotify(nextVal ? 'أصبحت الأدوية ظاهرة للعميل في تبويب اليوم 👁️' : 'تم إخفاء بطاقة الأدوية عن العميل 🔒');
  };

  const handleStartAdd = () => {
    setEditingMedId(null);
    setFormState({
      id: 'med_' + Date.now(),
      name: '',
      dose: '',
      timesPerDay: 1,
      timings: [{ id: 't_' + Date.now(), slot: 'with_breakfast', label: 'مع الإفطار' }],
      withFood: 'required',
      appetiteEffect: 'none',
      weightEffect: 'none',
      foodInteractionNote: '',
      coachNotes: '',
      active: true,
    });
    setIsAddingNew(true);
  };

  const handleStartEdit = (med: MedicationItem) => {
    setEditingMedId(med.id);
    setFormState({ ...med });
    setIsAddingNew(true);
  };

  const handleCancelForm = () => {
    setIsAddingNew(false);
    setEditingMedId(null);
  };

  const handleToggleSlot = (slot: MedicationSlot, label: string) => {
    const currentTimings = formState.timings || [];
    const exists = currentTimings.some((t) => t.slot === slot);

    let nextTimings;
    if (exists) {
      nextTimings = currentTimings.filter((t) => t.slot !== slot);
    } else {
      nextTimings = [...currentTimings, { id: 't_' + Date.now() + Math.random().toString(36).slice(2, 5), slot, label }];
    }

    setFormState({
      ...formState,
      timings: nextTimings,
      timesPerDay: nextTimings.length || 1,
    });
  };

  const handleSaveMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name?.trim()) {
      alert('يرجى كتابة اسم الدواء أو العلاج');
      return;
    }
    if (!formState.dose?.trim()) {
      alert('يرجى كتابة جرعة الدواء (مثال: 500 مجم أو 1 قرص)');
      return;
    }
    if (!formState.timings || formState.timings.length === 0) {
      alert('يرجى تحديد توقيت واحد على الأقل بالنسبة للوجبات');
      return;
    }

    const finalItem: MedicationItem = {
      id: formState.id || 'med_' + Date.now(),
      name: formState.name.trim(),
      dose: formState.dose.trim(),
      timesPerDay: formState.timings.length,
      timings: formState.timings,
      withFood: formState.withFood || 'unspecified',
      appetiteEffect: formState.appetiteEffect || 'unknown',
      weightEffect: formState.weightEffect || 'unknown',
      foodInteractionNote: formState.foodInteractionNote?.trim() || '',
      coachNotes: formState.coachNotes?.trim() || '',
      active: formState.active !== false,
    };

    let updatedItems: MedicationItem[];
    if (editingMedId) {
      updatedItems = (currentPlan.items || []).map((m) => (m.id === editingMedId ? finalItem : m));
    } else {
      updatedItems = [...(currentPlan.items || []), finalItem];
    }

    const updatedPlan: MedicationPlanConfig = {
      ...currentPlan,
      items: updatedItems,
      lastUpdatedAt: new Date().toISOString(),
      lastUpdatedBy: 'coach',
    };

    onUpdateDraft({
      ...draft,
      medicationPlan: updatedPlan,
    });

    setIsAddingNew(false);
    setEditingMedId(null);
    onNotify(editingMedId ? 'تم تعديل بيانات الدواء بنجاح 💊' : 'تمت إضافة الدواء إلى سجل العميل 💊');
  };

  const handleDeleteMedication = (id: string, name: string) => {
    if (!confirm(`هل أنت متأكد من حذف دواء "${name}" من سجل العميل؟`)) return;

    const updatedItems = (currentPlan.items || []).filter((m) => m.id !== id);
    const updatedPlan: MedicationPlanConfig = {
      ...currentPlan,
      items: updatedItems,
      lastUpdatedAt: new Date().toISOString(),
      lastUpdatedBy: 'coach',
    };

    onUpdateDraft({
      ...draft,
      medicationPlan: updatedPlan,
    });
    onNotify('تم حذف الدواء من السجل');
  };

  const handleToggleActive = (id: string) => {
    const updatedItems = (currentPlan.items || []).map((m) => {
      if (m.id === id) {
        return { ...m, active: !m.active };
      }
      return m;
    });

    onUpdateDraft({
      ...draft,
      medicationPlan: {
        ...currentPlan,
        items: updatedItems,
        lastUpdatedAt: new Date().toISOString(),
      },
    });
  };

  const items = currentPlan.items || [];
  const activeCount = items.filter((m) => m.active !== false).length;

  return (
    <div className="space-y-4">
      {/* 1. Header & Client Visibility */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-600/20 shrink-0">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm">
                سجل الأدوية والتفاعلات الغذائية
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
                {activeCount} {activeCount === 1 ? 'دواء مفعّل' : activeCount === 2 ? 'دواءان مفعّلان' : 'أدوية مفعّلة'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              حدد توقيت الدواء بالنسبة للوجبات، ملاحظات تفاعل الطعام، وتأثيراته على الشهية والوزن.
            </p>
          </div>
        </div>

        {/* Visibility Toggle */}
        <button
          type="button"
          onClick={handleToggleShowToClient}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
            currentPlan.showToClient !== false
              ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
          }`}
          title="تحديد هل تظهر بطاقة الأدوية للعميل في تبويب اليوم لتسجيل الالتزام"
        >
          {currentPlan.showToClient !== false ? <Eye className="w-3.5 h-3.5 text-blue-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
          <span>{currentPlan.showToClient !== false ? 'ظاهر للعميل في اليوم' : 'مخفي عن العميل'}</span>
        </button>
      </div>

      {/* 2. Add Medication Action */}
      {!isAddingNew && (
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
            قائمة الأدوية والعلاجات الموصوفة:
          </span>
          <button
            type="button"
            onClick={handleStartAdd}
            className="px-3.5 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة دواء جديد</span>
          </button>
        </div>
      )}

      {/* 3. Add/Edit Medication Form */}
      {isAddingNew && (
        <form
          onSubmit={handleSaveMedication}
          className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-800/95 border-2 border-blue-500/40 dark:border-blue-500/30 shadow-md space-y-4 animate-in slide-in-from-top-2 duration-150"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-blue-600" />
              <h5 className="font-black text-slate-800 dark:text-slate-100 text-sm">
                {editingMedId ? 'تعديل بيانات الدواء' : 'إضافة دواء جديد للسجل'}
              </h5>
            </div>
            <button
              type="button"
              onClick={handleCancelForm}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Name & Dose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                اسم الدواء / العلاج <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: جلوكوفاج (Glucophage) أو أوزمبيك"
                value={formState.name || ''}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                الجرعة وعدد الحبات <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: 500 مجم (قرص واحد)"
                value={formState.dose || ''}
                onChange={(e) => setFormState({ ...formState, dose: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Timing Slots (Checkboxes grouped) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>توقيت الجرعات بالنسبة للوجبات:</span>
                <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] font-bold text-blue-600">
                {(formState.timings || []).length} مواعيد محددة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
              {MEDICATION_SLOT_OPTIONS.map((slotOpt) => {
                const isChecked = (formState.timings || []).some((t) => t.slot === slotOpt.slot);
                return (
                  <button
                    key={slotOpt.slot}
                    type="button"
                    onClick={() => handleToggleSlot(slotOpt.slot, slotOpt.label)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-right flex items-center gap-2 border cursor-pointer ${
                      isChecked
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-sm">{slotOpt.icon}</span>
                    <span className="truncate flex-1">{slotOpt.label}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Relation to Food & Appetite / Weight Effects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* With food requirement */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                علاقة تناول الدواء بالطعام:
              </label>
              <select
                value={formState.withFood || 'unspecified'}
                onChange={(e) => setFormState({ ...formState, withFood: e.target.value as WithFoodOption })}
                className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="required">مع الأكل / الوجبة حتماً</option>
                <option value="empty_stomach">على معدة فارغة / على الريق</option>
                <option value="optional">مع أو بدون الأكل (اختياري)</option>
                <option value="unspecified">غير محدد</option>
              </select>
            </div>

            {/* Appetite Effect */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                تأثير الدواء على الشهية:
              </label>
              <select
                value={formState.appetiteEffect || 'unknown'}
                onChange={(e) => setFormState({ ...formState, appetiteEffect: e.target.value as AppetiteEffect })}
                className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="decrease">📉 يقلل الشهية / يساعد على الشبع</option>
                <option value="increase">📈 قد يزيد الشهية / يسبب جوعاً</option>
                <option value="none">➖ لا تأثير على الشهية</option>
                <option value="unknown">❓ غير محدد</option>
              </select>
            </div>

            {/* Weight Effect */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                تأثير الدواء على الوزن:
              </label>
              <select
                value={formState.weightEffect || 'unknown'}
                onChange={(e) => setFormState({ ...formState, weightEffect: e.target.value as WeightEffect })}
                className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="loss">⚖️⬇️ قد يساهم في نزول الوزن</option>
                <option value="gain">⚖️⬆️ قد يسبب زيادة وزن أو احتباس</option>
                <option value="none">⚖️➖ محايد على الوزن</option>
                <option value="unknown">❓ غير محدد</option>
              </select>
            </div>
          </div>

          {/* Food Interaction Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              تنويه التفاعلات الغذائية ومحاذير الطعام (Food Interaction Note):
            </label>
            <input
              type="text"
              placeholder="مثال: تجنب الجريب فروت، أو تجنب تناوله مع منتجات الألبان والكالسيوم في نفس الوقت..."
              value={formState.foodInteractionNote || ''}
              onChange={(e) => setFormState({ ...formState, foodInteractionNote: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Coach Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              ملاحظات الأخصائي للمتدرب حول هذا الدواء:
            </label>
            <textarea
              rows={2}
              placeholder="مثال: يؤخذ لمدة 3 أشهر ثم مراجعة التحليل، أو شرب كوب ماء كبير مع القرص..."
              value={formState.coachNotes || ''}
              onChange={(e) => setFormState({ ...formState, coachNotes: e.target.value })}
              className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
            <button
              type="button"
              onClick={handleCancelForm}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{editingMedId ? 'حفظ التعديلات' : 'إضافة الدواء للسجل'}</span>
            </button>
          </div>
        </form>
      )}

      {/* 4. List of Medications Cards */}
      {items.length === 0 && !isAddingNew ? (
        <div className="p-8 text-center rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 space-y-2">
          <Pill className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-xs font-bold text-slate-500">لا توجد أدوية مسجلة في خطة العميل حالياً.</p>
          <button
            type="button"
            onClick={handleStartAdd}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            + إضافة دواء أو علاج جديد
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((med) => {
            const withFoodInfo = WITH_FOOD_LABELS[med.withFood || 'unspecified'];
            const appetiteInfo = APPETITE_EFFECT_LABELS[med.appetiteEffect || 'unknown'];
            const weightInfo = WEIGHT_EFFECT_LABELS[med.weightEffect || 'unknown'];

            return (
              <div
                key={med.id}
                className={`p-4 rounded-2xl border transition-all ${
                  med.active !== false
                    ? 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h5 className="font-black text-slate-800 dark:text-slate-100 text-sm">
                        {med.name}
                      </h5>
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-black bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {med.dose}
                      </span>
                      {med.active === false && (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          موقوف مؤقتاً
                        </span>
                      )}
                    </div>

                    {/* Timing chips */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {(med.timings || []).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                        >
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span>{t.label}</span>
                        </span>
                      ))}
                    </div>

                    {/* Food and Effects tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-bold">
                      {med.withFood && med.withFood !== 'unspecified' && (
                        <span className={`px-2 py-0.5 rounded-md border ${withFoodInfo.badgeColor}`}>
                          🍽️ {withFoodInfo.label}
                        </span>
                      )}
                      {med.appetiteEffect && med.appetiteEffect !== 'unknown' && med.appetiteEffect !== 'none' && (
                        <span className={`px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${appetiteInfo.color}`}>
                          {appetiteInfo.icon} {appetiteInfo.label}
                        </span>
                      )}
                      {med.weightEffect && med.weightEffect !== 'unknown' && med.weightEffect !== 'none' && (
                        <span className={`px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${weightInfo.color}`}>
                          {weightInfo.icon} {weightInfo.label}
                        </span>
                      )}
                    </div>

                    {/* Food interaction note */}
                    {med.foodInteractionNote && (
                      <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-1.5 mt-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>تفاعل غذائي:</strong> {med.foodInteractionNote}
                        </span>
                      </div>
                    )}

                    {/* Coach Notes */}
                    {med.coachNotes && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                        💡 {med.coachNotes}
                      </p>
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(med.id)}
                      className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        med.active !== false
                          ? 'text-slate-400 hover:text-slate-600 border-slate-200 dark:border-slate-700'
                          : 'text-emerald-600 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950'
                      }`}
                      title={med.active !== false ? 'إيقاف مؤقت' : 'إعادة تفعيل'}
                    >
                      {med.active !== false ? 'تفعيل' : 'إيقاف'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(med)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
                      title="تعديل الدواء"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMedication(med.id, med.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
                      title="حذف الدواء"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
