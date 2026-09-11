import React, { useState, useMemo } from 'react';
import { 
  Lightbulb, 
  Share2, 
  Utensils, 
  Droplets, 
  Activity, 
  CheckSquare, 
  Bell,
  Sliders,
  Sparkles,
  Flame
} from 'lucide-react';
import { PlanConfig, DayLog } from '../types';
import { BRAND } from '../config/brand';
import { ScoreBreakdown } from '../utils/calculations';
import { isSectionVisible } from '../utils/storage';
import { ActivityRings } from './ActivityRings';
import { WeekStripCalendar } from './WeekStripCalendar';
import { NextMealSpotlight } from './NextMealSpotlight';
import { MealCard } from './MealCard';
import { WaterTracker } from './WaterTracker';
import { SleepMoodTracker } from './SleepMoodTracker';
import { ChecklistTracker } from './ChecklistTracker';
import { SymptomsAndNotes } from './SymptomsAndNotes';
import { MacrosTracker } from './MacrosTracker';
import { FastingTimer } from './FastingTimer';
import { MedicationsTracker } from './MedicationsTracker';
import { CycleTrackerCard } from './CycleTrackerCard';
import { getCycleInfo } from '../utils/cycleTracking';
import { getTodayFastingStatus } from '../utils/fasting';
import { HelpButton } from './FeatureHelpModal';
import { CardCustomizerModal } from './CardCustomizerModal';

interface TodayTabProps {
  plan: PlanConfig;
  day: DayLog;
  currentDate: string;
  score: ScoreBreakdown;
  streak: number;
  onUpdateDay: (updated: DayLog) => void;
  onUpdatePlan?: (updater: (prev: PlanConfig) => PlanConfig) => void;
  onNotify?: (msg: string) => void;
  onOpenReportModal: () => void;
  onOpenStoryCard: () => void;
  onOpenImportModal: () => void;
  onOpenNotifications?: () => void;
  onToggleFreeze: () => void;
  onDateChange?: (newDate: string) => void;
}

