import React, { useMemo } from 'react';
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

interface WeekStripCalendarProps {
  currentDate: string;
  onDateChange: (newDate: string) => void;
}

const ARABIC_WEEKDAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const ARABIC_WEEKDAYS_SHORT = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

export const WeekStripCalendar: React.FC<WeekStripCalendarProps> = ({
  currentDate,
  onDateChange,
}) => {
  // Today's YYYY-MM-DD
  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Calculate the 7 days of the currently selected week (starting with Saturday or Sunday)
  const weekDays = useMemo(() => {
    const parts = currentDate.split('-').map(Number);
    const curr = new Date(parts[0], parts[1] - 1, parts[2]);
    const dayOfWeek = curr.getDay(); // 0 is Sunday, 6 is Saturday
    
    // In Arab world, week starts Saturday (day 6) or Sunday (0)
    // Let's align so Saturday is index 0
    const diffToSaturday = (dayOfWeek + 1) % 7; 
    const saturday = new Date(curr);
    saturday.setDate(curr.getDate() - diffToSaturday);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(saturday);
      d.setDate(saturday.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      days.push({
        dateStr,
        dayNumber: d.getDate(),
        dayName: ARABIC_WEEKDAYS_SHORT[d.getDay()],
        isToday: dateStr === todayStr,
        isSelected: dateStr === currentDate,
      });
    }
    return days;
  }, [currentDate, todayStr]);

  const handleShiftWeek = (days: number) => {
    const parts = currentDate.split('-').map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    d.setDate(d.getDate() + days);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    onDateChange(`${year}-${month}-${day}`);
  };

  const handleGoToday = () => {
    onDateChange(todayStr);
  };

  // Month & Year display label
  const monthYearLabel = useMemo(() => {
    try {
      const parts = currentDate.split('-').map(Number);
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' });
    } catch {
      return '';
    }
  }, [currentDate]);

  const isTodaySelected = currentDate === todayStr;

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-3 sm:p-4 shadow-sm transition-all">
      {/* Month header & navigation controls */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
            {monthYearLabel}
          </span>
          {!isTodaySelected && (
            <button
              type="button"
              onClick={handleGoToday}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:scale-105 transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" />
              <span>اليوم</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleShiftWeek(7)}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="الأسبوع التالي"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleShiftWeek(-7)}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="الأسبوع السابق"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7-Day Horizontal Strip (iOS Fitness / Apple Health Style) */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {weekDays.map((day) => {
          return (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => onDateChange(day.dateStr)}
              className={`flex flex-col items-center justify-center py-2 sm:py-2.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer relative group ${
                day.isSelected
                  ? 'bg-gradient-to-b from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/25 scale-[1.03]'
                  : day.isToday
                  ? 'bg-teal-50/80 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 border border-teal-300/80 dark:border-teal-800/80 hover:bg-teal-100/70'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              {/* Day Name */}
              <span
                className={`text-[11px] font-bold leading-tight mb-1 ${
                  day.isSelected
                    ? 'text-teal-100'
                    : day.isToday
                    ? 'text-teal-600 dark:text-teal-400 font-extrabold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {day.dayName}
              </span>

              {/* Day Number */}
              <span
                className={`text-sm sm:text-base font-black leading-none ${
                  day.isSelected ? 'text-white' : ''
                }`}
              >
                {day.dayNumber}
              </span>

              {/* Indicator Dot for Today or Completed */}
              <div className="mt-1.5 flex items-center justify-center h-1.5">
                {day.isToday && !day.isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                )}
                {day.isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
