import { makeAuthenticateOrgUseCase } from '@/use-case/factories/make-authenticate-org-use-case'
import { makeCreateOrgUseCase } from '@/use-case/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const OrgSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  })

  const { email, password } = OrgSchema.parse(request.body)

  const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

  const { org } = await authenticateOrgUseCase.execute({
    email,
    password,
  })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: org.id,
      },
    }
  )

  return reply.status(200).send({
    token,
  })
}
