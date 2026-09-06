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
  FileDown,
  HelpCircle
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
  onOpenOnboarding?: () => void;
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
  onOpenOnboarding,
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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#2D103E]/95 backdrop-blur-md border-b border-[#D8C4E9]/60 dark:border-[#542870]/60 shadow-xs transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 space-y-2.5">
        {/* Top row: Brand & Primary Actions */}
        <div className="flex items-center justify-between gap-3">
          {/* User info & Brand Logo */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-sm shrink-0 p-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11C3 6.03 7.03 2 12 2z" />
                <path d="M12 6v6l4 2" />
                <path d="M8 14c1.5 1.5 3 2 4 2s2.5-.5 4-2" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-base leading-tight truncate">
                  {plan.clientName || 'المتدرب'}
                </h1>
                {streak >= 1 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-[#F2C66D]/20 text-[#E0922D] dark:text-[#F2C66D] border border-[#E0922D]/30 shrink-0">
                    <Flame className="w-3.5 h-3.5 fill-[#E0922D] text-[#E0922D]" />
                    <span>{streak} {streak === 1 ? 'يوم' : streak === 2 ? 'يومان' : 'أيام'}</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6F5A7D] dark:text-[#B792D4] flex items-center gap-1.5 mt-0.5">
                <span className="font-semibold text-[#5B2482] dark:text-[#FF4099]">Smart Diet</span>
                <span className="text-[#D8C4E9] dark:text-[#542870]">•</span>
                <span className="font-medium">إشراف د. شيماء</span>
              </p>
            </div>
          </div>

          {/* Action Tools with comfortable touch targets */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onOpenOnboarding && (
              <button
                onClick={onOpenOnboarding}
                title="دليل استخدام التطبيق خطوة بخطوة"
                className="px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold bg-[#F1E9F8] hover:bg-[#D8C4E9]/50 text-[#5B2482] dark:bg-[#3D1B53] dark:text-[#EDE5F5] dark:hover:bg-[#542870] border border-[#D8C4E9]/70 dark:border-[#542870] transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#5B2482] dark:text-[#FF4099]" />
                <span className="hidden sm:inline">دليل الاستخدام</span>
              </button>
            )}

            <button
              onClick={onOpenImportModal}
              title="استيراد خطة"
              className="px-3 py-2 rounded-xl text-xs font-bold bg-[#E21B6D] hover:bg-[#C91561] text-white transition-all flex items-center gap-1.5 shadow-sm shadow-[#E21B6D]/20 active:scale-95 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">إدخال خطة</span>
            </button>

            {/* Notifications */}
            <button
              onClick={onOpenNotifications}
              title="التنبيهات والمواعيد"
              className={`relative p-2.5 rounded-xl border transition-all cursor-pointer ${
                notificationsEnabled
                  ? 'bg-[#F1E9F8] dark:bg-[#3D1B53] text-[#E21B6D] dark:text-[#FF4099] border-[#E21B6D]/40 dark:border-[#FF4099]/40 hover:bg-[#D8C4E9]/40'
                  : 'bg-[#F8F7F9] dark:bg-[#220930] text-[#6F5A7D] dark:text-[#B792D4] border-[#D8C4E9] dark:border-[#542870] hover:bg-[#F1E9F8]'
              }`}
            >
              <Bell className="w-4 h-4" />
              {notificationsEnabled && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E21B6D] ring-2 ring-white dark:ring-[#2D103E]" />
              )}
            </button>

            {/* Dark Mode */}
            <button
              onClick={onToggleDarkMode}
              title="الوضع الداكن / الفاتح"
              className="p-2.5 rounded-xl bg-[#F8F7F9] dark:bg-[#220930] text-[#5B2482] dark:text-[#EDE5F5] hover:bg-[#F1E9F8] dark:hover:bg-[#3D1B53] border border-[#D8C4E9] dark:border-[#542870] transition-colors cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#F2C66D]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Discreet Settings Entrance to /coach */}
            <button
              onClick={onOpenCoachPin}
              title="الإعدادات"
              className="p-2.5 rounded-xl bg-[#F8F7F9] dark:bg-[#220930] text-[#5B2482] dark:text-[#EDE5F5] hover:bg-[#F1E9F8] dark:hover:bg-[#3D1B53] border border-[#D8C4E9] dark:border-[#542870] transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Install App */}
            <button
              onClick={onOpenInstallGuide}
              title="تثبيت التطبيق"
              className="hidden sm:flex p-2.5 rounded-xl bg-[#F8F7F9] dark:bg-[#220930] text-[#5B2482] dark:text-[#EDE5F5] hover:bg-[#F1E9F8] dark:hover:bg-[#3D1B53] border border-[#D8C4E9] dark:border-[#542870] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Spacious Date Navigator */}
        <div className="pt-2 border-t border-[#D8C4E9]/40 dark:border-[#542870]/40 flex items-center justify-between gap-3">
          {/* Day switcher arrows & native picker */}
          <div className="flex items-center gap-1 bg-[#F1E9F8] dark:bg-[#220930] p-1 rounded-xl border border-[#D8C4E9] dark:border-[#542870]">
            <button
              onClick={() => handleShiftDate(-1)}
              className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-[#3D1B53] text-[#3A124D] dark:text-[#EDE5F5] transition-all cursor-pointer"
              title="اليوم السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="relative px-2 flex items-center">
              <input
                type="date"
                value={currentDate}
                onChange={(e) => e.target.value && onDateChange(e.target.value)}
                className="bg-transparent text-[#3A124D] dark:text-[#EDE5F5] text-xs font-bold outline-none cursor-pointer text-center"
              />
            </div>

            <button
              onClick={() => handleShiftDate(1)}
              className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-[#3D1B53] text-[#3A124D] dark:text-[#EDE5F5] transition-all cursor-pointer"
              title="اليوم التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Date Label & Today Button */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-medium text-[#6F5A7D] dark:text-[#B792D4]">
              {formattedArabicDate}
            </span>

            {!isToday ? (
              <button
                onClick={handleGoToday}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#5B2482] hover:bg-[#3A124D] text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>العودة لليوم</span>
              </button>
            ) : (
              <span className="px-3 py-1 rounded-xl text-xs font-semibold text-[#5B2482] dark:text-[#EDE5F5] bg-[#F1E9F8] dark:bg-[#3D1B53] border border-[#D8C4E9] dark:border-[#542870] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E21B6D] dark:text-[#FF4099]" />
                <span>اليوم الحالي</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

