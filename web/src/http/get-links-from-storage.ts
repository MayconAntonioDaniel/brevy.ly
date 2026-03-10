import axios from "axios";

export async function getLinksFromStorage() {
  const response = await axios.get("http://localhost:3333/get-links")

  return response.data.links;
}
