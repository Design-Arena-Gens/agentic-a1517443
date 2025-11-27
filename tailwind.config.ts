import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(240 5% 8%)',
        panel: 'hsl(240 5% 12%)',
        subtle: 'hsl(240 4% 18%)',
        ring: 'hsl(264 100% 59%)',
        accent: 'hsl(16 100% 60%)',
      },
      boxShadow: {
        glow: '0 0 0 2px hsl(264 100% 59% / 0.2)',
      }
    },
  },
  plugins: [],
} satisfies Config;
