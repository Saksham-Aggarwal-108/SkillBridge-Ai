import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, X, Tv2, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge } from '../components/UIPrimitives';

export const PresentationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "1. The Workforce Problem",
      subtitle: "The Gap Between Skills & Opportunities",
      content: (
        <div className="space-y-6 text-slate-300">
          <p className="text-lg leading-relaxed">
            Millions of candidates know their current tools, but lack clear direction on <strong className="text-white">what to learn next</strong> to unlock tier-1 job roles.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-red-400 font-bold block mb-1">Traditional Resumes</span>
              Keyword heavy, unstructured, static, and fails to prioritize learning steps.
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">SkillBridge AI Solution</span>
              Extracts, normalizes, scores gaps, and delivers an actionable step-by-step roadmap.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2. Product Vision",
      subtitle: "Don't just show what people know. Help them understand what to learn next.",
      content: (
        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/40 via-slate-900 to-cyan-950/30 border border-cyan-500/30 text-center space-y-4">
          <div className="text-2xl font-extrabold text-white tracking-wide">
            RESUME → AI EXTRACTION → NORMALIZATION → MATCHING → GAP ANALYSIS → ROADMAP → OPPORTUNITY
          </div>
          <p className="text-sm text-slate-300">
            A unified intelligence platform connecting students, hiring employers, and educational institutions.
          </p>
        </div>
      ),
    },
    {
      title: "3. Profile & Resume AI Extraction",
      subtitle: "Multi-step visual processing pipeline",
      content: (
        <div className="space-y-4 text-xs text-left">
          <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/30 flex items-center justify-between">
            <span>✓ Extracting raw keywords (Java, SQL, Git, DSA, ReactJS)</span>
            <Badge variant="cyan">NLP Extraction</Badge>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between">
            <span>✓ Normalizing skill aliases (JS → JavaScript, ReactJS → React)</span>
            <Badge variant="blue">Skill Ontology</Badge>
          </div>
        </div>
      ),
    },
    {
      title: "4. Career Role Matching Engine",
      subtitle: "Deterministic weighted affinity algorithm",
      content: (
        <div className="grid grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-center">
            <span className="text-3xl font-extrabold text-emerald-400 block">84%</span>
            <span className="text-xs font-bold text-white">Software Developer</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center">
            <span className="text-3xl font-extrabold text-cyan-400 block">79%</span>
            <span className="text-xs font-bold text-white">Backend Developer</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/30 text-center">
            <span className="text-3xl font-extrabold text-blue-400 block">72%</span>
            <span className="text-xs font-bold text-white">Full Stack Developer</span>
          </div>
        </div>
      ),
    },
    {
      title: "5. Skill Gap Prioritization Matrix",
      subtitle: "Ranks gaps by market demand, proficiency delta & career impact",
      content: (
        <div className="space-y-3 text-xs text-left">
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex justify-between items-center">
            <span>Spring Boot Framework (Current 1/5 vs Required 4/5)</span>
            <Badge variant="red">Critical Gap</Badge>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex justify-between items-center">
            <span>REST API Design & OpenAPI (Current 2/5 vs Required 4/5)</span>
            <Badge variant="amber">High Priority</Badge>
          </div>
        </div>
      ),
    },
    {
      title: "6. Personalized 4-Phase Roadmap",
      subtitle: "Actionable milestone execution timeline",
      content: (
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center flex-1">Phase 1: Foundations</div>
          <span>→</span>
          <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-500/40 text-center flex-1 font-bold text-cyan-300">Phase 2: Spring Boot</div>
          <span>→</span>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center flex-1">Phase 3: Production Capstone</div>
          <span>→</span>
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center flex-1 text-emerald-300 font-bold">Phase 4: Career Ready</div>
        </div>
      ),
    },
    {
      title: "7. Employer & Workforce Intelligence",
      subtitle: "Skills-first talent matching & university curriculum alignment",
      content: (
        <div className="grid grid-cols-2 gap-4 text-left text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-cyan-400 block mb-1">Employer Talent Discovery</span>
            Matches candidate skill vectors deterministically against job requisitions.
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-violet-400 block mb-1">University Syllabus Alignment</span>
            Identifies academic curriculum gaps compared against industry emerging demand.
          </div>
        </div>
      ),
    },
    {
      title: "8. Team & Hackathon Pitch",
      subtitle: "Build For Bharat 2.0 — Team THE PROCESSORS",
      content: (
        <div className="text-center space-y-4">
          <Badge variant="cyan" className="px-4 py-1 text-xs">THE PROCESSORS</Badge>
          <div className="flex flex-wrap items-center justify-center gap-2 font-semibold text-white">
            {['Saksham', 'Parisha', 'Nikhil', 'Nimisha', 'Sonit'].map(name => (
              <span key={name} className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700">{name}</span>
            ))}
          </div>
          <p className="text-xs text-slate-400">
            Fully functional offline demo intelligence mode + optional Gemini AI provider integration.
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
      if (e.key === 'Escape') {
        navigate('/dashboard');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, navigate, slides.length]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050810] text-slate-100 flex flex-col justify-between p-6 sm:p-12 overflow-hidden">
      
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tv2 className="w-5 h-5 text-cyan-400" />
          <span className="font-extrabold text-white text-sm">SkillBridge AI Pitch Mode</span>
          <span className="text-xs text-slate-500 font-mono">({currentSlide + 1} / {slides.length})</span>
        </div>

        <button onClick={() => navigate('/dashboard')} className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="max-w-4xl mx-auto w-full my-auto glass-panel p-10 rounded-3xl border-blue-500/30 text-center glow-blue">
        <Badge variant="cyan" className="mb-4">{slides[currentSlide].subtitle}</Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">{slides[currentSlide].title}</h2>
        <div className="my-6">{slides[currentSlide].content}</div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentSlide === 0}
          onClick={() => setCurrentSlide(prev => prev - 1)}
          className="gap-2 text-xs"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Slide
        </Button>

        <div className="flex gap-1.5">
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                idx === currentSlide ? 'bg-cyan-400 scale-125' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        <Button
          variant="glow"
          disabled={currentSlide === slides.length - 1}
          onClick={() => setCurrentSlide(prev => prev + 1)}
          className="gap-2 text-xs"
        >
          Next Slide <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
