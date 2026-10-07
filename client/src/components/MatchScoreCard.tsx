import React from 'react';
import { Compass, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, Button, Badge } from './UIPrimitives';
import { CareerMatch } from '../types';
import { useNavigate } from 'react-router-dom';

interface MatchScoreCardProps {
  match: CareerMatch;
  onViewDetails?: () => void;
}

export const MatchScoreCard: React.FC<MatchScoreCardProps> = ({ match, onViewDetails }) => {
  const navigate = useNavigate();

  let scoreColor = 'text-blue-400 border-blue-500/30 bg-blue-500/10';
  if (match.matchScore >= 80) scoreColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  else if (match.matchScore >= 70) scoreColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';

  return (
    <Card className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">{match.roleTitle}</h3>
            <p className="text-xs text-slate-400">{match.domain}</p>
          </div>
          <div className={`px-3 py-1.5 rounded-xl border font-extrabold text-lg ${scoreColor}`}>
            {match.matchScore}%
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
          {match.description}
        </p>

        {/* Matched vs Missing Skills */}
        <div className="space-y-2 mb-4">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Matched Skills ({match.matchedSkills.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {match.matchedSkills.slice(0, 4).map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]">
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          {match.missingSkills.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Missing Gaps ({match.missingSkills.length})
              </span>
              <div className="flex flex-wrap gap-1">
                {match.missingSkills.slice(0, 3).map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px]">
                    ! {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full justify-between mt-2 border-slate-700 hover:border-blue-500/50 hover:bg-blue-600/10 text-slate-200"
        onClick={onViewDetails || (() => navigate(`/career-matches/${match.roleId}`))}
      >
        <span>View Detailed Match Analysis</span>
        <ArrowRight className="w-4 h-4 text-blue-400" />
      </Button>
    </Card>
  );
};
