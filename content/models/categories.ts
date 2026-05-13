import type { Category } from "@/types/model"

export const categories: Category[] = [
  {
    slug: "text-generation",
    name: "Text Generation",
    description: "General-purpose assistants, writers, and reasoning models.",
    icon: "MessageSquareText",
    color: "from-sky-500 to-cyan-400",
    featured: true,
  },
  {
    slug: "image-generation",
    name: "Image Generation",
    description: "Models for concept art, product shots, and creative imagery.",
    icon: "Image",
    color: "from-fuchsia-500 to-rose-400",
    featured: true,
  },
  {
    slug: "video-generation",
    name: "Video Generation",
    description: "Text-to-video and image-to-video systems for motion design.",
    icon: "Clapperboard",
    color: "from-amber-500 to-orange-400",
    featured: true,
  },
  {
    slug: "coding",
    name: "Coding",
    description: "Agents and models for code generation, review, and debugging.",
    icon: "Code2",
    color: "from-emerald-500 to-teal-400",
    featured: true,
  },
  {
    slug: "audio",
    name: "Audio",
    description: "Speech, voice, dubbing, and audio generation models.",
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
    name: "Open Source Models",
    description: "Models with weights or licenses suitable for self-hosting.",
    icon: "Boxes",
    color: "from-lime-500 to-emerald-400",
  },
]
