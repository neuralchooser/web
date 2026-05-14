NeuralChooser

Discover, compare, and choose the right AI models for your workflow.

NeuralChooser is a modern AI model discovery platform built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
It helps developers, creators, researchers, and businesses explore AI models across categories like:

Text Generation
Image Generation
Video Generation
Coding
Audio & Speech
Music
Open Source Models
Research Models

The platform is designed to be:

fast
scalable
SEO-friendly
fully data-driven
visually premium
easy to extend
✨ Features
⚡ Built with Next.js App Router
🎨 Beautiful responsive UI
🌙 Dark / Light theme support
🔍 Instant search and filtering
📊 AI model comparison pages
🧠 Extensible type-safe model schema
📄 Dynamically generated model pages
🚀 Vercel optimized deployment
🧩 Reusable component architecture
📈 SEO optimized structure
📱 Mobile-first design
🛠 TypeScript-first architecture
🏗 Tech Stack
Next.js
TypeScript
Tailwind CSS
shadcn/ui
next-themes
Lucide Icons
Vercel
📂 Project Structure
.
├── app
│ ├── (marketing)
│ ├── about
│ ├── categories
│ ├── compare
│ ├── models
│ ├── layout.tsx
│ └── page.tsx
│
├── components
│ ├── cards
│ ├── filters
│ ├── layout
│ ├── search
│ ├── sections
│ └── ui
│
├── content
│ └── models
│
├── lib
│ ├── data
│ ├── utils
│ └── constants
│
├── types
│
├── public
│ └── logos
│ ├── brand
│ └── models
│
├── styles
│
└── README.md
🧠 Data-Driven Architecture

NeuralChooser is fully data-driven.

All AI models are stored as structured data files instead of hardcoded JSX.

Example:

export interface AIModel {
id: string;
slug: string;
name: string;
company: string;
description: string;

categories: string[];
tags: string[];
bestFor: string[];
modalities: string[];

pricing: {
type: "free" | "freemium" | "paid";
startingPrice?: string;
};

apiAvailable: boolean;
openSource: boolean;
localRunnable?: boolean;

contextWindow?: number;
releaseDate?: string;

website?: string;
documentation?: string;

strengths?: string[];
weaknesses?: string[];

featured?: boolean;
}

This architecture allows:

future expansion
API integration
rankings
benchmarks
analytics
user voting
advanced filtering

without major refactors.

🚀 Getting Started

1. Clone the repository
   git clone https://github.com/neuralchooser/web.git
2. Navigate into the project
   cd web
3. Install dependencies
   npm install
4. Run development server
   npm run dev

Visit:

http://localhost:3000
🌙 Theme Support

NeuralChooser supports:

Dark mode
Light mode
System theme detection

Implemented using:

next-themes

Brand logos automatically switch depending on theme.

🖼 Logo Structure
/public/logos
/brand
logo-light.svg
logo-dark.svg
icon-light.svg
icon-dark.svg

/models
openai.svg
claude.svg
gemini.svg
🔍 Search & Filtering

Users can filter models by:

category
pricing
open source
API availability
local runnable support

Search is implemented with fast client-side filtering.

📊 Comparison Pages

Dynamic comparison pages are generated automatically.

Example:

/compare/gpt-4o-vs-claude-3-7-sonnet

Comparison pages include:

strengths
weaknesses
pricing
speed
API support
use cases
📈 SEO Strategy

NeuralChooser is optimized for:

static generation
semantic HTML
metadata generation
OpenGraph previews
sitemap generation
robots.txt
canonical URLs

The architecture prioritizes:

Lighthouse performance
Core Web Vitals
fast navigation
minimal JavaScript
🎨 Design Philosophy

The UI is inspired by:

Vercel
Linear
Raycast
OpenRouter

Design principles:

clean typography
spacious layouts
subtle gradients
minimal UI noise
premium dark mode
smooth micro-interactions

No overused “AI cyberpunk” aesthetics.

🛣 Roadmap
Phase 1
Homepage
Model pages
Search
Filters
Dark mode
SEO setup
Phase 2
Advanced comparisons
AI benchmarks
User favorites
Model rankings
Related model recommendations
Phase 3
API access
Personalized recommendations
AI workflow builder
Community voting
Newsletter integration
🧩 Future Expansion

Planned future capabilities:

CMS integration
AI model APIs
benchmark ingestion
analytics dashboard
recommendation engine
browser extension
public API

The project structure is intentionally built for scalability.

🚀 Deployment

The project is optimized for deployment on:

Vercel

Deploy instantly:

vercel
🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Please:

Fork the repository
Create a feature branch
Commit changes
Open a pull request
📜 License

MIT License

🌐 NeuralChooser

Find the right AI model for your workflow.

Built with ❤️ using Next.js and TypeScript.
