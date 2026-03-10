import * as z from "zod";
import { useState } from "react";
import { useLinks } from "../store/links";

export function Form() {
  const { addLinks, original, shortened, setOriginal, setShortened, loadingSaveLink } = useLinks()
  const [originalFocused, setOriginalFocused] = useState(false)
  const [shortenedFocused, setShortenedFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addLinks([{ originalUrl: original, shortUrl: shortened }])
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h3 className={`text-xs mb-2 transition-colors ${originalFocused ? "text-primary font-semibold" : "text-gray-500"}`}>LINK ORIGINAL</h3>
      <input
        className="border-gray-300 border rounded-lg p-2 text-sm focus:border-primary outline-none"
        placeholder="www.exemplo.com.br"
        value={original}
        onChange={e => setOriginal(e.target.value)}
        onFocus={() => setOriginalFocused(true)}
        onBlur={() => setOriginalFocused(false)}
      />
      <h3 className={`text-xs mt-4 mb-2 transition-colors ${shortenedFocused ? "text-primary font-semibold" : "text-gray-500"}`}>LINK ENCURTADO</h3>
      <div className="flex items-center border-gray-300 border rounded-lg pl-2 bg-white">
        <span className="text-gray-400 text-sm">brev.ly/</span>
        <input
          className="border-gray-300 border rounded-lg p-2 text-sm focus:border-primary outline-none flex-1"
          style={{ border: "none", boxShadow: "none" }}
          value={shortened}
          onChange={e => setShortened(e.target.value)}
          onFocus={() => setShortenedFocused(true)}
          onBlur={() => setShortenedFocused(false)}
        />
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary-hover disabled:bg-primary-disabled text-white py-2 px-4 rounded mt-6 text-md"
        disabled={loadingSaveLink}
      >
        {loadingSaveLink ? "Salvando..." : "Salvar link"}
      </button>
    </form>
  );
}
