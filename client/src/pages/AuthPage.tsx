import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { Button, Card, Badge } from '../components/UIPrimitives';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

interface AuthPageProps {
  isRegister?: boolean;
}

export const AuthPage: React.FC<AuthPageProps> = ({ isRegister = false }) => {
  const navigate = useNavigate();
  const { setUser, triggerDemoMode } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<UserRole>('STUDENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: `user-${Date.now()}`,
      name: name || (email ? email.split('@')[0] : 'Alex Sharma'),
      email: email || 'alex.sharma@skillbridge.ai',
      role: accountType,
    });

    if (accountType === 'EMPLOYER') navigate('/employer');
    else if (accountType === 'UNIVERSITY') navigate('/university');
    else navigate(isRegister ? '/onboarding' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-white">SkillBridge AI</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-white">
            {isRegister ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister
              ? 'Join SkillBridge AI to transform your skills into career opportunities'
              : 'Sign in to access your skill profile and personalized roadmap'}
          </p>
        </div>

        <Card className="border-blue-500/30 p-6 glow-blue">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Sharma"
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="alex.sharma@skillbridge.ai"
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Account Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['STUDENT', 'PROFESSIONAL', 'EMPLOYER', 'UNIVERSITY'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setAccountType(r)}
                      className={`p-2 rounded-lg border text-[11px] font-medium transition-all ${
                        accountType === r
                          ? 'bg-blue-600/20 text-cyan-300 border-cyan-500/50'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button type="submit" variant="glow" className="w-full justify-center gap-2 mt-2">
              {isRegister ? 'Continue to Onboarding' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center space-y-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => { triggerDemoMode(); navigate('/dashboard'); }}
              className="w-full text-xs border-cyan-500/30 text-cyan-300"
            >
              ⚡ Fast Hackathon Demo Login (Alex Sharma)
            </Button>

            <p className="text-xs text-slate-400">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Link to={isRegister ? '/login' : '/register'} className="text-blue-400 font-semibold hover:underline">
                {isRegister ? 'Sign In' : 'Register Now'}
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
