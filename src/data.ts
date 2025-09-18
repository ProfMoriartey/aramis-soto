// src/data.ts

// ---------- Types ----------
export type Item = { title: string; rating: number };
export type CategoryKey = "movies" | "shows" | "anime" | "food" | "games" | "books";

export type Catalog = Record<CategoryKey, Item[]>;

// ---------- Data ----------

export const categoryDescriptions: Record<CategoryKey, string> = {
  movies: "Films that stuck with me. Story, pacing, and rewatch value matter.",
  shows: "Series I’d recommend start to finish. Strong arcs, no filler.",
  anime: "Standouts across genres. Memorable characters and music.",
  food: "Standouts across genres. Memorable characters and music.",
  games: "Tight gameplay and mood. Finished or near-finished titles only.",
  books: "Reads that shaped how I think, work, or create.",
};
export const catalog: Catalog = {
  movies: [
    { title: "The Matrix", rating: 10 },
    { title: "LOTR: ROTK", rating: 10 },
    { title: "Inception", rating: 9 },
    { title: "Blade Runner", rating: 9 },
    { title: "Arrival", rating: 9 },
    { title: "Whiplash", rating: 9 },
    { title: "Her", rating: 8 },
    { title: "Interstellar", rating: 8 },
    { title: "Parasite", rating: 8 },
    { title: "Dune", rating: 8 },
  ],
  shows: [
    { title: "GOT", rating: 9 },
    { title: "Breaking Bad", rating: 10 },
    { title: "The Bear", rating: 9 },
    { title: "Chernobyl", rating: 9 },
    { title: "Dark", rating: 9 },
    { title: "Fargo", rating: 8 },
    { title: "Better Call Saul", rating: 9 },
    { title: "Band of Brothers", rating: 10 },
    { title: "Narcos", rating: 8 },
    { title: "Severance", rating: 9 },
  ],
  anime: [
    { title: "OPM", rating: 8 },
    { title: "FMAB", rating: 10 },
    { title: "Cowboy Bebop", rating: 9 },
    { title: "JJK", rating: 8 },
    { title: "Death Note", rating: 9 },
    { title: "Demon Slayer", rating: 8 },
    { title: "Haikyuu!!", rating: 8 },
    { title: "Trigun", rating: 8 },
    { title: "Mob 100", rating: 9 },
    { title: "OP", rating: 8 },
  ],
   food: [
    { title: "OPM", rating: 8 },
    { title: "FMAB", rating: 10 },
    { title: "Cowboy Bebop", rating: 9 },
    { title: "JJK", rating: 8 },
    { title: "Death Note", rating: 9 },
    { title: "Demon Slayer", rating: 8 },
    { title: "Haikyuu!!", rating: 8 },
    { title: "Trigun", rating: 8 },
    { title: "Mob 100", rating: 9 },
    { title: "OP", rating: 8 },
  ],
  games: [
    { title: "Hades", rating: 9 },
    { title: "INSIDE", rating: 8 },
    { title: "Celeste", rating: 10 },
    { title: "The Witcher 3", rating: 10 },
    { title: "Hollow Knight", rating: 10 },
    { title: "Portal 2", rating: 10 },
    { title: "Elden Ring", rating: 9 },
    { title: "Disco Elysium", rating: 10 },
    { title: "Journey", rating: 9 },
    { title: "Ori", rating: 9 },
  ],
  books: [
    { title: "The Hobbit", rating: 10 },
    { title: "1984", rating: 10 },
    { title: "Brave New World", rating: 9 },
    { title: "The Catcher in the Rye", rating: 8 },
    { title: "Sapiens", rating: 9 },
    { title: "Meditations", rating: 9 },
    { title: "The Alchemist", rating: 8 },
    { title: "To Kill a Mockingbird", rating: 10 },
    { title: "The Name of the Wind", rating: 9 },
    { title: "Dune (Novel)", rating: 10 },
  ],
};

// ---------- Labels ----------
export const labels: Record<CategoryKey, string> = {
  movies: "Movies",
  shows: "TV Shows",
  anime: "Anime",
  food: "Food",
  games: "Games",
  books: "Books",
};

// Trip details per country (keyed by ISO-3166 alpha-2, UPPERCASE)
export type CountryEntry = {
  stayDuration?: string;        // e.g., "2 weeks", "5 days"
  stayDate?: string;            // e.g., "Jun 2023"
  overallExperience?: number;   // 1..10
  notes?: string;               // optional short note
};

export const countryEntries: Record<string, CountryEntry> = {
  TR: { stayDuration: "3 months", stayDate: "Apr–Jun 2023", overallExperience: 9, notes: "Istanbul + Cappadocia." },
  ES: { stayDuration: "4 weeks",  stayDate: "Sep 2022",      overallExperience: 8, notes: "Madrid, Seville, Granada." },
  JP: { stayDuration: "10 days",  stayDate: "Nov 2024",      overallExperience: 9, notes: "Tokyo + Kyoto." },
  // Add more as you go…
};

