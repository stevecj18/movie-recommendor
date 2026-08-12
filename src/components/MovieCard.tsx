import React, { useState } from "react";
import type { Movie } from "../services/tmdb";
import { useApp } from "../context/AppContext";
import { Heart, Bookmark, Share2, Play, Sparkles, Star, Clock, ChevronDown, ChevronUp } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect }) => {
  const { favorites, watchlist, addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } = useApp();
  const [showAIReason, setShowAIReason] = useState(false);
  const [copied, setCopied] = useState(false);

  const isFavorite = favorites.some(f => f.id === movie.id);
  const isWatchlist = watchlist.some(w => w.id === movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Cinema Concierge suggests "${movie.title}" (${movie.year}) directed by ${movie.director}. Check it out!`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={() => onSelect(movie)}
      className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer relative group"
    >
      
      {/* Poster Image Area */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-cinema-deep">
        
        {/* Hover zoom poster */}
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Backdrop Dark Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-void via-transparent to-transparent z-[1]" />

        {/* Top Badges (Rating & Runtime) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center space-x-1 rounded-lg bg-black/60 border border-cinema-gold/30 px-2.5 py-1 text-xs font-bold text-cinema-gold shadow-md backdrop-blur-md">
            <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold" />
            <span>{movie.rating}</span>
          </div>

          <div className="flex items-center space-x-1 rounded-lg bg-black/60 border border-white/10 px-2.5 py-1 text-xs font-semibold text-slate-300 shadow-md backdrop-blur-md">
            <Clock className="h-3 w-3 text-slate-400" />
            <span>{movie.runtime}m</span>
          </div>
        </div>

        {/* Action Button Overlays */}
        <div className="absolute bottom-3 right-3 flex flex-col space-y-2 z-10">
          
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={`flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md transition-all shadow-md active:scale-90 ${
              isFavorite
                ? "bg-cinema-neon-magenta text-white border border-cinema-neon-magenta"
                : "bg-black/60 text-slate-300 border border-white/10 hover:text-cinema-neon-magenta hover:bg-black/80"
            }`}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Heart className={`h-4.5 w-4.5 ${isFavorite ? "fill-white" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleWatchlistClick}
            className={`flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md transition-all shadow-md active:scale-90 ${
              isWatchlist
                ? "bg-cinema-blue text-cinema-void border border-cinema-blue"
                : "bg-black/60 text-slate-300 border border-white/10 hover:text-cinema-blue hover:bg-black/80"
            }`}
            title={isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            <Bookmark className={`h-4.5 w-4.5 ${isWatchlist ? "fill-cinema-void" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleShareClick}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-black/60 text-slate-300 border border-white/10 backdrop-blur-md transition-all hover:bg-black/80 hover:text-white shadow-md active:scale-90"
            title="Copy Recommendation Link"
          >
            {copied ? (
              <span className="absolute right-10 top-1 text-[10px] font-bold bg-cinema-blue text-cinema-void py-1 px-2 rounded-lg whitespace-nowrap shadow-md">
                Copied!
              </span>
            ) : null}
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Play Trailer Floating Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cinema-purple/90 border border-cinema-purple-light text-white shadow-lg shadow-cinema-purple/30 backdrop-blur-sm pointer-events-auto transform scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-cinema-purple hover:scale-105 active:scale-95">
            <Play className="h-6 w-6 fill-white ml-1" />
          </div>
        </div>

      </div>

      {/* Info / Title Text */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            {movie.genres.slice(0, 2).map((g, idx) => (
              <span 
                key={idx}
                className="text-[10px] font-semibold tracking-wider text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md uppercase"
              >
                {g}
              </span>
            ))}
          </div>

          <h3 className="text-md font-bold text-white tracking-tight group-hover:text-cinema-blue transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{movie.year} &bull; Dir: {movie.director}</p>
        </div>

        {/* Overview text */}
        <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
          {movie.overview}
        </p>

        {/* Explaining Section (Accordion Button) */}
        {movie.aiExplanation && (
          <div className="mt-4 border-t border-white/5 pt-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowAIReason(!showAIReason);
              }}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center space-x-1.5 text-cinema-purple-light text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 fill-cinema-purple-light animate-pulse" />
                <span className="uppercase tracking-wider">AI Curator Verdict</span>
              </div>
              {showAIReason ? <ChevronUp className="h-4.5 w-4.5 text-cinema-purple-light" /> : <ChevronDown className="h-4.5 w-4.5 text-slate-500" />}
            </button>

            {showAIReason && (
              <div className="mt-2 rounded-xl bg-cinema-purple/10 border border-cinema-purple/20 p-2.5 text-[11px] text-slate-300 leading-relaxed animate-slide-down">
                {movie.aiExplanation}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
