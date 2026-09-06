import { Router, Request, Response } from 'express';
import crypto from 'crypto';

export const apiRouter = Router();

// Secret key for HMAC token signing (works statelessly across Vercel Lambdas)
const getSessionSecret = () => {
  return process.env.SESSION_SECRET || 'smart-diet-coach-secret-key-2026';
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

// 1. Health Check
const handleHealth = (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
};

// 2. Create Session
const handleCreateSession = (req: Request, res: Response) => {
  const reqPin = req.body?.pin;

  if (!reqPin || reqPin !== '32184') {
    return res.status(403).json({
      ok: false,
      error: 'رمز PIN الخاص بالطبيبة غير صحيح.',
    });
  }

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
