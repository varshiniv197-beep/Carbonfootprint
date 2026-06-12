import './globals.css';
import { Navigation } from '@/components/Navigation';
import { AuthGuard } from '@/components/AuthGuard';

export const metadata = {
  title: 'TerraSync AI+',
  description: 'Your Smart Sustainability Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col">
        <AuthGuard>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
        </AuthGuard>
      </body>
    </html>
  );
}
