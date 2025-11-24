import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetByIdUseCase } from '../get-pet-by-id'

export function makeGetPetByIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetByIdUseCase = new GetPetByIdUseCase(petsRepository)

  return getPetByIdUseCase
}
