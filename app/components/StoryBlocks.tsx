'use client';
import React from 'react';
import { Sparkles, Feather, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

// --- HELPER ---
const formatText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={index} className="font-black text-amber-700/80">{part.slice(2, -2)}</span>;
    }
    return <span key={index}>{part}</span>;
  });
};

// --- 1. VISUAL SCENE ---
export const VisualScene = ({ title, description, placeholder }: { title: string, description: string, placeholder: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="my-12 md:my-24 px-2 md:px-4"
    >
      {/* Removed rotation on mobile to save horizontal space */}
      <div className="max-w-4xl mx-auto bg-white p-2 md:p-4 rounded-[1.5rem] md:rounded-[2rem] shadow-xl md:rotate-1 md:hover:rotate-0 transition-transform duration-500 border-4 border-stone-100">
        <div className="aspect-video bg-stone-800 rounded-xl md:rounded-3xl overflow-hidden relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
           <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="text-4xl md:text-6xl mb-4 grayscale opacity-80">🎨</div>
              <p className="font-serif italic text-sm md:text-lg text-stone-400 max-w-lg leading-relaxed">
                "{placeholder}"
              </p>
           </div>
           
           <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-20 text-white">
             <h4 className="font-bold font-serif text-xl md:text-3xl mb-1 leading-tight">{title}</h4>
             <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-amber-400">{description}</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 2. STORY BUBBLES ---
export const StoryText = ({ verse, speaker, text }: { verse: number, speaker: string, text: string }) => {
  const isJehovah = speaker === 'Jehovah';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      className={`flex w-full mb-8 md:mb-10 ${isJehovah ? 'justify-center' : 'justify-start'}`}
    >
      <div className={`
        relative w-full
        /* Mobile: Full width / Desktop: Max width */
        ${isJehovah ? 'mx-0 md:mx-4 max-w-2xl' : 'mr-0 ml-0 md:mr-12 md:ml-2 md:max-w-2xl'}
      `}>
        
        {/* AVATAR */}
        {/* Mobile: Smaller (w-10), closer to top (-top-4) */}
        <div className={`
          absolute -top-4 md:-top-5 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-4 border-[#FDFBF7] flex items-center justify-center shadow-lg z-20
          ${isJehovah 
            ? 'left-1/2 -translate-x-1/2 bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-orange-200' 
            : 'left-0 md:-left-6 bg-white text-stone-600 shadow-stone-200 translate-x-2 md:translate-x-0' 
          }
        `}>
          {isJehovah ? <Sparkles className="w-5 h-5 md:w-6 md:h-6" fill="white" /> : <Feather className="w-5 h-5 md:w-6 md:h-6" />}
        </div>

        {/* CARD BODY */}
        {/* Mobile: Less padding (p-5), smaller fonts */}
        <div className={`
          p-5 pt-8 md:p-8 rounded-[1.5rem] md:rounded-[2rem] relative transition-all duration-300
          ${isJehovah 
            ? 'bg-gradient-to-b from-amber-50 to-white border border-amber-100 shadow-lg text-center mx-2' 
            : 'bg-white border-2 border-stone-100 shadow-sm rounded-tl-none ml-4 md:ml-0' // Added left margin on mobile so avatar doesn't overhang
          }
        `}>
          
          {/* Decorative Quote - Hidden on mobile to save space */}
          {!isJehovah && (
            <Quote className="absolute top-4 left-4 text-stone-100 -scale-x-100 hidden md:block" size={48} />
          )}

          {/* Speaker Name */}
          <div className={`
            inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2 md:mb-4
            ${isJehovah ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-400'}
          `}>
            {speaker}
          </div>

          {/* TEXT CONTENT */}
          <p className={`
            leading-relaxed relative z-10
            ${isJehovah 
              ? 'font-serif text-lg md:text-3xl text-stone-900 font-medium' // Reduced to text-lg on mobile
              : 'font-sans text-base md:text-xl text-stone-600 font-semibold' // Reduced to text-base on mobile
            }
          `}>
            {formatText(text)}
          </p>

          {/* Verse Number Badge */}
          <div className={`
            absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-bold border-4 border-[#FDFBF7]
            ${isJehovah ? 'bg-amber-200 text-amber-800' : 'bg-stone-200 text-stone-500'}
          `}>
            {verse}
          </div>

        </div>
      </div>
    </motion.div>
  );
};