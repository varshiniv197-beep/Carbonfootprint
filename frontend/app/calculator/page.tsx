'use client';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Calculator, Car, Zap, Apple } from 'lucide-react';

export default function CalculatorPage() {
  const { footprintData, setFootprintData } = useStore();
  const [formData, setFormData] = useState({ ...footprintData });

  const handleSave = () => {
    setFootprintData(formData);
    alert('Footprint updated successfully! New budget and score calculated.');
  };

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-emerald-500/20 p-3 rounded-xl">
          <Calculator className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Smart Carbon Calculator</h1>
          <p className="text-slate-400">Update your lifestyle data to recalibrate your AI models.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Transportation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Car className="text-blue-400 w-5 h-5" /> Transportation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Weekly Driving (km)</label>
              <input 
                type="number" 
                value={formData.transport * 2} // mock logic
                onChange={(e) => setFormData({ ...formData, transport: Number(e.target.value) / 2 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500" 
              />
            </div>
          </div>
        </div>

        {/* Energy */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Zap className="text-amber-400 w-5 h-5" /> Home Energy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Monthly Electricity (kWh)</label>
              <input 
                type="number" 
                value={formData.energy * 3} // mock logic
                onChange={(e) => setFormData({ ...formData, energy: Number(e.target.value) / 3 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500" 
              />
            </div>
          </div>
        </div>

        {/* Diet */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Apple className="text-emerald-400 w-5 h-5" /> Diet & Food
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Diet Type</label>
              <select 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
                defaultValue="mixed"
                onChange={(e) => setFormData({ ...formData, diet: e.target.value === 'vegan' ? 10 : 30 })}
              >
                <option value="meat">Meat Heavy</option>
                <option value="mixed">Mixed</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
        >
          Calculate & Update AI Profile
        </button>
      </div>
    </div>
  );
}
