import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { incrementAccessCount } from '@/app/functions/increment-access'

export const incrementAccessRoute: FastifyPluginAsyncZod = async server => {
  server.patch(
    '/links/:shortUrl/access',
    {
      schema: {
        summary: 'Incrementa o número de acessos de um link',
        params: z.object({
          shortUrl: z.string().min(1),
        }),
        response: {
          200: z.object({ accessCount: z.number() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params
      const result = await incrementAccessCount({ shortUrl })
      if (!result || !result.right) {
        return reply.status(404).send({ message: 'Link não encontrado' })
      }
      return reply.send({ accessCount: result.right.accessCount })
    }
  )
}
