// import { randomUUID } from 'node:crypto'
// import { eq } from 'drizzle-orm'
// import { expect, it } from 'vitest'
// import { db } from '@/infra/db'
// import { schema } from '@/infra/db/schemas'
// import { isRight } from '@/shared/either'
// import { createLink } from './create-link'

// it('should create a new link', async () => {
//   const originalUrl = `https://www.${randomUUID()}.com`
//   const shortUrl = randomUUID()

//   const sut = await createLink({
//     originalUrl,
//     shortUrl,
//   })

//   expect(isRight(sut)).toBe(true)

//   const result = await db
//     .select()
//     .from(schema.links)
//     .where(eq(schema.links.shortUrl, shortUrl))

//   expect(result).toHaveLength(1)
// })
