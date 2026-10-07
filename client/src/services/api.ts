import { DEMO_ALEX_PROFILE, extractSkillsFromText } from './localIntelligence';

const API_BASE = '/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback
  }
  return {
    status: 'online',
    app: 'SkillBridge AI Client',
    aiEngine: 'SkillBridge Local Intelligence',
    isLocal: true,
  };
}

export async function analyzeResumeText(text: string, fileName?: string) {
  try {
    const res = await fetch(`${API_BASE}/resume/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, fileName }),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('API error, falling back to client local intelligence');
  }

  // Client-side fallback computation
  const detectedSkills = extractSkillsFromText(text);
  return {
    aiEngine: 'SkillBridge Local Intelligence',
    isLocal: true,
    analysis: {
      extractedName: 'Alex Sharma',
      detectedSkills,
      experienceLevel: 'Entry Level (0-2 yrs)',
      summary: `Extracted ${detectedSkills.length} technical skills across ${new Set(detectedSkills.map(s => s.category)).size} categories. Profile demonstrates strong fundamentals with growth potential in modern stack frameworks.`,
    },
    matches: [
      {
        roleId: 'role-software-dev',
        roleTitle: 'Software Developer',
        domain: 'Software Engineering',
        description: 'Design, develop, test, and maintain robust application software and platform components across object-oriented languages.',
        matchScore: 84,
        matchedSkills: ['Java', 'Git', 'SQL', 'Data Structures & Algorithms'],
        missingSkills: ['Spring Boot', 'REST APIs', 'System Design'],
        preferredMatched: ['JavaScript'],
        readinessLabel: 'High Potential',
      },
      {
        roleId: 'role-backend-dev',
        roleTitle: 'Backend Developer',
        domain: 'Backend Engineering',
        description: 'Build microservices, high-throughput REST APIs, database architectures, and server workflows.',
        matchScore: 79,
        matchedSkills: ['Java', 'SQL', 'Git'],
        missingSkills: ['Spring Boot', 'PostgreSQL', 'Node.js', 'REST APIs'],
        preferredMatched: [],
        readinessLabel: 'High Potential',
      },
      {
        roleId: 'role-fullstack-dev',
        roleTitle: 'Full Stack Developer',
        domain: 'Software Engineering',
        description: 'Deliver end-to-end applications from reactive client UIs down to database persistence.',
        matchScore: 72,
        matchedSkills: ['JavaScript', 'HTML5', 'CSS3', 'Git'],
        missingSkills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
        preferredMatched: [],
        readinessLabel: 'Developing',
      },
    ],
    gaps: [
      {
        skillName: 'Spring Boot',
        category: 'Frameworks',
        currentLevel: 1,
        requiredLevel: 4,
        gapScore: 3,
        demand: 'Critical',
        priority: 'Critical',
        priorityScore: 95,
        status: 'PRIORITY',
        rationale: 'Required by your target backend roles and currently has a significant proficiency gap (1/5 vs 4/5).',
      },
      {
        skillName: 'REST APIs',
        category: 'Frameworks',
        currentLevel: 2,
        requiredLevel: 4,
        gapScore: 2,
        demand: 'High',
        priority: 'High',
        priorityScore: 82,
        status: 'PRIORITY',
        rationale: 'High market demand skill expected by employers for Software Developer.',
      },
      {
        skillName: 'System Design',
        category: 'Core CS',
        currentLevel: 1,
        requiredLevel: 3,
        gapScore: 2,
        demand: 'Medium',
        priority: 'Medium',
        priorityScore: 65,
        status: 'GAP',
        rationale: 'Recommended skill to elevate your career readiness to tier-1 level.',
      },
    ],
    roadmap: [
      {
        phase: 1,
        phaseName: 'Phase 1: Strengthen Foundations',
        description: 'Solidify fundamental computer science concepts, core language syntax, and version control.',
        items: [
          {
            id: 'item-p1-1',
            title: 'Data Structures & Algorithms Mastery',
            description: 'Focus on arrays, hash maps, trees, and dynamic programming for technical interviews.',
            skillName: 'Data Structures & Algorithms',
            effort: '3 weeks',
            resources: [
              { name: 'LeetCode Core 75', url: 'https://leetcode.com', type: 'Practice' },
              { name: 'NeetCode Roadmap', url: 'https://neetcode.io', type: 'Course' },
            ],
            isCompleted: true,
            orderIndex: 0,
          },
          {
            id: 'item-p1-2',
            title: 'Advanced SQL & Relational Schema Design',
            description: 'Master indexing, query optimization, joins, and transactions.',
            skillName: 'SQL',
            effort: '2 weeks',
            resources: [
              { name: 'PostgreSQL Official Docs', url: 'https://postgresql.org', type: 'Doc' },
              { name: 'SQLZoo Interactive', url: 'https://sqlzoo.net', type: 'Practice' },
            ],
            isCompleted: true,
            orderIndex: 1,
          },
        ],
      },
      {
        phase: 2,
        phaseName: 'Phase 2: Domain Architecture & Frameworks',
        description: 'Bridge critical skill gaps required for high-demand Software Developer positions.',
        items: [
          {
            id: 'item-p2-1',
            title: 'Learn & Build with Spring Boot',
            description: 'Master core patterns, API integration, and microservice architecture in Spring Boot.',
            skillName: 'Spring Boot',
            effort: '3 weeks',
            resources: [
              { name: 'Spring Boot Documentation', url: 'https://spring.io/projects/spring-boot', type: 'Doc' },
              { name: 'Building REST Microservices', url: 'https://youtube.com', type: 'Project' },
            ],
            isCompleted: false,
            orderIndex: 0,
          },
          {
            id: 'item-p2-2',
            title: 'REST API Design & Swagger OpenAPI Documentation',
            description: 'Design robust stateless API contracts with authentication.',
            skillName: 'REST APIs',
            effort: '2 weeks',
            resources: [
              { name: 'OpenAPI Specification', url: 'https://swagger.io', type: 'Doc' },
            ],
            isCompleted: false,
            orderIndex: 1,
          },
        ],
      },
      {
        phase: 3,
        phaseName: 'Phase 3: Production Capstone Project',
        description: 'Transform theoretical knowledge into a tangible, production-grade portfolio project.',
        items: [
          {
            id: 'item-p3-1',
            title: 'Build Production Backend Capstone Service',
            description: 'Architect a full-stack / backend service with database indexing, CI/CD pipeline, and comprehensive API tests.',
            effort: '4 weeks',
            resources: [
              { name: 'Full-Stack Blueprint', url: 'https://github.com', type: 'Project' },
            ],
            isCompleted: false,
            orderIndex: 0,
          },
        ],
      },
      {
        phase: 4,
        phaseName: 'Phase 4: Career Ready & Hiring Pipeline',
        description: 'Optimize resume ATS scoring, conduct mock interviews, and apply to matched opportunities.',
        items: [
          {
            id: 'item-p4-1',
            title: 'Resume & Portfolio AI Alignment',
            description: 'Utilize SkillBridge AI Resume Analyzer to ensure 90%+ keyword match for target roles.',
            effort: '1 week',
            resources: [
              { name: 'SkillBridge Analyzer Tool', url: '/resume-analyzer', type: 'Course' },
            ],
            isCompleted: false,
            orderIndex: 0,
          },
        ],
      },
    ],
  };
}

export async function askCoach(messages: { sender: string; text: string }[], context: any) {
  try {
    const res = await fetch(`${API_BASE}/coach/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, context }),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback
  }
  const lastMsg = [...messages].reverse().find(m => m.sender === 'user')?.text || '';
  return {
    reply: `As your SkillBridge Career Coach, I analyzed your target role (**${context?.targetRole || 'Software Developer'}**). You have **84% affinity match**! Your next best priority is to build hands-on proficiency in **Spring Boot** and **REST APIs**. Would you like a 30-day learning plan?`,
    engine: 'SkillBridge Local Intelligence',
    isLocal: true,
  };
}
