import type { FastifyInstance } from 'fastify'
import { create } from './create-pet'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { getPetById } from './get-pet-by-id'
import { fetch } from './fetch'
import { upload } from './upload'

export async function petsRoute(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, create)
  app.post(
    '/pets/:petId/files',
    {
      onRequest: [verifyJwt],
    },
    upload
  )
  app.get('/pets', fetch)
  app.get('/pets/:petId', getPetById)
}
