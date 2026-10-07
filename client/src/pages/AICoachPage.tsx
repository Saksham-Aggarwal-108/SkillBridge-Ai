import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, Cpu, Lightbulb } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIPrimitives';
import { useApp } from '../context/AppContext';
import { askCoach } from '../services/api';

export const AICoachPage: React.FC = () => {
  const { user, profile, activeRole, isLocalIntelligence, aiEngineName } = useApp();

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `Hello ${user?.name.split(' ')[0] || 'Alex'}! I'm your **SkillBridge AI Career Coach**. I have loaded your current profile skills (${profile.skills.map(s => s.name).join(', ')}). How can I assist you with your career progression today?`,
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isSending, setIsSending] = useState(false);

  const suggestedPrompts = [
    "Which career should I target?",
    "What should I learn next?",
    "Why am I not ready for backend development?",
    "Build me a 90-day roadmap.",
    "Which skills should I prioritize?",
    "How can I improve my resume?",
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInputMsg('');
    setIsSending(true);

    const context = {
      targetRole: activeRole,
      skills: profile.skills,
    };

    const res = await askCoach(newMessages, context);

    setIsSending(false);
    setMessages([...newMessages, { sender: 'assistant', text: res.reply }]);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto flex flex-col h-[calc(100vh-7rem)]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Bot className="w-6 h-6 text-blue-400" /> SkillBridge Career Coach
            </h1>
            <Badge variant="cyan">{isLocalIntelligence ? 'Local Engine' : aiEngineName}</Badge>
          </div>
          <p className="text-xs text-slate-400">Context aware conversational career intelligence assistant</p>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <Card className="flex-1 border-slate-800 p-4 flex flex-col justify-between overflow-hidden">
        <div className="overflow-y-auto space-y-4 p-2 flex-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-700">
                  {user?.name.charAt(0) || 'A'}
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex gap-3 items-center text-xs text-slate-500 italic">
              <Bot className="w-4 h-4 animate-spin text-blue-400" /> Thinking...
            </div>
          )}
        </div>

        {/* Suggested Prompt Chips */}
        <div className="pt-3 border-t border-slate-800/80">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" /> Suggested Quick Prompts:
          </span>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-blue-600/20 text-slate-300 hover:text-white border border-slate-800 text-[11px] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about your career roadmap, skill gaps, or resume..."
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button variant="glow" size="sm" onClick={() => handleSend()} className="gap-1 text-xs">
              Send <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
