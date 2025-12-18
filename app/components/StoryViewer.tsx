"use client";
import { useState, useCallback, useEffect, Suspense, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Map, Heart, MessageCircle, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChapterData, Verse, VisualScene } from "@/app/lib/data";
import { useFavorites, useProgress } from "@/app/lib/hooks";

// --- Types ---
type StoryItem =
  | { type: "visual"; data: VisualScene; id: string; segmentIndex: number }
  | { type: "verse"; data: Verse; id: string; segmentIndex: number };

interface StoryViewerProps {
  chapter: ChapterData;
  nextChapterId: string | null; // Add this prop
}

const getStoryItems = (chapter: ChapterData): StoryItem[] => {
  const items: StoryItem[] = [];
  const sortedVisuals = [...chapter.visuals].sort(
    (a, b) => a.startVerse - b.startVerse
  );
  const sortedVerses = [...chapter.verses].sort((a, b) => a.verse - b.verse);

  sortedVerses.forEach((verse) => {
    // Find which segment (visual) this verse belongs to
    const segmentIndex = sortedVisuals.findLastIndex(
      (v) => v.startVerse <= verse.verse
    );
    const visual = sortedVisuals[segmentIndex];

    // If this is the start of a new segment, add the visual/outline slide first
    if (verse.verse === visual.startVerse) {
      items.push({
        type: "visual",
        data: visual,
        id: `visual-${verse.verse}`,
        segmentIndex,
      });
    }

    items.push({
      type: "verse",
      data: verse,
      id: `verse-${verse.verse}`,
      segmentIndex,
    });
  });
  return items;
};

function StoryViewerContent({
  chapter,
  nextChapterId,
}: {
  chapter: ChapterData;
  nextChapterId: string | null;
}) {
  const currentChapter = chapter.chapter;
  const slides = useMemo(() => getStoryItems(chapter), [chapter]);
  const totalSegments = chapter.visuals.length;

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

  // Segment logic: filter slides belonging to the current visual group
  const currentSegmentIndex = currentSlide.segmentIndex;
  const segmentSlides = slides.filter(
    (s) => s.segmentIndex === currentSegmentIndex
  );
  const indexInSegment = segmentSlides.indexOf(currentSlide);

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
      {/* 1. SEGMENTED PROGRESS BARS */}
      <div className="absolute top-2 left-2 right-2 z-50 flex flex-col gap-2">
        <div className="flex gap-1 h-1">
          {segmentSlides.map((_, idx) => (
            <div
              key={idx}
              className="flex-1 h-full rounded-full bg-white/20 overflow-hidden"
            >
              {idx === indexInSegment ? (
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
                    idx < indexInSegment ? "w-full" : "w-0"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Segment Breadcrumb */}
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: totalSegments }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentSegmentIndex
                  ? "w-4 bg-amber-500"
                  : "w-1 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. HEADER */}
      <div className="absolute top-10 left-4 right-4 z-40 flex justify-between items-start">
        <div className="flex items-center gap-3">
          {currentSlide.type === "verse" ? (
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className="font-bold text-sm tracking-wide">
                {currentSlide.data.speaker}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-500 text-black px-3 py-1.5 rounded-full shadow-lg">
              <Map size={14} />
              <span className="font-bold text-xs uppercase tracking-tighter">
                Part {currentSegmentIndex + 1} of {totalSegments}
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
              const ref = encodeURIComponent(
                `Isaias ${currentChapter}:${currentSlide.data.verse}`
              );
              const returnTo = encodeURIComponent(
                `/Isaias/${currentChapter}?slide=${currentIndex}`
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
        />
        <div
          className="w-[70%] h-full"
          onClick={handleNext}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>
              </div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 p-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-xl">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    {currentSlide.data.description}
                  </span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black font-serif text-white mb-6 leading-tight tracking-tighter drop-shadow-2xl">
                  {currentSlide.data.title}
                </h2>
                <div className="flex items-center justify-center gap-2 text-stone-400">
                  <Layers size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Section {currentSegmentIndex + 1}
                  </span>
                </div>
              </motion.div>
            </div>
          ) : (
            <div
              className={`w-full h-full flex flex-col relative justify-center transition-colors duration-700
              ${
                currentSlide.data.speaker === "Jehova"
                  ? "bg-gradient-to-b from-yellow-500/80 to-black"
                  : "bg-stone-900"
              }
            `}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:16px_16px]"></div>
              <div className="relative z-10 max-w-xl mx-auto w-full px-8">
                <p
                  className={`font-serif leading-relaxed mb-6 ${
                    currentSlide.data.speaker === "Jehova"
                      ? "text-2xl md:text-4xl text-amber-50 drop-shadow-lg"
                      : "text-2xl md:text-3xl text-stone-200"
                  }`}
                >
                  {currentSlide.data.text}
                </p>
              </div>
              <div className="absolute bottom-12 left-8 z-20">
                <p className="font-bold uppercase tracking-widest text-amber-500/80 text-xs">
                  Isaias {currentChapter}:{currentSlide.data.verse}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Finish Overlay */}
      {isLastSlide && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-2xl z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center p-8">
            <h2 className="text-4xl font-serif font-bold mb-2">
              Chapter Complete
            </h2>
            <p className="text-stone-400 mb-8 max-w-xs mx-auto">
              You've finished reading the visions for Chapter {currentChapter}.
            </p>

            <div className="flex flex-col gap-4 items-center">
              {/* Show Next Chapter button if it exists */}
              {nextChapterId && (
                <Link
                  href={`/isaiah/${nextChapterId}`}
                  className="inline-flex items-center gap-2 bg-amber-500 text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Next Chapter
                </Link>
              )}

              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/20 transition-colors"
              >
                Library
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StoryViewer({
  chapter,
  nextChapterId,
}: {
  chapter: ChapterData;
  nextChapterId: string | null;
}) {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <StoryViewerContent chapter={chapter} nextChapterId={nextChapterId} />
    </Suspense>
  );
}
