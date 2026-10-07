import React from 'react';
import { Check, AlertCircle, Clock } from 'lucide-react';
import { Badge } from './UIPrimitives';

interface SkillChipProps {
  name: string;
  category?: string;
  proficiency?: number; // 1-5
  status?: 'Strong' | 'Developing' | 'Needs Attention' | 'MATCH' | 'GAP' | 'PRIORITY';
  onClick?: () => void;
  className?: string;
}

export const SkillChip: React.FC<SkillChipProps> = ({
  name,
  category,
  proficiency,
  status = 'Developing',
  onClick,
  className,
}) => {
  let variant: 'blue' | 'cyan' | 'green' | 'amber' | 'red' | 'gray' = 'blue';

  if (status === 'Strong' || status === 'MATCH') variant = 'green';
  else if (status === 'Developing' || status === 'GAP') variant = 'cyan';
  else if (status === 'Needs Attention' || status === 'PRIORITY') variant = 'amber';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      } ${
        variant === 'green'
          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
          : variant === 'cyan'
          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
          : variant === 'amber'
          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
      } ${className || ''}`}
    >
      <span>{name}</span>
      {proficiency && (
        <span className="text-[10px] font-mono opacity-80 px-1 py-0.2 rounded bg-black/30">
          {proficiency}/5
        </span>
      )}
    </div>
  );
};
