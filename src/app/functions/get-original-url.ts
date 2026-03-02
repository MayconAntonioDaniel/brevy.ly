import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeRight } from '@/shared/either'

const getOriginalUrlInput = z.object({
  shortUrl: z.string().min(1),
})

type GetOriginalUrlInput = z.input<typeof getOriginalUrlInput>

export async function getOriginalUrl(input: GetOriginalUrlInput) {
  const { shortUrl } = getOriginalUrlInput.parse(input)

  const result = await db
    .select({ originalUrl: schema.links.originalUrl })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))

  if (result.length === 0) {
    return null
  }

  return makeRight({ originalUrl: result[0].originalUrl })
}
