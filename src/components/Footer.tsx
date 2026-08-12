import React from "react";
import { Sparkles, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-cinema-void/90 py-8 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-cinema-purple to-cinema-blue text-white shadow-md shadow-cinema-purple/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-md font-bold tracking-tight text-transparent">
                CinemaConcierge
              </span>
            </div>
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Cinema Concierge. Curated with precision.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
            <a href="#" className="transition-colors hover:text-cinema-blue">Discover</a>
            <a href="#" className="transition-colors hover:text-cinema-blue">Mood Engine</a>
            <a href="#" className="transition-colors hover:text-cinema-blue">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-cinema-blue">Terms of Service</a>
          </div>

          {/* API Attributions */}
          <div className="flex flex-col items-center gap-1 md:items-end">
            <div className="flex items-center space-x-1 text-[11px] text-slate-500">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-cinema-neon-magenta fill-cinema-neon-magenta animate-pulse" />
              <span>for film enthusiasts.</span>
            </div>
            <span className="text-[10px] text-slate-600 text-center md:text-right max-w-[240px]">
              This product uses the TMDb API but is not endorsed or certified by TMDb.
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};
