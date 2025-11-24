import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Norway Stocker Jobs | Agentic Finder',
  description: 'Find stocker and warehouse jobs in Norway with quick links and tips.',
  openGraph: {
    title: 'Norway Stocker Jobs | Agentic Finder',
    description: 'Curated links to stocker roles in Norway with filters and application tips.',
    url: 'https://agentic-0b169ac6.vercel.app',
    siteName: 'Agentic Finder',
    locale: 'en_US',
    type: 'website'
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0ea5e9'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
