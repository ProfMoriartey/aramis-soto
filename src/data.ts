// src/data.ts

// ---------- Types ----------
export type Item = { title: string; note: string; rating: number };
export type CategoryKey = "movies" | "shows" | "anime" | "food" | "games" | "books";

export type Catalog = Record<CategoryKey, Item[]>;

// ---------- Data ----------

export const categoryDescriptions: Record<CategoryKey, string> = {
  movies: "Films that shouldn’t work but somehow exist.",
  shows: "Television at its strangest and most oddly compelling.",
  anime: "Animated chaos with questionable life lessons.",
  food: "Meals that blur the line between bravery and regret.",
  games: "Digital nightmares we willingly sign up for.",
  books: "Reading material nobody asked for, yet here we are.",
};

export const catalog: Catalog = {
  movies: [
    { title: "Shrek 2", note: "objectively the peak of Western civilization", rating: 10 },
    { title: "Cats (2019)", note: "a movie that dared to ask: should this exist?", rating: 8 },
    { title: "The Emoji Movie", note: "proof humanity went too far", rating: 7 },
    { title: "Final Destination 7", note: "teaches valuable lessons about seatbelts", rating: 8 },
    { title: "Alvin and the Chipmunks", note: "surprisingly avant-garde if you squint", rating: 7 },
    { title: "Human Centipede", note: "a film you can’t unsee, no matter how hard you try", rating: 6 },
    { title: "Sharknado 6", note: "gravity and logic took a vacation", rating: 8 },
    { title: "Teletubbies: The Movie", note: "not all heroes wear capes, some carry vacuum cleaners", rating: 7 },
    { title: "Morbius", note: "a cult classic, if the cult only had one member", rating: 9 },
    { title: "Barbie vs. Godzilla", note: "the crossover Hollywood is too afraid to make", rating: 10 },
  ],
  shows: [
    { title: "Man vs. Food", note: "a beautiful tragedy every episode", rating: 8 },
    { title: "Keeping Up with the Kardashians", note: "Shakespeare, but with better lighting", rating: 7 },
    { title: "Extreme Couponing", note: "the true horror genre", rating: 8 },
    { title: "Airport Security: Romania", note: "edge-of-your-seat luggage drama", rating: 9 },
    { title: "My Strange Addiction", note: "the Olympics of questionable hobbies", rating: 7 },
    { title: "Toddlers & Tiaras", note: "chaos in sequins", rating: 8 },
    { title: "Love Island: Transylvania", note: "romance with extra garlic", rating: 7 },
    { title: "World’s Worst Roommate", note: "finally, representation", rating: 9 },
    { title: "Ancient Aliens", note: "science, but with more hand gestures", rating: 8 },
    { title: "90 Day Fiancé", note: "true love measured in Wi-Fi strength", rating: 9 },
  ],
  anime: [
    { title: "Boku no Pico", note: "not recommended, yet always recommended", rating: 2 },
    { title: "Attack on Snails", note: "slower than expected, but dramatic", rating: 7 },
    { title: "Dragon Ball: Jazz Fusion Arc", note: "power levels over 9000, sax solos too", rating: 9 },
    { title: "One Piece", note: "approximately the same length as eternity", rating: 8 },
    { title: "Naruto: Funky Ninja Chronicles", note: "believe it, or don’t", rating: 7 },
    { title: "Death Note", note: "great for grocery lists", rating: 9 },
    { title: "Fullmetal Tourist", note: "alchemy meets budget airlines", rating: 8 },
    { title: "JoJo’s Bizarre Adventure", note: "poses so strong they break spines", rating: 10 },
    { title: "Pokémon", note: "collectible animal abuse, but wholesome", rating: 8 },
    { title: "Sailor Moon", note: "crime-fighting, outfit-changing efficiency", rating: 9 },
  ],
  food: [
    { title: "Gas station sushi", note: "diesel-flavored fine dining", rating: 7 },
    { title: "Expired instant noodles", note: "extra crunch included", rating: 6 },
    { title: "Mystery meat skewers", note: "festival delicacy, probably", rating: 8 },
    { title: "Black coffee + Red Bull", note: "productivity and regret in one can", rating: 9 },
    { title: "Three-day-old kebab", note: "time adds flavor, allegedly", rating: 7 },
    { title: "Durian pizza", note: "smells illegal, tastes unforgettable", rating: 5 },
    { title: "Plane food", note: "best served with turbulence", rating: 8 },
    { title: "Romanian garlic soup", note: "doubles as vampire repellent", rating: 8 },
    { title: "Pickles in energy drink", note: "nobody asked for this combo", rating: 4 },
    { title: "Hotel minibar peanuts", note: "luxury, if you ignore the price", rating: 9 },
  ],
  games: [
    { title: "Five Nights at Freddy’s", note: "proof jump scares still work", rating: 9 },
    { title: "Silent Hill 2", note: "trauma in playable form", rating: 10 },
    { title: "Outlast", note: "sprint button was the real MVP", rating: 7 },
    { title: "Amnesia: The Dark Descent", note: "darkness has never been cheaper", rating: 8 },
    { title: "Resident Evil 4", note: "zombie shooting with Spanish lessons", rating: 9 },
    { title: "Dead by Daylight", note: "teamwork is optional, screaming is not", rating: 8 },
    { title: "Phasmophobia", note: "ghost hunting, mostly screaming", rating: 7 },
    { title: "Layers of Fear", note: "paintings that stare back", rating: 7 },
    { title: "Until Dawn", note: "decisions you’ll instantly regret", rating: 8 },
    { title: "P.T.", note: "cancelled, but still terrifying", rating: 10 },
  ],
  books: [
    { title: "IKEA Instruction Manuals", note: "existential puzzles disguised as furniture", rating: 8 },
    { title: "Twilight: Jazz Band AU", note: "jazz hands meet vampire hands", rating: 7 },
    { title: "The Subtle Art of Not Giving a Funk", note: "life advice in neon orange", rating: 9 },
    { title: "Lonely Planet: Nowhere Edition", note: "the guidebook to nothing", rating: 8 },
    { title: "How to Survive Hostel Roommates", note: "spoiler: you don’t", rating: 8 },
    { title: "Fifty Shades of Funk", note: "not suitable for book clubs", rating: 6 },
    { title: "Jazz for Dummies", note: "complexity in stick-figure form", rating: 8 },
    { title: "Cooking with Expired Food", note: "recipes nobody dared to publish", rating: 7 },
    { title: "Kafka on the Funk", note: "metamorphosis, but funky", rating: 9 },
    { title: "Diary of a Wimpy Funk Master", note: "the autobiography we didn’t know we needed", rating: 10 },
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
  TR: { 
    stayDuration: "15 months total", 
    stayDate: "21 Sep 2021 – 19 Aug 2022, 26 Nov 2022 – 24 Dec 2022, 6 Aug 2023 – 2 Sep 2023, 1 Feb 2024 – 1 Mar 2024, 6 Aug 2024 – 3 Sep 2024", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  GE: { 
    stayDuration: "8 months total", 
    stayDate: "20 Aug 2022 – 26 Nov 2022, 11 Feb 2023 – 2 Jul 2023, 5 May 2024 – 20 Jul 2024", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  RS: { 
    stayDuration: "1 month", 
    stayDate: "24 Dec 2022 – 21 Jan 2023", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  ME: { 
    stayDuration: "20 days", 
    stayDate: "21 Jan 2023 – 10 Feb 2023", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  UZ: { 
    stayDuration: "13 days", 
    stayDate: "2 Jul 2023 – 14 Jul 2023", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  KZ: { 
    stayDuration: "22 days", 
    stayDate: "15 Jul 2023 – 5 Aug 2023", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  IN: { 
    stayDuration: "1 month 25 days", 
    stayDate: "3 Sep 2023 – 28 Oct 2023", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  TH: { 
    stayDuration: "21 days", 
    stayDate: "28 Oct 2023 – 18 Nov 2023", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  MY: { 
    stayDuration: "1 month 2 days", 
    stayDate: "18 Nov 2023 – 20 Dec 2023", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  ID: { 
    stayDuration: "17 days", 
    stayDate: "21 Dec 2023 – 6 Jan 2024", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  PH: { 
    stayDuration: "25 days", 
    stayDate: "6 Jan 2024 – 31 Jan 2024", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  BG: { 
    stayDuration: "53 days total", 
    stayDate: "1 Mar 2024 – 29 Mar 2024, 2 Apr 2024 – 27 Apr 2024", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  MK: { 
    stayDuration: "2 days", 
    stayDate: "30 Mar 2024 – 1 Apr 2024", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  RO: { 
    stayDuration: "7 days", 
    stayDate: "28 Apr 2024 – 4 May 2024", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  RU: { 
    stayDuration: "15 days", 
    stayDate: "21 Jul 2024 – 5 Aug 2024", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
  DE: { 
    stayDuration: "2 days", 
    stayDate: "3 Sep 2024 – 5 Sep 2024", 
    overallExperience: 6.9, 
    notes: "Still bing measured on the funckyness scale . . . " 
  },
};

// Fallback dataset for countries not visited yet
export const notVisitedTemplate: CountryEntry = {
  stayDuration: "Until funckyness is achived",
  stayDate: "Not set yet, but soon the whole world will know the taste of the Funck",
  overallExperience: undefined,    // no score yet
  notes: "To be funcked",
};

// --- NEW: Country photos ---
export type CountryPhoto = {
  url: string;          // absolute or /public path
  alt?: string;         // image alt text
  caption?: string;     // short description
};

// Keyed by ISO-3166 alpha-2 (UPPERCASE)
export const countryPhotos: Record<string, CountryPhoto[]> = {
  BG: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3rbJCtPxlY6aKF0yztOW9Tdq5XjZNAxmrhb3S", alt: "bulgaria1-4", caption: "bulgaria1-4.jpg" },
  ],
  GE: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3JaUtRZGaqA6yd1xC9XjpFZcYkSQVHPsmRBKr", alt: "georgia1-2", caption: "georgia1-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3LD2qblBiU8M0pRYoQvfnu9IkVBxt3X6l1z7G", alt: "georgia3-3", caption: "georgia3-3.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3nbFvbBpyDqL0mEl3waKSdVgzkryN6boxpOYC", alt: "georgia3-1", caption: "georgia3-1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3BmDNHBZzmu5QoLhRsYHFnkxwIGc9X8bV6NEZ", alt: "georgia3-4", caption: "georgia3-4.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3zS7UEUMKriMfETts6D5wUvjaNSqyXFCzOokb", alt: "georgia3-2", caption: "georgia3-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG34RusHzLmB9hKrkJLWnxjT51C6UEs3aqvbwAD", alt: "georgia2-2", caption: "georgia2-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3akTVCY0XnVCh9pYMZgPm2qu36IxctT48dsej", alt: "Random photos from Tbilisi, autumn 2022.", caption: "Random photos from Tbilisi, autumn 2022.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3V6AwnWlZkmFIlC3PAKT2b5GLpBe9QgtyzYhR", alt: "More random stuff from Tbilisi, spring 2023.", caption: "More random stuff from Tbilisi, spring 2023.jpg" },
  ],
  ID: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3KdcKYBqthe0UiCV4knWRMfrTLZqA25JpKoyG", alt: "indonesia1-2", caption: "indonesia1-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3JU8jxWdGaqA6yd1xC9XjpFZcYkSQVHPsmRBK", alt: "indonesia1-1", caption: "indonesia1-1.jpg" },
  ],
  IN: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3Etfhm2JHNkV5QqA0PzHX9LgOUocZvywRm73n", alt: "india1-1", caption: "india1-1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3Teglq65EBwKnHCMpi8fIPUDYxNvSVbOayAtj", alt: "india1-3", caption: "india1-3.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3ruchc2kxlY6aKF0yztOW9Tdq5XjZNAxmrhb3", alt: "india1-2", caption: "india1-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3P5q46HbAh0sgMwWZ8lGvY1LKQkfy4bdJEe6n", alt: "Taj Mahal, Agra, India, September 2023", caption: "Taj Mahal, Agra, India, September 2023.webp" },
  ],
  KZ: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG36GpPiZkUv4opVJsaElCQZPDTAOkq5rGYd3uj", alt: "kazakhstan1-4", caption: "kazakhstan1-4.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3rnYdycxlY6aKF0yztOW9Tdq5XjZNAxmrhb3S", alt: "kazakhstan1-6", caption: "kazakhstan1-6.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3B23NIyzmu5QoLhRsYHFnkxwIGc9X8bV6NEZO", alt: "kazakhstan1-2", caption: "kazakhstan1-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3ogJuKMX3YAux1Get6gWhcUZ27b4H9smXl0zP", alt: "kazakhstan1-3", caption: "kazakhstan1-3.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3hGpS0GEu7AbEPfIcJgpTQLjeq2woXd06FB3W", alt: "kazakhstan1-5", caption: "kazakhstan1-5.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3zFgi2kZMKriMfETts6D5wUvjaNSqyXFCzOok", alt: "kazakhstan1-1", caption: "kazakhstan1-1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3xRaZat9iXQu6CW0bOrM4LHdzBhwEPo7t93jI", alt: "Ile-Alatau National Park, Almaty, Kazakhstan, pt.2, July 2023.", caption: "Ile-Alatau National Park, Almaty, Kazakhstan, pt.2, July 2023.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3aXZz39o0XnVCh9pYMZgPm2qu36IxctT48dse", alt: "Ascension Cathedral, Almaty, Kazakhstan, July 2023.", caption: "Ascension Cathedral, Almaty, Kazakhstan, July 2023.jpg" },
  ],
  ME: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3w9LVif6rUvIGfKnA1XTJHuF8V4M73yq2ciOD", alt: "montenegro1-1", caption: "montenegro1-1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3RcOAZpKPwcXvqaS14sbx306iCEpYL5hGZoTe", alt: "montenegro1-2", caption: "montenegro1-2.jpg" },
  ],
  MK: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3goHPUcVLjUb4pJ3ZID8lCsNxE01vKB6QtPhy", alt: "north-macedonia1-3", caption: "north-macedonia1-3.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3X5jNY7eT9ul3GraZ6FegdonvOWzwUsiDImJR", alt: "north-macedonia1-1", caption: "north-macedonia1-1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3ogluIdsX3YAux1Get6gWhcUZ27b4H9smXl0z", alt: "north-macedonia1-4", caption: "north-macedonia1-4.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3JVqOPqGaqA6yd1xC9XjpFZcYkSQVHPsmRBKr", alt: "north-macedonia1-2", caption: "north-macedonia1-2.jpg" },
  ],
  MY: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3oQLaGcX3YAux1Get6gWhcUZ27b4H9smXl0zP", alt: "malaysia1-2", caption: "malaysia1-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG35rur9XczSAQbdnUX8ZMxtDgKcq6JL9eNljIp", alt: "malaysia1-4", caption: "malaysia1-4.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG34AH7s7LmB9hKrkJLWnxjT51C6UEs3aqvbwAD", alt: "malaysia1-5", caption: "malaysia1-5.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG35wGkxZOczSAQbdnUX8ZMxtDgKcq6JL9eNljI", alt: "malaysia1-3", caption: "malaysia1-3.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3bDZRCWp1BTwEcQazgqlhy09tukiKWNVIHUfo", alt: "malaysia1-1", caption: "malaysia1-1.jpg" },
  ],
  PH: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3WzmNhSrutUqhLGv6nJOMIYHT8jmxsXc5fZzA", alt: "philippines1-1", caption: "philippines1-1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3zQF1GTMKriMfETts6D5wUvjaNSqyXFCzOokb", alt: "philippines1-3", caption: "philippines1-3.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3bQBQ6Dp1BTwEcQazgqlhy09tukiKWNVIHUfo", alt: "philippines1-4", caption: "philippines1-4.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3KhUJecqthe0UiCV4knWRMfrTLZqA25JpKoyG", alt: "philippines1-2", caption: "philippines1-2.jpg" },
  ],
  RS: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3eOJn4vgubh5xzFZykS1Wmrqcv6N8w7oDIGMQ", alt: "serbia1-4", caption: "serbia1-4.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3E2TOdaHNkV5QqA0PzHX9LgOUocZvywRm73ns", alt: "serbia1-3", caption: "serbia1-3.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3zqZSieMKriMfETts6D5wUvjaNSqyXFCzOokb", alt: "serbia1", caption: "serbia1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3xLVTv59iXQu6CW0bOrM4LHdzBhwEPo7t93jI", alt: "serbia1-2", caption: "serbia1-2.jpg" },
  ],
  RU: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3GgNya4Qgi9Tn8CRmkPrVejASwKv417Hol2d3", alt: "russia1-3", caption: "russia1-3.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3YWvRoy7du6RwFNDQMikvVWsehJjqB1p80rGK", alt: "russia1-7", caption: "russia1-7.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3OyyzbOOfvR7nUxBZ3H9EWwyYpOi6TVzILraS", alt: "russia1-4", caption: "russia1-4.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3n09JReyDqL0mEl3waKSdVgzkryN6boxpOYCI", alt: "russia1-2", caption: "russia1-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3bLFXE9bp1BTwEcQazgqlhy09tukiKWNVIHUf", alt: "russia1-6", caption: "russia1-6.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3obn37AX3YAux1Get6gWhcUZ27b4H9smXl0zP", alt: "russia1-1", caption: "russia1-1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3JrEJu0GaqA6yd1xC9XjpFZcYkSQVHPsmRBKr", alt: "from-russia-with-love", caption: "from-russia-with-love.jpg" },
  ],
  TH: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG39Yx779uDKWXljPx8VhARpvuGIZm2YyM5rz0b", alt: "thailand1-1", caption: "thailand1-1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3IMWx4BYK9zmEePfVRcdC2ybUSZ6isYFWAaL7", alt: "thailand1-4", caption: "thailand1-4.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3BNBNGHzmu5QoLhRsYHFnkxwIGc9X8bV6NEZO", alt: "thailand1-5", caption: "thailand1-5.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3FTZnF1aUXinLRQA83HWGzxDZfgObytohp2IB", alt: "thailand1-3", caption: "thailand1-3.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3XcpVHReT9ul3GraZ6FegdonvOWzwUsiDImJR", alt: "thailand1-2", caption: "thailand1-2.jpg" },
  ],
  TR: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3fH5KRgnsXjHSoJPdT5KWvRL2i6ElnqD0aebB", alt: "turkey2-4", caption: "turkey2-4.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kH8KMFChBM8X02faJLycrPl96tqbSKuWID4h", alt: "turkey2", caption: "turkey2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3xs6wHI9iXQu6CW0bOrM4LHdzBhwEPo7t93jI", alt: "turkey4-7", caption: "turkey4-7.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3p267eT4uGR1EnsDICWdxiXf0QlZ4z8tHLV9O", alt: "turkey4-5", caption: "turkey4-5.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3NrTTsXJWMY7beRzp9AvONU5ZCHyarQwdu216", alt: "turkey3-1", caption: "turkey3-1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3nosqBayDqL0mEl3waKSdVgzkryN6boxpOYCI", alt: "turkey2-2", caption: "turkey2-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3BJT8YSzmu5QoLhRsYHFnkxwIGc9X8bV6NEZO", alt: "turkey4-2", caption: "turkey4-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG31VefBLtoefd4BhzY095VGLwyiJxagQs2WcMR", alt: "turkey2-1", caption: "turkey2-1.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3WxxJ3y6SrutUqhLGv6nJOMIYHT8jmxsXc5fZ", alt: "turkey1-2", caption: "turkey1-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG37y9tEbTUD291dxHcjwO84hoEGMgPau5nNKzB", alt: "erdek-cutie", caption: "erdek-cutie.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hv", alt: "erdek-cutie", caption: "erdek-cutie.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3Lao1MfBiU8M0pRYoQvfnu9IkVBxt3X6l1z7G", alt: "Trip to Erdek, pt.1, August 2023.", caption: "Trip to Erdek, pt.1, August 2023.jpg" },
  ],
  UZ: [
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG30MEU29oJFXpIgM9Bizc72HLGDwQCf8mKNEn0", alt: "uzbekistan1-2", caption: "uzbekistan1-2.jpg" },
    { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3XVWTK4KeT9ul3GraZ6FegdonvOWzwUsiDImJ", alt: "Magic City Park and random photos from Tashkent, Uzbekistan, June 2023.", caption: "Magic City Park and random photos from Tashkent, Uzbekistan, June 2023.jpg" },
  ],
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

export type AwesomeItem = {
  title: string;
  description: string;
  image: { url: string; alt?: string };
  // Optional: force side for the image; otherwise alternates by index
  side?: "left" | "right";
};

// Fill this array with your entries (order = display order).
export const awesomeness: AwesomeItem[] = [
  {
    title: "Why he does X",
    description: "lorem50https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hvhttps://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hvhttps://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hvhttps://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hvhttps://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hv",
    image: { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hv", alt: "Aramis doing X" },
    side: "left", // or "right" (optional)
  },
  {
    title: "Why he does w",
    description: "lorem50https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hvhttps://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hvhttps://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hvhttps://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hvhttps://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hv",
    image: { url: "https://mr4v9rgsnq.ufs.sh/f/jf84pSwRMaG3kvsUU7hBM8X02faJLycrPl96tqbSKuWID4hv", alt: "Aramis doing X" },
    side: "right", // or "right" (optional)
  },
];
