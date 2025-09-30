# NiggaOTC Project Overview

## Vision
- Deliver a Solana-first OTC trading desk focused on memecoins with escrow-backed settlement.
- Blend on-chain Anchor program interactions with Supabase-managed auth, storage, and realtime updates.
- Provide a marketing-friendly landing experience alongside wallet-gated trading tools.

## Primary Technologies
- Frontend: Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui component primitives.
- State & data: TanStack Query, React Hook Form, custom hooks for Supabase and Solana integration.
- Blockchain: Solana web3.js, SPL token tooling, wallet adapters (Phantom, Solflare) wrapped in a custom provider.
- Backend services: Supabase (Postgres, auth, storage, Deno edge functions, realtime channels).
- Tooling: ESLint (TypeScript config), PostCSS, Tailwind custom theme, lovable component tagging for local dev insights.

## Application Architecture
- Entry (`src/main.tsx`) wires React root and global CSS; `src/App.tsx` composes providers (TanStack Query, Tooltip, Auth, Solana wallet) and defines React Router routes.
- Page routing covers marketing (`/`) and trading workflows (`/deals`, `/create-deal`, `/my-deals`, `/deal/:id`) with a catch-all 404.
- Layout components (Navbar, Footer) provide wallet-aware navigation and embed the Solana wallet button state machine.

## Deal Lifecycle
1. **Creation** (`src/pages/CreateDeal.tsx`)
   - Wallet authentication enforced via `useContract` and `useAuth`.
   - Form data validated with helpers (`generateUniqueDealId`, `validateDealParams`, `decimalToBaseUnits`).
   - Token metadata fetched (Jupiter + DexScreener via `tokenMetadataService`).
   - Contract hook drives Anchor transaction and mirrors data into Supabase `deals` & `deal_transactions` tables.
2. **Browsing & Acceptance** (`src/pages/BrowseDeals.tsx`)
   - Deals sourced from Supabase (open status), augmented with PDA-derived IDs and token metadata.
   - Accept flow triggers Anchor `buyListing` via `useContract`, updates transaction state machine, and prunes accepted offers.
3. **Detail Management** (`src/pages/DealDetails.tsx`, `src/pages/MyDeals.tsx`)
   - Users can inspect status, accept others' offers, or cancel their own deals; actions sync with Supabase and on-chain events.
4. **Realtime Updates**
   - `useRealtimeDeals` subscribes to Supabase realtime channels to auto-refresh listings across pages and components.

## State & Hooks
- `useAuth` wraps Supabase Web3 auth, surfaces user/session state, and provides a resilient sign-out path.
- `useContract` centralizes Anchor program instantiation (wallet and read-only), PDA helpers, and aligns database writes with blockchain results.
- `useDatabase` encapsulates Supabase CRUD operations, including optimistic handling of unique constraint collisions and transaction logging.
- `useTransactionState` UI helper enumerates granular progress steps for long-lived Solana operations.

## Supabase Integration
- Schema defined via migrations: `deals` and `deal_transactions` tables with RLS permitting public read and authenticated writes.
- Triggers maintain `updated_at`; realtime replication enabled for live UI sync.
- Edge functions:
  - `update-deal-status`: idempotently finalizes deal state, manages transaction logs, and marks blockchain sync.
  - `reconcile-deals`: scheduled job (cron-ready) to expire stale listings; cron currently disabled via later migration.
- `config.toml` enables Solana Web3 auth, sets local ports, and supplies helper configurations.

## Solana Program Layer
- Program metadata supplied via `memeotc_contract.json` (Anchor IDL) with convenience types (`types.ts`).
- Contract config (`config.ts`) fixes program ID, RPC endpoint, and platform wallet for fee routing.
- Accepted token lists split by network (`tokens.ts`), defaulting to mainnet (SOL, USDC, USDT) with helpers for metadata lookups.

## UI & Marketing Experience
- Landing components (Hero, HowItWorks, LiveListings, WhyNiggaOTC, Community) convey product value and live data highlights.
- `TokenDisplay` handles hybrid metadata sources, including Supabase-stored fallback imagery and symbol names.
- Tailwind theme (`index.css`, `tailwind.config.ts`) defines gradient palettes, glassmorphism, and scroll-triggered animation utilities.

## Environment & Tooling Notes
- Vite server defaults to `::`:8080 with node polyfills for browser compatibility with Solana libraries.
- Project ships default Lovable scaffolding (README for deployment, `componentTagger` plugin for UI inspection).
- Network-sensitive operations (token metadata fetch, Solana RPC) require configured API keys and may need mock/stub for offline dev.
- Supabase anon key embedded for local/testing use; production should rely on environment injection.

## Potential Enhancements to Consider
- Broaden wallet adapter list (e.g., Backpack) and expose network selection for devnet testing.
- Add client-side caching or pagination for large deal sets.
- Layer analytics/telemetry for completed deals and marketing sections.
- Harden error boundaries around fetch failures (token metadata, RPC) for better UX on degraded networks.
