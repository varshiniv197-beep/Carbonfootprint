'use client';
import { useState } from 'react';
import { Bot, Send, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hello! I am your TerraSync AI Coach. Please click one of the predefined questions below to get structured carbon coaching advice based on your footprint profile.' }
  ]);

  const guidedQuestions = [
    { 
      question: 'How do I reduce transportation emissions?', 
      response: 'Based on your carbon profile, transportation represents a significant category. We suggest: 1) Switch to public transit 2 days a week (saves ~20%). 2) Upgrade to an electric vehicle (reduces driving emissions by 75%). 3) Avoid short-haul flights.' 
    },
    { 
      question: 'Can you analyze my diet footprint?', 
      response: 'To reduce food emissions: 1) Try a vegetarian diet 3 days a week. Meat farming is highly carbon-intensive. 2) Lower food waste by buying in smaller batches. 3) Prioritize locally sourced food to eliminate transit footprint.' 
    },
    { 
      question: 'Give me home energy saving tips.', 
      response: 'For home utility offsets: 1) Lower your thermostat by 2 degrees (saves 150kg CO2 yearly). 2) Switch to LED bulbs. 3) Unplug phantom loads like active chargers and idle appliances.' 
    },
    { 
      question: 'Suggest monthly shopping habits.', 
      response: 'For consumer habits: 1) Practice the 30-wear rule for new clothing items. 2) Maximize household recycling rate to >50% to save municipal haulage offsets. 3) Purchase Energy Star rated electronics.' 
    }
  ];

  const handleSelectQuestion = (qText: string, rText: string) => {
    // Append user question and AI response
    setMessages(prev => [
      ...prev, 
      { role: 'user', text: qText },
      { role: 'assistant', text: rText }
    ]);
  };

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-emerald-500/20 p-3 rounded-xl">
          <Bot className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Guided AI Sustainability Coach</h1>
          <p className="text-slate-200">Ask structured questions to get automated offsets guidance.</p>
        </div>
      </div>

      {/* Chat Messages Frame */}
      <div className="flex-1 bg-slate-900/40 border border-slate-800/85 rounded-3xl flex flex-col overflow-hidden mb-6 min-h-[300px]" role="log" aria-live="polite">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'
              }`}>
                {msg.role === 'user' ? 'U' : 'AI'}
              </div>
              <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-blue-600 rounded-tr-none text-white' : 'bg-slate-800/80 border border-slate-700/50 rounded-tl-none text-slate-100'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guided Questions Layout */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4" /> Select an inquiry scenario
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {guidedQuestions.map((gq, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectQuestion(gq.question, gq.response)}
              className="text-left p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/40 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none text-sm text-slate-200 hover:text-white font-medium transition-all"
            >
              {gq.question}
            </button>
          ))}
        </div>
      </div>


    </div>
  );
}
