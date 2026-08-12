import { type Movie } from "./tmdb";

export interface ParsedQuery {
  rawQuery: string;
  genres: string[];
  moods: string[];
  maxRuntime?: number;
  minRuntime?: number;
  minRating?: number;
  maxYear?: number;
  minYear?: number;
  director?: string;
  actor?: string;
  excludeGenres: string[];
  underRatedOnly?: boolean;
  classicOnly?: boolean;
  oscarWinnerOnly?: boolean;
  trueStoryOnly?: boolean;
  happyEnding?: boolean;
  sadEnding?: boolean;
  familyFriendly?: boolean;
  similarToMovie?: string;
}

export class AIService {
  // Parses a natural language query into structured criteria
  public static parseNaturalLanguageQuery(query: string): ParsedQuery {
    const q = query.toLowerCase().trim();
    const result: ParsedQuery = {
      rawQuery: query,
      genres: [],
      moods: [],
      excludeGenres: [],
    };

    // 1. Detect Genres
    const genreMap: { [key: string]: string } = {
      "sci-fi": "Sci-Fi",
      "science fiction": "Sci-Fi",
      "space": "Sci-Fi",
      "comedy": "Comedy",
      "funny": "Comedy",
      "feel-good": "Comedy",
      "hilarious": "Comedy",
      "thriller": "Thriller",
      "suspense": "Thriller",
      "scary": "Thriller", // map to thriller/mystery in our mock
      "horror": "Horror",
      "drama": "Drama",
      "emotional": "Drama",
      "sad": "Drama",
      "action": "Action",
      "fight": "Action",
      "adventure": "Adventure",
      "explore": "Adventure",
      "animation": "Animation",
      "cartoon": "Animation",
      "anime": "Animation",
      "family": "Family",
      "kids": "Family",
      "children": "Family",
      "fantasy": "Fantasy",
      "magic": "Fantasy",
      "mystery": "Mystery",
      "detective": "Mystery",
      "romance": "Romance",
      "love": "Romance",
      "romantic": "Romance",
      "music": "Music",
      "musical": "Music",
      "crime": "Crime",
      "gangster": "Crime",
      "mafia": "Crime",
      "international": "International Cinema",
      "foreign": "International Cinema",
    };

    Object.keys(genreMap).forEach(key => {
      if (q.includes(key)) {
        if (!result.genres.includes(genreMap[key])) {
          result.genres.push(genreMap[key]);
        }
      }
    });

    // 2. Detect Exclusions
    if (q.includes("no ") || q.includes("don't want") || q.includes("without") || q.includes("exclude")) {
      const exclusions = ["horror", "sci-fi", "science fiction", "comedy", "romance", "action", "drama", "thriller"];
      exclusions.forEach(ex => {
        if (q.includes(`no ${ex}`) || q.includes(`don't want ${ex}`) || q.includes(`without ${ex}`) || q.includes(`exclude ${ex}`)) {
          const mapped = genreMap[ex] || ex;
          if (!result.excludeGenres.includes(mapped)) {
            result.excludeGenres.push(mapped);
          }
        }
      });
    }

    // 3. Detect Moods / Tone
    const moodKeywords = {
      "mind-bending": ["mind-bending", "brain", "puzzle", "confusing", "intellectual", "thought-provoking", "cerebral", "complex", "inception", "interstellar"],
      "emotional": ["emotional", "tearjerker", "cry", "touching", "sad", "moving", "heartwarming"],
      "feel-good": ["feel-good", "happy", "uplifting", "lighthearted", "wholesome", "cheerful"],
      "thrilling": ["thrilling", "intense", "suspenseful", "edge of my seat", "exciting", "gripping", "dark"],
      "chill": ["chill", "relaxed", "slow", "cozy", "comforting", "peaceful"],
      "underrated": ["underrated", "hidden gem", "unappreciated", "lesser known", "indie", "rare"],
    };

    Object.entries(moodKeywords).forEach(([mood, keywords]) => {
      if (keywords.some(kw => q.includes(kw))) {
        result.moods.push(mood);
      }
    });

    // 4. Runtime Constraints
    if (q.includes("under 2 hours") || q.includes("less than 2 hours") || q.includes("under 120 minutes") || q.includes("short")) {
      result.maxRuntime = 120;
    } else if (q.includes("under 90 minutes") || q.includes("under 1.5 hours") || q.includes("very short")) {
      result.maxRuntime = 90;
    } else if (q.includes("over 2.5 hours") || q.includes("long") || q.includes("epic")) {
      result.minRuntime = 150;
    } else if (q.includes("under 3 hours")) {
      result.maxRuntime = 180;
    }

    // 5. Ratings / Quality
    if (q.includes("masterpiece") || q.includes("critically acclaimed") || q.includes("highly rated") || q.includes("best")) {
      result.minRating = 8.4;
    } else if (q.includes("good") || q.includes("decent")) {
      result.minRating = 7.5;
    }

    // 6. Era / Release Year
    if (q.includes("classic") || q.includes("old") || q.includes("retro") || q.includes("golden era") || q.includes("90s") || q.includes("80s")) {
      result.classicOnly = true;
      result.maxYear = 2005;
    } else if (q.includes("modern") || q.includes("recent") || q.includes("new")) {
      result.minYear = 2015;
    }

    // 7. Oscar Winners
    if (q.includes("oscar") || q.includes("academy award") || q.includes("award winning")) {
      result.oscarWinnerOnly = true;
    }

    // 8. True Story
    if (q.includes("true story") || q.includes("real life") || q.includes("biography") || q.includes("historical")) {
      result.trueStoryOnly = true;
    }

    // 9. Happy or Sad Endings
    if (q.includes("happy ending") || q.includes("feel good ending")) {
      result.happyEnding = true;
    } else if (q.includes("sad ending") || q.includes("tragic")) {
      result.sadEnding = true;
    }

    // 10. Kids / Family friendly
    if (q.includes("family friendly") || q.includes("for kids") || q.includes("family") || q.includes("with kids")) {
      result.familyFriendly = true;
    }

    // 11. Specific Directors / Actors (Focusing on our Mock Database list)
    if (q.includes("nolan") || q.includes("christopher nolan")) {
      result.director = "Christopher Nolan";
    } else if (q.includes("miyazaki") || q.includes("hayao miyazaki")) {
      result.director = "Hayao Miyazaki";
    } else if (q.includes("tarantino") || q.includes("quentin tarantino")) {
      result.director = "Quentin Tarantino";
    } else if (q.includes("dicaprio") || q.includes("leonardo dicaprio")) {
      result.actor = "Leonardo DiCaprio";
    } else if (q.includes("jim carrey") || q.includes("carrey")) {
      result.actor = "Jim Carrey";
    }

    // 12. Similar to another movie
    const similarMovieMatches = [
      { name: "interstellar", key: "Interstellar" },
      { name: "inception", key: "Inception" },
      { name: "parasite", key: "Parasite" },
      { name: "spirited away", key: "Spirited Away" },
      { name: "dark knight", key: "The Dark Knight" },
      { name: "pulp fiction", key: "Pulp Fiction" },
      { name: "whiplash", key: "Whiplash" },
      { name: "amelie", key: "Amélie" },
      { name: "grand budapest", key: "The Grand Budapest Hotel" },
      { name: "knives out", key: "Knives Out" },
      { name: "godfather", key: "The Godfather" }
    ];

    similarMovieMatches.forEach(item => {
      if (q.includes(`like ${item.name}`) || q.includes(`similar to ${item.name}`)) {
        result.similarToMovie = item.key;
      }
    });

    return result;
  }

