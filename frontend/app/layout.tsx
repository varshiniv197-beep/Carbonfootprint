import './globals.css';
import { Navigation } from '@/components/Navigation';

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
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
