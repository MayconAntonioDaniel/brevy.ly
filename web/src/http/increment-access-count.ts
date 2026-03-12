import axios from "axios";

export async function incrementAccessCount(shortUrl: string) {
  const response = await axios.patch<{ accessCount: number }>(
    `http://localhost:3333/links/${shortUrl}/access`,
  );
  return response.data.accessCount;
}
