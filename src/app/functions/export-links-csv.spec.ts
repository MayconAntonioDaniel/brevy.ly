import { randomUUID } from 'node:crypto'
import { describe, it } from 'vitest'
import { makeLink } from '@/test/factories/make-link'
import { exportLinksToCsvAndUpload } from './export-links-csv'

describe('exportLinksCsv', () => {
  it('should export links to CSV', async () => {
    const namePattern = randomUUID()

    const link1 = await makeLink({
      originalUrl: `https://www.${namePattern}.com`,
    })
    const link2 = await makeLink({
      originalUrl: `https://www.${namePattern}.com`,
    })
    const link3 = await makeLink({
      originalUrl: `https://www.${namePattern}.com`,
    })
    const link4 = await makeLink({
      originalUrl: `https://www.${namePattern}.com`,
    })
    const link5 = await makeLink({
      originalUrl: `https://www.${namePattern}.com`,
    })

    const sut = await exportLinksToCsvAndUpload({
      searchQuery: namePattern,
    })
  })
})
