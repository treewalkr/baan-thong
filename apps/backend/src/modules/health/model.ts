import { type Static, t } from 'elysia'

// Response shape for GET /health. Reused as the route's response schema so
// the contract is enforced and flows to Eden/OpenAPI downstream.
export const HealthResponse = t.Object({
  status: t.Literal('ok'),
})

export type HealthResponse = Static<typeof HealthResponse>
