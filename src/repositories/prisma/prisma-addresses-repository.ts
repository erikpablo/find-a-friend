import { Org, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrgAddressesRepository } from '../org-addresses-repository'

export class PrismaAddressesRepository implements OrgAddressesRepository {
  async create(data: Prisma.OrgAddressUncheckedCreateInput): Promise<void> {
    await prisma.orgAddress.create({
      data,
    })
  }
}
