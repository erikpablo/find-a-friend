import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '../create-org'
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'

export function makeCreateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const prismaOrgAddressesRepository = new PrismaAddressesRepository()
  const createOrgUseCase = new CreateOrgUseCase(
    prismaOrgsRepository,
    prismaOrgAddressesRepository
  )

  return createOrgUseCase
}
