import React, { useState, useEffect } from 'react';
import { ActiveTab, DayLog, PlanConfig, PhotoRecord } from './types';
import { 
  getTodayDateString, 
  loadDayLog, 
  loadPlanFromStorage, 
  saveDayLog, 
  savePlanToStorage,
  isSectionVisible
} from './utils/storage';
import { calculateDayScore, calculateStreak } from './utils/calculations';
import { getAllPhotosFromDB } from './utils/indexedDB';
import { 
  loadNotificationSettings, 
  saveNotificationSettings, 
  registerServiceWorker, 
  checkAndTriggerReminders, 
  syncMealRemindersWithPlan, 
  getMissedRemindersOnBoot,
  NotificationSettings 
} from './utils/notifications';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { TodayTab } from './components/TodayTab';
import { BodyTab } from './components/BodyTab';
import { ReportsTab } from './components/ReportsTab';
import { PinModal } from './components/PinModal';
import { CoachModal } from './components/CoachModal';
import { ImportModal } from './components/ImportModal';
import { ReportModal } from './components/ReportModal';
import { PhotoCompareModal } from './components/PhotoCompareModal';
import { InstallGuideModal } from './components/InstallGuideModal';
import { VisualReportCard } from './components/VisualReportCard';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { createCoachSession, destroyCoachSession } from './utils/geminiCoach';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('today');
  const [currentDate, setCurrentDate] = useState<string>(getTodayDateString);
  const [plan, setPlan] = useState<PlanConfig>(loadPlanFromStorage);
  const [day, setDay] = useState<DayLog>(() => loadDayLog(getTodayDateString()));
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(loadNotificationSettings);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nt_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Ephemeral in-memory coach session (never saved to localStorage)
  const [coachSessionUnlocked, setCoachSessionUnlocked] = useState<boolean>(false);
  const [coachToken, setCoachToken] = useState<string | null>(null);

  // Modals state
  const [showPinModal, setShowPinModal] = useState(false);
  const [showCoachModal, setShowCoachModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showStoryCard, setShowStoryCard] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [comparePhotos, setComparePhotos] = useState<PhotoRecord[]>([]);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Register SW & check missed reminders on startup
  useEffect(() => {
    registerServiceWorker();

    // Check if any reminders were missed while app was closed
    const missed = getMissedRemindersOnBoot(notificationSettings);
    if (missed.length > 0) {
      setTimeout(() => {
        showNotification(`تنبيهات فاتت خلال غيابك 📌: ${missed.join(' | ')}`);
      }, 1200);
    }
  }, []);

  // Sync dark mode class with <html> and <body>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('nt_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Keep meal reminders in sync when plan changes
  useEffect(() => {
    if (plan.meals && plan.meals.length > 0) {
      setNotificationSettings((prev) => {
        const synced = syncMealRemindersWithPlan(prev, plan.meals);
        saveNotificationSettings(synced);
        return synced;
      });
    }
  }, [plan.meals]);

  // Periodic Reminder Runner (runs every 30 seconds)
  useEffect(() => {
    // Run immediately once
    checkAndTriggerReminders(notificationSettings);
    const intervalId = window.setInterval(() => {
      checkAndTriggerReminders(notificationSettings);
    }, 30000);
    return () => clearInterval(intervalId);
  }, [notificationSettings]);

  // Load day whenever currentDate changes
  useEffect(() => {
    setDay(loadDayLog(currentDate));
  }, [currentDate]);

  // Ensure active tab fallback if hidden
  useEffect(() => {
    if (activeTab === 'body' && !isSectionVisible(plan, 'bodyTab')) {
      setActiveTab('today');
    } else if (activeTab === 'reports' && !isSectionVisible(plan, 'reportsTab')) {
      setActiveTab('today');
    }
  }, [plan, activeTab]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleUpdateDay = (newDay: DayLog) => {
    setDay(newDay);
    saveDayLog(currentDate, newDay);
  };

  const handleSavePlan = (newPlan: PlanConfig) => {
    setPlan(newPlan);
    savePlanToStorage(newPlan);
  };

  const handleImportPlanData = (imported: Partial<PlanConfig>) => {
    const updatedPlan: PlanConfig = {
      ...plan,
      ...imported,
      meals: imported.meals || plan.meals,
      checklist: imported.checklist || plan.checklist,
      supplements: imported.supplements || plan.supplements,
      tips: imported.tips || plan.tips,
      scoreWeights: imported.scoreWeights || plan.scoreWeights,
    };
    handleSavePlan(updatedPlan);
  };

  const handleToggleFreeze = () => {
    const nextState = !day.isFreeze;
    handleUpdateDay({ ...day, isFreeze: nextState });
    showNotification(nextState ? 'تم تفعيل يوم الراحة (Free Day) بنجاح ❄️' : 'تم استئناف الالتزام بالخطة اليومية 🔥');
  };

  const handleOpenComparePhotos = async () => {
    const photos = await getAllPhotosFromDB();
    if (photos.length < 2) {
      showNotification('يرجى التقاط أو رفع صورتين على الأقل للبدء في المقارنة 📸');
      return;
    }
    setComparePhotos(photos);
    setShowCompareModal(true);
  };

  const handleSaveNotifications = (newSettings: NotificationSettings) => {
    setNotificationSettings(newSettings);
    showNotification(
      newSettings.enabled
        ? 'تم تفعيل نظام التنبيهات الذكية للوجبات 🔔'
        : 'تم تحديث إعدادات الإشعارات'
    );
  };

  const score = calculateDayScore(plan, day);
  const streak = calculateStreak(currentDate, plan);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white font-sans antialiased pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 dark:bg-slate-100/95 text-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md animate-in slide-in-from-top duration-200 text-center max-w-[90%] border border-slate-700 dark:border-slate-300">
          {toastMessage}
        </div>
      )}

      {/* Main Top Header */}
      <Navbar
        plan={plan}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenCoachPin={() => setShowPinModal(true)}
        onOpenInstallGuide={() => setShowInstallGuide(true)}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        onOpenImportModal={() => setShowImportModal(true)}
        notificationsEnabled={notificationSettings.enabled}
        streak={streak}
      />

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 pb-24">
        {activeTab === 'today' && (
          <TodayTab
            plan={plan}
            day={day}
            currentDate={currentDate}
            score={score}
            streak={streak}
            onUpdateDay={handleUpdateDay}
            onUpdatePlan={(updater) => {
              const updated = typeof updater === 'function' ? updater(plan) : updater;
              handleSavePlan(updated);
            }}
            onNotify={showNotification}
            onOpenReportModal={() => setShowReportModal(true)}
            onOpenStoryCard={() => setShowStoryCard(true)}
            onOpenImportModal={() => setShowImportModal(true)}
            onOpenNotifications={() => setShowNotificationsModal(true)}
            onToggleFreeze={handleToggleFreeze}
          />
        )}

        {activeTab === 'body' && (
          <BodyTab
            plan={plan}
            day={day}
            currentDate={currentDate}
            onUpdateDay={handleUpdateDay}
            onUpdatePlan={(updater) => {
              const updated = typeof updater === 'function' ? updater(plan) : updater;
              handleSavePlan(updated);
            }}
            onOpenComparePhotos={handleOpenComparePhotos}
            onNotify={showNotification}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsTab
            plan={plan}
            currentDate={currentDate}
            isDarkMode={isDarkMode}
            onNotify={showNotification}
          />
        )}
      </main>

      {/* Bottom Tabs Navigation */}
      <BottomNav plan={plan} activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Modals */}
      {showPinModal && (
        <PinModal
          correctPin={plan.adminPin || '1234'}
          onSuccess={async () => {
            setShowPinModal(false);
            const res = await createCoachSession();
            setCoachSessionUnlocked(true);
            if (res.ok && res.token) {
              setCoachToken(res.token);
            }
            setShowCoachModal(true);
          }}
          onClose={() => setShowPinModal(false)}
        />
      )}

      {showCoachModal && (
        <CoachModal
          plan={plan}
          coachSessionUnlocked={coachSessionUnlocked}
          coachToken={coachToken}
          onSavePlan={handleSavePlan}
          onClose={async () => {
            await destroyCoachSession(coachToken);
            setCoachSessionUnlocked(false);
            setCoachToken(null);
            setShowCoachModal(false);
          }}
          onNotify={showNotification}
        />
      )}

      {showImportModal && (
        <ImportModal
          onImportPlan={handleImportPlanData}
          onClose={() => setShowImportModal(false)}
          onNotify={showNotification}
        />
      )}

      {showReportModal && (
        <ReportModal
          plan={plan}
          day={day}
          currentDate={currentDate}
          onClose={() => setShowReportModal(false)}
          onNotify={showNotification}
        />
      )}

      {showStoryCard && (
        <VisualReportCard
          plan={plan}
          day={day}
          currentDate={currentDate}
          onClose={() => setShowStoryCard(false)}
          onNotify={showNotification}
        />
      )}

      {showCompareModal && (
        <PhotoCompareModal
          photos={comparePhotos}
          onClose={() => setShowCompareModal(false)}
        />
      )}

      {showInstallGuide && (
        <InstallGuideModal onClose={() => setShowInstallGuide(false)} />
      )}

      {showNotificationsModal && (
        <NotificationSettingsModal
          isOpen={showNotificationsModal}
          onClose={() => setShowNotificationsModal(false)}
          plan={plan}
          settings={notificationSettings}
          onSave={handleSaveNotifications}
        />
      )}
    </div>
  );
}
