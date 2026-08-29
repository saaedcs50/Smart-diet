import React, { useState, useEffect } from 'react';
import {
  NotificationSettings,
  SystemStatusInfo,
  getSystemNotificationStatus,
  requestNotificationPermission,
  sendTestNotification,
  saveNotificationSettings,
  getDeviceInfo,
} from '../utils/notifications';
import { PlanConfig } from '../types';
import { 
  Bell, 
  Smartphone, 
  BatteryCharging, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Volume2, 
  Droplets, 
  Utensils, 
  Activity, 
  Moon, 
  Sparkles, 
  Info, 
  RefreshCw,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanConfig;
  settings: NotificationSettings;
  onSave: (newSettings: NotificationSettings) => void;
}

export const NotificationSettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  plan,
  settings: initialSettings,
  onSave,
}) => {
  const [settings, setSettings] = useState<NotificationSettings>(initialSettings);
  const [status, setStatus] = useState<SystemStatusInfo | null>(null);
  const [testSent, setTestSent] = useState<boolean>(false);
  const [requestingPerm, setRequestingPerm] = useState<boolean>(false);
  const [savedFeedback, setSavedFeedback] = useState<boolean>(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'android' | 'ios' | 'none'>('none');

  const { isIOS, isAndroid } = getDeviceInfo();

  const refreshStatus = async () => {
    const sysStatus = await getSystemNotificationStatus();
    setStatus(sysStatus);
  };

  useEffect(() => {
    if (isOpen) {
      setSettings(initialSettings);
      setTestSent(false);
      setSavedFeedback(false);
      refreshStatus();

      if (isAndroid) setActiveGuideTab('android');
      else if (isIOS && !status?.isPWAStandalone) setActiveGuideTab('ios');
    }
  }, [isOpen, initialSettings]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    setRequestingPerm(true);
    const granted = await requestNotificationPermission();
    await refreshStatus();
    if (granted) {
      setSettings((prev) => ({ ...prev, enabled: true }));
    }
    setRequestingPerm(false);
  };

  const handleToggleMaster = async (checked: boolean) => {
    if (checked && status?.permission !== 'granted') {
      const granted = await requestNotificationPermission();
      await refreshStatus();
      if (!granted) return;
    }
    setSettings((prev) => ({ ...prev, enabled: checked }));
  };

  const handleMealTimeChange = (index: number, newTime: string) => {
    const updatedMeals = [...settings.mealReminders.meals];
    if (updatedMeals[index]) {
      updatedMeals[index] = { ...updatedMeals[index], time: newTime };
      setSettings({
        ...settings,
        mealReminders: {
          ...settings.mealReminders,
          meals: updatedMeals,
        },
      });
    }
  };

  const handleMealToggle = (index: number, enabled: boolean) => {
    const updatedMeals = [...settings.mealReminders.meals];
    if (updatedMeals[index]) {
      updatedMeals[index] = { ...updatedMeals[index], enabled };
      setSettings({
        ...settings,
        mealReminders: {
          ...settings.mealReminders,
          meals: updatedMeals,
        },
      });
    }
  };

  const handleTestNotification = async () => {
    setTestSent(false);
    const success = await sendTestNotification();
    await refreshStatus();
    if (success) {
      setTestSent(true);
      setTimeout(() => setTestSent(false), 4500);
    } else if (status?.permission !== 'granted') {
      alert('يرجى منح إذن الإشعارات أولاً لتتمكن من تجربة التنبيه.');
    }
  };

  const handleSaveAndClose = () => {
    saveNotificationSettings(settings);
    onSave(settings);
    setSavedFeedback(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const resetToDefaultPreset = () => {
    const defaultTimes = ['08:30', '12:00', '15:30', '18:30', '21:30'];
    const updatedMeals = plan.meals.map((m, idx) => ({
      id: m.id,
      name: m.name,
      time: defaultTimes[idx % defaultTimes.length] || '13:00',
      enabled: true,
    }));

    setSettings((prev) => ({
      ...prev,
      enabled: true,
      waterReminders: {
        enabled: true,
        intervalMinutes: 60,
        startHour: 8,
        endHour: 23,
      },
      mealReminders: {
        enabled: true,
        meals: updatedMeals,
      },
      workoutReminder: {
        enabled: true,
        time: '17:30',
      },
      nightReviewReminder: {
        enabled: true,
        time: '22:30',
      },
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto dir-rtl">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">منظومة الإشعارات والتنبيهات المتقدمة</h2>
              <p className="text-[11px] text-emerald-100">تنبيهات دقيقة ودائمة مقاومة لنوم خلفية النظام (Doze Mode)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-200 divide-y divide-slate-800">
          {/* System Health Status Dashboard */}
          <div className="space-y-2.5 pb-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                حالة جاهزية الإشعارات بالجهاز:
              </span>
              <button
                onClick={refreshStatus}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>فحص حي</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] sm:text-xs">
              {/* SW Status */}
              <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-center space-y-0.5">
                <span className="text-slate-400 block">Service Worker</span>
                {status?.swActive ? (
                  <span className="font-black text-emerald-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> نشط وجاهز
                  </span>
                ) : (
                  <span className="font-bold text-amber-400 flex items-center justify-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" /> جاري التهيئة
                  </span>
                )}
              </div>

              {/* Permission Status */}
              <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-center space-y-0.5">
                <span className="text-slate-400 block">صلاحية التنبيه</span>
                {status?.permission === 'granted' ? (
                  <span className="font-black text-emerald-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> مسموح
                  </span>
                ) : status?.permission === 'denied' ? (
                  <span className="font-bold text-rose-400 flex items-center justify-center gap-1">
                    <XCircle className="w-3 h-3" /> محظور
                  </span>
                ) : (
                  <span className="font-bold text-amber-400 flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> تحتاج موافقة
                  </span>
                )}
              </div>

              {/* App Mode / Background */}
              <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-center space-y-0.5">
                <span className="text-slate-400 block">نمط التطبيق</span>
                {status?.isPWAStandalone ? (
                  <span className="font-black text-cyan-400 flex items-center justify-center gap-1">
                    <Smartphone className="w-3 h-3" /> PWA مثبت
                  </span>
                ) : (
                  <span className="font-bold text-slate-300 flex items-center justify-center gap-1">
                    متصفح ويب
                  </span>
                )}
              </div>
            </div>

            {/* Permission Action Banner */}
            {status?.permission === 'granted' ? (
              <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-2xl p-3 flex items-center justify-between text-emerald-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-bold">الإشعارات مفعلة ومستعدة للظهور ✅</span>
                </div>
                <button
                  onClick={handleTestNotification}
                  className="text-xs bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold px-3 py-1.5 rounded-xl transition-all shadow flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>تجربة إشعار حي</span>
                </button>
              </div>
            ) : status?.permission === 'denied' ? (
              <div className="bg-rose-950/70 border border-rose-500/40 rounded-2xl p-3 text-xs text-rose-300 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>إذن الإشعارات محظور في إعدادات متصفح جهازك</span>
                </p>
                <p className="text-slate-300 text-[11px]">
                  لتفعيله، اضغط على علامة القفل/الإعدادات بجوار شريط عنوان المتصفح واختر "السماح بالإشعارات" (Allow Notifications).
                </p>
              </div>
            ) : (
              <div className="bg-amber-950/70 border border-amber-500/40 rounded-2xl p-3 flex items-center justify-between gap-3 text-amber-300">
                <div className="text-xs">
                  <span className="font-bold block">إذن الإشعارات غير مفعل</span>
                  <span className="text-amber-200/80 text-[11px]">اضغط للموافقة على تلقي تنبيهات الوجبات والماء</span>
                </div>
                <button
                  onClick={handleRequestPermission}
                  disabled={requestingPerm}
                  className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl transition-all shadow cursor-pointer"
                >
                  {requestingPerm ? 'جاري الطلب...' : 'تفعيل الإشعارات 🔔'}
                </button>
              </div>
            )}

            {testSent && (
              <div className="text-xs text-emerald-400 bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-500/40 text-center font-bold animate-bounce flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>تم إرسال الإشعار التجريبي مع النغمة بنجاح! تفقد أعلى الشاشة.</span>
              </div>
            )}
          </div>

          {/* Master System Switch */}
          <div className="pt-3 flex items-center justify-between">
            <div>
              <h3 className="font-black text-white text-sm">تشغيل منظومة الإشعارات والتذكيرات</h3>
              <p className="text-xs text-slate-400">تفعيل أو إيقاف كافة التنبيهات المجدولة تلقائياً</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => handleToggleMaster(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* OS Optimization Accordion Guide (Android Doze & iOS PWA) */}
          <div className="pt-3 space-y-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveGuideTab(activeGuideTab === 'android' ? 'none' : 'android')}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeGuideTab === 'android'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                <span>دليل أندرويد (تجاوز توفير البطارية)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGuideTab(activeGuideTab === 'ios' ? 'none' : 'ios')}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeGuideTab === 'ios'
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>دليل آيفون iOS (تثبيت PWA)</span>
              </button>
            </div>

            {/* Android Guide Content */}
            {activeGuideTab === 'android' && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 space-y-2 text-xs leading-relaxed animate-in fade-in">
                <h5 className="font-black text-emerald-300 flex items-center gap-1.5">
                  <BatteryCharging className="w-4 h-4 text-emerald-400" />
                  خطوة واحدة لضمان وصول التنبيهات دائماً في أندرويد (Unrestrict Battery):
                </h5>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px]">
                  <li>افتح إعدادات الهاتف ⚙️ ➔ التطبيقات (Apps).</li>
                  <li>ابحث عن هذا التطبيق أو متصفحك الحالي (Chrome / Edge).</li>
                  <li>اضغط على <b>"البطارية" (Battery)</b> وقم بتغيير الخيار إلى <b>"غير مقيد" (Unrestricted)</b>.</li>
                </ol>
                <p className="text-[10px] text-emerald-400/90 italic">
                  * هذا يمنع نظام أندرويد من إدخال الخدمة في وضع النوم (Doze Mode) ويضمن وصول الإشعارات في دقيقتها.
                </p>
              </div>
            )}

            {/* iOS Guide Content */}
            {activeGuideTab === 'ios' && (
              <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/80 space-y-2 text-xs leading-relaxed animate-in fade-in">
                <h5 className="font-black text-cyan-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  تفعيل الإشعارات على الآيفون والآيباد (iOS PWA Setup):
                </h5>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px]">
                  <li>افتح التطبيق من متصفح <b>Safari</b> على هاتف الآيفون.</li>
                  <li>اضغط على زر المشاركة <b>(Share Button 📤)</b> في أسفل الشاشة.</li>
                  <li>اختر <b>"إضافة إلى الشاشة الرئيسية" (Add to Home Screen ➕)</b>.</li>
                  <li>افتح التطبيق من أيقونة الشاشة الرئيسية الجديدة وقم بتفعيل الإشعارات من هنا.</li>
                </ol>
              </div>
            )}
          </div>

          {/* Sound & Tone Setting */}
          <div className="pt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <div>
                <h4 className="text-xs font-bold text-slate-200">صوت التنبيه الموسيقي (Melodic Chime)</h4>
                <p className="text-[11px] text-slate-400">نغمة هادئة ومريحة تُعزف فور ظهور التنبيه</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.sound}
                onChange={(e) => setSettings({ ...settings, sound: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Water Reminders Config */}
          <div className="pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <div>
                  <h4 className="font-bold text-sm text-cyan-300">تذكير شرب الماء الدوري</h4>
                  <p className="text-xs text-slate-400">تنبيهات منتظمة لترطيب الجسم والمحافظة على الحرق</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.waterReminders.enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      waterReminders: { ...settings.waterReminders, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            {settings.waterReminders.enabled && (
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3.5 space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-bold mb-1.5 block">معدل تكرار التنبيه:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: '45 دقيقة', val: 45 },
                      { label: '60 دقيقة', val: 60 },
                      { label: '90 دقيقة', val: 90 },
                      { label: 'ساعتين', val: 120 },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() =>
                          setSettings({
                            ...settings,
                            waterReminders: { ...settings.waterReminders, intervalMinutes: opt.val },
                          })
                        }
                        className={`py-2 px-1 rounded-xl text-center font-bold transition-all border cursor-pointer ${
                          settings.waterReminders.intervalMinutes === opt.val
                            ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-900/40'
                            : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-slate-300 block mb-1">من الساعة:</label>
                    <select
                      value={settings.waterReminders.startHour}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          waterReminders: { ...settings.waterReminders, startHour: Number(e.target.value) },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-cyan-500 focus:outline-none"
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={i} value={i}>
                          {i === 0 ? '12 منتصف الليل' : i < 12 ? `${i} صباحاً` : i === 12 ? '12 ظهراً' : `${i - 12} مساءً`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">إلى الساعة:</label>
                    <select
                      value={settings.waterReminders.endHour}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          waterReminders: { ...settings.waterReminders, endHour: Number(e.target.value) },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-cyan-500 focus:outline-none"
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={i} value={i}>
                          {i === 0 ? '12 منتصف الليل' : i < 12 ? `${i} صباحاً` : i === 12 ? '12 ظهراً' : `${i - 12} مساءً`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Meals Reminders Schedule */}
          <div className="pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-300">جدول ومواعيد الوجبات اليومية</h4>
                  <p className="text-xs text-slate-400">ضبط وقت التنبيه الدقيق لكل وجبة مقرر في خطتك</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.mealReminders.enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      mealReminders: { ...settings.mealReminders, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {settings.mealReminders.enabled && (
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3 space-y-2">
                {settings.mealReminders.meals.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-2">لا توجد وجبات مسجلة حالياً.</p>
                ) : (
                  settings.mealReminders.meals.map((meal, idx) => (
                    <div
                      key={meal.id || idx}
                      className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <input
                          type="checkbox"
                          checked={meal.enabled}
                          onChange={(e) => handleMealToggle(idx, e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
                        />
                        <span className={`text-xs font-bold truncate ${meal.enabled ? 'text-slate-100' : 'text-slate-500 line-through'}`}>
                          {meal.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[11px] text-slate-400">الوقت:</span>
                        <input
                          type="time"
                          value={meal.time}
                          onChange={(e) => handleMealTimeChange(idx, e.target.value)}
                          disabled={!meal.enabled}
                          className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-emerald-400 font-mono font-bold focus:border-emerald-500 focus:outline-none disabled:opacity-40"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Extra Reminders: Workout & Night Review */}
          <div className="pt-3 space-y-2.5">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">تنبيهات التمارين والتوثيق</h4>

            {/* Workout */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <div>
                  <h5 className="text-xs font-bold text-slate-200">تذكير النشاط والرياضة</h5>
                  <p className="text-[10px] text-slate-400">تذكير بـ 30 دقيقة مشي أو تمارين</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={settings.workoutReminder.time}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      workoutReminder: { ...settings.workoutReminder, time: e.target.value },
                    })
                  }
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-amber-400 font-mono font-bold focus:border-amber-500 focus:outline-none"
                />
                <input
                  type="checkbox"
                  checked={settings.workoutReminder.enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      workoutReminder: { ...settings.workoutReminder, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Night Review */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-purple-400" />
                <div>
                  <h5 className="text-xs font-bold text-slate-200">تذكير المراجعة والتوثيق الليلي</h5>
                  <p className="text-[10px] text-slate-400">توثيق التزام اليوم ومشاركته مع الأخصائي</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={settings.nightReviewReminder.time}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      nightReviewReminder: { ...settings.nightReviewReminder, time: e.target.value },
                    })
                  }
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-purple-400 font-mono font-bold focus:border-purple-500 focus:outline-none"
                />
                <input
                  type="checkbox"
                  checked={settings.nightReviewReminder.enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      nightReviewReminder: { ...settings.nightReviewReminder, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 rounded text-purple-500 accent-purple-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Quick Presets Reset */}
          <div className="pt-3 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={resetToDefaultPreset}
              className="text-emerald-400 hover:text-emerald-300 font-bold underline decoration-dashed flex items-center gap-1 cursor-pointer"
            >
              <span>إعادة المواعيد النموذجية</span>
            </button>
            <span className="text-[10px] text-slate-500">محفوظة محلياً 100% على هاتفك</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            إلغاء
          </button>
          <button
            onClick={handleSaveAndClose}
            className="px-6 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            {savedFeedback ? 'تم حفظ الإعدادات بنجاح ✓' : 'حفظ ونشاط الإشعارات'}
          </button>
        </div>
      </div>
    </div>
  );
};
