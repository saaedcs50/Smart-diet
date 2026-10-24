import { describe, it, expect } from 'vitest';
import { createEmptyDayLog, DEFAULT_PLAN } from '../src/utils/storage';
import { DayLog, PlanConfig, WeeklyFocusConfig } from '../src/types';
import {
  getWeekDates,
  computeFocusTypeProgress,
  computeWeeklyFocusProgress,
  getWeeklyFocusVisibility,
  formatWeeklyFocusSummary,
} from '../src/utils/weeklyFocus';

const PLAN: PlanConfig = {
  ...DEFAULT_PLAN,
  meals: [
    { id: 'm1', name: 'إفطار', items: 'بيض', alternatives: [] },
    { id: 'm2', name: 'غداء', items: 'دجاج', alternatives: [] },
  ],
  checklist: [
    { id: 'c1', label: 'أ' },
    { id: 'c2', label: 'ب' },
  ],
};

const WEEK_START = '2026-10-19'; // Monday

function focus(type: WeeklyFocusConfig['type'], target: number): WeeklyFocusConfig {
  return { type, target, weekStartISO: WEEK_START, label: type === 'custom' ? 'المشي بعد العشاء' : undefined };
}

function dayWith(patch: Partial<DayLog>): DayLog {
  return { ...createEmptyDayLog(), ...patch };
}

describe('weeklyFocus — week dates & visibility (Batch 2.4)', () => {
  it('week dates are 7 consecutive days from the start', () => {
    const dates = getWeekDates(WEEK_START);
    expect(dates).toHaveLength(7);
    expect(dates[0]).toBe('2026-10-19');
    expect(dates[6]).toBe('2026-10-25');
  });

  it('visibility: active inside the week, final-day one day after, hidden later', () => {
    const f = focus('water', 14000);
    expect(getWeeklyFocusVisibility(f, '2026-10-19')).toBe('active');
    expect(getWeeklyFocusVisibility(f, '2026-10-25')).toBe('active');
    expect(getWeeklyFocusVisibility(f, '2026-10-26')).toBe('final-day');
    expect(getWeeklyFocusVisibility(f, '2026-10-27')).toBe('hidden');
    expect(getWeeklyFocusVisibility(f, '2026-10-18')).toBe('hidden');
  });

  it('no focus configured → hidden everywhere', () => {
    expect(getWeeklyFocusVisibility(undefined, '2026-10-20')).toBe('hidden');
    expect(getWeeklyFocusVisibility(null, '2026-10-20')).toBe('hidden');
    expect(getWeeklyFocusVisibility({ type: 'water', target: 0, weekStartISO: WEEK_START }, '2026-10-20')).toBe(
      'hidden'
    );
  });
});

describe('weeklyFocus — progress per type (Batch 2.4)', () => {
  it('water sums ml across the week only', () => {
    const logs = {
      '2026-10-19': dayWith({ water: 2000 }),
      '2026-10-20': dayWith({ water: 1500 }),
      '2026-10-26': dayWith({ water: 9000 }), // خارج الأسبوع
    };
    expect(computeFocusTypeProgress(focus('water', 14000), PLAN, logs)).toBe(3500);
  });

  it('sleep sums effective sleep hours', () => {
    const logs = {
      '2026-10-19': dayWith({ sleepHours: 7.5 }),
      '2026-10-21': dayWith({ sleepHours: 6.5 }),
    };
    expect(computeFocusTypeProgress(focus('sleep', 49), PLAN, logs)).toBe(14);
  });

  it('meals counts recorded meals (default/alt) across plan meals', () => {
    const logs = {
      '2026-10-19': dayWith({ meals: { m1: { type: 'default' }, m2: { type: 'none' } } }),
      '2026-10-20': dayWith({ meals: { m1: { type: 'alt' }, m2: { type: 'default' } } }),
    };
    expect(computeFocusTypeProgress(focus('meals', 14), PLAN, logs)).toBe(3);
  });

  it('checklist counts true check items', () => {
    const logs = {
      '2026-10-19': dayWith({ checks: { c1: true, c2: false } }),
      '2026-10-20': dayWith({ checks: { c1: true, c2: true } }),
    };
    expect(computeFocusTypeProgress(focus('checklist', 14), PLAN, logs)).toBe(3);
  });

  it('custom counts days flagged focusDone — once per day by construction', () => {
    const logs = {
      '2026-10-19': dayWith({ focusDone: true }),
      '2026-10-20': dayWith({ focusDone: true }),
      '2026-10-21': dayWith({}),
    };
    expect(computeFocusTypeProgress(focus('custom', 5), PLAN, logs)).toBe(2);
  });

  it('progress percent caps at 100 and completion is flagged', () => {
    const logs = { '2026-10-19': dayWith({ water: 99999 }) };
    const p = computeWeeklyFocusProgress(focus('water', 14000), PLAN, logs);
    expect(p.percent).toBe(100);
    expect(p.completed).toBe(true);
    const p2 = computeWeeklyFocusProgress(focus('water', 14000), PLAN, {
      '2026-10-19': dayWith({ water: 7000 }),
    });
    expect(p2.percent).toBe(50);
    expect(p2.completed).toBe(false);
  });

  it('missing logs produce zero progress without errors', () => {
    expect(computeWeeklyFocusProgress(focus('water', 14000), PLAN, {})).toEqual({
      current: 0,
      target: 14000,
      percent: 0,
      completed: false,
    });
    expect(computeWeeklyFocusProgress(focus('water', 14000), PLAN, null).current).toBe(0);
  });

  it('summary line is one readable Arabic line with state', () => {
    const line = formatWeeklyFocusSummary(focus('water', 14000), {
      current: 7000,
      target: 14000,
      percent: 50,
      completed: false,
    });
    expect(line).toContain('هدف الأسبوع');
    expect(line).toContain('7000/14000');
    expect(line).toContain('50%');
  });
});
