// OS-Resilient PWA & Local Notification System with Self-Healing SW & Catch-Up Logic

export interface MealReminderConfig {
  id: string;
  name: string;
  time: string; // HH:mm format (24h)
  enabled: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  vibrate: boolean;
  waterReminders: {
    enabled: boolean;
    intervalMinutes: number; // 30, 45, 60, 90, 120
    startHour: number; // e.g. 8 (8 AM)
    endHour: number; // e.g. 23 (11 PM)
  };
  mealReminders: {
    enabled: boolean;
    meals: MealReminderConfig[];
  };
  workoutReminder: {
    enabled: boolean;
    time: string; // HH:mm
  };
  nightReviewReminder: {
    enabled: boolean;
    time: string; // HH:mm
  };
}

export interface SystemStatusInfo {
  isSupported: boolean;
  permission: NotificationPermission;
  swRegistered: boolean;
  swActive: boolean;
  isPWAStandalone: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  supportsTriggers: boolean;
}

const STORAGE_KEY = 'nt_notification_settings';
const LAST_WATER_NOTIF_KEY = 'nt_last_water_notif';
const FIRED_TODAY_KEY = 'nt_fired_notifs_today'; // JSON { date: 'YYYY-MM-DD', keys: { ... } }
const LAST_APP_BOOT_KEY = 'nt_last_app_boot_timestamp';

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: false,
  sound: true,
  vibrate: true,
  waterReminders: {
    enabled: true,
    intervalMinutes: 60,
    startHour: 8,
    endHour: 23,
  },
  mealReminders: {
    enabled: true,
    meals: [
      { id: 'm1', name: 'وجبة الإفطار', time: '08:30', enabled: true },
      { id: 'm2', name: 'سناك خفيف 1', time: '12:00', enabled: true },
      { id: 'm3', name: 'وجبة الغداء', time: '15:30', enabled: true },
      { id: 'm4', name: 'سناك خفيف 2', time: '18:30', enabled: true },
      { id: 'm5', name: 'وجبة العشاء', time: '21:30', enabled: true },
    ],
  },
  workoutReminder: {
    enabled: false,
    time: '17:00',
  },
  nightReviewReminder: {
    enabled: true,
    time: '22:30',
  },
};

// Device & PWA Environment Detection
export function getDeviceInfo() {
  if (typeof window === 'undefined') {
    return { isIOS: false, isAndroid: false, isPWAStandalone: false };
  }

  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const isPWAStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;

  return { isIOS, isAndroid, isPWAStandalone };
}

// Check Notification Triggers API support (TimestampTrigger)
export function supportsNotificationTriggers(): boolean {
  return typeof window !== 'undefined' && 'showTrigger' in Notification.prototype;
}

// Service Worker Self-Healing & Registration
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }
  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    await reg.update().catch(() => {}); // Force background update check
    return reg;
  } catch (err) {
    console.warn('SW registration failed:', err);
    return null;
  }
}

// Health check to verify Service Worker responsiveness
export async function checkSWHealth(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return false;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (!reg || !reg.active) return false;

    return new Promise((resolve) => {
      const channel = new MessageChannel();
      const timeout = setTimeout(() => resolve(false), 1500);

      channel.port1.onmessage = (event) => {
        clearTimeout(timeout);
        if (event.data && event.data.status === 'OK') {
          resolve(true);
        } else {
          resolve(false);
        }
      };

      reg.active.postMessage({ type: 'SW_HEALTH_CHECK' }, [channel.port2]);
    });
  } catch (e) {
    return false;
  }
}

// Overall system status
export async function getSystemNotificationStatus(): Promise<SystemStatusInfo> {
  const { isIOS, isAndroid, isPWAStandalone } = getDeviceInfo();
  const isSupported = typeof window !== 'undefined' && 'Notification' in window;
  const permission = isSupported ? Notification.permission : 'denied';
  let swRegistered = false;
  let swActive = false;

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.getRegistration('/');
    swRegistered = !!reg;
    swActive = await checkSWHealth();
  }

  return {
    isSupported,
    permission,
    swRegistered,
    swActive,
    isPWAStandalone,
    isIOS,
    isAndroid,
    supportsTriggers: supportsNotificationTriggers(),
  };
}

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await registerServiceWorker();
      return true;
    }
    return false;
  } catch (e) {
    console.error('Error requesting notification permission:', e);
    return false;
  }
}

