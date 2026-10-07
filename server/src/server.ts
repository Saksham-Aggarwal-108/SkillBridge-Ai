import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api', apiRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'SkillBridge AI Server Running',
    team: 'THE PROCESSORS (Saksham, Parisha, Nikhil, Nimisha, Sonit)',
    event: 'Build For Bharat 2.0',
    documentation: '/api/health',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SkillBridge AI Backend running on http://localhost:${PORT}`);
});