  // Refines and ranks movies based on the parsed query
  public static filterMovies(movies: Movie[], query: ParsedQuery): Movie[] {
    return movies.filter(movie => {
      // Exclude genres
      if (query.excludeGenres.length > 0) {
        const matchesExclude = movie.genres.some(g => query.excludeGenres.includes(g));
        if (matchesExclude) return false;
      }

      // Filter by genre
      if (query.genres.length > 0) {
        // If query has genres, movie should match at least one
        const matchesGenre = movie.genres.some(g => query.genres.includes(g));
        if (!matchesGenre) return false;
      }

      // Filter by director
      if (query.director && movie.director.toLowerCase() !== query.director.toLowerCase()) {
        return false;
      }

      // Filter by actor
      if (query.actor && !movie.cast.some(actor => actor.toLowerCase().includes(query.actor!.toLowerCase()))) {
        return false;
      }

      // Runtime constraints
      if (query.maxRuntime && movie.runtime > query.maxRuntime) return false;
      if (query.minRuntime && movie.runtime < query.minRuntime) return false;

      // Rating constraints
      if (query.minRating && movie.rating < query.minRating) return false;

      // Year constraints
      if (query.minYear && movie.year < query.minYear) return false;
      if (query.maxYear && movie.year > query.maxYear) return false;

      // Classic filter
      if (query.classicOnly && movie.year > 2005) return false;

      // Family friendly filter
      if (query.familyFriendly && !movie.genres.includes("Family") && !movie.genres.includes("Animation")) {
        return false;
      }

      // Similar to movie filter (simulated by checking director or intersecting genres)
      if (query.similarToMovie) {
        const targetMovie = movies.find(m => m.title.toLowerCase() === query.similarToMovie!.toLowerCase());
        if (targetMovie && movie.title !== targetMovie.title) {
          // Check if shares director OR shares at least 2 genres
          const sharesDirector = movie.director === targetMovie.director;
          const sharedGenres = movie.genres.filter(g => targetMovie.genres.includes(g)).length;
          if (!sharesDirector && sharedGenres < 1) return false;
        }
      }

      // Underrated filter (simulated by IMDb rating < 8.3 but > 7.8)
      if (query.underRatedOnly && (movie.rating >= 8.4 || movie.rating < 7.8)) {
        return false;
      }

      return true;
    });
  }

