import React from 'react';
import { 
  Lightbulb, 
  Share2, 
  Utensils, 
  Droplets, 
  Activity, 
  CheckSquare, 
  Bell,
  Sparkles
} from 'lucide-react';
import { PlanConfig, DayLog } from '../types';
import { ScoreBreakdown } from '../utils/calculations';
import { isSectionVisible } from '../utils/storage';
import { ScoreCard } from './ScoreCard';
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
import { HelpButton } from './FeatureHelpModal';

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
}) => {
  const cycleInfo = plan.cycleTracking?.enabled ? getCycleInfo(plan.cycleTracking, currentDate) : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Optional Top Subtle Cycle Phase Badge */}
      {plan.cycleTracking?.enabled &&
        plan.cycleTracking?.showPhaseToClient !== false &&
        cycleInfo &&
        cycleInfo.dayOfCycle !== null && (
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-50/90 via-pink-50/60 to-purple-50/40 dark:from-rose-950/40 dark:via-pink-950/20 dark:to-purple-950/20 border border-rose-200/70 dark:border-rose-900/50 text-xs shadow-xs">
            <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-200">
              <span className="text-sm">{cycleInfo.icon}</span>
              <span>
                اليوم {cycleInfo.dayOfCycle} من الدورة • {cycleInfo.phaseName}
              </span>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${cycleInfo.colorClass.badge}`}>
              {cycleInfo.isPeriodDay ? 'أيام الحيض 🩸' : cycleInfo.phaseBadge}
            </span>
          </div>
        )}

      {/* 1. Score & Streak Card */}
      {isSectionVisible(plan, 'scoreCard') && (
        <ScoreCard
          score={score}
          streak={streak}
          isFreeze={day.isFreeze}
          currentDate={currentDate}
          plan={plan}
          onToggleFreeze={onToggleFreeze}
          onOpenReportModal={onOpenReportModal}
          onOpenStoryCard={onOpenStoryCard}
        />
      )}

      {/* 2. Doctor Tips Banner */}
      {isSectionVisible(plan, 'tipsBanner') && plan.tips && plan.tips.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#E0922D]/10 dark:bg-[#E0922D]/15 border border-[#E0922D]/30 dark:border-[#E0922D]/30 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E0922D] dark:text-[#F2C66D]">
            <Lightbulb className="w-4 h-4 text-[#E0922D] dark:text-[#F2C66D]" />
            <span>توجيه اليوم من د. شيماء:</span>
          </div>
          <p className="text-xs sm:text-sm text-[#3A124D] dark:text-[#EDE5F5] leading-relaxed font-medium">
            "{plan.tips[Math.abs(currentDate.split('-').reduce((a, b) => a + Number(b), 0)) % plan.tips.length]}"
          </p>
        </div>
      )}

      {/* 3. Vitals: Macros & Fasting (if enabled) */}
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

      {/* 3.5 Medications & Interaction Tracker (if configured & visible) */}
      {isSectionVisible(plan, 'medicationsTracker') && (
        <MedicationsTracker
          plan={plan}
          day={day}
          onUpdateDay={onUpdateDay}
        />
      )}

      {/* 3.6 Menstrual Cycle Tracker (if configured & visible) */}
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

      {/* 4. Planned Meals List */}
      {isSectionVisible(plan, 'mealsList') && plan.meals && plan.meals.length > 0 && (
        <section className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#5B2482]/10 dark:bg-[#5B2482]/30 text-[#5B2482] dark:text-[#D8C4E9] flex items-center justify-center font-bold">
                <Utensils className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-sm sm:text-base">
                الوجبات المقررة اليوم ({plan.meals.length})
              </h3>
              <HelpButton featureId="mealsList" size="sm" />
            </div>
            <div className="flex items-center gap-3">
              {onOpenNotifications && (
                <button
                  onClick={onOpenNotifications}
                  className="text-xs font-semibold text-[#6F5A7D] hover:text-[#E21B6D] dark:text-[#B792D4] dark:hover:text-[#FF4099] transition-colors flex items-center gap-1 cursor-pointer"
                  title="مواعيد الوجبات"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>مواعيد الوجبات</span>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {plan.meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
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

      {/* 5. Hydration & Wellness Section */}
      <section className="space-y-4">
        {/* Water Tracker */}
        {isSectionVisible(plan, 'waterTracker') && (
          <WaterTracker
            plan={plan}
            day={day}
            onUpdateDay={onUpdateDay}
          />
        )}

        {/* Sleep, Mood & Workout */}
        <SleepMoodTracker
          plan={plan}
          day={day}
          onUpdateDay={onUpdateDay}
        />
      </section>

      {/* 6. Habits & Supplements */}
      <section>
        <ChecklistTracker
          plan={plan}
          day={day}
          onUpdateDay={onUpdateDay}
        />
      </section>

      {/* 7. Symptoms & Direct Doctor Message */}
      <section>
        <SymptomsAndNotes
          plan={plan}
          day={day}
          onUpdateDay={onUpdateDay}
        />
      </section>

      {/* 8. Bottom Quick Share Report Button */}
      {isSectionVisible(plan, 'quickReportBtn') && (
        <div className="pt-2">
          <button
            onClick={onOpenReportModal}
            className="w-full py-4 px-6 rounded-3xl bg-[#E21B6D] hover:bg-[#C2135B] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#E21B6D]/25 transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] cursor-pointer"
          >
            <Share2 className="w-5 h-5" />
            <span>إرسال تقرير اليوم لدكتورة شيماء</span>
          </button>
        </div>
      )}
    </div>
  );
};

