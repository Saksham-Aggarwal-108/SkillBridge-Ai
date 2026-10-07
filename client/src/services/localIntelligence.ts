import { Profile, Skill, CareerMatch, SkillGap, RoadmapPhase, Opportunity, Candidate } from '../types';

export const CLIENT_SKILL_DICTIONARY: Record<string, { normalized: string; category: string }> = {
  'js': { normalized: 'JavaScript', category: 'Programming' },
  'javascript': { normalized: 'JavaScript', category: 'Programming' },
  'ts': { normalized: 'TypeScript', category: 'Programming' },
  'typescript': { normalized: 'TypeScript', category: 'Programming' },
  'py': { normalized: 'Python', category: 'Programming' },
  'python': { normalized: 'Python', category: 'Programming' },
  'java': { normalized: 'Java', category: 'Programming' },
  'c++': { normalized: 'C++', category: 'Programming' },
  'cpp': { normalized: 'C++', category: 'Programming' },
  'react': { normalized: 'React', category: 'Frameworks' },
  'reactjs': { normalized: 'React', category: 'Frameworks' },
  'next': { normalized: 'Next.js', category: 'Frameworks' },
  'nextjs': { normalized: 'Next.js', category: 'Frameworks' },
  'node': { normalized: 'Node.js', category: 'Frameworks' },
  'nodejs': { normalized: 'Node.js', category: 'Frameworks' },
  'express': { normalized: 'Express.js', category: 'Frameworks' },
  'spring': { normalized: 'Spring Boot', category: 'Frameworks' },
  'springboot': { normalized: 'Spring Boot', category: 'Frameworks' },
  'spring boot': { normalized: 'Spring Boot', category: 'Frameworks' },
  'sql': { normalized: 'SQL', category: 'Databases' },
  'postgres': { normalized: 'PostgreSQL', category: 'Databases' },
  'postgresql': { normalized: 'PostgreSQL', category: 'Databases' },
  'mongo': { normalized: 'MongoDB', category: 'Databases' },
  'mongodb': { normalized: 'MongoDB', category: 'Databases' },
  'git': { normalized: 'Git', category: 'Tools' },
  'docker': { normalized: 'Docker', category: 'Cloud & DevOps' },
  'k8s': { normalized: 'Kubernetes', category: 'Cloud & DevOps' },
  'kubernetes': { normalized: 'Kubernetes', category: 'Cloud & DevOps' },
  'aws': { normalized: 'AWS', category: 'Cloud & DevOps' },
  'dsa': { normalized: 'Data Structures & Algorithms', category: 'Core CS' },
  'data structures': { normalized: 'Data Structures & Algorithms', category: 'Core CS' },
  'rest': { normalized: 'REST APIs', category: 'Frameworks' },
  'rest apis': { normalized: 'REST APIs', category: 'Frameworks' },
  'ml': { normalized: 'Machine Learning', category: 'AI & Data' },
  'machine learning': { normalized: 'Machine Learning', category: 'AI & Data' },
  'html': { normalized: 'HTML5', category: 'Frameworks' },
  'css': { normalized: 'CSS3', category: 'Frameworks' },
  'tailwind': { normalized: 'Tailwind CSS', category: 'Frameworks' },
  'excel': { normalized: 'Excel', category: 'Tools' },
  'power bi': { normalized: 'Power BI', category: 'AI & Data' },
};

export function normalizeClientSkill(rawSkill: string): Skill {
  const cleanKey = rawSkill.trim().toLowerCase();
  const found = CLIENT_SKILL_DICTIONARY[cleanKey];
  if (found) {
    return {
      name: found.normalized,
      originalName: rawSkill,
      category: found.category,
      proficiency: 3,
      status: 'Developing',
    };
  }
  const titleCase = rawSkill
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
  return {
    name: titleCase,
    originalName: rawSkill,
    category: 'Technical',
    proficiency: 3,
    status: 'Developing',
  };
}

export function extractSkillsFromText(text: string): Skill[] {
  const textLower = text.toLowerCase();
  const detected: Skill[] = [];
  const seen = new Set<string>();

  for (const key of Object.keys(CLIENT_SKILL_DICTIONARY)) {
    const regex = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(textLower)) {
      const norm = normalizeClientSkill(key);
      if (!seen.has(norm.name.toLowerCase())) {
        seen.add(norm.name.toLowerCase());
        detected.push(norm);
      }
    }
  }

  if (detected.length === 0) {
    return [
      { name: 'Java', category: 'Programming', proficiency: 4, status: 'Strong' },
      { name: 'SQL', category: 'Databases', proficiency: 4, status: 'Strong' },
      { name: 'Git', category: 'Tools', proficiency: 4, status: 'Strong' },
      { name: 'HTML5', category: 'Frameworks', proficiency: 3, status: 'Developing' },
      { name: 'CSS3', category: 'Frameworks', proficiency: 3, status: 'Developing' },
      { name: 'JavaScript', category: 'Programming', proficiency: 3, status: 'Developing' },
      { name: 'Data Structures & Algorithms', category: 'Core CS', proficiency: 3, status: 'Developing' },
    ];
  }

  return detected;
}

export const DEMO_ALEX_PROFILE: Profile = {
  name: 'Alex Sharma',
  headline: 'Computer Science Student | Aspiring Software Developer',
  experienceLevel: 'Entry Level (0-1 yrs)',
  targetRole: 'Software Developer',
  readinessScore: 78,
  learningStyle: 'Projects & Documentation',
  isDemo: true,
  rawResumeText: 'Java, SQL, Git, HTML, CSS, JavaScript, Data Structures & Algorithms',
  skills: [
    { name: 'Java', category: 'Programming', proficiency: 4, status: 'Strong' },
    { name: 'SQL', category: 'Databases', proficiency: 4, status: 'Strong' },
    { name: 'Git', category: 'Tools', proficiency: 4, status: 'Strong' },
    { name: 'HTML5', category: 'Frameworks', proficiency: 3, status: 'Developing' },
    { name: 'CSS3', category: 'Frameworks', proficiency: 3, status: 'Developing' },
    { name: 'JavaScript', category: 'Programming', proficiency: 3, status: 'Developing' },
    { name: 'Data Structures & Algorithms', category: 'Core CS', proficiency: 3, status: 'Developing' },
    { name: 'Spring Boot', category: 'Frameworks', proficiency: 1, status: 'Needs Attention' },
    { name: 'REST APIs', category: 'Frameworks', proficiency: 2, status: 'Needs Attention' },
  ],
};
