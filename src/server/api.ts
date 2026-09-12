import express, { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { brandCopy } from '../config/brand';

export const apiRouter = Router();

// Ensure body parser is applied to all api routes
apiRouter.use(express.json({ limit: '200kb' }));

const isProd = process.env.NODE_ENV === 'production';

// ============================================================================
// السر المستخدم لتوقيع جلسات الطبيبة (HMAC): لازم يكون فريد لكل عميل/نسخة
// ============================================================================
let devSessionSecret: string | null = null;
const getSessionSecret = (): string => {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret.trim();

  if (!devSessionSecret) {
    devSessionSecret = crypto.randomBytes(32).toString('hex');
    console.warn(
      'SESSION_SECRET غير معرف: تم توليد سر مؤقت. حدد SESSION_SECRET في ملف .env للإنتاج.'
    );
  }
  return devSessionSecret;
};

// ============================================================================
// رمز PIN الخاص بالطبيبة/الأخصائية
// ============================================================================
let devCoachPin: string | null = null;
const getCoachPin = (): string => {
  const pin = process.env.COACH_PIN;
  if (pin) return String(pin).trim();

  if (!devCoachPin) {
    devCoachPin = '12345';
    console.warn(
      `COACH_PIN غير معرف: استخدام الرمز الافتراضي (12345). حدد COACH_PIN في ملف .env قبل النشر.`
    );
  }
  return devCoachPin;
};

// ============================================================================
// حماية بسيطة ضد محاولات تخمين الـ PIN (Rate Limiting في الذاكرة)
// ============================================================================
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 دقائق
const attemptsByIp = new Map<string, { count: number; lockedUntil: number }>();

const isLockedOut = (ip: string): boolean => {
  const entry = attemptsByIp.get(ip);
  if (!entry) return false;
  if (entry.lockedUntil && entry.lockedUntil > Date.now()) return true;
  if (entry.lockedUntil && entry.lockedUntil <= Date.now()) {
    attemptsByIp.delete(ip);
  }
  return false;
};

const registerFailedAttempt = (ip: string) => {
  const entry = attemptsByIp.get(ip) || { count: 0, lockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCKOUT_MS;
    entry.count = 0;
  }
  attemptsByIp.set(ip, entry);
};

const clearAttempts = (ip: string) => {
  attemptsByIp.delete(ip);
};

// In-Memory Revocation List (for explicit DELETE /api/coach-session within current instance)
const revokedTokens = new Set<string>();

// Generate a cryptographically signed HMAC token (Stateless & Vercel-compatible)
export function createSignedCoachToken(): { token: string; expiresAt: number } {
  const expiresAt = Date.now() + 60 * 60 * 1000; // 60 minutes
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${expiresAt}.${nonce}`;
  const hmac = crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
  const token = `${payload}.${hmac}`;
  return { token, expiresAt };
}

// Verify HMAC signed token
export function verifySignedCoachToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  if (revokedTokens.has(token)) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [expiresAtStr, nonce, hmac] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);
  if (isNaN(expiresAt) || expiresAt < Date.now()) return false;

  const payload = `${expiresAtStr}.${nonce}`;
  const expectedHmac = crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('hex');

  try {
    const hmacBuf = Buffer.from(hmac, 'hex');
    const expectedBuf = Buffer.from(expectedHmac, 'hex');
    if (hmacBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(hmacBuf, expectedBuf);
  } catch {
    return false;
  }
}

// فحص إعدادات الأمان عند بدء التشغيل
export const validateSecurityConfig = (): void => {
  getSessionSecret();
  getCoachPin();
};

// 1. Health Check
const handleHealth = (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
};

// 2. Create Session
const handleCreateSession = (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  if (isLockedOut(ip)) {
    return res.status(429).json({
      ok: false,
      error: 'تم إيقاف المحاولات مؤقتًا بسبب محاولات دخول متكررة خاطئة. حاول مرة أخرى بعد بضع دقائق.',
    });
  }

  const reqPin = String(req.body?.pin || '').trim();
  const serverPin = String(getCoachPin()).trim();

  if (!reqPin || reqPin !== serverPin) {
    registerFailedAttempt(ip);
    return res.status(403).json({
      ok: false,
      error: brandCopy.pinWrong,
    });
  }

  clearAttempts(ip);
  const { token, expiresAt } = createSignedCoachToken();
  return res.json({
    ok: true,
    token,
    expiresAt,
  });
};

// 3. Delete Session
const handleDeleteSession = (req: Request, res: Response) => {
  const headerToken = req.headers['x-coach-session'] as string;
  const bodyToken = req.body?.token as string;
  const token = headerToken || bodyToken;

  if (token) {
    revokedTokens.add(token);
  }

  return res.json({ ok: true });
};

// Register routes both with and without /api prefix to support all proxy/rewrite configurations
apiRouter.get('/health', handleHealth);
apiRouter.get('/api/health', handleHealth);

apiRouter.post('/coach-session', handleCreateSession);
apiRouter.post('/api/coach-session', handleCreateSession);

apiRouter.delete('/coach-session', handleDeleteSession);
apiRouter.delete('/api/coach-session', handleDeleteSession);
