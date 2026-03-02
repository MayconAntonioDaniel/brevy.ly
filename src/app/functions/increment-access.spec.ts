import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import fastify from 'fastify'
import { describe, expect, it } from 'vitest'
import { createLink } from '@/app/functions/create-link'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { incrementAccessRoute } from '@/infra/http/routes/increment-access'

describe('incrementAccessRoute', () => {
  it('should increment accessCount for a link', async () => {
    const app = fastify()
    await app.register(incrementAccessRoute)

    const originalUrl = `https://www.${randomUUID()}.com`
    const shortUrl = randomUUID()
    await createLink({ originalUrl, shortUrl })

    // Incrementa 2 vezes
    await app.inject({ method: 'PATCH', url: `/links/${shortUrl}/access` })
    const response = await app.inject({
      method: 'PATCH',
      url: `/links/${shortUrl}/access`,
    })

    expect(response.statusCode).toBe(200)
    expect(response.json().accessCount).toBe(2)

    // Confirma no banco
    const [link] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, shortUrl))
    expect(link.accessCount).toBe(2)
  })

  it('should return 404 if link does not exist', async () => {
    const app = fastify()
    await app.register(incrementAccessRoute)

    const response = await app.inject({
      method: 'PATCH',
      url: `/links/${randomUUID()}/access`,
    })
    expect(response.statusCode).toBe(404)
    expect(response.json().message).toBe('Link não encontrado')
  })
})
