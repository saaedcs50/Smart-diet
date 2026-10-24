import { describe, it, expect } from 'vitest';
import {
  CASE_SCENARIOS,
  RAMADAN_SCENARIO,
  SCENARIO_PREGNANCY,
  SCENARIO_T2DM,
  SCENARIO_DISCLAIMER,
  isScenarioPreset,
} from '../src/utils/caseScenarios';
import {
  BUILT_IN_PRESETS,
  PLAN_TEMPLATES,
  applyPresetToPlanDraft,
} from '../src/utils/planPresets';
import { validatePresetData } from '../src/utils/presetIO';
import { DEFAULT_PLAN } from '../src/utils/storage';

const ALL_SCENARIOS = [...CASE_SCENARIOS, RAMADAN_SCENARIO];

describe('case scenarios — integrity of every reference template (Batch 3.1)', () => {
  it('has exactly the 7 case scenarios plus the Ramadan seasonal scenario', () => {
    expect(CASE_SCENARIOS).toHaveLength(7);
    expect(RAMADAN_SCENARIO.id).toBe('scenario_ramadan');
  });

  it('all scenario ids are unique', () => {
    const ids = ALL_SCENARIOS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(ALL_SCENARIOS.map((s) => [s.id, s] as const))(
    '%s passes full preset validation with all required fields',
    (_id, scenario) => {
      const result = validatePresetData(scenario);
      expect(result.ok).toBe(true);
      expect(scenario.name.trim().length).toBeGreaterThan(0);
      expect(scenario.planData.meals.length).toBeGreaterThanOrEqual(3);
      expect(scenario.planData.targetCalories).toBeGreaterThan(0);
      expect(scenario.scenario?.clientGuidance.trim().length).toBeGreaterThan(0);
      expect(scenario.scenario?.coachAlerts.length).toBeGreaterThanOrEqual(2);
      for (const m of scenario.planData.meals) {
        expect(m.items.trim().length).toBeGreaterThan(0);
        expect(Array.isArray(m.alternatives)).toBe(true);
      }
    },
  );

  it('scenarios are wired into the existing preset mechanism (BUILT_IN_PRESETS / PLAN_TEMPLATES)', () => {
    for (const s of ALL_SCENARIOS) {
      expect(BUILT_IN_PRESETS.some((p) => p.id === s.id)).toBe(true);
      expect(PLAN_TEMPLATES.some((p) => p.id === s.id)).toBe(true);
      expect(isScenarioPreset(s)).toBe(true);
    }
  });

  it('disclaimer text is the exact spec wording', () => {
    expect(SCENARIO_DISCLAIMER).toBe('قالب استرشادي — يُخصَّص لكل حالة ولا يغني عن التقييم الفردي');
  });
});

describe('case scenarios — application produces a working plan', () => {
  it('applying the T2DM scenario fills meals/conditions and preserves client identity fields', () => {
    const draft = { ...DEFAULT_PLAN, clientName: 'عميل تجريبي', startWeight: 95 };
    const applied = applyPresetToPlanDraft(draft, SCENARIO_T2DM);
    expect(applied.clientName).toBe('عميل تجريبي');
    expect(applied.startWeight).toBe(95);
    expect(applied.meals).toHaveLength(SCENARIO_T2DM.planData.meals.length);
    expect(applied.meals[0].items.length).toBeGreaterThan(0);
    expect(applied.medicalConditions?.conditions.some((c) => c.id === 't2dm')).toBe(true);
    expect(applied.visibleSections?.labTracker).toBe(true);
  });

  it('applying the Ramadan scenario actually carries fastingPlan (section + timer link)', () => {
    const applied = applyPresetToPlanDraft({ ...DEFAULT_PLAN }, RAMADAN_SCENARIO);
    expect(applied.fastingPlan?.enabled).toBe(true);
    expect(applied.fastingPlan?.type).toBe('islamic');
    expect(applied.fastingPlan?.islamic?.pattern).toBe('ramadan');
    expect(applied.fastingPlan?.islamic?.maghribTime).toBe('18:15');
    expect(applied.enableFastingTimer).toBe(true);
    expect(applied.visibleSections?.fastingTimer).toBe(true);
    const names = applied.meals.map((m) => m.name).join(' ');
    expect(names).toContain('الإفطار');
    expect(names).toContain('السحور');
  });
});

describe('case scenarios — pregnancy double caution (Batch 3.1)', () => {
  it('pregnancy scenario disables fasting entirely and is flagged high caution', () => {
    expect(SCENARIO_PREGNANCY.scenario?.cautionLevel).toBe('high');
    expect(SCENARIO_PREGNANCY.planData.enableFastingTimer).toBe(false);
    expect(SCENARIO_PREGNANCY.planData.visibleSections?.fastingTimer).toBe(false);
    expect(SCENARIO_PREGNANCY.planData.fastingPlan).toBeUndefined();
    expect(SCENARIO_PREGNANCY.scenario?.coachAlerts.length).toBeGreaterThanOrEqual(3);
    expect(SCENARIO_PREGNANCY.scenario?.coachAlerts.join(' ')).toContain('تنبيه بارز');
  });
});
