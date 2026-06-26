import { expect, test } from 'bun:test'
import { createApp } from '../src/app'

const app = createApp()

test('GET /health returns 200 { status: "ok" }', async () => {
  const res = await app.handle(new Request('http://localhost/health'))
  expect(res.status).toBe(200)
  expect(await res.json()).toEqual({ status: 'ok' })
})
