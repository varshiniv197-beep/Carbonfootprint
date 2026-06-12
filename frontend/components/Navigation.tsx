'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, LayoutDashboard, Calculator, Bot, Target, Trophy, BookOpen } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/calculator', label: 'Calculator', icon: Calculator },
    { href: '/coach', label: 'AI Coach', icon: Bot },
    { href: '/gamification', label: 'Gamification', icon: Trophy },
    { href: '/simulator', label: 'Simulator', icon: Target },
    { href: '/education', label: 'Education', icon: BookOpen },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-emerald-400 font-bold text-xl tracking-wide">
              <Leaf className="w-6 h-6" />
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center">
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
