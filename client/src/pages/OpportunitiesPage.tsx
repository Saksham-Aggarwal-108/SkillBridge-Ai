import React from 'react';
import { Briefcase, MapPin, Building, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { SEEDED_OPPORTUNITIES } from '../data/seedData';
import { useApp } from '../context/AppContext';

export const OpportunitiesPage: React.FC = () => {
  const { addNotification } = useApp();

  const handleApply = (title: string, org: string) => {
    addNotification('Application Submitted!', `Your SkillBridge profile was sent to ${org} for ${title}.`, 'success');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Badge variant="cyan" className="mb-2">Skill-Matched Hiring Feed</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" /> Career Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Jobs & Internships scored directly against your verified skill profile.
          </p>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-6">
        {SEEDED_OPPORTUNITIES.map((opp: any) => {
          const reqSkills: string[] = JSON.parse(opp.requiredSkills);
          return (
            <Card key={opp.id} className="border-slate-800 p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white">{opp.title}</h3>
                    <Badge variant="cyan">{opp.workMode}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-blue-400" /> {opp.organization}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {opp.location}</span>
                    <span>Exp: {opp.experience}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-emerald-400">{opp.matchScore}%</span>
                    <span className="text-[10px] text-slate-400 block">Skill Match</span>
                  </div>
                  <Button variant="glow" size="sm" onClick={() => handleApply(opp.title, opp.organization)} className="gap-1 text-xs">
                    Quick Apply <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Why You Match */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Why You're a Match:
                  </span>
                  <p className="text-slate-300">
                    You meet key required skills: {reqSkills.slice(0, 3).join(', ')}.
                  </p>
                </div>

                {/* What to Improve */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> What to Improve:
                  </span>
                  <p className="text-slate-300">
                    Strengthen Spring Boot & REST APIs to reach 95%+ top alignment tier.
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
