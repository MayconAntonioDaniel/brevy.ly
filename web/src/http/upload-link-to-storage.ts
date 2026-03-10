import axios from 'axios'

export async function uploadLinkToStorage(originalUrl: string, shortUrl: string) {
  const data = new FormData()

  data.append('originalUrl', originalUrl)
  data.append('shortUrl', shortUrl)

  const response = await axios.post<{ url: string}>('http://localhost:3333/create-link', {
    originalUrl,
    shortUrl,
  })

  return { originalUrl: response.data.url }
}