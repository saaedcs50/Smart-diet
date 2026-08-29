import React from 'react';
import { Stethoscope, MessageSquare, AlertTriangle, Send } from 'lucide-react';
import { PlanConfig, DayLog } from '../types';
import { isSectionVisible } from '../utils/storage';

interface SymptomsAndNotesProps {
  plan: PlanConfig;
  day: DayLog;
  onUpdateDay: (updated: DayLog) => void;
}

export const SymptomsAndNotes: React.FC<SymptomsAndNotesProps> = ({ plan, day, onUpdateDay }) => {
  const showSymptoms = isSectionVisible(plan, 'symptomsTracker') && plan.symptomsList && plan.symptomsList.length > 0;
  const showDoctorNotes = isSectionVisible(plan, 'doctorNotes');

  if (!showSymptoms && !showDoctorNotes) {
    return null;
  }

  const toggleSymptom = (id: string) => {
    onUpdateDay({
      ...day,
      symptoms: {
        ...day.symptoms,
        [id]: !day.symptoms[id],
      },
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-4">
      {/* Symptoms section */}
      {showSymptoms && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center font-bold text-sm">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                الأعراض أو الملاحظات الجسدية 🩺
              </h3>
              <span className="text-[11px] text-slate-400">
                حدد أي عَرَض شعرت به لمتابعة الخطة وتعديلها إذا لزم الأمر
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {plan.symptomsList.map((sym) => {
              const isSelected = !!day.symptoms[sym.id];
              return (
                <button
                  key={sym.id}
                  onClick={() => toggleSymptom(sym.id)}
                  className={`p-2.5 rounded-2xl border text-xs font-semibold transition-all text-center ${
                    isSelected
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? '⚠️ ' : ''}
                  {sym.label}
                </button>
              );
            })}
          </div>

          <textarea
            rows={2}
            value={day.symNotes || ''}
            onChange={(e) => onUpdateDay({ ...day, symNotes: e.target.value })}
            placeholder="تفاصيل إضافية حول الأعراض..."
            className="w-full text-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-500 resize-none"
          />
        </div>
      )}

      {/* Direct Doctor Notes */}
      {showDoctorNotes && (
        <div className={`${showSymptoms ? 'pt-3 border-t border-slate-100 dark:border-slate-800/80' : ''} space-y-2`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">
                ملاحظات واستفسارات لـ د. شيماء 📝
              </h4>
              <span className="text-[11px] text-slate-400">
                تُرفق تلقائياً مع تقرير المتابعة اليومي
              </span>
            </div>
          </div>

          <textarea
            rows={3}
            value={day.notes || ''}
            onChange={(e) => onUpdateDay({ ...day, notes: e.target.value })}
            placeholder="أدخل أي استفسار أو تفاصيل ترغب بمشاركتها مع د. شيماء..."
            className="w-full text-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed"
          />
        </div>
      )}
    </div>
  );
};
