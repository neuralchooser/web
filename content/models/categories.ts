import type { Category } from "@/types/platform"

export const categories: Category[] = [
  {
    slug: "text-generation",
    name: "Text Generation",
    description: "Assistant platforms for writing, reasoning, chat, and everyday work.",
    icon: "MessageSquareText",
    color: "from-sky-500 to-cyan-400",
    featured: true,
  },
  {
    slug: "image-generation",
    name: "Image Generation",
    description: "Platforms for concept art, product shots, and creative imagery.",
    icon: "Image",
    color: "from-fuchsia-500 to-rose-400",
    featured: true,
  },
  {
    slug: "video-generation",
    name: "Video Generation",
    description: "Platforms for text-to-video, image-to-video, and motion design.",
    icon: "Clapperboard",
    color: "from-amber-500 to-orange-400",
    featured: true,
  },
  {
    slug: "coding",
    name: "Coding",
    description: "Developer platforms for coding, review, refactors, and agents.",
    icon: "Code2",
    color: "from-emerald-500 to-teal-400",
    featured: true,
  },
  {
    slug: "audio",
    name: "Audio",
    description: "Platforms for speech, voice, dubbing, and generated audio.",
    icon: "AudioWaveform",
    color: "from-violet-500 to-indigo-400",
  },
  {
    slug: "music",
    name: "Music",
    description: "Creative tools for songs, stems, loops, and soundtracks.",
    icon: "Music2",
    color: "from-pink-500 to-red-400",
  },
  {
    slug: "research",
    name: "Research",
    description: "Search-grounded tools for analysis, citations, and discovery.",
    icon: "SearchCheck",
    color: "from-blue-500 to-indigo-400",
  },
  {
    slug: "open-source",
    name: "Open Source",
    description: "Platforms with open models, self-hosting options, or open ecosystems.",
    icon: "Boxes",
    color: "from-lime-500 to-emerald-400",
  },
]
