import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { CircularProgress } from '../components/CircularProgress';
import { SEEDED_ROLES, RoleDefinition } from '../data/seedData';
import { CareerMatchingEngine } from '../engines/CareerMatchingEngine';
import { SkillGapEngine } from '../engines/SkillGapEngine';
import { useApp } from '../context/AppContext';
import { SkillGap } from '../types';

export const RoleDetailPage: React.FC = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const { profile, setActiveRole } = useApp();

  const role = SEEDED_ROLES.find((r: RoleDefinition) => r.id === roleId || r.title.toLowerCase().replace(/\s+/g, '-') === roleId) || SEEDED_ROLES[0];

  const formattedUserSkills = profile.skills.map(s => ({ name: s.name, proficiency: s.proficiency, category: s.category }));
  const matchResult = CareerMatchingEngine.calculateMatch(formattedUserSkills, role as any);
  const gapAnalysis = SkillGapEngine.analyzeGaps(formattedUserSkills, role as any);

  const handleSelectRole = () => {
    setActiveRole(role.title);
    navigate('/skill-gaps');
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/career-matches')}
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Career Matches
      </button>

      {/* Role Title & Top Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 glass-panel rounded-2xl border-blue-500/30">
        <div>
          <Badge variant="cyan" className="mb-2">{role.domain}</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{role.title}</h1>
          <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">{role.description}</p>
          <span className="text-[11px] font-mono text-slate-400 block mt-2">Expectations: {role.expExpectations}</span>
        </div>

        <div className="flex flex-col items-center">
          <CircularProgress score={matchResult.matchScore} size={110} strokeWidth={9} label="Affinity Score" />
          <Button variant="glow" size="sm" onClick={handleSelectRole} className="mt-3 text-xs gap-1.5">
            Target This Role <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Why You Match vs Missing Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Why You Match */}
        <Card className="border-emerald-500/30 p-6">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Why You Match ({matchResult.matchedSkills.length})
          </h3>
          <p className="text-xs text-slate-400 mb-4">You satisfy these core skills required for {role.title}:</p>
          
          <div className="space-y-2">
            {matchResult.matchedSkills.map((s: string, idx: number) => (
              <div key={idx} className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300 flex items-center justify-between">
                <span>✓ {s}</span>
                <span className="text-[10px] text-emerald-400 font-mono">Verified Match</span>
              </div>
            ))}
          </div>
        </Card>

        {/* What You're Missing */}
        <Card className="border-amber-500/30 p-6">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> What You're Missing ({matchResult.missingSkills.length})
          </h3>
          <p className="text-xs text-slate-400 mb-4">Competency gaps preventing 100% readiness:</p>
          
          <div className="space-y-2">
            {matchResult.missingSkills.map((s: string, idx: number) => (
              <div key={idx} className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-300 flex items-center justify-between">
                <span>! {s}</span>
                <span className="text-[10px] text-amber-400 font-mono">Action Required</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Interactive Horizontal Level Comparison Chart */}
      <Card className="border-slate-800 p-6">
        <h3 className="text-base font-bold text-white mb-1">Detailed Skill Level Comparison</h3>
        <p className="text-xs text-slate-400 mb-6">Interactive view comparing Your Current Level vs Required Role Benchmark</p>

        <div className="space-y-4">
          {gapAnalysis.map((gap: SkillGap, idx: number) => (
            <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">{gap.skillName}</span>
                <span className="text-slate-400 font-mono text-[11px]">
                  Current: <strong className="text-blue-400">{gap.currentLevel}/5</strong> | Required: <strong className="text-amber-400">{gap.requiredLevel}/5</strong>
                </span>
              </div>

              {/* Your Level Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(gap.currentLevel / 5) * 100}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 pt-1">{gap.rationale}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
