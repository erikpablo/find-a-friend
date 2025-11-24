import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const prismaRepository = new PrismaPetsRepository()
  const PetRepository = new CreatePetUseCase(prismaRepository)

  return PetRepository
}
