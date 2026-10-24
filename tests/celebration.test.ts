import { describe, it, expect } from 'vitest';
import { createEmptyDayLog } from '../src/utils/storage';
import { shouldShowCelebration, markCelebrationShown } from '../src/utils/celebration';

const base = {
  scoreTotal: 100,
  currentDate: '2026-10-24',
  todayDate: '2026-10-24',
  alreadyShown: false,
  isFreezeDay: false,
};

describe('celebration — shouldShowCelebration (Batch 1.3)', () => {
  it('shows at score 100 for today when not shown before', () => {
    expect(shouldShowCelebration(base)).toBe(true);
  });

  it('does not show below 100', () => {
    expect(shouldShowCelebration({ ...base, scoreTotal: 99 })).toBe(false);
    expect(shouldShowCelebration({ ...base, scoreTotal: 0 })).toBe(false);
  });

  it('shows only once: alreadyShown blocks it (reload simulation)', () => {
    const day = markCelebrationShown(createEmptyDayLog());
    expect(day.celebrationShown).toBe(true);
    expect(shouldShowCelebration({ ...base, alreadyShown: day.celebrationShown })).toBe(false);
  });

  it('never shows for a past day, even at 100', () => {
    expect(shouldShowCelebration({ ...base, currentDate: '2026-10-20' })).toBe(false);
  });

  it('never shows for freeze days (technical 100, not an achievement)', () => {
    expect(shouldShowCelebration({ ...base, isFreezeDay: true })).toBe(false);
  });

  it('markCelebrationShown preserves all other day fields', () => {
    const day = createEmptyDayLog();
    day.water = 2000;
    const marked = markCelebrationShown(day);
    expect(marked.water).toBe(2000);
    expect(day.celebrationShown).toBeUndefined();
  });
});
