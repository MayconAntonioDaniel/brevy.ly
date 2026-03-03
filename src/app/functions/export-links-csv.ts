import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import writeXlsxFile from 'write-excel-file/node'
import { env } from '@/env'
import { r2 } from '@/infra/storage/client'
import { getLinks } from './get-links'

export async function exportLinksToCsvAndUpload() {
  // Busca todos os links
  const result = await getLinks({ page: 1, pageSize: 10000 })
  const links = result.right?.links || []

  const objects = links.map(el => ({
    id: el.id,
    originalUrl: el.originalUrl,
    shortUrl: el.shortUrl,
    accessCount: el.accessCount,
    createdAt: dayjs(el.createdAt).format('YYYY-MM-DD HH:mm:ss'),
  }))

  type LinkObject = {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: string
  }

  const schema = [
    {
      column: 'ID',
      type: String,
      value: (item: LinkObject) => item.id,
      width: 30,
    },
    {
      column: 'URL Original',
      type: String,
      value: (item: LinkObject) => item.originalUrl,
      width: 30,
    },
    {
      column: 'URL Encurtada',
      type: String,
      value: (item: LinkObject) => item.shortUrl,
      width: 20,
    },
    {
      column: 'Acessos',
      type: Number,
      value: (item: LinkObject) => item.accessCount,
      width: 5,
    },
    {
      column: 'Data de Criação',
      type: String,
      value: (item: LinkObject) => item.createdAt,
      width: 20,
    },
  ]

  const fileName = `Relatório-URL-Encurtadas(${randomUUID()}).xlsx`
  const buffer = (await writeXlsxFile(objects, {
    schema,
    buffer: true,
  })) as Buffer

  // Upload para R2
  await r2.send(
    new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
  )

  // Retorna URL pública
  const url = `${env.CLOUDFLARE_PUBLIC_URL}/${fileName}`
  return url
}
