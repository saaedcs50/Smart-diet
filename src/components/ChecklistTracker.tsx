import React from 'react';
import { CheckSquare, Pill, Check, Sparkles } from 'lucide-react';
import { PlanConfig, DayLog } from '../types';
import { isSectionVisible } from '../utils/storage';

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
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-4">
      {/* 1. Daily Habits Checklist */}
      {showChecklist && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center font-bold text-sm">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                  قائمة العادات اليومية ✅
                </h3>
                <span className="text-[11px] text-slate-400">
                  تم إنجاز {completedChecksCount} من {plan.checklist.length} مهام
                </span>
              </div>
            </div>

            {isAllChecksDone && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-500" />
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
                  className={`w-full text-right p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isDone
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300/80 dark:border-emerald-800/60'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className={`text-xs font-semibold leading-relaxed ${
                      isDone
                        ? 'text-emerald-900 dark:text-emerald-200 line-through opacity-80'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </span>

                  <div
                    className={`w-6 h-6 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
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
        <div className={`${showChecklist ? 'pt-3 border-t border-slate-100 dark:border-slate-800/80' : ''} space-y-3`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center font-bold text-sm">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">
                الفيتامينات والمكملات المقررة 💊
              </h4>
              <span className="text-[11px] text-slate-400">
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
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-right ${
                    isTaken
                      ? 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-300/80 dark:border-purple-800/60'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span
                      className={`text-xs font-bold block ${
                        isTaken
                          ? 'text-purple-900 dark:text-purple-200 line-through opacity-80'
                          : 'text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {supp.name}
                    </span>
                    {supp.time && (
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                        ⏰ {supp.time}
                      </span>
                    )}
                  </div>

                  <div
                    className={`w-6 h-6 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                      isTaken
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
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
