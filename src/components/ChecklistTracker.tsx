import React from 'react';
import { CheckSquare, Pill, Check, Sparkles } from 'lucide-react';
import { PlanConfig, DayLog } from '../types';
import { isSectionVisible } from '../utils/storage';
import { HelpButton } from './FeatureHelpModal';

interface ChecklistTrackerProps {
  plan: PlanConfig;
  day: DayLog;
  onUpdateDay: (updated: DayLog) => void;
}

export const ChecklistTracker: React.FC<ChecklistTrackerProps> = ({ plan, day, onUpdateDay }) => {
  const showChecklist = isSectionVisible(plan, 'checklistTracker');
  const showSupplements = isSectionVisible(plan, 'supplementsTracker') && plan.supplements && plan.supplements.length > 0;

  if (!showChecklist && !showSupplements) {
    return null;
  }

  const toggleCheck = (id: string) => {
    onUpdateDay({
      ...day,
      checks: {
        ...day.checks,
        [id]: !day.checks[id],
      },
    });
  };

  const toggleSupp = (id: string) => {
    onUpdateDay({
      ...day,
      supps: {
        ...day.supps,
        [id]: !day.supps[id],
      },
    });
  };

  const completedChecksCount = plan.checklist.filter((c) => day.checks[c.id]).length;
  const isAllChecksDone = completedChecksCount === plan.checklist.length && plan.checklist.length > 0;

  return (
    <div className="bg-white dark:bg-[#2D103E] border border-[#D8C4E9]/80 dark:border-[#542870]/80 rounded-3xl p-5 shadow-sm transition-colors space-y-4">
      {/* 1. Daily Habits Checklist */}
      {showChecklist && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0D9488]/10 dark:bg-[#0D9488]/20 text-[#0D9488] dark:text-[#2DD4BF] flex items-center justify-center font-bold text-sm">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-sm">
                    قائمة العادات اليومية ✅
                  </h3>
                  <HelpButton featureId="habitsChecklist" size="sm" />
                </div>
                <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4]">
                  تم إنجاز {completedChecksCount} من {plan.checklist.length} مهام
                </span>
              </div>
            </div>

            {isAllChecksDone && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#0D9488]/10 dark:bg-[#0D9488]/20 text-[#0D9488] dark:text-[#2DD4BF] font-bold text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#0D9488]" />
                اكتملت جميع العادات
              </span>
            )}
          </div>

          <div className="space-y-2">
            {plan.checklist.map((item) => {
              const isDone = !!day.checks[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full text-right p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isDone
                      ? 'bg-[#0D9488]/10 dark:bg-[#0D9488]/15 border-[#0D9488]/30 dark:border-[#0D9488]/30'
                      : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 border-[#D8C4E9]/60 dark:border-[#542870]/60 hover:bg-[#F1E9F8]'
                  }`}
                >
                  <span
                    className={`text-xs font-semibold leading-relaxed ${
                      isDone
                        ? 'text-[#0D9488] dark:text-[#2DD4BF] line-through opacity-80'
                        : 'text-[#3A124D] dark:text-[#EDE5F5]'
                    }`}
                  >
                    {item.label}
                  </span>

                  <div
                    className={`w-6 h-6 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                      isDone
                        ? 'bg-[#0D9488] border-[#0D9488] text-white'
                        : 'border-[#D8C4E9] dark:border-[#542870] bg-white dark:bg-[#2D103E]'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Supplements & Vitamins */}
      {showSupplements && (
        <div className={`${showChecklist ? 'pt-3 border-t border-[#D8C4E9]/50 dark:border-[#542870]/50' : ''} space-y-3`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#5B2482]/10 dark:bg-[#5B2482]/20 text-[#5B2482] dark:text-[#D8C4E9] flex items-center justify-center font-bold text-sm">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-xs">
                الفيتامينات والمكملات المقررة 💊
              </h4>
              <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4]">
                مكملات تساعد على الحرق وصحة المناعة
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {plan.supplements.map((supp) => {
              const isTaken = !!day.supps[supp.id];
              return (
                <button
                  key={supp.id}
                  onClick={() => toggleSupp(supp.id)}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-right cursor-pointer ${
                    isTaken
                      ? 'bg-[#5B2482]/10 dark:bg-[#5B2482]/15 border-[#5B2482]/30 dark:border-[#542870]'
                      : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 border-[#D8C4E9]/60 dark:border-[#542870]/60 hover:bg-[#F1E9F8]'
                  }`}
                >
                  <div>
                    <span
                      className={`text-xs font-bold block ${
                        isTaken
                          ? 'text-[#5B2482] dark:text-[#D8C4E9] line-through opacity-80'
                          : 'text-[#3A124D] dark:text-[#EDE5F5]'
                      }`}
                    >
                      {supp.name}
                    </span>
                    {supp.time && (
                      <span className="text-[10px] text-[#6F5A7D] dark:text-[#B792D4] font-semibold mt-0.5 block">
                        ⏰ {supp.time}
                      </span>
                    )}
                  </div>

                  <div
                    className={`w-6 h-6 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                      isTaken
                        ? 'bg-[#5B2482] border-[#5B2482] text-white'
                        : 'border-[#D8C4E9] dark:border-[#542870] bg-white dark:bg-[#2D103E]'
                    }`}
                  >
                    {isTaken && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
