import { create } from 'zustand'
import { enableMapSet } from 'immer';
import { immer } from 'zustand/middleware/immer'
import { uploadLinkToStorage } from '../http/upload-link-to-storage';

type Urls = {
  originalUrl: string,
  shortUrl: string,
}

type LinkState = {
  links: Map<string, Urls>;
  addLinks: (urls: Urls[]) => void;
  original: string;
  shortened: string;
  setOriginal: (value: string) => void;
  setShortened: (value: string) => void;
};

enableMapSet()

export const useLinks = create<LinkState, [['zustand/immer', never]]>(immer((set, get) => {
  async function processUpload(uploadId: string) {
    const link = get().links.get(uploadId)

    if (!link) return

    await uploadLinkToStorage(link.originalUrl, link.shortUrl)
  }

  function addLinks(urls: Urls[]) {
    for (const url of urls) {
      const linkId = crypto.randomUUID()

      const link: Urls = {
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl
      }

      set(state => {
        state.links.set(linkId, link)
      })

      processUpload(linkId)
    }
  }

  return {
    links: new Map(),
    addLinks,
    original: "",
    shortened: "",
    setOriginal: (value: string) => set({ original: value }),
    setShortened: (value: string) => set({ shortened: value }),
  }
}))