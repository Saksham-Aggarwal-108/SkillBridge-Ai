export interface RoleDefinition {
  id: string;
  title: string;
  domain: string;
  description: string;
  expExpectations: string;
  requiredSkills: { skill: string; weight: number; requiredLevel: number }[];
  preferredSkills: { skill: string; weight: number; requiredLevel: number }[];
}

export const SEEDED_ROLES: RoleDefinition[] = [
  {
    id: 'role-software-dev',
    title: 'Software Developer',
    domain: 'Software Engineering',
    description: 'Design, develop, test, and maintain robust application software and platform components across object-oriented languages.',
    expExpectations: '0-2 years',
    requiredSkills: [
      { skill: 'Java', weight: 1.2, requiredLevel: 4 },
      { skill: 'Data Structures & Algorithms', weight: 1.4, requiredLevel: 4 },
      { skill: 'SQL', weight: 1.0, requiredLevel: 3 },
      { skill: 'Git', weight: 1.0, requiredLevel: 4 },
      { skill: 'Spring Boot', weight: 1.1, requiredLevel: 3 },
      { skill: 'REST APIs', weight: 1.0, requiredLevel: 4 },
    ],
    preferredSkills: [
      { skill: 'Docker', weight: 0.8, requiredLevel: 3 },
      { skill: 'System Design', weight: 0.9, requiredLevel: 3 },
      { skill: 'JavaScript', weight: 0.7, requiredLevel: 3 },
    ],
  },
  {
    id: 'role-backend-dev',
    title: 'Backend Developer',
    domain: 'Backend Engineering',
    description: 'Build microservices, high-throughput REST/GraphQL APIs, database architectures, and asynchronous server workflows.',
    expExpectations: '0-3 years',
    requiredSkills: [
      { skill: 'Java', weight: 1.2, requiredLevel: 4 },
      { skill: 'Node.js', weight: 1.1, requiredLevel: 4 },
      { skill: 'Spring Boot', weight: 1.3, requiredLevel: 4 },
      { skill: 'PostgreSQL', weight: 1.2, requiredLevel: 4 },
      { skill: 'REST APIs', weight: 1.2, requiredLevel: 4 },
      { skill: 'Git', weight: 1.0, requiredLevel: 4 },
    ],
    preferredSkills: [
      { skill: 'Redis', weight: 0.8, requiredLevel: 3 },
      { skill: 'Docker', weight: 0.9, requiredLevel: 3 },
      { skill: 'Microservices', weight: 0.9, requiredLevel: 3 },
    ],
  },
  {
    id: 'role-frontend-dev',
    title: 'Frontend Developer',
    domain: 'Web Engineering',
    description: 'Craft responsive, accessible, and high-performance modern client interfaces using React, TypeScript, and state management.',
    expExpectations: '0-2 years',
    requiredSkills: [
      { skill: 'JavaScript', weight: 1.3, requiredLevel: 4 },
      { skill: 'React', weight: 1.4, requiredLevel: 4 },
      { skill: 'TypeScript', weight: 1.2, requiredLevel: 4 },
      { skill: 'HTML5', weight: 1.0, requiredLevel: 4 },
      { skill: 'CSS3', weight: 1.0, requiredLevel: 4 },
      { skill: 'Tailwind CSS', weight: 0.9, requiredLevel: 4 },
    ],
    preferredSkills: [
      { skill: 'Next.js', weight: 0.9, requiredLevel: 3 },
      { skill: 'REST APIs', weight: 0.8, requiredLevel: 3 },
      { skill: 'Git', weight: 1.0, requiredLevel: 4 },
    ],
  },
  {
    id: 'role-fullstack-dev',
    title: 'Full Stack Developer',
    domain: 'Software Engineering',
    description: 'Deliver end-to-end applications from reactive client UIs down to relational database persistence and server deployments.',
    expExpectations: '1-3 years',
    requiredSkills: [
      { skill: 'React', weight: 1.2, requiredLevel: 4 },
      { skill: 'Node.js', weight: 1.2, requiredLevel: 4 },
      { skill: 'TypeScript', weight: 1.1, requiredLevel: 4 },
      { skill: 'PostgreSQL', weight: 1.0, requiredLevel: 3 },
      { skill: 'REST APIs', weight: 1.1, requiredLevel: 4 },
      { skill: 'Git', weight: 1.0, requiredLevel: 4 },
    ],
    preferredSkills: [
      { skill: 'Docker', weight: 0.8, requiredLevel: 3 },
      { skill: 'AWS', weight: 0.8, requiredLevel: 3 },
      { skill: 'Tailwind CSS', weight: 0.7, requiredLevel: 3 },
    ],
  },
  {
    id: 'role-data-analyst',
    title: 'Data Analyst',
    domain: 'Data & Analytics',
    description: 'Transform complex raw data into strategic business insights using SQL querying, Python analytics, and interactive dashboards.',
    expExpectations: '0-2 years',
    requiredSkills: [
      { skill: 'SQL', weight: 1.4, requiredLevel: 4 },
      { skill: 'Python', weight: 1.2, requiredLevel: 4 },
      { skill: 'Power BI', weight: 1.2, requiredLevel: 4 },
      { skill: 'Excel', weight: 1.0, requiredLevel: 4 },
    ],
    preferredSkills: [
      { skill: 'PostgreSQL', weight: 0.8, requiredLevel: 3 },
      { skill: 'Machine Learning', weight: 0.7, requiredLevel: 2 },
    ],
  },
  {
    id: 'role-data-scientist',
    title: 'Data Scientist',
    domain: 'Data Science & AI',
    description: 'Construct predictive statistical models, machine learning pipelines, and experimental hypotheses.',
    expExpectations: '1-3 years',
    requiredSkills: [
      { skill: 'Python', weight: 1.4, requiredLevel: 5 },
      { skill: 'SQL', weight: 1.2, requiredLevel: 4 },
      { skill: 'Machine Learning', weight: 1.4, requiredLevel: 4 },
      { skill: 'Data Structures & Algorithms', weight: 1.0, requiredLevel: 3 },
    ],
    preferredSkills: [
      { skill: 'Deep Learning', weight: 0.9, requiredLevel: 3 },
      { skill: 'NLP', weight: 0.8, requiredLevel: 3 },
    ],
  },
  {
    id: 'role-aiml-engineer',
    title: 'AI/ML Engineer',
    domain: 'Artificial Intelligence',
    description: 'Deploy production machine learning systems, fine-tune Generative AI models, and optimize inference pipelines.',
    expExpectations: '1-3 years',
    requiredSkills: [
      { skill: 'Python', weight: 1.4, requiredLevel: 5 },
      { skill: 'Machine Learning', weight: 1.4, requiredLevel: 4 },
      { skill: 'Deep Learning', weight: 1.2, requiredLevel: 4 },
      { skill: 'Generative AI', weight: 1.2, requiredLevel: 3 },
      { skill: 'REST APIs', weight: 1.0, requiredLevel: 3 },
    ],
    preferredSkills: [
      { skill: 'Docker', weight: 0.9, requiredLevel: 3 },
      { skill: 'AWS', weight: 0.8, requiredLevel: 3 },
    ],
  },
  {
    id: 'role-devops-engineer',
    title: 'DevOps Engineer',
    domain: 'Infrastructure & Cloud',
    description: 'Automate CI/CD pipelines, manage container orchestration with Kubernetes, and maintain cloud infra resilience.',
    expExpectations: '1-3 years',
    requiredSkills: [
      { skill: 'Linux', weight: 1.2, requiredLevel: 4 },
      { skill: 'Docker', weight: 1.4, requiredLevel: 4 },
      { skill: 'Kubernetes', weight: 1.3, requiredLevel: 4 },
      { skill: 'CI/CD', weight: 1.2, requiredLevel: 4 },
      { skill: 'AWS', weight: 1.1, requiredLevel: 3 },
      { skill: 'Git', weight: 1.0, requiredLevel: 4 },
    ],
    preferredSkills: [
      { skill: 'Python', weight: 0.8, requiredLevel: 3 },
      { skill: 'Go', weight: 0.7, requiredLevel: 3 },
    ],
  },
  {
    id: 'role-cloud-engineer',
    title: 'Cloud Engineer',
    domain: 'Infrastructure & Cloud',
    description: 'Architect secure multi-tenant cloud solutions, cloud networking, and automated infrastructure as code.',
    expExpectations: '1-3 years',
    requiredSkills: [
      { skill: 'AWS', weight: 1.4, requiredLevel: 4 },
      { skill: 'Linux', weight: 1.2, requiredLevel: 4 },
      { skill: 'Docker', weight: 1.1, requiredLevel: 4 },
      { skill: 'Python', weight: 1.0, requiredLevel: 3 },
    ],
    preferredSkills: [
      { skill: 'Azure', weight: 0.8, requiredLevel: 3 },
      { skill: 'GCP', weight: 0.8, requiredLevel: 3 },
    ],
  },
  {
    id: 'role-cybersecurity',
    title: 'Cybersecurity Analyst',
    domain: 'Information Security',
    description: 'Perform vulnerability assessments, network monitoring, incident response, and security protocol hardening.',
    expExpectations: '0-2 years',
    requiredSkills: [
      { skill: 'Linux', weight: 1.3, requiredLevel: 4 },
      { skill: 'Python', weight: 1.1, requiredLevel: 3 },
      { skill: 'SQL', weight: 1.0, requiredLevel: 3 },
    ],
    preferredSkills: [
      { skill: 'Docker', weight: 0.8, requiredLevel: 3 },
      { skill: 'AWS', weight: 0.8, requiredLevel: 3 },
    ],
  },
];

