import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { createLink } from '@/app/functions/create-link'
import { deleteLink } from '@/app/functions/delete-link'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

describe('deleteLink', () => {
  it('should delete a link by shortUrl', async () => {
    const originalUrl = `https://www.${randomUUID()}.com`
    const shortUrl = randomUUID()

    // Cria o link
    await createLink({ originalUrl, shortUrl })

    // Garante que o link existe
    let result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, shortUrl))
    expect(result).toHaveLength(1)

    // Deleta o link
    const deleted = await deleteLink({ shortUrl })
    expect(deleted.right.deleted.count).toBe(1)

    // Garante que o link foi removido
    result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, shortUrl))
    expect(result).toHaveLength(0)
  })

  it('should return count 0 if link does not exist', async () => {
    const shortUrl = randomUUID()
    const deleted = await deleteLink({ shortUrl })
    expect(deleted.right.deleted.count).toBe(0)
  })
})
