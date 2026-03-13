import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { exportLinksToCsvAndUpload } from '@/app/functions/export-links-csv'
import { unwrapEither } from '@/shared/either'

export const exportLinksCsvRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links/export-csv',
    {
      schema: {
        summary: 'Exporta todos os links em CSV e retorna o link do arquivo',
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({ url: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query

      const result = await exportLinksToCsvAndUpload({ searchQuery })
      const { url } = unwrapEither(result)

      return reply.status(200).send({ url })
    }
  )
}
