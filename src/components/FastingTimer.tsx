import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  Play, 
  Square, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Award,
  ChevronDown,
  Info
} from 'lucide-react';
import { DayLog, PlanConfig } from '../types';

interface FastingTimerProps {
  plan: PlanConfig;
  day: DayLog;
  onUpdateDay: (updated: DayLog) => void;
}

export const FastingTimer: React.FC<FastingTimerProps> = ({ plan, day, onUpdateDay }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showConfirmStop, setShowConfirmStop] = useState(false);
  const [showAdjustStart, setShowAdjustStart] = useState(false);

  const targetHours = plan.fastingTargetHours || 16;
  const isFasting = !!day.isFasting;
  const startTime = day.fastingStartTime || null;
  const completedHours = day.completedFastingHours;

  useEffect(() => {
    let interval: any = null;
    if (isFasting && startTime) {
      const updateElapsed = () => {
        const diff = Math.floor((Date.now() - startTime) / 1000);
        setElapsedSeconds(Math.max(0, diff));
      };
      updateElapsed();
      interval = setInterval(updateElapsed, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isFasting, startTime]);

  const handleStartFasting = (customHoursAgo: number = 0) => {
    const startTimestamp = Date.now() - (customHoursAgo * 3600 * 1000);
    onUpdateDay({
      ...day,
      isFasting: true,
      fastingStartTime: startTimestamp,
      fastingEndTime: null,
    });
    setShowAdjustStart(false);
  };

  const handleConfirmStop = () => {
    const hoursFasted = Number((elapsedSeconds / 3600).toFixed(1));
    onUpdateDay({
      ...day,
      isFasting: false,
      fastingStartTime: null,
      fastingEndTime: Date.now(),
      completedFastingHours: hoursFasted,
    });
    setShowConfirmStop(false);
  };

  const handleResetFast = () => {
    onUpdateDay({
      ...day,
      isFasting: false,
      fastingStartTime: null,
      fastingEndTime: null,
      completedFastingHours: null,
    });
    setShowConfirmStop(false);
  };

  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  const targetSeconds = targetHours * 3600;
  const progressPercent = Math.min(100, Math.round((elapsedSeconds / targetSeconds) * 100));
  const isGoalReached = elapsedSeconds >= targetSeconds;

  const formattedStartTime = startTime
    ? new Date(startTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${
            isFasting 
              ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}>
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                مؤقت الصيام المتقطع ({targetHours} ساعة)
              </h3>
              {isGoalReached && isFasting && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  اكتمل الهدف!
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-400">
              {isFasting
                ? `جاري الصيام • بدأ في ${formattedStartTime || ''}`
                : completedHours
                ? `أتممت ${completedHours} ساعة صيام اليوم 🎉`
                : 'نافذة الأكل مفتوحة • اضغط لبدء الصيام'}
            </span>
          </div>
        </div>

        {/* Start / Stop Trigger */}
        <div>
          {isFasting ? (
            <button
              onClick={() => setShowConfirmStop(true)}
              className="px-3.5 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-rose-600" />
              <span>إنهاء الصيام</span>
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleStartFasting(0)}
                className="px-3.5 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/20 active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>بدء الصيام</span>
              </button>

              <button
                onClick={() => setShowAdjustStart(!showAdjustStart)}
                title="تحديد وقت بدء سابق"
                className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-purple-600 transition-colors"
              >
                <Clock className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Adjust Custom Start Time Drawer */}
      {showAdjustStart && !isFasting && (
        <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80 space-y-2 animate-in fade-in">
          <p className="text-xs font-bold text-purple-900 dark:text-purple-200">
            هل بدأت الصيام منذ فترة وتريد احتسابها؟
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 4, 8].map((h) => (
              <button
                key={h}
                onClick={() => handleStartFasting(h)}
                className="py-1.5 px-2 rounded-xl bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 text-[11px] font-bold hover:bg-purple-100 transition-colors"
              >
                منذ {h} ساعات
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Stop Fasting Prompt (In-App Modal / Dialog) */}
      {showConfirmStop && isFasting && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/50 dark:to-orange-950/50 border border-rose-200 dark:border-rose-900 space-y-2.5 animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              هل تريد إنهاء فترة الصيام وبدء نافذة الأكل؟
            </h4>
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
              {hours} ساعة و {minutes} دقيقة
            </span>
          </div>

          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            سيتم تسجيل إنجاز صيامك اليوم وتحديث العداد، لتبدأ بتناول وجباتك المقررة.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleConfirmStop}
              className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-all shadow-xs active:scale-98"
            >
              نعم، إنهاء الصيام الآن ✅
            </button>
            <button
              onClick={() => setShowConfirmStop(false)}
              className="py-2 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              متابعة الصيام
            </button>
          </div>
        </div>
      )}

      {/* Active Fasting Live Progress */}
      {isFasting && !showConfirmStop && (
        <div className="space-y-2 pt-1 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black text-purple-700 dark:text-purple-300 font-mono tracking-wider flex items-baseline gap-1">
              <span>{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              <span className="text-xs font-normal text-slate-400 font-sans">صيام</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
                الهدف: {targetHours} ساعة
              </span>
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                {progressPercent}% {isGoalReached && '• تم الإنجاز 🎯'}
              </span>
            </div>
          </div>

          {/* Gradient Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isGoalReached
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Clinical tips */}
          <div className="p-2.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 flex items-center justify-between text-[11px] text-purple-900 dark:text-purple-200">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>مسموح أثناء الصيام: الماء، القهوة السادة، الشاي الأخضر، والينسون بدون سكر.</span>
            </div>
          </div>
        </div>
      )}

      {/* Completed Fasting Today Summary Banner (When not currently fasting) */}
      {!isFasting && completedHours && !showAdjustStart && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
              تم إنجاز {completedHours} ساعة صيام اليوم بنجاح
            </span>
          </div>
          <button
            onClick={handleResetFast}
            className="text-[11px] font-bold text-slate-400 hover:text-rose-500 transition-colors"
          >
            تصفير
          </button>
        </div>
      )}
    </div>
  );
};

