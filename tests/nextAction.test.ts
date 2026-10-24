import { describe, it, expect } from 'vitest';
import { createEmptyDayLog, DEFAULT_PLAN } from '../src/utils/storage';
import {
  getNextMeal,
  getNextMedication,
  getQuickActionState,
  isMealLogged,
  markMealDone,
  markMedicationTaken,
  addWaterCup,
} from '../src/utils/nextAction';
import { DayLog, PlanConfig } from '../src/types';

function planWithMeds(): PlanConfig {
  return {
    ...DEFAULT_PLAN,
    medicationPlan: {
      showToClient: true,
      items: [
        {
          id: 'med_a',
          name: 'دواء أ',
          dose: '500 مجم',
          timesPerDay: 1,
          timings: [{ id: 't1', slot: 'morning', label: 'صباحًا' }],
          active: true,
        },
        {
          id: 'med_b',
          name: 'دواء ب',
          dose: '10 مجم',
          timesPerDay: 1,
          timings: [{ id: 't2', slot: 'prn', label: 'عند اللزوم' }],
          active: true,
        },
        {
          id: 'med_c',
          name: 'دواء ج',
          dose: '1 قرص',
          timesPerDay: 1,
          timings: [{ id: 't3', slot: 'evening', label: 'مساءً' }],
          active: true,
        },
      ],
    },
  };
}

describe('nextAction — getNextMeal (Batch 1.2)', () => {
  it('returns the first meal when nothing is logged', () => {
    const day = createEmptyDayLog();
    expect(getNextMeal(DEFAULT_PLAN, day)?.id).toBe(DEFAULT_PLAN.meals[0].id);
  });

  it('advances meal by meal as each is marked done, then returns null', () => {
    let day: DayLog = createEmptyDayLog();
    for (const meal of DEFAULT_PLAN.meals) {
      expect(getNextMeal(DEFAULT_PLAN, day)?.id).toBe(meal.id);
      day = markMealDone(day, meal.id);
      expect(isMealLogged(day, meal.id)).toBe(true);
    }
    expect(getNextMeal(DEFAULT_PLAN, day)).toBeNull();
  });

  it('treats an alternative selection as logged (NextMealSpotlight parity)', () => {
    const day = createEmptyDayLog();
    const first = DEFAULT_PLAN.meals[0];
    day.meals = { [first.id]: { type: 'alt', detail: 'بديل' } };
    expect(isMealLogged(day, first.id)).toBe(true);
    expect(getNextMeal(DEFAULT_PLAN, day)?.id).toBe(DEFAULT_PLAN.meals[1].id);
  });

  it('returns null when the plan has no meals', () => {
    const plan = { ...DEFAULT_PLAN, meals: [] };
    expect(getNextMeal(plan, createEmptyDayLog())).toBeNull();
  });
});

describe('nextAction — getNextMedication (Batch 1.2)', () => {
  it('returns the first untaken scheduled dose and skips PRN doses', () => {
    const plan = planWithMeds();
    const next = getNextMedication(plan, createEmptyDayLog());
    expect(next?.medicationId).toBe('med_a');
  });

  it('advances after marking taken, skipping PRN, then returns null', () => {
    const plan = planWithMeds();
    let day = createEmptyDayLog();
    day = markMedicationTaken(day, 'med_a__morning', new Date(2026, 9, 24, 8, 5));
    expect(day.medications?.['med_a__morning'].status).toBe('taken');
    expect(day.medications?.['med_a__morning'].time).toBe('08:05');
    const next = getNextMedication(plan, day);
    expect(next?.medicationId).toBe('med_c');
    day = markMedicationTaken(day, 'med_c__evening');
    expect(getNextMedication(plan, day)).toBeNull();
  });

  it('returns null when no medication plan exists', () => {
    expect(getNextMedication(DEFAULT_PLAN, createEmptyDayLog())).toBeNull();
  });
});

describe('nextAction — quick state & water (Batch 1.2)', () => {
  it('allDone only when meals and scheduled meds are complete', () => {
    const plan = planWithMeds();
    let day = createEmptyDayLog();
    expect(getQuickActionState(plan, day).allDone).toBe(false);
    for (const meal of plan.meals) day = markMealDone(day, meal.id);
    expect(getQuickActionState(plan, day).allDone).toBe(false); // meds remain
    day = markMedicationTaken(day, 'med_a__morning');
    day = markMedicationTaken(day, 'med_c__evening');
    const state = getQuickActionState(plan, day);
    expect(state.allDone).toBe(true);
    expect(state.nextMeal).toBeNull();
    expect(state.nextMedication).toBeNull();
  });

  it('addWaterCup adds 250ml and counts a log entry', () => {
    const day = addWaterCup(createEmptyDayLog());
    expect(day.water).toBe(250);
    expect(day.waterLogs).toBe(1);
    const day2 = addWaterCup(day, 500);
    expect(day2.water).toBe(750);
    expect(day2.waterLogs).toBe(2);
  });
});
