import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeRight } from '@/shared/either'

const deleteLinkInput = z.object({
  shortUrl: z.string().min(1),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(input: DeleteLinkInput) {
  const { shortUrl } = deleteLinkInput.parse(input)

  const deleted = await db.delete(schema.links).where(eq(schema.links.shortUrl, shortUrl))

  return makeRight({ deleted })
}
