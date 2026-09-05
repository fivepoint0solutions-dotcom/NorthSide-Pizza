import React from "react";
import { Sparkles, IceCream } from "lucide-react";

export const DinerTreatsBoard: React.FC = () => {
  return (
    <div className="my-16 px-4 max-w-6xl mx-auto">
      <div className="bg-diner-dark text-white rounded-3xl border-4 border-diner-dark p-6 sm:p-10 relative overflow-hidden shadow-retro-lg">
        {/* Retro Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2 text-diner-mustard font-bold text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" /> Dairy King Frozen Fountain
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              ICE CREAM & HAND-SPUN SHAKES
            </h2>
          </div>
          <div className="inline-block bg-diner-red text-white font-black text-xs uppercase px-4 py-2 rounded-xl border border-white/20 self-start sm:self-auto">
            Available In-Store Only
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-display text-lg text-diner-mustard mb-2 flex items-center gap-2">
              <IceCream className="w-4 h-4" /> 20+ Hard Ice Cream Tub Flavors
            </h3>
            <p className="text-xs text-white/70 leading-relaxed mb-3">
              Served in fresh waffle cones, regular cones, or pint containers to take home.
            </p>
            <span className="text-[11px] font-bold text-white/50 block">Flavors rotate weekly</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-display text-lg text-diner-mustard mb-2">
              Custom Flurries & Mix-ins
            </h3>
            <p className="text-xs text-white/70 leading-relaxed mb-3">
              Loaded with crushed Oreo, M&M, Coffee Crisp, Reese’s Pieces, Skor, or Smarties.
            </p>
            <span className="text-[11px] font-bold text-diner-mustard">From $7.50</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-display text-lg text-diner-mustard mb-2">Old-School Milkshakes</h3>
            <p className="text-xs text-white/70 leading-relaxed mb-3">
              16+ syrup flavors including Root Beer, Butterscotch, Raspberry, Peach, and Creme De
              Menthe.
            </p>
            <span className="text-[11px] font-bold text-diner-mustard">
              Small $6.99 • Large $7.99
            </span>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-xs font-semibold text-white/60">
            Stop by our counter at <strong className="text-white">5204 51 Ave</strong> to build your
            custom cup, sundae, or milkshake!
          </p>
        </div>
      </div>
    </div>
  );
};
