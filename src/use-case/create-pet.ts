import type { PetsRepository } from '@/repositories/pets-repository'
import type {
  LevelEnergy,
  LevelIndependency,
  Pet,
  PetAge,
  PetSize,
} from '@/prisma-client'
import { PetAlreadyExistError } from './errors/pet-already-exist-error'

interface CreatePetUseCaseRequest {
  orgId: string
  name: string
  description: string
  age: PetAge
  orgAddressId: string
  levelEnergy: LevelEnergy
  levelIndependency: LevelIndependency
  environmentType: string
  size: PetSize
  adoptionRequirements: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    name,
    description,
    age,
    orgAddressId,
    levelEnergy,
    levelIndependency,
    environmentType,
    size,
    adoptionRequirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const petAlreadyExist = await this.petsRepository.findByName(name)

    if (petAlreadyExist) {
      throw new PetAlreadyExistError(name)
    }

    const pet = await this.petsRepository.create({
      orgId,
      name,
      description,
      age,
      orgAddressId,
      levelEnergy,
      levelIndependency,
      environmentType,
      size,
      adoptionRequirements,
    })

    return {
      pet,
    }
  }
}
