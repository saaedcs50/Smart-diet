import React from 'react';
import { Stethoscope, MessageSquare, AlertTriangle, Send } from 'lucide-react';
import { PlanConfig, DayLog } from '../types';
import { isSectionVisible } from '../utils/storage';
import { HelpButton } from './FeatureHelpModal';

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
    <div className="bg-white dark:bg-[#2D103E] border border-[#D8C4E9]/80 dark:border-[#542870]/80 rounded-3xl p-5 shadow-sm transition-colors space-y-4">
      {/* Symptoms section */}
      {showSymptoms && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E21B6D]/10 dark:bg-[#E21B6D]/20 text-[#E21B6D] dark:text-[#FF4099] flex items-center justify-center font-bold text-sm">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-sm">
                  الأعراض أو الملاحظات الجسدية 🩺
                </h3>
                <HelpButton featureId="symptomsAndNotes" size="sm" />
              </div>
              <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4]">
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
                  className={`p-2.5 rounded-2xl border text-xs font-semibold transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#E21B6D]/10 dark:bg-[#E21B6D]/20 text-[#E21B6D] dark:text-[#FF4099] border-[#E21B6D]/30 shadow-xs'
                      : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#3A124D] dark:text-[#EDE5F5] border-[#D8C4E9]/60 dark:border-[#542870]/60 hover:bg-[#F1E9F8]'
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
            className="w-full text-xs p-3 rounded-2xl border border-[#D8C4E9]/70 dark:border-[#542870]/70 bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#3A124D] dark:text-[#EDE5F5] outline-none focus:ring-2 focus:ring-[#E21B6D] resize-none"
          />
        </div>
      )}

      {/* Direct Doctor Notes */}
      {showDoctorNotes && (
        <div className={`${showSymptoms ? 'pt-3 border-t border-[#D8C4E9]/50 dark:border-[#542870]/50' : ''} space-y-2`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0D9488]/10 dark:bg-[#0D9488]/20 text-[#0D9488] dark:text-[#2DD4BF] flex items-center justify-center font-bold text-sm">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-xs">
                ملاحظات واستفسارات لـ د. شيماء 📝
              </h4>
              <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4]">
                تُرفق تلقائياً مع تقرير المتابعة اليومي
              </span>
            </div>
          </div>

          <textarea
            rows={3}
            value={day.notes || ''}
            onChange={(e) => onUpdateDay({ ...day, notes: e.target.value })}
            placeholder="أدخل أي استفسار أو تفاصيل ترغب بمشاركتها مع د. شيماء..."
            className="w-full text-xs p-3 rounded-2xl border border-[#D8C4E9]/70 dark:border-[#542870]/70 bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#3A124D] dark:text-[#EDE5F5] outline-none focus:ring-2 focus:ring-[#0D9488] resize-none leading-relaxed"
          />
        </div>
      )}
    </div>
  );
};
