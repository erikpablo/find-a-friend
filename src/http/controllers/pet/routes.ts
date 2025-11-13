import type { FastifyInstance } from 'fastify'
import { create } from './create-pet'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoute(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/pets', create)
}
