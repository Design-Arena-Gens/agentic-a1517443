"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

interface BoardImage {
  id: string;
  dataUrl: string;
}

const STORAGE_KEY = 'cdr:moodboard:v1';

export default function Moodboard() {
  const [images, setImages] = useState<BoardImage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setImages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  }, [images]);

  const onFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const toAdd: BoardImage[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      toAdd.push({ id: crypto.randomUUID(), dataUrl });
    }
    setImages((prev) => [...toAdd, ...prev]);
  }, []);

  const onDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      await onFiles(e.dataTransfer.files);
    },
    [onFiles]
  );

  return (
    <section className="panel p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title">Moodboard</h2>
        <div className="flex gap-2">
          <button className="btn" onClick={() => inputRef.current?.click()}>Upload</button>
          <button className="btn" onClick={() => setImages([])}>Clear</button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex-1 min-h-[220px] sm:min-h-[260px] rounded-lg border-2 border-dashed border-subtle p-3"
      >
        {images.length === 0 ? (
          <div className="h-full w-full grid place-items-center text-white/60 text-sm">
            Drop images here or click Upload
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img) => (
              <figure key={img.id} className="group relative overflow-hidden rounded-lg border border-subtle bg-subtle/40">
                <img src={img.dataUrl} alt="mood" className="w-full h-32 sm:h-36 object-cover" />
                <button
                  aria-label="remove"
                  className="absolute top-2 right-2 btn bg-black/50 border-white/20 text-xs opacity-0 group-hover:opacity-100"
                  onClick={() => setImages((prev) => prev.filter((i) => i.id !== img.id))}
                >
                  Remove
                </button>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
