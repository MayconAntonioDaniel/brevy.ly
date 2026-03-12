import axios from 'axios'
import { toast } from 'sonner'

export async function uploadLinkToStorage(originalUrl: string, shortUrl: string) {
  const data = new FormData()

  data.append('originalUrl', originalUrl)
  data.append('shortUrl', shortUrl)

  try {
    const response = await axios.post<{ url: string}>('http://localhost:3333/create-link', {
      originalUrl,
      shortUrl,
    })
    return { originalUrl: response.data.url }
  } catch (error: any) {
    if (error.response.status === 409) {
      toast.error('URL encurtada já existe!')
    }
    return null
  }
}