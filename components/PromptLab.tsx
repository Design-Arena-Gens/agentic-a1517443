"use client";

import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'cdr:promptlab:v1';

const styles = ['Cinematic', 'Editorial', 'Surreal', 'Minimal', 'Gritty', 'Elegant'];
const moods = ['Hopeful', 'Moody', 'Playful', 'Dramatic', 'Nostalgic', 'Futuristic'];
const mediums = ['Photography', 'Illustration', '3D', 'Film', 'Motion', 'Brand'];
const lenses = ['24mm', '35mm', '50mm', '85mm', 'Macro', 'Anamorphic'];
const lighting = ['Golden hour', 'Softbox', 'Hard light', 'Neon', 'Volumetric', 'Overcast'];

export default function PromptLab() {
  const [state, setState] = useState({
    style: styles[0],
    mood: moods[1],
    medium: mediums[0],
    subject: 'City at night in the rain',
    lens: lenses[3],
    light: lighting[0],
    extras: 'high detail, shallow depth of field, film grain',
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setState(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const prompt = useMemo(() => {
    const { style, mood, medium, subject, lens, light, extras } = state;
    return [
      `${style} ${medium}`,
      subject,
      `Mood: ${mood}`,
      `Lens: ${lens}`,
      `Lighting: ${light}`,
      extras,
    ]
      .filter(Boolean)
      .join(', ');
  }, [state]);

  return (
    <section className="panel p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title">Prompt Lab</h2>
        <div className="flex gap-2">
          <button className="btn" onClick={() => navigator.clipboard.writeText(prompt)}>Copy</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select label="Style" value={state.style} options={styles} onChange={(v) => setState({ ...state, style: v })} />
        <Select label="Mood" value={state.mood} options={moods} onChange={(v) => setState({ ...state, mood: v })} />
        <Select label="Medium" value={state.medium} options={mediums} onChange={(v) => setState({ ...state, medium: v })} />
        <Select label="Lens" value={state.lens} options={lenses} onChange={(v) => setState({ ...state, lens: v })} />
        <Select label="Lighting" value={state.light} options={lighting} onChange={(v) => setState({ ...state, light: v })} />
        <div>
          <label className="text-xs text-white/70">Subject</label>
          <input className="input w-full mt-1" value={state.subject} onChange={(e) => setState({ ...state, subject: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-white/70">Extras</label>
          <input className="input w-full mt-1" value={state.extras} onChange={(e) => setState({ ...state, extras: e.target.value })} />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-white/60 mb-1">Generated Prompt</div>
        <div className="input bg-black/30 whitespace-pre-wrap break-words">
          {prompt}
        </div>
      </div>
    </section>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-white/70">{label}</label>
      <select className="input w-full mt-1 bg-subtle/50" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
