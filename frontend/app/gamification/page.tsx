'use client';
import { useStore } from '@/store/useStore';
import { Trophy, Medal, Target, Flame } from 'lucide-react';

export default function GamificationPage() {
  const { score, level, name } = useStore();

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-amber-500/20 p-3 rounded-xl">
          <Trophy className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Gamification & Goals</h1>
          <p className="text-slate-400">Level up your sustainability journey.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
            <span className="text-3xl font-black text-white">{score}</span>
          </div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-emerald-400 font-semibold">{level}</p>
        </div>

        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Flame className="text-orange-500" /> Active Challenges
          </h2>
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Zero Emission Commute</h3>
                <p className="text-sm text-slate-400">Use bike or walk to work 3 times this week.</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold block">1 / 3 Days</span>
                <span className="text-xs text-slate-500">+50 XP</span>
              </div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Energy Vampire Slayer</h3>
                <p className="text-sm text-slate-400">Unplug all inactive appliances for 5 days.</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold block">Completed</span>
                <span className="text-xs text-slate-500">+100 XP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Medal className="text-blue-400" /> Achievement Badges
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex-shrink-0 w-32 h-32 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-2">
                <div className={`w-12 h-12 rounded-full ${i <= 2 ? 'bg-emerald-500' : 'bg-slate-800 grayscale'} flex items-center justify-center`}>
                  <Target className="text-white" />
                </div>
                <span className="text-xs font-bold text-center px-2">
                  {i === 1 ? 'Early Adopter' : i === 2 ? 'Tree Hugger' : 'Locked Badge'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
