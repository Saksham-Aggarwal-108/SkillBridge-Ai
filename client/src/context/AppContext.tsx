import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Profile, Notification, RoadmapPhase } from '../types';
import { DEMO_ALEX_PROFILE } from '../services/localIntelligence';

interface AppContextType {
  user: User | null;
  profile: Profile;
  isDemoMode: boolean;
  activeRole: string;
  theme: 'dark' | 'light';
  notifications: Notification[];
  roadmapPhases: RoadmapPhase[];
  aiEngineName: string;
  isLocalIntelligence: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile) => void;
  setActiveRole: (role: string) => void;
  toggleTheme: () => void;
  triggerDemoMode: () => void;
  resetProfile: () => void;
  updateRoadmapPhases: (phases: RoadmapPhase[]) => void;
  toggleRoadmapItem: (itemId: string) => void;
  addNotification: (title: string, message: string, type?: Notification['type']) => void;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'user-demo-1',
    name: 'Alex Sharma',
    email: 'alex.sharma@skillbridge.ai',
    role: 'STUDENT',
  });

  const [profile, setProfile] = useState<Profile>(DEMO_ALEX_PROFILE);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [activeRole, setActiveRole] = useState<string>('Software Developer');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [aiEngineName, setAiEngineName] = useState<string>('SkillBridge Intelligence');
  const [isLocalIntelligence, setIsLocalIntelligence] = useState<boolean>(true);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      title: 'Roadmap Milestone Active',
      message: 'Phase 1 Foundations completed! Next target: Spring Boot & REST APIs.',
      timestamp: '10 mins ago',
      type: 'success',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Top Career Match Discovered',
      message: 'Software Developer (84% Match Score) aligns with your profile.',
      timestamp: '1 hour ago',
      type: 'info',
      read: false,
    },
  ]);

  const [roadmapPhases, setRoadmapPhases] = useState<RoadmapPhase[]>([
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
          title: 'REST API Design & Swagger OpenAPI',
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
          description: 'Architect a full-stack backend service with database indexing, CI/CD pipeline, and tests.',
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
  ]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  const triggerDemoMode = () => {
    setIsDemoMode(true);
    setProfile(DEMO_ALEX_PROFILE);
    setUser({
      id: 'user-demo-1',
      name: 'Alex Sharma',
      email: 'alex.sharma@skillbridge.ai',
      role: 'STUDENT',
    });
    setActiveRole('Software Developer');
    addNotification('Demo Profile Loaded', 'Successfully loaded Alex Sharma demo profile with 78% career readiness.', 'success');
  };

  const resetProfile = () => {
    setIsDemoMode(false);
    setProfile({
      name: 'New Developer',
      headline: 'Aspiring Professional',
      experienceLevel: 'Entry Level',
      targetRole: 'Software Developer',
      readinessScore: 50,
      learningStyle: 'Projects',
      isDemo: false,
      skills: [],
    });
    addNotification('Profile Reset', 'Your profile has been reset to an empty state.', 'info');
  };

  const updateRoadmapPhases = (phases: RoadmapPhase[]) => {
    setRoadmapPhases(phases);
  };

  const toggleRoadmapItem = (itemId: string) => {
    setRoadmapPhases(prev =>
      prev.map(phase => ({
        ...phase,
        items: phase.items.map(item => {
          if (item.id === itemId) {
            const nextCompleted = !item.isCompleted;
            if (nextCompleted) {
              addNotification('Task Completed! 🎉', `You completed "${item.title}". Roadmap progress updated!`, 'success');
            }
            return { ...item, isCompleted: nextCompleted };
          }
          return item;
        }),
      }))
    );
  };

  const addNotification = (title: string, message: string, type: Notification['type'] = 'info') => {
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        isDemoMode,
        activeRole,
        theme,
        notifications,
        roadmapPhases,
        aiEngineName,
        isLocalIntelligence,
        setUser,
        setProfile,
        setActiveRole,
        toggleTheme,
        triggerDemoMode,
        resetProfile,
        updateRoadmapPhases,
        toggleRoadmapItem,
        addNotification,
        markNotificationRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
