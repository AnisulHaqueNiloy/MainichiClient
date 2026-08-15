# AGENTS.md

React 19 + Vite + TypeScript SPA (e-commerce frontend for a halal shop; backend not in this repo).

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (type errors fail the build)
- `npm run preview` — preview the production build
- `npm run lint` — eslint; **there is no committed eslint config**, so this errors out. Don't rely on it; `tsc -b` is the real gate.
- No test framework, no CI, no pre-commit hooks in this repo.

## Structure

- `src/redux/` — RTK Query API layer. `api/baseApi.tsx` is the root; feature APIs (`authApi`, `orderApi`, `admin/*`, etc.) extend it with `injectEndpoints`. Redux store slices: `cart`, `language`, `admin`.
- `src/routes/router.tsx` — single `createBrowserRouter`; layouts: `MainLayout` (public), `UserLayout`, `AdminLayout` (guarded by `AdminGuarg.tsx`, checks `useGetMeQuery` + `role === "ADMIN"`).
- `src/public_pages/`, `src/admin_pages/`, `src/authPages/`, `src/user_pages/` — page buckets; `src/components/ui/` is shadcn, `src/components/shared/` is app components.
- Path alias `@/` → `src/` (vite.config.ts + tsconfig.app.json). Use it for imports.

## API quirks (do not "fix" without asking)

- `baseApi` baseUrl is **hardcoded** to `https://api.mainichihalalshop.com/api` with `credentials: "include"` (cookie auth). A commented-out `localhost:5000/api` alternative sits right above it — do not flip to it.
- `.env` has `VITE_API_URL` (no `/api` suffix) — used only for **image URLs** (`IMG_URL = import.meta.env.VITE_API_URL` in many pages). ProductCard.tsx uses `VITE_API_BASE_URL` instead — the env-var naming is inconsistent on purpose; don't unify it.
- tsconfig uses `erasableSyntaxOnly` — no enums/namespaces.

## Conventions

- Tailwind v4, CSS-first config in `src/index.css` (`@theme inline`, CSS variables) — there is no `tailwind.config.js`. Theme/radius tokens live there.
- Comments in code are mixed Bengali/English (e.g. Bengali TODO-ish notes in AdminGuarg, cartSlice). Leave existing comments alone; follow suit if adding any.
- `index.css` imports `shadcn/tailwind.css`; shadcn components added via `npx shadcn add` (components.json, new-york style).
- State persisted to localStorage under keys `cartItems` (cartSlice) and `lang` (languageSlice).

## Google Translate (fragile, proceed carefully)

The app is translated at runtime by Google Translate, not i18n libs: `GoogleTranslateWrapper` (wraps app in main.tsx) injects translate.google.com's script ~2s after mount, supporting only `en, ja`. Custom dropdowns (`components/translation/LanguageDropdown.tsx`) drive the hidden `.goog-te-combo` select. Translate behavior is broken by React re-renders and route changes; `protectElementFromTranslate(id)` exists for protected content. Any UI change can break translation — test language switching after touching shared components (Navbar, Footer).

## Deploy

Static SPA on Netlify (SPA fallback via `public/_redirects`: `/* /index.html 200`).