// Fallback dataset for countries not visited yet
export const notVisitedTemplate: CountryEntry = {
  stayDuration: "—",
  stayDate: "—",
  overallExperience: undefined,    // no score yet
  notes: "Not visited yet. Planning and research in progress.",
};

// --- NEW: Country photos ---
export type CountryPhoto = {
  url: string;          // absolute or /public path
  alt?: string;         // image alt text
  caption?: string;     // short description
};

// Keyed by ISO-3166 alpha-2 (UPPERCASE)
export const countryPhotos: Record<string, CountryPhoto[]> = {
  TR: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3Lao1MfBiU8M0pRYoQvfnu9IkVBxt3X6l1z7G", alt: "Bosphorus view", caption: "Trip to Erdek, pt.1, August 2023." },
     ],
  GE: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3akTVCY0XnVCh9pYMZgPm2qu36IxctT48dsej", alt: "La Giralda", caption: "Random photos from Tbilisi, autumn 2022." },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3V6AwnWlZkmFIlC3PAKT2b5GLpBe9QgtyzYhR", alt: "La Giralda", caption: "More random stuff from Tbilisi, spring 2023." },
  ],
  JP: [
    { url: "/photos/jp/kyoto-torii.jpg", alt: "Fushimi Inari", caption: "Torii gates in Kyoto" },
  ],
  // Countries without photos can be omitted; page will handle it gracefully.
};

export type Photo = { url: string; alt?: string; caption?: string };

export type InstrumentKey = "guitar" | "piano" | "bass" | "sax" | "drums";

export type Instrument = {
  key: InstrumentKey;
  title: string;
  cover: Photo;          // main instrument image
  description: string;   // short text about the instrument
  gallery: Photo[];      // photos of Aramis playing
};

export const instruments: Record<InstrumentKey, Instrument> = {
  guitar: {
    key: "guitar",
    title: "Guitar",
    cover: {
      url: "/music/instruments/guitar.jpg",
      alt: "Electric guitar on a stand",
    },
    description:
      "Rhythm and melodic lines. Focus on tight timing, voicings, and comping for small jazz setups.",
    gallery: [
      {
        url: "/guitar-session-1.jpg",
        alt: "Aramis playing guitar in rehearsal",
        caption: "Rehearsal take—comping behind a sax solo.",
      },
      {
        url: "/music/aramis/guitar-session-2.jpg",
        alt: "Aramis guitar close-up",
        caption: "Chord melody study with a clean tone.",
      },
    ],
  },
  piano: {
    key: "piano",
    title: "Piano",
    cover: { url: "/music/instruments/piano.jpg", alt: "Upright piano" },
    description:
      "Harmony lab. Writing voicings, reharmonizing standards, and sketching ideas.",
    gallery: [
      {
        url: "/music/aramis/piano-1.jpg",
        alt: "Aramis at the piano",
        caption: "Voicing drill—shells and tensions.",
      },
    ],
  },
  bass: {
    key: "bass",
    title: "Bass",
    cover: { url: "/music/instruments/bass.jpg", alt: "Electric bass" },
    description:
      "Groove anchor. Locking with drums, walking lines, and clean articulation.",
    gallery: [
      {
        url: "/music/aramis/bass-1.jpg",
        alt: "Aramis on bass with the band",
        caption: "Walking line over rhythm changes.",
      },
    ],
  },
  sax: {
    key: "sax",
    title: "Saxophone",
    cover: { url: "/music/instruments/sax.jpg", alt: "Alto sax on table" },
    description:
      "Tone work and phrasing. Long tones, transcriptions, and motif development.",
    gallery: [
      {
        url: "/music/aramis/sax-1.jpg",
        alt: "Aramis playing sax",
        caption: "Ballad practice—breath control focus.",
      },
    ],
  },
  drums: {
    key: "drums",
    title: "Drums",
    cover: { url: "/music/instruments/drums.jpg", alt: "Drum kit" },
    description:
      "Timekeeping and dynamics. Brush work, ride patterns, and trading fours.",
    gallery: [
      {
        url: "/music/aramis/drums-1.jpg",
        alt: "Aramis on drums",
        caption: "Brushes on a medium swing.",
      },
    ],
  },
};

export const instrumentLabels: Record<InstrumentKey, string> = {
  guitar: "Guitar",
  piano: "Piano",
  bass: "Bass",
  sax: "Saxophone",
  drums: "Drums",
};

export type FunkyPhoto = { url: string; alt?: string; caption?: string };

export const funkyPhotos: FunkyPhoto[] = [
  { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hv", alt: "Jam night", caption: "Just feeling cute in the morning" },
  { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3Nr9lObGWMY7beRzp9AvONU5ZCHyarQwdu216", alt: "Street shot", caption: "Hanging out in Uludag forest as best bros" },
  { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3t5LczVJvac4DFIV27Bde9QzunpHrbs3hUYPN", alt: "Studio take", caption: "Enjoying and getting inspired by nature to play fine tunes on a fine piece of wood (Melodica)" },
  // add more…
];