import React from 'react';
import { notFound } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { isaiahChapters } from '@/app/lib/data';
import { StoryText, VisualScene } from '@/app/components/StoryBlocks';
import { ProgressBar } from '@/app/components/ProgressBar';

export async function generateStaticParams() {
  return Object.keys(isaiahChapters).map((id) => ({ id }));
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapter = isaiahChapters[id];

  if (!chapter) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] overflow-x-hidden selection:bg-amber-200">
      
      <ProgressBar />

      {/* --- HERO SECTION --- */}
      {/* Mobile: Reduced padding (pt-24 pb-12) */}
      <header className="relative pt-24 pb-12 md:pt-32 md:pb-32 px-4 md:px-6 text-center">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Chapter Badge */}
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white shadow-xl border-4 border-stone-50 mb-6 md:mb-8 transform -rotate-6">
           <span className="font-black text-2xl md:text-4xl text-amber-500 font-serif">{chapter.chapter}</span>
        </div>

        {/* Title - Responsive Text Size */}
        <h1 className="text-5xl md:text-8xl font-black font-serif text-stone-900 mb-4 md:mb-6 tracking-tight drop-shadow-sm relative z-10 leading-none">
          {chapter.book}
        </h1>
        
        {/* Subtitle */}
        <div className="inline-block bg-stone-900 text-white px-4 py-2 md:px-6 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest shadow-lg transform rotate-2 max-w-[90vw] truncate">
          {chapter.visuals[0].title}
        </div>
      </header>

      {/* --- STORY CONTAINER --- */}
      <div className="max-w-4xl mx-auto px-2 md:px-4 pb-32 relative z-10">
        
        {/* Timeline line - Hidden on mobile, visible on desktop */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-stone-200 -translate-x-1/2 rounded-full -z-10 hidden md:block"></div>

        {chapter.verses.map((verseItem) => {
          const scene = chapter.visuals.find(v => v.startVerse === verseItem.verse);

          return (
            <React.Fragment key={verseItem.verse}>
              
              {scene && (
                <VisualScene 
                  title={scene.title} 
                  description={scene.description} 
                  placeholder={scene.imagePlaceholder} 
                />
              )}

              <StoryText 
                verse={verseItem.verse}
                speaker={verseItem.speaker}
                text={verseItem.text}
              />

            </React.Fragment>
          );
        })}

      </div>

      <div className="flex flex-col items-center justify-center pb-24 opacity-60">
        <BookOpen className="text-amber-500 mb-4 animate-bounce" size={24} />
        <p className="font-serif italic text-stone-400 font-medium text-sm">Chapter Complete!</p>
      </div>

    </main>
  );
}