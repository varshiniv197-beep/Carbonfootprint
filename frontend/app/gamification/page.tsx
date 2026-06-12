'use client';
import { useStore } from '@/store/useStore';
import { Trophy, Medal, Flame, Star } from 'lucide-react';

export default function GamificationPage() {
  const { score, level, name, isLoggedIn } = useStore();

  // Dynamic Leaderboard list sorted in real-time
  const mockLeaderboard = [
    { username: 'Eco Champion', score: 98, level: 'Climate Champion' },
    { username: 'Green Guru', score: 92, level: 'Climate Champion' },
    { username: isLoggedIn && name ? name : 'Guest Warrior', score: score, level: level, isCurrentUser: true },
    { username: 'Carbon Cutter', score: 75, level: 'Eco Advocate' },
    { username: 'Rookie Offset', score: 45, level: 'Green Cadet' },
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-amber-500/20 p-3 rounded-xl">
          <Trophy className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Gamification & Community Leaderboard</h1>
          <p className="text-slate-400">Complete challenges, improve your score, and rise up the rankings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Status */}
        <div className="lg:col-span-1 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 text-center flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">{isLoggedIn && name ? name : 'Eco Guest'}</h2>
          <p className="text-emerald-400 font-semibold mt-1">{level}</p>
          <div className="text-5xl font-black text-white mt-4">{score} <span className="text-lg text-slate-500">XP</span></div>
        </div>

        {/* Right Columns: Leaderboard Table */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="text-amber-400 w-5 h-5 fill-amber-400" /> Global Standings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Rank</th>
                  <th className="pb-3">User</th>
                  <th className="pb-3">Score (XP)</th>
                  <th className="pb-3">Level</th>
                </tr>
              </thead>
              <tbody>
                {mockLeaderboard.map((user, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-slate-850 hover:bg-slate-800/20 transition-colors ${
                      user.isCurrentUser ? 'bg-emerald-500/10 text-emerald-400 font-bold border-l-4 border-l-emerald-500' : 'text-slate-300'
                    }`}
                  >
                    <td className="py-4 pl-3">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                    </td>
                    <td className="py-4 font-semibold">{user.username}</td>
                    <td className="py-4">{user.score} XP</td>
                    <td className="py-4 text-xs">
                      <span className={`px-2.5 py-1 rounded-full font-bold ${
                        user.level === 'Climate Champion' ? 'bg-emerald-500/10 text-emerald-400' :
                        user.level === 'Eco Advocate' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-700/20 text-slate-400'
                      }`}>
                        {user.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
