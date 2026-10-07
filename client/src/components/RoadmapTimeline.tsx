import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, ExternalLink, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { RoadmapPhase } from '../types';
import { Card, Badge, Button } from './UIPrimitives';
import { useApp } from '../context/AppContext';

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
  onToggleItem?: (itemId: string) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ phases, onToggleItem }) => {
  const { toggleRoadmapItem } = useApp();
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const togglePhase = (phaseNum: number) => {
    setExpandedPhases(prev => ({ ...prev, [phaseNum]: !prev[phaseNum] }));
  };

  const handleCheck = (itemId: string) => {
    if (onToggleItem) onToggleItem(itemId);
    else toggleRoadmapItem(itemId);
  };

  return (
    <div className="relative space-y-8 pl-6 border-l-2 border-slate-800">
      {phases.map((phase) => {
        const isExpanded = expandedPhases[phase.phase] !== false;
        const totalItems = phase.items.length;
        const completedItems = phase.items.filter(i => i.isCompleted).length;
        const phaseProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

        return (
          <div key={phase.phase} className="relative group">
            {/* Timeline Node Connector Dot */}
            <div className={`absolute -left-[31px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              phaseProgress === 100
                ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30'
                : phaseProgress > 0
                ? 'bg-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}>
              <span className="text-[10px] font-bold">{phase.phase}</span>
            </div>

            {/* Phase Header */}
            <div className="glass-panel p-4 rounded-xl mb-4 cursor-pointer hover:border-blue-500/40 transition-all flex items-center justify-between"
                 onClick={() => togglePhase(phase.phase)}>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-bold text-white tracking-tight">{phase.phaseName}</h3>
                  <Badge variant={phaseProgress === 100 ? 'green' : phaseProgress > 0 ? 'cyan' : 'gray'}>
                    {phaseProgress}% Complete ({completedItems}/{totalItems})
                  </Badge>
                </div>
                <p className="text-xs text-slate-400">{phase.description}</p>
              </div>
              <button className="text-slate-400 hover:text-white p-1">
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            {/* Phase Items List */}
            {isExpanded && (
              <div className="space-y-3 pl-2">
                {phase.items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all ${
                      item.isCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-blue-500/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleCheck(item.id)}
                        className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors shrink-0"
                        title={item.isCompleted ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {item.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-600 hover:text-cyan-400" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className={`text-sm font-semibold ${item.isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3 text-cyan-400" /> {item.effort}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed mb-3">{item.description}</p>

                        {/* Resource links */}
                        {item.resources && item.resources.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-blue-400" /> Curated Action Resources:
                            </span>
                            {item.resources.map((res, rIdx) => (
                              <a
                                key={rIdx}
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:text-white border border-blue-500/20 transition-colors"
                              >
                                {res.name}
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
