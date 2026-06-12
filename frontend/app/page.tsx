import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-6 md:p-12">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
            🌍 TerraSync AI
          </h1>
          <p className="text-slate-400 mt-2">Your Smart Sustainability Assistant</p>
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
                  Welcome to TerraSync! I noticed your energy usage spiked yesterday. Consider turning off background appliances today to save ~1.2kg of CO₂.
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">U</div>
                <div className="bg-blue-600 rounded-xl rounded-tr-none p-3 text-sm text-white">
                  Thanks! I'll enable eco-mode on my thermostat now.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white">AI</div>
                <div className="bg-slate-700 rounded-xl rounded-tl-none p-3 text-sm text-slate-200">
                  Excellent choice. That will map directly to your UN SDG 7 goal progress for this week!
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Ask your AI coach for eco-tips..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500" disabled />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors" disabled>Send</button>
            </div>
          </div>

          {/* Gamification Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2">🏆 Weekly Challenges</h2>
              <p className="text-slate-400 text-sm mb-4">Targeting your highest emission areas</p>
              <ul className="space-y-3">
                <li className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <span className="text-sm">Meatless Monday</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Completed</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <span className="text-sm">Public Transit Twice</span>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">1 / 2 Days</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-col justify-center items-center text-center">
              <h2 className="text-xl font-bold text-white mb-2">Sustainability Score</h2>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 my-2">84 / 100</div>
              <p className="text-xs text-slate-400 mt-2">Top 15% of TerraSync users globally</p>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics & Budgets */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">📊 Carbon Budget</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Transportation</span>
                  <span className="text-emerald-400 font-bold">Safe (45%)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Home Energy</span>
                  <span className="text-amber-400 font-bold">Warning (82%)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5">
                  <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Diet & Food</span>
                  <span className="text-emerald-400 font-bold">Safe (30%)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-slate-900 rounded-xl border border-slate-700 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Weekly Total</p>
              <p className="text-3xl font-bold text-white">42.5 <span className="text-sm font-normal text-slate-400">kg CO₂</span></p>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">🔮 AI Simulator</h2>
            <p className="text-sm text-slate-400 mb-4">Simulate lifestyle changes below:</p>
            
            <button className="w-full text-left bg-slate-900 hover:bg-slate-700 p-3 rounded-lg border border-slate-700 mb-2 transition-colors flex justify-between items-center">
              <span className="text-sm">Switch to Vegetarian</span>
              <span className="text-emerald-400 text-xs font-bold">-400 kg/yr</span>
            </button>
            <button className="w-full text-left bg-slate-900 hover:bg-slate-700 p-3 rounded-lg border border-slate-700 transition-colors flex justify-between items-center">
              <span className="text-sm">Reduce AC by 2°C</span>
              <span className="text-emerald-400 text-xs font-bold">-120 kg/yr</span>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
