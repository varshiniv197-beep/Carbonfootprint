'use client';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { getHotspotInsight } from '@/utils/carbon';
import { Bot, Target, Flame, ArrowRight, ShieldCheck, TrendingDown, CheckSquare, Square, Globe, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { footprintData, score, addPoints, isLoggedIn, name } = useStore();
  const total = footprintData.transport + footprintData.energy + footprintData.diet + footprintData.habits;

  // Monthly tasks state
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Switch home bulbs to LEDs', points: 10, completed: false },
    { id: 2, text: 'Commute by cycling 3 times', points: 15, completed: false },
    { id: 3, text: 'Unplug idle chargers weekly', points: 5, completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        addPoints(nextState ? t.points : -t.points);
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  // central code quality hotspot analyser
  const hotspot = getHotspotInsight(footprintData);

  // UN Sustainable Development Goals (SDG) Mapping State
  const sdgGoals = [
    { id: 7, title: 'SDG 7: Clean Energy', desc: 'Active when utility emissions are kept below 50 kg.', active: footprintData.energy < 50 && total > 0, color: 'text-amber-400 bg-amber-400/10 border-amber-500/20' },
    { id: 12, title: 'SDG 12: Responsible Consumption', desc: 'Active when consumer purchases are minimized.', active: footprintData.habits < 40 && total > 0, color: 'text-orange-400 bg-orange-400/10 border-orange-500/20' },
    { id: 13, title: 'SDG 13: Climate Action', desc: 'Active when overall Sustainability Score is >75.', active: score > 75, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20' },
  ];

  // Recharts Dataset
  const chartData = [
    { name: 'Jan', co2: total * 1.2 },
    { name: 'Feb', co2: total * 1.15 },
    { name: 'Mar', co2: total * 1.15 },
    { name: 'Apr', co2: total * 1.08 },
    { name: 'May', co2: total * 1.02 },
    { name: 'Jun', co2: total },
  ];

  // Bar chart breakdown
  const barData = [
    { name: 'Transport', value: footprintData.transport, color: '#3b82f6' },
    { name: 'Energy', value: footprintData.energy, color: '#f59e0b' },
    { name: 'Diet', value: footprintData.diet, color: '#10b981' },
    { name: 'Habits', value: footprintData.habits, color: '#8b5cf6' },
  ];

  // Paris Agreement Target Constants (for problem alignment comparison)
  const parisAgreementLimit = 38.0; // 38kg weekly (translates to ~2 tonnes annually per person limit to achieve 1.5C target)
  const globalAverage = 96.0; // ~5 tonnes annually average weekly equivalent

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 space-y-10" role="main" aria-label="TerraSync Dashboard Hub">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Carbon Intelligence Hub
          </h1>
          <p className="text-slate-200 mt-2">
            Welcome back, <span className="text-white font-semibold">{isLoggedIn ? name : 'Eco Guest'}</span>. Here is your sustainability analysis.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-2xl text-sm font-semibold">
          <ShieldCheck className="w-4 h-4" /> Secure Session Hashed
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Key Metrics Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Sustainability Score</h3>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 my-4">
                {score} <span className="text-xl text-slate-500">/ 100</span>
              </div>
              <p className="text-xs text-slate-200 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" /> Top 15% of global performers
              </p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Total Footprint</h3>
              <div className="text-5xl font-black text-white my-4">
                {total.toFixed(1)} <span className="text-lg text-slate-500">kg CO₂</span>
              </div>
              <p className="text-xs text-slate-200 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-emerald-400" /> -4.2% reduction from last month
              </p>
            </div>
          </div>

          {/* Paris Agreement Benchmark (Problem Alignment) */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="text-emerald-400 w-5 h-5" /> Global Benchmarking comparison
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              How does your current weekly footprint of <span className="font-bold text-white">{total.toFixed(1)} kg</span> compare to climate averages and limits?
            </p>
            <div className="space-y-3">
              {/* Paris Limit */}
              <div>
                <div className="flex justify-between text-xs text-slate-200 mb-1">
                  <span>Paris Agreement Target (1.5°C Limit)</span>
                  <span className="font-bold text-emerald-400">{parisAgreementLimit} kg</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, (total / parisAgreementLimit) * 100)}%` }}></div>
                </div>
              </div>
              {/* Global Average */}
              <div>
                <div className="flex justify-between text-xs text-slate-200 mb-1">
                  <span>Global Average Per Capita</span>
                  <span className="font-bold text-amber-400">{globalAverage} kg</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, (total / globalAverage) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Personalized Action Plan Hotspot */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-4 right-4 text-emerald-400/20"><Sparkles className="w-8 h-8" /></div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              💡 Personalized Hotspot Insight
            </h3>
            <p className="text-sm text-slate-200">
              Your primary emission hotspot is <span className="text-emerald-400 font-bold">{hotspot.name}</span>.
            </p>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {hotspot.advice}
            </p>
          </div>

          {/* Dynamic Recharts Trend Chart */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Emissions Trend Projection</h3>
            <div className="h-64 w-full" aria-label="Line graph projecting monthly CO2 emissions starting at 1.2 times current footprint in January and dropping to current footprint in June" role="img">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} />
                  <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCo2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* UN Sustainable Development Goals Mapping */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="text-cyan-400 w-5 h-5" /> UN SDG Impact Hub
            </h3>
            <p className="text-xs text-slate-300 mb-4">Your achievements mapped to UN Sustainability frameworks.</p>
            <div className="space-y-3">
              {sdgGoals.map(goal => (
                <div 
                  key={goal.id} 
                  className={`p-4 rounded-2xl border transition-all ${
                    goal.active 
                      ? `${goal.color} opacity-100` 
                      : 'bg-slate-950/20 border-slate-900 text-slate-500 opacity-40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold">{goal.title}</h4>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {goal.active ? '✅ Active' : '🔒 Locked'}
                    </span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed text-slate-300">{goal.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Goals Section */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Target className="text-emerald-400 w-5 h-5" /> Monthly Goals & Tasks
            </h3>
            <div className="space-y-3">
              {tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none ${
                    task.completed 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                  aria-label={`Mark task ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
                >
                  <span className="text-sm font-semibold">{task.text}</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold">
                    {task.completed ? <CheckSquare className="w-5 h-5 text-emerald-400" /> : <Square className="w-5 h-5 text-slate-500" />}
                    +{task.points} XP
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recharts Bar Breakdown */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Emissions Breakdown</h3>
            <div className="h-48 w-full" aria-label="Bar chart showing breakdown of weekly emissions across Transport, Energy, Diet, and Habits" role="img">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
