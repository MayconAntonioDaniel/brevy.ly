import axios from "axios"

export async function deleteLinkFromStorage(shortUrl: string) {
  await axios.delete(`http://localhost:3333/delete-link/${shortUrl}`)
}