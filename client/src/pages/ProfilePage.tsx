import React, { useState } from 'react';
import { User, Edit3, Save, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { CircularProgress } from '../components/CircularProgress';
import { SkillChip } from '../components/SkillChip';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { user, profile, setProfile, addNotification } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user?.name || 'Alex Sharma');
  const [headline, setHeadline] = useState(profile.headline || 'Computer Science Student');
  const [targetRole, setTargetRole] = useState(profile.targetRole || 'Software Developer');

  const handleSave = () => {
    setProfile({
      ...profile,
      name,
      headline,
      targetRole,
    });
    setIsEditing(false);
    addNotification('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Badge variant="cyan" className="mb-2">User Profile & Skills</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-blue-400" /> Career Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage your personal details, skill inventory, and career targets.
          </p>
        </div>

        <Button
          variant={isEditing ? 'glow' : 'outline'}
          size="sm"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="gap-2 text-xs"
        >
          {isEditing ? <><Save className="w-3.5 h-3.5" /> Save Changes</> : <><Edit3 className="w-3.5 h-3.5" /> Edit Profile</>}
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: User Card & Score */}
        <Card className="border-blue-500/30 p-6 glow-blue text-center flex flex-col items-center justify-between">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-blue-600/30 text-blue-400 font-bold text-2xl flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
              {name.charAt(0)}
            </div>

            {isEditing ? (
              <div className="space-y-2 mb-4">
                <input
                  type="text"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white text-center"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300 text-center"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </div>
            ) : (
              <div className="mb-4">
                <h2 className="text-lg font-bold text-white">{name}</h2>
                <p className="text-xs text-slate-400">{headline}</p>
              </div>
            )}
          </div>

          <CircularProgress score={profile.readinessScore || 78} label="Career Readiness Score" />
        </Card>

        {/* Right: Skills & Goal Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-800 p-6">
            <h3 className="text-base font-bold text-white mb-4">Target Career Goal</h3>
            {isEditing ? (
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex justify-between items-center">
                <span className="text-slate-400">Target Role:</span>
                <span className="font-bold text-cyan-300">{targetRole}</span>
              </div>
            )}
          </Card>

          <Card className="border-slate-800 p-6">
            <h3 className="text-base font-bold text-white mb-3">Extracted Skill Inventory</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s, idx) => (
                <SkillChip key={idx} name={s.name} category={s.category} proficiency={s.proficiency} status="Strong" />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
