import { describe, it, expect, afterEach } from 'vitest';
import {
  SEASONAL_WATER_REMINDERS,
  buildSeasonalActivation,
  applySeasonalWaterReminders,
  restoreSeasonalWaterReminders,
  reconcileSeasonalActivation,
  getSeasonalPhase,
  seasonalPhaseNotice,
  isValidSeasonRange,
  loadSeasonalActivation,
  saveSeasonalActivation,
} from '../src/utils/seasonalTemplate';
import { DEFAULT_NOTIFICATION_SETTINGS, NotificationSettings } from '../src/utils/notifications';

function settingsWithWater(patch: Partial<NotificationSettings['waterReminders']>): NotificationSettings {
  return {
    ...DEFAULT_NOTIFICATION_SETTINGS,
    waterReminders: { ...DEFAULT_NOTIFICATION_SETTINGS.waterReminders, ...patch },
  };
}

const USER_WATER = { enabled: true, intervalMinutes: 90, startHour: 9, endHour: 22 };
const userSettings = settingsWithWater(USER_WATER);
const activation = buildSeasonalActivation('scenario_ramadan', '2027-02-18', '2027-03-19', userSettings, '2027-02-10T10:00:00.000Z');

describe('seasonal template — range & phase (Batch 3.3)', () => {
  it('validates date ranges strictly', () => {
    expect(isValidSeasonRange('2027-02-18', '2027-03-19')).toBe(true);
    expect(isValidSeasonRange('2027-03-19', '2027-02-18')).toBe(false);
    expect(isValidSeasonRange('18-02-2027', '2027-03-19')).toBe(false);
    expect(isValidSeasonRange('', '2027-03-19')).toBe(false);
  });

  it('phase boundaries: start and end days are active (inclusive)', () => {
    expect(getSeasonalPhase(activation, '2027-02-17')).toBe('upcoming');
    expect(getSeasonalPhase(activation, '2027-02-18')).toBe('active');
    expect(getSeasonalPhase(activation, '2027-03-19')).toBe('active');
    expect(getSeasonalPhase(activation, '2027-03-20')).toBe('ended');
  });

  it('notices carry the spec review wording for upcoming/ended', () => {
    expect(seasonalPhaseNotice('upcoming')).toContain('على وشك البدء');
    expect(seasonalPhaseNotice('upcoming')).toContain('راجِع الخطة');
    expect(seasonalPhaseNotice('ended')).toContain('انتهى');
    expect(seasonalPhaseNotice('ended')).toContain('راجِع الخطة');
  });
});

describe('seasonal template — snapshot / apply / restore (Batch 3.3 core)', () => {
  it('buildSeasonalActivation snapshots the user water settings by value', () => {
    const mutable = settingsWithWater(USER_WATER);
    const act = buildSeasonalActivation('scenario_ramadan', '2027-02-18', '2027-03-19', mutable);
    mutable.waterReminders.intervalMinutes = 30;
    expect(act.savedWaterReminders).toEqual(USER_WATER);
  });

  it('apply switches to night-time seasonal values without mutating the input', () => {
    const applied = applySeasonalWaterReminders(userSettings);
    expect(applied.waterReminders).toEqual(SEASONAL_WATER_REMINDERS);
    expect(applied.waterReminders.startHour).toBeGreaterThanOrEqual(18);
    expect(userSettings.waterReminders).toEqual(USER_WATER);
    // بقية أقسام الإعدادات لا تُلمس
    expect(applied.mealReminders).toEqual(userSettings.mealReminders);
    expect(applied.streakReminder).toEqual(userSettings.streakReminder);
  });

  it('restore returns the exact pre-activation water settings (no loss)', () => {
    const duringSeason = applySeasonalWaterReminders(userSettings);
    const restored = restoreSeasonalWaterReminders(duringSeason, activation);
    expect(restored.waterReminders).toEqual(USER_WATER);
  });

  it('seasonal defaults are night-oriented and enabled', () => {
    expect(SEASONAL_WATER_REMINDERS.enabled).toBe(true);
    expect(SEASONAL_WATER_REMINDERS.startHour).toBe(18);
    expect(SEASONAL_WATER_REMINDERS.endHour).toBe(23);
  });
});

describe('seasonal template — boot reconciliation (Batch 3.3)', () => {
  it('no activation → untouched', () => {
    const r = reconcileSeasonalActivation(userSettings, null, '2027-02-20');
    expect(r.changed).toBe(false);
    expect(r.cleared).toBe(false);
    expect(r.settings).toBe(userSettings);
  });

  it('upcoming season → settings untouched, record kept', () => {
    const r = reconcileSeasonalActivation(userSettings, activation, '2027-02-10');
    expect(r.changed).toBe(false);
    expect(r.cleared).toBe(false);
    expect(r.phase).toBe('upcoming');
  });

  it('active season → seasonal water applied', () => {
    const r = reconcileSeasonalActivation(userSettings, activation, '2027-03-01');
    expect(r.phase).toBe('active');
    expect(r.changed).toBe(true);
    expect(r.cleared).toBe(false);
    expect(r.settings.waterReminders).toEqual(SEASONAL_WATER_REMINDERS);
  });

  it('active season reconcile is idempotent', () => {
    const once = reconcileSeasonalActivation(userSettings, activation, '2027-03-01');
    const twice = reconcileSeasonalActivation(once.settings, activation, '2027-03-02');
    expect(twice.changed).toBe(false);
  });

  it('ended season → previous settings restored and record cleared', () => {
    const duringSeason = applySeasonalWaterReminders(userSettings);
    const r = reconcileSeasonalActivation(duringSeason, activation, '2027-03-25');
    expect(r.phase).toBe('ended');
    expect(r.cleared).toBe(true);
    expect(r.settings.waterReminders).toEqual(USER_WATER);
  });
});

describe('seasonal template — storage wrappers (Batch 3.3)', () => {
  const store = new Map<string, string>();
  (globalThis as Record<string, unknown>).localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
  afterEach(() => {
    store.clear();
    delete (globalThis as Record<string, unknown>).localStorage;
  });

  it('save → load round-trips, and saving null clears', () => {
    saveSeasonalActivation(activation);
    expect(loadSeasonalActivation()).toEqual(activation);
    saveSeasonalActivation(null);
    expect(loadSeasonalActivation()).toBeNull();
  });

  it('corrupt stored record loads as null instead of throwing', () => {
    saveSeasonalActivation(activation);
    const key = [...store.keys()][0];
    store.set(key, '{"presetId":123}');
    expect(loadSeasonalActivation()).toBeNull();
    store.set(key, 'not-json');
    expect(loadSeasonalActivation()).toBeNull();
  });
});
