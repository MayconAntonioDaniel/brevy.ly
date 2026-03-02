import { randomUUID } from 'node:crypto'
import fastify from 'fastify'
import { describe, expect, it } from 'vitest'
import { createLink } from '@/app/functions/create-link'
import { getOriginalUrlRoute } from '@/infra/http/routes/get-original-url'

describe('getOriginalUrlRoute', () => {
  it('should redirect to the original URL', async () => {
    const app = fastify()
    await app.register(getOriginalUrlRoute)

    const originalUrl = `https://www.${randomUUID()}.com`
    const shortUrl = randomUUID()
    await createLink({ originalUrl, shortUrl })

    const response = await app.inject({
      method: 'GET',
      url: `/redirect/${shortUrl}`,
    })

    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe(originalUrl)
  })

  it('should return 404 if shortUrl does not exist', async () => {
    const app = fastify()
    await app.register(getOriginalUrlRoute)

    const response = await app.inject({
      method: 'GET',
      url: `/redirect/${randomUUID()}`,
    })

    expect(response.statusCode).toBe(404)
    expect(response.json().message).toBe('Link não encontrado')
  })
})
