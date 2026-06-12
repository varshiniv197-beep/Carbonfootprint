'use client';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Target, Zap, Car, Leaf, ThermometerSnowflake } from 'lucide-react';

export default function SimulatorPage() {
  const { footprintData } = useStore();
  const baseTotal = footprintData.transport + footprintData.energy + footprintData.diet + footprintData.habits;

  // Scenario sliders
  const [solarShare, setSolarShare] = useState(0); // 0 - 100%
  const [evShare, setEvShare] = useState(0); // 0 - 100%
  const [dietPlantShift, setDietPlantShift] = useState(0); // 0 - 100%
  const [thermostatChange, setThermostatChange] = useState(0); // 0 - 5 degrees

  // Dynamic footprint math
  const simulatedEnergy = Math.max(0, footprintData.energy * (1 - (solarShare / 100) * 0.8) - (thermostatChange * 10));
  const simulatedTransport = Math.max(0, footprintData.transport * (1 - (evShare / 100) * 0.7));
  const simulatedDiet = Math.max(0, footprintData.diet * (1 - (dietPlantShift / 100) * 0.6));
  const simulatedHabits = footprintData.habits;

  const simulatedTotal = simulatedEnergy + simulatedTransport + simulatedDiet + simulatedHabits;
  const totalReduction = baseTotal - simulatedTotal;
  const reductionPercent = baseTotal > 0 ? ((totalReduction / baseTotal) * 100).toFixed(1) : '0.0';

  // Recharts projection dataset comparison
  const comparisonData = [
    { name: 'Transport', current: footprintData.transport, simulated: simulatedTransport },
    { name: 'Energy', current: footprintData.energy, simulated: simulatedEnergy },
    { name: 'Diet', current: footprintData.diet, simulated: simulatedDiet },
    { name: 'Habits', current: footprintData.habits, simulated: simulatedHabits },
  ];

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-purple-500/20 p-3 rounded-xl">
          <Target className="w-8 h-8 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Carbon reduction Simulator</h1>
          <p className="text-slate-400">Tweak lifestyle scenario sliders to simulate real-time climate impact.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sliders Control Panel */}
        <div className="lg:col-span-1 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4">Simulated Scenarios</h2>

          {/* Solar Slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Solar Panel Share
              </span>
              <span className="text-amber-400 font-bold">{solarShare}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="5"
              value={solarShare}
              onChange={(e) => setSolarShare(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* EV Share Slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Car className="w-4 h-4 text-blue-400" /> Electric Vehicle Share
              </span>
              <span className="text-blue-400 font-bold">{evShare}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="5"
              value={evShare}
              onChange={(e) => setEvShare(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Plant-based Shift Slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-400" /> Plant-Based Food Shift
              </span>
              <span className="text-emerald-400 font-bold">{dietPlantShift}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="5"
              value={dietPlantShift}
              onChange={(e) => setDietPlantShift(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Thermostat Adjustment Slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <ThermometerSnowflake className="w-4 h-4 text-cyan-400" /> Thermostat Lowering
              </span>
              <span className="text-cyan-400 font-bold">-{thermostatChange} °C</span>
            </div>
            <input 
              type="range" min="0" max="5" step="1"
              value={thermostatChange}
              onChange={(e) => setThermostatChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        </div>

        {/* Projection Graphs & KPI */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 flex flex-col sm:flex-row justify-around items-center gap-6 shadow-xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Baseline Total</p>
              <p className="text-3xl font-black text-white">{baseTotal.toFixed(1)} kg</p>
            </div>
            <div className="w-px h-12 bg-slate-800 max-sm:hidden"></div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Simulated Total</p>
              <p className="text-3xl font-black text-purple-400">{simulatedTotal.toFixed(1)} kg</p>
            </div>
            <div className="w-px h-12 bg-slate-800 max-sm:hidden"></div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Reduction Share</p>
              <p className="text-3xl font-black text-emerald-400">-{reductionPercent}%</p>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Emissions Scenario Projection</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={comparisonData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                  <Legend />
                  <Area type="monotone" dataKey="current" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} name="Current Baseline" />
                  <Area type="monotone" dataKey="simulated" stroke="#10b981" fill="#10b981" fillOpacity={0.25} name="Simulated Scenario" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
