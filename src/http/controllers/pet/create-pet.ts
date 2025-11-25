import { makeCreatePetUseCase } from '@/use-case/factories/make-create-pet-use-case'
import {
  LevelEnergy,
  LevelIndependency,
  PetAge,
  PetSize,
} from '@/prisma-client'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetSchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(PetAge),
    orgAddressId: z.uuid(),
    levelEnergy: z.enum(LevelEnergy),
    levelIndependency: z.enum(LevelIndependency),
    environmentType: z.string(),
    size: z.enum(PetSize),
    adoptionRequirements: z.string(),
  })

  const { sub } = request.user

  const data = createPetSchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({ ...data, orgId: sub })
  return reply.status(201).send()
}
