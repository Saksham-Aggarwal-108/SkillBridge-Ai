import React from 'react';
import { Zap, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { GapIndicator } from '../components/GapIndicator';
import { SEEDED_ROLES, RoleDefinition } from '../data/seedData';
import { SkillGapEngine } from '../engines/SkillGapEngine';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { SkillGap } from '../types';

export const SkillGapsPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeRole, profile } = useApp();

  const role = SEEDED_ROLES.find((r: RoleDefinition) => r.title.toLowerCase() === activeRole.toLowerCase()) || SEEDED_ROLES[0];
  const formattedSkills = profile.skills.map(s => ({ name: s.name, proficiency: s.proficiency, category: s.category }));
  const gaps = SkillGapEngine.analyzeGaps(formattedSkills, role as any);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Badge variant="amber" className="mb-2">Priority Scoring Matrix Engine</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" /> Skill Gap Prioritization
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Targeting: <strong className="text-cyan-300">{role.title}</strong> ({role.domain})
          </p>
        </div>

        <Button variant="glow" size="sm" onClick={() => navigate('/roadmap')} className="gap-2 text-xs">
          Generate Action Roadmap <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Priority Gap Table / Responsive Card View */}
      <Card className="border-slate-800 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-4">Skill Name</th>
                <th className="p-4">Current / Required</th>
                <th className="p-4">Proficiency Gap</th>
                <th className="p-4">Market Demand</th>
                <th className="p-4">Priority Level</th>
                <th className="p-4">Priority Rationale & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {gaps.map((gap: SkillGap, idx: number) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    {gap.status === 'MATCH' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <div>
                      <span>{gap.skillName}</span>
                      <span className="block text-[10px] text-slate-500 font-normal">{gap.category}</span>
                    </div>
                  </td>

                  <td className="p-4 font-mono">
                    <span className="text-blue-400 font-bold">{gap.currentLevel}</span>
                    <span className="text-slate-500"> / </span>
                    <span className="text-amber-400 font-bold">{gap.requiredLevel}</span>
                  </td>

                  <td className="p-4">
                    <GapIndicator currentLevel={gap.currentLevel} requiredLevel={gap.requiredLevel} priority={gap.priority} />
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-slate-300">{gap.demand}</span>
                  </td>

                  <td className="p-4">
                    <Badge variant={gap.priority === 'Critical' ? 'red' : gap.priority === 'High' ? 'amber' : gap.priority === 'Medium' ? 'cyan' : 'green'}>
                      {gap.priority}
                    </Badge>
                  </td>

                  <td className="p-4 text-slate-300 leading-relaxed max-w-sm">
                    {gap.rationale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
