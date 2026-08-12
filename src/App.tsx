import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { AISearch } from "./components/AISearch";
import { AdvancedFilter } from "./components/AdvancedFilter";
import { MovieCard } from "./components/MovieCard";
import { MovieDetailModal } from "./components/MovieDetailModal";
import { Dashboard } from "./components/Dashboard";
import { AIChatbot } from "./components/AIChatbot";
import { AuthModal } from "./components/AuthModal";
import { SettingsModal } from "./components/SettingsModal";
import { MovieRow } from "./components/MovieRow";
import { type Movie, MOCK_MOVIES } from "./services/tmdb";
import { Sparkles, Shuffle, Heart, Bookmark, Film } from "lucide-react";

const AppContent: React.FC = () => {
  const { 
    activeSection, 
    activeMovies, 
    moviesLoading, 
    handleSearchQuery, 
    activeQuery, 
    favorites, 
    watchlist,
    addToRecentlyViewed 
  } = useApp();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelectMovie = (movie: Movie) => {
    addToRecentlyViewed(movie);
    setSelectedMovie(movie);
  };

  const handleSurpriseRecommendation = () => {
    const randomIndex = Math.floor(Math.random() * MOCK_MOVIES.length);
    const randomMovie = MOCK_MOVIES[randomIndex];
    handleSelectMovie(randomMovie);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onSelectMovie={handleSelectMovie} />;
      
      case "favorites":
        return (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6 min-h-[60vh]">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
                <Heart className="h-6 w-6 text-cinema-neon-magenta fill-cinema-neon-magenta" />
                <span>Your Favorites</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Cinematic masterworks that resonated with your profile.</p>
            </div>

            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onSelect={handleSelectMovie} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center space-y-4">
                <Heart className="h-10 w-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-bold text-slate-400">No Favorites Added</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart icon on any movie card to store it in your customized archive.
                </p>
              </div>
            )}
          </div>
        );

      case "watchlist":
        return (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6 min-h-[60vh]">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
                <Bookmark className="h-6 w-6 text-cinema-blue fill-cinema-blue" />
                <span>Your Watchlist</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Movies queued for your upcoming projection hours.</p>
            </div>

            {watchlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {watchlist.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onSelect={handleSelectMovie} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center space-y-4">
                <Bookmark className="h-10 w-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-bold text-slate-400">Watchlist is Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Queue films for later viewing by clicking the bookmark icon on cards.
                </p>
              </div>
            )}
          </div>
        );

      case "home":
      default:
        return (
          <div className="space-y-12">
            
            {/* Landing Hero */}
            <HeroSection />

            {/* AI Search Panel */}
            <div className="space-y-4">
              <AISearch onSearch={handleSearchQuery} />
              <AdvancedFilter onApplyFilter={handleSearchQuery} />
            </div>

            {/* Surprise Me floating CTA */}
            <div className="max-w-4xl mx-auto px-4 text-center">
              <button
                onClick={handleSurpriseRecommendation}
                className="inline-flex items-center space-x-2 rounded-2xl border border-cinema-gold/30 bg-cinema-gold/10 px-6 py-3.5 text-sm font-bold text-cinema-gold hover:bg-cinema-gold/20 hover:border-cinema-gold/50 transition-all shadow-inner active:scale-95 group"
              >
                <Shuffle className="h-4.5 w-4.5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Surprise Me With a Random Recommendation</span>
              </button>
            </div>

            {/* Primary Movie Lists */}
            {moviesLoading ? (
              // Loading Skeleton Grid
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <div className="h-6 w-48 bg-white/5 rounded-md animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className="glass-card rounded-2xl p-4 animate-pulse flex flex-col justify-between h-[360px]"
                    >
                      <div className="w-full aspect-[2/3] bg-white/5 rounded-xl" />
                      <div className="h-4 bg-white/5 rounded w-3/4 mt-4" />
                      <div className="h-3 bg-white/5 rounded w-1/2 mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            ) : activeQuery ? (
              // Filtered Results List
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6 min-h-[40vh]">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-cinema-blue" />
                    <h3 className="text-xl font-bold text-white tracking-tight">AI Concierge Curated Feed</h3>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">{activeMovies.length} recommendations matched</span>
                </div>

                {activeMovies.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {activeMovies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} onSelect={handleSelectMovie} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center space-y-4">
                    <Film className="h-10 w-10 text-slate-600 mx-auto" />
                    <h3 className="text-sm font-bold text-slate-400">No Matching Film Masterpieces</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Our semantic parser couldn't locate perfect parameters. Try refining keywords or clearing search active filters.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Category Rails (Home default state)
              <div className="space-y-12">
                <MovieRow title="Trending Today" category="trending today" onSelectMovie={handleSelectMovie} />
                <MovieRow title="Hidden Gems" category="hidden gems" onSelectMovie={handleSelectMovie} />
                <MovieRow title="Critically Acclaimed" category="critically acclaimed" onSelectMovie={handleSelectMovie} />
                <MovieRow title="Oscar Winners" category="oscar winners" onSelectMovie={handleSelectMovie} />
                <MovieRow title="Classic Movies" category="classic movies" onSelectMovie={handleSelectMovie} />
                <MovieRow title="International Cinema" category="international cinema" onSelectMovie={handleSelectMovie} />
                <MovieRow title="Family Favorites" category="family movies" onSelectMovie={handleSelectMovie} />
                <MovieRow title="Weekend Picks" category="weekend picks" onSelectMovie={handleSelectMovie} />
              </div>
            )}

          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-cinema-void text-slate-100 flex flex-col justify-between">
      
      {/* Navbar navigation */}
      <Navbar 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        onOpenAuth={() => setIsAuthOpen(true)} 
      />

      {/* Main Section */}
      <main className="flex-1 w-full pb-16">
        {renderSection()}
      </main>

      {/* Footer information */}
      <Footer />

      {/* Floating AI Concierge Chatbot */}
      <AIChatbot />

      {/* Modals overlays */}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}

      {isAuthOpen && (
        <AuthModal onClose={() => setIsAuthOpen(false)} />
      )}

      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          onSelectMovie={handleSelectMovie}
        />
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
