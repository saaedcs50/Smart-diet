import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createEmptyDayLog } from '../src/utils/storage';
import {
  hasAnyDayActivity,
  shouldFireStreakReminder,
  buildStreakReminderMessage,
  StreakReminderInput,
} from '../src/utils/streakReminder';
import { DayLog } from '../src/types';

const baseInput = (day: DayLog): StreakReminderInput => ({
  masterEnabled: true,
  reminderEnabled: true,
  reminderTime: '20:30',
  currentTime: '20:30',
  streak: 5,
  day,
  permission: 'granted',
});

describe('streakReminder — hasAnyDayActivity (Batch 1.4)', () => {
  it('empty day has no activity', () => {
    expect(hasAnyDayActivity(createEmptyDayLog())).toBe(false);
    expect(hasAnyDayActivity(null)).toBe(false);
    expect(hasAnyDayActivity(undefined)).toBe(false);
  });

  it('any single signal counts as activity', () => {
    const byWater = createEmptyDayLog();
    byWater.water = 250;
    expect(hasAnyDayActivity(byWater)).toBe(true);

    const byMeal = createEmptyDayLog();
    byMeal.meals = { m1: { eval: 'yes' } };
    expect(hasAnyDayActivity(byMeal)).toBe(true);

    const byCheck = createEmptyDayLog();
    byCheck.checks = { c1: true };
    expect(hasAnyDayActivity(byCheck)).toBe(true);

    const byWeight = createEmptyDayLog();
    byWeight.weight = 80;
    expect(hasAnyDayActivity(byWeight)).toBe(true);

    const byMed = createEmptyDayLog();
    byMed.medications = { k: { status: 'taken' } };
    expect(hasAnyDayActivity(byMed)).toBe(true);
  });
});

describe('streakReminder — shouldFireStreakReminder matrix (Batch 1.4)', () => {
  it('fires when streak ≥ 3, no activity today, enabled, time matches, permission granted', () => {
    expect(shouldFireStreakReminder(baseInput(createEmptyDayLog()))).toBe(true);
  });

  it('does not fire after any activity is logged today', () => {
    const day = createEmptyDayLog();
    day.water = 250;
    expect(shouldFireStreakReminder(baseInput(day))).toBe(false);
  });

  it('does not fire on freeze days', () => {
    const day = createEmptyDayLog();
    day.isFreeze = true;
    expect(shouldFireStreakReminder(baseInput(day))).toBe(false);
  });

  it('does not fire when the reminder or the master switch is off', () => {
    const day = createEmptyDayLog();
    expect(shouldFireStreakReminder({ ...baseInput(day), reminderEnabled: false })).toBe(false);
    expect(shouldFireStreakReminder({ ...baseInput(day), masterEnabled: false })).toBe(false);
  });

  it('does not fire without granted permission, and never throws', () => {
    const day = createEmptyDayLog();
    expect(shouldFireStreakReminder({ ...baseInput(day), permission: 'denied' })).toBe(false);
    expect(shouldFireStreakReminder({ ...baseInput(day), permission: 'default' })).toBe(false);
    expect(shouldFireStreakReminder({ ...baseInput(day), permission: 'unsupported' })).toBe(false);
  });

  it('does not fire for streaks below 3 or at other times', () => {
    const day = createEmptyDayLog();
    expect(shouldFireStreakReminder({ ...baseInput(day), streak: 2 })).toBe(false);
    expect(shouldFireStreakReminder({ ...baseInput(day), streak: 3 })).toBe(true);
    expect(shouldFireStreakReminder({ ...baseInput(day), currentTime: '20:31' })).toBe(false);
  });

  it('message is friendly and includes the streak length', () => {
    expect(buildStreakReminderMessage(7)).toContain('7');
    expect(buildStreakReminderMessage(7)).toContain('سلسلتك');
  });
});

describe('streakReminder — notification settings defaults (Batch 1.4)', () => {
  const store = new Map<string, string>();
  beforeAll(() => {
    (globalThis as Record<string, unknown>).window = globalThis;
    (globalThis as Record<string, unknown>).localStorage = {
      getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
      clear: () => store.clear(),
      key: (i: number) => [...store.keys()][i] ?? null,
      get length() {
        return store.size;
      },
    };
  });
  afterAll(() => {
    delete (globalThis as Record<string, unknown>).window;
    delete (globalThis as Record<string, unknown>).localStorage;
  });

  it('defaults: streakReminder enabled at 20:30, and legacy settings merge safely', async () => {
    const { DEFAULT_NOTIFICATION_SETTINGS, loadNotificationSettings } = await import(
      '../src/utils/notifications'
    );
    const { StorageKeys } = await import('../src/utils/storageKeys');
    expect(DEFAULT_NOTIFICATION_SETTINGS.streakReminder).toEqual({ enabled: true, time: '20:30' });

    // إعدادات قديمة بلا streakReminder لا تنكسر وتأخذ الافتراضي
    store.set(
      StorageKeys.notificationSettings(),
      JSON.stringify({ enabled: true, sound: false })
    );
    const loaded = loadNotificationSettings();
    expect(loaded.streakReminder).toEqual({ enabled: true, time: '20:30' });
    expect(loaded.enabled).toBe(true);

    // إعدادات محفوظة بقيم مخصصة تُحترم
    store.set(
      StorageKeys.notificationSettings(),
      JSON.stringify({ streakReminder: { enabled: false, time: '21:00' } })
    );
    const custom = loadNotificationSettings();
    expect(custom.streakReminder).toEqual({ enabled: false, time: '21:00' });
  });
});
