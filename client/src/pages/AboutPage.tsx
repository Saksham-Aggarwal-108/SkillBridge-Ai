import React from 'react';
import { Sparkles, Users, Award, Heart } from 'lucide-react';
import { Card, Badge } from '../components/UIPrimitives';

export const AboutPage: React.FC = () => {
  const teamMembers = [
    { name: 'Saksham', role: 'Full Stack & AI Engineer' },
    { name: 'Parisha', role: 'UI/UX & Product Designer' },
    { name: 'Nikhil', role: 'Frontend & Architecture Engineer' },
    { name: 'Nimisha', role: 'Backend & Data Engineer' },
    { name: 'Sonit', role: 'Product Strategist & QA Lead' },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-slate-800">
        <Badge variant="cyan" className="mb-2">Build For Bharat 2.0 Hackathon Entry</Badge>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="w-7 h-7 text-blue-400" /> About SkillBridge AI
        </h1>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          "Don't just show people what they know. Help them understand what to learn next."
        </p>
      </div>

      {/* Mission Card */}
      <Card className="border-blue-500/30 p-6 glow-blue text-center">
        <h2 className="text-lg font-bold text-white mb-2">Our Mission</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
          SkillBridge AI is built to eliminate workforce skill ambiguity. By extracting, normalizing, and scoring skill vectors deterministically, we empower candidates with personalized 4-phase learning roadmaps, connect employers with real skill alignment, and provide universities with workforce curriculum insights.
        </p>
      </Card>

      {/* Team Details */}
      <Card className="border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <Badge variant="cyan" className="mb-1">Hackathon Team</Badge>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> THE PROCESSORS
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">BUILD FOR BHARAT 2.0</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all text-center">
              <div className="w-10 h-10 rounded-full bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center mx-auto mb-2 border border-blue-500/30">
                {member.name.charAt(0)}
              </div>
              <h4 className="text-sm font-bold text-white">{member.name}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
