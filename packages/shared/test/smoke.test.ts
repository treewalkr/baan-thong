import { expect, test } from 'bun:test'

import { APP_NAME } from '../src'

test('APP_NAME is a non-empty string', () => {
  expect(typeof APP_NAME).toBe('string')
  expect(APP_NAME.length).toBeGreaterThan(0)
})
