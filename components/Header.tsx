"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-background/70 backdrop-blur border-b border-subtle/80">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-ring/30 grid place-items-center border border-ring/40">
            <span className="text-white font-bold">CD</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Creative Director's Room</h1>
            <p className="text-xs text-white/60">Where ideas become direction</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-2 text-sm">
          <span className="badge">Moodboard</span>
          <span className="badge">Prompt Lab</span>
          <span className="badge">Storyboard</span>
          <span className="badge">Palette</span>
          <span className="badge">Notebook</span>
        </nav>
      </div>
    </header>
  );
}
