import { describe, it, expect } from 'vitest';
import { createEmptyDayLog, DEFAULT_PLAN } from '../src/utils/storage';
import {
  findLastActivityDate,
  computeAbsenceGap,
  shouldShowWelcomeBack,
  buildWelcomeBackMessage,
  buildWelcomeBackWhatsAppText,
} from '../src/utils/welcomeBack';
import { DayLog } from '../src/types';

function logsWithActivity(...dates: string[]): Record<string, DayLog> {
  const logs: Record<string, DayLog> = {};
  for (const d of dates) {
    const day = createEmptyDayLog();
    day.water = 500;
    logs[d] = day;
  }
  return logs;
}

describe('welcomeBack — findLastActivityDate (Batch 1.5)', () => {
  it('returns the latest date that has activity', () => {
    const logs = logsWithActivity('2026-10-18', '2026-10-21', '2026-10-20');
    expect(findLastActivityDate(logs)).toBe('2026-10-21');
  });

  it('ignores stored days without activity and returns null when none', () => {
    const logs: Record<string, DayLog> = {
      '2026-10-21': createEmptyDayLog(),
      '2026-10-22': createEmptyDayLog(),
    };
    expect(findLastActivityDate(logs)).toBeNull();
    expect(findLastActivityDate({})).toBeNull();
  });
});

describe('welcomeBack — computeAbsenceGap (Batch 1.5)', () => {
  it('gap is 0 when activity is today, and counts full days otherwise', () => {
    expect(computeAbsenceGap(logsWithActivity('2026-10-24'), '2026-10-24').gapDays).toBe(0);
    expect(computeAbsenceGap(logsWithActivity('2026-10-22'), '2026-10-24').gapDays).toBe(2);
    expect(computeAbsenceGap(logsWithActivity('2026-10-21'), '2026-10-24').gapDays).toBe(3);
    expect(computeAbsenceGap(logsWithActivity('2026-10-19'), '2026-10-24').gapDays).toBe(5);
  });

  it('no logs at all → no last activity and gap 0', () => {
    const gap = computeAbsenceGap({}, '2026-10-24');
    expect(gap.lastActivityDate).toBeNull();
    expect(gap.gapDays).toBe(0);
  });
});

describe('welcomeBack — shouldShowWelcomeBack (Batch 1.5)', () => {
  it('shows for gaps of 3+ days that were not shown before', () => {
    const gap = computeAbsenceGap(logsWithActivity('2026-10-21'), '2026-10-24');
    expect(shouldShowWelcomeBack(gap, null)).toBe(true);
    expect(shouldShowWelcomeBack(gap, undefined)).toBe(true);
  });

  it('does not show for normal daily use (gap < 3)', () => {
    const gap = computeAbsenceGap(logsWithActivity('2026-10-23'), '2026-10-24');
    expect(shouldShowWelcomeBack(gap, null)).toBe(false);
  });

  it('shows only once per gap, but a new gap shows again', () => {
    const gap = computeAbsenceGap(logsWithActivity('2026-10-21'), '2026-10-24');
    expect(shouldShowWelcomeBack(gap, '2026-10-21')).toBe(false);
    const newGap = computeAbsenceGap(logsWithActivity('2026-10-25'), '2026-10-29');
    expect(shouldShowWelcomeBack(newGap, '2026-10-21')).toBe(true);
  });

  it('message and WhatsApp text carry the gap and client name', () => {
    expect(buildWelcomeBackMessage(4)).toContain('4');
    const text = buildWelcomeBackWhatsAppText(DEFAULT_PLAN, 4);
    expect(text).toContain(DEFAULT_PLAN.clientName);
    expect(text).toContain('4');
    expect(text).toContain('رجعت');
  });
});
