import 'dotenv/config';
import express from 'express';
import { apiRouter } from '../src/server/api';

const app = express();

app.use(express.json({ limit: '200kb' }));
app.use(apiRouter);

export default app;
