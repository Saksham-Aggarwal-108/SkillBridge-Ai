import { SkillGapDetail } from './SkillGapEngine.js';

export interface RoadmapPhase {
  phase: number;
  phaseName: string;
  description: string;
  items: RoadmapItemDetail[];
}

export interface RoadmapItemDetail {
  id: string;
  title: string;
  description: string;
  skillName?: string;
  effort: string;
  resources: { name: string; url: string; type: 'Doc' | 'Course' | 'Project' | 'Practice' }[];
  isCompleted: boolean;
  orderIndex: number;
}

export class RoadmapEngine {
  public static generateRoadmap(
    targetRoleTitle: string,
    gaps: SkillGapDetail[]
  ): RoadmapPhase[] {
    const criticalGaps = gaps.filter(g => g.priority === 'Critical');
    const highGaps = gaps.filter(g => g.priority === 'High');
    const mediumGaps = gaps.filter(g => g.priority === 'Medium');

    const topSkillsToLearn = [...criticalGaps, ...highGaps, ...mediumGaps].slice(0, 4);

    return [
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
        description: `Bridge critical skill gaps required for high-demand ${targetRoleTitle} positions.`,
        items: topSkillsToLearn.length > 0 ? topSkillsToLearn.map((gap, idx) => ({
          id: `item-p2-${idx + 1}`,
          title: `Learn & Build with ${gap.skillName}`,
          description: gap.rationale || `Master core patterns, API integration, and architectural best practices in ${gap.skillName}.`,
          skillName: gap.skillName,
          effort: '3 weeks',
          resources: [
            { name: `${gap.skillName} Documentation`, url: `https://www.google.com/search?q=${encodeURIComponent(gap.skillName)}+docs`, type: 'Doc' },
            { name: `Building End-to-End with ${gap.skillName}`, url: `https://youtube.com`, type: 'Project' },
          ],
          isCompleted: false,
          orderIndex: idx,
        })) : [
          {
            id: 'item-p2-fallback',
            title: 'Master Enterprise Framework Patterns',
            description: 'Deep dive into microservices, authentication, and REST API design.',
            skillName: 'REST APIs',
            effort: '3 weeks',
            resources: [
              { name: 'RESTful API Guidelines', url: 'https://restfulapi.net', type: 'Doc' },
            ],
            isCompleted: false,
            orderIndex: 0,
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
            title: `Build Production ${targetRoleTitle} Capstone`,
            description: 'Architect a full-stack / backend service with database indexing, CI/CD pipeline, and comprehensive API tests.',
            skillName: 'System Design',
            effort: '4 weeks',
            resources: [
              { name: 'Full-Stack Starter Blueprint', url: 'https://github.com', type: 'Project' },
              { name: 'Docker & Deployment Guide', url: 'https://docker.com', type: 'Doc' },
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
          {
            id: 'item-p4-2',
            title: 'Targeted Applications & Mock Interviews',
            description: 'Apply to top skill-matched positions on SkillBridge Opportunities board.',
            effort: 'Ongoing',
            resources: [
              { name: 'SkillBridge Opportunities', url: '/opportunities', type: 'Practice' },
            ],
            isCompleted: false,
            orderIndex: 1,
          },
        ],
      },
    ];
  }
}
