import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Creative Director's Room",
  description: 'A studio for moodboards, prompts, storyboards, and palettes.',
  metadataBase: new URL('https://agentic-a1517443.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-white antialiased min-h-screen`}>{children}</body>
    </html>
  );
}
