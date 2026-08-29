import React, { useState } from 'react';
import {
  Pill,
  Check,
  X,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles,
  Info,
  Calendar,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { PlanConfig, DayLog, DoseStatus, DoseLogEntry } from '../types';
import {
  getAllScheduledDoses,
  calculateDailyMedicationAdherence,
  WITH_FOOD_LABELS,
  MedicationDoseSlotInstance,
} from '../utils/medications';

interface MedicationsTrackerProps {
  plan: PlanConfig;
  day: DayLog;
  onUpdateDay: (updated: DayLog) => void;
}

export const MedicationsTracker: React.FC<MedicationsTrackerProps> = ({
  plan,
  day,
  onUpdateDay,
}) => {
  const medPlan = plan.medicationPlan;
  // If no medications configured or coach hidden them, don't show card
  if (!medPlan || medPlan.showToClient === false || !medPlan.items || medPlan.items.length === 0) {
    return null;
  }

  const activeItems = (medPlan.items || []).filter((m) => m.active !== false);
  if (activeItems.length === 0) return null;

  const scheduledDoses = getAllScheduledDoses(activeItems);
  const adherence = calculateDailyMedicationAdherence(activeItems, day);
  const currentLogs = day.medications || {};

  const [expandedNotesKey, setExpandedNotesKey] = useState<string | null>(null);
  const [editingNoteKey, setEditingNoteKey] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');

  const handleSetDoseStatus = (doseKey: string, status: DoseStatus) => {
    const currentEntry = currentLogs[doseKey];
    
    // Toggle off if clicking the same status
    if (currentEntry?.status === status) {
      const nextLogs = { ...currentLogs };
      delete nextLogs[doseKey];
      onUpdateDay({
        ...day,
        medications: nextLogs,
      });
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newEntry: DoseLogEntry = {
      ...(currentEntry || {}),
      status,
      time: currentEntry?.time || timeStr,
      loggedAt: Date.now(),
    };

    onUpdateDay({
      ...day,
      medications: {
        ...currentLogs,
        [doseKey]: newEntry,
      },
    });
  };

  const handleSaveDoseNote = (doseKey: string) => {
    const currentEntry = currentLogs[doseKey] || { status: 'taken' };
    onUpdateDay({
      ...day,
      medications: {
        ...currentLogs,
        [doseKey]: {
          ...currentEntry,
          note: tempNoteText.trim(),
        },
      },
    });
    setEditingNoteKey(null);
    setTempNoteText('');
  };

  const handleOpenNoteEditor = (doseKey: string, existingNote?: string) => {
    setEditingNoteKey(doseKey);
    setTempNoteText(existingNote || '');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs transition-colors space-y-4">
      {/* Header with Title and Independent Adherence Score */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                أدوية اليوم والالتزام الدوائي 💊
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                مستقل عن نقاط الدايت
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              سجّل جرعاتك اليومية في مواعيدها لتثبيت الالتزام مع الأخصائي
            </p>
          </div>
        </div>

        {/* Adherence Mini Badge */}
        {adherence.totalScheduledNonPRN > 0 && (
          <div className="text-left shrink-0">
            <div className="flex items-center gap-1 font-black text-xs text-blue-600 dark:text-blue-400 justify-end">
              <span>{adherence.totalTaken}/{adherence.totalScheduledNonPRN}</span>
              <span className="text-[10px] text-slate-400">جرعة</span>
            </div>
            <div className="w-18 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  adherence.adherencePercentage === 100
                    ? 'bg-emerald-500'
                    : adherence.adherencePercentage >= 50
                    ? 'bg-blue-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${adherence.adherencePercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Doses List */}
      <div className="space-y-2.5">
        {scheduledDoses.map((dose) => {
          const entry = currentLogs[dose.key];
          const status = entry?.status;
          const isTaken = status === 'taken';
          const isSkipped = status === 'skipped';
          const isPostponed = status === 'postponed';
          const withFoodInfo = dose.withFood ? WITH_FOOD_LABELS[dose.withFood] : null;
          const showNotes = expandedNotesKey === dose.key;

          return (
            <div
              key={dose.key}
              className={`rounded-2xl border transition-all ${
                isTaken
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 shadow-2xs'
                  : isSkipped
                  ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                  : isPostponed
                  ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60'
                  : 'bg-slate-50/70 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300'
              }`}
            >
              {/* Main Dose Row */}
              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Info side */}
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                      {dose.medicationName}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      {dose.dose}
                    </span>
                    {dose.isPRN && (
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                        عند اللزوم
                      </span>
                    )}
                  </div>

                  {/* Slot & Food hint */}
                  <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-200 font-bold">
                      <Clock className="w-3 h-3 text-blue-500" />
                      {dose.slotLabel}
                    </span>

                    {withFoodInfo && withFoodInfo.hint && (
                      <span className="text-slate-400 dark:text-slate-500">•</span>
                    )}

                    {withFoodInfo && withFoodInfo.hint && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${withFoodInfo.badgeColor}`}>
                        {withFoodInfo.label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive Status Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Taken button */}
                  <button
                    type="button"
                    onClick={() => handleSetDoseStatus(dose.key, 'taken')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                      isTaken
                        ? 'bg-emerald-600 text-white shadow-xs scale-102'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>أخذت الجرعة</span>
                  </button>

                  {/* Skipped button */}
                  <button
                    type="button"
                    onClick={() => handleSetDoseStatus(dose.key, 'skipped')}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isSkipped
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-rose-50'
                    }`}
                    title="لم آخذ الجرعة"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>لم آخذ</span>
                  </button>

                  {/* Postponed button */}
                  <button
                    type="button"
                    onClick={() => handleSetDoseStatus(dose.key, 'postponed')}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isPostponed
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-amber-50'
                    }`}
                    title="تأجيل الجرعة لوقت لاحق"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>تأجيل</span>
                  </button>
                </div>
              </div>

              {/* Bottom Expandable Bar: Interactions / Notes */}
              <div className="px-3.5 py-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 min-w-0">
                  {entry?.time && (
                    <span className="font-bold text-slate-600 dark:text-slate-300">
                      🕒 سُجلت {entry.time}
                    </span>
                  )}
                  {entry?.note && (
                    <span className="text-blue-600 dark:text-blue-400 truncate max-w-[200px]">
                      💬 {entry.note}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Note adder */}
                  <button
                    type="button"
                    onClick={() => handleOpenNoteEditor(dose.key, entry?.note)}
                    className="text-[11px] font-bold text-slate-500 hover:text-blue-600 flex items-center gap-0.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>{entry?.note ? 'تعديل الملاحظة' : 'إضافة ملاحظة'}</span>
                  </button>

                  {/* Details Toggle */}
                  {(dose.foodInteractionNote || dose.coachNotes || (withFoodInfo && withFoodInfo.hint)) && (
                    <button
                      type="button"
                      onClick={() => setExpandedNotesKey(showNotes ? null : dose.key)}
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{showNotes ? 'طي التفاصيل' : 'عرض التنبيهات'}</span>
                      {showNotes ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Note Editor inline */}
              {editingNoteKey === dose.key && (
                <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in duration-100">
                  <input
                    type="text"
                    placeholder="اكتب ملاحظتك (مثال: شعرت بغثيان خفيف، أو تأخرت ساعة...)"
                    value={tempNoteText}
                    onChange={(e) => setTempNoteText(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingNoteKey(null)}
                      className="px-3 py-1 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveDoseNote(dose.key)}
                      className="px-4 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700"
                    >
                      حفظ الملاحظة
                    </button>
                  </div>
                </div>
              )}

              {/* Expanded Card Details */}
              {showNotes && (
                <div className="p-3 rounded-b-2xl bg-blue-50/50 dark:bg-slate-900/80 border-t border-blue-100 dark:border-slate-700/80 space-y-2 text-xs animate-in fade-in duration-150">
                  {withFoodInfo && withFoodInfo.hint && (
                    <div className="text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1.5 font-medium">
                      <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>طريقة التناول:</strong> {withFoodInfo.hint}
                      </span>
                    </div>
                  )}

                  {dose.foodInteractionNote && (
                    <div className="p-2 rounded-xl bg-amber-100/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>تنبيه تفاعل الطعام:</strong> {dose.foodInteractionNote}
                      </span>
                    </div>
                  )}

                  {dose.coachNotes && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                      💡 <strong>توجيه الأخصائي:</strong> {dose.coachNotes}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
