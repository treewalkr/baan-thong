# baan-thong — task runner. Every useful command lives here.
# Run `just` (no args) to list all recipes.
#
# Conventions:
#   - Bun-only. Recipes defer to per-workspace `bun run` scripts where sensible.
#   - Recipes marked "stub" are filled in by a later issue (see NOTE.md / issues).

# Show this list.
default:
    @just --list

# --- Dev / build ---

# Boot backend + frontend together in dev mode. (stub: full apps come later)
dev:
    @echo "[just dev] starting workspaces in dev mode…"
    bun run --filter '*' dev

# Build all workspaces.
build:
    bun run --filter '*' build

# --- Lint / format (Biome) ---

# Lint + typecheck-aware check across the tree. Fails on issues.
lint:
    bunx @biomejs/biome check .

# Auto-fix + format the tree in place.
fix:
    bunx @biomejs/biome check --write .

# Format only (no-op when already formatted).
format:
    bunx @biomejs/biome format .

# --- Testing ---

# Unit + integration tests across workspaces (bun test).
test:
    bun run --filter '*' test

# End-to-end tests with Playwright. (stub: e2e suite comes in a later issue)
e2e:
    @echo "[just e2e] Playwright suite not added yet — coming in a later issue."
    @exit 0

# --- Docker stack ---

# Build + run the whole stack locally (frontend, backend, Postgres). (stub)
up:
    @echo "[just up] docker-compose stack not added yet — coming in a later issue."
    @exit 0

# Tear the stack down. (stub)
down:
    @echo "[just down] docker-compose stack not added yet — coming in a later issue."
    @exit 0

# --- Database (Drizzle Kit) — stubs until the schema lands ---
# NOTE: `just` forbids ':' in recipe names, so these are kebab-cased
# (`db-generate` …) rather than `db:generate`. Invocable as e.g. `just db-generate`.
# Drizzle Kit will be wired once the schema lands in a later issue.

[group('db')]
db-generate:
    @echo "[just db-generate] Drizzle schema not added yet — coming in a later issue."
    @exit 0

[group('db')]
db-migrate:
    @echo "[just db-migrate] Drizzle schema not added yet — coming in a later issue."
    @exit 0

[group('db')]
db-studio:
    @echo "[just db-studio] Drizzle schema not added yet — coming in a later issue."
    @exit 0

[group('db')]
db-seed:
    @echo "[just db-seed] Drizzle schema not added yet — coming in a later issue."
    @exit 0

# --- Profiling / load (reserved; not in CI) ---

# CPU profile the backend with Bun's built-in profiler. (stub)
profile:
    @echo "[just profile] Bun CPU profiler recipe reserved — coming in a later issue."
    @exit 0

# Load test with k6 or oha. (stub)
load:
    @echo "[just load] load-tester (k6/oha) recipe reserved — coming in a later issue."
    @exit 0
