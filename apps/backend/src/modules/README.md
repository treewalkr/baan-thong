# Modules — modular monolith

This is a **modular monolith**: one process, with internal module boundaries.
Each module is a vertical slice of the domain (e.g. `health`, later `auth`,
`catalog`, `orders`). Modules are **not** microservices — they share the process
and the database — but they keep their own routes, services, and models so
extraction later is mechanically possible.

## Structure (per module)

```
modules/<name>/
  index.ts     # Controller: an Elysia instance exposing this module's routes
  service.ts   # Business logic, decoupled from the HTTP layer
  model.ts     # TypeBox schemas + derived types (request/response DTOs)
```

- **Controller** (`index.ts`) — exports a named Elysia instance
  (`<name>Module`), constructed with `{ name: 'module.<name>', prefix: '/<name>' }`
  so Elysia de-duplicates it if mounted more than once and the module owns its
  route prefix (routes are `'/'`, `'/:id'`, … — never repeat the prefix).
  Registers its models by name via `.model({ … })` and references them by name
  in `response`/`body`/`query` so they flow to OpenAPI/Eden and stay reusable.
- **Service** (`service.ts`) — pure business logic. Prefers a class (often a
  singleton export) returning values over throwing; the controller maps results
  to HTTP responses. No Elysia imports here.
- **Model** (`model.ts`) — TypeBox schemas, exported as a schema + a derived
  `Static` type of the same name. The Drizzle schema (added in a later issue)
  is the single source of truth for entity shapes; `model.ts` holds
  request/response DTOs and derived types only.

## Composition

The root app (`src/app.ts`) composes modules with `.use()`:

```ts
new Elysia().use(healthModule).use(authModule) // …
```

`src/app.ts` exports `createApp()` so tests can exercise the app without binding
a port or validating env. `src/index.ts` is the only place that imports `env`
(boot validation) and calls `.listen()`.

## Boundaries (what to keep honest)

- Modules talk to each other through **services**, not by reaching into another
  module's internals. If two modules need shared behavior, put it in
  `packages/shared` (cross-cutting, non-entity code only).
- Don't hand-maintain entity types in `packages/shared` — derive them from the
  Drizzle schema once it lands.
- A module owns its routes under a path prefix; avoid collisions.
