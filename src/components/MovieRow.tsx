import React, { useEffect, useState } from "react";
import { type Movie, TMDBService } from "../services/tmdb";
import { MovieCard } from "./MovieCard";
import { ChevronRight } from "lucide-react";

interface MovieRowProps {
  title: string;
  category: string;
  onSelectMovie: (movie: Movie) => void;
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, category, onSelectMovie }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchCategory = async () => {
      setLoading(false);
      setLoading(true);
      try {
        const results = await TMDBService.getCategoryMovies(category);
        if (active) {
          setMovies(results);
        }
      } catch (e) {
        console.error(`Failed to fetch category ${category}`, e);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchCategory();
    return () => {
      active = false;
    };
  }, [category, TMDBService.getApiKey()]); // Refetch if API key changes

  if (!loading && movies.length === 0) return null;

  return (
    <div className="space-y-3 w-full py-2">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <span className="h-4 w-1 rounded-full bg-cinema-blue" />
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        </div>
        <button className="flex items-center space-x-1 text-xs text-slate-500 hover:text-cinema-blue transition-colors">
          <span>See all</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Horizontal Scroll List */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scroll-smooth">
        <div className="flex space-x-6 px-4 sm:px-6 lg:px-8 w-max">
          {loading ? (
            // Skeleton Loaders
            Array.from({ length: 4 }).map((_, idx) => (
              <div 
                key={idx} 
                className="w-[260px] h-[380px] rounded-2xl border border-white/5 bg-cinema-deep/45 p-4 animate-pulse flex flex-col justify-between"
              >
                <div className="w-full aspect-[2/3] bg-white/5 rounded-xl" />
                <div className="h-4 bg-white/5 rounded w-3/4 mt-4" />
                <div className="h-3 bg-white/5 rounded w-1/2 mt-2" />
                <div className="h-3 bg-white/5 rounded w-full mt-4" />
              </div>
            ))
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="w-[265px]">
                <MovieCard movie={movie} onSelect={onSelectMovie} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
