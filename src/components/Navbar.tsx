import React from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Moon, 
  Sun, 
  Settings, 
  Download,
  Flame, 
  CheckCircle2, 
  Bell, 
  FileDown
} from 'lucide-react';
import { PlanConfig } from '../types';

interface NavbarProps {
  plan: PlanConfig;
  currentDate: string;
  onDateChange: (newDate: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCoachPin: () => void;
  onOpenInstallGuide: () => void;
  onOpenNotifications: () => void;
  onOpenImportModal: () => void;
  notificationsEnabled: boolean;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  plan,
  currentDate,
  onDateChange,
  isDarkMode,
  onToggleDarkMode,
  onOpenCoachPin,
  onOpenInstallGuide,
  onOpenNotifications,
  onOpenImportModal,
  notificationsEnabled,
  streak,
}) => {
  const handleShiftDate = (days: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    onDateChange(`${year}-${month}-${day}`);
  };

  const handleGoToday = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    onDateChange(`${year}-${month}-${day}`);
  };

  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  const isToday = currentDate === todayStr;

  // Format Arabic friendly date
  const formattedArabicDate = (() => {
    try {
      const parts = currentDate.split('-').map(Number);
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('ar-EG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
    } catch (e) {
      return currentDate;
    }
  })();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/90 shadow-2xs transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 space-y-3">
        {/* Top row: Brand & Primary Actions */}
        <div className="flex items-center justify-between gap-3">
          {/* User info & Dr. Shimaa Clinic Logo */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white font-black text-xl shadow-sm shadow-emerald-500/20 shrink-0">
              🥗
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-black text-slate-800 dark:text-slate-100 text-base leading-tight truncate">
                  {plan.clientName || 'المتدرب'}
                </h1>
                {streak >= 1 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 shrink-0">
                    <Flame className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                    <span>{streak} {streak === 1 ? 'يوم' : streak === 2 ? 'يومان' : 'أيام'}</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Smart Diet</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>إشراف د. شيماء</span>
              </p>
            </div>
          </div>

          {/* Action Tools with comfortable touch targets */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onOpenImportModal}
              title="استيراد خطة"
              className="px-3 py-2 rounded-2xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 active:scale-95 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">إدخال خطة</span>
            </button>

            {/* Notifications */}
            <button
              onClick={onOpenNotifications}
              title="التنبيهات والمواعيد"
              className={`relative p-2.5 rounded-2xl border transition-all cursor-pointer ${
                notificationsEnabled
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              <Bell className="w-4 h-4" />
              {notificationsEnabled && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {/* Dark Mode */}
            <button
              onClick={onToggleDarkMode}
              title="الوضع الداكن / الفاتح"
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Doctor PIN Settings */}
            <button
              onClick={onOpenCoachPin}
              title="لوحة تحكم الطبيبة (د. شيماء)"
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Install App */}
            <button
              onClick={onOpenInstallGuide}
              title="تثبيت التطبيق"
              className="hidden sm:flex p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Spacious Date Navigator */}
        <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
          {/* Day switcher arrows & native picker */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => handleShiftDate(-1)}
              className="p-1.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-2xs"
              title="اليوم السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="relative px-2 flex items-center">
              <input
                type="date"
                value={currentDate}
                onChange={(e) => e.target.value && onDateChange(e.target.value)}
                className="bg-transparent text-slate-800 dark:text-slate-100 text-xs font-black outline-none cursor-pointer text-center"
              />
            </div>

            <button
              onClick={() => handleShiftDate(1)}
              className="p-1.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-2xs"
              title="اليوم التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Date Label & Today Button */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-bold text-slate-500 dark:text-slate-400">
              {formattedArabicDate}
            </span>

            {!isToday ? (
              <button
                onClick={handleGoToday}
                className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>العودة لليوم</span>
              </button>
            ) : (
              <span className="px-3 py-1 rounded-xl text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>اليوم الحالي</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
