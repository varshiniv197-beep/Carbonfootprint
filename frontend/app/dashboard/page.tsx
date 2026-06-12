'use client';
import { useStore } from '@/store/useStore';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { Bot, Target, Flame, ArrowRight, ShieldCheck, TrendingDown } from 'lucide-react';

export default function DashboardPage() {
  const { footprintData, score, isLoggedIn, name } = useStore();
  const total = footprintData.transport + footprintData.energy + footprintData.diet + footprintData.shopping;

  // Mock historical carbon dataset for Recharts area graph
  const chartData = [
    { name: 'Jan', co2: total * 1.2 },
    { name: 'Feb', co2: total * 1.15 },
    { name: 'Mar', co2: total * 1.1 },
    { name: 'Apr', co2: total * 1.05 },
    { name: 'May', co2: total * 1.02 },
    { name: 'Jun', co2: total },
  ];

  // Bar chart breakdown
  const barData = [
    { name: 'Transport', value: footprintData.transport, color: '#3b82f6' },
    { name: 'Energy', value: footprintData.energy, color: '#f59e0b' },
    { name: 'Diet', value: footprintData.diet, color: '#10b981' },
    { name: 'Shopping', value: footprintData.shopping, color: '#8b5cf6' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Carbon Intelligence Hub
          </h1>
          <p className="text-slate-400 mt-2">
            Welcome back, <span className="text-white font-semibold">{isLoggedIn ? name : 'Eco Guest'}</span>. Here is your sustainability analysis.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-2xl text-sm font-semibold">
          <ShieldCheck className="w-4 h-4" /> Secure Session Verified
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (Visual Analytics & Coach) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Key Metrics Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Sustainability Score</h3>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 my-4">
                {score} <span className="text-xl text-slate-500">/ 100</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" /> Top 15% of global performers
              </p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Total Footprint</h3>
              <div className="text-5xl font-black text-white my-4">
                {total.toFixed(1)} <span className="text-lg text-slate-500">kg CO₂</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-emerald-400" /> -4.2% reduction from last month
              </p>
            </div>

          </div>

          {/* Dynamic Recharts Trend Chart */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Emissions Trend Projection</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCo2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column (Breakdown & Recommendations) */}
        <div className="space-y-8">
          
          {/* Recharts Bar Breakdown */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Emissions Breakdown</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
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

          {/* AI Recommendations */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Bot className="text-emerald-400" /> Active Recommendations
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex justify-between items-center group cursor-pointer hover:border-emerald-500/40 transition-colors">
                <div>
                  <h4 className="font-bold text-sm">Lower Home Thermostat</h4>
                  <p className="text-xs text-slate-400 mt-1">Saves up to 15 kg CO₂ weekly</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex justify-between items-center group cursor-pointer hover:border-blue-500/40 transition-colors">
                <div>
                  <h4 className="font-bold text-sm">Switch to Electric Commute</h4>
                  <p className="text-xs text-slate-400 mt-1">Saves up to 25 kg CO₂ weekly</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
