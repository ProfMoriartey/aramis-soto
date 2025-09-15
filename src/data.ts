// src/data.ts

// ---------- Types ----------
export type Item = { title: string; rating: number };
export type CategoryKey = "movies" | "shows" | "anime" | "games" | "books";

export type Catalog = Record<CategoryKey, Item[]>;

// ---------- Data ----------


export const categoryDescriptions: Record<CategoryKey, string> = {
  movies: "Films that stuck with me. Story, pacing, and rewatch value matter.",
  shows: "Series I’d recommend start to finish. Strong arcs, no filler.",
  anime: "Standouts across genres. Memorable characters and music.",
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
  games: "Games",
  books: "Books",
};
