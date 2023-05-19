import supertest, { SuperTest, Test } from 'supertest'

import { app } from '../src/app'

export { app } from '../src/app'

export interface TestUser {
  email: string
  password: string
}

export const testUsers: TestUser[] = [
  { email: 'super@feathers-mongo-api.com.au', password: 'changeme' }
]

export async function authenticate(request: SuperTest<Test>, creds?: TestUser): Promise<{ Authorization: string }> {
  const { email, password } = creds || testUsers[0]
  const { body: { accessToken } } = await request.post('/authenticate').send({ strategy: 'local', email, password })
  return { Authorization: `Bearer ${accessToken}` }
}

export async function setupUsers(users: TestUser[]) {
  const userService = app.service('users')
  users.forEach(async (seedUser: TestUser) => {
    const { email, password } = seedUser
    const { total } = await userService.find({ query: { email } })
    if (total === 0) {
      await userService.create({ email, password })
    }
  })
}

export async function setup(): Promise<{ request: SuperTest<Test> }> {
  const server = await app.listen(app.get('port'))
  const request = supertest(server)
  return { request }
}

export async function teardown(): Promise<void> {
  await app.teardown()
}