Analyze the requirement before generating code

🧠 Project Context

NeuralChooser is a data-driven AI model directory platform.

Frontend is already built backend needs to be built from scratch in the same dir of this next js project

Each platform (AI tool/model provider) has:

id, slug, name, company
logo (Supabase Storage or URL)
description fields
categories (array of category slugs)
tags (array of strings)
pricing flags (free/paid)
API availability
open source flag
featured + trending flags
last updated date
🏷️ CATEGORY SYSTEM (IMPORTANT UPDATE)

Categories are NOT fully stored in database.

🗄️ Supabase stores ONLY:

Create a table:

categories:
slug text primary key
name text

That’s it.

NO icons, NO colors, NO UI metadata in database.

🎨 Frontend owns category UI metadata

Keep a separate frontend file:

export const categories = [
{
slug: "text-generation",
name: "Text Generation",
icon: "MessageSquareText",
color: "from-sky-500 to-cyan-400",
}
]

Frontend is responsible for:

icons
colors
descriptions
UI grouping
🔗 Relationship rule

Platforms store:

categories: string[] // category slugs only

Example:

["text-generation", "coding", "agents"]
🎯 Backend Goals

Build a minimal, production-ready backend layer using:

Next.js App Router (server-side code)
Supabase (Postgres database)
Supabase client SDK
Type-safe API layer

DO NOT change frontend UI or filtering logic.

🧩 What you need to implement

1. Supabase Client Setup

Create reusable clients:

lib/supabase/server.ts (server client)
lib/supabase/client.ts (browser client if needed)

Use env vars:

SUPABASE_URL
SUPABASE_ANON_KEY

Supabase project:

https://jujocufybukczvtztwfw.supabase.co 2. Database Access Layer

Create:

lib/services/platforms.ts

Functions:

getAllPlatforms()
getPlatformBySlug(slug)
getFeaturedPlatforms()
getTrendingPlatforms()

Requirements:

fetch from Supabase platforms table
return typed results
handle errors gracefully
avoid unnecessary fields 3. API Routes (Next.js App Router)

Create:

app/api/platforms/route.ts
GET /api/platforms

Returns ALL platforms by default.

Supports optional query params:

category
pricing (free/paid)
openSource
apiAvailable
search

BUT:

👉 Filtering must remain OPTIONAL
👉 Frontend still performs main filtering
👉 Do NOT move full filtering logic to backend

GET /api/platforms/[slug]/route.ts

Returns single platform by slug.

4. Supabase Table Assumption

Assume this schema exists:

id text primary key
slug text unique not null
name text
company text

logo text
accent_color text

short_description text
description text

website text
documentation text

categories text[] -- category slugs only
tags text[]

pricing_free boolean
pricing_paid boolean
pricing_notes text

api_available boolean
open_source boolean

featured boolean
trending boolean

last_updated date

DO NOT redesign schema.

5. Data Flow Requirement (IMPORTANT)

Frontend currently:

fetches full dataset once
performs all filtering client-side

You MUST preserve this behavior.

So:

API returns FULL dataset by default
no heavy server-side filtering
keep responses lightweight 6. Performance Requirements
Use efficient Supabase queries
Avoid N+1 queries
Do not fetch unnecessary fields
Ensure caching is enabled where possible 7. Type Safety

Create:

types/platform.ts

Define:

AIPlatform type
PlatformCategory type (ONLY slug + name for DB usage) 8. Optional Enhancements (ONLY if simple)

You may add:

Next.js fetch caching
ISR-style revalidation

DO NOT add:

authentication
users
voting
favorites
analytics
complex backend filtering engine
🚫 Constraints
Do NOT modify frontend components
Do NOT change UI filtering logic
Do NOT introduce auth
Do NOT over-engineer backend
Keep architecture minimal and scalable
🧠 Final Output Expectation

Backend should:

✔ Replace static JSON data
✔ Use Supabase as source of truth
✔ Keep frontend unchanged
✔ Provide clean API layer
✔ Support future expansion

🎯 End Goal

NeuralChooser must behave exactly the same, but now:

data comes from Supabase
backend is API-driven
architecture is production-ready and scalable
