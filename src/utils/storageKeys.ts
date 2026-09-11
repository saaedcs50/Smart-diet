import { BRAND } from '../config/brand';

/**
 * عزل بيانات كل عيادة على نفس الجهاز.
 * المفاتيح القديمة (nt_v6_egypt_*, smartdiet_*) تُرحَّل مرة واحدة للنسخة الحالية فقط.
 */

function slugify(raw: string): string {
  return String(raw || 'app')
    .toLowerCase()
    .replace(/[^\w\u0600-\u06ff]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'app';
}

/** slug ثابت لكل build/عيادة من الهوية */
export function brandStorageSlug(): string {
  return slugify(BRAND.shortName || BRAND.appName || 'app');
}

export function ns(key: string): string {
  return `sd_${brandStorageSlug()}_${key}`;
}

/** مفاتيح التطبيق بعد العزل */
export const StorageKeys = {
  plan: () => ns('plan'),
  dayPrefix: () => ns('day_'),
  activeFasting: () => ns('active_fasting'),
  notificationSettings: () => ns('notification_settings'),
  lastWaterNotif: () => ns('last_water_notif'),
  firedNotifsToday: () => ns('fired_notifs_today'),
  lastAppBoot: () => ns('last_app_boot'),
  darkMode: () => ns('dark_mode'),
  onboardingSeen: () => ns('onboarding_seen'),
  coachOnboardingSeen: () => ns('coach_onboarding_seen'),
  coachSessionToken: () => ns('coach_session_token'),
  coachUnlocked: () => ns('coach_unlocked'),
  /** SHA-256 لهاش PIN بعد أول دخول ناجح عبر السيرفر: ليس الرقم نفسه */
  coachPinHash: () => ns('coach_pin_hash'),
  migratedFlag: () => ns('migrated_v1'),
  photoDbName: () => `sd_${brandStorageSlug()}_photos_db`,
};

/** المفاتيح القديمة قبل white-label / العزل */
const LEGACY = {
  plan: 'nt_v6_egypt_plan',
  dayPrefix: 'nt_v6_egypt_day_',
  activeFasting: 'smartdiet_active_fasting_session',
  notificationSettings: 'nt_notification_settings',
  lastWaterNotif: 'nt_last_water_notif',
  firedNotifsToday: 'nt_fired_notifs_today',
  lastAppBoot: 'nt_last_app_boot_timestamp',
  darkMode: 'nt_dark_mode',
  onboardingSeen: 'smartdiet_onboarding_seen',
  coachOnboardingSeen: 'smartdiet_coach_onboarding_seen',
  coachSessionToken: 'smartdiet_coach_session_token',
  coachUnlocked: 'smartdiet_coach_unlocked',
  photoDbName: 'nt_private_photos_db',
} as const;

function copyIfMissing(oldKey: string, newKey: string): void {
  try {
    if (localStorage.getItem(newKey) != null) return;
    const val = localStorage.getItem(oldKey);
    if (val != null) localStorage.setItem(newKey, val);
  } catch {
    // ignore quota / private mode
  }
}

/**
 * ترحيل مرة واحدة من المفاتيح العامة القديمة → مفاتيح العيادة الحالية.
 * لا يحذف القديم حتى لا نخسر بيانات لو فيه نسخة قديمة لسه بتتشغّل.
 */
export function migrateLegacyStorageOnce(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    if (localStorage.getItem(StorageKeys.migratedFlag()) === '1') return;

    copyIfMissing(LEGACY.plan, StorageKeys.plan());
    copyIfMissing(LEGACY.activeFasting, StorageKeys.activeFasting());
    copyIfMissing(LEGACY.notificationSettings, StorageKeys.notificationSettings());
    copyIfMissing(LEGACY.lastWaterNotif, StorageKeys.lastWaterNotif());
    copyIfMissing(LEGACY.firedNotifsToday, StorageKeys.firedNotifsToday());
    copyIfMissing(LEGACY.lastAppBoot, StorageKeys.lastAppBoot());
    copyIfMissing(LEGACY.darkMode, StorageKeys.darkMode());
    copyIfMissing(LEGACY.onboardingSeen, StorageKeys.onboardingSeen());
    copyIfMissing(LEGACY.coachOnboardingSeen, StorageKeys.coachOnboardingSeen());

    const dayPrefixNew = StorageKeys.dayPrefix();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(LEGACY.dayPrefix)) continue;
      const dateStr = key.slice(LEGACY.dayPrefix.length);
      copyIfMissing(key, dayPrefixNew + dateStr);
    }

    localStorage.setItem(StorageKeys.migratedFlag(), '1');
  } catch (e) {
    console.warn('storage migration skipped', e);
  }
}

export const LEGACY_PHOTO_DB = LEGACY.photoDbName;
