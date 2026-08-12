import React, { createContext, useContext, useState, useEffect } from "react";
import { type Movie, MOCK_MOVIES, TMDBService } from "../services/tmdb";
import { AIService, type ParsedQuery } from "../services/ai";

export interface User {
  username: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "concierge";
  text: string;
  timestamp: string;
}

interface AppContextType {
  user: User | null;
  favorites: Movie[];
  watchlist: Movie[];
  recentlyViewed: Movie[];
  searchHistory: string[];
  tmdbKey: string;
  theme: "dark" | "light";
  activeSection: "home" | "dashboard" | "favorites" | "watchlist";
  activeQuery: ParsedQuery | null;
  activeMovies: Movie[];
  moviesLoading: boolean;
  chatbotMessages: ChatMessage[];
  chatbotTyping: boolean;
  login: (username: string, email: string) => void;
  logout: () => void;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: number) => void;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  addToRecentlyViewed: (movie: Movie) => void;
  setCustomTmdbKey: (key: string) => void;
  toggleTheme: () => void;
  setActiveSection: (section: "home" | "dashboard" | "favorites" | "watchlist") => void;
  handleSearchQuery: (queryStr: string) => Promise<void>;
  clearActiveQuery: () => void;
  sendChatbotMessage: (text: string) => Promise<void>;
  clearChatHistory: () => void;
  getAnalytics: () => {
    favoriteGenres: { genre: string; count: number }[];
    moodDistribution: { mood: string; value: number }[];
    viewingStats: { month: string; hours: number }[];
    watchlistProgress: { completed: number; total: number };
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("cc_user");
    return saved ? JSON.parse(saved) : { username: "Guest Cinephile", email: "guest@cinema.com" };
  });

  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("cc_favorites");
    return saved ? JSON.parse(saved) : [MOCK_MOVIES[0], MOCK_MOVIES[4]]; // defaults
  });

  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("cc_watchlist");
    return saved ? JSON.parse(saved) : [MOCK_MOVIES[1], MOCK_MOVIES[3], MOCK_MOVIES[8]]; // defaults
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("cc_recently_viewed");
    return saved ? JSON.parse(saved) : [MOCK_MOVIES[2], MOCK_MOVIES[6]]; // defaults
  });

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("cc_search_history");
    return saved ? JSON.parse(saved) : ["mind-bending sci-fi", "feel-good comedy under 2 hours", "spirited away"];
  });

  const [tmdbKey, setTmdbKeyState] = useState<string>(() => {
    return localStorage.getItem("cc_tmdb_key") || "";
  });

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState<"home" | "dashboard" | "favorites" | "watchlist">("home");
  const [activeQuery, setActiveQuery] = useState<ParsedQuery | null>(null);
  const [activeMovies, setActiveMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [moviesLoading, setMoviesLoading] = useState<boolean>(false);

  const [chatbotMessages, setChatbotMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("cc_chatbot_messages");
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        sender: "concierge",
        text: "Salutations! I am your Cinema Concierge. Speak to me of your mood, a favorite director, or the type of story you desire, and I shall unveil the perfect cinematic match.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [chatbotTyping, setChatbotTyping] = useState<boolean>(false);

  // Sync state to local storage
  useEffect(() => {
    if (user) localStorage.setItem("cc_user", JSON.stringify(user));
    else localStorage.removeItem("cc_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cc_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cc_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("cc_recently_viewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem("cc_search_history", JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem("cc_chatbot_messages", JSON.stringify(chatbotMessages));
  }, [chatbotMessages]);

  // Set API Key in TMDBService on load/change
  useEffect(() => {
    TMDBService.setApiKey(tmdbKey);
    // Reload trending movies based on if API is live or not
    const loadDefaultMovies = async () => {
      setMoviesLoading(true);
      try {
        const trend = await TMDBService.getTrendingToday();
        setActiveMovies(trend);
      } catch (e) {
        console.error(e);
      } finally {
        setMoviesLoading(false);
      }
    };
    loadDefaultMovies();
  }, [tmdbKey]);

  // Handle Light/Dark theme class on document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Authentication actions
  const login = (username: string, email: string) => {
    setUser({ username, email });
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setWatchlist([]);
    setRecentlyViewed([]);
    setSearchHistory([]);
    setChatbotMessages([
      {
        id: "1",
        sender: "concierge",
        text: "Welcome back! I am your Cinema Concierge. What movie mood shall we explore today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Movie actions
  const addToFavorites = (movie: Movie) => {
    if (!favorites.some(f => f.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const addToWatchlist = (movie: Movie) => {
    if (!watchlist.some(w => w.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist(watchlist.filter(w => w.id !== id));
  };

  const addToRecentlyViewed = (movie: Movie) => {
    const filtered = recentlyViewed.filter(r => r.id !== movie.id);
    setRecentlyViewed([movie, ...filtered].slice(0, 10)); // Limit to 10 recently viewed
  };

  const setCustomTmdbKey = (key: string) => {
    setTmdbKeyState(key);
    localStorage.setItem("cc_tmdb_key", key);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // AI-powered Natural Language Search handler
  const handleSearchQuery = async (queryStr: string) => {
    if (!queryStr || queryStr.trim() === "") return;
    setMoviesLoading(true);
    setActiveSection("home");

    // Add to search history if not duplicate
    setSearchHistory(prev => {
      const filtered = prev.filter(h => h.toLowerCase() !== queryStr.toLowerCase());
      return [queryStr, ...filtered].slice(0, 6);
    });

    const parsed = AIService.parseNaturalLanguageQuery(queryStr);
    setActiveQuery(parsed);

    try {
      let baseMovies: Movie[] = [];
      if (TMDBService.isLive()) {
        // Query live TMDB search for primary terms, or fallback to trending
        const searchTerm = parsed.similarToMovie || (parsed.genres.length > 0 ? parsed.genres[0] : "") || queryStr;
        baseMovies = await TMDBService.searchMovies(searchTerm);
        if (baseMovies.length === 0) {
          baseMovies = await TMDBService.getTrendingToday();
        }
      } else {
        baseMovies = MOCK_MOVIES;
      }

      // Filter results based on parsed AI constraints
      let filtered = AIService.filterMovies(baseMovies, parsed);

      // If no movies match the filters, fallback to show some recommendations with a friendly notice
      if (filtered.length === 0) {
        filtered = baseMovies.slice(0, 6);
      }

      // Inject AI recommendations reasons
      const processed = filtered.map(movie => ({
        ...movie,
        aiExplanation: AIService.generateExplanation(movie, parsed)
      }));

      setActiveMovies(processed);
    } catch (e) {
      console.error("AI recommendation search failed", e);
    } finally {
      setMoviesLoading(false);
    }
  };

  const clearActiveQuery = () => {
    setActiveQuery(null);
    setMoviesLoading(true);
    TMDBService.getTrendingToday()
      .then(movies => setActiveMovies(movies))
      .finally(() => setMoviesLoading(false));
  };

  // Conversational Chatbot Assistant
  const sendChatbotMessage = async (text: string) => {
    if (!text || text.trim() === "") return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatbotMessages(prev => [...prev, userMsg]);
    setChatbotTyping(true);

    // AI simulation delay
    setTimeout(async () => {
      const parsed = AIService.parseNaturalLanguageQuery(text);
      let responseText = "";

      // Determine the conversational response based on NLP parsing
      if (parsed.excludeGenres.length > 0) {
        responseText = `Understood. I will exclude ${parsed.excludeGenres.join(" and ")} from your current feed and refine recommendations accordingly.`;
      } else if (parsed.director) {
        responseText = `Ah, a connoisseur of ${parsed.director}! I'm shifting the spotlight to focus on their masterful filmography. I've updated the dashboard and recommendation panels.`;
      } else if (parsed.similarToMovie) {
        responseText = `Excellent taste. If you loved "${parsed.similarToMovie}", you will appreciate films with similar narrative structures and tones. I've updated the homepage to show movies in that vein.`;
      } else if (parsed.moods.includes("mind-bending")) {
        responseText = "Preparing to alter your perception. I am highlighting complex, cerebral sci-fi and thrillers that will leave you questioning reality.";
      } else if (parsed.moods.includes("feel-good")) {
        responseText = "We could all use some light. I've filled your catalog with heartwarming, delightful comedies and animation designed to raise your spirits.";
      } else if (parsed.familyFriendly) {
        responseText = "Adjusting lens for family movie night! I have filtered our suggestions to only include wholesome, all-ages appropriate masterpieces.";
      } else {
        responseText = "An intriguing request. I've parsed your preferences and calibrated our cinematic dials to update the movie catalog on the main stage.";
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "concierge",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatbotMessages(prev => [...prev, botMsg]);
      setChatbotTyping(false);

      // Trigger actual recommendation update in the background if on home screen
      await handleSearchQuery(text);
    }, 1200);
  };

  const clearChatHistory = () => {
    setChatbotMessages([
      {
        id: "1",
        sender: "concierge",
        text: "System reset complete. I am ready to curate a fresh cinematic journey for you.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Dashboard analytics computations
  const getAnalytics = () => {
    // 1. Calculate Favorite Genres based on favorites + watchlist + recently viewed
    const allMoviePicks = [...favorites, ...watchlist, ...recentlyViewed];
    const genreCounts: { [key: string]: number } = {};

    allMoviePicks.forEach(movie => {
      movie.genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    // Populate defaults if history is sparse
    const defaultGenres = ["Sci-Fi", "Drama", "Comedy", "Thriller", "Animation"];
    defaultGenres.forEach(dg => {
      if (!genreCounts[dg]) genreCounts[dg] = 0;
    });

    // Increment with small baseline so it looks active
    genreCounts["Sci-Fi"] += 3;
    genreCounts["Drama"] += 2;
    genreCounts["Comedy"] += 1;

    const favoriteGenres = Object.entries(genreCounts)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // 2. Mood Distribution
    // Map genres/features to mood categories for dynamic charts
    let mindBendingCount = favorites.filter(m => m.genres.includes("Sci-Fi") || m.genres.includes("Mystery")).length + 2;
    let feelGoodCount = favorites.filter(m => m.genres.includes("Comedy") || m.genres.includes("Animation")).length + 1;
    let thrillingCount = favorites.filter(m => m.genres.includes("Thriller") || m.genres.includes("Action")).length + 3;
    let emotionalCount = favorites.filter(m => m.genres.includes("Drama") || m.genres.includes("Romance")).length + 2;

    const totalMoodCount = mindBendingCount + feelGoodCount + thrillingCount + emotionalCount;
    const moodDistribution = [
      { mood: "Mind-Bending", value: Math.round((mindBendingCount / totalMoodCount) * 100) },
      { mood: "Feel-Good", value: Math.round((feelGoodCount / totalMoodCount) * 100) },
      { mood: "Thrilling", value: Math.round((thrillingCount / totalMoodCount) * 100) },
      { mood: "Emotional", value: Math.round((emotionalCount / totalMoodCount) * 100) }
    ];

    // 3. Viewing Stats (Hours watched per month)
    const viewingStats = [
      { month: "Mar", hours: 12 },
      { month: "Apr", hours: 26 },
      { month: "May", hours: 18 },
      { month: "Jun", hours: 32 },
      { month: "Jul", hours: 44 }
    ];

    // 4. Watchlist Progress
    const completedCount = recentlyViewed.filter(m => watchlist.some(w => w.id === m.id)).length;
    const watchlistProgress = {
      completed: completedCount,
      total: watchlist.length
    };

    return {
      favoriteGenres,
      moodDistribution,
      viewingStats,
      watchlistProgress
    };
  };

  return (
    <AppContext.Provider
      value={{
        user,
        favorites,
        watchlist,
        recentlyViewed,
        searchHistory,
        tmdbKey,
        theme,
        activeSection,
        activeQuery,
        activeMovies,
        moviesLoading,
        chatbotMessages,
        chatbotTyping,
        login,
        logout,
        addToFavorites,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist,
        addToRecentlyViewed,
        setCustomTmdbKey,
        toggleTheme,
        setActiveSection,
        handleSearchQuery,
        clearActiveQuery,
        sendChatbotMessage,
        clearChatHistory,
        getAnalytics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
