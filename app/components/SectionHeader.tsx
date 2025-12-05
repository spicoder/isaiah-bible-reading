import { LucideIcon } from 'lucide-react';

export const SectionHeader = ({ number, title, icon: Icon }: { number: string, title: string, icon: LucideIcon }) => (
  <div className="flex items-center gap-4 mb-8 border-b-2 border-stone-800 pb-4 mt-16">
    <div className="bg-stone-900 text-stone-100 font-bold w-12 h-12 flex items-center justify-center rounded-full text-xl shrink-0">
      {number}
    </div>
    <div className="flex items-center gap-3">
      <Icon className="w-6 h-6 text-red-700 shrink-0" />
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight">{title}</h2>
    </div>
  </div>
);