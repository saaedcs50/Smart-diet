import React from 'react';
import { 
  Lightbulb, 
  Share2, 
  FileDown, 
  Sparkles, 
  Utensils, 
  Droplets, 
  Activity, 
  CheckSquare, 
  MessageSquareHeart, 
  Bell 
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
          <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-gradient-to-r from-rose-50/90 via-pink-50/60 to-purple-50/40 dark:from-rose-950/40 dark:via-pink-950/20 dark:to-purple-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-200">
              <span className="text-sm">{cycleInfo.icon}</span>
              <span>
                اليوم {cycleInfo.dayOfCycle} من الدورة • {cycleInfo.phaseName}
              </span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cycleInfo.colorClass.badge}`}>
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
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-300/60 dark:border-amber-700/50 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-black text-amber-900 dark:text-amber-200">
            <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>توجيه اليوم من د. شيماء:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
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
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                <Utensils className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                الوجبات المقررة اليوم ({plan.meals.length})
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {onOpenNotifications && (
                <button
                  onClick={onOpenNotifications}
                  className="text-xs font-black text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
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
            className="w-full py-4 px-6 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
          >
            <Share2 className="w-5 h-5" />
            <span>إرسال تقرير اليوم لدكتورة شيماء</span>
          </button>
        </div>
      )}
    </div>
  );
};
