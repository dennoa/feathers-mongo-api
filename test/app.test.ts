// For more information about this file see https://dove.feathersjs.com/guides/cli/app.test.html
import assert from 'assert'
import { SuperTest, Test } from 'supertest'

import { setup, teardown } from './helpers'

describe('Feathers application tests', () => {
  let req: SuperTest<Test>

  before(async () => {
    const { request } = await setup()
    req = request
  })

  after(async () => {
    await teardown()
  })

  it('starts and shows the index page', async () => {
    const { text } = await req.get('/')
    assert.ok(text.indexOf('<html lang="en">') !== -1)
  })

  it('shows a 404 JSON error', async () => {
    const { status } = await req.get('/path/to/nowhere')
    assert.strictEqual(status, 404)
  })
})
