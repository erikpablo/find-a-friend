import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import z, { ZodError } from 'zod'
import { env } from './env'
import { AppException } from './shared/errors/app-exception'
import { ErrorsCode } from './shared/errors/errors-code'
import fastifyJwt from '@fastify/jwt'
import { petsRoute } from './http/controllers/pet/routes'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import storage from './config/storage'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyMultipart)
app.register(fastifyStatic, {
  root: storage.resolvePetImagePath,
  prefix: '/images/',
})

app.register(orgsRoutes)
app.register(petsRoute)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      error: z.treeifyError(error),
    })
  }

  if (error instanceof AppException) {
    return reply.status(error.statusCode || 400).send({
      message: error.message,
      code: error.errorsCode,
    })
  }

  if (env.NODE_ENV === 'dev') {
    console.log(error)
  } else {
    // Mandaria para open telemetry da vida
  }

  return reply.status(500).send({
    message: 'Internal server error',
    code: ErrorsCode.INTERNAL_SERVER_ERROR,
  })
})
