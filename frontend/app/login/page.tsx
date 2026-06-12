'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { sanitizeInput, validatePassword, generateCsrfToken } from '@/utils/security';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState('');
  const [strengthMessage, setStrengthMessage] = useState('');

  useEffect(() => {
    // Generate secure CSRF token on component mount
    setCsrfToken(generateCsrfToken());
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (val) {
      const check = validatePassword(val);
      setStrengthMessage(check.feedback);
    } else {
      setStrengthMessage('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Input sanitization (XSS Defense)
    const cleanUsername = sanitizeInput(username.trim());
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setError('Please fill in all fields.');
      return;
    }

    // Validate password strength
    const passwordCheck = validatePassword(cleanPassword);
    if (!passwordCheck.isValid) {
      setError(passwordCheck.feedback);
      return;
    }

    // Simulate authentication logic
    login(cleanUsername);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="flex flex-col items-center mb-8 relative">
          <div className="bg-emerald-500/20 p-3 rounded-2xl mb-4 border border-emerald-500/30">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to TerraSync AI+</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in securely to manage your footprint</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-rose-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          {/* Simulated CSRF Token */}
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
              />
            </div>
            {strengthMessage && (
              <p className={`text-xs mt-2 font-medium ${strengthMessage.includes('Strong') ? 'text-emerald-400' : 'text-amber-400'}`}>
                {strengthMessage}
              </p>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
          >
            Authenticate Profile
          </button>
        </form>
      </div>
    </div>
  );
}
