import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { exportLinksToCsvAndUpload } from '@/app/functions/export-links-csv'

export const exportLinksCsvRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links/export-csv',
    {
      schema: {
        summary: 'Exporta todos os links em CSV e retorna o link do arquivo',
        response: {
          200: z.object({ url: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (_request, reply) => {
      try {
        const url = await exportLinksToCsvAndUpload()
        return reply.send({ url })
      } catch (error: any) {
        return reply.status(500).send({ message: error.message })
      }
    }
  )
}
