import { LocalStorageProvider } from '@/shared/providers/storage/implementations/local-storage'
import { UploadPetImagesUseCase } from '../upload-pet-images'
import { prismaPetImagesRepository } from '@/repositories/prisma/prisma-pet-images-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'

export function makeUploadPetImagesUseCase() {
  const petImagesRepository = new prismaPetImagesRepository()
  const petsRepository = new PrismaPetsRepository()
  const storageProvider = new LocalStorageProvider()

  const uploadPetImagesUseCase = new UploadPetImagesUseCase(
    petImagesRepository,
    petsRepository,
    storageProvider
  )

  return uploadPetImagesUseCase
}
