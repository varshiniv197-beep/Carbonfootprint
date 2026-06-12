import Link from 'next/link';
import { Leaf, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-emerald-500/10 p-4 rounded-full mb-6">
        <Leaf className="w-16 h-16 text-emerald-400" />
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
        TerraSync AI+
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
        The ultimate AI-powered carbon footprint intelligence platform. Track, predict, simulate, and reduce your emissions.
      </p>
      <Link href="/dashboard" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-emerald-500/20">
        Launch Dashboard <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
