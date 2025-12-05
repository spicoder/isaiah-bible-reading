import React from 'react';
import { LucideIcon } from 'lucide-react';

type StorySceneProps = {
  icon: LucideIcon;
  color: string; // e.g., "bg-red-900"
  caption: string;
  subcaption?: string;
};

export const StoryScene = ({ icon: Icon, color, caption, subcaption }: StorySceneProps) => {
  return (
    <div className={`w-full aspect-video md:aspect-2/1 ${color} rounded-3xl my-12 flex flex-col items-center justify-center text-white relative overflow-hidden shadow-xl border-4 border-white/20`}>
      {/* Background Decorative Circle */}
      <div className="absolute bg-white/10 w-96 h-96 rounded-full blur-3xl -top-10 -left-10 pointer-events-none"></div>
      
      <Icon size={120} className="mb-6 drop-shadow-2xl relative z-10 opacity-90" />
      
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h3 className="text-3xl md:text-4xl font-black font-serif tracking-tight mb-2 text-white drop-shadow-md">
          {caption}
        </h3>
        {subcaption && (
          <p className="text-lg font-medium opacity-90 font-sans tracking-widest uppercase">
            {subcaption}
          </p>
        )}
      </div>
    </div>
  );
};