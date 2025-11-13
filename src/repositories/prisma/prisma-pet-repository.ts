import type { Prisma, Pet } from '@prisma/client'
import type { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetsRepository {
  async findByName(name: string): Promise<Pet | null> {
    const pet = prisma.pet.findFirst({
      where: {
        name,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
