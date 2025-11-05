import { OrgAddressesRepository } from '@/repositories/org-addresses-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PASSWORD_ROUNDS } from '@/utils/constants'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  owner: string
  orgName: string
  email: string
  password: string
  phone: string
  address: {
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    cep: string
    complement?: string
  }
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private OrgAddressesRepository: OrgAddressesRepository
  ) {}

  async execute({
    owner,
    orgName,
    email,
    password,
    phone,
    address,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (
      userWithSameEmail &&
      userWithSameEmail.orgName.toLowerCase() === orgName.toLowerCase()
    ) {
      throw new Error(`Org already exists`)
    }

    if (userWithSameEmail) {
      throw new Error(`Org with this email already exists`)
    }

    const passwordHash = await hash(password, PASSWORD_ROUNDS)

    const org = await this.orgsRepository.create({
      owner,
      orgName,
      email,
      password: passwordHash,
      phone,
    })

    const { cep, city, complement, neighborhood, number, state, street } =
      address

    await this.OrgAddressesRepository.create({
      cep,
      city,
      complement,
      neighborhood,
      number,
      state,
      street,
      orgId: org.id,
    })

    return { org }
  }
}
