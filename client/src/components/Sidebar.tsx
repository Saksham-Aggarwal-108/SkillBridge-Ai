import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Compass, 
  Zap, 
  GitCommit, 
  Briefcase, 
  FileText, 
  Bot, 
  Building2, 
  GraduationCap, 
  Tv2, 
  Network, 
  User, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, profile } = useApp();

  const mainLinks = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Skills', path: '/skills', icon: Layers },
    { label: 'Career Matches', path: '/career-matches', icon: Compass },
    { label: 'Skill Gaps', path: '/skill-gaps', icon: Zap },
    { label: 'Roadmap', path: '/roadmap', icon: GitCommit },
    { label: 'Opportunities', path: '/opportunities', icon: Briefcase },
    { label: 'Resume Analyzer', path: '/resume-analyzer', icon: FileText },
    { label: 'AI Career Coach', path: '/coach', icon: Bot },
  ];

  const workforceLinks = [
    { label: 'Employer Hub', path: '/employer', icon: Building2 },
    { label: 'University Hub', path: '/university', icon: GraduationCap },
  ];

  const metaLinks = [
    { label: 'Presentation Mode', path: '/presentation', icon: Tv2, highlight: true },
    { label: 'Architecture', path: '/architecture', icon: Network },
    { label: 'About Project', path: '/about', icon: Info },
  ];

  return (
    <aside
      className={`relative z-30 transition-all duration-300 border-r border-slate-800 bg-[#070b14]/90 backdrop-blur-xl flex flex-col justify-between ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center z-40 shadow-lg"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Main Navigation Scroll Area */}
      <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
        
        {/* Core Intelligence Suite */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-2">
              Career Intelligence
            </p>
          )}
          <nav className="space-y-1">
            {mainLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Workforce Portal */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-2">
              Workforce Intelligence
            </p>
          )}
          <nav className="space-y-1">
            {workforceLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Hackathon Pitch & System */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[10px] font-semibold tracking-wider text-cyan-400 uppercase mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" /> Hackathon Suite
            </p>
          )}
          <nav className="space-y-1">
            {metaLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      item.highlight
                        ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : isActive
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0 text-cyan-400" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer User Widget */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-900 text-slate-300 text-xs transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">
            {user ? user.name.charAt(0) : 'A'}
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-medium text-white truncate">{user?.name || 'Alex Sharma'}</span>
              <span className="text-[10px] text-slate-400">{profile.targetRole}</span>
            </div>
          )}
        </NavLink>

        <div className="flex items-center justify-between pt-1 text-slate-500">
          <NavLink to="/settings" className="p-1.5 hover:text-slate-300 rounded" title="Settings">
            <Settings className="w-4 h-4" />
          </NavLink>
          {!collapsed && <span className="text-[10px] font-mono text-slate-600">v1.0 Hackathon</span>}
        </div>
      </div>
    </aside>
  );
};
