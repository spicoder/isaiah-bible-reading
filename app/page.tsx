// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Play, Heart, Bookmark, CheckCircle2 } from "lucide-react";
import { isaiahChapters } from "@/app/lib/data";
import { useProgress } from "@/app/lib/hooks";

export default function Home() {
  const chapters = Object.entries(isaiahChapters);
  const { completedChapters, isLoaded } = useProgress();

  // Find the first chapter ID that isn't completed to determine where to "Start Reading"
  const nextChapterId =
    chapters.find(([id]) => !completedChapters.includes(id))?.[0] || "1";

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-24">
      {/* Top Bar */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <h1 className="text-2xl font-black font-serif text-stone-900 tracking-tight">
          ISAIAH
        </h1>
        <div className="flex gap-4">
          <Link
            href="/favorites"
            className="p-2 bg-stone-100 rounded-full text-stone-600 hover:bg-amber-100 hover:text-amber-600 transition-colors"
          >
            <Heart size={20} />
          </Link>
          <Link
            href="/spiritual-gems"
            className="p-2 bg-stone-100 rounded-full text-stone-600 hover:bg-amber-100 hover:text-amber-600 transition-colors"
          >
            <Bookmark size={20} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 mb-8">
        <div className="bg-stone-900 rounded-4xl p-8 text-white relative overflow-hidden min-h-[300px] flex flex-col justify-end shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/10">
              <Sparkles size={12} className="text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Featured Reading
              </span>
            </div>
            <h2 className="text-4xl font-serif font-bold mb-2">
              The Great Vision
            </h2>
            <p className="text-stone-400 text-sm mb-6 max-w-xs">
              Start your journey through the prophetic visions of Isaiah,
              reimagined.
            </p>
            <Link
              href={`/isaiah/${nextChapterId}`}
              className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 hover:scale-105 transition-transform w-fit"
            >
              <Play size={14} fill="currentColor" />
              {isLoaded && completedChapters.includes(nextChapterId)
                ? "Continue Reading"
                : "Start Reading"}
            </Link>
          </div>
        </div>
      </section>

      {/* Chapters Feed */}
      <section className="px-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6">
          Chapters
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {chapters.map(([id, chapter]) => {
            const isDone = completedChapters.includes(id);
            const thumbnail = chapter.visuals[0]?.imageSrc;

            return (
              <Link key={id} href={`/isaiah/${id}`} className="group">
                <div className="aspect-3/4 bg-linear-180 from-black/70 to-black rounded-3xl border-2 border-stone-100 relative overflow-hidden transition-all duration-300 hover:border-amber-400 hover:shadow-lg">
                  {/* Upgrade: First Visual as Thumbnail */}
                  {thumbnail && (
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={thumbnail}
                        alt={`Chapter ${chapter.chapter}`}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-60 transition-opacity"
                      />
                    </div>
                  )}

                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <div className="flex justify-end">
                      {isDone && (
                        <CheckCircle2 size={20} className="text-green-600" />
                      )}
                    </div>
                    <h4 className="font-serif text-xl font-bold text-white leading-tight group-hover:text-amber-600 transition-colors">
                      Chapter {chapter.chapter}
                    </h4>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
