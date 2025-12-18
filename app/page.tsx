// app/page.tsx
"use client";

import { useState } from "react"; // Added for pagination state
import Link from "next/link";
import Image from "next/image";
// Added Chevron icons for pagination controls
import {
  Sparkles,
  Play,
  Heart,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { isaiahChapters } from "@/app/lib/data";
import { useProgress } from "@/app/lib/hooks";

export default function Home() {
  const chapters = Object.entries(isaiahChapters);
  const { completedChapters, isLoaded } = useProgress();

  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const CHAPTERS_PER_PAGE = 4;

  const totalPages = Math.ceil(chapters.length / CHAPTERS_PER_PAGE);
  const startIndex = (currentPage - 1) * CHAPTERS_PER_PAGE;
  const paginatedChapters = chapters.slice(
    startIndex,
    startIndex + CHAPTERS_PER_PAGE
  );
  // -------------------------

  // Find the first chapter ID that isn't completed to determine the "next" chapter
  // Note: This remains calculated from the full list so the Hero is always accurate
  const nextChapterId =
    chapters.find(([id]) => !completedChapters.includes(id))?.[0] || "1";

  const nextChapter = isaiahChapters[nextChapterId];

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
        <div className="bg-stone-900 rounded-4xl p-8 text-white relative overflow-hidden min-h-[350px] flex flex-col justify-end shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

          {nextChapter?.visuals[0] && (
            <div className="absolute inset-0 z-0">
              <Image
                src={nextChapter.visuals[0].imageSrc}
                alt="Background"
                fill
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent"></div>
            </div>
          )}

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/10">
              <Sparkles size={12} className="text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {isLoaded && completedChapters.includes(nextChapterId)
                  ? "Review Chapter"
                  : "Next Reading"}
              </span>
            </div>

            <h2 className="text-4xl font-serif font-bold mb-4">
              Chapter {nextChapter.chapter}
            </h2>

            <div className="flex flex-col gap-2 mb-8 max-w-md">
              {nextChapter?.visuals.map((visual, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <p className="text-stone-300 text-sm leading-tight font-medium">
                    {visual.title}
                  </p>
                </div>
              ))}
            </div>

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
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400">
            Chapters
          </h3>
          {/* Page indicator for mobile/desktop layout help */}
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Map through paginatedChapters instead of all chapters */}
          {paginatedChapters.map(([id, chapter]) => {
            const isDone = completedChapters.includes(id);
            const thumbnail = chapter.visuals[0]?.imageSrc;

            return (
              <Link key={id} href={`/isaiah/${id}`} className="group">
                <div className="aspect-3/4 bg-stone-800 rounded-3xl border-2 border-stone-100 relative overflow-hidden transition-all duration-300 hover:border-amber-400 hover:shadow-lg">
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
                        <CheckCircle2
                          size={28}
                          strokeWidth={3}
                          className="text-green-600 drop-shadow-md"
                        />
                      )}
                    </div>
                    <h4 className="font-serif text-xl font-bold text-white leading-tight group-hover:text-amber-400 transition-colors drop-shadow-lg">
                      Chapter {chapter.chapter}
                    </h4>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: "smooth" }); // Optional scroll to top
              }}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex flex-col items-center">
              <span className="text-xs font-black text-stone-900">
                {currentPage}
              </span>
              <div className="w-4 h-0.5 bg-amber-500 rounded-full" />
            </div>

            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
