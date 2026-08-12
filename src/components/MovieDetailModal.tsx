import React, { useEffect, useState } from "react";
import { type Movie, TMDBService } from "../services/tmdb";
import { useApp } from "../context/AppContext";
import { X, Heart, Bookmark, Star, Clock, User, Film } from "lucide-react";

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ movie, onClose, onSelectMovie }) => {
  const { favorites, watchlist, addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } = useApp();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  const isFavorite = favorites.some(f => f.id === movie.id);
  const isWatchlist = watchlist.some(w => w.id === movie.id);

  // Fetch similar movies
  useEffect(() => {
    let active = true;
    const fetchSimilar = async () => {
      setLoadingSimilar(true);
      try {
        const results = await TMDBService.getSimilarMovies(movie.id);
        if (active) {
          setSimilarMovies(results);
        }
      } catch (e) {
        console.error("Failed to load similar movies", e);
      } finally {
        if (active) setLoadingSimilar(false);
      }
    };
    fetchSimilar();
    return () => {
      active = false;
    };
  }, [movie.id]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleWatchlistToggle = () => {
    if (isWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-cinema-deep shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-white/10 text-slate-300 hover:text-white transition-colors backdrop-blur-sm"
          title="Close Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video Trailer / Header Banner */}
        <div className="relative aspect-video w-full bg-black">
          {movie.trailerUrl ? (
            <iframe
              src={movie.trailerUrl}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-none"
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={movie.backdropUrl}
                alt={movie.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-deep via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cinema-purple/80 text-white mb-3">
                  <Film className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-bold text-white">Trailer Unavailable</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md">No trailer was found for this movie. Enjoy the detailed description and cast details below.</p>
              </div>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="p-6 md:p-8 space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            
            {/* Title & Metadata */}
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {movie.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-slate-400">
                <span className="font-semibold text-white">{movie.year}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                
                <div className="flex items-center space-x-1 font-semibold text-cinema-gold">
                  <Star className="h-3.5 w-3.5 fill-cinema-gold text-cinema-gold" />
                  <span>{movie.rating}</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />

                <div className="flex items-center space-x-1 font-semibold text-slate-300">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{movie.runtime} mins</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />

                <span className="font-semibold text-slate-300">Dir: {movie.director}</span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {movie.genres.map((g, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold tracking-wider text-cinema-blue bg-cinema-blue/10 border border-cinema-blue/20 px-2.5 py-0.5 rounded-md uppercase"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                onClick={handleFavoriteToggle}
                className={`flex-1 md:flex-none flex items-center justify-center space-x-2 rounded-xl px-4 py-2.5 text-sm font-semibold border transition-all active:scale-95 ${
                  isFavorite
                    ? "bg-cinema-neon-magenta text-white border-cinema-neon-magenta shadow-md shadow-cinema-neon-magenta/25"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Heart className={`h-4.5 w-4.5 ${isFavorite ? "fill-white" : ""}`} />
                <span>{isFavorite ? "Favorited" : "Favorite"}</span>
              </button>

              <button
                onClick={handleWatchlistToggle}
                className={`flex-1 md:flex-none flex items-center justify-center space-x-2 rounded-xl px-4 py-2.5 text-sm font-semibold border transition-all active:scale-95 ${
                  isWatchlist
                    ? "bg-cinema-blue text-cinema-void border-cinema-blue shadow-md shadow-cinema-blue/25"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Bookmark className={`h-4.5 w-4.5 ${isWatchlist ? "fill-cinema-void" : ""}`} />
                <span>{isWatchlist ? "Watchlisted" : "Watchlist"}</span>
              </button>
            </div>

          </div>

          {/* Overview */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Overview</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              {movie.overview}
            </p>
          </div>

          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Starring</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {movie.cast.map((actor, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 rounded-xl bg-white/5 border border-white/5 p-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cinema-purple/20 text-cinema-purple-light">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200 truncate">{actor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Recommendations */}
          <div className="border-t border-white/5 pt-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">You May Also Appreciate</h3>
            
            {loadingSimilar ? (
              <div className="flex justify-center py-6">
                <span className="text-xs text-slate-500 animate-pulse">Scanning similar narratives...</span>
              </div>
            ) : similarMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {similarMovies.map((sm) => (
                  <div
                    key={sm.id}
                    onClick={() => onSelectMovie(sm)}
                    className="group flex flex-col rounded-xl overflow-hidden bg-cinema-void/40 border border-white/5 cursor-pointer hover:border-cinema-blue/40 transition-colors"
                  >
                    <div className="aspect-[2/3] w-full overflow-hidden bg-cinema-deep relative">
                      <img
                        src={sm.posterUrl}
                        alt={sm.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 flex items-center space-x-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-cinema-gold">
                        <Star className="h-2.5 w-2.5 fill-cinema-gold text-cinema-gold" />
                        <span>{sm.rating}</span>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-cinema-blue transition-colors">
                        {sm.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{sm.year} &bull; {sm.genres[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 text-center py-4">No similar movies found.</div>
            )}
          </div>

        </div>
      </div>

      {/* Backdrop Click Dismiss */}
      <div className="absolute inset-0 bg-transparent cursor-pointer pointer-events-auto" onClick={onClose} />

    </div>
  );
};
