import React, { useState } from 'react';
import { GitCommit, Plus, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { RoadmapTimeline } from '../components/RoadmapTimeline';
import { useApp } from '../context/AppContext';

export const RoadmapPage: React.FC = () => {
  const { activeRole, roadmapPhases, updateRoadmapPhases, addNotification } = useApp();
  const [newSkillTitle, setNewSkillTitle] = useState('');

  const handleAddCustomSkill = () => {
    if (!newSkillTitle.trim()) return;

    const updated = [...roadmapPhases];
    updated[1].items.push({
      id: `item-custom-${Date.now()}`,
      title: `Master ${newSkillTitle.trim()}`,
      description: `Custom user added learning task for ${newSkillTitle.trim()}.`,
      skillName: newSkillTitle.trim(),
      effort: '2 weeks',
      resources: [
        { name: `${newSkillTitle.trim()} Documentation`, url: 'https://google.com', type: 'Doc' },
      ],
      isCompleted: false,
      orderIndex: updated[1].items.length,
    });

    updateRoadmapPhases(updated);
    setNewSkillTitle('');
    addNotification('Roadmap Updated', `Added "${newSkillTitle.trim()}" to Phase 2.`, 'success');
  };

  const handleRegenerateRoadmap = () => {
    addNotification('Roadmap Regenerated', 'Re-computed optimal learning path based on updated skill gaps.', 'info');
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Badge variant="cyan" className="mb-2">4-Phase Milestone Path</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <GitCommit className="w-6 h-6 text-blue-400" /> Personalized Career Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Path to <strong className="text-cyan-300">{activeRole}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRegenerateRoadmap} className="gap-2 text-xs">
            <RefreshCw className="w-3.5 h-3.5" /> Regenerate Roadmap
          </Button>
        </div>
      </div>

      {/* Add Custom Skill Tool */}
      <Card className="border-blue-500/30 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add custom skill to roadmap (e.g., GraphQL, Redis)"
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
            value={newSkillTitle}
            onChange={(e) => setNewSkillTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSkill()}
          />
          <Button variant="secondary" size="sm" onClick={handleAddCustomSkill} className="gap-1 text-xs">
            <Plus className="w-3.5 h-3.5" /> Add Skill
          </Button>
        </div>
      </Card>

      {/* Interactive Vertical Roadmap Component */}
      <RoadmapTimeline phases={roadmapPhases} />
    </div>
  );
};
