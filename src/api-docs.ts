import swagger, { SwaggerService } from 'feathers-swagger'
import type { Application } from './declarations'

export function withApiDocs<T>(service: T, docs: { [x: string]: any }): T {
  // @ts-ignore
  service.docs = docs
  return service
}

export const secureOperation = { security: [{ bearerAuth: [] }] }

export default swagger({
  specs: {
    info: {
      title: 'feathers-mongo-api',
      version: '0.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        authentication: {
          type: 'object',
          properties: {
            strategy: { type: 'string', default: 'local' },
            email: { type: 'string', default: 'test@feathers-mongo-api.com.au' },
            password: { type: 'string', default: 'changeme' },
          },
        },
      },
    },
    security: { bearerAuth: [] },
    tags: [{ name: 'authentication', description: 'Authentication' }],
  },
  docsJsonPath: '/api-docs-json',
  ui: swagger.swaggerUI({ docsPath: '/api-docs' }),
  defaults: {
    schemasGenerator(service: SwaggerService<Application>, model: string, modelName: string, schemas: any) {
      return {
        [`${model}List`]: { type: 'array', items: { ref: `#/components/schemas/${model}` } },
        ...service.docs.definitions,
      }
    },
  },
})
