import React from 'react';
import { Network, Layers, Cpu, Zap, ArrowDown, Sparkles } from 'lucide-react';
import { Card, Badge } from '../components/UIPrimitives';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-2 pb-6 border-b border-slate-800">
        <Badge variant="cyan" className="mb-2">System Architecture Blueprint</Badge>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
          <Network className="w-7 h-7 text-blue-400" /> SkillBridge AI Intelligence Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          DATA → AI / NLP → INTELLIGENCE → ACTION Architecture
        </p>
      </div>

      <div className="space-y-6 relative">
        
        {/* Step 1: DATA */}
        <Card className="border-blue-500/30 p-6 glow-blue">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">1. DATA LAYER</h3>
              <p className="text-xs text-slate-400">Multi-source input ingestion & data structuring</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">📄 PDF/DOCX/TXT Resumes</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">💼 Job Description Datasets</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">🌐 Skill Ontology Taxonomy</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">📊 Experience Benchmarks</div>
          </div>
        </Card>

        <div className="flex justify-center"><ArrowDown className="w-6 h-6 text-cyan-400 animate-bounce" /></div>

        {/* Step 2: AI / NLP */}
        <Card className="border-cyan-500/30 p-6 glow-cyan">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">2. AI / NLP EXTRACTION & NORMALIZATION</h3>
              <p className="text-xs text-slate-400">Skill parsing & alias dictionary engine</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">🔍 Skill NLP Extraction</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">🔄 Alias Normalization Dictionary</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">📊 Weighted Vector Matching</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">⚡ Gemini & Local AI Provider</div>
          </div>
        </Card>

        <div className="flex justify-center"><ArrowDown className="w-6 h-6 text-violet-400 animate-bounce" /></div>

        {/* Step 3: INTELLIGENCE */}
        <Card className="border-violet-500/30 p-6 glow-violet">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-violet-500/10 rounded-xl text-violet-400 border border-violet-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">3. INTELLIGENCE ENGINE</h3>
              <p className="text-xs text-slate-400">Affinity scoring & priority delta scoring</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">🎯 Role Match Scoring</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">⚖️ Gap Priority Matrix</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">📈 Readiness Score Calculation</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">💡 Contextual AI Recommendations</div>
          </div>
        </Card>

        <div className="flex justify-center"><ArrowDown className="w-6 h-6 text-emerald-400 animate-bounce" /></div>

        {/* Step 4: ACTION */}
        <Card className="border-emerald-500/30 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">4. ACTIONABLE OUTPUTS</h3>
              <p className="text-xs text-slate-400">Personalized user workflows & hiring discovery</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300 font-medium">🗺️ 4-Phase Career Roadmap</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300 font-medium">⚡ Prioritized Next Best Actions</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300 font-medium">💼 Skill-Based Talent Matching</div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300 font-medium">🎓 University Curriculum Insights</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
