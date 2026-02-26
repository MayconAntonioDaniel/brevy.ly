import { randomUUID } from 'node:crypto'
import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  // const nameUrl = faker.system.fileName()
  const result = await db
    .insert(schema.links)
    .values({
      originalUrl: `https://${randomUUID()}.com/`,
      shortUrl: randomUUID(),
      remoteKey: `links/${randomUUID()}`,
      remoteUrl: `https://example.com/links/${randomUUID()}`,
      ...overrides,
    })
    .returning()

  return result[0]
}
