import { describe, it, expect } from 'vitest';
import { createEmptyDayLog } from '../src/utils/storage';
import {
  buildCopiedDayLog,
  getCopySummary,
  hasCopyableContent,
  isDayEmptyOrPartial,
} from '../src/utils/dayCopy';
import { DayLog } from '../src/types';

function fullSourceDay(): DayLog {
  const day = createEmptyDayLog();
  day.meals = {
    m_breakfast: { type: 'default', eval: 'yes', protein: true, veggies: true, hungerBefore: 4, fullnessAfter: 7 },
    m_lunch: { type: 'alt', eval: 'yes', detail: 'بديل' },
  };
  day.medications = {
    'med1__morning': { status: 'taken', time: '08:00' },
    'med2__evening': { status: 'skipped' },
    'med3__morning': { status: 'postponed' },
  };
  day.water = 1500;
  day.waterLogs = 6;
  day.checks = { c1: true, c2: false, c3: true };
  // حقول ممنوعة من النسخ:
  day.weight = 82;
  day.meas.waist = 95;
  day.sleep = '23:00';
  day.wake = '07:00';
  day.sleepHours = 8;
  day.quality = 'ممتاز';
  day.mood = 5;
  day.symptoms = { sy1: true };
  day.symNotes = 'ملاحظة أعراض';
  day.notes = 'ملاحظة اليوم';
  day.exercise = 45;
  day.completedFastingHours = 16;
  day.consumedCalories = 1800;
  return day;
}

describe('dayCopy — buildCopiedDayLog (Batch 1.1)', () => {
  it('copies meals, taken meds, water and checks from a full day', () => {
    const result = buildCopiedDayLog(fullSourceDay(), '2026-10-24');
    expect(Object.keys(result.meals)).toEqual(['m_breakfast', 'm_lunch']);
    expect(result.meals.m_breakfast.eval).toBe('yes');
    expect(result.water).toBe(1500);
    expect(result.waterLogs).toBe(6);
    expect(result.checks).toEqual({ c1: true, c2: false, c3: true });
    // الأدوية: المأخوذة فقط
    expect(Object.keys(result.medications || {})).toEqual(['med1__morning']);
    expect(result.medications?.['med1__morning'].status).toBe('taken');
  });

  it('never copies day-specific fields (weight/sleep/mood/symptoms/notes/fasting)', () => {
    const result = buildCopiedDayLog(fullSourceDay(), '2026-10-24');
    expect(result.weight).toBeNull();
    expect(result.meas.waist).toBeNull();
    expect(result.sleep).toBe('');
    expect(result.wake).toBe('');
    expect(result.sleepHours).toBeNull();
    expect(result.quality).toBe('');
    expect(result.mood).toBeNull();
    expect(result.symptoms).toEqual({});
    expect(result.symNotes).toBe('');
    expect(result.notes).toBe('');
    expect(result.exercise).toBe(0);
    expect(result.completedFastingHours).toBeNull();
    expect(result.consumedCalories).toBe(0);
    expect(result.isFreeze).toBe(false);
  });

  it('strips hunger/fullness from copied meal states', () => {
    const result = buildCopiedDayLog(fullSourceDay(), '2026-10-24');
    expect(result.meals.m_breakfast.hungerBefore).toBeUndefined();
    expect(result.meals.m_breakfast.fullnessAfter).toBeUndefined();
    expect(result.meals.m_breakfast.protein).toBe(true);
  });

  it("preserves the target day's own fields when merging into an existing day", () => {
    const target = createEmptyDayLog();
    target.weight = 80;
    target.sleep = '22:30';
    target.sleepHours = 7.5;
    const result = buildCopiedDayLog(fullSourceDay(), '2026-10-24', target);
    expect(result.weight).toBe(80);
    expect(result.sleep).toBe('22:30');
    expect(result.sleepHours).toBe(7.5);
    expect(result.water).toBe(1500);
  });

  it('handles partial and empty source days without errors', () => {
    const partial = createEmptyDayLog();
    partial.water = 250;
    const r1 = buildCopiedDayLog(partial, '2026-10-24');
    expect(r1.water).toBe(250);
    expect(r1.meals).toEqual({});

    const r2 = buildCopiedDayLog(createEmptyDayLog(), '2026-10-24');
    expect(r2.water).toBe(0);
    expect(hasCopyableContent(r2)).toBe(false);
  });

  it('does not mutate the source day', () => {
    const source = fullSourceDay();
    const result = buildCopiedDayLog(source, '2026-10-24');
    result.meals.m_breakfast.eval = 'no';
    result.checks.c1 = false;
    expect(source.meals.m_breakfast.eval).toBe('yes');
    expect(source.checks.c1).toBe(true);
  });
});

describe('dayCopy — helpers', () => {
  it('hasCopyableContent detects each category and rejects empty days', () => {
    expect(hasCopyableContent(null)).toBe(false);
    expect(hasCopyableContent(createEmptyDayLog())).toBe(false);
    const byChecks = createEmptyDayLog();
    byChecks.checks = { c1: true };
    expect(hasCopyableContent(byChecks)).toBe(true);
    const skippedOnly = createEmptyDayLog();
    skippedOnly.medications = { k: { status: 'skipped' } };
    expect(hasCopyableContent(skippedOnly)).toBe(false);
  });

  it('getCopySummary counts what will be copied', () => {
    const s = getCopySummary(fullSourceDay());
    expect(s).toEqual({ mealsCount: 2, medicationsTakenCount: 1, waterMl: 1500, checksCount: 2 });
  });

  it('isDayEmptyOrPartial: empty=true, partial=true, full=false', () => {
    expect(isDayEmptyOrPartial(createEmptyDayLog())).toBe(true);
    const partial = createEmptyDayLog();
    partial.water = 500;
    expect(isDayEmptyOrPartial(partial)).toBe(true);
    const full = createEmptyDayLog();
    full.meals = { m1: { eval: 'yes' } };
    full.water = 1000;
    full.checks = { c1: true };
    full.medications = { k: { status: 'taken' } };
    expect(isDayEmptyOrPartial(full)).toBe(false);
  });
});
