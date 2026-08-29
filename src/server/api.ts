import express, { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';

export const apiRouter = Router();

// Secret key for HMAC token signing (works statelessly across Vercel Lambdas)
const getSessionSecret = () => {
  return process.env.SESSION_SECRET || process.env.GEMINI_API_KEY || 'smart-diet-coach-secret-key-2026';
};

// In-Memory Revocation List (for explicit DELETE /api/coach-session within current instance)
const revokedTokens = new Set<string>();

// Rate Limiting Sliding Window (20 req/min, 200 req/day)
const minuteRequests: number[] = [];
const dayRequests: number[] = [];

function checkRateLimit(): boolean {
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  // Prune expired
  while (minuteRequests.length > 0 && minuteRequests[0] < oneMinuteAgo) {
    minuteRequests.shift();
  }
  while (dayRequests.length > 0 && dayRequests[0] < oneDayAgo) {
    dayRequests.shift();
  }

  if (minuteRequests.length >= 20 || dayRequests.length >= 200) {
    return false;
  }

  minuteRequests.push(now);
  dayRequests.push(now);
  return true;
}

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

// System instruction on server side only (Never exposed to client)
const SYSTEM_INSTRUCTION = `أنت مساعد لأخصائية تغذية علاجية مصرية داخل تطبيق Smart Diet.
تقترح حصص تبادل وبدائل عربية عملية.
تلتزم بمفاتيح المجموعات المعطاة حرفيًا ولا تخترع مجموعات.
المفاتيح المعتمدة فقط: starches, lean_protein, med_protein, vegetables, fruits, dairy, fats.
لا تشخّص ولا تصف دواء ولا تخترع أرقام تحاليل أو سعرات غير مستنتجة من الحصص.
احترم الحساسيات والحالات كقيود.
أرجع JSON فقط طبقًا للمهمة.
عند سكري/مقاومة إنسولين: تجنّب السكريات البسيطة في البدائل (مثل العسل، التمر بكميات، السكر).
عند أمراض كلى: لا ترفع البروتين بلا تنبيه في warnings.
عند جلوتين في allergies: احذف أصناف القمح واستخدم الأرز/البطاطس/الشوفان الخالي من الجلوتين/الكينوا/كعك الأرز.
عند لاكتوز في allergies: احذف الحليب والزبادي العادي واستخدم بدائل خالية من اللاكتوز أو حليب لوز/صويا غير محلى أو جبن قريش خالي من اللاكتوز.`;

// Allowed Food Exchange Keys
const ALLOWED_EXCHANGE_KEYS = [
  'starches',
  'lean_protein',
  'med_protein',
  'vegetables',
  'fruits',
  'dairy',
  'fats',
];

// 1. Health Check
const handleHealth = (_req: Request, res: Response) => {
  const hasKey = !!process.env.GEMINI_API_KEY;
  res.json({ status: 'ok', geminiConfigured: hasKey });
};

// 2. Create Session
const handleCreateSession = (_req: Request, res: Response) => {
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

// 4. Gemini Coach Unified Endpoint
const handleGeminiCoach = async (req: Request, res: Response) => {
  try {
    // 1. Validate Coach Session
    const sessionToken = (req.headers['x-coach-session'] as string) || '';
    const isValid = verifySignedCoachToken(sessionToken);

    if (!isValid) {
      return res.status(403).json({
        ok: false,
        error: 'غير مصرح: يرجى فتح لوحة الأخصائية أولاً لتفعيل الجلسة.',
      });
    }

    // 2. Validate API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        ok: false,
        error: 'مفتاح الذكاء الاصطناعي غير مضبوط في إعدادات الخادم.',
      });
    }

    // 3. Check Rate Limit
    if (!checkRateLimit()) {
      return res.status(200).json({
        ok: false,
        error: 'تم إيقاف الاقتراحات مؤقتاً لحماية الحصة (تجاوز معدل الطلبات).',
      });
    }

    const { task, payload } = req.body || {};

    if (!task || !payload) {
      return res.status(400).json({
        ok: false,
        error: 'طلب غير صالح: يرجى تحديد المهمة والبيانات المطلوبة.',
      });
    }

    // Lock model strictly on the server to gemini-2.5-flash
    const selectedModel = 'gemini-2.5-flash';
    const ai = new GoogleGenAI({ apiKey });

    let prompt = '';

    if (task === 'improveMeal') {
      const { mealName, exchanges, currentItems, allergies, conditionIds, groupExamples } = payload;
      prompt = `المهمة: تحسين نص الوجبة وبناء 4 بدائل عربية عملية ومتنوعة مطابقة تمامًا لحصص التبادل.
اسم الوجبة: ${mealName || 'وجبة'}
الحصص المحددة بدقة (لا تغير عددها): ${JSON.stringify(exchanges || {})}
النص الحالي إن وجد: ${currentItems || 'لا يوجد'}
الحساسيات وممنوعات الطعام: ${(allergies || []).join('، ') || 'لا توجد'}
الحالات المرضية: ${(conditionIds || []).join('، ') || 'لا توجد'}
أمثلة من الكتالوج للاسترشاد: ${JSON.stringify(groupExamples || {})}

المطلوب إرجاع JSON بالشكل التالي حصراً:
{
  "ok": true,
  "items": "نص عربي عملي وشهي مطابق للحصص مع ذكر الكميات (مثال: 1/2 رغيف بلدي + 90ج صدور دجاج مشوية + طبق سلطة خضراء + 1 ملعقة زيت زيتون)",
  "alternatives": [
    "بديل عملي 1 مع الكميات",
    "بديل عملي 2 مع الكميات",
    "بديل عملي 3 مع الكميات",
    "بديل عملي 4 مع الكميات"
  ],
  "warnings": ["أي ملاحظة أو تحذير غذائي مهم لهذه الوجبة إن وجد"]
}`;
    } else if (task === 'allocateDay') {
      const {
        mealCount,
        mealNames,
        targetCalories,
        targetProtein,
        targetCarbs,
        targetFats,
        conditionIds,
        allergies,
        groupIds,
        groupMacros,
      } = payload;

      prompt = `المهمة: توزيع حصص التبادل الغذائي اليومية على ${mealCount || 3} وجبات بحيث تقترب القيم الإجمالية للحصص من الأهداف التالية:
السعرات المستهدفة: ${targetCalories || 2000} ك.س
البروتين المستهدف: ${targetProtein || 150} جم
النشويات المستهدفة: ${targetCarbs || 180} جم
الدهون المستهدفة: ${targetFats || 60} جم
أسماء الوجبات: ${(mealNames || []).join('، ')}
الحالات الصحية: ${(conditionIds || []).join('، ') || 'لا توجد'}
الحساسيات: ${(allergies || []).join('، ') || 'لا توجد'}
المجموعات المسموحة: ${(groupIds || []).join('، ')}
قيم الماكروز للحصة الواحدة لكل مجموعة: ${JSON.stringify(groupMacros || [])}

المطلوب إرجاع JSON بالشكل التالي:
{
  "ok": true,
  "meals": [
    {
      "name": "اسم الوجبة",
      "exchanges": {
        "starches": 2,
        "lean_protein": 2,
        "med_protein": 0,
        "vegetables": 1,
        "fruits": 1,
        "dairy": 1,
        "fats": 1
      }
    }
  ],
  "warnings": []
}`;
    } else if (task === 'weeklyDraft') {
      const {
        clientName,
        avgAdherence,
        bestDay,
        weightChange,
        avgWater,
        exerciseDays,
        medsAdherence,
        goal,
        rangeDays = 7,
      } = payload;

      prompt = `المهمة: صياغة مسودة رسالة واتساب أسبوعية دافئة وتشجيعية من الدكتورة شيماء للعميلة/المتدرب.
الاسم: ${clientName || 'البطل'}
الفترة: آخر ${rangeDays} أيام
متوسط الالتزام: ${avgAdherence || 0}%
أفضل يوم: ${bestDay || 'متميز'}
تغير الوزن: ${weightChange !== null && weightChange !== undefined ? `${weightChange} كجم` : 'لم يسجل'}
متوسط شرب الماء: ${avgWater ? `${avgWater} مل` : 'غير محدد'}
أيام التمرين: ${exerciseDays || 0} أيام
التزام الأدوية/المكملات: ${medsAdherence ? `${medsAdherence}%` : 'لا يوجد'}
الهدف الحالي: ${goal || 'الوصول للوزن المثالي والصحة العامة'}

الأسلوب المطلوب:
- أسلوب عيادة د. شيماء: راقٍ، إيجابي، مختصر، غير مبالغ فيه.
- الثناء على النقاط القوية (الالتزام، التمارين، شرب الماء).
- اقتراح خطوة عملية واحدة ومحددة للتركيز عليها في الأسبوع القادم.
- بدون إيموجيات مفرطة، منسقة فقرات واضحة ومناسبة للواتساب.

المطلوب إرجاع JSON بالشكل التالي:
{
  "ok": true,
  "whatsappDraft": "نص الرسالة الكامل هنا"
}`;
    } else {
      return res.status(400).json({ ok: false, error: 'المهمة المطلوبة غير مدعومة' });
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: [prompt],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '';
    let parsed: any;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        return res.status(200).json({
          ok: false,
          error: 'تعذر توليد الاقتراح في الوقت الحالي — يرجى استخدام التوليد المحلي الافتراضي.',
        });
      }
    }

    // Filter exchange keys if task === 'allocateDay'
    if (task === 'allocateDay' && Array.isArray(parsed?.meals)) {
      const sanitizedMeals = parsed.meals
        .map((m: any) => {
          if (!m || typeof m !== 'object') return null;
          const cleanExchanges: Record<string, number> = {};
          for (const key of ALLOWED_EXCHANGE_KEYS) {
            const val = m.exchanges?.[key];
            const numVal = typeof val === 'number' ? Math.max(0, val) : Number(val) || 0;
            if (numVal > 0) {
              cleanExchanges[key] = numVal;
            }
          }
          return {
            name: typeof m.name === 'string' && m.name.trim() ? m.name.trim() : 'وجبة',
            exchanges: cleanExchanges,
          };
        })
        .filter(Boolean);

      parsed.meals = sanitizedMeals;
    }

    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini Coach Internal Error:', error?.name || 'UnknownError');
    return res.status(200).json({
      ok: false,
      error: 'تعذر توليد الاقتراح في الوقت الحالي — يرجى استخدام التوليد المحلي الافتراضي.',
    });
  }
};

// Register routes both with and without /api prefix to support all proxy/rewrite configurations
apiRouter.get('/health', handleHealth);
apiRouter.get('/api/health', handleHealth);

apiRouter.post('/coach-session', handleCreateSession);
apiRouter.post('/api/coach-session', handleCreateSession);

apiRouter.delete('/coach-session', handleDeleteSession);
apiRouter.delete('/api/coach-session', handleDeleteSession);

apiRouter.post('/gemini-coach', handleGeminiCoach);
apiRouter.post('/api/gemini-coach', handleGeminiCoach);
