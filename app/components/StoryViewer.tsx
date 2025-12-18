"use client";
import { useState, useCallback, useEffect, Suspense } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, X, Map, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChapterData, Verse, VisualScene } from "@/app/lib/data";
import { useFavorites, useProgress } from "@/app/lib/hooks";

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

function StoryViewerContent({ chapter }: { chapter: ChapterData }) {
  const currentChapter = chapter.chapter;
  const slides = getStoryItems(chapter);

  // Upgrade: Initialize slide from URL parameter to support returning from Gems page
  const searchParams = useSearchParams();
  const initialSlide = parseInt(searchParams.get("slide") || "0");

  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { markAsCompleted } = useProgress();

  const currentSlide = slides[currentIndex];
  const isLastSlide = currentIndex === slides.length - 1;

  // Upgrade: Mark chapter as completed when the user reaches the last slide
  useEffect(() => {
    if (isLastSlide) {
      markAsCompleted(String(currentChapter));
    }
  }, [isLastSlide, currentChapter, markAsCompleted]);

  // --- Navigation ---
  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, slides.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === " ") setIsPaused((p) => !p);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const variants: Variants = {
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
      {/* 1. PROGRESS BARS */}
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
                animate={{ width: isPaused ? "0%" : "100%" }}
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

      {/* 2. HEADER */}
      <div className="absolute top-6 left-4 right-4 z-40 flex justify-between items-start">
        <div className="flex items-center gap-3">
          {currentSlide.type === "verse" ? (
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className="font-bold text-sm tracking-wide">
                {currentSlide.data.speaker}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-500/90 text-black px-3 py-1.5 rounded-full">
              <Map size={14} />
              <span className="font-bold text-sm tracking-wide">Outline</span>
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

      {/* 3. INTERACTIONS */}
      {currentSlide.type === "verse" && (
        <div className="absolute right-4 bottom-10 z-50 flex flex-col gap-6 items-center">
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

          <button
            onClick={(e) => {
              e.stopPropagation();
              // Upgrade: Send current slide index in returnUrl
              const ref = encodeURIComponent(
                `Isaiah ${currentChapter}:${currentSlide.data.verse}`
              );
              const returnTo = encodeURIComponent(
                `/isaiah/${currentChapter}?slide=${currentIndex}`
              );
              router.push(`/spiritual-gems?ref=${ref}&returnTo=${returnTo}`);
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

      {/* 4. TAP ZONES */}
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
            <div className="w-full h-full flex flex-col items-center justify-center text-center relative">
              <div className="absolute inset-0">
                <Image
                  src={currentSlide.data.imageSrc}
                  alt={currentSlide.data.alt}
                  fill
                  className="object-cover opacity-60"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/60"></div>
              </div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 p-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-xl">
                  <Map size={16} className="text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">
                    {currentSlide.data.description}
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black font-serif text-white mb-6 leading-none tracking-tighter drop-shadow-2xl">
                  {currentSlide.data.title}
                </h2>
              </motion.div>
            </div>
          ) : (
            <div
              className={`w-full h-full flex flex-col relative justify-center transition-colors duration-700
              ${
                currentSlide.data.speaker === "Jehovah"
                  ? "bg-linear-180 from-yellow-400 to-black"
                  : currentSlide.data.speaker === "Narrator"
                  ? "bg-linear-to-b from-stone-800 to-stone-950 border-t-8 border-amber-900/20"
                  : "bg-stone-900"
              }
            `}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]"></div>
              <div className="relative z-10 max-w-xl mx-auto w-full px-8">
                <p
                  className={`font-serif leading-relaxed mb-6 ${
                    currentSlide.data.speaker === "Jehovah"
                      ? "text-2xl md:text-4xl text-amber-50 drop-shadow-lg"
                      : "text-2xl md:text-3xl text-stone-200"
                  }`}
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
              <div className="absolute bottom-12 left-8 z-20">
                <p className="font-bold uppercase tracking-widest text-amber-500">
                  Isaiah {currentChapter}:{currentSlide.data.verse}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Finish Overlay */}
      {isLastSlide && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl z-60"
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

export default function StoryViewer({ chapter }: { chapter: ChapterData }) {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <StoryViewerContent chapter={chapter} />
    </Suspense>
  );
}
