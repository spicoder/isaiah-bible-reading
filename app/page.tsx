import Link from "next/link";
import { Sparkles, Play, Heart, Bookmark } from "lucide-react";
import { isaiahChapters } from "@/app/lib/data";

export default function Home() {
  const chapters = Object.entries(isaiahChapters);

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

      {/* Hero / Featured */}
      <section className="px-4 mb-8">
        <div className="bg-stone-900 rounded-4xl p-8 text-white relative overflow-hidden min-h-[300px] flex flex-col justify-end shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          <div className="absolute top-0 right-0 p-12 bg-amber-500 blur-[80px] rounded-full opacity-20"></div>

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
              href="/isaiah/1"
              className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 hover:scale-105 transition-transform w-fit"
            >
              <Play size={14} fill="currentColor" /> Start Reading
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
          {chapters.map(([id, chapter]) => (
            <Link key={id} href={`/isaiah/${id}`} className="group">
              <div className="aspect-3/4 bg-white rounded-3xl border-2 border-stone-100 p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-amber-400 hover:shadow-lg">
                <div className="mt-auto">
                  <h4 className="font-serif text-xl font-bold text-stone-800 leading-tight group-hover:text-amber-600 transition-colors">
                    Chapter {chapter.chapter}
                  </h4>
                </div>
              </div>
            </Link>
          ))}

          {/* Placeholder for Chapter 2 */}
          <div className="aspect-3/4 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200 flex items-center justify-center">
            <span className="text-stone-300 font-bold text-xs uppercase tracking-widest">
              Coming Soon
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
