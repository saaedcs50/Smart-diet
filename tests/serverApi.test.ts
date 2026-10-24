import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('server api — signed coach tokens', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('SESSION_SECRET', 'test-secret-for-unit-tests-0123456789');
    vi.stubEnv('COACH_PIN', '97531');
    vi.stubEnv('NODE_ENV', 'test');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('creates a token that verifies', async () => {
    const { createSignedCoachToken, verifySignedCoachToken } = await import(
      '../src/server/api'
    );
    const { token } = createSignedCoachToken();
    expect(verifySignedCoachToken(token)).toBe(true);
  });

  it('rejects tampered and malformed tokens', async () => {
    const { createSignedCoachToken, verifySignedCoachToken } = await import(
      '../src/server/api'
    );
    const { token } = createSignedCoachToken();
    const tampered = token.slice(0, -2) + (token.endsWith('aa') ? 'bb' : 'aa');
    expect(verifySignedCoachToken(tampered)).toBe(false);
    expect(verifySignedCoachToken('not-a-token')).toBe(false);
    expect(verifySignedCoachToken('')).toBe(false);
  });
});

describe('server api — production security config fails fast', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('throws in production when COACH_PIN / SESSION_SECRET are missing', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('SESSION_SECRET', '');
    vi.stubEnv('COACH_PIN', '');
    const { validateSecurityConfig } = await import('../src/server/api');
    expect(() => validateSecurityConfig()).toThrow(/SESSION_SECRET/);
  });

  it('passes in production when both are set', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('SESSION_SECRET', 'a-very-long-random-production-secret');
    vi.stubEnv('COACH_PIN', '97531');
    const { validateSecurityConfig } = await import('../src/server/api');
    expect(() => validateSecurityConfig()).not.toThrow();
  });
});
