import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteLink } from '@/app/functions/delete-link'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/delete-link/:shortUrl',
    {
      schema: {
        summary: 'Excluir link',
        params: z.object({
          shortUrl: z.string().min(1),
        }),
        response: {
          200: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params
      const result = await deleteLink({ shortUrl })

      if (result.right.deleted.count === 0) {
        return reply.status(404).send({ message: 'Link não encontrado' })
      }
      return reply.send({ message: 'Link deletado com sucesso' })
    }
  )
}
