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
          url: z.string(), // Campo para URL original
          customName: z.string(), // Campo para nome personalizado
        }),
        response: {
          201: z.object({
            url: z.string(),
            customName: z.string(),
          }),
          400: z.object({ message: z.string() }).describe('Validation error'),
          409: z
            .object({ message: z.string() })
            .describe('Name already exists'),
        },
      },
    },
    async (request, reply) => {
      const { url, customName } = request.body

      if (!url || !customName) {
        return reply.status(400).send({ message: 'URL and Name are required' })
      }

      await createLink({ url, customName })

      return reply.status(201).send({ url: 'teste1', customName: 'tes1' })
    }
  )
}
