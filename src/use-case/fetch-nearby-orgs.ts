import type { PetsRepository } from '@/repositories/pets-repository'
import type { Org } from '@/prisma-client'
import type { OrgsRepository } from '@/repositories/orgs-repository'

interface FetchNearbyOrgsRequest {
  userLatitude: number
  userLongitude: number
  page: number
}

interface FetchNearbyOrgsResponse {
  orgs: Org[]
}

export class FetchNearbyOrgsUseCase {
  constructor(private OrgsRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
    page,
  }: FetchNearbyOrgsRequest): Promise<FetchNearbyOrgsResponse> {
    const orgs = await this.OrgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      page,
    })

    return {
      orgs,
    }
  }
}
