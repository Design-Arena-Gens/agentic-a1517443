"use client";

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'cdr:notebook:v1';

export default function IdeaPad() {
  const [text, setText] = useState('');
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, text);
      setSavedAt(new Date().toLocaleTimeString());
    }, 400);
    return () => clearTimeout(id);
  }, [text]);

  return (
    <section className="panel p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title">Notebook</h2>
        <div className="text-xs text-white/60">{savedAt ? `Saved ${savedAt}` : 'Autosave on'}</div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={'Write treatments, notes, and directives...'}
        className="input min-h-[220px] sm:min-h-[260px] resize-y w-full flex-1 bg-subtle/50"
        spellCheck={false}
      />
      <div className="mt-3 flex gap-2">
        <button className="btn" onClick={() => setText('')}>Clear</button>
        <button className="btn" onClick={() => navigator.clipboard.writeText(text)}>Copy</button>
      </div>
    </section>
  );
}
