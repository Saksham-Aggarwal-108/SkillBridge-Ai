export interface NormalizedSkillResult {
  original: string;
  normalized: string;
  category: string;
  proficiency: number;
}

export const SKILL_ALIAS_MAP: Record<string, { normalized: string; category: string }> = {
  // Programming & Scripting
  'js': { normalized: 'JavaScript', category: 'Programming' },
  'javascript': { normalized: 'JavaScript', category: 'Programming' },
  'ts': { normalized: 'TypeScript', category: 'Programming' },
  'typescript': { normalized: 'TypeScript', category: 'Programming' },
  'py': { normalized: 'Python', category: 'Programming' },
  'python': { normalized: 'Python', category: 'Programming' },
  'java': { normalized: 'Java', category: 'Programming' },
  'c++': { normalized: 'C++', category: 'Programming' },
  'cpp': { normalized: 'C++', category: 'Programming' },
  'c#': { normalized: 'C#', category: 'Programming' },
  'csharp': { normalized: 'C#', category: 'Programming' },
  'golang': { normalized: 'Go', category: 'Programming' },
  'go': { normalized: 'Go', category: 'Programming' },
  'rust': { normalized: 'Rust', category: 'Programming' },

  // Frameworks & Web
  'react': { normalized: 'React', category: 'Frameworks' },
  'reactjs': { normalized: 'React', category: 'Frameworks' },
  'react.js': { normalized: 'React', category: 'Frameworks' },
  'next': { normalized: 'Next.js', category: 'Frameworks' },
  'nextjs': { normalized: 'Next.js', category: 'Frameworks' },
  'vue': { normalized: 'Vue.js', category: 'Frameworks' },
  'vuejs': { normalized: 'Vue.js', category: 'Frameworks' },
  'angular': { normalized: 'Angular', category: 'Frameworks' },
  'node': { normalized: 'Node.js', category: 'Frameworks' },
  'nodejs': { normalized: 'Node.js', category: 'Frameworks' },
  'express': { normalized: 'Express.js', category: 'Frameworks' },
  'expressjs': { normalized: 'Express.js', category: 'Frameworks' },
  'spring': { normalized: 'Spring Boot', category: 'Frameworks' },
  'springboot': { normalized: 'Spring Boot', category: 'Frameworks' },
  'spring boot': { normalized: 'Spring Boot', category: 'Frameworks' },
  'django': { normalized: 'Django', category: 'Frameworks' },
  'flask': { normalized: 'Flask', category: 'Frameworks' },
  'fastapi': { normalized: 'FastAPI', category: 'Frameworks' },
  'tailwind': { normalized: 'Tailwind CSS', category: 'Frameworks' },
  'tailwindcss': { normalized: 'Tailwind CSS', category: 'Frameworks' },
  'html': { normalized: 'HTML5', category: 'Frameworks' },
  'html5': { normalized: 'HTML5', category: 'Frameworks' },
  'css': { normalized: 'CSS3', category: 'Frameworks' },
  'css3': { normalized: 'CSS3', category: 'Frameworks' },

  // Databases
  'sql': { normalized: 'SQL', category: 'Databases' },
  'postgres': { normalized: 'PostgreSQL', category: 'Databases' },
  'postgresql': { normalized: 'PostgreSQL', category: 'Databases' },
  'mysql': { normalized: 'MySQL', category: 'Databases' },
  'mongo': { normalized: 'MongoDB', category: 'Databases' },
  'mongodb': { normalized: 'MongoDB', category: 'Databases' },
  'redis': { normalized: 'Redis', category: 'Databases' },
  'sqlite': { normalized: 'SQLite', category: 'Databases' },

  // Cloud & DevOps
  'aws': { normalized: 'AWS', category: 'Cloud & DevOps' },
  'amazon web services': { normalized: 'AWS', category: 'Cloud & DevOps' },
  'azure': { normalized: 'Azure', category: 'Cloud & DevOps' },
  'gcp': { normalized: 'GCP', category: 'Cloud & DevOps' },
  'google cloud': { normalized: 'GCP', category: 'Cloud & DevOps' },
  'docker': { normalized: 'Docker', category: 'Cloud & DevOps' },
  'k8s': { normalized: 'Kubernetes', category: 'Cloud & DevOps' },
  'kubernetes': { normalized: 'Kubernetes', category: 'Cloud & DevOps' },
  'git': { normalized: 'Git', category: 'Tools' },
  'github': { normalized: 'Git', category: 'Tools' },
  'linux': { normalized: 'Linux', category: 'Tools' },
  'cicd': { normalized: 'CI/CD', category: 'Cloud & DevOps' },
  'ci/cd': { normalized: 'CI/CD', category: 'Cloud & DevOps' },

  // Core CS & AI
  'ds': { normalized: 'Data Structures', category: 'Core CS' },
  'dsa': { normalized: 'Data Structures & Algorithms', category: 'Core CS' },
  'data structures': { normalized: 'Data Structures & Algorithms', category: 'Core CS' },
  'algorithms': { normalized: 'Data Structures & Algorithms', category: 'Core CS' },
  'system design': { normalized: 'System Design', category: 'Core CS' },
  'rest': { normalized: 'REST APIs', category: 'Frameworks' },
  'rest api': { normalized: 'REST APIs', category: 'Frameworks' },
  'rest apis': { normalized: 'REST APIs', category: 'Frameworks' },
  'ml': { normalized: 'Machine Learning', category: 'AI & Data' },
  'machine learning': { normalized: 'Machine Learning', category: 'AI & Data' },
  'dl': { normalized: 'Deep Learning', category: 'AI & Data' },
  'deep learning': { normalized: 'Deep Learning', category: 'AI & Data' },
  'nlp': { normalized: 'NLP', category: 'AI & Data' },
  'genai': { normalized: 'Generative AI', category: 'AI & Data' },
  'generative ai': { normalized: 'Generative AI', category: 'AI & Data' },
  'powerbi': { normalized: 'Power BI', category: 'AI & Data' },
  'power bi': { normalized: 'Power BI', category: 'AI & Data' },
  'excel': { normalized: 'Excel', category: 'Tools' },
};

export class SkillNormalizationEngine {
  public static normalize(rawSkill: string, estimatedProficiency: number = 3): NormalizedSkillResult {
    const cleanKey = rawSkill.trim().toLowerCase().replace(/[-_]/g, ' ');
    const entry = SKILL_ALIAS_MAP[cleanKey] || SKILL_ALIAS_MAP[cleanKey.replace(/\s+/g, '')];

    if (entry) {
      return {
        original: rawSkill,
        normalized: entry.normalized,
        category: entry.category,
        proficiency: Math.min(5, Math.max(1, estimatedProficiency)),
      };
    }

    // Capitalize fallback
    const titleCase = rawSkill
      .trim()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');

    return {
      original: rawSkill,
      normalized: titleCase,
      category: 'Technical Skills',
      proficiency: Math.min(5, Math.max(1, estimatedProficiency)),
    };
  }

  public static normalizeList(rawSkills: string[]): NormalizedSkillResult[] {
    const seen = new Set<string>();
    const results: NormalizedSkillResult[] = [];

    for (const raw of rawSkills) {
      if (!raw || raw.trim().length === 0) continue;
      const normalized = this.normalize(raw);
      if (!seen.has(normalized.normalized.toLowerCase())) {
        seen.add(normalized.normalized.toLowerCase());
        results.push(normalized);
      }
    }

    return results;
  }
}
