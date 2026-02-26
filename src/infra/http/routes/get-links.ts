import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getLinks } from '@/app/functions/get-links'
import { unwrapEither } from '@/shared/either'

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get links',
        querystring: z.object({
          searchQuery: z.string().optional(),
          sortBy: z.enum(['createdAt']).optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
          page: z.coerce.number().optional().default(1),
          pageSize: z.coerce.number().optional().default(20),
        }),
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                originalUrl: z.string(),
                shortUrl: z.string(),
                accessCount: z.number(),
                createdAt: z.date(),
                remoteKey: z.string(),
                remoteUrl: z.string(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery, sortBy, sortDirection, page, pageSize } =
        request.query

      const result = await getLinks({
        searchQuery,
        sortBy,
        sortDirection,
        page,
        pageSize,
      })

      const { total, links } = unwrapEither(result)

      return reply.status(200).send({ total, links })
    }
  )
}
