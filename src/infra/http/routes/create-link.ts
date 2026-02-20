import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

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
      await db.insert(schema.links).values({
        url: 'teste2',
        remoteKey: 'abc123',
        remoteUrl: 'http://example.com',
      })
      return reply.status(201).send({ urlId: 'teste2' })
    }
  )
}