export function loadNotificationSettings(): NotificationSettings {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_NOTIFICATION_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_NOTIFICATION_SETTINGS,
      ...parsed,
      waterReminders: {
        ...DEFAULT_NOTIFICATION_SETTINGS.waterReminders,
        ...(parsed.waterReminders || {}),
      },
      mealReminders: {
        ...DEFAULT_NOTIFICATION_SETTINGS.mealReminders,
        ...(parsed.mealReminders || {}),
      },
      workoutReminder: {
        ...DEFAULT_NOTIFICATION_SETTINGS.workoutReminder,
        ...(parsed.workoutReminder || {}),
      },
      nightReviewReminder: {
        ...DEFAULT_NOTIFICATION_SETTINGS.nightReviewReminder,
        ...(parsed.nightReviewReminder || {}),
      },
    };
  } catch (e) {
    return DEFAULT_NOTIFICATION_SETTINGS;
  }
}

export function saveNotificationSettings(settings: NotificationSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save notification settings:', e);
  }
}

// Multi-tone Web Audio API sound generator
export function playChimeSound(type: 'water' | 'meal' | 'test' = 'meal'): void {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'water') {
      // Gentle water drop sound (Pitch rise)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } else {
      // Pleasant 2-tone melodic chime
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.4);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(987.77, ctx.currentTime + 0.12); // B5
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.65);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.12);
      osc2.stop(ctx.currentTime + 0.65);
    }
  } catch (e) {
    // AudioContext blocked until user gesture, ignore safely
  }
}

// Send local or Service Worker notification
export async function sendLocalNotification(
  title: string,
  body: string,
  tag: string = 'general',
  playSound: boolean = true,
  soundType: 'water' | 'meal' | 'test' = 'meal'
): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  if (Notification.permission !== 'granted') return false;

  if (playSound) {
    playChimeSound(soundType);
  }

  const options: Record<string, any> = {
    body,
    icon: '/icon.svg',
    badge: '/icon.svg',
    tag,
    renotify: true,
    vibrate: [200, 100, 200, 100, 300],
    data: { url: window.location.origin, timestamp: Date.now() },
  };

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification) {
        await reg.showNotification(title, options as NotificationOptions);
        return true;
      }
    }
  } catch (e) {
    console.warn('SW showNotification fallback:', e);
  }

  try {
    new Notification(title, options as NotificationOptions);
    return true;
  } catch (e) {
    console.error('Notification error:', e);
    return false;
  }
}

const WATER_MESSAGES = [
  'روّق على جسمك بكوباية مية دلوقتي! 💧 ترطيبك سر حرقك العالي.',
  'المية سر طاقتك ونضارة بشرتك! متنساش تشرب كوباية مية حالا 🧊',
  'صحتك في كوباية مية! املى كبايتك وكمّل التزامك الجميل 💦',
  'جسمك محتاج يترطب! اشرب كوباية مية عشان تحافظ على نشاطك ومعدل الأيض 🌊',
  'كل كوباية مية بتفرق في حرقك وصحتك، اشرب دلوقتي واستمتع بالانتعاش! 🚰',
];

export function getRandomWaterMessage(): string {
  const idx = Math.floor(Math.random() * WATER_MESSAGES.length);
  return WATER_MESSAGES[idx];
}

export function syncMealRemindersWithPlan(
  settings: NotificationSettings,
  planMeals: Array<{ id: string; name: string }>
): NotificationSettings {
  const currentMealReminders = [...settings.mealReminders.meals];
  const newMeals: MealReminderConfig[] = [];
  const defaultTimes = ['08:30', '12:00', '15:30', '18:30', '21:30', '23:00'];

  planMeals.forEach((pm, idx) => {
    const existing = currentMealReminders.find((m) => m.id === pm.id || m.name === pm.name);
    if (existing) {
      newMeals.push({
        ...existing,
        id: pm.id,
        name: pm.name,
      });
    } else {
      newMeals.push({
        id: pm.id,
        name: pm.name,
        time: defaultTimes[idx % defaultTimes.length] || '14:00',
        enabled: true,
      });
    }
  });

  return {
    ...settings,
    mealReminders: {
      ...settings.mealReminders,
      meals: newMeals,
    },
  };
}

