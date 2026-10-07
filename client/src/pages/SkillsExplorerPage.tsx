import React, { useState } from 'react';
import { Layers, Search, Compass, Network, Sparkles } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { SkillChip } from '../components/SkillChip';
import { CLIENT_SKILL_DICTIONARY } from '../services/localIntelligence';
import { SEEDED_ROLES, RoleDefinition } from '../data/seedData';

export const SkillsExplorerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Java');

  const uniqueSkills = Array.from(new Set(Object.values(CLIENT_SKILL_DICTIONARY).map((s: any) => s.normalized)));
  const filteredSkills = searchQuery.trim() === ''
    ? uniqueSkills.slice(0, 12)
    : uniqueSkills.filter((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()));

  // Active selected skill details
  const selectedName = filteredSkills[0] || 'Java';
  const matchingRoles = SEEDED_ROLES.filter((r: RoleDefinition) => r.requiredSkills.some(rs => rs.skill.toLowerCase() === selectedName.toLowerCase())).map((r: RoleDefinition) => r.title);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Badge variant="cyan" className="mb-2">Taxonomy Explorer</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-400" /> Searchable Skill Intelligence Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Explore skill dependencies, categories, difficulty, demand, and career role mappings.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl">
        <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search skills (e.g. Java, React, SQL, Spring Boot)..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Skill Chips Catalog */}
        <Card className="border-slate-800 p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Normalized Skill Catalog</h3>
          <div className="flex flex-wrap gap-2">
            {filteredSkills.map((s: string) => (
              <button key={s} onClick={() => setSearchQuery(s)}>
                <SkillChip name={s} status={s === selectedName ? 'Strong' : 'Developing'} />
              </button>
            ))}
          </div>
        </Card>

        {/* Right Column: Selected Skill Deep-Dive & Relationship Graph */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-blue-500/30 p-6 glow-blue">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Badge variant="cyan" className="mb-1">Selected Competency</Badge>
                <h2 className="text-2xl font-extrabold text-white">{selectedName}</h2>
              </div>
              <div className="flex gap-2">
                <Badge variant="green">Demand: High</Badge>
                <Badge variant="violet">Difficulty: Intermediate</Badge>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-300 block mb-1">Target Career Roles Requiring {selectedName}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(matchingRoles.length > 0 ? matchingRoles : ['Software Developer', 'Backend Developer', 'Full Stack Developer']).map((r: string) => (
                    <span key={r} className="px-2.5 py-1 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20 font-medium">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Skill Relationships */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="font-bold text-white flex items-center gap-1.5 mb-3">
                  <Network className="w-4 h-4 text-cyan-400" /> Skill Dependency Node Map
                </span>
                
                <div className="flex flex-wrap items-center justify-center gap-3 p-4 rounded-lg bg-slate-950 border border-slate-800 text-center font-medium">
                  <span className="px-3 py-1 rounded bg-blue-600/30 text-white border border-blue-500/40">
                    {selectedName}
                  </span>
                  <span className="text-slate-600 font-mono">→</span>
                  <span className="px-3 py-1 rounded bg-slate-900 text-cyan-300 border border-cyan-500/30">
                    Spring Boot
                  </span>
                  <span className="text-slate-600 font-mono">→</span>
                  <span className="px-3 py-1 rounded bg-slate-900 text-violet-300 border border-violet-500/30">
                    REST APIs
                  </span>
                  <span className="text-slate-600 font-mono">→</span>
                  <span className="px-3 py-1 rounded bg-slate-900 text-emerald-300 border border-emerald-500/30">
                    Microservices
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
