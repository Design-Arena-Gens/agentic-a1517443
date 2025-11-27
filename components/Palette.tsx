"use client";

import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'cdr:palette:v1';

export default function Palette() {
  const [colors, setColors] = useState<string[]>(['#F97316', '#3B82F6', '#22C55E', '#F43F5E', '#A855F7']);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setColors(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  }, [colors]);

  const contrast = (hex: string) => {
    const c = hex.replace('#', '');
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#111827' : 'white';
  };

  const cssGradient = useMemo(() => `linear-gradient(90deg, ${colors.join(', ')})`, [colors]);

  return (
    <section className="panel p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title">Palette</h2>
        <div className="flex gap-2">
          <button className="btn" onClick={() => navigator.clipboard.writeText(colors.join(', '))}>Copy All</button>
        </div>
      </div>

      <div className="rounded-lg border border-subtle overflow-hidden" style={{ backgroundImage: cssGradient }}>
        <div className="grid grid-cols-5">
          {colors.map((hex, idx) => (
            <div key={idx} className="p-3 flex flex-col gap-2" style={{ background: hex }}>
              <div className="text-xs" style={{ color: contrast(hex) }}>{hex.toUpperCase()}</div>
              <input
                type="color"
                value={hex}
                onChange={(e) => setColors(colors.map((c, i) => (i === idx ? e.target.value : c)))}
                className="w-full h-8 cursor-pointer border border-white/20 rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
