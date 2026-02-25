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
          shortUrl: z
            .string()
            .min(1)
            .regex(/^[a-zA-Z0-9_-]+$/), // Campo para nome personalizado
        }),
        response: {
          201: z
            .object({ response: z.string() })
            .describe('Link criado com sucesso'),
          400: z.object({ message: z.string() }).describe('Erro de validação'),
          409: z
            .object({ message: z.string() })
            .describe('URL encurtada já existe'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      if (!originalUrl || !shortUrl) {
        return reply
          .status(400)
          .send({ message: 'URL e URL encurtada são obrigatórios' })
      }

      try {
        await createLink({ originalUrl, shortUrl: shortUrl.trim() })
        return reply.status(201).send({ response: 'Link criado com sucesso' })
      } catch (error: any) {
        if (error.code === 'SHORT_URL_EXISTS') {
          return reply.status(409).send({ message: 'URL encurtada já existe' })
        }
        return reply.status(400).send({ message: error.message })
      }
    }
  )
}
