import { withApiDocs, secureOperation } from '../../api-docs'
import { UserService } from './users.class'
import { userSchema, userDataSchema } from './users.schema'

const docs = {
  description: 'Manage users',
  schemas: {
    users: userSchema,
    userData: userDataSchema,
  },
  operations: {
    find: secureOperation,
    get: secureOperation,
    patch: secureOperation,
    remove: secureOperation,
  },
}

export const withUserApiDocs = (service: UserService) => withApiDocs<UserService>(service, docs)
