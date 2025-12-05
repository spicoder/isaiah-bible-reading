"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  X,
  Sparkles,
  Map,
  Heart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChapterData, Verse, VisualScene } from "@/app/lib/data";
import { useFavorites } from "@/app/lib/hooks";
import Image from "next/image";

// --- Types ---
type StoryItem =
  | { type: "visual"; data: VisualScene; id: string }
  | { type: "verse"; data: Verse; id: string };

const getStoryItems = (chapter: ChapterData): StoryItem[] => {
  const items: StoryItem[] = [];
  const sortedVerses = [...chapter.verses].sort((a, b) => a.verse - b.verse);

  sortedVerses.forEach((verse) => {
    const scene = chapter.visuals.find((v) => v.startVerse === verse.verse);
    if (scene) {
      items.push({ type: "visual", data: scene, id: `visual-${verse.verse}` });
    }
    items.push({ type: "verse", data: verse, id: `verse-${verse.verse}` });
  });
  return items;
};

export default function StoryViewer({ chapter }: { chapter: ChapterData }) {
  const slides = getStoryItems(chapter);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  const currentSlide = slides[currentIndex];
  const isLastSlide = currentIndex === slides.length - 1;

  // --- Navigation ---
  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Optional: Redirect to home or next chapter when done
      // router.push('/');
    }
  }, [currentIndex, slides.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === " ") setIsPaused((p) => !p); // Space to pause
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // --- Auto-Advance Timer Logic ---
  // We don't use setInterval here; we let the Framer Motion "onAnimationComplete" trigger next.
  // See the Progress Bar component below.

  // --- Variants ---
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "circOut" },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.4, ease: "circIn" },
    }),
  };

  return (
    <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden">
      {/* 1. PROGRESS BARS (Visualization of Timer) */}
      <div className="absolute top-2 left-2 right-2 z-50 flex gap-1 h-1">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-full rounded-full bg-white/20 overflow-hidden"
          >
            {idx === currentIndex ? (
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: isPaused ? "0%" : "100%" }} // If paused, hold. If active, fill.
                // KEY: This 10s duration is your timer.
                transition={{ duration: 10, ease: "linear" }}
                onAnimationComplete={() => !isPaused && handleNext()}
              />
            ) : (
              <div
                className={`h-full bg-white ${
                  idx < currentIndex ? "w-full" : "w-0"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* 2. HEADER (Top Left Speaker & Close) */}
      <div className="absolute top-6 left-4 right-4 z-40 flex justify-between items-start">
        {/* Speaker / Title Area */}
        <div className="flex items-center gap-3">
          {currentSlide.type === "verse" ? (
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {currentSlide.data.speaker === "Jehovah" ? (
                <Sparkles size={14} className="text-amber-400" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-stone-400" />
              )}
              <span className="font-bold text-sm tracking-wide">
                {currentSlide.data.speaker}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-500/90 text-black px-3 py-1.5 rounded-full">
              <Map size={14} />
              <span className="font-bold text-sm tracking-wide">
                Visual Scene
              </span>
            </div>
          )}
        </div>

        <Link
          href="/"
          className="p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
        >
          <X size={24} />
        </Link>
      </div>

      {/* 3. INTERACTIONS (Right Side) */}
      {currentSlide.type === "verse" && (
        <div className="absolute right-4 bottom-32 z-50 flex flex-col gap-6 items-center">
          {/* Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(currentSlide.id);
            }}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`p-3 rounded-full backdrop-blur-md transition-all ${
                isFavorite(currentSlide.id)
                  ? "bg-red-500/20 text-red-500"
                  : "bg-black/40 text-white"
              }`}
            >
              <Heart
                size={28}
                fill={isFavorite(currentSlide.id) ? "currentColor" : "none"}
              />
            </div>
            <span className="text-[10px] font-bold">Save</span>
          </button>

          {/* Reply / Gems */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to Spiritual Gems with context
              router.push(
                `/spiritual-gems?ref=${encodeURIComponent(
                  `Isaiah 1:${currentSlide.data.verse}`
                )}`
              );
            }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white">
              <MessageCircle size={28} />
            </div>
            <span className="text-[10px] font-bold">Reply</span>
          </button>
        </div>
      )}

      {/* 4. TAP ZONES (Pause logic added) */}
      <div className="absolute inset-0 z-30 flex">
        <div
          className="w-[30%] h-full"
          onClick={handlePrev}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        />
        <div
          className="w-[70%] h-full"
          onClick={handleNext}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        />
      </div>

      {/* 5. MAIN CONTENT */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-0"
        >
          {currentSlide.type === "visual" ? (
            // --- VISUAL SLIDE ---
            <div className="w-full h-full flex flex-col items-center justify-center text-center relative">
              {/* REAL BACKGROUND IMAGE */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src={currentSlide.data.imageSrc}
                  alt={currentSlide.data.alt}
                  fill
                  className="object-cover opacity-60" // opacity-60 darkens it so text pops
                  priority // Loads immediately
                />
                {/* Gradient Overlay to make text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/40 to-black/60"></div>
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 p-6"
              >
                <h2 className="text-4xl md:text-7xl font-black font-serif text-white mb-6 leading-none tracking-tighter drop-shadow-2xl">
                  {currentSlide.data.title}
                </h2>
                {/* Floating "Visual Scene" Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-xl">
                  <Map size={16} className="text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">
                    {currentSlide.data.description}
                  </span>
                </div>
              </motion.div>
            </div>
          ) : (
            // --- VERSE SLIDE ---
            <div
              className={`w-full h-full flex flex-col relative justify-center
              ${
                currentSlide.data.speaker === "Jehovah"
                  ? "bg-gradient-to-b from-amber-950 to-black"
                  : "bg-stone-900"
              }
            `}
            >
              {/* Background Texture */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

              <div className="relative z-10 max-w-xl mx-auto w-full px-8">
                {/* Text */}
                <p
                  className={`
                  font-serif leading-relaxed mb-6
                  ${
                    currentSlide.data.speaker === "Jehovah"
                      ? "text-3xl md:text-4xl text-amber-50 drop-shadow-lg"
                      : "text-2xl md:text-3xl text-stone-200"
                  }
                `}
                >
                  {currentSlide.data.text
                    .split(/(\*\*.*?\*\*)/)
                    .map((part, i) =>
                      part.startsWith("**") ? (
                        <span key={i} className="text-amber-400 font-bold">
                          {part.slice(2, -2)}
                        </span>
                      ) : (
                        part
                      )
                    )}
                </p>
              </div>

              {/* Huge Verse Number (Bottom Left) */}
              <div className="absolute bottom-8 left-6 z-10">
                <span className="text-[8rem] md:text-[10rem] font-black leading-none text-white/5 font-sans select-none">
                  {currentSlide.data.verse}
                </span>
              </div>

              {/* Reference Text overlaying the huge number */}
              <div className="absolute bottom-12 left-8 z-20">
                <p className="text-sm font-bold uppercase tracking-widest text-amber-500">
                  Isaiah 1
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Finish Overlay */}
      {isLastSlide && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl z-[60]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Chapter Complete
            </h2>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              <ChevronLeft size={20} /> Back to Library
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
