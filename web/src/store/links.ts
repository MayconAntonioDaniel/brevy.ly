import { create } from "zustand";
import { enableMapSet } from "immer";
import { immer } from "zustand/middleware/immer";
import { uploadLinkToStorage } from "../http/upload-link-to-storage";
import { getLinksFromStorage } from "../http/get-links-from-storage";
import { deleteLinkFromStorage } from "../http/delete-link-from-storage";

type Urls = {
  originalUrl: string;
  shortUrl: string;
  accessCount?: number;
};

type LinkState = {
  links: Map<string, Urls>;
  addLinks: (urls: Urls[]) => void;
  fetchLinks: () => Promise<void>;
  deleteLink: (linkId: string) => Promise<void>;
  original: string;
  shortened: string;
  setOriginal: (value: string) => void;
  setShortened: (value: string) => void;
  loading: boolean;
  loadingSaveLink: boolean;
};

enableMapSet();

export const useLinks = create<LinkState, [["zustand/immer", never]]>(
  immer((set, get) => {
    async function processUpload(linkId: string, urlData: Urls) {
      console.log(urlData)

      const uploadResult = await uploadLinkToStorage(urlData.originalUrl, urlData.shortUrl);
      console.log(!uploadResult)
      if (!uploadResult) {
        set({ loadingSaveLink: false });
        return
      }
      set((state) => {
        const newLink: Urls = {
          ...urlData,
          accessCount: 0,
        };
        state.links.set(linkId, newLink);
        state.loadingSaveLink = false;
      });
    }

    function addLinks(urls: Urls[]) {
      set({ loadingSaveLink: true });
      for (const url of urls) {
        const linkId = crypto.randomUUID();
     
        processUpload(linkId, url);
      }
    }

    async function fetchLinks() {
      set({ loading: true });

      const apiLinks = await getLinksFromStorage();
      set((state) => {
        state.links.clear();
        for (const link of apiLinks) {
          state.links.set(link.id, {
            originalUrl: link.originalUrl,
            shortUrl: link.shortUrl,
            accessCount: link.accessCount,
          });
        }
      });

      set({ loading: false });
    }

    async function deleteLink(shortUrl: string) {
      await deleteLinkFromStorage(shortUrl);
      set((state) => {
        const idToDelete = Array.from(state.links.entries()).find(
          ([, link]) => link.shortUrl === shortUrl,
        )?.[0];
        if (idToDelete) {
          state.links.delete(idToDelete);
        }
      });
    }

    return {
      links: new Map(),
      addLinks,
      fetchLinks,
      original: "",
      shortened: "",
      setOriginal: (value: string) => set({ original: value }),
      setShortened: (value: string) => set({ shortened: value }),
      loading: false,
      loadingSaveLink: false,
      deleteLink,
    };
  }),
);
