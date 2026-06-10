import type { Category } from "@/types/platform";

export const categories: Category[] = [
  {
    slug: "text-generation",
    name: "Text Generation",
    description:
      "Assistant platforms for writing, reasoning, chat, and everyday work.",
    icon: "MessageSquareText",
    color: "from-sky-500 to-cyan-400",
    featured: true,
  },
  {
    slug: "image-generation",
    name: "Image Generation",
    description:
      "Platforms for concept art, product shots, design assets, and creative imagery.",
    icon: "Image",
    color: "from-fuchsia-500 to-rose-400",
    featured: true,
  },
  {
    slug: "video-generation",
    name: "Video Generation",
    description:
      "Platforms for text-to-video, animation, cinematic scenes, and motion design.",
    icon: "Clapperboard",
    color: "from-amber-500 to-orange-400",
    featured: true,
  },
  {
    slug: "coding",
    name: "Coding",
    description:
      "Developer platforms for coding, debugging, refactors, and AI engineering.",
    icon: "Code2",
    color: "from-emerald-500 to-teal-400",
    featured: true,
  },
  {
    slug: "app-builder",
    name: "App Builders",
    description:
      "AI-native tools for generating and deploying full-stack applications.",
    icon: "AppWindow",
    color: "from-green-500 to-emerald-400",
    featured: true,
  },
  {
    slug: "website-builder",
    name: "Website Builders",
    description:
      "Platforms for generating landing pages, business sites, and web experiences.",
    icon: "Globe",
    color: "from-cyan-500 to-blue-400",
  },
  {
    slug: "ui-design",
    name: "UI Design",
    description:
      "AI tools for interfaces, wireframes, prototypes, and design-to-code workflows.",
    icon: "LayoutTemplate",
    color: "from-violet-500 to-fuchsia-400",
    featured: true,
  },
  {
    slug: "agents",
    name: "Agents",
    description:
      "Autonomous AI systems that plan, reason, and execute multi-step workflows.",
    icon: "Bot",
    color: "from-indigo-500 to-violet-400",
    featured: true,
  },
  {
    slug: "automation",
    name: "Automation",
    description:
      "Workflow automation platforms powered by AI actions, triggers, and integrations.",
    icon: "Workflow",
    color: "from-orange-500 to-red-400",
  },
  {
    slug: "research",
    name: "Research",
    description:
      "Search-grounded tools for analysis, citations, summarization, and discovery.",
    icon: "SearchCheck",
    color: "from-blue-500 to-indigo-400",
    featured: true,
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    description:
      "Platforms for prospecting, outreach, enrichment, and sales pipeline growth.",
    icon: "Users",
    color: "from-yellow-500 to-amber-400",
  },
  {
    slug: "marketing",
    name: "Marketing",
    description:
      "AI tools for campaigns, ad creatives, SEO, and branded content generation.",
    icon: "Megaphone",
    color: "from-pink-500 to-rose-400",
  },
  {
    slug: "sales",
    name: "Sales",
    description:
      "Revenue-focused assistants for outreach, CRM workflows, and deal acceleration.",
    icon: "BadgeDollarSign",
    color: "from-lime-500 to-green-400",
  },
  {
    slug: "customer-support",
    name: "Customer Support",
    description:
      "Support agents and helpdesk copilots for conversations, tickets, and automation.",
    icon: "Headset",
    color: "from-sky-500 to-blue-400",
  },
  {
    slug: "productivity",
    name: "Productivity",
    description:
      "AI work assistants for notes, organization, planning, and collaboration.",
    icon: "NotebookPen",
    color: "from-stone-500 to-zinc-400",
  },
  {
    slug: "presentation",
    name: "Presentation",
    description:
      "Tools for AI-generated slides, pitch decks, storytelling, and visual communication.",
    icon: "Presentation",
    color: "from-rose-500 to-pink-400",
  },
  {
    slug: "data-analysis",
    name: "Data Analysis",
    description:
      "Platforms for datasets, BI workflows, analytics, dashboards, and insights.",
    icon: "ChartColumn",
    color: "from-teal-500 to-cyan-400",
  },
  {
    slug: "search",
    name: "Search",
    description:
      "AI-native search engines and retrieval systems for web and enterprise knowledge.",
    icon: "Search",
    color: "from-blue-600 to-cyan-500",
  },
  {
    slug: "knowledge-base",
    name: "Knowledge Base",
    description:
      "Memory and workspace tools for documents, RAG systems, and organizational knowledge.",
    icon: "Database",
    color: "from-slate-500 to-gray-400",
  },
  {
    slug: "audio",
    name: "Audio",
    description:
      "Platforms for speech, transcription, dubbing, and generated audio workflows.",
    icon: "AudioWaveform",
    color: "from-violet-500 to-indigo-400",
  },
  {
    slug: "voice-generation",
    name: "Voice Generation",
    description:
      "AI voice synthesis and cloning tools for narration, characters, and assistants.",
    icon: "Mic2",
    color: "from-purple-500 to-violet-400",
  },
  {
    slug: "music",
    name: "Music",
    description:
      "Creative tools for songs, stems, loops, soundtrack generation, and composition.",
    icon: "Music2",
    color: "from-pink-500 to-red-400",
  },
  {
    slug: "avatar-generation",
    name: "Avatar Generation",
    description:
      "Platforms for AI avatars, virtual presenters, and digital humans.",
    icon: "UserRound",
    color: "from-fuchsia-500 to-purple-400",
  },
  {
    slug: "3d-generation",
    name: "3D Generation",
    description:
      "AI tools for 3D assets, meshes, environments, and spatial content.",
    icon: "Box",
    color: "from-emerald-500 to-lime-400",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description:
      "Platforms for AI engineering workflows, APIs, observability, and tooling.",
    icon: "Wrench",
    color: "from-gray-600 to-slate-500",
  },
  {
    slug: "api-platform",
    name: "API Platforms",
    description:
      "Foundation model providers and infrastructure platforms for AI applications.",
    icon: "Webhook",
    color: "from-indigo-600 to-blue-500",
  },
  {
    slug: "open-source",
    name: "Open Source",
    description:
      "Platforms with open models, self-hosting options, or open ecosystems.",
    icon: "Boxes",
    color: "from-lime-500 to-emerald-400",
  },
  {
    slug: "vibe-coding",
    name: "Vibe Coding",
    featured: true,
    icon: "Code2",
    color: "from-emerald-500 to-teal-400",
    description:
      "AI-powered tools that turn natural language prompts into working software.",
  },
];
