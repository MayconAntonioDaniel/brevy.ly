import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeRight } from '@/shared/either'

const incrementAccessInput = z.object({
  shortUrl: z.string().min(1),
})

type IncrementAccessInput = z.input<typeof incrementAccessInput>

export async function incrementAccessCount(input: IncrementAccessInput) {
  const { shortUrl } = incrementAccessInput.parse(input)

  const updated = await db
    .update(schema.links)
    .set({ accessCount: sql`${schema.links.accessCount} + 1` })
    .where(eq(schema.links.shortUrl, shortUrl))
    .returning({ accessCount: schema.links.accessCount })

  if (updated.length === 0) {
    return null
  }

  return makeRight({ accessCount: updated[0].accessCount })
}
