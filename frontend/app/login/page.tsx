'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { sanitizeInput, validatePassword, generateCsrfToken, hashPassword } from '@/utils/security';
import { Shield, Lock, User, AlertCircle, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useStore();
  
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState('');
  const [strengthMessage, setStrengthMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCsrfToken(generateCsrfToken());
  }, [activeTab]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (activeTab === 'register' && val) {
      const check = validatePassword(val);
      setStrengthMessage(check.feedback);
    } else {
      setStrengthMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanUsername = sanitizeInput(username.trim());
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (activeTab === 'register') {
      const passwordCheck = validatePassword(cleanPassword);
      if (!passwordCheck.isValid) {
        setError(passwordCheck.feedback);
        setLoading(false);
        return;
      }
      
      const hashedPassword = await hashPassword(cleanPassword);
      const success = await register(cleanUsername, hashedPassword);
      if (!success) {
        setError('Username already exists.');
        setLoading(false);
        return;
      }
      router.push('/calculator');
    } else {
      const hashedPassword = await hashPassword(cleanPassword);
      const success = await login(cleanUsername, hashedPassword);
      if (!success) {
        setError('Invalid credentials.');
        setLoading(false);
        return;
      }
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="flex flex-col items-center mb-8 relative">
          <div className="bg-emerald-500/20 p-3 rounded-2xl mb-4 border border-emerald-500/30">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">TerraSync AI+ Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Authenticate to synchronize sustainability factors</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80 mb-6">
          <button 
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'login' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => { setActiveTab('register'); setError(''); }}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'register' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-rose-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <input type="hidden" name="csrf_token" value={csrfToken} />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. eco_warrior"
                className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 transition-colors"
                disabled={loading}
              />
            </div>
            {activeTab === 'register' && strengthMessage && (
              <p className={`text-xs mt-2 font-medium ${strengthMessage.includes('Strong') ? 'text-emerald-400' : 'text-amber-400'}`}>
                {strengthMessage}
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : activeTab === 'register' ? (
              <>
                <Sparkles className="w-5 h-5" /> Start Journey
              </>
            ) : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
