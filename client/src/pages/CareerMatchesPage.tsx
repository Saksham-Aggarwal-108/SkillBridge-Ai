import React, { useState } from 'react';
import { Compass, Filter, Search } from 'lucide-react';
import { MatchScoreCard } from '../components/MatchScoreCard';
import { Badge, Button } from '../components/UIPrimitives';
import { SEEDED_ROLES } from '../data/seedData';
import { CareerMatchingEngine } from '../engines/CareerMatchingEngine';
import { useApp } from '../context/AppContext';
import { CareerMatch } from '../types';

export const CareerMatchesPage: React.FC = () => {
  const { profile } = useApp();
  const [domainFilter, setDomainFilter] = useState<string>('ALL');
  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);

  const formattedUserSkills = profile.skills.map(s => ({ name: s.name, proficiency: s.proficiency }));
  const matches = CareerMatchingEngine.matchAllRoles(formattedUserSkills, SEEDED_ROLES as any);

  const filteredMatches = matches.filter((m: CareerMatch) => {
    if (domainFilter !== 'ALL' && m.domain !== domainFilter) return false;
    if (m.matchScore < minScoreFilter) return false;
    return true;
  });

  const domains = ['ALL', 'Software Engineering', 'Backend Engineering', 'Web Engineering', 'Data Science & AI', 'Infrastructure & Cloud'];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Badge variant="cyan" className="mb-2">Deterministic Scoring Engine</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-blue-400" /> Career Role Matches
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Compare your normalized profile skills against 10+ industry role benchmarks.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5 text-blue-400" /> Filter Domain:
          </span>
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setDomainFilter(dom)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                domainFilter === dom
                  ? 'bg-blue-600/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Min Match: {minScoreFilter}%</span>
          <input
            type="range"
            min="0"
            max="80"
            step="10"
            value={minScoreFilter}
            onChange={(e) => setMinScoreFilter(Number(e.target.value))}
            className="w-24 accent-blue-500"
          />
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.map((match: CareerMatch) => (
          <MatchScoreCard key={match.roleId} match={match} />
        ))}
      </div>
    </div>
  );
};
