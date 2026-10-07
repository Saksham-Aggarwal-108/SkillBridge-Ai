import React from 'react';
import { Badge } from './UIPrimitives';

interface GapIndicatorProps {
  currentLevel: number;
  requiredLevel: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export const GapIndicator: React.FC<GapIndicatorProps> = ({ currentLevel, requiredLevel, priority }) => {
  const gap = Math.max(0, requiredLevel - currentLevel);

  let variant: 'red' | 'amber' | 'cyan' | 'green' = 'amber';
  if (priority === 'Critical') variant = 'red';
  else if (priority === 'High') variant = 'amber';
  else if (priority === 'Medium') variant = 'cyan';
  else variant = 'green';

  return (
    <div className="flex items-center gap-3">
      {/* Proficiency level dots */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((lvl) => {
          const isFilled = lvl <= currentLevel;
          const isRequiredTarget = lvl <= requiredLevel;
          return (
            <span
              key={lvl}
              className={`w-2.5 h-6 rounded-sm transition-all ${
                isFilled
                  ? 'bg-blue-500 shadow-sm shadow-blue-500/50'
                  : isRequiredTarget
                  ? 'bg-amber-500/40 border border-amber-500/50'
                  : 'bg-slate-800'
              }`}
              title={`Level ${lvl} ${isFilled ? '(Proficient)' : isRequiredTarget ? '(Required Target)' : ''}`}
            />
          );
        })}
      </div>

      <Badge variant={variant}>
        {priority === 'Critical' ? 'Critical Gap' : priority === 'High' ? 'High Priority' : gap === 0 ? 'MATCH' : 'Medium Gap'}
      </Badge>
    </div>
  );
};
