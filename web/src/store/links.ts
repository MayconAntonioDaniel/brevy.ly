import { create } from 'zustand'

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

export const useLinks = create<LinkState>((set, get) => {
  function addLinks(urls: Urls[]) {
    for (const url of urls) {
      const linkId = crypto.randomUUID()

      const link: Urls = {
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl
      }

      set(state => {
        return { links: state.links.set(linkId, link)}
      })
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
})