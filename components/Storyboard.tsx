"use client";

import { useEffect, useRef, useState } from 'react';

interface Frame {
  id: string;
  title: string;
  note: string;
  image?: string;
}

const STORAGE_KEY = 'cdr:storyboard:v1';

export default function Storyboard() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFrames(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(frames));
  }, [frames]);

  const addFrame = () => {
    setFrames((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: `Frame ${prev.length + 1}`, note: '' },
    ]);
  };

  const updateFrame = (id: string, patch: Partial<Frame>) => {
    setFrames((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const removeFrame = (id: string) => setFrames((prev) => prev.filter((f) => f.id !== id));

  const pickImage = async (id: string, file?: File | null) => {
    if (!file) return;
    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
    updateFrame(id, { image: dataUrl });
  };

  return (
    <section className="panel p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title">Storyboard</h2>
        <div className="flex gap-2">
          <button className="btn" onClick={addFrame}>Add Frame</button>
          <button className="btn" onClick={() => setFrames([])}>Clear</button>
        </div>
      </div>

      {frames.length === 0 ? (
        <div className="min-h-[220px] sm:min-h-[260px] grid place-items-center text-white/60 text-sm border border-subtle rounded-lg">
          Add frames to plan beats and shots
        </div>
      ) : (
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {frames.map((f, i) => (
            <li key={f.id} className="rounded-lg border border-subtle overflow-hidden bg-subtle/40">
              <div className="aspect-video bg-black/40 grid place-items-center relative">
                {f.image ? (
                  <img src={f.image} alt="frame" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white/50 text-sm">No Image</div>
                )}
                <div className="absolute top-2 left-2 badge">{i + 1}</div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button className="btn text-xs" onClick={() => fileRefs.current[f.id]?.click()}>Image</button>
                  <button className="btn text-xs" onClick={() => updateFrame(f.id, { image: undefined })}>Remove</button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={(el) => { fileRefs.current[f.id] = el; }}
                  onChange={(e) => pickImage(f.id, e.target.files?.[0])}
                />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <input
                  className="input w-full"
                  value={f.title}
                  onChange={(e) => updateFrame(f.id, { title: e.target.value })}
                />
                <textarea
                  className="input w-full min-h-20"
                  value={f.note}
                  onChange={(e) => updateFrame(f.id, { note: e.target.value })}
                  placeholder="Beat details, camera move, reference..."
                />
                <div className="flex justify-between">
                  <button className="btn" onClick={() => removeFrame(f.id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
