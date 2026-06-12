'use client';
import { useState } from 'react';
import { Bot, Send } from 'lucide-react';

export default function CoachPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your TerraSync AI Coach. How can I help you reduce your carbon footprint today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: input }];
    setMessages(newMsgs);
    setInput('');

    // Mock AI Response
    setTimeout(() => {
      setMessages([...newMsgs, { 
        role: 'assistant', 
        text: 'That is a great question. Based on your current footprint profile, focusing on reducing Home Energy consumption will yield the highest impact. Consider lowering your thermostat by 2 degrees.' 
      }]);
    }, 1000);
  };

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-emerald-500/20 p-3 rounded-xl">
          <Bot className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Sustainability Coach</h1>
          <p className="text-slate-400">Powered by advanced deterministic intelligence.</p>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'}`}>
                {msg.role === 'user' ? 'U' : 'AI'}
              </div>
              <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 rounded-tr-none' : 'bg-slate-800 border border-slate-700 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI coach a question..." 
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
          />
          <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl transition-colors">
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
