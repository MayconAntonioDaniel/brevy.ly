import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createLink } from '@/app/functions/create-link'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a new shortened link',
        body: z.object({
          originalUrl: z.string().url(), // Campo para URL original
          shortUrl: z.string().min(3), // Campo para nome personalizado
        }),
        response: {
          201: z.object({ response: z.string() }),
          400: z.object({ message: z.string() }).describe('Validation error'),
          409: z
            .object({ message: z.string() })
            .describe('Name already exists'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = await request.body

      if (!originalUrl || !shortUrl) {
        return reply.status(400).send({ message: 'URL and Name are required' })
      }

      await createLink({ originalUrl, shortUrl })

      return reply.status(201).send({ response: 'teste' })
    }
  )
}
