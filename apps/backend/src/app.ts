import { Elysia } from 'elysia'
import { healthModule } from './modules/health'

// Composes the app from its modules. Env validation is mounted in index.ts
// (boot path) so tests can exercise the app without binding a port or env.
export const createApp = () => new Elysia().use(healthModule)

export type App = ReturnType<typeof createApp>