// Background Reminder Checker (invoked on interval)
export function checkAndTriggerReminders(settings: NotificationSettings): void {
  if (!settings.enabled) return;
  if (getNotificationPermission() !== 'granted') return;

  const now = new Date();
  const todayDateStr = now.toISOString().split('T')[0];
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;

  let firedKeys: Record<string, boolean> = {};
  try {
    const raw = localStorage.getItem(FIRED_TODAY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === todayDateStr) {
        firedKeys = parsed.keys || {};
      }
    }
  } catch (e) {}

  const markKeyFired = (key: string) => {
    firedKeys[key] = true;
    try {
      localStorage.setItem(FIRED_TODAY_KEY, JSON.stringify({ date: todayDateStr, keys: firedKeys }));
    } catch (e) {}
  };

  // 1. Water
  if (settings.waterReminders.enabled) {
    if (currentHour >= settings.waterReminders.startHour && currentHour <= settings.waterReminders.endHour) {
      const lastWaterTime = Number(localStorage.getItem(LAST_WATER_NOTIF_KEY) || '0');
      const intervalMs = settings.waterReminders.intervalMinutes * 60 * 1000;
      const nowMs = Date.now();

      if (nowMs - lastWaterTime >= intervalMs) {
        sendLocalNotification(
          'تذكير شرب الماء 💧',
          getRandomWaterMessage(),
          'water-reminder',
          settings.sound,
          'water'
        );
        localStorage.setItem(LAST_WATER_NOTIF_KEY, String(nowMs));
      }
    }
  }

  // 2. Meals
  if (settings.mealReminders.enabled) {
    settings.mealReminders.meals.forEach((meal) => {
      if (meal.enabled && meal.time === currentTimeStr) {
        const key = `meal_${meal.id}_${currentTimeStr}`;
        if (!firedKeys[key]) {
          markKeyFired(key);
          sendLocalNotification(
            `موعد وجبتك: ${meal.name} 🥗`,
            `حان موعد تناول "${meal.name}" المقررة في خطتك الغذائية مع د. شيماء. بالهنا والشفا!`,
            `meal-${meal.id}`,
            settings.sound,
            'meal'
          );
        }
      }
    });
  }

  // 3. Workout
  if (settings.workoutReminder.enabled && settings.workoutReminder.time === currentTimeStr) {
    const key = `workout_${currentTimeStr}`;
    if (!firedKeys[key]) {
      markKeyFired(key);
      sendLocalNotification(
        'وقت النشاط والرياضة! 🏃‍♂️',
        '30 دقيقة حركة أو مشي هتفرق جداً في صحتك وحرقك ونشاطك اليومي!',
        'workout-reminder',
        settings.sound,
        'meal'
      );
    }
  }

  // 4. Night Review
  if (settings.nightReviewReminder.enabled && settings.nightReviewReminder.time === currentTimeStr) {
    const key = `night_review_${currentTimeStr}`;
    if (!firedKeys[key]) {
      markKeyFired(key);
      sendLocalNotification(
        'مراجعة وتوثيق التزامك اليومي 🌙',
        'افتح التطبيق وسجل وجباتك ومستوى التزامك وشارك تقريرك مع د. شيماء!',
        'night-review',
        settings.sound,
        'meal'
      );
    }
  }
}

// Missed Reminders Catch-Up Detector (Called on App Open)
export function getMissedRemindersOnBoot(settings: NotificationSettings): string[] {
  if (!settings.enabled) return [];
  
  const now = new Date();
  const todayDateStr = now.toISOString().split('T')[0];
  const currentMinutesTotal = now.getHours() * 60 + now.getMinutes();

  let firedKeys: Record<string, boolean> = {};
  try {
    const raw = localStorage.getItem(FIRED_TODAY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === todayDateStr) {
        firedKeys = parsed.keys || {};
      }
    }
  } catch (e) {}

  const missed: string[] = [];

  // Check meals that passed in the last 3 hours (180 mins) without firing
  if (settings.mealReminders.enabled) {
    settings.mealReminders.meals.forEach((meal) => {
      if (!meal.enabled || !meal.time) return;
      const [h, m] = meal.time.split(':').map(Number);
      const mealMinutesTotal = h * 60 + m;
      const diffMinutes = currentMinutesTotal - mealMinutesTotal;

      // Passed within last 180 minutes and not fired
      if (diffMinutes >= 0 && diffMinutes <= 180) {
        const key = `meal_${meal.id}_${meal.time}`;
        if (!firedKeys[key]) {
          missed.push(`وجبة: ${meal.name} (الساعة ${meal.time})`);
        }
      }
    });
  }

  // Store last app boot timestamp
  try {
    localStorage.setItem(LAST_APP_BOOT_KEY, String(Date.now()));
  } catch (e) {}

  return missed;
}

// Immediate Test Notification
export async function sendTestNotification(): Promise<boolean> {
  const perm = await requestNotificationPermission();
  if (!perm) return false;
  return sendLocalNotification(
    'تنبيه تجريبي من دايت د. شيماء 🌿',
    'مبروك! نظام الإشعارات نشط ومقاوم للتقييدات. ستصلك التنبيهات في موعدها تماماً.',
    'test-notif',
    true,
    'test'
  );
}
