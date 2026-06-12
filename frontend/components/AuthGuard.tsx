'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth state on mount/change
    if (!isLoggedIn) {
      if (pathname !== '/login' && pathname !== '/') {
        router.push('/login');
      } else {
        setLoading(false);
      }
    } else {
      if (pathname === '/login' || pathname === '/') {
        router.push('/dashboard');
      } else {
        setLoading(false);
      }
    }
  }, [isLoggedIn, pathname, router]);

  // Prevent flicker of protected content before redirect
  if (loading && pathname !== '/login' && pathname !== '/') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
