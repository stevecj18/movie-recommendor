import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { MOCK_MOVIES } from "../services/tmdb";
import { Search, Mic, MicOff, X, Sparkles } from "lucide-react";

interface AISearchProps {
  onSearch: (query: string) => void;
}

export const AISearch: React.FC<AISearchProps> = ({ onSearch }) => {
  const { searchHistory, clearActiveQuery, activeQuery } = useApp();
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const placeholderExamples = [
    "I want a mind-bending sci-fi movie.",
    "Recommend a feel-good comedy under 2 hours.",
    "Suggest an emotional movie like Interstellar.",
    "I want a thriller with an unexpected ending.",
    "Recommend an underrated classic from the 90s.",
    "Suggest family animation from Miyazaki."
  ];

  // Rotate placeholders every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Set up Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        onSearch(transcript);
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [onSearch]);

  // Handle Autocomplete filtering
  useEffect(() => {
    if (inputValue.trim().length > 1) {
      const q = inputValue.toLowerCase().trim();
      const filtered = MOCK_MOVIES.filter(
        m => m.title.toLowerCase().includes(q)
      )
      .map(m => m.title)
      .slice(0, 5);
      
      setAutocompleteSuggestions(filtered);
    } else {
      setAutocompleteSuggestions([]);
    }
  }, [inputValue]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (val: string) => {
    setInputValue(val);
    onSearch(val);
    setShowSuggestions(false);
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInputValue("");
      recognitionRef.current?.start();
    }
  };

  const handleClear = () => {
    setInputValue("");
    clearActiveQuery();
    inputRef.current?.focus();
  };

  const suggestions = [
    "Mind-bending Sci-Fi",
    "Comedy under 2 hours",
    "Thriller like Shutter Island",
    " Miyazaki animation",
  ];

  return (
    <div id="search-anchor" className="w-full max-w-4xl mx-auto px-4 py-8 relative z-20">
      
      <form onSubmit={handleSearchSubmit} className="relative group">
        
        {/* Neon Glow Rings around Search Box */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cinema-purple to-cinema-blue opacity-30 blur-md group-focus-within:opacity-60 transition-opacity duration-500" />
        
        <div className="relative flex items-center h-16 rounded-2xl bg-cinema-deep/90 border border-cinema-purple/30 group-focus-within:border-cinema-blue/60 group-focus-within:neon-border-blue transition-all duration-300">
          
          <Search className="absolute left-5 h-5 w-5 text-slate-400 group-focus-within:text-cinema-blue transition-colors" />

          {/* Core Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholderExamples[placeholderIndex]}
            className="w-full h-full bg-transparent pl-14 pr-28 text-white placeholder-slate-500 outline-none text-md sm:text-lg font-light transition-all"
          />

          {/* Control Buttons (Clear, Mic) */}
          <div className="absolute right-3 flex items-center space-x-2">
            
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors"
                title="Clear Search"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {recognitionRef.current && (
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                  isListening
                    ? "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse shadow-lg shadow-red-500/10"
                    : "bg-white/5 text-slate-400 hover:text-white border border-transparent"
                }`}
                title={isListening ? "Listening..." : "Voice Search"}
              >
                {isListening ? <MicOff className="h-4.5 w-4.5" /> : <Mic className="h-4.5 w-4.5" />}
              </button>
            )}

            <button
              type="submit"
              className="flex h-10 px-4 items-center justify-center rounded-xl bg-gradient-to-r from-cinema-purple to-cinema-blue text-white font-semibold text-sm shadow-md shadow-cinema-purple/20 transition-all hover:brightness-110 active:scale-95"
            >
              <span>Search</span>
            </button>

          </div>
        </div>

        {/* Autocomplete Dropdown */}
        {showSuggestions && (inputValue.trim().length > 1 || searchHistory.length > 0) && (
          <div 
            ref={dropdownRef}
            className="absolute top-18 left-0 right-0 rounded-2xl border border-white/10 bg-cinema-deep/95 p-3 shadow-2xl backdrop-blur-xl z-50 max-h-[300px] overflow-y-auto"
          >
            
            {/* Match Autocomplete */}
            {autocompleteSuggestions.length > 0 && (
              <div className="mb-3">
                <span className="block px-3 py-1.5 text-xs font-semibold text-cinema-blue/80 uppercase tracking-wider">Movies</span>
                {autocompleteSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSuggestionClick(item)}
                    className="flex w-full items-center px-3 py-2 text-sm text-slate-200 rounded-lg hover:bg-white/5 hover:text-white text-left transition-colors"
                  >
                    <Search className="h-3.5 w-3.5 mr-2.5 text-slate-500" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Match Search History */}
            {searchHistory.length > 0 && (
              <div>
                <span className="block px-3 py-1.5 text-xs font-semibold text-cinema-purple-light uppercase tracking-wider">Recent Searches</span>
                {searchHistory.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSuggestionClick(item)}
                    className="flex w-full items-center px-3 py-2 text-sm text-slate-300 rounded-lg hover:bg-white/5 hover:text-white text-left transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-2.5 text-slate-500" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            )}

          </div>
        )}
      </form>

      {/* Quick Suggest Tags */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
        <span className="text-xs text-slate-500 font-medium">Try asking for:</span>
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSuggestionClick(s)}
            className="rounded-full border border-white/5 bg-white/5 px-3.5 py-1 text-xs font-medium text-slate-400 transition-all hover:bg-cinema-purple/10 hover:border-cinema-purple/40 hover:text-cinema-purple-light"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Active Query Display */}
      {activeQuery && (
        <div className="mt-6 flex items-center justify-between rounded-xl bg-gradient-to-r from-cinema-purple/10 to-cinema-blue/10 border border-cinema-purple/20 px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-cinema-blue" />
            <span>AI recommendation active for: </span>
            <strong className="text-white">"{activeQuery.rawQuery}"</strong>
          </div>
          <button
            onClick={handleClear}
            className="text-xs text-cinema-blue font-semibold hover:underline"
          >
            Reset Catalog
          </button>
        </div>
      )}

    </div>
  );
};
