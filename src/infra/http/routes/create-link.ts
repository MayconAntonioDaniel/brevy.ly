import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a new shortened link',
        body: z.object({
          url: z.string(),
        }),
        response: {
          201: z.object({ urlId: z.string() }),
          409: z.object({ message: z.string() }).describe('Url already exists'),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send({ urlId: 'abc123' })
    }
  )
}
