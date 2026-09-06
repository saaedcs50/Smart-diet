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
import { DayLog, PlanConfig, ActiveFastingSession } from '../types';
import { 
  getActiveFastingSession, 
  saveActiveFastingSession, 
  clearActiveFastingSession, 
  getTodayDateString 
} from '../utils/storage';
import { HelpButton } from './FeatureHelpModal';

interface FastingTimerProps {
  plan: PlanConfig;
  day: DayLog;
  currentDate?: string;
  onUpdateDay: (updated: DayLog) => void;
}

export const FastingTimer: React.FC<FastingTimerProps> = ({ plan, day, currentDate, onUpdateDay }) => {
  const [activeSession, setActiveSession] = useState<ActiveFastingSession>(() => getActiveFastingSession());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showConfirmStop, setShowConfirmStop] = useState(false);
  const [showAdjustStart, setShowAdjustStart] = useState(false);

  const targetHours = plan.fastingTargetHours || 16;
  
  // Active session in localStorage takes precedence to guarantee resilience across midnight
  const isFasting = (activeSession.isActive && activeSession.startTime !== null) || !!day.isFasting;
  const startTime = activeSession.isActive && activeSession.startTime ? activeSession.startTime : day.fastingStartTime;
  const completedHours = day.completedFastingHours;

  // Keep activeSession in sync with storage on mount and interval
  useEffect(() => {
    const session = getActiveFastingSession();
    setActiveSession(session);
  }, [currentDate, day.isFasting, day.fastingStartTime]);

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
    const newSession: ActiveFastingSession = {
      isActive: true,
      startTime: startTimestamp,
      targetHours,
      startDateStr: currentDate || getTodayDateString(),
    };
    saveActiveFastingSession(newSession);
    setActiveSession(newSession);

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
    clearActiveFastingSession();
    setActiveSession({ isActive: false, startTime: null });

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
    clearActiveFastingSession();
    setActiveSession({ isActive: false, startTime: null });

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

  const isCrossedMidnight = isFasting && activeSession.startDateStr && currentDate && activeSession.startDateStr !== currentDate;

  return (
    <div className="bg-white dark:bg-[#2D103E] border border-[#D8C4E9]/80 dark:border-[#542870]/80 rounded-3xl p-5 shadow-sm transition-colors space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${
            isFasting 
              ? 'bg-[#5B2482]/10 dark:bg-[#5B2482]/25 text-[#5B2482] dark:text-[#D8C4E9]' 
              : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#6F5A7D] dark:text-[#B792D4]'
          }`}>
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-sm">
                مؤقت الصيام المتقطع ({targetHours} ساعة)
              </h3>
              <HelpButton featureId="fastingTimer" size="sm" />
              {isGoalReached && isFasting && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0D9488]/10 text-[#0D9488] dark:bg-[#0D9488]/20 dark:text-[#2DD4BF] flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  اكتمل الهدف!
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4]">
              {isFasting
                ? `جاري الصيام • بدأ في ${formattedStartTime || ''}${isCrossedMidnight ? ' (أمس مستمر)' : ''}`
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
              className="px-3.5 py-2 rounded-2xl bg-[#E21B6D]/10 hover:bg-[#E21B6D]/20 text-[#E21B6D] dark:text-[#FF4099] border border-[#E21B6D]/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-[#E21B6D] text-[#E21B6D]" />
              <span>إنهاء الصيام</span>
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleStartFasting(0)}
                className="px-3.5 py-2 rounded-2xl bg-[#5B2482] hover:bg-[#4A1D6B] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#5B2482]/20 active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>بدء الصيام</span>
              </button>

              <button
                onClick={() => setShowAdjustStart(!showAdjustStart)}
                title="تحديد وقت بدء سابق"
                className="p-2 rounded-2xl bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#6F5A7D] hover:text-[#5B2482] transition-colors cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Adjust Custom Start Time Drawer */}
      {showAdjustStart && !isFasting && (
        <div className="p-3 rounded-2xl bg-[#5B2482]/10 dark:bg-[#5B2482]/20 border border-[#5B2482]/30 space-y-2 animate-in fade-in">
          <p className="text-xs font-bold text-[#5B2482] dark:text-[#D8C4E9]">
            هل بدأت الصيام منذ فترة وتريد احتسابها؟
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 4, 8].map((h) => (
              <button
                key={h}
                onClick={() => handleStartFasting(h)}
                className="py-1.5 px-2 rounded-xl bg-white dark:bg-[#2D103E] text-[#5B2482] dark:text-[#D8C4E9] border border-[#5B2482]/30 text-[11px] font-bold hover:bg-[#5B2482]/10 transition-colors cursor-pointer"
              >
                منذ {h} ساعات
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Stop Fasting Prompt (In-App Modal / Dialog) */}
      {showConfirmStop && isFasting && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#E21B6D]/10 to-[#E0922D]/10 dark:from-[#E21B6D]/20 dark:to-[#E0922D]/20 border border-[#E21B6D]/30 space-y-2.5 animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#E21B6D] dark:text-[#FF4099] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#E21B6D]" />
              هل تريد إنهاء فترة الصيام وبدء نافذة الأكل؟
            </h4>
            <span className="text-xs font-bold text-[#E21B6D] dark:text-[#FF4099]">
              {hours} ساعة و {minutes} دقيقة
            </span>
          </div>

          <p className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4] leading-relaxed">
            سيتم تسجيل إنجاز صيامك اليوم وتحديث العداد، لتبدأ بتناول وجباتك المقررة.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleConfirmStop}
              className="flex-1 py-2 px-3 rounded-xl bg-[#E21B6D] hover:bg-[#C2135B] text-white font-bold text-xs transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              نعم، إنهاء الصيام الآن ✅
            </button>
            <button
              onClick={() => setShowConfirmStop(false)}
              className="py-2 px-3 rounded-xl bg-white dark:bg-[#2D103E] border border-[#D8C4E9]/70 dark:border-[#542870]/70 text-[#3A124D] dark:text-[#EDE5F5] font-bold text-xs hover:bg-[#F8F7F9] transition-colors cursor-pointer"
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
            <div className="text-2xl font-black text-[#5B2482] dark:text-[#D8C4E9] font-mono tracking-wider flex items-baseline gap-1">
              <span>{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              <span className="text-xs font-normal text-[#6F5A7D] dark:text-[#B792D4] font-sans">صيام</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#3A124D] dark:text-[#EDE5F5] block">
                الهدف: {targetHours} ساعة
              </span>
              <span className="text-[11px] font-bold text-[#5B2482] dark:text-[#D8C4E9]">
                {progressPercent}% {isGoalReached && '• تم الإنجاز 🎯'}
              </span>
            </div>
          </div>

          {/* Gradient Progress Bar */}
          <div className="w-full bg-[#F1E9F8] dark:bg-[#3D1B53] h-3 rounded-full overflow-hidden p-0.5 border border-[#D8C4E9]/50 dark:border-[#542870]/50">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isGoalReached
                  ? 'bg-gradient-to-r from-[#0D9488] to-[#10B981]'
                  : 'bg-gradient-to-r from-[#5B2482] via-[#7E3AA8] to-[#E21B6D]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Clinical tips */}
          <div className="p-2.5 rounded-2xl bg-[#5B2482]/10 dark:bg-[#5B2482]/20 border border-[#5B2482]/20 flex items-center justify-between text-[11px] text-[#5B2482] dark:text-[#D8C4E9]">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#5B2482] dark:text-[#D8C4E9] shrink-0" />
              <span>مسموح أثناء الصيام: الماء، القهوة السادة، الشاي الأخضر، والينسون بدون سكر.</span>
            </div>
          </div>
        </div>
      )}

      {/* Completed Fasting Today Summary Banner (When not currently fasting) */}
      {!isFasting && completedHours && !showAdjustStart && (
        <div className="p-3 rounded-2xl bg-[#0D9488]/10 dark:bg-[#0D9488]/20 border border-[#0D9488]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
            <span className="text-xs font-bold text-[#0D9488] dark:text-[#2DD4BF]">
              تم إنجاز {completedHours} ساعة صيام اليوم بنجاح
            </span>
          </div>
          <button
            onClick={handleResetFast}
            className="text-[11px] font-bold text-[#6F5A7D] hover:text-[#E21B6D] transition-colors cursor-pointer"
          >
            تصفير
          </button>
        </div>
      )}
    </div>
  );
};


