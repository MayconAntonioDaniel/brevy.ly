import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getOriginalUrl } from '@/app/functions/get-original-url'

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/redirect/:shortUrl',
    {
      schema: {
        summary: 'Redireciona para a URL original',
        params: z.object({
          shortUrl: z.string().min(1),
        }),
        response: {
          302: z.any().describe('Redirecionamento'),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params
      
      const result = await getOriginalUrl({ shortUrl })
      if (!result || !result.right) {
        return reply.status(404).send({ message: 'Link não encontrado' })
      }

      return reply.send(result.right.originalUrl)
    }
  )
}
