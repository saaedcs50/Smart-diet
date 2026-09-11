import 'dotenv/config';
import express from 'express';
import { apiRouter, validateSecurityConfig } from '../src/server/api';

const app = express();

// يفشل بسرعة (في الـ logs) لو SESSION_SECRET أو COACH_PIN مش متحددين في بيئة الإنتاج
validateSecurityConfig();

app.use(express.json({ limit: '200kb' }));
app.use(apiRouter);

export default app;
