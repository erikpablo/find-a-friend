import { PresenterOrgMapper } from '@/http/presenters/org.presenter'
import { makeFetchNearbyOrgsUseCase } from '@/use-case/factories/make-fetch-nearby-orgs-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const createQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    page: z.coerce.number().optional().default(1),
  })

  const { latitude, longitude, page } = createQuerySchema.parse(request.query)

  const fetchNearbyOrgUseCase = makeFetchNearbyOrgsUseCase()

  const result = await fetchNearbyOrgUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    page,
  })

  const orgs = result.orgs.map(PresenterOrgMapper.toHTTP)

  return reply.status(200).send({ orgs: result.orgs })
}
