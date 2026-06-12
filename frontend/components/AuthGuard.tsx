'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, hasCalculated } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      if (pathname !== '/login' && pathname !== '/') {
        router.push('/login');
      } else {
        setLoading(false);
      }
    } else {
      // User is logged in
      if (!hasCalculated) {
        if (pathname !== '/calculator') {
          router.push('/calculator');
        } else {
          setLoading(false);
        }
      } else {
        // User has already calculated footprint
        if (pathname === '/login' || pathname === '/' || pathname === '/calculator') {
          router.push('/dashboard');
        } else {
          setLoading(false);
        }
      }
    }
  }, [isLoggedIn, hasCalculated, pathname, router]);

  if (loading && pathname !== '/login' && pathname !== '/') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
