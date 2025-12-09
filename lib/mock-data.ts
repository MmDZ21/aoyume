import { MediaItem } from "@/components/carousel/MediaCard";

export const mockRelatedItems: MediaItem[] = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "/images/aot.jpg",
    rating: 9.0,
    year: 2013,
    duration: "24m",
    description: "Humans fight against Titans.",
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "/images/aot.jpg", // Placeholder
    rating: 8.9,
    year: 2019,
    duration: "24m",
    description: "Tanjiro fights demons.",
  },
  {
    id: 3,
    title: "Fullmetal Alchemist",
    image: "/images/aot.jpg", // Placeholder
    rating: 9.1,
    year: 2009,
    duration: "24m",
    description: "Brothers search for Philosopher's Stone.",
  },
];

export const mockSimilarItems: MediaItem[] = [
  {
    id: 6,
    title: "Jujutsu Kaisen",
    image: "/images/jujutsu.jpg",
    rating: 8.7,
    year: 2020,
    duration: "24m",
    description:
      "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed.",
  },
  {
    id: 7,
    title: "Chainsaw Man",
    image: "/images/jujutsu.jpg", // Placeholder
    rating: 8.5,
    year: 2022,
    duration: "24m",
    description: "Denji turns into Chainsaw Man.",
  },
  {
    id: 8,
    title: "Bleach",
    image: "/images/jujutsu.jpg", // Placeholder
    rating: 8.2,
    year: 2004,
    duration: "24m",
    description: "Ichigo becomes a Soul Reaper.",
  },
];

