import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getAIProvider } from '../ai/AIProvider.js';
import { SEEDED_ROLES, SEEDED_OPPORTUNITIES, SEEDED_UNIVERSITY_CURRICULA, SEEDED_DEMO_CANDIDATES } from '../data/seedData.js';
import { CareerMatchingEngine } from '../engines/CareerMatchingEngine.js';
import { SkillGapEngine } from '../engines/SkillGapEngine.js';
import { RoadmapEngine } from '../engines/RoadmapEngine.js';
import { SkillNormalizationEngine } from '../engines/SkillNormalizationEngine.js';

const router = Router();
const prisma = new PrismaClient();
const aiProvider = getAIProvider();

// Helper to get active AI provider details
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    app: 'SkillBridge AI Server',
    aiEngine: aiProvider.name,
    isLocal: aiProvider.isLocal,
    timestamp: new Date().toISOString(),
  });
});

// 1. AUTHENTICATION
router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      // Fallback demo user auto-auth for hackathon convenience
      user = await prisma.user.findFirst({
        include: { profile: true },
      });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      token: 'demo-jwt-token-skillbridge',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    
    let existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password || 'hash123',
        role: role || 'STUDENT',
        profile: {
          create: {
            headline: `${role} at SkillBridge AI`,
            experienceLevel: 'Entry Level',
            targetRole: 'Software Developer',
            readinessScore: 70,
            isDemo: false,
          },
        },
      },
      include: { profile: true },
    });

    res.json({
      token: 'demo-jwt-token-skillbridge',
      user: newUser,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. PROFILE & ONBOARDING
router.get('/profile', async (req: Request, res: Response) => {
  try {
    let profile = await prisma.profile.findFirst({
      where: { isDemo: true },
      include: {
        userSkills: { include: { skill: true } },
      },
    });

    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile', async (req: Request, res: Response) => {
  try {
    const { targetRole, experienceLevel, skills, learningStyle } = req.body;
    
    let profile = await prisma.profile.findFirst({ where: { isDemo: true } });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: {
        targetRole: targetRole || profile.targetRole,
        experienceLevel: experienceLevel || profile.experienceLevel,
        learningStyle: learningStyle || profile.learningStyle,
      },
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. RESUME ANALYZER
router.post('/resume/analyze', async (req: Request, res: Response) => {
  try {
    const { text, fileName } = req.body;
    const resumeText = text || 'Java SQL Git HTML CSS JavaScript Data Structures Spring Boot REST APIs';

    // Step 1: AI extraction
    const analysis = await aiProvider.analyzeProfile(resumeText);

    // Step 2: Role recommendation
    const matches = await aiProvider.recommendRoles(analysis.detectedSkills);

    // Step 3: Target gap analysis
    const topRole = matches[0]?.roleTitle || 'Software Developer';
    const gaps = await aiProvider.analyzeGaps(analysis.detectedSkills, topRole);

    // Step 4: Roadmap generation
    const roadmap = await aiProvider.generateRoadmap(topRole, gaps);

    res.json({
      aiEngine: aiProvider.name,
      isLocal: aiProvider.isLocal,
      analysis,
      matches,
      gaps,
      roadmap,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. CAREER ROLES & MATCHES
router.get('/career-roles', (req: Request, res: Response) => {
  res.json(SEEDED_ROLES);
});

router.get('/career-roles/:id', (req: Request, res: Response) => {
  const role = SEEDED_ROLES.find(r => r.id === req.params.id || r.title.toLowerCase() === req.params.id.toLowerCase());
  if (!role) return res.status(404).json({ error: 'Role not found' });
  res.json(role);
});

router.post('/matching/analyze', async (req: Request, res: Response) => {
  try {
    const { skills, targetRole } = req.body;
    const normSkills = await aiProvider.normalizeSkills(skills || ['Java', 'SQL', 'Git', 'DSA']);
    const matches = await aiProvider.recommendRoles(normSkills);
    const selectedGaps = targetRole 
      ? await aiProvider.analyzeGaps(normSkills, targetRole)
      : await aiProvider.analyzeGaps(normSkills, matches[0].roleTitle);

    res.json({
      matches,
      gaps: selectedGaps,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. SKILL GAPS
router.get('/skill-gaps', async (req: Request, res: Response) => {
  try {
    const targetRole = (req.query.role as string) || 'Software Developer';
    const normSkills = await aiProvider.normalizeSkills(['Java', 'SQL', 'Git', 'HTML', 'CSS', 'JavaScript', 'DSA']);
    const gaps = await aiProvider.analyzeGaps(normSkills, targetRole);
    res.json(gaps);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. ROADMAP
router.get('/roadmap', async (req: Request, res: Response) => {
  try {
    const targetRole = (req.query.role as string) || 'Software Developer';
    const normSkills = await aiProvider.normalizeSkills(['Java', 'SQL', 'Git', 'HTML', 'CSS', 'JavaScript', 'DSA']);
    const gaps = await aiProvider.analyzeGaps(normSkills, targetRole);
    const roadmap = await aiProvider.generateRoadmap(targetRole, gaps);
    res.json(roadmap);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 7. AI CAREER COACH CHAT
router.post('/coach/chat', async (req: Request, res: Response) => {
  try {
    const { messages, context } = req.body;
    const botReply = await aiProvider.chat(messages || [], context || {});
    res.json({
      reply: botReply,
      engine: aiProvider.name,
      isLocal: aiProvider.isLocal,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 8. OPPORTUNITIES
router.get('/opportunities', (req: Request, res: Response) => {
  res.json(SEEDED_OPPORTUNITIES);
});

// 9. EMPLOYER DASHBOARD
router.get('/employer/candidates', (req: Request, res: Response) => {
  const targetJobRole = (req.query.role as string) || 'Software Developer';
  const roleDef = SEEDED_ROLES.find(r => r.title.toLowerCase() === targetJobRole.toLowerCase()) || SEEDED_ROLES[0];

  const rankedCandidates = SEEDED_DEMO_CANDIDATES.map(cand => {
    const normSkills = cand.skills.map(s => ({ name: s }));
    const match = CareerMatchingEngine.calculateMatch(normSkills, roleDef);
    return {
      ...cand,
      matchScore: match.matchScore,
      matchedSkills: match.matchedSkills,
      missingSkills: match.missingSkills,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json(rankedCandidates);
});

router.post('/jobs', async (req: Request, res: Response) => {
  try {
    const { title, description, requiredSkills, preferredSkills, experience } = req.body;
    const newJob = {
      id: `job-${Date.now()}`,
      title,
      description,
      requiredSkills: JSON.stringify(requiredSkills || []),
      preferredSkills: JSON.stringify(preferredSkills || []),
      experience: experience || '0-2 yrs',
      createdAt: new Date().toISOString(),
    };
    res.json(newJob);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 10. UNIVERSITY DASHBOARD
router.get('/university/intelligence', (req: Request, res: Response) => {
  res.json(SEEDED_UNIVERSITY_CURRICULA);
});

// 11. SKILLS EXPLORER
router.get('/skills', (req: Request, res: Response) => {
  const skillQuery = (req.query.q as string || '').toLowerCase();
  const allSkills = Object.values(SEEDED_ROLES.flatMap(r => r.requiredSkills.map(s => s.skill)));
  const uniqueSkills = Array.from(new Set(allSkills));

  const results = uniqueSkills.map(name => {
    const norm = SkillNormalizationEngine.normalize(name);
    const relatedRoles = SEEDED_ROLES.filter(r => r.requiredSkills.some(rs => rs.skill.toLowerCase() === name.toLowerCase())).map(r => r.title);
    return {
      name: norm.normalized,
      category: norm.category,
      demand: 'High',
      difficulty: 'Intermediate',
      relatedRoles,
      relatedSkills: ['REST APIs', 'Git', 'System Design'].filter(s => s !== norm.normalized),
    };
  });

  if (skillQuery) {
    return res.json(results.filter(s => s.name.toLowerCase().includes(skillQuery)));
  }

  res.json(results);
});

// 12. ANALYTICS
router.get('/analytics', (req: Request, res: Response) => {
  res.json({
    careerReadiness: 78,
    skillHealth: [
      { category: 'Programming', score: 85 },
      { category: 'Databases', score: 80 },
      { category: 'Tools & Versioning', score: 90 },
      { category: 'Frameworks', score: 45 },
      { category: 'System Architecture', score: 40 },
    ],
    topMatchScores: [
      { role: 'Software Developer', score: 84 },
      { role: 'Backend Developer', score: 79 },
      { role: 'Full Stack Developer', score: 72 },
      { role: 'Data Analyst', score: 67 },
    ],
    gapDistribution: [
      { priority: 'Critical', count: 2 },
      { priority: 'High', count: 3 },
      { priority: 'Medium', count: 2 },
      { priority: 'Matched', count: 5 },
    ],
  });
});

export default router;
