import React, { useState } from 'react';
import { Upload, FileText, Sparkles, CheckCircle2, ArrowRight, RefreshCw, Cpu } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { AIProcessingPanel } from '../components/AIProcessingPanel';
import { analyzeResumeText } from '../services/api';
import { SkillChip } from '../components/SkillChip';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ResumeAnalyzerPage: React.FC = () => {
  const navigate = useNavigate();
  const { setProfile, setActiveRole, addNotification } = useApp();

  const [resumeText, setResumeText] = useState<string>(
    'Alex Sharma\nComputer Science Graduate\nSkills: Java, Python, SQL, PostgreSQL, Git, Data Structures & Algorithms, ReactJS, Node, HTML, CSS.\nExperience: Built full-stack inventory web application with REST APIs and database indexing.'
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Read text if txt
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setResumeText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Call API service with automatic client fallback
    const result = await analyzeResumeText(resumeText, selectedFile?.name);

    setTimeout(() => {
      setAnalysisResult(result);
      setIsAnalyzing(false);

      // Update global context profile
      if (result?.analysis?.detectedSkills) {
        setProfile({
          name: result.analysis.extractedName || 'Alex Sharma',
          headline: 'Extracted Profile | Aspiring Software Developer',
          experienceLevel: result.analysis.experienceLevel || 'Entry Level (0-2 yrs)',
          targetRole: result.matches[0]?.roleTitle || 'Software Developer',
          readinessScore: result.matches[0]?.matchScore || 84,
          learningStyle: 'Projects & Documentation',
          isDemo: false,
          rawResumeText: resumeText,
          skills: result.analysis.detectedSkills,
        });
        setActiveRole(result.matches[0]?.roleTitle || 'Software Developer');
        addNotification('Resume Analysis Complete!', `Extracted ${result.analysis.detectedSkills.length} skills with ${result.matches[0]?.matchScore}% career match score.`, 'success');
      }
    }, 3800); // Allow step animation to play completely
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Page Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="cyan" className="mb-2">AI-Powered Resume & Skill Extraction</Badge>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Turn Your Resume Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Career Intelligence</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Upload your resume (PDF, DOCX, TXT) or paste your profile text to extract skills, normalize variants, and calculate role affinity scores.
        </p>
      </div>

      {!isAnalyzing && !analysisResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* File Upload Box */}
          <Card className="border-blue-500/30 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-400" /> Upload Resume Document
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Supports PDF, DOCX, and TXT files up to 10MB.
              </p>

              <label className="border-2 border-dashed border-slate-700 hover:border-blue-500/60 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-900/50 transition-all text-center">
                <FileText className="w-10 h-10 text-blue-400 mb-3" />
                <span className="text-xs font-semibold text-slate-200 mb-1">
                  {selectedFile ? selectedFile.name : 'Click to browse or drop file here'}
                </span>
                <span className="text-[10px] text-slate-500">PDF, DOCX, TXT supported</span>
                <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            <Button
              variant="glow"
              size="md"
              disabled={!selectedFile && !resumeText}
              onClick={runAnalysis}
              className="w-full gap-2 mt-6"
            >
              Analyze Resume Document <Sparkles className="w-4 h-4" />
            </Button>
          </Card>

          {/* Paste Resume Text Area */}
          <Card className="border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" /> Paste Resume Text
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Paste your experience summary, bullet points, or raw CV text below.
              </p>

              <textarea
                rows={7}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="Paste raw text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={runAnalysis}
              className="w-full gap-2 mt-6 border-slate-700 hover:border-blue-500/50"
            >
              Analyze Pasted Text <Cpu className="w-4 h-4 text-cyan-400" />
            </Button>
          </Card>
        </div>
      )}

      {/* Animated AI Processing Pipeline */}
      {isAnalyzing && (
        <div className="py-8">
          <AIProcessingPanel engineName="SkillBridge Local Intelligence" isLocal={true} />
        </div>
      )}

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge variant="green" className="text-xs px-3 py-1">
              ✓ Analysis Successfully Completed
            </Badge>
            <Button variant="outline" size="sm" onClick={() => setAnalysisResult(null)} className="gap-2 text-xs">
              <RefreshCw className="w-3.5 h-3.5" /> Analyze Another Resume
            </Button>
          </div>

          {/* Snapshot & Extraction Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Profile Snapshot */}
            <Card className="border-blue-500/30 p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Profile Snapshot</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Extracted Name:</span>
                  <span className="text-white font-semibold">{analysisResult.analysis.extractedName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Experience Tier:</span>
                  <span className="text-cyan-400 font-semibold">{analysisResult.analysis.experienceLevel}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Top Role Affinity:</span>
                  <span className="text-emerald-400 font-bold">{analysisResult.matches[0]?.roleTitle} ({analysisResult.matches[0]?.matchScore}%)</span>
                </div>
              </div>
            </Card>

            {/* Extracted Skills Categorization */}
            <Card className="md:col-span-2 border-slate-800 p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Extracted & Categorized Skills</h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.analysis.detectedSkills.map((s: any, idx: number) => (
                  <SkillChip key={idx} name={s.normalized} category={s.category} proficiency={s.proficiency} status="Strong" />
                ))}
              </div>
            </Card>
          </div>

          {/* Skill Normalization Engine Output */}
          <Card className="border-slate-800 p-6">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Skill Normalization Engine Log
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Demonstrates unifications of raw keyword variants into standardized taxonomy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { orig: 'ReactJS', norm: 'React', cat: 'Frameworks' },
                { orig: 'JS', norm: 'JavaScript', cat: 'Programming' },
                { orig: 'Postgres', norm: 'PostgreSQL', cat: 'Databases' },
                { orig: 'DSA', norm: 'Data Structures & Algorithms', cat: 'Core CS' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-slate-500 block mb-0.5">Raw: "{item.orig}"</span>
                  <span className="text-cyan-300 font-bold block">→ Normalized: {item.norm}</span>
                  <span className="text-[10px] text-slate-400">Category: {item.cat}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Next Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => navigate('/skill-gaps')}>
              View Priority Skill Gaps
            </Button>
            <Button variant="glow" onClick={() => navigate('/roadmap')} className="gap-2">
              Generate Personalized Roadmap <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
