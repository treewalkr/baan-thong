import { Elysia } from 'elysia'
import { HealthResponse } from './model'
import { healthService } from './service'

// health module — the sample module. A self-contained Elysia instance the app
// composes via .use(). Owns its route prefix; the model is registered by name
// so it flows to OpenAPI/Eden and can be reused across the module's routes.
export const healthModule = new Elysia({
  name: 'module.health',
  prefix: '/health',
})
  .model({ HealthResponse })
  .get('/', () => healthService.check(), {
    response: { 200: 'HealthResponse' },
  })
