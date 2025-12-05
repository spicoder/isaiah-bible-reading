'use client';
import React from 'react';
import { ArrowLeft, Heart, Trash2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useFavorites } from '@/app/lib/hooks';
import { isaiahChapters } from '@/app/lib/data';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isLoaded } = useFavorites();

  const getVerseContent = (id: string) => {
    // Basic lookup for Chapter 1
    const chapterData = isaiahChapters['1']; 
    
    if (id.startsWith('verse-')) {
      const verseNum = parseInt(id.replace('verse-', ''));
      const verse = chapterData.verses.find(v => v.verse === verseNum);
      return verse ? { 
        title: `Isaiah 1:${verse.verse}`, 
        text: verse.text,
        isVisual: false 
      } : null;
    }
    
    if (id.startsWith('visual-')) {
      const verseNum = parseInt(id.replace('visual-', ''));
      const visual = chapterData.visuals.find(v => v.startVerse === verseNum);
      return visual ? { 
        title: visual.title, 
        text: visual.description, 
        isVisual: true 
      } : null;
    }
    return null;
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#FDFBF7] p-6 text-center text-stone-400">Loading...</div>;

  return (
    <main className="min-h-screen bg-[#FDFBF7] p-6">
      <header className="flex items-center justify-between mb-8 sticky top-0 bg-[#FDFBF7]/90 backdrop-blur-sm z-10 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 bg-white border border-stone-200 rounded-full text-stone-600 hover:bg-stone-100 transition-colors shadow-sm">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-serif text-2xl font-bold text-stone-900">Favorites</h1>
        </div>
      </header>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 opacity-50 text-center">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-300">
            <Heart size={40} />
          </div>
          <p className="font-serif text-2xl text-stone-600 mb-2 font-bold">No favorites yet</p>
          <p className="text-sm text-stone-400">Tap the heart icon while reading.</p>
        </div>
      ) : (
        <div className="grid gap-4 max-w-2xl mx-auto pb-20">
          {favorites.map((id) => {
            const content = getVerseContent(id);
            if (!content) return null;

            return (
              <div key={id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative overflow-hidden group">
                {/* Header Row */}
                <div className="flex justify-between items-center mb-4 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${content.isVisual ? 'bg-amber-500' : 'bg-stone-800'}`}></div>
                    <h3 className="font-bold text-stone-900 tracking-wide uppercase text-sm">
                      {content.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(id)}
                    className="text-stone-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} className="text-red-500"/>
                  </button>
                </div>

                {/* Content Body */}
                <div className="text-stone-700 font-serif leading-relaxed text-lg">
                  {content.text.replace(/\*\*/g, '')}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}