import type { PetImagesUncheckedCreateInput } from 'generated/prisma/models'
import type { PetImagesRepository } from '../pet-prisma-repository'
import { prisma } from '@/lib/prisma'

export class prismaPetImagesRepository implements PetImagesRepository {
  async create(data: PetImagesUncheckedCreateInput): Promise<void> {
    await prisma.petImages.create({
      data,
    })
  }
}