  // Generates a rich, premium "Why recommended" description
  public static generateExplanation(movie: Movie, query: ParsedQuery): string {
    const reasons: string[] = [];

    // Genre alignment
    const matchingGenres = movie.genres.filter(g => query.genres.includes(g));
    if (matchingGenres.length > 0) {
      reasons.push(`it matches your request for a ${matchingGenres.join("/")} film`);
    }

    // Mood alignment
    if (query.moods.includes("mind-bending") && (movie.title === "Inception" || movie.title === "Interstellar" || movie.title === "Everything Everywhere All at Once" || movie.title === "Shutter Island")) {
      reasons.push("it offers a complex, thought-provoking narrative that challenges conventional storytelling");
    }
    if (query.moods.includes("emotional") && movie.genres.includes("Drama")) {
      reasons.push("it delivers an intensely moving emotional core that is sure to resonate");
    }
    if (query.moods.includes("feel-good") && movie.genres.includes("Comedy")) {
      reasons.push("its lighthearted humor and uplifting themes provide a perfectly comforting watch");
    }
    if (query.moods.includes("thrilling") && movie.genres.includes("Thriller")) {
      reasons.push("it is engineered with high-stakes tension to keep you on the edge of your seat");
    }

    // Director/Actor alignment
    if (query.director && movie.director === query.director) {
      reasons.push(`it is masterfully crafted by director ${movie.director}, matching your search`);
    }
    if (query.actor && movie.cast.some(c => c.includes(query.actor!))) {
      reasons.push(`it features a captivating performance by ${query.actor}`);
    }

    // Runtime alignment
    if (query.maxRuntime && movie.runtime <= query.maxRuntime) {
      reasons.push(`it sits comfortably within your preferred duration at just ${movie.runtime} minutes`);
    }

    // High rating alignment
    if (query.minRating && movie.rating >= query.minRating) {
      reasons.push(`it is an critically acclaimed masterwork holding a premium rating of ${movie.rating}/10`);
    }

    // Similar movie
    if (query.similarToMovie) {
      reasons.push(`it captures a similar cinematic language and thematic depth as ${query.similarToMovie}`);
    }

    // Fallback default reasons if none match
    if (reasons.length === 0) {
      reasons.push(`it represents a top-tier ${movie.genres[0]} film directed by ${movie.director}`);
      reasons.push(`it features a stellar cast including ${movie.cast.slice(0, 2).join(" and ")}`);
    }

    // Capitalize first letter
    const joinedReasons = reasons.join(", and ");
    const intro = `Recommended because `;
    return `${intro}${joinedReasons}. Critics praise its direction by ${movie.director} and describe it as a "${movie.rating >= 8.5 ? "cinematic landmark" : "highly engaging masterpiece"}".`;
  }
}
