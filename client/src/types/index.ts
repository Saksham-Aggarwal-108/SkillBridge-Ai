export type UserRole = 'STUDENT' | 'PROFESSIONAL' | 'EMPLOYER' | 'UNIVERSITY';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Skill {
  name: string;
  originalName?: string;
  category: string;
  proficiency: number; // 1 to 5
  status?: 'Strong' | 'Developing' | 'Needs Attention';
}

export interface Profile {
  name: string;
  headline: string;
  experienceLevel: string;
  targetRole: string;
  readinessScore: number;
  learningStyle: string;
  skills: Skill[];
  isDemo: boolean;
  rawResumeText?: string;
}

export interface CareerMatch {
  roleId: string;
  roleTitle: string;
  domain: string;
  description: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  preferredMatched: string[];
  readinessLabel: 'Career Ready' | 'High Potential' | 'Developing' | 'Needs Foundation';
}

export interface SkillGap {
  skillName: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  gapScore: number;
  demand: 'Critical' | 'High' | 'Medium' | 'Low';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  priorityScore: number;
  status: 'MATCH' | 'GAP' | 'PRIORITY';
  rationale: string;
}

export interface RoadmapResource {
  name: string;
  url: string;
  type: 'Doc' | 'Course' | 'Project' | 'Practice';
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  skillName?: string;
  effort: string;
  resources: RoadmapResource[];
  isCompleted: boolean;
  orderIndex: number;
}

export interface RoadmapPhase {
  phase: number;
  phaseName: string;
  description: string;
  items: RoadmapItem[];
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  workMode: string;
  experience: string;
  requiredSkills: string[];
  description: string;
  matchScore: number;
}

export interface Candidate {
  name: string;
  role: string;
  experienceLevel: string;
  skills: string[];
  targetRole: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}
