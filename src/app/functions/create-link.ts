import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const createLinkInput = z.object({
  url: z.string(),
  customName: z.string(),
})

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createLink(input: CreateLinkInput) {
  const { url, customName } = createLinkInput.parse(input)

  await db.insert(schema.links).values({
    url,
    customName,
    remoteKey: customName,
    remoteUrl: url,
  })
}
