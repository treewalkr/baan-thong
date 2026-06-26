// Server entrypoint. Mounts the typed-env plugin (validates process.env at
// boot, fail-fast) and binds the port. Bun loads `.env` automatically.
import { env } from '@yolk-oss/elysia-env'
import { t } from 'elysia'
import { createApp } from './app'

const app = createApp().use(
  env({
    NODE_ENV: t.Union(
      [t.Literal('development'), t.Literal('production'), t.Literal('test')],
      { default: 'development' },
    ),
    PORT: t.Number({ default: 3000 }),
    WEB_ORIGIN: t.String(),
    COOKIE_DOMAIN: t.String(),
    DATABASE_URL: t.String(),
    JWT_SECRET: t.String({ minLength: 16 }),
    JWT_TTL: t.Number({ default: 604800 }),
    AXIOM_URL: t.String(),
    AXIOM_TOKEN: t.String(),
    AXIOM_DATASET: t.String(),
  }),
)

app.listen(Number(process.env.PORT ?? 3000), () => {
  console.log(
    `baan-thong backend → http://localhost:${app.server?.port} [${process.env.NODE_ENV ?? 'development'}]`,
  )
})
