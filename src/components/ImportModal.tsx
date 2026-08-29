import React, { useState, useMemo } from 'react';
import { 
  FileDown, 
  Upload, 
  X, 
  CheckCircle2, 
  ClipboardPaste, 
  Sparkles, 
  Utensils, 
  Flame, 
  Droplets, 
  Pill, 
  CheckSquare, 
  HelpCircle 
} from 'lucide-react';
import { PlanConfig } from '../types';
import { extractPlanFromText } from '../utils/planShare';

interface ImportModalProps {
  onImportPlan: (imported: Partial<PlanConfig>) => void;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  onImportPlan,
  onClose,
  onNotify,
}) => {
  const [pasteText, setPasteText] = useState('');

  // Extract and detect plan content in real-time
  const detectedPlan = useMemo(() => {
    if (!pasteText.trim()) return null;
    return extractPlanFromText(pasteText);
  }, [pasteText]);

  const handleApplyPaste = () => {
    const raw = pasteText.trim();
    if (!raw) {
      alert('يرجى لصق رسالة أو نص الخطة أولاً');
      return;
    }

    const planData = extractPlanFromText(raw);
    if (!planData || (!planData.meals && !planData.clientName && !planData.dailyWaterGoalMl)) {
      alert('تعذر قراءة الخطة من النص المدخل. يرجى التأكد من نسخ رسالة الواتساب بالكامل أو كود الخطة.');
      return;
    }

    onImportPlan(planData);
    onNotify(`تم استيراد خطة (${planData.clientName || 'المتدرب'}) وتطبيق كافة توجيهات د. شيماء بنجاح ✅`);
    onClose();
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setPasteText(text);
        onNotify('تم لصق النص من الحافظة 📋');
      }
    } catch (e) {
      onNotify('يرجى لصق النص يدوياً داخل الخانة');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const planData = extractPlanFromText(text);
        if (!planData) {
          alert('الملف لا يحتوي على خطة صالحة');
          return;
        }
        onImportPlan(planData);
        onNotify('تم استيراد الخطة من الملف بنجاح ✅');
        onClose();
      } catch (err) {
        alert('تعذر قراءة الملف');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-xs">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1.5">
                <span>استيراد وتحديث خطة د. شيماء</span>
                <span className="text-xs">🩺</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                الصق رسالة الواتساب لتطبيق جدول الوجبات والسعرات والإرشادات فوراً
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
          {/* Instructions Box */}
          <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-2 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">طريقة الاستيراد:</span> انسخ الرسالة الكاملة التي أرسلتها لكِ دكتورة شيماء على الواتساب والصقها في المربع أدناه، وسيتعرف التطبيق تلقائياً على كافة الوجبات والبدائل والسعرات والمكملات.
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                رسالة الواتساب أو كود الخطة:
              </label>
              <button
                type="button"
                onClick={handlePasteFromClipboard}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg"
              >
                <ClipboardPaste className="w-3 h-3" />
                لصق من الحافظة
              </button>
            </div>

            <textarea
              rows={5}
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="الصق رسالة الواتساب الكاملة المرسلة من د. شيماء هنا..."
              className="w-full text-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Detected Plan Preview */}
          {detectedPlan && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  تم التعرف على بيانات الخطة بنجاح:
                </span>
                {detectedPlan.clientName && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {detectedPlan.clientName}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                {detectedPlan.meals && (
                  <div className="flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                    <span>الوجبات: <b>{detectedPlan.meals.length} وجبات</b></span>
                  </div>
                )}
                {detectedPlan.targetCalories && (
                  <div className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span>السعرات: <b>{detectedPlan.targetCalories} kcal</b></span>
                  </div>
                )}
                {detectedPlan.dailyWaterGoalMl && (
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-cyan-500" />
                    <span>الماء: <b>{detectedPlan.dailyWaterGoalMl} مل</b></span>
                  </div>
                )}
                {detectedPlan.supplements && detectedPlan.supplements.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-purple-500" />
                    <span>المكملات: <b>{detectedPlan.supplements.length}</b></span>
                  </div>
                )}
                {detectedPlan.checklist && detectedPlan.checklist.length > 0 && (
                  <div className="flex items-center gap-1">
                    <CheckSquare className="w-3.5 h-3.5 text-teal-500" />
                    <span>المهام: <b>{detectedPlan.checklist.length}</b></span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleApplyPaste}
            disabled={!pasteText.trim()}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            تطبيق خطة د. شيماء في التطبيق ✨
          </button>

          {/* File Upload Option */}
          <div className="relative my-2 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <span className="relative bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 font-medium">
              أو استيراد من ملف خارجي
            </span>
          </div>

          <label className="w-full py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4 text-slate-500" />
            اختيار ملف نسخة احتياطية (JSON)
            <input
              type="file"
              accept=".json,text/plain"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

