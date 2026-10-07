import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, CheckCircle2, Clock, Compass, Layers, GitCommit, Bot, FileText } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { CircularProgress } from '../components/CircularProgress';
import { MatchScoreCard } from '../components/MatchScoreCard';
import { SkillBarChartCard, SkillRadarChartCard } from '../components/ChartCard';
import { useApp } from '../context/AppContext';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, activeRole, isDemoMode } = useApp();

  const matches = [
    {
      roleId: 'role-software-dev',
      roleTitle: 'Software Developer',
      domain: 'Software Engineering',
      description: 'Design, develop, test, and maintain robust application software and platform components.',
      matchScore: 84,
      matchedSkills: ['Java', 'Git', 'SQL', 'DSA'],
      missingSkills: ['Spring Boot', 'REST APIs', 'System Design'],
      preferredMatched: ['JavaScript'],
      readinessLabel: 'High Potential' as const,
    },
    {
      roleId: 'role-backend-dev',
      roleTitle: 'Backend Developer',
      domain: 'Backend Engineering',
      description: 'Build microservices, high-throughput REST APIs, database architectures, and server workflows.',
      matchScore: 79,
      matchedSkills: ['Java', 'SQL', 'Git'],
      missingSkills: ['Spring Boot', 'PostgreSQL', 'Node.js'],
      preferredMatched: [],
      readinessLabel: 'High Potential' as const,
    },
    {
      roleId: 'role-fullstack-dev',
      roleTitle: 'Full Stack Developer',
      domain: 'Software Engineering',
      description: 'Deliver end-to-end applications from reactive client UIs down to database persistence.',
      matchScore: 72,
      matchedSkills: ['JavaScript', 'HTML5', 'CSS3', 'Git'],
      missingSkills: ['React', 'Node.js', 'PostgreSQL'],
      preferredMatched: [],
      readinessLabel: 'Developing' as const,
    },
  ];

  const skillHealth = [
    { name: 'Java', level: 85, status: 'Strong' },
    { name: 'Git & Versioning', level: 90, status: 'Strong' },
    { name: 'SQL Querying', level: 80, status: 'Strong' },
    { name: 'Data Structures (DSA)', level: 60, status: 'Developing' },
    { name: 'HTML & CSS', level: 65, status: 'Developing' },
    { name: 'Spring Boot Framework', level: 25, status: 'Needs Attention' },
    { name: 'System Architecture', level: 30, status: 'Needs Attention' },
  ];

  const nextActions = [
    {
      title: 'Complete DSA Fundamentals',
      reason: 'Strengthen core logic to score 90%+ on technical interview benchmarks.',
      effort: '2 weeks',
      priority: 'High',
      link: '/roadmap',
    },
    {
      title: 'Learn Spring Boot Microservices',
      reason: 'Required for your target Backend / Software Developer role to bridge critical gap.',
      effort: '3 weeks',
      priority: 'Critical',
      link: '/skill-gaps',
    },
    {
      title: 'Build Production REST API Project',
      reason: 'Hands-on capstone project to demonstrate enterprise ready backend architecture.',
      effort: '4 weeks',
      priority: 'Critical',
      link: '/roadmap',
    },
  ];

  const emergingSkillsData = [
    { subject: 'GenAI & LLMs', level: 85, fullMark: 100 },
    { subject: 'Cloud & AWS', level: 75, fullMark: 100 },
    { subject: 'DevOps & K8s', level: 65, fullMark: 100 },
    { subject: 'Cybersecurity', level: 70, fullMark: 100 },
    { subject: 'Data Engineering', level: 80, fullMark: 100 },
    { subject: 'Microservices', level: 90, fullMark: 100 },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good morning, {user?.name.split(' ')[0] || 'Alex'}
            </h1>
            <Badge variant="cyan">Target Goal: {activeRole}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Here's where your career stands today. Driven by SkillBridge AI Intelligence Engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/resume-analyzer')} className="gap-2 text-xs">
            <FileText className="w-3.5 h-3.5 text-blue-400" /> Re-Analyze Resume
          </Button>
          <Button variant="glow" size="sm" onClick={() => navigate('/coach')} className="gap-2 text-xs">
            <Bot className="w-3.5 h-3.5" /> AI Career Coach
          </Button>
        </div>
      </div>

      {/* Grid Row 1: Career Readiness Score & Health Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Career Readiness Score Card */}
        <Card className="border-blue-500/30 flex flex-col items-center justify-center text-center p-6 glow-blue">
          <CircularProgress score={profile.readinessScore || 78} label="Career Readiness Score" />
          <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-white block mb-0.5">Readiness Rationale:</span>
            Your score is calculated based on 7 weighted skills matching target **{activeRole}** requirements. Solid CS foundation with a growth delta in enterprise frameworks.
          </div>
        </Card>

        {/* Skill Health Progress Bars */}
        <Card className="lg:col-span-2 border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Skill Health Matrix</h3>
              <p className="text-xs text-slate-400">Proficiency health across required competencies</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/skills')} className="text-xs text-blue-400">
              View All Skills →
            </Button>
          </div>

          <div className="space-y-3">
            {skillHealth.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-200">{skill.name}</span>
                  <span className={`text-[11px] font-semibold ${
                    skill.status === 'Strong' ? 'text-emerald-400' : skill.status === 'Developing' ? 'text-cyan-400' : 'text-amber-400'
                  }`}>
                    {skill.status} ({skill.level}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      skill.status === 'Strong' ? 'bg-emerald-400' : skill.status === 'Developing' ? 'bg-cyan-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Grid Row 2: Top Career Matches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-400" /> Top Career Affinity Matches
            </h2>
            <p className="text-xs text-slate-400">Ranked by deterministic weighted skill algorithm</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/career-matches')} className="text-xs">
            View All Matches →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matches.map((m) => (
            <MatchScoreCard key={m.roleId} match={m} />
          ))}
        </div>
      </div>

      {/* Grid Row 3: Next Best Actions & Emerging Skills Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Next Best Actions */}
        <Card className="border-cyan-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Prioritized Next Best Actions
            </h3>
            <Badge variant="cyan">High ROI</Badge>
          </div>

          <div className="space-y-3">
            {nextActions.map((action, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white">{idx + 1}. {action.title}</h4>
                  <Badge variant={action.priority === 'Critical' ? 'red' : 'amber'}>
                    {action.priority}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mb-3">{action.reason}</p>
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> Est: {action.effort}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => navigate(action.link)} className="text-cyan-400 text-xs p-0">
                    Take Action →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Emerging Skills Radar */}
        <SkillRadarChartCard data={emergingSkillsData} title="Emerging Industry Skill Matrix" />
      </div>

      {/* Grid Row 4: Career Roadmap Preview Timeline */}
      <Card className="border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-blue-400" /> Personalized Career Roadmap Preview
            </h3>
            <p className="text-xs text-slate-400">Step-by-step milestone path towards target Software Developer role</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/roadmap')} className="text-xs">
            Open Full Interactive Roadmap →
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 font-medium text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> Current: Foundations
          </div>
          <span className="text-slate-600 hidden md:inline">→</span>
          <div className="flex items-center gap-2 font-semibold text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Phase 1: DSA & SQL
          </div>
          <span className="text-slate-600 hidden md:inline">→</span>
          <div className="text-slate-400">Phase 2: Spring Boot</div>
          <span className="text-slate-600 hidden md:inline">→</span>
          <div className="text-slate-400">Phase 3: REST API Capstone</div>
          <span className="text-slate-600 hidden md:inline">→</span>
          <div className="text-blue-400 font-bold">Career Ready 🎉</div>
        </div>
      </Card>
    </div>
  );
};
