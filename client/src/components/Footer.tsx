import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#050810] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-white">SkillBridge AI</span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Don't just show people what they know. Help them understand what to learn next.
            </p>
            <span className="inline-block px-2.5 py-1 rounded bg-blue-500/10 text-cyan-400 font-mono text-[10px] border border-cyan-500/20">
              BUILD FOR BHARAT 2.0
            </span>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 uppercase tracking-wider text-[11px]">Product Suite</h4>
            <ul className="space-y-2">
              <li><Link to="/resume-analyzer" className="hover:text-blue-400 transition-colors">AI Resume Analyzer</Link></li>
              <li><Link to="/career-matches" className="hover:text-blue-400 transition-colors">Career Role Matching</Link></li>
              <li><Link to="/skill-gaps" className="hover:text-blue-400 transition-colors">Skill Gap Prioritization</Link></li>
              <li><Link to="/roadmap" className="hover:text-blue-400 transition-colors">Personalized Roadmap</Link></li>
              <li><Link to="/coach" className="hover:text-blue-400 transition-colors">AI Career Coach</Link></li>
            </ul>
          </div>

          {/* Workforce Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 uppercase tracking-wider text-[11px]">Workforce Ecosystem</h4>
            <ul className="space-y-2">
              <li><Link to="/employer" className="hover:text-blue-400 transition-colors">For Employers & Hiring</Link></li>
              <li><Link to="/university" className="hover:text-blue-400 transition-colors">For Universities & Colleges</Link></li>
              <li><Link to="/opportunities" className="hover:text-blue-400 transition-colors">Opportunity Discovery</Link></li>
              <li><Link to="/architecture" className="hover:text-blue-400 transition-colors">Intelligence Architecture</Link></li>
              <li><Link to="/presentation" className="hover:text-blue-400 transition-colors">Hackathon Presentation</Link></li>
            </ul>
          </div>

          {/* Team Info */}
          <div>
            <h4 className="font-semibold text-white mb-3 uppercase tracking-wider text-[11px]">Team The Processors</h4>
            <p className="text-slate-400 mb-2">Developed for Build For Bharat 2.0 Hackathon:</p>
            <div className="flex flex-wrap gap-1.5 font-medium text-slate-200">
              {['Saksham', 'Parisha', 'Nikhil', 'Nimisha', 'Sonit'].map((name) => (
                <span key={name} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] border border-slate-700">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 SkillBridge AI. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with innovation for</span>
            <span className="font-semibold text-slate-200">BUILD FOR BHARAT 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
