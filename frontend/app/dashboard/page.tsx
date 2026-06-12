'use client';
import { useStore } from '@/store/useStore';

export default function DashboardPage() {
  const { footprintData, score } = useStore();
  const total = footprintData.transport + footprintData.energy + footprintData.diet + footprintData.shopping;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-6 md:p-12">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
            Dashboard
          </h1>
          <p className="text-slate-400 mt-2">Welcome back to TerraSync AI+</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full font-medium">
          Status: Active & Optimizing
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: AI Coach */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">🤖 AI Sustainability Coach</h2>
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 mb-4 h-48 overflow-y-auto space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white">AI</div>
                <div className="bg-slate-700 rounded-xl rounded-tl-none p-3 text-sm text-slate-200">
                  Welcome to TerraSync! Your current emissions are trending safely. I noticed your energy usage ({footprintData.energy} kWh) is the biggest factor right now.
                </div>
              </div>
            </div>
          </div>

          {/* Gamification Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-col justify-center items-center text-center">
              <h2 className="text-xl font-bold text-white mb-2">Sustainability Score</h2>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 my-2">{score} / 100</div>
              <p className="text-xs text-slate-400 mt-2">Top 15% of TerraSync users globally</p>
            </div>
            
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-col justify-center items-center text-center">
               <h2 className="text-xl font-bold text-white mb-2">Total Footprint</h2>
              <div className="text-4xl font-black text-white my-2">{total.toFixed(1)} <span className="text-sm text-slate-400">kg CO₂</span></div>
              <p className="text-xs text-slate-400 mt-2">Calculated this week</p>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics & Budgets */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">📊 Carbon Budget Breakdown</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Transportation</span>
                  <span className="text-emerald-400 font-bold">{footprintData.transport.toFixed(1)} kg</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${Math.min(100, footprintData.transport)}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Home Energy</span>
                  <span className="text-amber-400 font-bold">{footprintData.energy.toFixed(1)} kg</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5">
                  <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: `${Math.min(100, footprintData.energy)}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Diet & Food</span>
                  <span className="text-emerald-400 font-bold">{footprintData.diet.toFixed(1)} kg</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${Math.min(100, footprintData.diet)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
