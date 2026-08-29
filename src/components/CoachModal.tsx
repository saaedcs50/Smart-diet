import React, { useState } from 'react';
import { 
  Settings, 
  Copy, 
  Download, 
  Upload, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Save, 
  X, 
  Utensils, 
  CheckSquare, 
  Pill, 
  Lightbulb, 
  User,
  Sliders,
  Calculator,
  Flame,
  Timer,
  LayoutGrid,
  Eye,
  EyeOff,
  Droplets,
  Moon,
  Smile,
  Activity,
  Stethoscope,
  MessageSquare,
  Share2,
  Ruler,
  BarChart3,
  CheckCircle2,
  Sparkles,
  FolderHeart,
  BookmarkPlus,
  Zap,
  BookOpen,
  Heart,
  Wand2,
  Loader2,
  Send
} from 'lucide-react';
import { MealItem, CheckItem, SupplementItem, PlanConfig, SectionVisibility } from '../types';
import { DEFAULT_PLAN, DEFAULT_VISIBLE_SECTIONS, exportFullBackupJSON, importFullBackupJSON, isSectionVisible, loadDayLog, getTodayDateString } from '../utils/storage';
import { calculateDayScore } from '../utils/calculations';
import { generateWhatsAppPlanMessage } from '../utils/planShare';
import { ClinicalCalculatorSuiteModal } from './ClinicalCalculatorSuiteModal';
import { PresetsLibraryModal } from './PresetsLibraryModal';
import { MedicalConditionsEditor } from './MedicalConditionsEditor';
import { MedicationsManager } from './MedicationsManager';
import { CycleTrackingManager } from './CycleTrackingManager';
import { LabTrackingManager } from './LabTrackingManager';
import { MealExchangePlanner } from './MealExchangePlanner';
import { requestWeeklyDraft } from '../utils/geminiCoach';
import { 
  getAllPresets, 
  saveCustomPreset, 
  deleteCustomPreset, 
  createPresetFromPlan, 
  applyPresetToPlanDraft, 
  PlanPreset 
} from '../utils/planPresets';

interface CoachModalProps {
  plan: PlanConfig;
  coachSessionUnlocked?: boolean;
  coachToken?: string | null;
  onSavePlan: (newPlan: PlanConfig) => void;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const CoachModal: React.FC<CoachModalProps> = ({
  plan,
  coachSessionUnlocked,
  coachToken,
  onSavePlan,
  onClose,
  onNotify,
}) => {
  const [draft, setDraft] = useState<PlanConfig>(() => ({
    ...JSON.parse(JSON.stringify(plan)),
    visibleSections: {
      ...DEFAULT_VISIBLE_SECTIONS,
      ...(plan.visibleSections || {}),
    },
  }));
  const [activeSubTab, setActiveSubTab] = useState<'presets' | 'profile' | 'calculators' | 'medical' | 'medications' | 'cycle' | 'labs' | 'meals' | 'habits' | 'sections' | 'weights' | 'backup'>('presets');
  const [mealEditMode, setMealEditMode] = useState<'exchanges' | 'manual'>('exchanges');
  const [showBMRCalc, setShowBMRCalc] = useState(false);
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  const [selectedPresetCategory, setSelectedPresetCategory] = useState<string>('all');
  const [previewPreset, setPreviewPreset] = useState<PlanPreset | null>(null);
  const [showSavePresetPrompt, setShowSavePresetPrompt] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetCategory, setNewPresetCategory] = useState<PlanPreset['category']>('custom');
  const [newPresetSummary, setNewPresetSummary] = useState('');
  const [presetsList, setPresetsList] = useState<PlanPreset[]>(getAllPresets);

  // Gemini Smart Weekly Message Draft state in Coach Panel
  const [isGeneratingWeeklyDraft, setIsGeneratingWeeklyDraft] = useState(false);
  const [coachWeeklyDraftText, setCoachWeeklyDraftText] = useState<string | null>(null);

  const refreshPresets = () => {
    setPresetsList(getAllPresets());
  };

