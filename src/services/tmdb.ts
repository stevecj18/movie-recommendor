export interface Movie {
  id: number;
  title: string;
  year: number;
  releaseDate: string;
  genres: string[];
  rating: number;
  runtime: number; // in minutes
  director: string;
  cast: string[];
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  aiExplanation?: string;
  isCustomMock?: boolean;
}

// Hand-curated cinematic classics to use as mock database
export const MOCK_MOVIES: Movie[] = [
  {
    id: 101,
    title: "Interstellar",
    year: 2014,
    releaseDate: "2014-11-07",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.7,
    runtime: 169,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80", // Cosmic space image
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
    id: 102,
    title: "Inception",
    year: 2010,
    releaseDate: "2010-07-16",
    genres: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8,
    runtime: 148,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    overview: "Cobb, a skilled thief who steals valuable secrets from deep within the subconscious during the dream state, is offered a chance to have his history erased as payment for a seemingly impossible task: \"inception\", the implantation of another person's idea into their subconscious.",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80", // Mind-bending geometry
    backdropUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0"
  },
  {
    id: 103,
    title: "Parasite",
    year: 2019,
    releaseDate: "2019-10-30",
    genres: ["Thriller", "Drama", "Comedy"],
    rating: 8.5,
    runtime: 132,
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    posterUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format&fit=crop&q=80", // Modern minimalist house facade
    backdropUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/5xH0HfJHsaY"
  },
  {
    id: 104,
    title: "Spirited Away",
    year: 2001,
    releaseDate: "2001-07-20",
    genres: ["Animation", "Family", "Fantasy"],
    rating: 8.6,
    runtime: 125,
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki", "Takashi Naito"],
    overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80", // Anime spirit aesthetic
    backdropUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/ByXuk9QqQkk"
  },
  {
    id: 105,
    title: "The Dark Knight",
    year: 2008,
    releaseDate: "2008-07-18",
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
    runtime: 152,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Maggie Gyllenhaal"],
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&auto=format&fit=crop&q=80", // Dark city neon
    backdropUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/LDG9bisJEaI"
  },
  {
    id: 106,
    title: "Pulp Fiction",
    year: 1994,
    releaseDate: "1994-10-14",
    genres: ["Crime", "Thriller"],
    rating: 8.9,
    runtime: 154,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Bruce Willis"],
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=80", // Retro neon diner / movie theme
    backdropUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/s7EdQ4FqbhY"
  },
  {
    id: 107,
    title: "Whiplash",
    year: 2014,
    releaseDate: "2014-10-10",
    genres: ["Drama", "Music"],
    rating: 8.5,
    runtime: 106,
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser", "Melissa Benoist"],
    overview: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    posterUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&auto=format&fit=crop&q=80", // Jazz instrument
    backdropUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/7d_jQyG8DjQ"
  },
  {
    id: 108,
    title: "Amélie",
    year: 2001,
    releaseDate: "2001-04-25",
    genres: ["Romance", "Comedy"],
    rating: 8.3,
    runtime: 122,
    director: "Jean-Pierre Jeunet",
    cast: ["Audrey Tautou", "Mathieu Kassovitz", "Rufus", "Lorella Cravotta"],
    overview: "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
    posterUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=80", // Eiffel tower / Parisian vibe
    backdropUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/HUECWi5pX7o"
  },
  {
    id: 109,
    title: "The Grand Budapest Hotel",
    year: 2014,
    releaseDate: "2014-03-28",
    genres: ["Comedy", "Drama"],
    rating: 8.1,
    runtime: 99,
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan", "Adrien Brody"],
    overview: "A writer relates his adventures at a renowned European resort hotel between the first and second World Wars with a concierge who is wrongly framed for murder.",
    posterUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=80", // Pastel hotel facade
    backdropUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/1Fg5iWmQjwk"
  },
  {
    id: 110,
    title: "Knives Out",
    year: 2019,
    releaseDate: "2019-11-27",
    genres: ["Mystery", "Comedy", "Thriller"],
    rating: 7.9,
    runtime: 130,
    director: "Rian Johnson",
    cast: ["Daniel Craig", "Chris Evans", "Ana de Armas", "Jamie Lee Curtis"],
    overview: "A detective investigates the death of a patriarch of an eccentric, combative family.",
    posterUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=80", // Cozy mansion library
    backdropUrl: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/qGqiHJTsRkQ"
  },
  {
    id: 111,
    title: "Coco",
    year: 2017,
    releaseDate: "2017-11-22",
    genres: ["Animation", "Family", "Music"],
    rating: 8.4,
    runtime: 105,
    director: "Lee Unkrich",
    cast: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt", "Alanna Ubach"],
    overview: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    posterUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80", // Colorful glowing guitars/candles
    backdropUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/Rvr68u6k5sI"
  },
  {
    id: 112,
    title: "Cinema Paradiso",
    year: 1988,
    releaseDate: "1988-11-17",
    genres: ["Drama", "Romance"],
    rating: 8.5,
    runtime: 124,
    director: "Giuseppe Tornatore",
    cast: ["Philippe Noiret", "Jacques Perrin", "Salvatore Cascio", "Marco Leonardi"],
    overview: "A filmmaker recalls his childhood when falling in love with the pictures at the cinema of his home village and forms a deep friendship with the cinema's projectionist.",
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80", // Retro cinema projector
    backdropUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/C2-xFvygWGY"
  },
  {
    id: 113,
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    releaseDate: "2018-12-14",
    genres: ["Animation", "Action", "Sci-Fi"],
    rating: 8.4,
    runtime: 117,
    director: "Bob Persichetti",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld", "Mahershala Ali"],
    overview: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&auto=format&fit=crop&q=80", // Neon graffiti superhero vibe
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/g4Hbz2yLXnM"
  },
  {
    id: 114,
    title: "The Godfather",
    year: 1972,
    releaseDate: "1972-03-24",
    genres: ["Crime", "Drama"],
    rating: 9.2,
    runtime: 175,
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family, focusing on the transition of power from Don Vito to his reluctant youngest son Michael.",
    posterUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80", // Shadowy rose / gangster vibe
    backdropUrl: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/UaVTIH8mujA"
  },
  {
    id: 115,
    title: "Everything Everywhere All at Once",
    year: 2022,
    releaseDate: "2022-03-24",
    genres: ["Sci-Fi", "Comedy", "Action"],
    rating: 8.5,
    runtime: 139,
    director: "Daniel Kwan",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu", "Jamie Lee Curtis"],
    overview: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
    posterUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop&q=80", // Abstract chaotic multi-colors
    backdropUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/wxN1T1UxQ2A"
  },
  {
    id: 116,
    title: "Shutter Island",
    year: 2010,
    releaseDate: "2010-02-19",
    genres: ["Mystery", "Thriller"],
    rating: 8.2,
    runtime: 138,
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley", "Michelle Williams"],
    overview: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane on Shutter Island.",
    posterUrl: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?w=500&auto=format&fit=crop&q=80", // Dark misty lighthouse
    backdropUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/5iaYLCip5qg"
  },
  {
    id: 117,
    title: "Ponyo",
    year: 2008,
    releaseDate: "2008-07-19",
    genres: ["Animation", "Family", "Fantasy"],
    rating: 8.0,
    runtime: 101,
    director: "Hayao Miyazaki",
    cast: ["Yuria Nara", "Hiroki Doi", "George Tokoro", "Yūki Amami"],
    overview: "A five-year-old boy develops a relationship with Ponyo, a goldfish princess who longs to become human after falling in love with him.",
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80", // Beautiful wave/ocean artwork
    backdropUrl: "https://images.unsplash.com/photo-1473116763269-255ea7b2b5f1?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/CsR3ZO0RJ58"
  },
  {
    id: 118,
    title: "The Truman Show",
    year: 1998,
    releaseDate: "1998-06-05",
    genres: ["Comedy", "Drama"],
    rating: 8.2,
    runtime: 103,
    director: "Peter Weir",
    cast: ["Jim Carrey", "Laura Linney", "Noah Emmerich", "Ed Harris"],
    overview: "An insurance salesman discovers his whole life is actually a reality TV show broadcasted 24/7 around the globe, and all people in his life are hired actors.",
    posterUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80", // Retro TV screen
    backdropUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dlnmQbPGuls"
  },
  {
    id: 119,
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
    releaseDate: "2004-03-19",
    genres: ["Romance", "Sci-Fi", "Drama"],
    rating: 8.3,
    runtime: 108,
    director: "Michel Gondry",
    cast: ["Jim Carrey", "Kate Winslet", "Kirsten Dunst", "Mark Ruffalo"],
    overview: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=80", // Surreal snowy beach
    backdropUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/yE-f1alkq9I"
  },
  {
    id: 120,
    title: "City of God",
    year: 2002,
    releaseDate: "2002-08-30",
    genres: ["Crime", "Drama", "International Cinema"],
    rating: 8.6,
    runtime: 130,
    director: "Fernando Meirelles",
    cast: ["Alexandre Rodrigues", "Leandro Firmino", "Phellipe Haagensen", "Douglas Silva"],
    overview: "In the slums of Rio de Janeiro, two kids' paths deviate: one struggles to become a photographer, while the other becomes a powerful drug lord.",
    posterUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop&q=80", // Bright Rio skyline / favela
    backdropUrl: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dcUOO4Itgmw"
  }
];

