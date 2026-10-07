import React, { useState } from 'react';
import { Building2, Plus, Search, UserCheck, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { SEEDED_ROLES, SEEDED_DEMO_CANDIDATES, RoleDefinition } from '../data/seedData';
import { CareerMatchingEngine } from '../engines/CareerMatchingEngine';
import { useApp } from '../context/AppContext';

export const EmployerPage: React.FC = () => {
  const { addNotification } = useApp();
  const [selectedRole, setSelectedRole] = useState<string>('Software Developer');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [reqSkillsInput, setReqSkillsInput] = useState('Java, SQL, Git, Data Structures & Algorithms');
  const [createdJobs, setCreatedJobs] = useState<any[]>([
    {
      id: 'job-1',
      title: 'Associate Software Developer',
      role: 'Software Developer',
      requiredSkills: ['Java', 'SQL', 'Git', 'Data Structures & Algorithms'],
    },
  ]);

  const roleDef = SEEDED_ROLES.find((r: RoleDefinition) => r.title.toLowerCase() === selectedRole.toLowerCase()) || SEEDED_ROLES[0];

  const rankedCandidates = SEEDED_DEMO_CANDIDATES.map((cand: any) => {
    const normSkills = cand.skills.map((s: string) => ({ name: s }));
    const match = CareerMatchingEngine.calculateMatch(normSkills, roleDef as any);
    return {
      ...cand,
      matchScore: match.matchScore,
      matchedSkills: match.matchedSkills,
      missingSkills: match.missingSkills,
    };
  }).sort((a: any, b: any) => b.matchScore - a.matchScore);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      id: `job-${Date.now()}`,
      title: jobTitle || 'Junior Developer',
      role: selectedRole,
      requiredSkills: reqSkillsInput.split(',').map((s: string) => s.trim()),
    };
    setCreatedJobs([newJob, ...createdJobs]);
    setJobTitle('');
    setJobDesc('');
    addNotification('Job Requisition Posted', `Published ${newJob.title}. Candidate matching updated!`, 'success');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Badge variant="cyan" className="mb-2">Talent Discovery Portal</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-400" /> Find Talent Through Skills, Not Keywords.
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Rank candidates using transparent deterministic skill affinity algorithms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Job Creation Form */}
        <Card className="border-blue-500/30 p-6">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-400" /> Post New Job Requisition
          </h3>

          <form onSubmit={handleCreateJob} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Role Category</label>
              <select
                className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {SEEDED_ROLES.map((r: RoleDefinition) => (
                  <option key={r.id} value={r.title}>{r.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Job Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Junior Java Developer"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Required Skills (Comma Separated)</label>
              <input
                type="text"
                placeholder="Java, SQL, Git, DSA"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                value={reqSkillsInput}
                onChange={(e) => setReqSkillsInput(e.target.value)}
              />
            </div>

            <Button type="submit" variant="glow" className="w-full justify-center gap-2 text-xs">
              Publish Job & Rank Candidates <Sparkles className="w-3.5 h-3.5" />
            </Button>
          </form>
        </Card>

        {/* Candidate Alignment Ranking */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-cyan-400" /> Matched Candidates for "{selectedRole}"
            </h3>
            <span className="text-xs text-slate-400 font-mono">{rankedCandidates.length} Candidates Evaluated</span>
          </div>

          <div className="space-y-4">
            {rankedCandidates.map((cand: any, idx: number) => (
              <Card key={idx} className="border-slate-800 p-5 hover:border-blue-500/40">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      {cand.name}
                      <Badge variant="blue">{cand.experienceLevel}</Badge>
                    </h4>
                    <p className="text-xs text-slate-400">{cand.role}</p>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-lg">
                    {cand.matchScore}% Match
                  </div>
                </div>

                <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Matched Skills ({cand.matchedSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cand.matchedSkills.map((s: string, sIdx: number) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px]">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Skill Gaps ({cand.missingSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cand.missingSkills.map((s: string, sIdx: number) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px]">
                          ! {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