export const SEEDED_OPPORTUNITIES = [
  {
    id: 'opp-1',
    title: 'Software Developer Intern',
    organization: 'FinTech Dynamics',
    location: 'Bengaluru / Remote',
    workMode: 'Hybrid',
    experience: '0-1 yrs',
    requiredSkills: JSON.stringify(['Java', 'SQL', 'Git', 'Data Structures & Algorithms']),
    description: 'Join our core payments engineering team to build scalable microservices handling high-concurrency transactions.',
    matchScore: 88,
  },
  {
    id: 'opp-2',
    title: 'Junior Backend Developer',
    organization: 'CloudScale AI',
    location: 'Gurugram / Remote',
    workMode: 'Remote',
    experience: '0-2 yrs',
    requiredSkills: JSON.stringify(['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs']),
    description: 'Opportunity to develop asynchronous data streaming pipelines and cloud-native API endpoints.',
    matchScore: 82,
  },
  {
    id: 'opp-3',
    title: 'Frontend Engineer (React)',
    organization: 'Nexus Design Labs',
    location: 'Mumbai / Remote',
    workMode: 'Hybrid',
    experience: '0-2 yrs',
    requiredSkills: JSON.stringify(['React', 'TypeScript', 'Tailwind CSS', 'JavaScript']),
    description: 'Craft responsive, pixel-perfect design system components and dynamic data visualization dashboards.',
    matchScore: 78,
  },
  {
    id: 'opp-4',
    title: 'Data Analyst Associate',
    organization: 'Metrics Insights',
    location: 'Noida / Onsite',
    workMode: 'Onsite',
    experience: '0-1 yrs',
    requiredSkills: JSON.stringify(['SQL', 'Python', 'Power BI', 'Excel']),
    description: 'Analyze user growth metrics, generate automated executive BI dashboards, and perform cohort retention studies.',
    matchScore: 74,
  },
];

