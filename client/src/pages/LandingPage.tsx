import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Compass, 
  Zap, 
  GitCommit, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Play,
  Search
} from 'lucide-react';
import { Button, Card, Badge } from '../components/UIPrimitives';
import { Footer } from '../components/Footer';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { triggerDemoMode } = useApp();

  // Interactive Live Demo State
  const [demoSelectedSkill, setDemoSelectedSkill] = useState<string>('Spring Boot');

  const animatedNodes = [
    { label: 'Skills', color: 'from-blue-500 to-cyan-400', x: -160, y: -40 },
    { label: 'Roles', color: 'from-cyan-400 to-teal-400', x: -80, y: 50 },
    { label: 'Gaps', color: 'from-violet-500 to-purple-400', x: 0, y: -50 },
    { label: 'Roadmap', color: 'from-amber-400 to-orange-500', x: 80, y: 40 },
    { label: 'Opportunities', color: 'from-emerald-400 to-green-500', x: 160, y: -30 },
  ];

  const steps = [
    { num: 1, title: 'Profile Input', desc: 'Upload PDF/DOCX resume or paste text profile.' },
    { num: 2, title: 'AI Skill Extraction', desc: 'NLP identifies technical & soft skill keywords.' },
    { num: 3, title: 'Skill Normalization', desc: 'Alias engine unifies variants (e.g. JS → JavaScript).' },
    { num: 4, title: 'Role Comparison', desc: 'Weighted vector matching scores affinity against 10+ career tracks.' },
    { num: 5, title: 'Gap Analysis', desc: 'Identifies proficiency delta between current level and target demands.' },
    { num: 6, title: 'Skill Prioritization', desc: 'Scoring engine ranks gaps into Critical, High, Medium priorities.' },
    { num: 7, title: 'Career Roadmap', desc: 'Generates step-by-step 4-phase milestone timeline with resources.' },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-blue-500 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="cyan" className="mb-6 px-4 py-1.5 text-xs tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> Build For Bharat 2.0 National Hackathon
          </Badge>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
            Turn Your Skills Into Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400">Next Opportunity.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            SkillBridge AI analyzes your skills, discovers career paths, identifies what you're missing, and builds a personalized roadmap to get you there.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              variant="glow"
              size="lg"
              onClick={() => navigate('/resume-analyzer')}
              className="w-full sm:w-auto gap-2"
            >
              Analyze My Profile <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => { triggerDemoMode(); navigate('/dashboard'); }}
              className="w-full sm:w-auto gap-2 border-slate-700 hover:border-cyan-500/40 text-cyan-300"
            >
              <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" /> Explore Skill Intelligence Demo
            </Button>
          </div>

          {/* Animated AI Intelligence Node Flow */}
          <div className="max-w-4xl mx-auto glass-panel p-8 rounded-3xl border-blue-500/20 glow-blue relative">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-8">
              SkillBridge Intelligence Pipeline Nodes
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {animatedNodes.map((node, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 0 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className={`px-4 py-2.5 rounded-xl bg-gradient-to-r ${node.color} text-slate-950 font-bold text-xs shadow-lg`}>
                    {node.label}
                  </div>
                  {idx < animatedNodes.length - 1 && (
                    <span className="text-slate-600 hidden sm:inline font-mono">→</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / CONCEPT SECTION */}
      <section className="py-20 border-y border-slate-800/80 bg-slate-950/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Architectural Blueprint</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">DATA → INTELLIGENCE → ACTION</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-500/30">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 w-fit mb-4 border border-blue-500/20">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. DATA</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2">✓ Resumes (PDF, DOCX, TXT)</li>
                <li className="flex items-center gap-2">✓ Job descriptions & requirements</li>
                <li className="flex items-center gap-2">✓ Open skill datasets & aliases</li>
                <li className="flex items-center gap-2">✓ Career taxonomies & roles</li>
              </ul>
            </Card>

            <Card className="border-cyan-500/30">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit mb-4 border border-cyan-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. INTELLIGENCE</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2">✓ AI & regex skill extraction</li>
                <li className="flex items-center gap-2">✓ Skill normalization engine</li>
                <li className="flex items-center gap-2">✓ Semantic affinity matching</li>
                <li className="flex items-center gap-2">✓ Gap prioritization matrix</li>
              </ul>
            </Card>

            <Card className="border-violet-500/30">
              <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400 w-fit mb-4 border border-violet-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. ACTION</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2">✓ Target career recommendations</li>
                <li className="flex items-center gap-2">✓ Next-best skill priorities</li>
                <li className="flex items-center gap-2">✓ 4-Phase learning roadmap</li>
                <li className="flex items-center gap-2">✓ Talent discovery & matching</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (7 Animated Steps) */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">How SkillBridge AI Works</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              From raw resume text to prioritized career roadmaps in seven automated steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <motion.div
                key={step.num}
                whileHover={{ y: -4 }}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-blue-500/40 relative"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 font-extrabold flex items-center justify-center text-sm mb-3">
                  0{step.num}
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CAREER INTELLIGENCE DEMO (Interactive Preview Component) */}
      <section className="py-20 bg-slate-950/80 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="cyan" className="mb-2">Interactive Live Engine Preview</Badge>
            <h2 className="text-3xl font-extrabold text-white">Experience SkillBridge Intelligence</h2>
          </div>

          <Card className="max-w-4xl mx-auto border-blue-500/30 p-8 glow-blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Current Profile */}
              <div>
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Current Profile Input</h3>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 mb-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Profile Name:</span>
                    <span className="text-white font-semibold">Alex Sharma</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Target Role:</span>
                    <span className="text-cyan-400 font-semibold">Software Developer</span>
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-semibold block mb-2">Detected Skills:</span>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['Java', 'SQL', 'Git', 'Data Structures', 'HTML', 'CSS'].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Calculated Output */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-400">Career Match Score:</span>
                  <span className="text-2xl font-extrabold text-emerald-400">84%</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Critical Missing Skill Gaps:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Spring Boot', 'Advanced DSA', 'REST APIs'].map((gap) => (
                        <button
                          key={gap}
                          onClick={() => setDemoSelectedSkill(gap)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                            demoSelectedSkill === gap
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 scale-105'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          ! {gap}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200">
                    <span className="font-semibold text-white block mb-0.5">Next Best Recommended Action:</span>
                    Strengthen DSA → Learn {demoSelectedSkill} → Build REST API Capstone Project
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => { triggerDemoMode(); navigate('/dashboard'); }}
                >
                  Load Full Demo Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. TWO-SIDED WORKFORCE SECTION */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-3">Connecting the Workforce Ecosystem</h2>
            <p className="text-sm text-slate-400">Tailored intelligence for candidates, hiring teams, and institutions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-500/30">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 w-fit mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">For Students & Professionals</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Get total career clarity, transparent skill gap analysis, personalized roadmaps, and curated opportunity matching.
              </p>
              <Link to="/dashboard" className="text-xs text-blue-400 font-semibold hover:underline">Explore Student Dashboard →</Link>
            </Card>

            <Card className="border-cyan-500/30">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">For Employers</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Find candidates through actual skill alignment, not keyword parsing. Rank candidates deterministically against requirements.
              </p>
              <Link to="/employer" className="text-xs text-cyan-400 font-semibold hover:underline">Explore Employer Hub →</Link>
            </Card>

            <Card className="border-violet-500/30">
              <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400 w-fit mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">For Universities</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Gain workforce-aligned curriculum insights, map academic courses against industry emerging skill demand, and boost graduate outcomes.
              </p>
              <Link to="/university" className="text-xs text-violet-400 font-semibold hover:underline">Explore University Hub →</Link>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