  const handleGenerateCoachWeeklyDraft = async () => {
    setIsGeneratingWeeklyDraft(true);
    const todayStr = getTodayDateString();
    const ref = new Date(todayStr);
    let totalScore = 0;
    let bestScore = -1;
    let bestDate = todayStr;
    let totalWater = 0;
    let waterDaysCount = 0;
    let exerciseDays = 0;
    const weights: number[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(ref);
      d.setDate(ref.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const log = loadDayLog(dateStr);
      const score = calculateDayScore(draft, log).total;
      totalScore += score;
      if (score > bestScore) {
        bestScore = score;
        bestDate = dateStr;
      }
      if (log.water && log.water > 0) {
        totalWater += log.water;
        waterDaysCount++;
      }
      if (log.checks && Object.values(log.checks).some(Boolean)) {
        exerciseDays++;
      }
      if (typeof log.weight === 'number' && log.weight > 0) {
        weights.push(log.weight);
      }
    }

    const avgAdherence = Math.round(totalScore / 7);
    const weightChange = weights.length >= 2 ? parseFloat((weights[weights.length - 1] - weights[0]).toFixed(1)) : null;
    const avgWater = waterDaysCount > 0 ? Math.round(totalWater / 7) : null;

    const res = await requestWeeklyDraft({
      clientName: draft.clientName || 'البطل',
      avgAdherence,
      bestDay: `${bestDate} (${bestScore}%)`,
      weightChange,
      avgWater,
      exerciseDays,
      goal: draft.goal,
      rangeDays: 7,
    }, coachToken);

    setIsGeneratingWeeklyDraft(false);

    if (!res.ok || !res.whatsappDraft) {
      onNotify(res.error || 'تعذر صياغة مسودة الواتساب الذكية.');
      return;
    }

    setCoachWeeklyDraftText(res.whatsappDraft);
    onNotify('تمت صياغة مسودة رسالة الأسبوع الذكية بنجاح ✨');
  };

  const handleApplyPreset = (preset: PlanPreset) => {
    const updated = applyPresetToPlanDraft(draft, preset);
    setDraft(updated);
    onNotify(`تم تطبيق قالب «${preset.name}» على مسودة خطة ${draft.clientName || 'المتدرب'} ⚡`);
  };

  const handleDeletePreset = (preset: PlanPreset, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`هل أنتِ متأكدة من حذف قالب «${preset.name}» من مكتبتك؟`)) {
      deleteCustomPreset(preset.id);
      refreshPresets();
      if (previewPreset?.id === preset.id) setPreviewPreset(null);
      onNotify('تم حذف القالب المخصص من المكتبة 🗑️');
    }
  };

  const handleSaveCurrentAsCustomPreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName.trim()) {
      alert('الرجاء إدخال اسم للقالب');
      return;
    }
    const preset = createPresetFromPlan(
      draft,
      newPresetName.trim(),
      newPresetCategory,
      newPresetSummary.trim()
    );
    const ok = saveCustomPreset(preset);
    if (ok) {
      refreshPresets();
      setShowSavePresetPrompt(false);
      setNewPresetName('');
      setNewPresetSummary('');
      onNotify(`تم حفظ الخطة الحالية كقالب «${preset.name}» في مكتبتك بنجاح 💾`);
    } else {
      alert('حدث خطأ أثناء حفظ القالب');
    }
  };

  const handleToggleSection = (key: keyof SectionVisibility) => {
    const isCurrentlyVisible = isSectionVisible(draft, key);
    const updatedVisible: SectionVisibility = {
      ...DEFAULT_VISIBLE_SECTIONS,
      ...(draft.visibleSections || {}),
      [key]: !isCurrentlyVisible,
    };
    setDraft({
      ...draft,
      visibleSections: updatedVisible,
      ...(key === 'macrosTracker' ? { enableMacrosTracker: !isCurrentlyVisible } : {}),
      ...(key === 'fastingTimer' ? { enableFastingTimer: !isCurrentlyVisible } : {}),
    });
  };

  const handleSetAllSections = (visible: boolean) => {
    const updated: SectionVisibility = {
      scoreCard: visible,
      macrosTracker: visible,
      fastingTimer: visible,
      tipsBanner: visible,
      mealsList: visible,
      waterTracker: visible,
      sleepTracker: visible,
      moodTracker: visible,
      exerciseTracker: visible,
      checklistTracker: visible,
      supplementsTracker: visible,
      symptomsTracker: visible,
      doctorNotes: visible,
      quickReportBtn: visible,
      bodyTab: visible,
      reportsTab: visible,
    };
    setDraft({
      ...draft,
      visibleSections: updated,
      enableMacrosTracker: visible,
      enableFastingTimer: visible,
    });
    onNotify(visible ? 'تم تفعيل وإظهار كافة اللوحات' : 'تم إخفاء اللوحات المحددة');
  };

  const handleSetMinimalSections = () => {
    const updated: SectionVisibility = {
      scoreCard: true,
      macrosTracker: false,
      fastingTimer: false,
      tipsBanner: false,
      mealsList: true,
      waterTracker: true,
      sleepTracker: false,
      moodTracker: false,
      exerciseTracker: false,
      checklistTracker: false,
      supplementsTracker: false,
      symptomsTracker: false,
      doctorNotes: true,
      quickReportBtn: true,
      bodyTab: true,
      reportsTab: true,
    };
    setDraft({
      ...draft,
      visibleSections: updated,
      enableMacrosTracker: false,
      enableFastingTimer: false,
    });
    onNotify('تم تطبيق الوضع المبسط (الوجبات والماء فقط)');
  };

  const handleSave = () => {
    const sw = draft.scoreWeights;
    const totalWeights = (sw.checklist || 0) + (sw.water || 0) + (sw.sleep || 0) + (sw.meals || 0);
    if (totalWeights <= 0) {
      alert('يجب أن يكون مجموع أوزان التقييم أكبر من صفر');
      return;
    }

    onSavePlan(draft);
    onNotify('تم حفظ إعدادات الخطة وتخصيص اللوحات بنجاح ✅');
    onClose();
  };

  const handleCopyPlanForWhatsApp = () => {
    const fullMessage = generateWhatsAppPlanMessage(draft);
    navigator.clipboard.writeText(fullMessage).then(() => {
      onNotify('تم نسخ رسالة الخطة الشاملة للواتساب مع كافة الإعدادات والإرشادات 📋');
    });
  };

  const handleCopyRawJson = () => {
    const jsonStr = JSON.stringify(draft, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      onNotify('تم نسخ كود الخطة الخام (JSON) 📋');
    });
  };

  const handleDirectWhatsAppShare = () => {
    const fullMessage = generateWhatsAppPlanMessage(draft);
    const encoded = encodeURIComponent(fullMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    onNotify('جاري فتح الواتساب لإرسال الخطة للمتدرب 💬');
  };

  const handleExportFullBackup = () => {
    const backupStr = exportFullBackupJSON();
    const blob = new Blob([backupStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_${draft.clientName || 'client'}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onNotify('تم تنزيل النسخة الاحتياطية 💾');
  };

  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const success = importFullBackupJSON(content);
        if (success) {
          onNotify('تم استيراد النسخة الاحتياطية بنجاح 🔄');
          onClose();
          window.location.reload();
        } else {
          alert('تعذر استيراد الملف، تأكد من صحة التنسيق');
        }
      } catch (err) {
        alert('الملف غير صالح');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetToDefault = () => {
    if (window.confirm('هل أنت متأكد من استعادة الخطة الافتراضية؟ سيتم إلغاء التعديلات.')) {
      setDraft(JSON.parse(JSON.stringify(DEFAULT_PLAN)));
      onNotify('تمت استعادة الإعدادات الافتراضية');
    }
  };

  const handleAddMeal = () => {
    const newMeal: MealItem = {
      id: `m_${Date.now()}`,
      name: 'وجبة جديدة 🍽️',
      items: 'مكونات الوجبة والكميات...',
      alternatives: ['بديل أول...', 'بديل ثانٍ...'],
      calories: 400,
      proteinGrams: 30,
    };
    setDraft({ ...draft, meals: [...draft.meals, newMeal] });
  };

  const handleRemoveMeal = (index: number) => {
    const updated = [...draft.meals];
    updated.splice(index, 1);
    setDraft({ ...draft, meals: updated });
  };

  const handleAddCheck = () => {
    const newItem: CheckItem = {
      id: `c_${Date.now()}`,
      label: 'مهمة جديدة...',
    };
    setDraft({ ...draft, checklist: [...draft.checklist, newItem] });
  };

  const handleRemoveCheck = (index: number) => {
    const updated = [...draft.checklist];
    updated.splice(index, 1);
    setDraft({ ...draft, checklist: updated });
  };

  const handleAddSupp = () => {
    const newItem: SupplementItem = {
      id: `s_${Date.now()}`,
      name: 'مكمل جديد...',
      time: 'مع الوجبة',
    };
    setDraft({ ...draft, supplements: [...(draft.supplements || []), newItem] });
  };

  const handleRemoveSupp = (index: number) => {
    const updated = [...(draft.supplements || [])];
    updated.splice(index, 1);
    setDraft({ ...draft, supplements: updated });
  };

  const handleAddTip = () => {
    setDraft({ ...draft, tips: [...(draft.tips || []), 'نصيحة جديدة للمتدرب...'] });
  };

  const handleRemoveTip = (index: number) => {
    const updated = [...(draft.tips || [])];
    updated.splice(index, 1);
    setDraft({ ...draft, tips: updated });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                لوحة تحكم الطبيبة (د. شيماء) 🩺
              </h3>
              <p className="text-[11px] text-slate-400">تخصيص الخطة والسعرات والوجبات والبدائل</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 mb-3 border-b border-slate-100 dark:border-slate-800">
          {[
            { id: 'presets', label: 'مكتبة القوالب 📂', icon: <FolderHeart className="w-3.5 h-3.5 text-emerald-500" /> },
            { id: 'profile', label: 'المتدرب والسعرات', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'calculators', label: 'الحاسبة الإكلينيكية ⚡', icon: <Calculator className="w-3.5 h-3.5 text-blue-500" /> },
            { 
              id: 'medical', 
              label: `الحالات والتشخيصات 🩺${draft.medicalConditions?.conditions?.length ? ` (${draft.medicalConditions.conditions.length})` : ''}`, 
              icon: <Stethoscope className="w-3.5 h-3.5 text-teal-500" /> 
            },
            { 
              id: 'medications', 
              label: `سجل الأدوية والتفاعلات 💊${draft.medicationPlan?.items?.length ? ` (${draft.medicationPlan.items.length})` : ''}`, 
              icon: <Pill className="w-3.5 h-3.5 text-blue-500" /> 
            },
            { 
              id: 'cycle', 
              label: `تتبع الدورة 🌸${draft.cycleTracking?.enabled ? ' (مفعّل)' : ''}`, 
              icon: <Heart className="w-3.5 h-3.5 text-rose-500" /> 
            },
            { 
              id: 'labs', 
              label: `التحاليل المعملية 🧪${draft.labTracking?.entries?.length ? ` (${draft.labTracking.entries.length})` : ''}`, 
              icon: <Activity className="w-3.5 h-3.5 text-teal-500" /> 
            },
            { id: 'meals', label: 'الوجبات والبدائل', icon: <Utensils className="w-3.5 h-3.5" /> },
            { id: 'habits', label: 'العادات والمكملات', icon: <CheckSquare className="w-3.5 h-3.5" /> },
            { id: 'sections', label: 'تخصيص اللوحات 👁️', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { id: 'weights', label: 'أوزان التقييم %', icon: <Sliders className="w-3.5 h-3.5" /> },
            { id: 'backup', label: 'النسخ والمشاركة', icon: <Copy className="w-3.5 h-3.5" /> },
          ].map((tab) => {
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          
          {/* TAB 0: Presets Library */}
          {activeSubTab === 'presets' && (
            <div className="space-y-4">
              {/* Presets top info & Save Custom Button */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <FolderHeart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    مكتبة القوالب العلاجية والغذائية الجاهزة 📂
                  </h4>
                  <p className="text-[11px] text-emerald-700/90 dark:text-emerald-300 mt-0.5">
                    اختاري قالب متكامل لحالة المتدرب ليتم ملء الوجبات والبدائل والمكملات والسعرات بضغطة واحدة
                  </p>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto">
                  <button
                    onClick={() => setShowSavePresetPrompt(true)}
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>حفظ خطتي الحالية كقالب 💾</span>
                  </button>
                </div>
              </div>

              {/* Categories Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: 'all', label: 'كافة القوالب' },
                  { id: 'medical', label: '🩺 علاجي PCOS' },
                  { id: 'weight_loss', label: '⚡ نزول سريع' },
                  { id: 'fitness', label: '💪 تنشيف ولياقة' },
                  { id: 'keto', label: '🥑 كيتو علاجي' },
                  { id: 'maintenance', label: '⚖️ تثبيت وتوازن' },
                  { id: 'custom', label: '💾 قوالبي الخاصة' },
                ].map((c) => {
                  const isSel = selectedPresetCategory === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedPresetCategory(c.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                        isSel
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              {/* Presets List */}
              <div className="space-y-3">
                {presetsList
                  .filter((p) => {
                    if (selectedPresetCategory === 'all') return true;
                    if (selectedPresetCategory === 'custom') return p.isCustom;
                    return p.category === selectedPresetCategory;
                  })
                  .map((preset) => {
                    return (
                      <div
                        key={preset.id}
                        className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 sm:p-4 hover:border-emerald-500/60 transition-all space-y-2.5 shadow-2xs"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{preset.icon}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-black text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                                  {preset.name}
                                </h5>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg border ${preset.tagColor}`}>
                                  {preset.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                                {preset.description}
                              </p>
                            </div>
                          </div>

                          {preset.isCustom && (
                            <button
                              onClick={(e) => handleDeletePreset(preset, e)}
                              className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer"
                              title="حذف القالب"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Stats Badges */}
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                          <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200">
                            🔥 {preset.targetCalories} كالوري
                          </span>
                          <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                            🥩 بروتين: {preset.targetProtein} جم
                          </span>
                          <span className="px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300">
                            🌾 كارب: {preset.targetCarbs} جم
                          </span>
                          <span className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300">
                            ⏳ صيام: {preset.fastingHours}h
                          </span>
                          <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">
                            💧 ماء: {preset.dailyWaterGoalMl / 1000}L
                          </span>
                          <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500">
                            🍽️ {preset.mealsCount} وجبات • 💊 {preset.supplementsCount} مكملات
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setPreviewPreset(preset)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>معاينة المكونات</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleApplyPreset(preset)}
                            className="px-4 py-1.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>تطبيق القالب على المسودة ⚡</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  ملاحظة: تطبيق القالب يقوم بملء الوجبات والبدائل والعادات والمكملات والسعرات مع الحفاظ التلقائي على اسم المتدرب ووزنه وطوله الحالي.
                </span>
              </div>
            </div>
          )}

          {/* TAB 1: Profile & Goals & Calories */}
          {activeSubTab === 'profile' && (
            <div className="space-y-3">
              {/* Presets Quick Shortcut */}
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FolderHeart className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-black text-emerald-900 dark:text-emerald-200">
                    هل تريد بدء الخطة من قالب طبي جاهز؟
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('presets')}
                  className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-colors cursor-pointer shadow-2xs"
                >
                  فتح مكتبة القوالب ⚡
                </button>
              </div>

              {/* BMR Calculator Quick Trigger */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1">
                    <Calculator className="w-3.5 h-3.5" />
                    حاسبة معدل الحرق والماكروز (BMR/TDEE)
                  </h4>
                  <p className="text-[11px] text-blue-700/80 dark:text-blue-300">
                    احسب احتياج المتدرب وعجز السعرات وطبقه بضغطة زر
                  </p>
                </div>
                <button
                  onClick={() => setShowBMRCalc(true)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  فتح الحاسبة ⚡
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">اسم المتدرب</label>
                <input
                  type="text"
                  value={draft.clientName || ''}
                  onChange={(e) => setDraft({ ...draft, clientName: e.target.value })}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">الطول (سم)</label>
                  <input
                    type="number"
                    value={draft.heightCm || ''}
                    onChange={(e) => setDraft({ ...draft, heightCm: parseFloat(e.target.value) || null })}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">وزن البداية (كجم)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={draft.startWeight || ''}
                    onChange={(e) => setDraft({ ...draft, startWeight: parseFloat(e.target.value) || null })}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">الوزن المستهدف (كجم)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={draft.targetWeight || ''}
                    onChange={(e) => setDraft({ ...draft, targetWeight: parseFloat(e.target.value) || null })}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">الوسط المستهدف (سم)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={draft.targetWaist || ''}
                    onChange={(e) => setDraft({ ...draft, targetWaist: parseFloat(e.target.value) || null })}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Target Calories & Macros */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    السعرات والماكروز اليومية المستهدفة
                  </span>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.enableMacrosTracker ?? true}
                      onChange={(e) => setDraft({ ...draft, enableMacrosTracker: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    تفعيل التتبع
                  </label>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400">السعرات</label>
                    <input
                      type="number"
                      value={draft.targetCalories || ''}
                      onChange={(e) => setDraft({ ...draft, targetCalories: parseInt(e.target.value, 10) || 0 })}
                      className="w-full text-xs font-bold p-2 rounded-xl border bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">بروتين (جم)</label>
                    <input
                      type="number"
                      value={draft.targetProtein || ''}
                      onChange={(e) => setDraft({ ...draft, targetProtein: parseInt(e.target.value, 10) || 0 })}
                      className="w-full text-xs font-bold p-2 rounded-xl border bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">نشويات (جم)</label>
                    <input
                      type="number"
                      value={draft.targetCarbs || ''}
                      onChange={(e) => setDraft({ ...draft, targetCarbs: parseInt(e.target.value, 10) || 0 })}
                      className="w-full text-xs font-bold p-2 rounded-xl border bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">دهون (جم)</label>
                    <input
                      type="number"
                      value={draft.targetFats || ''}
                      onChange={(e) => setDraft({ ...draft, targetFats: parseInt(e.target.value, 10) || 0 })}
                      className="w-full text-xs font-bold p-2 rounded-xl border bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Fasting Timer Settings */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5 text-violet-500" />
                    مؤقت الصيام المتقطع
                  </span>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-violet-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.enableFastingTimer ?? true}
                      onChange={(e) => setDraft({ ...draft, enableFastingTimer: e.target.checked })}
                      className="rounded text-violet-600"
                    />
                    تفعيل المؤقت
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">ساعات الصيام المستهدفة:</span>
                  <input
                    type="number"
                    min="12"
                    max="24"
                    value={draft.fastingTargetHours || 16}
                    onChange={(e) => setDraft({ ...draft, fastingTargetHours: parseInt(e.target.value, 10) || 16 })}
                    className="w-16 text-xs font-bold p-1.5 rounded-xl border bg-white dark:bg-slate-900 text-center"
                  />
                  <span className="text-xs text-slate-500">ساعة</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">أيام الفري شهرياً</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={draft.freezeDaysPerMonth ?? 2}
                    onChange={(e) => setDraft({ ...draft, freezeDaysPerMonth: parseInt(e.target.value, 10) || 0 })}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">رمز PIN السري للكابتن</label>
                  <input
                    type="text"
                    maxLength={8}
                    value={draft.adminPin || '1234'}
                    onChange={(e) => setDraft({ ...draft, adminPin: e.target.value })}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: Medical Conditions & Diagnoses */}
          {activeSubTab === 'medical' && (
            <MedicalConditionsEditor
              draft={draft}
              onUpdateDraft={setDraft}
              onNotify={onNotify}
            />
          )}

          {/* TAB: Medications & Interactions */}
          {activeSubTab === 'medications' && (
            <MedicationsManager
              draft={draft}
              onUpdateDraft={setDraft}
              onNotify={onNotify}
            />
          )}

          {/* TAB: Menstrual Cycle Tracking */}
          {activeSubTab === 'cycle' && (
            <CycleTrackingManager
              draft={draft}
              onUpdateDraft={setDraft}
              onNotify={onNotify}
            />
          )}

          {/* TAB: Lab Tests Tracking */}
          {activeSubTab === 'labs' && (
            <LabTrackingManager
              draft={draft}
              onUpdateDraft={setDraft}
              onNotify={onNotify}
            />
          )}

          {/* TAB 2: Meals & Alternatives */}
          {activeSubTab === 'meals' && (
            <div className="space-y-4">
              {/* Header Mode Selector & Actions */}
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setMealEditMode('exchanges')}
                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      mealEditMode === 'exchanges'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    📊 نظام بدائل الأغذية الإكلينيكي
                  </button>

                  <button
                    type="button"
                    onClick={() => setMealEditMode('manual')}
                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      mealEditMode === 'manual'
                        ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    📝 التعديل اليدوي المباشر
                  </button>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-500">
                    عدد الوجبات: ({draft.meals.length})
                  </span>
                  <button
                    onClick={handleAddMeal}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    إضافة وجبة
                  </button>
                </div>
              </div>

              {/* Mode 1: Clinical Exchange Allocator */}
              {mealEditMode === 'exchanges' ? (
                <MealExchangePlanner
                  draft={draft}
                  coachSessionUnlocked={coachSessionUnlocked}
                  coachToken={coachToken}
                  onUpdateDraft={setDraft}
                  onNotify={onNotify}
                />
              ) : (
                /* Mode 2: Manual Text Editor */
                <div className="space-y-3">
                  {draft.meals.map((meal, idx) => (
                    <div
                      key={meal.id || idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={meal.name}
                          onChange={(e) => {
                            const updated = [...draft.meals];
                            updated[idx].name = e.target.value;
                            setDraft({ ...draft, meals: updated });
                          }}
                          className="text-xs font-bold px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 flex-1"
                          placeholder="اسم الوجبة"
                        />
                        <button
                          onClick={() => handleRemoveMeal(idx)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                          title="حذف الوجبة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                          المكونات الأساسية المقررة:
                        </label>
                        <textarea
                          rows={2}
                          value={meal.items}
                          onChange={(e) => {
                            const updated = [...draft.meals];
                            updated[idx].items = e.target.value;
                            setDraft({ ...draft, meals: updated });
                          }}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 resize-none"
                          placeholder="تفاصيل المكونات والكميات..."
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-1">
                          البدائل المتاحة (افصل بين البدائل بعلامة |):
                        </label>
                        <input
                          type="text"
                          value={(meal.alternatives || []).join(' | ')}
                          onChange={(e) => {
                            const updated = [...draft.meals];
                            updated[idx].alternatives = e.target.value
                              .split('|')
                              .map((s) => s.trim())
                              .filter(Boolean);
                            setDraft({ ...draft, meals: updated });
                          }}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                          placeholder="بديل 1 | بديل 2 | بديل 3"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Habits & Supplements & Tips */}
          {activeSubTab === 'habits' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    المهام والعادات اليومية ({draft.checklist.length})
                  </span>
                  <button
                    onClick={handleAddCheck}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    إضافة عادة
                  </button>
                </div>
                {draft.checklist.map((c, idx) => (
                  <div key={c.id || idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={c.label}
                      onChange={(e) => {
                        const updated = [...draft.checklist];
                        updated[idx].label = e.target.value;
                        setDraft({ ...draft, checklist: updated });
                      }}
                      className="flex-1 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                    />
                    <button
                      onClick={() => handleRemoveCheck(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Supplements */}
              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                    المكملات والفيتامينات ({draft.supplements?.length || 0})
                  </span>
                  <button
                    onClick={handleAddSupp}
                    className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    إضافة مكمل
                  </button>
                </div>
                {(draft.supplements || []).map((s, idx) => (
                  <div key={s.id || idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => {
                        const updated = [...draft.supplements];
                        updated[idx].name = e.target.value;
                        setDraft({ ...draft, supplements: updated });
                      }}
                      className="flex-1 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                      placeholder="اسم المكمل"
                    />
                    <input
                      type="text"
                      value={s.time || ''}
                      onChange={(e) => {
                        const updated = [...draft.supplements];
                        updated[idx].time = e.target.value;
                        setDraft({ ...draft, supplements: updated });
                      }}
                      className="w-24 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                      placeholder="التوقيت"
                    />
                    <button
                      onClick={() => handleRemoveSupp(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    نصائح وتوجيهات الكابتن ({draft.tips?.length || 0})
                  </span>
                  <button
                    onClick={handleAddTip}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    إضافة نصيحة
                  </button>
                </div>
                {(draft.tips || []).map((t, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={t}
                      onChange={(e) => {
                        const updated = [...draft.tips];
                        updated[idx] = e.target.value;
                        setDraft({ ...draft, tips: updated });
                      }}
                      className="flex-1 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                    />
                    <button
                      onClick={() => handleRemoveTip(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Sections Customization */}
          {activeSubTab === 'sections' && (
            <div className="space-y-4">
              {/* Header & Quick Presets */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-200 dark:border-emerald-900/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                      <LayoutGrid className="w-4 h-4 text-emerald-600" />
                      تخصيص لوحات صفحة المتدرب
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      يمكنك إخفاء أو إظهار أي لوحة أو عنصر في واجهة العميل بضغطة واحدة
                    </p>
                  </div>
                </div>

                {/* Quick Presets Buttons */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    onClick={() => handleSetAllSections(true)}
                    className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors shadow-2xs flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    إظهار كافة اللوحات
                  </button>
                  <button
                    onClick={handleSetMinimalSections}
                    className="px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-[11px] hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    الوضع المبسط (وجبات وماء فقط)
                  </button>
                </div>
              </div>

              {/* Categorized Panels List */}
              <div className="space-y-4">
                {[
                  {
                    title: '1. اللوحات الرئيسية والتنبيهات',
                    items: [
                      {
                        key: 'scoreCard' as const,
                        label: 'بطاقة معدل الالتزام وسلسلة الأيام',
                        desc: 'نسبة الالتزام الإجمالية، الستريك، ويوم الفري وأزرار التقرير',
                        icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
                      },
                      {
                        key: 'tipsBanner' as const,
                        label: 'بانر إرشادات ونصائح د. شيماء',
                        desc: 'الإرشادات اليومية الموجهة وزر دليل البدائل المعتمدة',
                        icon: <Lightbulb className="w-4 h-4 text-amber-500" />,
                      },
                      {
                        key: 'quickReportBtn' as const,
                        label: 'زر الإرسال السريع لتقرير الواتساب',
                        desc: 'الزر الأخضر الكبير في أسفل الصفحة لتصدير ومشاركة التقرير اليومي',
                        icon: <Share2 className="w-4 h-4 text-emerald-600" />,
                      },
                    ],
                  },
                  {
                    title: '2. التغذية والوجبات',
                    items: [
                      {
                        key: 'mealsList' as const,
                        label: 'قائمة الوجبات والبدائل المقررة',
                        desc: 'بطاقات وجبات اليوم مع زر البدائل وخيارات التقييم',
                        icon: <Utensils className="w-4 h-4 text-emerald-600" />,
                      },
                      {
                        key: 'macrosTracker' as const,
                        label: 'حاسبة وتتبع السعرات والماكروز',
                        desc: 'شريط تتبع السعرات والبروتين والكارب والدهون المستهلكة',
                        icon: <Flame className="w-4 h-4 text-orange-500" />,
                      },
                      {
                        key: 'fastingTimer' as const,
                        label: 'مؤقت ساعات الصيام المتقطع',
                        desc: 'عداد الصيام التفاعلي مع حساب ساعات الصيام والبدء والإيقاف',
                        icon: <Timer className="w-4 h-4 text-purple-500" />,
                      },
                    ],
                  },
                  {
                    title: '3. السوائل والراحة والنشاط',
                    items: [
                      {
                        key: 'waterTracker' as const,
                        label: 'متابع استهلاك الماء اليومي',
                        desc: 'أزرار الأكواب ومتابع الكمية المستهلكة نحو الهدف بالمل',
                        icon: <Droplets className="w-4 h-4 text-cyan-500" />,
                      },
                      {
                        key: 'sleepTracker' as const,
                        label: 'متابع ساعات وجودة النوم',
                        desc: 'حساب مدة النوم وأوقات النوم والاستيقاظ وتقييم الراحة',
                        icon: <Moon className="w-4 h-4 text-indigo-500" />,
                      },
                      {
                        key: 'moodTracker' as const,
                        label: 'متابع الحالة المزاجية والطاقة',
                        desc: 'تسجيل مستوى النشاط والمزاج اليومي للمتدرب',
                        icon: <Smile className="w-4 h-4 text-amber-500" />,
                      },
                      {
                        key: 'exerciseTracker' as const,
                        label: 'متابع النشاط والتمرين الرياضي',
                        desc: 'تسجيل دقائق التمرين والمشي وحساب حرق السعرات التقديري',
                        icon: <Activity className="w-4 h-4 text-rose-500" />,
                      },
                    ],
                  },
                  {
                    title: '4. العادات والمتابعة الطبية',
                    items: [
                      {
                        key: 'checklistTracker' as const,
                        label: 'قائمة العادات والمهام اليومية',
                        desc: 'قائمة المهام المحددة للمتدرب (مشى، أكل خضار، التزام...)',
                        icon: <CheckSquare className="w-4 h-4 text-teal-500" />,
                      },
                      {
                        key: 'supplementsTracker' as const,
                        label: 'الفيتامينات والمكملات الغذائية',
                        desc: 'مواعيد وجرعات المكملات والفيتامينات المقررة',
                        icon: <Pill className="w-4 h-4 text-purple-500" />,
                      },
                      {
                        key: 'medicationsTracker' as const,
                        label: 'بطاقة أدوية اليوم والالتزام الدوائي',
                        desc: 'عرض جدول جرعات الأدوية وتسجيل الالتزام للعميل في تبويب اليوم',
                        icon: <Pill className="w-4 h-4 text-blue-500" />,
                      },
                      {
                        key: 'cycleTracker' as const,
                        label: 'بطاقة دورة اليوم والسياق الهرموني 🌸',
                        desc: 'إظهار بطاقة تسجيل الدورة، الطور التقريبي، والأعراض في تبويب اليوم',
                        icon: <Heart className="w-4 h-4 text-rose-500" />,
                      },
                      {
                        key: 'symptomsTracker' as const,
                        label: 'متابع الأعراض والتعب الجسدي',
                        desc: 'تسجيل أي أعراض كالصداع أو الدوخة أو الخمول لمراجعتها',
                        icon: <Stethoscope className="w-4 h-4 text-rose-500" />,
                      },
                      {
                        key: 'doctorNotes' as const,
                        label: 'ملاحظات واستفسارات لـ د. شيماء',
                        desc: 'خانة رسائل المتدرب المباشرة للطبيبة المرفقة بالتقرير اليومي',
                        icon: <MessageSquare className="w-4 h-4 text-emerald-500" />,
                      },
                    ],
                  },
                  {
                    title: '5. التبويبات السفلية الإضافية',
                    items: [
                      {
                        key: 'bodyTab' as const,
                        label: 'تبويب قياسات وصور تطور الجسم',
                        desc: 'إتاحة تبويب قياسات الوزن والمحيطات ومقارنة الصور للمتدرب',
                        icon: <Ruler className="w-4 h-4 text-blue-500" />,
                      },
                      {
                        key: 'labTracker' as const,
                        label: 'قسم التحاليل المعملية ورسوم التتبع 🧪',
                        desc: 'إظهار كروت التحاليل ورسم الاتجاه في تاب الجسم',
                        icon: <Activity className="w-4 h-4 text-teal-500" />,
                      },
                      {
                        key: 'reportsTab' as const,
                        label: 'تبويب التقارير الأسبوعية والأرشيف',
                        desc: 'إتاحة تبويب سجلات الأيام وتصدير تقارير المتابعة الشاملة',
                        icon: <BarChart3 className="w-4 h-4 text-emerald-500" />,
                      },
                    ],
                  },
                ].map((grp) => (
                  <div key={grp.title} className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 px-1">
                      {grp.title}
                    </h5>

                    <div className="space-y-1.5">
                      {grp.items.map((item) => {
                        const isVisible = isSectionVisible(draft, item.key);
                        return (
                          <div
                            key={item.key}
                            onClick={() => handleToggleSection(item.key)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isVisible
                                ? 'bg-slate-50/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600'
                                : 'bg-slate-100/40 dark:bg-slate-900/40 border-dashed border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-90'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                isVisible 
                                  ? 'bg-white dark:bg-slate-700 shadow-2xs' 
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                              }`}>
                                {item.icon}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-xs font-bold block truncate ${
                                    isVisible ? 'text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'
                                  }`}>
                                    {item.label}
                                  </span>
                                  {isVisible ? (
                                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                      ظاهرة
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                      مخفية
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                  {item.desc}
                                </p>
                              </div>
                            </div>

                            {/* Toggle Switch */}
                            <div className="shrink-0 flex items-center">
                              <div
                                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                                  isVisible ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                                }`}
                              >
                                <div
                                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                    isVisible ? '-translate-x-5' : 'translate-x-0'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Score Weights */}
          {activeSubTab === 'weights' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                حدد النسبة المئوية لتأثير كل محور على تقييم الالتزام اليومي الإجمالي:
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    🍽️ الوجبات (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={draft.scoreWeights.meals}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        scoreWeights: { ...draft.scoreWeights, meals: parseInt(e.target.value, 10) || 0 },
                      })
                    }
                    className="w-full text-xs font-bold p-2 rounded-lg border bg-white dark:bg-slate-900"
                  />
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    💧 شرب المية (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={draft.scoreWeights.water}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        scoreWeights: { ...draft.scoreWeights, water: parseInt(e.target.value, 10) || 0 },
                      })
                    }
                    className="w-full text-xs font-bold p-2 rounded-lg border bg-white dark:bg-slate-900"
                  />
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    ✅ العادات والمهام (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={draft.scoreWeights.checklist}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        scoreWeights: { ...draft.scoreWeights, checklist: parseInt(e.target.value, 10) || 0 },
                      })
                    }
                    className="w-full text-xs font-bold p-2 rounded-lg border bg-white dark:bg-slate-900"
                  />
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    😴 النوم والراحة (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={draft.scoreWeights.sleep}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        scoreWeights: { ...draft.scoreWeights, sleep: parseInt(e.target.value, 10) || 0 },
                      })
                    }
                    className="w-full text-xs font-bold p-2 rounded-lg border bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center">
                إجمالي الأوزان الحالية: {(draft.scoreWeights.checklist || 0) + (draft.scoreWeights.water || 0) + (draft.scoreWeights.sleep || 0) + (draft.scoreWeights.meals || 0)}%
              </div>
            </div>
          )}

          {/* TAB 5: Backup & Share */}
          {activeSubTab === 'backup' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-emerald-600" />
                    تصدير الخطة الشاملة للمتدرب (واتساب)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/70 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                    تشمل جميع الإعدادات والتوجيهات
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300 leading-relaxed">
                  يقوم هذا الخيار بإنشاء رسالة واتساب منسقة ومفصلة تتضمن إرشادات د. شيماء، جدول الوجبات والبدائل، السعرات والماكروز، هدف الماء، المكملات، وكود المزامنة التلقائي، ليقوم المتدرب بنسخها وتطبيقها بنقرة واحدة داخل تطبيقه.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleCopyPlanForWhatsApp}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 shadow-xs active:scale-98"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    نسخ رسالة الواتساب الشاملة 📋
                  </button>

                  <button
                    onClick={handleDirectWhatsAppShare}
                    className="w-full py-2.5 px-3 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs active:scale-98"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    إرسال مباشر عبر واتساب 💬
                  </button>
                </div>

                <div className="pt-1 flex items-center justify-end">
                  <button
                    onClick={handleCopyRawJson}
                    className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    نسخ كود JSON الخام فقط
                  </button>
                </div>
              </div>

              {/* Gemini Smart Weekly Message Draft Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-blue-500/10 border border-teal-200 dark:border-teal-800/80 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-teal-950 dark:text-teal-200 text-xs flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    صياغة رسالة المتابعة الأسبوعية الذكية (د. شيماء) ✨
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    تحليل ذكي لآخر 7 أيام
                  </span>
                </div>
                <p className="text-[11px] text-teal-900/80 dark:text-teal-300 leading-relaxed">
                  يقوم الذكاء الاصطناعي بدراسة متوسط التزام المتدرب، تغير وزنه، شربه للماء، وتمارينه خلال آخر أسبوع لصياغة رسالة تشجيعية دافئة وتوجيه عملي مباشر للواتساب.
                </p>

                {coachWeeklyDraftText === null ? (
                  <button
                    type="button"
                    disabled={isGeneratingWeeklyDraft}
                    onClick={handleGenerateCoachWeeklyDraft}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98 transition-all"
                  >
                    {isGeneratingWeeklyDraft ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري دراسة البيانات وصياغة المسودة...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 text-amber-200" />
                        <span>صياغة مسودة المتابعة للأسبوع ✨</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-2.5 pt-1">
                    <label className="block text-[10px] font-bold text-teal-900 dark:text-teal-300">
                      مراجعة وتعديل نص الرسالة المقترح:
                    </label>
                    <textarea
                      rows={7}
                      value={coachWeeklyDraftText}
                      onChange={(e) => setCoachWeeklyDraftText(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-teal-200 dark:border-teal-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 resize-none font-medium leading-relaxed shadow-inner"
                      placeholder="مسودة الرسالة..."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(coachWeeklyDraftText)}`;
                          window.open(url, '_blank');
                          onNotify('جاري فتح الواتساب بالمسودة 💬');
                        }}
                        className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>إرسال واتساب</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(coachWeeklyDraftText).then(() => {
                            onNotify('تم نسخ مسودة المتابعة بنجاح 📋');
                          });
                        }}
                        className="py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ النص</span>
                      </button>

                      <button
                        type="button"
                        disabled={isGeneratingWeeklyDraft}
                        onClick={handleGenerateCoachWeeklyDraft}
                        className="py-2 px-3 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>إعادة التوليد</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-blue-500" />
                  نسخ احتياطي واستعادة كاملة
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  حفظ أو استرجاع جميع السجلات اليومية والبيانات في ملف خارجي.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleExportFullBackup}
                    className="py-2 px-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    تصدير النسخة (JSON)
                  </button>

                  <label className="py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 transition-colors cursor-pointer flex items-center justify-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    استيراد نسخة
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportBackupFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetToDefault}
                  className="w-full py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 font-bold text-xs hover:bg-rose-100 transition-colors flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  استعادة الخطة الافتراضية
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-4 h-4" />
            حفظ التعديلات
          </button>
        </div>
      </div>



      {/* DETAILED PREVIEW DRAWER / MODAL */}
      {previewPreset && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in zoom-in-95 duration-150">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[88vh] flex flex-col overflow-hidden">
            {/* Preview Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{previewPreset.icon}</span>
                <div>
                  <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                    معاينة قالب: {previewPreset.name}
                  </h4>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg border ${previewPreset.tagColor}`}>
                    {previewPreset.badge}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPreviewPreset(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
                <span className="font-black text-emerald-800 dark:text-emerald-300 block">🎯 الهدف والوصف الطبي:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {previewPreset.description}
                </p>
              </div>

              {/* Meals list */}
              <div className="space-y-2.5">
                <h5 className="font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-emerald-600" />
                  <span>الوجبات والبدائل المقررة ({previewPreset.planData.meals.length}):</span>
                </h5>
                <div className="space-y-2">
                  {previewPreset.planData.meals.map((m, idx) => (
                    <div key={m.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <div className="flex items-center justify-between font-black text-slate-800 dark:text-slate-100">
                        <span>{idx + 1}. {m.name}</span>
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400">{m.calories} كالوري | {m.proteinGrams}g بروتين</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 font-medium">
                        <strong className="text-slate-700 dark:text-slate-200">المحتوى الأساسي:</strong> {m.items}
                      </p>
                      {m.alternatives && m.alternatives.length > 0 && (
                        <div className="pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                          <strong className="text-emerald-700 dark:text-emerald-400 block">🔄 البدائل المعتمدة:</strong>
                          {m.alternatives.map((alt, aidx) => (
                            <div key={aidx}>• {alt}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Supplements */}
              {previewPreset.planData.supplements && previewPreset.planData.supplements.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-indigo-600" />
                    <span>المكملات والفيتامينات المقترحة:</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {previewPreset.planData.supplements.map((s) => (
                      <div key={s.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{s.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{s.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Habits */}
              {previewPreset.planData.checklist && previewPreset.planData.checklist.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    <span>العادات والتعليمات اليومية:</span>
                  </h5>
                  <div className="space-y-1">
                    {previewPreset.planData.checklist.map((c) => (
                      <div key={c.id} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
                        <span className="text-emerald-600 font-black">✓</span>
                        <span>{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctor tips */}
              {previewPreset.planData.tips && previewPreset.planData.tips.length > 0 && (
                <div className="space-y-1.5 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                  <span className="font-black text-amber-900 dark:text-amber-200 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>إرشادات د. شيماء المرفقة:</span>
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                    {previewPreset.planData.tips.map((t, tidx) => (
                      <li key={tidx}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Preview Footer Actions */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3">
              <button
                onClick={() => setPreviewPreset(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-colors cursor-pointer"
              >
                إغلاق المعاينة
              </button>

              <button
                onClick={() => {
                  handleApplyPreset(previewPreset);
                  setPreviewPreset(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>تطبيق هذا القالب على المسودة ⚡</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SAVE CURRENT PLAN AS CUSTOM PRESET MODAL */}
      {showSavePresetPrompt && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in zoom-in-95 duration-150">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                  <BookmarkPlus className="w-4 h-4" />
                </div>
                <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm">
                  حفظ الخطة الحالية كقالب جديد 💾
                </h4>
              </div>
              <button onClick={() => setShowSavePresetPrompt(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCurrentAsCustomPreset} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                  اسم القالب الجديد:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: خطة نباتية خاصة / تنشيف سريع 1400 كالوري..."
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                  التصنيف:
                </label>
                <select
                  value={newPresetCategory}
                  onChange={(e) => setNewPresetCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold outline-none"
                >
                  <option value="custom">قالب مخصص عام</option>
                  <option value="medical">🩺 علاجي (مقاومة إنسولين / غدة / تكيسات)</option>
                  <option value="weight_loss">⚡ نزول وزن سريع</option>
                  <option value="fitness">💪 تنشيف وبناء عضلات</option>
                  <option value="keto">🥑 كيتو دايت</option>
                  <option value="maintenance">⚖️ تثبيت وتوازن</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                  ملاحظة أو ملخص سريع للقالب (اختياري):
                </label>
                <textarea
                  rows={2}
                  placeholder="وصف مختصر لمميزات هذا القالب وحالات استخدامه..."
                  value={newPresetSummary}
                  onChange={(e) => setNewPresetSummary(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 space-y-1">
                <span>سيتم حفظ:</span>
                <div className="font-bold text-slate-700 dark:text-slate-300">
                  {draft.meals.length} وجبات وبدائل • {draft.supplements?.length || 0} مكملات • {draft.checklist.length} عادات • {draft.targetCalories || 0} كالوري
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSavePresetPrompt(false)}
                  className="flex-1 py-2.5 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
                >
                  حفظ في مكتبتي 💾
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Standalone Presets Library Modal */}
      {showPresetsModal && (
        <PresetsLibraryModal
          currentDraft={draft}
          onApplyPreset={(newDraft) => setDraft(newDraft)}
          onClose={() => setShowPresetsModal(false)}
          onNotify={onNotify}
        />
      )}

      {/* Clinical Calculator Suite Modal */}
      {(showBMRCalc || activeSubTab === 'calculators') && (
        <ClinicalCalculatorSuiteModal
          initialWeight={draft.startWeight || 80}
          initialHeight={draft.heightCm || 175}
          initialAge={28}
          onApplyCalories={(calories, protein, carbs, fats, notesInfo) => {
            setDraft((prev) => ({
              ...prev,
              targetCalories: calories,
              targetProtein: protein,
              targetCarbs: carbs,
              targetFats: fats,
              ...(notesInfo ? { notes: prev.notes ? `${prev.notes}\n\n${notesInfo}` : notesInfo } : {}),
            }));
            onNotify(`تم تطبيق السعرات الإكلينيكية (${calories} ك.س) والماكروز المحسوبة مباشرة ⚡`);
            setShowBMRCalc(false);
            if (activeSubTab === 'calculators') setActiveSubTab('profile');
          }}
          onClose={() => {
            setShowBMRCalc(false);
            if (activeSubTab === 'calculators') setActiveSubTab('profile');
          }}
        />
      )}
    </div>
  );
};
