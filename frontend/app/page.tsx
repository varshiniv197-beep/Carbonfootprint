import Link from 'next/link';
import { Leaf, ArrowRight, Shield, Activity, Award, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

      {/* Main Hero Container */}
      <div className="max-w-4xl text-center z-10 space-y-6 mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <Leaf className="w-4 h-4 animate-bounce" /> Carbon Intelligence Redefined
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
          TerraSync AI+
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          The ultimate AI-powered sustainability hub designed to help individuals understand, track, and reduce their carbon footprint.
        </p>
        <div className="pt-4">
          <Link href="/login" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 active:scale-95">
            Launch Onboarding <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Problem Statement & Alignment Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        
        {/* Understand Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 relative group hover:border-emerald-500/30 transition-all">
          <div className="bg-emerald-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">1. Understand</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Unpack your daily environmental impact. Our horizontal scroll calculator assesses transportation, utility usage, dietary choices, and spending habits with no baseline assumptions.
          </p>
        </div>

        {/* Track Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 relative group hover:border-cyan-500/30 transition-all">
          <div className="bg-cyan-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-cyan-400 border border-cyan-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">2. Track</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Monitor emissions trends in real-time. Dynamic Recharts area graphs and breakdown bars project historical footprints to highlight precisely where reductions occur.
          </p>
        </div>

        {/* Reduce Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 relative group hover:border-purple-500/30 transition-all">
          <div className="bg-purple-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-purple-400 border border-purple-500/20">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">3. Reduce</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Mitigate your footprint via interactive scenario range sliders, monthly checklist milestones, and structured guided AI Coach recommendations tailored to your hotspots.
          </p>
        </div>

      </div>

      {/* Trust & Security Badge */}
      <div className="mt-16 flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider z-10 bg-slate-900/20 border border-slate-800/50 px-4 py-2 rounded-full">
        <Shield className="w-4 h-4 text-emerald-500" /> Hashed SHA-256 Authentication & Local Storage DB Fallback Enabled
      </div>

    </div>
  );
}
