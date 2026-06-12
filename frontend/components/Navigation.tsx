'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { Leaf, LayoutDashboard, Calculator, Bot, Target, Trophy, BookOpen, LogIn, LogOut } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout, name } = useStore();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/calculator', label: 'Calculator', icon: Calculator },
    { href: '/coach', label: 'AI Coach', icon: Bot },
    { href: '/gamification', label: 'Gamification', icon: Trophy },
    { href: '/simulator', label: 'Simulator', icon: Target },
    { href: '/education', label: 'Education', icon: BookOpen },
  ];

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
      router.push('/');
    } else {
      router.push('/login');
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-emerald-400 font-bold text-xl tracking-wide" aria-label="TerraSync Home">
              <Leaf className="w-6 h-6 animate-pulse" />
              TerraSync AI+
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (pathname === '/' && link.href === '/dashboard');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 max-md:hidden">
                👤 {name}
              </span>
            )}
            <button 
              onClick={handleAuthAction}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all border border-slate-700 shadow-sm active:scale-95"
              aria-label={isLoggedIn ? 'Log Out' : 'Log In'}
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span className="max-sm:hidden">Sign Out</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-emerald-400" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
