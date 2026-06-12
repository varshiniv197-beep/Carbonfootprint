import './globals.css';

export const metadata = {
  title: 'TerraSync AI',
  description: 'Your Smart Sustainability Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-dark text-slate-100 font-sans antialiased">{children}</body>
    </html>
  );
}
