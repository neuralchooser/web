<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

This project currently uses Next `16.2.6`; use `proxy.ts` for route protection instead of legacy middleware.

Admin credentials must remain server-only environment variables. Never expose admin credentials through `NEXT_PUBLIC_*`, client state, or localStorage.

Admin routes live under `/admin` and must not be linked from the public website navigation.
<!-- END:nextjs-agent-rules -->
