import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeRight } from '@/shared/either'

const createLinkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/), 
})

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createLink(input: CreateLinkInput) {
  const { originalUrl, shortUrl } = createLinkInput.parse(input)

  const existing = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))

  if (existing.length > 0) {
    const error = new Error('URL encurtada já existe')
    ;(error as any).code = 'SHORT_URL_EXISTS'
    throw error
  }

  await db.insert(schema.links).values({
    originalUrl,
    shortUrl,
    remoteKey: shortUrl,
    remoteUrl: originalUrl,
  })

  return makeRight({ originalUrl, shortUrl })
}
