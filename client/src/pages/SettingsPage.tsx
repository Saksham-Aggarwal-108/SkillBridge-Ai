import React from 'react';
import { Settings as SettingsIcon, Sun, Moon, RefreshCw, Cpu, Database, Bell } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme, triggerDemoMode, resetProfile, isLocalIntelligence, aiEngineName, addNotification } = useApp();

  const handleClearData = () => {
    resetProfile();
    addNotification('Local Data Cleared', 'All local state has been reset.', 'info');
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <Badge variant="cyan" className="mb-2">System Preferences</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-blue-400" /> Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Configure appearance, AI engine mode, demo profile state, and notifications.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Appearance */}
        <Card className="border-slate-800 p-6">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            {theme === 'dark' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />} Appearance Theme
          </h3>
          <p className="text-xs text-slate-400 mb-4">Toggle between dark navy AI theme and crisp light theme.</p>
          
          <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2 text-xs">
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
          </Button>
        </Card>

        {/* AI Engine Status */}
        <Card className="border-blue-500/30 p-6 glow-blue">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" /> AI Provider & Intelligence Engine
          </h3>
          <p className="text-xs text-slate-400 mb-3">Active intelligence engine powering SkillBridge AI.</p>
          
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Engine Provider:</span>
              <span className="font-bold text-cyan-300">{aiEngineName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Execution Mode:</span>
              <span className="font-semibold text-emerald-400">{isLocalIntelligence ? 'Deterministic Offline Engine' : 'AI API Provider'}</span>
            </div>
          </div>
        </Card>

        {/* Demo & Local Data Reset */}
        <Card className="border-slate-800 p-6">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" /> Demo & Data Management
          </h3>
          <p className="text-xs text-slate-400 mb-4">Reset demo state or clear local cache for testing.</p>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={triggerDemoMode} className="gap-2 text-xs text-cyan-300 border-cyan-500/30">
              <RefreshCw className="w-3.5 h-3.5" /> Reload Alex Sharma Demo Profile
            </Button>

            <Button variant="danger" size="sm" onClick={handleClearData} className="gap-2 text-xs">
              Clear All Local Data
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
