'use client';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Target, ArrowRight, Zap, Car } from 'lucide-react';

export default function SimulatorPage() {
  const { footprintData } = useStore();
  const baseTotal = footprintData.transport + footprintData.energy + footprintData.diet + footprintData.shopping;
  
  const [simulations, setSimulations] = useState({
    solar: false,
    publicTransit: false,
    vegan: false
  });

  const getSimulatedTotal = () => {
    let total = baseTotal;
    if (simulations.solar) total -= footprintData.energy * 0.8;
    if (simulations.publicTransit) total -= footprintData.transport * 0.5;
    if (simulations.vegan) total -= footprintData.diet * 0.4;
    return Math.max(0, total);
  };

  const simulatedTotal = getSimulatedTotal();
  const reduction = baseTotal - simulatedTotal;

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-purple-500/20 p-3 rounded-xl">
          <Target className="w-8 h-8 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Reduction Simulator</h1>
          <p className="text-slate-400">See the impact of lifestyle changes instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Toggle Scenarios</h2>
          
          <label className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <Zap className="text-amber-400" />
              <div>
                <p className="font-bold">Install Solar Panels</p>
                <p className="text-xs text-slate-400">-80% Home Energy Emissions</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-purple-500"
              checked={simulations.solar}
              onChange={(e) => setSimulations({...simulations, solar: e.target.checked})}
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <Car className="text-blue-400" />
              <div>
                <p className="font-bold">Use Public Transit</p>
                <p className="text-xs text-slate-400">-50% Transport Emissions</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-purple-500"
              checked={simulations.publicTransit}
              onChange={(e) => setSimulations({...simulations, publicTransit: e.target.checked})}
            />
          </label>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-6 text-center">Impact Projection</h2>
          
          <div className="flex items-center justify-between mb-8">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Current</p>
              <p className="text-3xl font-black">{baseTotal.toFixed(1)} <span className="text-sm">kg</span></p>
            </div>
            <ArrowRight className="text-slate-600" />
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Projected</p>
              <p className="text-3xl font-black text-purple-400">{simulatedTotal.toFixed(1)} <span className="text-sm">kg</span></p>
            </div>
          </div>

          {reduction > 0 && (
            <div className="bg-purple-500/10 border border-purple-500/20 text-purple-300 p-4 rounded-xl text-center">
              You could reduce your footprint by <span className="font-bold">{reduction.toFixed(1)} kg</span> CO₂!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
