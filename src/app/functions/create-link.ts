import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const createLinkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().min(3),
})

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createLink(input: CreateLinkInput) {
  const { originalUrl, shortUrl } = createLinkInput.parse(input)

  await db.insert(schema.links).values({
    originalUrl,
    shortUrl,
    remoteKey: shortUrl,
    remoteUrl: originalUrl,
  })
}
