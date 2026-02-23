import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const createLinkInput = z.object({
  url: z.string().url(),
  customName: z.string().min(3).max(32),
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