export const SEEDED_DEMO_CANDIDATES = [
  {
    name: 'Alex Sharma',
    role: 'Computer Science Student',
    experienceLevel: 'Entry Level (0-1 yrs)',
    skills: ['Java', 'SQL', 'Git', 'HTML5', 'CSS3', 'JavaScript', 'Data Structures & Algorithms'],
    targetRole: 'Software Developer',
  },
  {
    name: 'Priya Verma',
    role: 'Junior Web Developer',
    experienceLevel: 'Mid Level (2 yrs)',
    skills: ['JavaScript', 'React', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Node.js', 'REST APIs'],
    targetRole: 'Frontend Developer',
  },
  {
    name: 'Rohan Mehta',
    role: 'Backend Associate',
    experienceLevel: 'Entry Level (1 yr)',
    skills: ['Java', 'Node.js', 'Spring Boot', 'PostgreSQL', 'REST APIs', 'Git', 'Docker'],
    targetRole: 'Backend Developer',
  },
];

export const SEEDED_UNIVERSITY_CURRICULA = [
  {
    courseName: 'B.Tech Computer Science & Engineering',
    semester: 'Semester 6',
    currentCurriculum: ['Java', 'SQL', 'Data Structures & Algorithms', 'HTML5', 'CSS3'],
    emergingIndustryDemand: ['Spring Boot', 'Docker', 'Generative AI', 'Cloud & AWS', 'DevOps & CI/CD'],
    alignmentScore: 68,
    gaps: [
      { skill: 'Spring Boot', demandTrend: '+140%', industryWeight: 'Critical' },
      { skill: 'Docker & Microservices', demandTrend: '+180%', industryWeight: 'High' },
      { skill: 'Generative AI Applications', demandTrend: '+310%', industryWeight: 'Critical' },
    ],
  },
];
