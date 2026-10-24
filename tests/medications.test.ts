import { describe, it, expect } from 'vitest';
import {
  getAllScheduledDoses,
  calculateDailyMedicationAdherence,
} from '../src/utils/medications';
import type { DayLog, MedicationItem } from '../src/types';

function med(partial: Partial<MedicationItem>): MedicationItem {
  return {
    id: 'm1',
    name: 'Metformin',
    dose: '500mg',
    timesPerDay: 2,
    timings: [
      { id: 't1', slot: 'morning', label: 'صباحًا' },
      { id: 't2', slot: 'evening', label: 'مساءً' },
    ],
    active: true,
    ...partial,
  } as MedicationItem;
}

function day(medications: DayLog['medications']): DayLog {
  return { medications } as DayLog;
}

describe('medications — scheduled doses', () => {
  it('expands timings into dose instances, skipping inactive meds', () => {
    const doses = getAllScheduledDoses([
      med({}),
      med({ id: 'm2', name: 'Off', active: false }),
    ]);
    expect(doses).toHaveLength(2);
    expect(doses.map((d) => d.key)).toEqual(['m1__morning', 'm1__evening']);
  });

  it('marks PRN slot doses as isPRN', () => {
    const doses = getAllScheduledDoses([
      med({ timings: [{ id: 't3', slot: 'prn', label: 'عند الحاجة' }] }),
    ]);
    expect(doses[0].isPRN).toBe(true);
  });
});

describe('medications — daily adherence', () => {
  it('1 of 2 taken = 50%', () => {
    const r = calculateDailyMedicationAdherence(
      [med({})],
      day({ m1__morning: { status: 'taken' } } as DayLog['medications'])
    );
    expect(r.totalScheduledNonPRN).toBe(2);
    expect(r.totalTaken).toBe(1);
    expect(r.adherencePercentage).toBe(50);
  });

  it('no scheduled doses returns 100% with hasMedications=false', () => {
    const r = calculateDailyMedicationAdherence([], day({}));
    expect(r.adherencePercentage).toBe(100);
    expect(r.hasMedications).toBe(false);
  });

  it('PRN doses are excluded from adherence math', () => {
    const r = calculateDailyMedicationAdherence(
      [med({ timings: [{ id: 't3', slot: 'prn', label: 'عند الحاجة' }] })],
      day({})
    );
    expect(r.totalScheduledNonPRN).toBe(0);
    expect(r.adherencePercentage).toBe(100);
    expect(r.hasMedications).toBe(true);
  });

  it('counts skipped and postponed separately', () => {
    const r = calculateDailyMedicationAdherence(
      [med({})],
      day({
        m1__morning: { status: 'skipped' },
        m1__evening: { status: 'postponed' },
      } as DayLog['medications'])
    );
    expect(r.totalSkipped).toBe(1);
    expect(r.totalPostponed).toBe(1);
    expect(r.adherencePercentage).toBe(0);
  });
});
