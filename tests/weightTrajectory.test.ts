import { describe, it, expect } from 'vitest';
import { createEmptyDayLog } from '../src/utils/storage';
import { DayLog } from '../src/types';
import {
  collectWeightPoints,
  expectedWeightAt,
  buildExpectedSeries,
  getTrajectoryStatus,
  buildTrajectory,
} from '../src/utils/weightTrajectory';

function logsWithWeights(entries: [string, number | null][]): Record<string, DayLog> {
  const logs: Record<string, DayLog> = {};
  for (const [date, weight] of entries) {
    const day = createEmptyDayLog();
    day.weight = weight;
    logs[date] = day;
  }
  return logs;
}

describe('weightTrajectory — collect points (Batch 2.2)', () => {
  it('collects valid weights sorted by date and skips missing days', () => {
    const logs = logsWithWeights([
      ['2026-10-10', 89],
      ['2026-10-03', 90],
      ['2026-10-05', null],
      ['2026-10-07', 89.5],
    ]);
    const points = collectWeightPoints(logs);
    expect(points.map((p) => p.date)).toEqual(['2026-10-03', '2026-10-07', '2026-10-10']);
    expect(points.map((p) => p.weight)).toEqual([90, 89.5, 89]);
  });
});

describe('weightTrajectory — expected series (Batch 2.2)', () => {
  it('moves from start toward target at the safe mid-rate (0.75%/week)', () => {
    // start 100 → after 1 week: 99.25, after 2 weeks: 98.5
    expect(expectedWeightAt(100, 80, '2026-10-01', '2026-10-08')).toBeCloseTo(99.25, 2);
    expect(expectedWeightAt(100, 80, '2026-10-01', '2026-10-15')).toBeCloseTo(98.5, 2);
  });

  it('never overshoots the target in either direction', () => {
    expect(expectedWeightAt(90, 88, '2026-10-01', '2027-10-01')).toBe(88);
    expect(expectedWeightAt(60, 65, '2026-10-01', '2027-10-01')).toBe(65);
  });

  it('gain direction rises toward target', () => {
    expect(expectedWeightAt(60, 70, '2026-10-01', '2026-10-08')).toBeCloseTo(60.45, 2);
  });

  it('series includes weekly points plus the end date', () => {
    const series = buildExpectedSeries(100, 80, '2026-10-01', '2026-10-20');
    expect(series[0]).toEqual({ date: '2026-10-01', weight: 100 });
    expect(series[series.length - 1].date).toBe('2026-10-20');
    expect(series.length).toBe(4); // 1, 8, 15 + end 20
  });
});

describe('weightTrajectory — status badge (Batch 2.2)', () => {
  it('within ±0.5 kg of expected is on-track', () => {
    expect(getTrajectoryStatus(89.4, 89.0, 100, 80)).toBe('on-track');
    expect(getTrajectoryStatus(88.6, 89.0, 100, 80)).toBe('on-track');
  });

  it('loss direction: lighter than expected-0.5 is faster, heavier is slower', () => {
    expect(getTrajectoryStatus(88.0, 89.0, 100, 80)).toBe('faster');
    expect(getTrajectoryStatus(90.0, 89.0, 100, 80)).toBe('slower');
  });

  it('gain direction: heavier than expected+0.5 is faster, lighter is slower', () => {
    expect(getTrajectoryStatus(62.0, 61.0, 60, 70)).toBe('faster');
    expect(getTrajectoryStatus(60.0, 61.0, 60, 70)).toBe('slower');
  });
});

describe('weightTrajectory — buildTrajectory gates (Batch 2.2)', () => {
  const threePoints = logsWithWeights([
    ['2026-10-01', 100],
    ['2026-10-08', 99.2],
    ['2026-10-15', 98.6],
  ]);

  it('returns data with ≥3 points + start + target', () => {
    const t = buildTrajectory(threePoints, 100, 80, '2026-10-15');
    expect(t).not.toBeNull();
    expect(t!.anchorDate).toBe('2026-10-01');
    expect(t!.latestActual.weight).toBe(98.6);
    expect(t!.status).toBe('on-track');
  });

  it('returns null with fewer than 3 points', () => {
    const two = logsWithWeights([
      ['2026-10-01', 100],
      ['2026-10-08', 99],
    ]);
    expect(buildTrajectory(two, 100, 80)).toBeNull();
  });

  it('returns null when start or target is missing or equal', () => {
    expect(buildTrajectory(threePoints, null, 80)).toBeNull();
    expect(buildTrajectory(threePoints, 100, null)).toBeNull();
    expect(buildTrajectory(threePoints, 100, 100)).toBeNull();
  });

  it('handles sparse weights without errors', () => {
    const sparse = logsWithWeights([
      ['2026-10-01', 100],
      ['2026-10-03', null],
      ['2026-10-20', 98],
      ['2026-11-05', 97],
    ]);
    const t = buildTrajectory(sparse, 100, 80);
    expect(t).not.toBeNull();
    expect(t!.actualPoints).toHaveLength(3);
  });
});
