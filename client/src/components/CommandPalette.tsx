import React, { useState, useEffect } from 'react';
import { Search, Compass, BookOpen, Briefcase, Zap, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { type: 'Role', label: 'Software Developer', path: '/career-matches/role-software-dev', icon: Compass },
    { type: 'Role', label: 'Backend Developer', path: '/career-matches/role-backend-dev', icon: Compass },
    { type: 'Role', label: 'Frontend Developer', path: '/career-matches/role-frontend-dev', icon: Compass },
    { type: 'Skill', label: 'Spring Boot (Critical Gap)', path: '/skill-gaps', icon: Zap },
    { type: 'Skill', label: 'Data Structures & Algorithms', path: '/skills', icon: Zap },
    { type: 'Opportunity', label: 'Software Developer Intern — FinTech Dynamics', path: '/opportunities', icon: Briefcase },
    { type: 'Roadmap', label: 'Phase 2: Spring Boot Microservices', path: '/roadmap', icon: BookOpen },
    { type: 'Feature', label: 'AI Resume Analyzer', path: '/resume-analyzer', icon: Search },
    { type: 'Feature', label: 'AI Career Coach', path: '/coach', icon: Search },
  ];

  const filtered = query.trim() === ''
    ? items
    : items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl glass-panel border-blue-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-blue-400" />
          <input
            type="text"
            placeholder="Type a command or search skills, roles, roadmap..."
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-sm text-slate-500">No matching search results.</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm hover:bg-blue-600/15 hover:text-white transition-colors group text-slate-300"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-300">
                    {item.type}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Navigate with click or arrow keys</span>
          <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-[10px]">ESC</kbd>
        </div>
      </div>
    </div>
  );
};
