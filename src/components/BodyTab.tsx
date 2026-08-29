import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Ruler, 
  Camera, 
  Columns, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  TrendingDown, 
  TrendingUp, 
  Sparkles,
  Info,
  Trophy,
  Stethoscope,
  Tag,
  AlertTriangle,
  HeartPulse,
  CheckCircle2,
  Pill
} from 'lucide-react';
import { PlanConfig, DayLog, PhotoRecord } from '../types';
import { calculateBMI, calculateWHtR, findLatestWeight } from '../utils/calculations';
import { savePhotoToDB, getPhotosForDate, deletePhotoFromDB, processAndCompressImage } from '../utils/indexedDB';
import { getCycleInfo, getWeightVsRecentAverage, WEIGHT_FLUCTUATION_NOTE } from '../utils/cycleTracking';
import { isSectionVisible } from '../utils/storage';
import { LabTrackerSection } from './LabTrackerSection';

interface BodyTabProps {
  plan: PlanConfig;
  day: DayLog;
  currentDate: string;
  onUpdateDay: (updated: DayLog) => void;
  onUpdatePlan?: (updater: (prev: PlanConfig) => PlanConfig) => void;
  onOpenComparePhotos: () => void;
  onNotify: (msg: string) => void;
}

export const BodyTab: React.FC<BodyTabProps> = ({
  plan,
  day,
  currentDate,
  onUpdateDay,
  onUpdatePlan,
  onOpenComparePhotos,
  onNotify,
}) => {
  const [dayPhotos, setDayPhotos] = useState<PhotoRecord[]>([]);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Load photos for this date
  useEffect(() => {
    loadPhotos();
  }, [currentDate]);

  const loadPhotos = async () => {
    try {
      const list = await getPhotosForDate(currentDate);
      setDayPhotos(list);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const compressedDataUrl = await processAndCompressImage(file);
      await savePhotoToDB({
        date: currentDate,
        data: compressedDataUrl,
        ts: Date.now(),
      });
      await loadPhotos();
      onNotify('تم حفظ الصورة بأمان داخل جهازك فقط 🔒');
    } catch (err) {
      alert('حدث خطأ أثناء معالجة الصورة');
    } finally {
      setIsUploadingPhoto(false);
      e.target.value = '';
    }
  };

  const handleDeletePhoto = async (id?: number) => {
    if (!id) return;
    if (window.confirm('هل تريد حذف هذه الصورة؟')) {
      await deletePhotoFromDB(id);
      await loadPhotos();
      onNotify('تم حذف الصورة');
    }
  };

  const currentWeight = day.weight || null;
  const startWeight = plan.startWeight || null;
  const targetWeight = plan.targetWeight || null;
  const heightCm = plan.heightCm || null;

  const bmi = calculateBMI(currentWeight, heightCm);
  const whtr = calculateWHtR(day.meas?.waist || null, heightCm);

  // Total weight lost from starting weight
  let totalLostKg: number | null = null;
  if (startWeight && currentWeight) {
    totalLostKg = parseFloat((startWeight - currentWeight).toFixed(1));
  }

  // Weight remaining to target
  let remainingKg: number | null = null;
  if (targetWeight && currentWeight) {
    remainingKg = parseFloat((currentWeight - targetWeight).toFixed(1));
  }

  // Target Progress Percentage
  let targetProgressPercent = 0;
  if (startWeight && targetWeight && currentWeight && startWeight > targetWeight) {
    const totalToLose = startWeight - targetWeight;
    const lostSoFar = startWeight - currentWeight;
    targetProgressPercent = Math.min(100, Math.max(0, Math.round((lostSoFar / totalToLose) * 100)));
  }

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-150">
      {/* 1. Weight & Target Progress Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                الوزن الصباحي والهدف ⚖️
              </h3>
              <span className="text-[11px] text-slate-400">
                (يُفضل الوزن على الريق بعد الحمام وقبل الأكل)
              </span>
            </div>
          </div>

          {totalLostKg !== null && totalLostKg > 0 && (
            <span className="px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              خسيت {totalLostKg} كجم عاش!
            </span>
          )}
        </div>

        {/* Input and Key Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Weight Input */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              وزن النهاردة (كجم):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                value={day.weight ?? ''}
                placeholder="مثال: 82.5"
                onChange={(e) =>
                  onUpdateDay({
                    ...day,
                    weight: e.target.value ? parseFloat(e.target.value) : null,
                  })
                }
                className="w-full text-base font-extrabold p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-xs font-bold text-slate-400">كجم</span>
            </div>
          </div>

          {/* Start Weight */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-center">
            <span className="text-[11px] font-bold text-slate-500 block">وزن بداية الرحلة:</span>
            <span className="text-base font-extrabold text-slate-800 dark:text-slate-100 mt-1">
              {startWeight ? `${startWeight} كجم` : '—'}
            </span>
          </div>

          {/* Target Weight */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-center">
            <span className="text-[11px] font-bold text-slate-500 block">الهدف المطلوب:</span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {targetWeight ? `${targetWeight} كجم` : '—'}
            </span>
          </div>
        </div>

        {/* Progress toward target bar */}
        {targetWeight && currentWeight && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">
                {remainingKg !== null && remainingKg > 0
                  ? `باقي لك ${remainingKg} كجم وتوصل لهدفك 💪`
                  : remainingKg !== null && remainingKg <= 0
                  ? '🎉 وصلت للوزن المستهدف! مبروك يا بطل'
                  : 'نحو الوزن المستهدف'}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {targetProgressPercent}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${targetProgressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Clinical Indicators (BMI & WHtR) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* BMI Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">كتلة الجسم (BMI)</span>
            <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
              {bmi.val}
            </span>
          </div>
          <p className={`text-xs font-bold ${bmi.color}`}>{bmi.label}</p>
        </div>

        {/* WHtR Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">نسبة الوسط للطول (WHtR)</span>
            <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
              {whtr.val}
            </span>
          </div>
          <p className={`text-xs font-bold ${whtr.color}`}>{whtr.label}</p>
        </div>
      </div>

      {/* 2.3 Menstrual Cycle & Weight Fluctuation Context */}
      {plan.cycleTracking?.enabled && (() => {
        const cycleInfo = getCycleInfo(plan.cycleTracking, currentDate);
        const weightAvgInfo = getWeightVsRecentAverage(currentDate, currentWeight);

        return (
          <div className="bg-gradient-to-r from-rose-50/80 via-pink-50/40 to-white dark:from-rose-950/30 dark:via-pink-950/10 dark:to-slate-900 border border-rose-200/80 dark:border-rose-900/50 rounded-3xl p-5 shadow-xs transition-colors space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-xs shadow-rose-500/20">
                  🌸
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                    الدورة الشهرية وتغيرات الوزن ⚖️
                  </h3>
                  {cycleInfo.dayOfCycle !== null && (
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      اليوم {cycleInfo.dayOfCycle} من الدورة • {cycleInfo.phaseName}
                    </span>
                  )}
                </div>
              </div>

              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cycleInfo.colorClass.badge}`}>
                {cycleInfo.phaseBadge}
              </span>
            </div>

            {/* Weight vs 7-day average comparison */}
            {weightAvgInfo.average7Days !== null && weightAvgInfo.diffFromAverage !== null && (
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-rose-100 dark:border-rose-900/40 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  متوسط وزنك آخر {weightAvgInfo.count} أيام: <strong className="text-slate-900 dark:text-slate-100">{weightAvgInfo.average7Days} كجم</strong>
                </span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-lg text-xs ${
                    weightAvgInfo.diffFromAverage > 0
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                      : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  }`}
                >
                  {weightAvgInfo.diffFromAverage > 0 ? `+${weightAvgInfo.diffFromAverage}` : weightAvgInfo.diffFromAverage} كجم عن متوسط الأسبوع
                </span>
              </div>
            )}

            {/* Clinical Fixed Note */}
            <div className="p-3 rounded-2xl bg-rose-100/50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                <strong>تنويه سريري مهم: </strong>
                {WEIGHT_FLUCTUATION_NOTE}
              </span>
            </div>
          </div>
        );
      })()}

      {/* 2.5 Medical Conditions & Diagnoses Card (Client View) */}
      {plan.medicalConditions?.showToClient !== false &&
        ((plan.medicalConditions?.conditions && plan.medicalConditions.conditions.length > 0) ||
          (plan.medicalConditions?.allergies && plan.medicalConditions.allergies.length > 0) ||
          plan.medicalConditions?.customConditionNotes) && (
          <div className="bg-gradient-to-br from-teal-500/5 via-emerald-500/5 to-blue-500/5 dark:bg-slate-900 border border-teal-200/80 dark:border-teal-900/60 rounded-3xl p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shadow-teal-600/20">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                    الملف الطبي والحالات المسجلة 🩺
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    مُسجل ومُعتمد من قِبل الطبيبة / الأخصائي المعالج
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-black text-[11px] border border-teal-200 dark:border-teal-800">
                خطة علاجية مخصصة
              </span>
            </div>

            {/* Conditions Chips */}
            {plan.medicalConditions.conditions && plan.medicalConditions.conditions.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  التشخيصات المسجلة:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {plan.medicalConditions.conditions.map((cond) => (
                    <div
                      key={cond.id}
                      className="p-2.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-teal-100 dark:border-teal-900/40 space-y-1 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-slate-800 dark:text-slate-100 text-xs flex items-center gap-1.5">
                          <HeartPulse className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                          {cond.label}
                        </span>
                        {cond.severity && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                            {cond.severity === 'mild'
                              ? 'خفيفة'
                              : cond.severity === 'moderate'
                              ? 'متوسطة'
                              : 'متقدمة'}
                          </span>
                        )}
                      </div>
                      {cond.notes && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                          {cond.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allergies Chips */}
            {plan.medicalConditions.allergies && plan.medicalConditions.allergies.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-amber-500" />
                  محظورات وحساسية الطعام (Allergies):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {plan.medicalConditions.allergies.map((allergy, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300/80 dark:border-amber-800"
                    >
                      🚫 {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Doctor/Coach Clinical Notes */}
            {plan.medicalConditions.customConditionNotes && (
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                  💡 إرشادات طبية خاصة:
                </span>
                {plan.medicalConditions.customConditionNotes}
              </div>
            )}

            {/* Registered Medications summary line */}
            {plan.medicationPlan?.showToClient !== false &&
              plan.medicationPlan?.items &&
              plan.medicationPlan.items.filter((m) => m.active !== false).length > 0 && (
                <div className="pt-2 border-t border-teal-100/60 dark:border-teal-900/40 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                  <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    <Pill className="w-3.5 h-3.5" />
                    <span>أدوية مسجلة في الخطة:</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px]">
                    {plan.medicationPlan.items.filter((m) => m.active !== false).length} أدوية
                  </span>
                </div>
              )}
          </div>
        )}

      {/* 3. Body Circumferences (محيطات الجسم بالمازورة) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center font-bold text-sm">
            <Ruler className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
              قياسات الجسم بالمتر (سم) 📏
            </h3>
            <span className="text-[11px] text-slate-400">
              (يُفضل قياسها مرة أسبوعياً لمتابعة نحت الدهون)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
          {/* Waist */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              الوسط (فوق السرة بـ 1سم):
            </label>
            <input
              type="number"
              step="0.5"
              value={day.meas?.waist ?? ''}
              placeholder="مثال: 84"
              onChange={(e) =>
                onUpdateDay({
                  ...day,
                  meas: {
                    ...day.meas,
                    waist: e.target.value ? parseFloat(e.target.value) : null,
                  },
                })
              }
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Chest */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              محيط الصدر:
            </label>
            <input
              type="number"
              step="0.5"
              value={day.meas?.chest ?? ''}
              placeholder="مثال: 102"
              onChange={(e) =>
                onUpdateDay({
                  ...day,
                  meas: {
                    ...day.meas,
                    chest: e.target.value ? parseFloat(e.target.value) : null,
                  },
                })
              }
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Hips */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              الأرداف (الهيبس):
            </label>
            <input
              type="number"
              step="0.5"
              value={day.meas?.hips ?? ''}
              placeholder="مثال: 98"
              onChange={(e) =>
                onUpdateDay({
                  ...day,
                  meas: {
                    ...day.meas,
                    hips: e.target.value ? parseFloat(e.target.value) : null,
                  },
                })
              }
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Arm */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              الذراع (البايسبس):
            </label>
            <input
              type="number"
              step="0.5"
              value={day.meas?.arm ?? ''}
              placeholder="مثال: 36"
              onChange={(e) =>
                onUpdateDay({
                  ...day,
                  meas: {
                    ...day.meas,
                    arm: e.target.value ? parseFloat(e.target.value) : null,
                  },
                })
              }
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Thigh */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              الفخذ:
            </label>
            <input
              type="number"
              step="0.5"
              value={day.meas?.thigh ?? ''}
              placeholder="مثال: 56"
              onChange={(e) =>
                onUpdateDay({
                  ...day,
                  meas: {
                    ...day.meas,
                    thigh: e.target.value ? parseFloat(e.target.value) : null,
                  },
                })
              }
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Neck */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              الرقبة:
            </label>
            <input
              type="number"
              step="0.5"
              value={day.meas?.neck ?? ''}
              placeholder="مثال: 39"
              onChange={(e) =>
                onUpdateDay({
                  ...day,
                  meas: {
                    ...day.meas,
                    neck: e.target.value ? parseFloat(e.target.value) : null,
                  },
                })
              }
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* 4. Lab Tests Tracker with Trend Visualizer */}
      {isSectionVisible(plan, 'labTracker') && (
        <LabTrackerSection
          plan={plan}
          onUpdatePlan={onUpdatePlan || (() => {})}
          onNotify={onNotify}
        />
      )}

      {/* 5. Private Progress Photos Gallery (Local-First 100%) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-50 dark:bg-pink-950/50 text-pink-600 flex items-center justify-center font-bold text-sm">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                معرض صور التطور الشخصي 📸
              </h3>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                محفوظة على جهازك فقط (Zero-Cloud)
              </span>
            </div>
          </div>

          <button
            onClick={onOpenComparePhotos}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Columns className="w-3.5 h-3.5" />
            مقارنة قبل / بعد
          </button>
        </div>

        {/* Upload Button */}
        <div>
          <label className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4 text-emerald-600" />
            {isUploadingPhoto ? 'جاري ضغط وحفظ الصورة...' : 'إضافة صورة تطور ليوم النهاردة 📸'}
            <input
              type="file"
              accept="image/*"
              disabled={isUploadingPhoto}
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Photos Grid for current date */}
        {dayPhotos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {dayPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative rounded-2xl overflow-hidden aspect-3/4 bg-slate-950 border border-slate-200 dark:border-slate-800 group"
              >
                <img
                  src={photo.data}
                  alt={`تطور ${photo.date}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2">
                  <span className="text-[10px] text-white font-bold">
                    📅 {photo.date}
                  </span>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="p-1 rounded-lg bg-rose-600/80 text-white hover:bg-rose-600 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xs text-slate-400 py-3">
            لا توجد صور مسجلة لتاريخ اليوم. اضغط بالأعلى لإضافة صورة.
          </p>
        )}
      </div>
    </div>
  );
};
