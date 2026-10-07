import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Circle, Cpu } from 'lucide-react';
import { Card } from './UIPrimitives';

interface AIProcessingPanelProps {
  onComplete?: () => void;
  engineName?: string;
  isLocal?: boolean;
}

const PIPELINE_STEPS = [
  'Reading resume & parsing document structure',
  'Extracting technical & soft skill keywords',
  'Normalizing skills via ontology dictionary',
  'Analyzing proficiency & experience depth',
  'Computing weighted career role affinity scores',
  'Identifying priority gaps & generating roadmap',
];

export const AIProcessingPanel: React.FC<AIProcessingPanelProps> = ({
  onComplete,
  engineName = 'SkillBridge Intelligence',
  isLocal = true,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < PIPELINE_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <Card className="max-w-xl mx-auto border-blue-500/30 glow-blue">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
          <Cpu className="w-6 h-6 animate-pulse text-cyan-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            SkillBridge AI Processing Pipeline
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
              {isLocal ? 'Local Intelligence Mode' : engineName}
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            {isLocal
              ? 'Running deterministic local intelligence analysis engine'
              : 'Powered by Gemini AI Provider'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {PIPELINE_STEPS.map((stepText, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                isCurrent
                  ? 'bg-blue-500/10 border-blue-500/40 text-blue-300 font-medium scale-[1.01]'
                  : isDone
                  ? 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                  : 'bg-slate-950/20 border-slate-900 text-slate-600'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-700 shrink-0" />
              )}
              <span className="text-xs sm:text-sm">{stepText}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
