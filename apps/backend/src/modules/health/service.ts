import type { HealthResponse } from './model'

// Business logic, decoupled from the HTTP layer. Prefers returning values over
// throwing; the controller maps them to responses.
export class HealthService {
  check(): HealthResponse {
    // Add dependency probes (DB, OTel exporter) here as they land.
    return { status: 'ok' }
  }
}

export const healthService = new HealthService()
