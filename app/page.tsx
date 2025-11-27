"use client";

import Header from "../components/Header";
import IdeaPad from "../components/IdeaPad";
import Moodboard from "../components/Moodboard";
import PromptLab from "../components/PromptLab";
import Storyboard from "../components/Storyboard";
import Palette from "../components/Palette";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="container py-6 sm:py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Moodboard />
            <PromptLab />
          </div>
          <div className="space-y-6">
            <IdeaPad />
            <Palette />
          </div>
        </div>

        <Storyboard />

        <footer className="text-center text-xs text-white/50 pt-6 pb-12">
          Built for creative direction ? locally persisted. No uploads leave your browser.
        </footer>
      </div>
    </main>
  );
}
