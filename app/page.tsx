import Link from 'next/link';
import { BookOpen, Star, ArrowRight, Sparkles, Map } from 'lucide-react';
import { isaiahChapters } from '@/app/lib/data';

export default function Home() {
  // Convert object to array for mapping
  const chapters = Object.entries(isaiahChapters);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-amber-200 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 text-center">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-stone-200 mb-6 md:mb-8 animate-bounce-slow">
          <Sparkles size={14} className="text-amber-500" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-500 font-sans">
            Visual Bible Experience
          </span>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-9xl font-black font-serif text-stone-800 mb-4 tracking-tight drop-shadow-sm leading-none">
          ISAIAH
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-stone-500 font-sans font-medium max-w-xl mx-auto leading-relaxed mb-10">
          The Great Prophet's story, reimagined as an interactive visual journey.
        </p>

        {/* Decorative Divider */}
        <div className="flex justify-center gap-2 opacity-20">
          <div className="w-2 h-2 rounded-full bg-stone-400"></div>
          <div className="w-2 h-2 rounded-full bg-stone-400"></div>
          <div className="w-2 h-2 rounded-full bg-stone-400"></div>
        </div>
      </section>

      {/* --- CHAPTERS GRID --- */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
        
        {/* Grid Header */}
        <div className="flex items-center gap-3 mb-8 md:mb-12 px-2">
          <div className="bg-stone-900 text-white p-2 rounded-lg">
            <Map size={20} />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-800">
            Select a Chapter
          </h2>
        </div>

        {chapters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {chapters.map(([id, chapter]) => (
              <Link 
                key={id} 
                href={`/isaiah/${id}`}
                className="group relative block"
              >
                {/* CARD */}
                <article className="h-full bg-white rounded-[2rem] p-6 md:p-8 border-4 border-stone-100 hover:border-amber-200 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col">
                  
                  {/* Top Row: Number & Star */}
                  <div className="flex justify-between items-start mb-6">
                    {/* Chapter Number Box */}
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-stone-50 text-stone-300 group-hover:bg-amber-100 group-hover:text-amber-600 border-2 border-stone-100 group-hover:border-amber-200 flex items-center justify-center font-black text-2xl md:text-3xl font-serif transition-colors duration-300">
                      {chapter.chapter}
                    </div>
                    
                    {/* "Play" Icon */}
                    <div className="bg-stone-100 group-hover:bg-amber-500 text-stone-400 group-hover:text-white p-3 rounded-full transition-colors duration-300">
                      <BookOpen size={18} />
                    </div>
                  </div>

                  {/* Title Area */}
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold font-serif text-stone-800 mb-2 leading-tight group-hover:text-amber-800 transition-colors">
                      {chapter.visuals[0]?.title || `Chapter ${chapter.chapter}`}
                    </h3>
                    <p className="text-stone-400 text-xs md:text-sm font-sans font-semibold line-clamp-2">
                      {chapter.visuals[0]?.description || "Read the scripture..."}
                    </p>
                  </div>

                  {/* Visual Previews (Pills) */}
                  <div className="mt-auto">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-300 mb-3">
                      Visual Scenes Inside:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {chapter.visuals.slice(0, 3).map((visual, i) => (
                        <span key={i} className="px-3 py-1.5 bg-stone-50 rounded-lg text-[10px] md:text-xs font-bold text-stone-500 border border-stone-100">
                          {visual.title.split(' ').slice(0, 2).join(' ')}...
                        </span>
                      ))}
                      {chapter.visuals.length > 3 && (
                        <span className="px-2 py-1 text-stone-300 text-xs font-bold">+</span>
                      )}
                    </div>
                  </div>

                  {/* Button Lookalike */}
                  <div className="mt-8 w-full py-3 rounded-xl bg-stone-50 group-hover:bg-amber-500 group-hover:text-white text-stone-400 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300">
                    Start <ArrowRight size={16} />
                  </div>

                </article>
              </Link>
            ))}

            {/* COMING SOON PLACEHOLDER */}
            <div className="bg-transparent rounded-[2rem] p-8 border-4 border-dashed border-stone-200 flex flex-col items-center justify-center text-center opacity-50 min-h-[300px]">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-300">
                <Star size={24} />
              </div>
              <h3 className="font-serif font-bold text-stone-400 text-xl mb-1">Chapter 2</h3>
              <p className="text-stone-400 text-sm font-sans">Coming Soon</p>
            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-stone-100 rounded-3xl">
            <p className="text-stone-500 font-serif italic">No chapters loaded.</p>
          </div>
        )}
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center px-6">
        <p className="text-stone-400 text-sm font-sans font-medium">
          Created for a new generation of readers.
        </p>
      </footer>

    </main>
  );
}