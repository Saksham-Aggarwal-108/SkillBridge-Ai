import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Search, Bell, Sun, Moon, Play, HelpCircle, User as UserIcon, Menu, X, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Badge } from './UIPrimitives';
import { NotificationCenter } from './NotificationCenter';
import { CommandPalette } from './CommandPalette';

export const Navbar: React.FC = () => {
  const { user, isDemoMode, theme, toggleTheme, triggerDemoMode, notifications, isLocalIntelligence, aiEngineName } = useApp();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleTryDemo = () => {
    triggerDemoMode();
    navigate('/dashboard');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#070b14]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  SkillBridge <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase font-medium">From Skills → To Opportunities</span>
              </div>
            </Link>

            {/* Mode Indicator Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">{isLocalIntelligence ? 'SkillBridge Intelligence' : aiEngineName}</span>
              <span className="text-slate-500 text-[10px]">({isLocalIntelligence ? 'Local Engine' : 'AI API'})</span>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              onClick={() => setIsCommandOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 text-slate-400 hover:text-slate-200 text-xs transition-all"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-blue-400" />
                <span>Search skills, career roles, roadmaps...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">Ctrl K</kbd>
            </button>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-3">
            {isDemoMode && (
              <Badge variant="cyan" className="hidden sm:inline-flex animate-pulse">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                Demo Mode Active
              </Badge>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleTryDemo}
              className="hidden sm:inline-flex gap-1.5 text-xs border-cyan-500/30 hover:border-cyan-400 text-cyan-300"
            >
              <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              Try Demo
            </Button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
            </div>

            {/* User Profile / Dashboard Link */}
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-slate-200 hidden md:inline">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <Button size="sm" onClick={() => navigate('/login')}>Login</Button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#070b14] p-4 space-y-3">
            <Button variant="glow" className="w-full justify-start gap-2" onClick={() => { handleTryDemo(); setIsMobileMenuOpen(false); }}>
              <Play className="w-4 h-4" /> Try Demo Mode
            </Button>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded bg-slate-900 text-slate-300">Dashboard</Link>
              <Link to="/resume-analyzer" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded bg-slate-900 text-slate-300">Resume Analyzer</Link>
              <Link to="/career-matches" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded bg-slate-900 text-slate-300">Career Matches</Link>
              <Link to="/skill-gaps" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded bg-slate-900 text-slate-300">Skill Gaps</Link>
              <Link to="/roadmap" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded bg-slate-900 text-slate-300">Roadmap</Link>
              <Link to="/coach" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded bg-slate-900 text-slate-300">AI Career Coach</Link>
              <Link to="/employer" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded bg-slate-900 text-slate-300">Employer Dashboard</Link>
              <Link to="/presentation" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded bg-slate-900 text-blue-400 font-bold">Hackathon Demo Mode</Link>
            </div>
          </div>
        )}
      </header>

      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
