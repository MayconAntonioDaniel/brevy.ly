import { useState } from "react";
import { z } from "zod";
import { useLinks } from "../store/links";
import { GoAlert } from "react-icons/go";

export function Form() {
  const {
    addLinks,
    original,
    shortened,
    setOriginal,
    setShortened,
    loadingSaveLink,
  } = useLinks();
  const [originalFocused, setOriginalFocused] = useState(false);
  const [shortenedFocused, setShortenedFocused] = useState(false);
  const [errors, setErrors] = useState<{
    original?: string;
    shortened?: string;
  }>({});

  const schema = z.object({
    original: z.string().url({ message: "Insira uma URL válida." }),
    shortened: z
      .string()
      .min(1)
      .regex(/^[a-z0-9-]+$/, { message: "Informe uma url minúscula sem espaço/caracter especial." }), 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ original, shortened });
    if (!result.success) {
      const fieldErrors: { original?: string; shortened?: string } = {};
      for (const err of result.error.issues) {
        const field = err.path[0];
        if (field === "original" || field === "shortened") {
          fieldErrors[field] = err.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    addLinks([{ originalUrl: original, shortUrl: shortened }]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h3
        className={`text-xs mb-2 transition-colors ${originalFocused ? "text-primary font-semibold" : "text-gray-500"}`}
      >
        LINK ORIGINAL
      </h3>
      <input
        className="border-gray-300 border text-gray-700 rounded-lg p-2 text-sm focus:border-primary outline-none"
        placeholder="www.exemplo.com.br"
        value={original}
        onChange={(e) => setOriginal(e.target.value)}
        onFocus={() => setOriginalFocused(true)}
        onBlur={() => setOriginalFocused(false)}
      />
      {errors.original && (
        <span className="text-xs text-gray-500 mt-1 flex items-center gap-2">
          <GoAlert size="16px" color="#b12c4d" />
          {errors.original}
        </span>
      )}
      <h3
        className={`text-xs mt-4 mb-2 transition-colors ${shortenedFocused ? "text-primary font-semibold" : "text-gray-500"}`}
      >
        LINK ENCURTADO
      </h3>
      <div className="flex items-center border-gray-300 border rounded-lg pl-2 bg-white">
        <span className="text-gray-400 text-sm">brev.ly/</span>
        <input
          className="border-gray-300 text-gray-700 border rounded-lg p-2 text-sm focus:border-primary outline-none flex-1"
          style={{ border: "none", boxShadow: "none" }}
          value={shortened}
          onChange={(e) => setShortened(e.target.value)}
          onFocus={() => setShortenedFocused(true)}
          onBlur={() => setShortenedFocused(false)}
        />
      </div>
      {errors.shortened && (
        <span className="text-xs text-gray-600 mt-1 flex items-center gap-2 w-full">
          <GoAlert size="16px" color="#b12c4d" />
          {errors.shortened}
        </span>
      )}
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
