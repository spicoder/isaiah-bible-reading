import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ScarletSnowVisual = () => (
  <div className="bg-linear-to-br from-red-900 to-red-600 rounded-2xl p-1 shadow-xl mb-10 my-8">
    <div className="bg-white rounded-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 opacity-50 skew-x-12 transform origin-bottom-left"></div>
      <div className="grid md:grid-cols-2">
        <div className="p-8 bg-red-50 flex flex-col justify-center items-center text-center border-r border-red-100">
           <div className="text-red-900 font-black text-4xl mb-2">SCARLET</div>
           <div className="text-red-400 font-serif italic">Your Sins</div>
        </div>
        <div className="p-8 bg-white flex flex-col justify-center items-center text-center">
           <div className="text-stone-900 font-black text-4xl mb-2">SNOW</div>
           <div className="text-stone-400 font-serif italic">My Forgiveness</div>
        </div>
      </div>
    </div>
  </div>
);

export const SmeltingVisual = () => (
    <div className="flex flex-col md:flex-row gap-6 mb-8 my-8">
    <div className="flex-1">
       <h4 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
          <ArrowRight size={16} /> The Process
       </h4>
       <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-orange-500 w-2/3"></div>
       </div>
       <div className="flex justify-between text-xs font-mono text-stone-500">
          <span>Judgment (Lye)</span>
          <span>Restoration (Silver)</span>
       </div>
    </div>
    <div className="flex-1 bg-stone-100 p-5 rounded-lg">
       <h4 className="font-bold text-stone-900 mb-2">The Outcome</h4>
       <ul className="text-sm space-y-2 text-stone-700">
          <li>• Judges & Advisers restored</li>
          <li>• Zion redeemed with justice</li>
       </ul>
    </div>
 </div>
);