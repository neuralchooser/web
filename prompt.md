Lusha
RocketReach
UpLead
Kaspr
Adapt.io
Hunter.io
Snov.io
ContactOut

Research the following AI lead generation tools and provide detailed information about each one in a structured JSON format similar to the example I provided.

I have also attached a list of categories and types.
Match each tool with the most relevant category/type from the provided list.

Additionally:

If a tool fits into multiple categories, include all applicable categories in an array.
If you discover a relevant category that is not present in the provided list, add it as an additional category.
Keep the categorization accurate and consistent.
Return clean, valid JSON only.
Do follow the type interface.

export const platforms: AIPlatform[] = [
{
id: "chatgpt",
slug: "chatgpt",
name: "ChatGPT",
company: "OpenAI",
logo: "open-ai.svg",
accentColor: "#10a37f",
shortDescription:
"OpenAI's flagship assistant platform for writing, coding, research, image understanding, and multimodal workflows.",
description:
"ChatGPT is a broad AI assistant platform for individuals and teams. It combines conversational AI, multimodal input, coding help, file analysis, image generation, and a mature API ecosystem for building AI products.",
categories: ["text-generation", "coding", "research"],
tags: ["assistant", "multimodal", "coding", "api", "agents"],
bestFor: [
"General AI assistance",
"Writing",
"Coding help",
"Product assistants",
"Research synthesis",
],
pricing: {
free: true,
paid: true,
notes: "Free and paid plans, plus API usage billing.",
},
apiAvailable: true,
openSource: false,
website: "https://chatgpt.com",
documentation: "https://platform.openai.com/docs",
strengths: [
"Polished general-purpose UX",
"Strong API ecosystem",
"Broad multimodal support",
],
weaknesses: ["Closed platform", "Advanced usage can become costly"],
models: [
{
name: "GPT-4o",
description:
"Flagship multimodal model for text, vision, and voice workflows.",
},
{
name: "GPT-4.1",
description:
"Model family oriented around strong instruction following and coding.",
},
{
name: "o-series",
description: "Reasoning-focused models for complex problem solving.",
},
],
featured: true,
trending: true,
lastUpdated: "2026-05-14",
},
{
id: "claude",
slug: "claude",
name: "Claude",
company: "Anthropic",
logo: "claude.svg",
accentColor: "#d97757",
shortDescription:
"Anthropic's assistant platform for careful writing, code review, long-context analysis, and agentic workflows.",
description:
"Claude is a premium AI assistant platform focused on high-quality reasoning, polished long-form output, strong coding assistance, and thoughtful document analysis for professional teams.",
categories: ["text-generation", "coding", "research"],
tags: ["assistant", "coding", "long context", "reasoning", "writing"],
bestFor: [
"Code review",
"Long document analysis",
"Research synthesis",
"Complex writing",
],
pricing: {
free: true,
paid: true,
notes: "Free and paid app plans with API usage billing.",
},
apiAvailable: true,
openSource: false,
website: "https://claude.ai",
documentation: "https://docs.anthropic.com",
strengths: [
"Excellent writing quality",
"Strong code reasoning",
"Large context workflows",
],
weaknesses: ["Closed platform", "Some features vary by plan and region"],
models: [
{
name: "Claude Sonnet",
description:
"Balanced model line for reasoning, coding, and everyday work.",
},
{
name: "Claude Opus",
description: "Higher-capability model line for demanding tasks.",
},
{
name: "Claude Haiku",
description: "Fast, lower-cost model line for lightweight workflows.",
},
],
featured: true,
trending: true,
lastUpdated: "2026-05-14",
},
]

export type PlatformCategory =
| "text-generation"
| "image-generation"
| "video-generation"
| "audio"
| "music"

// engineering / builders
| "coding"
| "app-builder"
| "website-builder"
| "ui-design"
| "automation"
| "agents"

// business workflows
| "research"
| "lead-generation"
| "marketing"
| "sales"
| "customer-support"
| "productivity"
| "presentation"

// data / enterprise
| "data-analysis"
| "search"
| "knowledge-base"

// media / creative
| "3d-generation"
| "voice-generation"
| "avatar-generation"

// infra / ecosystem
| "developer-tools"
| "api-platform"
| "open-source";

export interface PlatformPricing {
free: boolean;
paid: boolean;
notes?: string;
}

export interface PlatformModel {
name: string;
description?: string;
}

export interface AIPlatform {
id: string;
slug: string;
name: string;
company: string;
logo?: string;
accentColor?: string;
shortDescription: string;
description: string;
categories: PlatformCategory[];
tags?: string[];
bestFor?: string[];
pricing: PlatformPricing;
apiAvailable?: boolean;
openSource?: boolean;
website?: string;
documentation?: string;
strengths?: string[];
weaknesses?: string[];
models?: PlatformModel[];
featured?: boolean;
trending?: boolean;
lastUpdated?: string;
metadata?: Record<string, string | number | boolean | null>;
}

export interface Category {
slug: PlatformCategory;
name: string;
description: string;
icon: string;
color: string;
featured?: boolean;
}
