'use client';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Target, Zap, Car, Leaf, ThermometerSnowflake } from 'lucide-react';
import { calculateSimulatedFootprint } from '@/utils/carbon';

export default function SimulatorPage() {
  const { footprintData } = useStore();
  const baseTotal = footprintData.transport + footprintData.energy + footprintData.diet + footprintData.habits;

  // Scenario sliders
  const [solarShare, setSolarShare] = useState(0); // 0 - 100%
  const [evShare, setEvShare] = useState(0); // 0 - 100%
  const [dietPlantShift, setDietPlantShift] = useState(0); // 0 - 100%
  const [thermostatChange, setThermostatChange] = useState(0); // 0 - 5 degrees

  // Consume strictly-typed centralized carbon engine calculation
  const simulationResults = calculateSimulatedFootprint(footprintData, {
    solarShare,
    evShare,
    dietPlantShift,
    thermostatChange,
  });

  const {
    energy: simulatedEnergy,
    transport: simulatedTransport,
    diet: simulatedDiet,
    habits: simulatedHabits,
    total: simulatedTotal,
  } = simulationResults;

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
    <div className="p-6 md:p-12 max-w-6xl mx-auto" role="main" aria-label="AI Carbon Reduction Simulator">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-purple-500/20 p-3 rounded-xl">
          <Target className="w-8 h-8 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">AI Carbon reduction Simulator</h1>
          <p className="text-slate-200">Tweak lifestyle scenario sliders to simulate real-time climate impact.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sliders Control Panel */}
        <div className="lg:col-span-1 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4">Simulated Scenarios</h2>

          {/* Solar Slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label htmlFor="solarShare" className="text-slate-200 font-semibold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Solar Panel Share
              </label>
              <span className="text-amber-400 font-bold" aria-live="polite">{solarShare}%</span>
            </div>
            <input 
              id="solarShare"
              type="range" min="0" max="100" step="5"
              value={solarShare}
              onChange={(e) => setSolarShare(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
              aria-label="Solar panel share adoption percentage"
            />
          </div>

          {/* EV Share Slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label htmlFor="evShare" className="text-slate-200 font-semibold flex items-center gap-1.5">
                <Car className="w-4 h-4 text-blue-400" /> Electric Vehicle Share
              </label>
              <span className="text-blue-400 font-bold" aria-live="polite">{evShare}%</span>
            </div>
            <input 
              id="evShare"
              type="range" min="0" max="100" step="5"
              value={evShare}
              onChange={(e) => setEvShare(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
              aria-label="Electric vehicle share adoption percentage"
            />
          </div>

          {/* Plant-based Shift Slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label htmlFor="dietPlantShift" className="text-slate-200 font-semibold flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-400" /> Plant-Based Food Shift
              </label>
              <span className="text-emerald-400 font-bold" aria-live="polite">{dietPlantShift}%</span>
            </div>
            <input 
              id="dietPlantShift"
              type="range" min="0" max="100" step="5"
              value={dietPlantShift}
              onChange={(e) => setDietPlantShift(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
              aria-label="Plant based food shift percentage"
            />
          </div>

          {/* Thermostat Adjustment Slider */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label htmlFor="thermostatChange" className="text-slate-200 font-semibold flex items-center gap-1.5">
                <ThermometerSnowflake className="w-4 h-4 text-cyan-400" /> Thermostat Lowering
              </label>
              <span className="text-cyan-400 font-bold" aria-live="polite">-{thermostatChange} °C</span>
            </div>
            <input 
              id="thermostatChange"
              type="range" min="0" max="5" step="1"
              value={thermostatChange}
              onChange={(e) => setThermostatChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
              aria-label="Thermostat lowering in degrees Celsius"
            />
          </div>
        </div>

        {/* Projection Graphs & KPI */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 flex flex-col sm:flex-row justify-around items-center gap-6 shadow-xl" role="region" aria-label="Emissions Reductions Metrics Summary">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-350 mb-1">Baseline Total</p>
              <p className="text-3xl font-black text-white">{baseTotal.toFixed(1)} kg</p>
            </div>
            <div className="w-px h-12 bg-slate-800 max-sm:hidden" aria-hidden="true"></div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-350 mb-1">Simulated Total</p>
              <p className="text-3xl font-black text-purple-400">{simulatedTotal.toFixed(1)} kg</p>
            </div>
            <div className="w-px h-12 bg-slate-800 max-sm:hidden" aria-hidden="true"></div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-350 mb-1">Reduction Share</p>
              <p className="text-3xl font-black text-emerald-400">-{reductionPercent}%</p>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Emissions Scenario Projection</h3>
            <div className="h-64 w-full" aria-label="Area chart showing comparison between Current Baseline emissions and Simulated Scenario emissions by category" role="img">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={comparisonData}>
                  <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} />
                  <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} />
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