// Map TMDb genre IDs to string names
const TMDB_GENRES: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

export class TMDBService {
  private static apiKey: string = "";

  public static setApiKey(key: string) {
    this.apiKey = key.trim();
  }

  public static getApiKey() {
    return this.apiKey;
  }

  private static getHeaders() {
    return {
      accept: "application/json",
      Authorization: `Bearer ${this.apiKey}`
    };
  }

  // Returns true if using live API, false if fallback mock mode
  public static isLive() {
    return !!this.apiKey;
  }

  // Fetch from TMDB or Fallback
  public static async getTrendingToday(): Promise<Movie[]> {
    if (!this.isLive()) {
      return MOCK_MOVIES.slice(0, 8); // Return first 8 as trending
    }

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        { headers: this.getHeaders() }
      );
      if (!response.ok) throw new Error("TMDB request failed");
      const data = await response.json();
      return this.transformTMDBResults(data.results);
    } catch (e) {
      console.warn("Failed to fetch trending from TMDB. Using Mock.", e);
      return MOCK_MOVIES.slice(0, 8);
    }
  }

  public static async getCategoryMovies(category: string): Promise<Movie[]> {
    if (!this.isLive()) {
      // Return custom arrays based on category name
      switch (category.toLowerCase()) {
        case "hidden gems":
          return MOCK_MOVIES.filter(m => m.rating < 8.5 && m.rating >= 8.0);
        case "critically acclaimed":
          return MOCK_MOVIES.filter(m => m.rating >= 8.5);
        case "oscar winners":
          return [MOCK_MOVIES[0], MOCK_MOVIES[4], MOCK_MOVIES[8], MOCK_MOVIES[11], MOCK_MOVIES[14], MOCK_MOVIES[18]];
        case "recently released":
          return MOCK_MOVIES.filter(m => m.year >= 2018);
        case "classic movies":
          return MOCK_MOVIES.filter(m => m.year < 2005);
        case "international cinema":
          return MOCK_MOVIES.filter(m => m.title === "Parasite" || m.title === "Spirited Away" || m.title === "Cinema Paradiso" || m.title === "City of God" || m.title === "Ponyo");
        case "family movies":
          return MOCK_MOVIES.filter(m => m.genres.includes("Family") || m.genres.includes("Animation"));
        case "weekend picks":
          return [MOCK_MOVIES[1], MOCK_MOVIES[9], MOCK_MOVIES[10], MOCK_MOVIES[17]];
        case "trending today":
        default:
          return MOCK_MOVIES.slice(0, 8);
      }
    }

    // Live TMDb queries
    let endpoint = "";
    switch (category.toLowerCase()) {
      case "critically acclaimed":
        endpoint = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
        break;
      case "recently released":
        endpoint = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
        break;
      case "family movies":
        endpoint = "https://api.themoviedb.org/3/discover/movie?with_genres=10751&sort_by=popularity.desc&language=en-US";
        break;
      case "international cinema":
        endpoint = "https://api.themoviedb.org/3/discover/movie?with_original_language=ja|ko|fr|es|it&sort_by=popularity.desc&language=en-US";
        break;
      case "oscar winners":
        // Fallback to top_rated for general oscar simulation on TMDB
        endpoint = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2";
        break;
      case "hidden gems":
        // Fetch movie popular page 3/4 to simulate "hidden gems"
        endpoint = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=3";
        break;
      case "classic movies":
        endpoint = "https://api.themoviedb.org/3/discover/movie?release_date.lte=1999-12-31&sort_by=vote_average.desc&vote_count.gte=3000&language=en-US";
        break;
      case "weekend picks":
      default:
        endpoint = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
        break;
    }

    try {
      const response = await fetch(endpoint, { headers: this.getHeaders() });
      if (!response.ok) throw new Error("TMDB request failed");
      const data = await response.json();
      return this.transformTMDBResults(data.results);
    } catch (e) {
      console.warn(`Failed to fetch category ${category} from TMDB. Using Mock.`, e);
      return this.getCategoryMoviesMock(category);
    }
  }

  private static getCategoryMoviesMock(category: string): Movie[] {
    switch (category.toLowerCase()) {
      case "hidden gems":
        return MOCK_MOVIES.filter(m => m.rating < 8.5 && m.rating >= 8.0);
      case "critically acclaimed":
        return MOCK_MOVIES.filter(m => m.rating >= 8.5);
      case "oscar winners":
        return [MOCK_MOVIES[0], MOCK_MOVIES[4], MOCK_MOVIES[8], MOCK_MOVIES[11], MOCK_MOVIES[14]];
      case "recently released":
        return MOCK_MOVIES.filter(m => m.year >= 2018);
      case "classic movies":
        return MOCK_MOVIES.filter(m => m.year < 2005);
      case "international cinema":
        return MOCK_MOVIES.filter(m => m.title === "Parasite" || m.title === "Spirited Away" || m.title === "Cinema Paradiso" || m.title === "City of God");
      case "family movies":
        return MOCK_MOVIES.filter(m => m.genres.includes("Family") || m.genres.includes("Animation"));
      case "weekend picks":
      default:
        return [MOCK_MOVIES[1], MOCK_MOVIES[9], MOCK_MOVIES[10], MOCK_MOVIES[17]];
    }
  }

  // Searches movies by query
  public static async searchMovies(query: string): Promise<Movie[]> {
    if (!query || query.trim() === "") return [];

    if (!this.isLive()) {
      const q = query.toLowerCase().trim();
      return MOCK_MOVIES.filter(
        m =>
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.genres.some(g => g.toLowerCase().includes(q)) ||
          m.cast.some(c => c.toLowerCase().includes(q))
      );
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        { headers: this.getHeaders() }
      );
      if (!response.ok) throw new Error("TMDB search failed");
      const data = await response.json();
      return this.transformTMDBResults(data.results);
    } catch (e) {
      console.warn("Failed to search from TMDB. Using Mock search.", e);
      const q = query.toLowerCase().trim();
      return MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(q));
    }
  }

  // Fetch detailed movie by ID
  public static async getMovieDetails(id: number): Promise<Movie | null> {
    const mock = MOCK_MOVIES.find(m => m.id === id);

    if (!this.isLive()) {
      return mock || null;
    }

    // If it's one of our local custom IDs (e.g. 101 - 120), return the mock data directly
    if (id >= 100 && id <= 150) {
      return mock || null;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos,recommendations&language=en-US`,
        { headers: this.getHeaders() }
      );
      if (!response.ok) throw new Error("TMDB details failed");
      const data = await response.json();
      return this.transformMovieDetails(data);
    } catch (e) {
      console.warn(`Failed to fetch details for movie ${id}. Using Mock if available.`, e);
      return mock || null;
    }
  }

  // Fetch similar movies
  public static async getSimilarMovies(id: number): Promise<Movie[]> {
    if (!this.isLive() || (id >= 100 && id <= 150)) {
      const movie = MOCK_MOVIES.find(m => m.id === id);
      if (!movie) return MOCK_MOVIES.slice(0, 4);
      // Filter movies that share at least one genre
      return MOCK_MOVIES.filter(
        m => m.id !== id && m.genres.some(g => movie.genres.includes(g))
      ).slice(0, 4);
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        { headers: this.getHeaders() }
      );
      if (!response.ok) throw new Error("TMDB similar failed");
      const data = await response.json();
      return this.transformTMDBResults(data.results.slice(0, 4));
    } catch (e) {
      console.warn(`Failed to fetch similar movies for ${id}. Using Mock.`, e);
      const movie = MOCK_MOVIES.find(m => m.id === id);
      const genres = movie ? movie.genres : [];
      return MOCK_MOVIES.filter(m => m.id !== id && m.genres.some(g => genres.includes(g))).slice(0, 4);
    }
  }

  // Helper to transform list results
  private static transformTMDBResults(results: any[]): Movie[] {
    if (!results) return [];
    return results.map(r => {
      const genres = r.genre_ids ? r.genre_ids.map((id: number) => TMDB_GENRES[id] || "").filter(Boolean) : [];
      const year = r.release_date ? new Date(r.release_date).getFullYear() : 0;
      
      return {
        id: r.id,
        title: r.title,
        year: year,
        releaseDate: r.release_date || "",
        genres: genres.length > 0 ? genres : ["Drama"], // Default fallback
        rating: parseFloat(r.vote_average?.toFixed(1)) || 0,
        runtime: 120, // Default fallback, details needed for exact runtime
        director: "Unknown Director", // Details needed for director
        cast: [], // Details needed for cast
        overview: r.overview || "No overview available.",
        posterUrl: r.poster_path 
          ? `https://image.tmdb.org/t/p/w500${r.poster_path}` 
          : "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=80",
        backdropUrl: r.backdrop_path 
          ? `https://image.tmdb.org/t/p/w1280${r.backdrop_path}` 
          : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80",
        trailerUrl: ""
      };
    });
  }

  // Helper to transform detailed movie result
  private static transformMovieDetails(r: any): Movie {
    const genres = r.genres ? r.genres.map((g: any) => g.name) : [];
    const year = r.release_date ? new Date(r.release_date).getFullYear() : 0;
    
    // Extract director and cast
    let director = "Unknown Director";
    let cast: string[] = [];
    if (r.credits) {
      const dirObj = r.credits.crew.find((c: any) => c.job === "Director");
      if (dirObj) director = dirObj.name;
      cast = r.credits.cast.slice(0, 4).map((c: any) => c.name);
    }

    // Extract youtube trailer
    let trailerUrl = "";
    if (r.videos && r.videos.results) {
      const trailer = r.videos.results.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
      if (trailer) {
        trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
      } else if (r.videos.results.length > 0) {
        trailerUrl = `https://www.youtube.com/embed/${r.videos.results[0].key}`;
      }
    }

    return {
      id: r.id,
      title: r.title,
      year: year,
      releaseDate: r.release_date || "",
      genres: genres,
      rating: parseFloat(r.vote_average?.toFixed(1)) || 0,
      runtime: r.runtime || 120,
      director: director,
      cast: cast,
      overview: r.overview || "No overview available.",
      posterUrl: r.poster_path 
        ? `https://image.tmdb.org/t/p/w500${r.poster_path}` 
        : "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=80",
      backdropUrl: r.backdrop_path 
        ? `https://image.tmdb.org/t/p/w1280${r.backdrop_path}` 
        : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80",
      trailerUrl: trailerUrl
    };
  }
}