export const TodayTab: React.FC<TodayTabProps> = ({
  plan,
  day,
  currentDate,
  score,
  streak,
  onUpdateDay,
  onUpdatePlan,
  onNotify,
  onOpenReportModal,
  onOpenStoryCard,
  onOpenImportModal,
  onOpenNotifications,
  onToggleFreeze,
  onDateChange,
}) => {
  const [isCardCustomizerOpen, setIsCardCustomizerOpen] = useState(false);
  const cycleInfo = plan.cycleTracking?.enabled ? getCycleInfo(plan.cycleTracking, currentDate) : null;
  const fastingStatus = useMemo(() => getTodayFastingStatus(plan, day, currentDate), [plan, day, currentDate]);

  // Direct practical greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { text: 'صباح الخير' };
    if (hour >= 12 && hour < 17) return { text: 'مساء الخير' };
    if (hour >= 17 && hour < 22) return { text: 'مساء الخير' };
    return { text: 'ليلة سعيدة' };
  }, []);

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
      {/* 1. Clear, direct greeting banner */}
      <div className="flex items-center justify-between px-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
              {greeting.text}، {plan.clientName || 'المتدرب'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            متابعة الالتزام بالخطة الغذائية اليومية
          </p>
        </div>

        {/* Section Focus & Customizer Button */}
        <button
          type="button"
          onClick={() => setIsCardCustomizerOpen(true)}
          title="تخصيص البطاقات ونمط التركيز لتقليل التشتت"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 hover:scale-105 transition-all cursor-pointer shadow-xs"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">تخصيص العرض</span>
        </button>
      </div>

      {/* 2. Apple Fitness / iOS Style Horizontal Week Strip Calendar */}
      {onDateChange && (
        <WeekStripCalendar
          currentDate={currentDate}
          onDateChange={onDateChange}
        />
      )}

      {/* Optional Subtle Cycle Phase Badge */}
      {plan.cycleTracking?.enabled &&
        plan.cycleTracking?.showPhaseToClient !== false &&
        cycleInfo &&
        cycleInfo.dayOfCycle !== null && (
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 text-xs">
            <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-200">
              <span className="text-sm">{cycleInfo.icon}</span>
              <span>
                اليوم {cycleInfo.dayOfCycle} من الدورة • {cycleInfo.phaseName}
              </span>
            </div>
            <span className={`text-[12px] font-bold px-2.5 py-0.5 rounded-full border ${cycleInfo.colorClass.badge}`}>
              {cycleInfo.isPeriodDay ? 'أيام الحيض ' : cycleInfo.phaseBadge}
            </span>
          </div>
        )}

      {/* 3. Apple Health / iOS Fitness Concentric Activity Rings Card */}
      {isSectionVisible(plan, 'scoreCard') && (
        <ActivityRings
          score={score}
          streak={streak}
          isFreeze={day.isFreeze}
          plan={plan}
          day={day}
          onToggleFreeze={onToggleFreeze}
          onOpenReportModal={onOpenReportModal}
          onOpenStoryCard={onOpenStoryCard}
        />
      )}

      {/* 4. Lifesum Next Meal Spotlight */}
      {isSectionVisible(plan, 'mealsList') && (
        <NextMealSpotlight
          plan={plan}
          day={day}
          onUpdateDay={onUpdateDay}
        />
      )}

      {/* 5. Doctor Tips & Guidance Banner */}
      {isSectionVisible(plan, 'tipsBanner') && plan.tips && plan.tips.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-1.5 transition-all">
          <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
            <Lightbulb className="w-4 h-4" />
            <span>توجيه وإرشاد اليوم من {BRAND.doctorName}:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
            "{plan.tips[Math.abs(currentDate.split('-').reduce((a, b) => a + Number(b), 0)) % plan.tips.length]}"
          </p>
        </div>
      )}

      {/* 6. Vitals: Macros & Fasting (if enabled) */}
      {(isSectionVisible(plan, 'macrosTracker') || isSectionVisible(plan, 'fastingTimer')) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isSectionVisible(plan, 'macrosTracker') && (
            <MacrosTracker
              plan={plan}
              day={day}
              onUpdateDay={onUpdateDay}
            />
          )}

          {isSectionVisible(plan, 'fastingTimer') && (
            <FastingTimer
              plan={plan}
              day={day}
              currentDate={currentDate}
              onUpdateDay={onUpdateDay}
            />
          )}
        </div>
      )}

      {/* 6.5 Medications Tracker (if configured & visible) */}
      {isSectionVisible(plan, 'medicationsTracker') && (
        <MedicationsTracker
          plan={plan}
          day={day}
          onUpdateDay={onUpdateDay}
        />
      )}

      {/* 6.6 Menstrual Cycle Tracker (if configured & visible) */}
      {plan.cycleTracking?.enabled && isSectionVisible(plan, 'cycleTracker') && (
        <CycleTrackerCard
          plan={plan}
          day={day}
          currentDate={currentDate}
          onUpdateDay={(updater) => onUpdateDay(typeof updater === 'function' ? updater(day) : updater)}
          onUpdatePlan={onUpdatePlan || (() => {})}
          onNotify={onNotify}
        />
      )}

      {/* 7. All Planned Meals Food Diary */}
      {isSectionVisible(plan, 'mealsList') && plan.meals && plan.meals.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Utensils className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                يوميات وجبات اليوم ({plan.meals.length})
              </h3>
              <HelpButton featureId="mealsList" size="sm" />
            </div>
            {onOpenNotifications && (
              <button
                type="button"
                onClick={onOpenNotifications}
                className="text-xs font-bold text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors flex items-center gap-1 cursor-pointer"
                title="مواعيد الوجبات"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>مواعيد الوجبات</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {plan.meals.map((meal, idx) => (
              <MealCard
                key={meal.id}
                meal={meal}
                index={idx}
                fastingStatus={fastingStatus}
                state={day.meals[meal.id]}
                onUpdate={(st) =>
                  onUpdateDay({
                    ...day,
                    meals: {
                      ...day.meals,
                      [meal.id]: st,
                    },
                  })
                }
              />
            ))}
          </div>
        </section>
      )}

      {/* 8. Noom/Lifesum Interactive Water Tracker */}
      {isSectionVisible(plan, 'waterTracker') && (
        <section>
          <WaterTracker
            plan={plan}
            day={day}
            onUpdateDay={onUpdateDay}
          />
        </section>
      )}

      {/* 9. Sleep, Mood & Movement */}
      <section>
        <SleepMoodTracker
          plan={plan}
          day={day}
          onUpdateDay={onUpdateDay}
        />
      </section>

      {/* 10. Habits & Supplements */}
      <section>
        <ChecklistTracker
          plan={plan}
          day={day}
          onUpdateDay={onUpdateDay}
        />
      </section>

      {/* 11. Symptoms & Doctor Notes */}
      <section>
        <SymptomsAndNotes
          plan={plan}
          day={day}
          onUpdateDay={onUpdateDay}
        />
      </section>

      {/* 12. Bottom WhatsApp Quick Share Report Button */}
      {isSectionVisible(plan, 'quickReportBtn') && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onOpenReportModal}
            className="w-full py-3.5 min-h-[48px] px-6 rounded-3xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-black text-sm sm:text-base transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.01]"
          >
            <Share2 className="w-5 h-5" />
            <span>إرسال تقرير اليوم لـ{BRAND.doctorNameAlt}</span>
          </button>
        </div>
      )}

      {/* Card Customizer Modal */}
      {isCardCustomizerOpen && (
        <CardCustomizerModal
          isOpen={isCardCustomizerOpen}
          onClose={() => setIsCardCustomizerOpen(false)}
          plan={plan}
          onUpdatePlan={(updated) => {
            if (onUpdatePlan) {
              onUpdatePlan(() => updated);
            }
          }}
          onNotify={onNotify || (() => {})}
        />
      )}
    </div>
  );
};
