import axios from "axios"

export async function DownloadLinksCsv() {
  try {
    const response = await axios.post<{ url: string}>('http://localhost:3333/links/export-csv', )
    return response
  } catch(error) {
    console.error("Erro ao gerar CSV:", error);
    return null;
  }
}