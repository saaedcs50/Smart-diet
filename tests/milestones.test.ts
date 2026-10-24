import { describe, it, expect } from 'vitest';
import { createEmptyDayLog, DEFAULT_PLAN } from '../src/utils/storage';
import { DayLog, PlanConfig } from '../src/types';
import {
  computeMilestones,
  resolveMilestoneState,
  getNextMilestone,
} from '../src/utils/milestones';

function dayWith(patch: Partial<DayLog>): DayLog {
  return { ...createEmptyDayLog(), ...patch };
}

function freezeRange(startISO: string, days: number): Record<string, DayLog> {
  const logs: Record<string, DayLog> = {};
  const start = new Date(`${startISO}T00:00:00`);
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    logs[key] = dayWith({ isFreeze: true });
  }
  return logs;
}

const PLAN: PlanConfig = { ...DEFAULT_PLAN, startWeight: 100, targetWeight: 80 };

describe('milestones — streak & logging (Batch 2.3)', () => {
  it('first_day unlocks on the first active day only', () => {
    const logs = { '2026-10-05': dayWith({ water: 250 }) };
    const m = computeMilestones(PLAN, logs);
    expect(m.first_day).toBe('2026-10-05');
    expect(m.streak_7).toBeUndefined();
  });

  it('streak_7 unlocks exactly on the 7th consecutive qualifying day', () => {
    const six = freezeRange('2026-10-01', 6);
    expect(computeMilestones(PLAN, six).streak_7).toBeUndefined();
    const seven = freezeRange('2026-10-01', 7);
    expect(computeMilestones(PLAN, seven).streak_7).toBe('2026-10-07');
  });

  it('a gap breaks the streak run', () => {
    const logs = { ...freezeRange('2026-10-01', 6), ...freezeRange('2026-10-08', 6) };
    // 10-07 missing → two runs of 6, never 7
    expect(computeMilestones(PLAN, logs).streak_7).toBeUndefined();
  });

  it('streak_30 and logging_30 unlock on day 30 of a continuous run', () => {
    const logs = freezeRange('2026-09-01', 30);
    const m = computeMilestones(PLAN, logs);
    expect(m.streak_30).toBe('2026-09-30');
    expect(m.logging_30).toBe('2026-09-30');
  });

  it('logging_30 counts cumulative active days even without a streak', () => {
    const logs: Record<string, DayLog> = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date(2026, 0, 1 + i * 3); // every 3rd day — no streak
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      logs[key] = dayWith({ water: 100 });
    }
    const m = computeMilestones(PLAN, logs);
    expect(m.logging_30).toBeTruthy();
    expect(m.streak_7).toBeUndefined();
  });
});

describe('milestones — weight loss percentages (Batch 2.3)', () => {
  it('unlocks 2/5/10% at the first dates the thresholds are crossed', () => {
    const logs = {
      '2026-10-01': dayWith({ weight: 99 }), // 1% — nothing
      '2026-10-08': dayWith({ weight: 97.9 }), // 2.1% → 2%
      '2026-10-15': dayWith({ weight: 94.8 }), // 5.2% → 5%
      '2026-10-22': dayWith({ weight: 89.5 }), // 10.5% → 10%
    };
    const m = computeMilestones(PLAN, logs);
    expect(m.weight_loss_2).toBe('2026-10-08');
    expect(m.weight_loss_5).toBe('2026-10-15');
    expect(m.weight_loss_10).toBe('2026-10-22');
  });

  it('missing start weight disables only the percentage milestones', () => {
    const planNoStart: PlanConfig = { ...DEFAULT_PLAN, startWeight: null };
    const logs = { '2026-10-01': dayWith({ weight: 50, water: 100 }) };
    const m = computeMilestones(planNoStart, logs);
    expect(m.weight_loss_2).toBeUndefined();
    expect(m.first_day).toBe('2026-10-01');
  });

  it('weight gain never unlocks loss milestones', () => {
    const logs = { '2026-10-01': dayWith({ weight: 105 }) };
    expect(computeMilestones(PLAN, logs).weight_loss_2).toBeUndefined();
  });
});

describe('milestones — first shared report & resolution (Batch 2.3)', () => {
  it('first_report uses the stored share date', () => {
    const m = computeMilestones(PLAN, {}, '2026-10-20T09:30:00.000Z');
    expect(m.first_report).toBe('2026-10-20');
    expect(computeMilestones(PLAN, {}).first_report).toBeUndefined();
  });

  it('stored unlock dates never change; new ones are detected', () => {
    const stored = { first_day: '2026-09-01' };
    const computed = { first_day: '2026-10-01', streak_7: '2026-10-07' };
    const res = resolveMilestoneState(stored, computed);
    expect(res.unlocked.first_day).toBe('2026-09-01'); // أقدم تاريخ محفوظ يفوز
    expect(res.newlyUnlocked).toEqual(['streak_7']);
    expect(res.celebrationId).toBe('streak_7');
  });

  it('retroactive first run: many preexisting milestones, celebration is the latest only', () => {
    const computed = {
      first_day: '2026-09-01',
      streak_7: '2026-09-07',
      logging_30: '2026-09-30',
      weight_loss_2: '2026-09-20',
    };
    const res = resolveMilestoneState({}, computed);
    expect(res.newlyUnlocked).toHaveLength(4);
    expect(res.celebrationId).toBe('logging_30'); // الأحدث تاريخًا (2026-09-30)
  });

  it('no new milestones → no celebration', () => {
    const res = resolveMilestoneState({ first_day: '2026-09-01' }, { first_day: '2026-09-01' });
    expect(res.newlyUnlocked).toEqual([]);
    expect(res.celebrationId).toBeNull();
  });

  it('getNextMilestone returns the first locked definition, null when all open', () => {
    expect(getNextMilestone({})?.id).toBe('first_day');
    expect(getNextMilestone({ first_day: '2026-01-01' })?.id).toBe('streak_7');
  });
});
