import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface AdvancedFilterProps {
  onApplyFilter: (query: string) => void;
}

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ onApplyFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Filter States
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedRuntime, setSelectedRuntime] = useState("");
  const [selectedEra, setSelectedEra] = useState("");
  const [minRating, setMinRating] = useState("");
  const [isFamilyFriendly, setIsFamilyFriendly] = useState<boolean | null>(null);
  const [endingType, setEndingType] = useState("");
  const [isTrueStory, setIsTrueStory] = useState("");
  const [actorOrDirector, setActorOrDirector] = useState("");
  const [streamingPreference, setStreamingPreference] = useState("");

  const moods = ["Mind-bending", "Feel-good", "Emotional", "Thrilling", "Chill", "Underrated"];
  const genres = ["Sci-Fi", "Drama", "Comedy", "Thriller", "Action", "Animation", "Romance", "Mystery", "Family"];
  const languages = ["English", "Japanese", "Korean", "French", "Spanish", "Italian"];
  const runtimes = [
    { label: "Short (< 90m)", value: "under 90 minutes" },
    { label: "Standard (< 120m)", value: "under 2 hours" },
    { label: "Epic (> 150m)", value: "over 2.5 hours" },
  ];
  const eras = [
    { label: "Classics (< 2005)", value: "classic" },
    { label: "Modern (> 2015)", value: "modern" },
  ];
  const streamingPlatforms = ["Netflix", "Prime Video", "Disney+", "Apple TV"];

  const handleApply = () => {
    // Dynamically construct a natural language query based on user selections
    const parts: string[] = [];

    if (minRating === "high") {
      parts.push("highly rated");
    } else if (minRating === "masterpiece") {
      parts.push("masterpiece");
    }

    if (selectedEra === "classic") {
      parts.push("classic");
    } else if (selectedEra === "modern") {
      parts.push("modern");
    }

    if (selectedMood) {
      parts.push(selectedMood.toLowerCase());
    }

    if (selectedGenre) {
      parts.push(selectedGenre.toLowerCase());
    }

    if (isTrueStory === "yes") {
      parts.push("based on a true story");
    }

    if (selectedLanguage && selectedLanguage !== "English") {
      parts.push(`${selectedLanguage.toLowerCase()} language`);
    }

    parts.push("movie");

    if (actorOrDirector.trim()) {
      parts.push(`directed by or starring ${actorOrDirector.trim()}`);
    }

    if (selectedRuntime) {
      parts.push(selectedRuntime);
    }

    if (endingType === "happy") {
      parts.push("with a happy ending");
    } else if (endingType === "sad") {
      parts.push("with a sad ending");
    }

    if (isFamilyFriendly === true) {
      parts.push("for family");
    }

    if (streamingPreference) {
      parts.push(`available on ${streamingPreference}`);
    }

    let compiledQuery = parts.join(" ");
    
    // Capitalize first letter
    compiledQuery = compiledQuery.charAt(0).toUpperCase() + compiledQuery.slice(1);
    
    onApplyFilter(compiledQuery);
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedMood("");
    setSelectedGenre("");
    setSelectedLanguage("");
    setSelectedRuntime("");
    setSelectedEra("");
    setMinRating("");
    setIsFamilyFriendly(null);
    setEndingType("");
    setIsTrueStory("");
    setActorOrDirector("");
    setStreamingPreference("");
    onApplyFilter("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      <div className="rounded-2xl border border-white/10 glass-panel overflow-hidden">
        
        {/* Header Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-white/5"
        >
          <div className="flex items-center space-x-2 text-slate-200">
            <SlidersHorizontal className="h-4.5 w-4.5 text-cinema-blue" />
            <span className="font-semibold text-sm tracking-wide uppercase">Advanced AI Filter Concierge</span>
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {/* Expandable Content */}
        {isOpen && (
          <div className="border-t border-white/5 p-6 bg-cinema-void/30 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Mood Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mood</label>
                <div className="flex flex-wrap gap-2">
                  {moods.map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedMood(selectedMood === m ? "" : m)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        selectedMood === m
                          ? "bg-cinema-purple/20 border-cinema-purple-light text-cinema-purple-light"
                          : "bg-white/5 border-white/5 text-slate-300 hover:border-white/20"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genre Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Genre</label>
                <div className="flex flex-wrap gap-2">
                  {genres.map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSelectedGenre(selectedGenre === g ? "" : g)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        selectedGenre === g
                          ? "bg-cinema-blue/20 border-cinema-blue text-cinema-blue"
                          : "bg-white/5 border-white/5 text-slate-300 hover:border-white/20"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select inputs */}
              <div className="space-y-4">
                {/* Language Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={e => setSelectedLanguage(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-cinema-deep px-3 py-2 text-xs text-slate-200 outline-none focus:border-cinema-blue"
                  >
                    <option value="">Any Language</option>
                    {languages.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">IMDb Rating</label>
                  <select
                    value={minRating}
                    onChange={e => setMinRating(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-cinema-deep px-3 py-2 text-xs text-slate-200 outline-none focus:border-cinema-blue"
                  >
                    <option value="">Any Rating</option>
                    <option value="high">Highly Rated (&gt; 8.0)</option>
                    <option value="masterpiece">Masterpiece (&gt; 8.5)</option>
                  </select>
                </div>
              </div>

              {/* Runtimes and Eras */}
              <div className="space-y-4">
                {/* Runtime Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Runtime</label>
                  <div className="grid grid-cols-3 gap-2">
                    {runtimes.map(r => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setSelectedRuntime(selectedRuntime === r.value ? "" : r.value)}
                        className={`py-2 rounded-xl text-[10px] font-medium border text-center transition-all ${
                          selectedRuntime === r.value
                            ? "bg-cinema-gold/20 border-cinema-gold text-cinema-gold"
                            : "bg-white/5 border-transparent text-slate-300 hover:border-white/10"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Eras Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Release Year</label>
                  <div className="grid grid-cols-2 gap-2">
                    {eras.map(e => (
                      <button
                        key={e.value}
                        type="button"
                        onClick={() => setSelectedEra(selectedEra === e.value ? "" : e.value)}
                        className={`py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                          selectedEra === e.value
                            ? "bg-cinema-blue/20 border-cinema-blue text-cinema-blue"
                            : "bg-white/5 border-transparent text-slate-300 hover:border-white/10"
                        }`}
                      >
                        {e.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ending & True Story */}
              <div className="space-y-4">
                {/* Family and Ending types */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Content Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFamilyFriendly(isFamilyFriendly === true ? null : true)}
                      className={`py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        isFamilyFriendly === true
                          ? "bg-cinema-purple/20 border-cinema-purple-light text-cinema-purple-light"
                          : "bg-white/5 border-transparent text-slate-300 hover:border-white/10"
                      }`}
                    >
                      Family-friendly
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFamilyFriendly(isFamilyFriendly === false ? null : false)}
                      className={`py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        isFamilyFriendly === false
                          ? "bg-red-500/10 border-red-500/30 text-red-400"
                          : "bg-white/5 border-transparent text-slate-300 hover:border-white/10"
                      }`}
                    >
                      Adult / Mature
                    </button>
                  </div>
                </div>

                {/* Ending options */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Ending Tone</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEndingType(endingType === "happy" ? "" : "happy")}
                      className={`py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        endingType === "happy"
                          ? "bg-cinema-gold/20 border-cinema-gold text-cinema-gold"
                          : "bg-white/5 border-transparent text-slate-300 hover:border-white/10"
                      }`}
                    >
                      Happy Ending
                    </button>
                    <button
                      type="button"
                      onClick={() => setEndingType(endingType === "sad" ? "" : "sad")}
                      className={`py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        endingType === "sad"
                          ? "bg-cinema-purple/20 border-cinema-purple-light text-cinema-purple-light"
                          : "bg-white/5 border-transparent text-slate-300 hover:border-white/10"
                      }`}
                    >
                      Sad/Tragic
                    </button>
                  </div>
                </div>
              </div>

              {/* Custom Input & Streaming Platform */}
              <div className="space-y-4">
                {/* True Story and actor inputs */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Actor / Director Name</label>
                  <input
                    type="text"
                    value={actorOrDirector}
                    onChange={e => setActorOrDirector(e.target.value)}
                    placeholder="e.g. Christopher Nolan"
                    className="w-full rounded-xl border border-white/10 bg-cinema-deep px-3 py-2 text-xs text-slate-200 outline-none focus:border-cinema-blue placeholder-slate-600"
                  />
                </div>

                {/* Based on True Story Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Based on True Story</label>
                  <select
                    value={isTrueStory}
                    onChange={e => setIsTrueStory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-cinema-deep px-3 py-2 text-xs text-slate-200 outline-none focus:border-cinema-blue"
                  >
                    <option value="">Any</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {/* Streaming Preference */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Streaming Platform</label>
                  <select
                    value={streamingPreference}
                    onChange={e => setStreamingPreference(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-cinema-deep px-3 py-2 text-xs text-slate-200 outline-none focus:border-cinema-blue"
                  >
                    <option value="">Any Platform</option>
                    {streamingPlatforms.map(sp => (
                      <option key={sp} value={sp}>{sp}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Actions Panel */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-white/5 bg-white/5 px-5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
              >
                Clear Filters
              </button>
              
              <button
                type="button"
                onClick={handleApply}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cinema-purple to-cinema-blue px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-cinema-purple/15 hover:brightness-110"
              >
                <Sparkles className="h-4 w-4" />
                <span>Apply AI Filter</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
