import React from 'react';

type VerseBlockProps = {
  verses: string;
  text: React.ReactNode;
  highlight?: boolean;
};

export const VerseBlock = ({ verses, text, highlight = false }: VerseBlockProps) => {
  return (
    <div className={`
      relative py-6 px-4 md:px-8 my-8
      ${highlight 
        ? 'bg-amber-50 border-y-4 border-amber-200 text-amber-900' 
        : 'bg-transparent text-stone-800'
      }
    `}>
      {/* The Verse Number Badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-200 text-stone-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
        Verses {verses}
      </div>

      {/* The Text - Large and Readable */}
      <div className="font-serif text-xl md:text-2xl leading-loose text-center max-w-2xl mx-auto">
        {text}
      </div>
    </div>
  );
};