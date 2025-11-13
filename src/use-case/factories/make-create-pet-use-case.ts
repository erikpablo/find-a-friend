import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const prismaRepository = new PrismaPetRepository()
  const PetRepository = new CreatePetUseCase(prismaRepository)

  return PetRepository
}
