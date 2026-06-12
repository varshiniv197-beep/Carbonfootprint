'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { 
  calculateTransportEmissions, 
  calculateEnergyEmissions, 
  calculateDietEmissions, 
  calculateHabitsEmissions 
} from '@/utils/carbon';
import { Car, Zap, Apple, Trash2, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export default function CalculatorPage() {
  const router = useRouter();
  const { setFootprintData, completeCalculator } = useStore();

  const [transportInputs, setTransportInputs] = useState({ carKm: 0, transitHrs: 0, flightsHrs: 0 });
  const [energyInputs, setEnergyInputs] = useState({ electricityKwh: 0, heatingGas: 0, waterLiters: 0 });
  const [dietInputs, setDietInputs] = useState({ meatMeals: 0, wasteKg: 0, localPercent: 0 });
  const [habitsInputs, setHabitsInputs] = useState({ clothesItems: 0, recyclePercent: 0, applianceStar: 0 });

  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { title: 'Transport', icon: Car, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Home Energy', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { title: 'Diet & Food', icon: Apple, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Habits', icon: Trash2, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  const scrollToStep = (index: number) => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setActiveStep(index);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      scrollToStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      scrollToStep(activeStep - 1);
    }
  };

  const handleFinish = () => {
    // Consume strictly-typed shared carbon calculations
    const transportScore = calculateTransportEmissions(transportInputs.carKm, transportInputs.transitHrs, transportInputs.flightsHrs);
    const energyScore = calculateEnergyEmissions(energyInputs.electricityKwh, energyInputs.heatingGas, energyInputs.waterLiters);
    const dietScore = calculateDietEmissions(dietInputs.meatMeals, dietInputs.wasteKg, dietInputs.localPercent);
    const habitsScore = calculateHabitsEmissions(habitsInputs.clothesItems, habitsInputs.recyclePercent, habitsInputs.applianceStar);

    setFootprintData({
      transport: Math.max(0, transportScore),
      energy: Math.max(0, energyScore),
      diet: Math.max(0, dietScore),
      habits: Math.max(0, habitsScore),
    });

    completeCalculator();
    router.push('/dashboard');
  };

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center" role="main" aria-label="Smart Carbon Calculator Onboarding">
      
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
          Carbon Footprint Onboarding
        </h1>
        <p className="text-slate-300">Complete all 4 factors horizontally to initialize your sustainability score.</p>
      </div>

      {/* Steps Visualizer */}
      <div className="flex justify-between items-center max-w-xl mx-auto w-full mb-8 relative px-4" role="navigation" aria-label="Calculator Progress Steps">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0"></div>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;
          return (
            <button
              key={step.title}
              onClick={() => scrollToStep(idx)}
              className="relative z-10 flex flex-col items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
              aria-label={`Go to ${step.title} step`}
              aria-current={isActive ? 'step' : undefined}
            >
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                isActive 
                  ? 'bg-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-110' 
                  : isCompleted 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}>
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={`text-xs font-bold mt-2 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-300'}`}>
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Horizontal Carousel Viewport */}
      <div 
        ref={containerRef}
        className="flex overflow-x-hidden snap-x snap-mandatory rounded-3xl border border-slate-800 bg-slate-900/30 backdrop-blur-xl shadow-2xl"
      >
        {/* STEP 1: TRANSPORT */}
        <div className="w-full shrink-0 snap-center p-8 md:p-12 space-y-6" role="region" aria-label="Transport Emissions Form">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500/10 p-3 rounded-2xl">
              <Car className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Section 1: Transportation Factors</h2>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="carKm" className="text-sm text-slate-200 font-semibold">Weekly Driving Distance (km)</label>
                <span className="text-blue-400 font-bold" aria-live="polite">{transportInputs.carKm} km</span>
              </div>
              <input 
                id="carKm"
                type="range" min="0" max="1000" step="10"
                value={transportInputs.carKm}
                onChange={(e) => setTransportInputs({ ...transportInputs, carKm: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Weekly Driving Distance in kilometers"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="transitHrs" className="text-sm text-slate-200 font-semibold">Public Transit Commute (hours/week)</label>
                <span className="text-blue-400 font-bold" aria-live="polite">{transportInputs.transitHrs} hrs</span>
              </div>
              <input 
                id="transitHrs"
                type="range" min="0" max="40" step="1"
                value={transportInputs.transitHrs}
                onChange={(e) => setTransportInputs({ ...transportInputs, transitHrs: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Public Transit Commute hours per week"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="flightsHrs" className="text-sm text-slate-200 font-semibold">Annual Flights Taken (flight hours)</label>
                <span className="text-blue-400 font-bold" aria-live="polite">{transportInputs.flightsHrs} hrs</span>
              </div>
              <input 
                id="flightsHrs"
                type="range" min="0" max="100" step="2"
                value={transportInputs.flightsHrs}
                onChange={(e) => setTransportInputs({ ...transportInputs, flightsHrs: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Annual flight hours"
              />
            </div>
          </div>
        </div>

        {/* STEP 2: ENERGY */}
        <div className="w-full shrink-0 snap-center p-8 md:p-12 space-y-6" role="region" aria-label="Home Energy Form">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-500/10 p-3 rounded-2xl">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Section 2: Home Energy Usage</h2>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="electricityKwh" className="text-sm text-slate-200 font-semibold">Electricity Consumption (kWh/month)</label>
                <span className="text-amber-400 font-bold" aria-live="polite">{energyInputs.electricityKwh} kWh</span>
              </div>
              <input 
                id="electricityKwh"
                type="range" min="0" max="2000" step="50"
                value={energyInputs.electricityKwh}
                onChange={(e) => setEnergyInputs({ ...energyInputs, electricityKwh: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Monthly electricity consumption in kilowatt hours"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="heatingGas" className="text-sm text-slate-200 font-semibold">Monthly Heating Gas Usage (therms)</label>
                <span className="text-amber-400 font-bold" aria-live="polite">{energyInputs.heatingGas} therms</span>
              </div>
              <input 
                id="heatingGas"
                type="range" min="0" max="200" step="5"
                value={energyInputs.heatingGas}
                onChange={(e) => setEnergyInputs({ ...energyInputs, heatingGas: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Monthly heating gas in therms"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="waterLiters" className="text-sm text-slate-200 font-semibold">Water Usage (liters/day)</label>
                <span className="text-amber-400 font-bold" aria-live="polite">{energyInputs.waterLiters} L</span>
              </div>
              <input 
                id="waterLiters"
                type="range" min="0" max="500" step="10"
                value={energyInputs.waterLiters}
                onChange={(e) => setEnergyInputs({ ...energyInputs, waterLiters: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Daily water usage in liters"
              />
            </div>
          </div>
        </div>

        {/* STEP 3: DIET */}
        <div className="w-full shrink-0 snap-center p-8 md:p-12 space-y-6" role="region" aria-label="Diet and Food Form">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-500/10 p-3 rounded-2xl">
              <Apple className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Section 3: Diet & Food Choices</h2>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="meatMeals" className="text-sm text-slate-200 font-semibold">Meat meals consumed weekly</label>
                <span className="text-emerald-400 font-bold" aria-live="polite">{dietInputs.meatMeals} meals</span>
              </div>
              <input 
                id="meatMeals"
                type="range" min="0" max="21" step="1"
                value={dietInputs.meatMeals}
                onChange={(e) => setDietInputs({ ...dietInputs, meatMeals: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Weekly meat meals consumed"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="wasteKg" className="text-sm text-slate-200 font-semibold">Food Waste Generated (kg/week)</label>
                <span className="text-emerald-400 font-bold" aria-live="polite">{dietInputs.wasteKg} kg</span>
              </div>
              <input 
                id="wasteKg"
                type="range" min="0" max="20" step="1"
                value={dietInputs.wasteKg}
                onChange={(e) => setDietInputs({ ...dietInputs, wasteKg: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Weekly food waste generated in kilograms"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="localPercent" className="text-sm text-slate-200 font-semibold">Locally Sourced Produce (%)</label>
                <span className="text-emerald-400 font-bold" aria-live="polite">{dietInputs.localPercent} %</span>
              </div>
              <input 
                id="localPercent"
                type="range" min="0" max="100" step="5"
                value={dietInputs.localPercent}
                onChange={(e) => setDietInputs({ ...dietInputs, localPercent: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Locally sourced produce percentage"
              />
            </div>
          </div>
        </div>

        {/* STEP 4: HABITS */}
        <div className="w-full shrink-0 snap-center p-8 md:p-12 space-y-6" role="region" aria-label="Consumer Habits Form">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-500/10 p-3 rounded-2xl">
              <Trash2 className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Section 4: Consumer Habits</h2>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="clothesItems" className="text-sm text-slate-200 font-semibold">New Clothes Purchased (items/month)</label>
                <span className="text-purple-400 font-bold" aria-live="polite">{habitsInputs.clothesItems} items</span>
              </div>
              <input 
                id="clothesItems"
                type="range" min="0" max="30" step="1"
                value={habitsInputs.clothesItems}
                onChange={(e) => setHabitsInputs({ ...habitsInputs, clothesItems: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="New clothing items purchased per month"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="recyclePercent" className="text-sm text-slate-200 font-semibold">Recycled Household Waste (%)</label>
                <span className="text-purple-400 font-bold" aria-live="polite">{habitsInputs.recyclePercent} %</span>
              </div>
              <input 
                id="recyclePercent"
                type="range" min="0" max="100" step="5"
                value={habitsInputs.recyclePercent}
                onChange={(e) => setHabitsInputs({ ...habitsInputs, recyclePercent: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Household waste recycling percentage"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="applianceStar" className="text-sm text-slate-200 font-semibold">Energy Star Appliance Rating (%)</label>
                <span className="text-purple-400 font-bold" aria-live="polite">{habitsInputs.applianceStar} %</span>
              </div>
              <input 
                id="applianceStar"
                type="range" min="0" max="100" step="10"
                value={habitsInputs.applianceStar}
                onChange={(e) => setHabitsInputs({ ...habitsInputs, applianceStar: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                aria-label="Percentage of energy star certified appliances in household"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center max-w-xl mx-auto w-full mt-8">
        <button
          onClick={handlePrev}
          disabled={activeStep === 0}
          className="flex items-center gap-2 bg-slate-900 border border-slate-850 text-slate-300 hover:text-white px-5 py-3 rounded-2xl transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
          aria-label="Back to previous section"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {activeStep < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
            aria-label="Go to next section"
          >
            Next Section <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
            aria-label="Submit carbon calculator onboarding variables and finish"
          >
            Compute Footprint <CheckCircle className="w-5 h-5" />
          </button>
        )}
      </div>

    </div>
  );
}
