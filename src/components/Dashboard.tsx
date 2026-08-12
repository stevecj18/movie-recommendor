import React from "react";
import { useApp } from "../context/AppContext";
import { type Movie, MOCK_MOVIES } from "../services/tmdb";
import { Clock, Sparkles, Film, Eye, Award, Star } from "lucide-react";

interface DashboardProps {
  onSelectMovie: (movie: Movie) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectMovie }) => {
  const { recentlyViewed, favorites, watchlist, getAnalytics } = useApp();
  const { favoriteGenres, moodDistribution, viewingStats, watchlistProgress } = getAnalytics();

  // Get recommendations based on favorite genre
  const getPersonalizedRecommendations = (): Movie[] => {
    if (favoriteGenres.length === 0) return MOCK_MOVIES.slice(0, 4);
    const topGenre = favoriteGenres[0].genre;
    
    // Filter movies of the top genre that are not in favorites or watchlist
    const recs = MOCK_MOVIES.filter(
      m => m.genres.includes(topGenre) && 
           !favorites.some(f => f.id === m.id) &&
           !watchlist.some(w => w.id === m.id)
    );

    return recs.length > 0 ? recs.slice(0, 4) : MOCK_MOVIES.filter(m => !favorites.some(f => f.id === m.id)).slice(0, 4);
  };

  const personalizedRecs = getPersonalizedRecommendations();
  const progressPercent = watchlistProgress.total > 0 
    ? Math.round((watchlistProgress.completed / watchlistProgress.total) * 100)
    : 45; // default fallback if empty

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 z-10 relative">
      
      {/* Dashboard Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Cinematic Analytics
          </h2>
          <p className="text-sm text-slate-400 font-light mt-1">
            Analyzing your movie preferences, watch habits, and emotional resonance profiles.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-white/5 border border-white/5 rounded-2xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cinema-purple/20 text-cinema-purple-light">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Cinephile Rank</span>
            <span className="text-sm font-bold text-white">Lumière Specialist</span>
          </div>
        </div>
      </div>

      {/* Grid: 3 columns charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Favorite Genres */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Genre Resonance</h3>
              <Film className="h-4 w-4 text-cinema-blue" />
            </div>

            <div className="space-y-4">
              {favoriteGenres.map((fg, idx) => {
                // Determine width percentages
                const maxCount = Math.max(...favoriteGenres.map(g => g.count), 1);
                const percent = Math.max((fg.count / maxCount) * 100, 10);
                
                // Color variants
                const colors = [
                  "from-cinema-purple to-cinema-purple-light",
                  "from-cinema-blue to-cinema-blue-dark",
                  "from-cinema-gold to-cinema-gold-light",
                  "from-cinema-neon-magenta to-cinema-neon-magenta/60",
                  "from-teal-500 to-emerald-400",
                ];

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">{fg.genre}</span>
                      <span className="text-slate-400">{fg.count} films</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${colors[idx % colors.length]}`} 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-4 mt-6 text-center">
            <span className="text-[11px] text-slate-500">
              Generated based on active collections and search history.
            </span>
          </div>
        </div>

        {/* Card 2: Mood Analytics (Gauges) */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Mood Analytics</h3>
            <Sparkles className="h-4 w-4 text-cinema-purple-light" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {moodDistribution.map((md, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5">
                
                {/* Circular Indicator */}
                <div className="relative flex items-center justify-center h-20 w-20 mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="32" 
                      className="stroke-white/5 fill-transparent" 
                      strokeWidth="5" 
                    />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="32" 
                      className={`fill-transparent stroke-cinema-purple-light`} 
                      strokeDasharray={`${2 * Math.PI * 32}`} 
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - md.value / 100)}`}
                      strokeWidth="5" 
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-white">{md.value}%</span>
                </div>

                <span className="text-xs font-semibold text-slate-300">{md.mood}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Viewing Stats (Line Chart) & Watchlist Progress */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-6">
          
          {/* Hour stats */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Hours Watched</h3>
              <Clock className="h-4 w-4 text-cinema-gold" />
            </div>

            {/* SVG Line Graph */}
            <div className="h-28 w-full relative">
              <svg viewBox="0 0 100 35" className="w-full h-full">
                {/* Grid lines */}
                <line x1="0" y1="10" x2="100" y2="10" className="stroke-white/5" strokeWidth="0.5" />
                <line x1="0" y1="20" x2="100" y2="20" className="stroke-white/5" strokeWidth="0.5" />
                <line x1="0" y1="30" x2="100" y2="30" className="stroke-white/5" strokeWidth="0.5" />
                
                {/* Glow path */}
                <path
                  d="M 5 28 L 27 20 L 50 25 L 72 15 L 95 8"
                  fill="none"
                  className="stroke-cinema-blue/40"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
                {/* Core path */}
                <path
                  d="M 5 28 L 27 20 L 50 25 L 72 15 L 95 8"
                  fill="none"
                  className="stroke-cinema-blue"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                <circle cx="5" cy="28" r="1.5" className="fill-cinema-void stroke-cinema-blue" strokeWidth="1" />
                <circle cx="27" cy="20" r="1.5" className="fill-cinema-void stroke-cinema-blue" strokeWidth="1" />
                <circle cx="50" cy="25" r="1.5" className="fill-cinema-void stroke-cinema-blue" strokeWidth="1" />
                <circle cx="72" cy="15" r="1.5" className="fill-cinema-void stroke-cinema-blue" strokeWidth="1" />
                <circle cx="95" cy="8" r="1.5" className="fill-cinema-void stroke-cinema-blue" strokeWidth="1" />

                {/* SVG Filter for glow effect */}
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
              </svg>

              {/* Labels */}
              <div className="flex justify-between text-[9px] text-slate-500 mt-2 px-1">
                {viewingStats.map((vs, idx) => (
                  <span key={idx}>{vs.month} ({vs.hours}h)</span>
                ))}
              </div>
            </div>
          </div>

          {/* Watchlist Progress bar */}
          <div className="border-t border-white/5 pt-4">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-slate-300">Watchlist Completion</span>
              <span className="text-cinema-blue">{watchlistProgress.completed} / {watchlistProgress.total} films ({progressPercent}%)</span>
            </div>
            
            <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-cinema-blue to-cinema-blue-dark transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Grid: Recently Viewed & Personalized Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Column 1: Recently Viewed */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-cinema-purple-light" />
            <h3 className="text-lg font-bold text-white">Recently Analyzed</h3>
          </div>

          {recentlyViewed.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recentlyViewed.slice(0, 3).map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="group rounded-2xl border border-white/5 bg-cinema-deep/40 overflow-hidden cursor-pointer hover:border-cinema-purple/40 transition-colors"
                >
                  <div className="aspect-[2/3] w-full overflow-hidden relative bg-cinema-deep">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-[10px] font-semibold text-cinema-purple-light bg-black/60 px-2 py-0.5 rounded border border-cinema-purple/30">Select Details</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-cinema-purple-light transition-colors">
                      {movie.title}
                    </h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">{movie.year} &bull; {movie.genres[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-slate-500 text-xs">
              No viewing history analyzed yet. Select a movie and view details to log history.
            </div>
          )}
        </div>

        {/* Column 2: Personalized recommendations based on stats */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-cinema-gold" />
            <h3 className="text-lg font-bold text-white">Personalized Recommendations</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {personalizedRecs.slice(0, 3).map((movie) => (
              <div
                key={movie.id}
                onClick={() => onSelectMovie(movie)}
                className="group rounded-2xl border border-white/5 bg-cinema-deep/40 overflow-hidden cursor-pointer hover:border-cinema-gold/40 transition-colors"
              >
                <div className="aspect-[2/3] w-full overflow-hidden relative bg-cinema-deep">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 flex items-center space-x-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-cinema-gold">
                    <Star className="h-2.5 w-2.5 fill-cinema-gold text-cinema-gold" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-cinema-gold-light transition-colors">
                    {movie.title}
                  </h4>
                  <p className="text-[9px] text-slate-500 mt-0.5">{movie.year} &bull; {movie.genres[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
