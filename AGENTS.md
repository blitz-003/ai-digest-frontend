# AGENTS.md — AI Digest

## Project Overview

Two apps in a monorepo (no workspace tooling — they are independent):

- **`ai-digest-frontend/`** — Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui (base-vega style), TipTap editor, Framer Motion, React Query.
- **`ai-digest-backend/`** — FastAPI (Python), SQLAlchemy 2.x (sync), Alembic, Supabase Auth, PostgreSQL via psycopg.

The product is an **AI-focused newsletter/article platform** with reader, author, and admin roles. Auth is handled by Supabase; the backend verifies JWTs via JWKS and stores profiles in its own Postgres DB.

---

## Commands

### Frontend (`ai-digest-frontend/`)

| Task | Command |
|---|---|
| Dev server | `npm run dev` (port 3000) |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Typecheck | `npx tsc --noEmit` |

No test suite exists for the frontend.

### Backend (`ai-digest-backend/`)

| Task | Command |
|---|---|
| Dev server | `uvicorn app.main:app --reload --port 8000` |
| Run in prod | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` (see `Procfile`) |
| Migrations | `alembic upgrade head` / `alembic revision --autogenerate -m "msg"` |
| Seed data | `python scripts/seed_articles.py` |
| DB test | `python test_connection.py` |

No test suite exists (empty `tests/` dir, no pytest config).

---

## Architecture Notes

### Frontend

- **Routing**: Next.js App Router. Pages: `/`, `/about`, `/pricing`, `/login`, `/register`, `/articles`, `/articles/[articleId]`, `/write`, `/dashboard`. Admin routes defined in `constants/routes.ts` but pages not yet built.
- **Feature-sliced design**: `src/features/{auth,articles,categories}/` each contain `components/`, `hooks/`, `services/`, `types/`, `validation/`.
- **State**: React Query for server state, React Context (`AuthContext`) for auth. No Redux/Zustand.
- **Axios**: `src/lib/axios.ts` — `baseURL` from `NEXT_PUBLIC_API_URL` (default `http://localhost:8000/api/v1`), `withCredentials: true` for cookie-based auth.
- **UI primitives**: `src/components/ui/` — shadcn v4 with `base-vega` style. Add new components via `npx shadcn@latest add <name>`.
- **Tailwind v4**: Configured entirely in `src/app/globals.css` (no `tailwind.config.ts`). Theme tokens use oklch CSS variables. Custom utilities go in globals.css `@layer` blocks.
- **React Compiler**: Enabled in `next.config.ts` via `babel-plugin-react-compiler`.

### Backend

- **Stack**: FastAPI + SQLAlchemy 2.x (synchronous, not async). Pydantic v2 for schemas. Pydantic-settings for config.
- **Auth flow**: Supabase handles sign-up/sign-in/sign-out. Backend reads `access_token` from HTTP-only cookies, verifies via Supabase JWKS (`python-jose`, ES256), looks up `Profile` by UUID.
- **Roles**: `reader` → `author` → `admin`. Enforced via `dependencies/role.py` → `require_role()`.
- **Service layer**: Static-method classes in `services/` (e.g., `ArticleService.get_all_articles(db, ...)`). Some routes instantiate services unnecessarily — harmless but inconsistent.
- **DB**: SQLAlchemy models in `app/models/`. 7 tables: `users` (legacy, unused), `profiles`, `articles`, `categories`, `comments`, `likes`, `bookmarks`. UUIDs for all active entities.
- **Supabase integration**: Only used for auth operations and JWKS. All data is in the app's own Postgres DB.

### Environment Variables

Backend `.env.example` is **incomplete** — missing `CORS_ORIGINS` and `SUPABASE_JWKS_URL` which are required by `app/core/config.py`. Always cross-reference `config.py` for the full list.

---

## Key Gotchas

1. **No `middleware.ts` exists** — zero server-side route protection. All auth gating is client-side via `AuthContext`. Protected pages (`/write`, `/dashboard`) rely on the component checking `isAuthenticated`.

2. **Tailwind CSS v4** — no `tailwind.config.js/ts` file. All theming is in `globals.css` using `@theme inline {}` and CSS custom properties. Do not create a tailwind config file.

3. **Next.js 16** — APIs may differ from older versions. Check `node_modules/next/dist/docs/` before writing new Next.js code.

4. **React 19** — React Compiler is active (`reactCompiler: true` in next.config). Be aware of changed hooks behavior.

5. **shadcn base-vega style** — components use `@base-ui/react` primitives, not Radix. Use `npx shadcn@latest add` to add new UI components.

6. **Cookie auth is cross-origin** — cookies use `secure=True, samesite="none"` in production. Frontend must be served over HTTPS for auth to work.

7. **Legacy `User` model** — `app/models/user.py` (integer PK) is unused. Active auth uses `Profile` (UUID PK = Supabase `auth.uid`). Do not extend `User`.

8. **No JWKS caching** — `get_jwks()` fetches keys on every authenticated request.

9. **Article schema duplication** — `app/schemas/article.py` has duplicate field definitions in `ArticleResponse`.

10. **Empty placeholder files** — `src/utils/*`, `src/hooks/*`, `src/services/*`, `src/styles/*`, `components/cards/*`, `components/feedback/*` are all scaffolded but empty.

11. **Primary colors** — Site uses three accent colors (bluish, greenish, purplish) defined in `globals.css`. Icons should use these, not a separate blue.

12. **API base URL** — Frontend expects backend at `NEXT_PUBLIC_API_URL` (default `http://localhost:8000/api/v1`).
