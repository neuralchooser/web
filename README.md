# NeuralChooser

NeuralChooser is a public AI platform directory built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and Supabase.

The public site lets visitors browse, search, and filter AI platforms by category, pricing, API availability, open-source status, and editorial signals such as featured or trending.

The same project also includes a hidden production-oriented admin panel at `/admin` for managing platform and category records.

## Features

- Public AI platform directory with SEO-optimized pages
- Dynamic platform and category pages
- Supabase-backed platform and category data
- Client-side public search and filtering
- Dark and light theme support with `next-themes`
- Hidden admin panel under `/admin`
- Static server-side admin login using env credentials
- Secure HTTP-only signed admin cookie
- Admin CRUD for platforms and categories
- Admin search, filters, tables, dialogs, loading states, and reusable forms
- Zod validation on both client and server
- React Hook Form admin forms

## Tech Stack

- Next.js `16.2.6` App Router
- React `19`
- TypeScript
- Tailwind CSS `4`
- shadcn/ui-style components
- Supabase
- Zod
- React Hook Form
- Lucide Icons

## Project Structure

```txt
app/
  (site)/
    layout.tsx
    page.tsx
    about/
    platforms/
    categories/

  (admin)/
    admin/
      layout.tsx
      page.tsx
      login/
      platforms/
      categories/

  api/
  layout.tsx
  globals.css
  robots.ts
  sitemap.ts

components/
  admin/
  cards/
  layout/
  search/
  sections/
  ui/

lib/
  actions/
  auth/
  repositories/
  services/
  supabase/
  validators/

types/
  admin.ts
  platform.ts

proxy.ts
```

The public site and admin panel are separated with route groups. Public navigation does not link to `/admin`.

## Supabase Data Model

`categories`

- `id`
- `slug`
- `name`
- `featured`
- `description`

`platforms`

- `id`
- `slug`
- `name`
- `company`
- `logo`
- `accent_color`
- `short_description`
- `description`
- `website`
- `documentation`
- `categories`
- `tags`
- `pricing_free`
- `pricing_paid`
- `pricing_notes`
- `api_available`
- `open_source`
- `featured`
- `trending`
- `last_updated`

## Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-admin-password
ADMIN_COOKIE_SECRET=your-long-random-cookie-secret
```

If Supabase Row Level Security blocks admin mutations with the anon key, add a server-only service role client before enabling production writes.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Admin:

```txt
http://localhost:3000/admin/login
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Validation And Data Flow

Admin forms use React Hook Form with Zod validation to catch invalid input before submission.

Server actions validate again before writing to Supabase:

```txt
admin form -> server action -> zod schema -> repository -> Supabase
```

Repositories own Supabase reads and writes. Server actions own auth checks, validation, mutation flow, cache revalidation, and redirects.

## SEO

The public site includes:

- Metadata helpers
- Dynamic platform metadata
- Sitemap generation
- Robots configuration
- Static generation where applicable
- Semantic public pages

Admin routes are marked `noindex`.

## Next.js Version Note

This project uses Next.js `16.2.6`. Next 16 uses `proxy.ts` for route protection where older versions used `middleware.ts`.

Before changing App Router behavior, read the local Next docs in:

```txt
node_modules/next/dist/docs/
```

## Deployment

The app is optimized for Vercel deployment.

Before deploying, verify:

```bash
npm run lint
npm run build
```

Make sure all required Supabase and admin environment variables are configured in the deployment environment.
