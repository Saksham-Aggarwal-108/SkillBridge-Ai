import React from 'react';
import { Bell, Check, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead } = useApp();

  if (!isOpen) return null;

  return (
    <div className="absolute right-4 top-16 z-50 w-80 sm:w-96 glass-panel border-slate-700/80 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Bell className="w-4 h-4 text-blue-400" />
          Notifications
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
            {notifications.filter(n => !n.read).length} new
          </span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">No notifications yet.</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                n.read
                  ? 'bg-slate-900/30 border-slate-800 text-slate-400'
                  : 'bg-blue-500/10 border-blue-500/30 text-slate-200 font-medium'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-100 flex items-center gap-1.5">
                  {n.type === 'success' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  {n.type === 'info' && <Info className="w-3.5 h-3.5 text-blue-400" />}
                  {n.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                  {n.title}
                </span>
                <span className="text-[10px] text-slate-500">{n.timestamp}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
