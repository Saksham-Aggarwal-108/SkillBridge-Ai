import React from 'react';
import { GraduationCap, BookOpen, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { SkillBarChartCard } from '../components/ChartCard';
import { SEEDED_UNIVERSITY_CURRICULA } from '../data/seedData';

export const UniversityPage: React.FC = () => {
  const curriculum = SEEDED_UNIVERSITY_CURRICULA[0];

  const chartData = [
    { category: 'Java Syntax', score: 88 },
    { category: 'DBMS Core', score: 82 },
    { category: 'DSA Logic', score: 75 },
    { category: 'Spring Boot', score: 30 },
    { category: 'Docker & Cloud', score: 25 },
    { category: 'Generative AI', score: 20 },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Badge variant="violet" className="mb-2">Academic Workforce Alignment Engine</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-violet-400" /> University Skill Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Map academic course syllabi against emerging live industry workforce demand.
          </p>
        </div>
      </div>

      {/* Curriculum Summary Banner */}
      <Card className="border-violet-500/30 p-6 glow-violet">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <Badge variant="cyan" className="mb-2">{curriculum.semester}</Badge>
            <h2 className="text-xl font-bold text-white">{curriculum.courseName}</h2>
            <p className="text-xs text-slate-300 mt-1">Curriculum to Industry Demand Alignment Analysis</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-2xl font-extrabold text-cyan-400">{curriculum.alignmentScore}%</span>
              <span className="text-[10px] text-slate-400 block">Curriculum Alignment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div>
            <span className="font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <BookOpen className="w-4 h-4 text-blue-400" /> Current Academic Syllabus:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {curriculum.currentCurriculum.map((s: string, idx: number) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Emerging Industry Demand Gaps:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {curriculum.emergingIndustryDemand.map((s: string, idx: number) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  ! {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Breakdown Chart & Actionable Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillBarChartCard data={chartData} title="Curriculum vs Industry Skill Gap Distribution" />

        <Card className="border-slate-800 p-6">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> Recommended Syllabus Enhancements
          </h3>

          <div className="space-y-3">
            {curriculum.gaps.map((gap: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{gap.skill}</span>
                  <Badge variant="red">{gap.industryWeight}</Badge>
                </div>
                <p className="text-slate-400">Industry Hiring Demand Trend: <strong className="text-emerald-400">{gap.demandTrend}</strong></p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
