import React from 'react';
import { Card } from './UIPrimitives';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface SkillBarChartProps {
  data: { category: string; score: number }[];
  title?: string;
}

export const SkillBarChartCard: React.FC<SkillBarChartProps> = ({ data, title = 'Skill Health Distribution' }) => {
  return (
    <Card className="flex flex-col justify-between">
      <h3 className="text-sm font-semibold text-slate-200 mb-4">{title}</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="category" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#38bdf8' }}
            />
            <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

interface RadarChartProps {
  data: { subject: string; level: number; fullMark: number }[];
  title?: string;
}

export const SkillRadarChartCard: React.FC<RadarChartProps> = ({ data, title = 'Emerging Skill Matrix' }) => {
  return (
    <Card className="flex flex-col justify-between">
      <h3 className="text-sm font-semibold text-slate-200 mb-2">{title}</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
            <Radar name="Skill Level" dataKey="level" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
