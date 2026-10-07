import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Plus, X } from 'lucide-react';
import { Button, Card, Badge } from '../components/UIPrimitives';
import { useApp } from '../context/AppContext';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setProfile, setActiveRole } = useApp();

  const [step, setStep] = useState<number>(1);
  const [accountType, setAccountType] = useState('Student');
  const [currentTitle, setCurrentTitle] = useState('Computer Science Student');
  const [experience, setExperience] = useState('Entry Level (0-1 yrs)');
  const [skills, setSkills] = useState<string[]>(['Java', 'SQL', 'Git', 'HTML', 'CSS', 'JavaScript', 'Data Structures & Algorithms']);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [targetGoal, setTargetGoal] = useState('Software Developer');
  const [learningStyle, setLearningStyle] = useState('Projects & Documentation');

  const addSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleFinish = () => {
    setProfile({
      name: 'User',
      headline: `${currentTitle} | Aspiring ${targetGoal}`,
      experienceLevel: experience,
      targetRole: targetGoal,
      readinessScore: 78,
      learningStyle,
      isDemo: false,
      skills: skills.map(s => ({
        name: s,
        category: 'Technical',
        proficiency: 3,
        status: 'Developing',
      })),
    });
    setActiveRole(targetGoal);
    navigate('/dashboard');
  };

  const goals = [
    'Software Developer',
    'Backend Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Data Analyst',
    'Data Scientist',
    'AI/ML Engineer',
    'DevOps Engineer',
    'Cybersecurity Analyst',
  ];

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Step 0{step} of 06</span>
            <h2 className="text-xl font-extrabold text-white">Profile Onboarding Setup</h2>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <span
                key={s}
                className={`w-6 h-1.5 rounded-full transition-all ${
                  s <= step ? 'bg-blue-500' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="border-blue-500/30 p-8 glow-blue">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">What describes you best?</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Student', 'Professional', 'Employer', 'University'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setAccountType(type)}
                    className={`p-4 rounded-xl border text-left font-medium text-sm transition-all ${
                      accountType === type
                        ? 'bg-blue-600/20 text-cyan-300 border-cyan-500/50 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Current role or title</h3>
              <input
                type="text"
                placeholder="e.g. Computer Science Student or Junior Developer"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
              />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Select your experience level</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Entry Level (0-1 yrs)',
                  'Junior Level (1-2 yrs)',
                  'Mid Level (2-4 yrs)',
                  'Senior Level (5+ yrs)',
                ].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => setExperience(exp)}
                    className={`p-3 rounded-xl border text-left font-medium text-xs transition-all ${
                      experience === exp
                        ? 'bg-blue-600/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Add your current skills</h3>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add skill (e.g. Java, React, SQL)"
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button size="sm" onClick={addSkill} className="gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 text-cyan-300 border border-blue-500/30 text-xs font-medium"
                  >
                    {s}
                    <button onClick={() => removeSkill(s)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Select your primary career target goal</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {goals.map((g) => (
                  <button
                    key={g}
                    onClick={() => setTargetGoal(g)}
                    className={`p-3 rounded-xl border text-left font-medium text-xs transition-all ${
                      targetGoal === g
                        ? 'bg-blue-600/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Preferred learning style</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Projects & Documentation', 'Interactive Courses', 'Video Tutorials', 'Practice Problems'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setLearningStyle(style)}
                    className={`p-4 rounded-xl border text-left font-medium text-xs transition-all ${
                      learningStyle === style
                        ? 'bg-blue-600/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-800">
            {step > 1 ? (
              <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>Back</Button>
            ) : <div />}

            {step < 6 ? (
              <Button variant="glow" size="sm" onClick={() => setStep(step + 1)} className="gap-2">
                Next Step <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="glow" size="sm" onClick={handleFinish} className="gap-2">
                Generate My Profile <Sparkles className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
