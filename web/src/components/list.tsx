import { useEffect } from "react";
import { useLinks } from "../store/links";
import { IoIosLink } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";

export default function List() {
  const links = useLinks((store) => store.links);
  const loading = useLinks((store) => store.loading);
  const fetchLinks = useLinks((store) => store.fetchLinks);
  const deleteLink = useLinks((store) => store.deleteLink);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleDelete = (shortUrl: string) => {
    if (window.confirm("Tem certeza que deseja deletar este link ?")) {
      deleteLink(shortUrl);
    }
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.info(
      <div>
        <span className="font-bold">Link copiado com sucesso!</span>
        <p>{`O link: ${link} foi copiado para a área de transferência.`}</p>
      </div>
    );
  };

  return (
    <div>
      {!loading && links.size === 0 ? (
        <>
          <div className=" bg-gray-300 h-px w-full mb-4" />
          <div className="flex flex-col justify-center items-center">
            <IoIosLink size="32px" className="text-gray-400 mt-4" />
            <h3 className="text-gray-500 text-xs mt-4">
              AINDA NÃO EXISTEM LINKS CADASTRADOS
            </h3>
          </div>
        </>
      ) : (
        Array.from(links.entries()).map(([linkId, link]) => (
          <div key={linkId}>
            <div className=" bg-gray-300 h-px w-full mb-4 mt-4" />
            <div className="flex justify-between">
              <div>
                <span className="text-primary flex text-sm font-semibold">
                  brev.ly/
                  <a
                    className="text-primary text-sm font-semibold truncate w-20 sm:w-60 block"
                    href={`redirect/${link.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    {link.shortUrl}
                </a>
                </span>
                <h4 className="text-xs text-gray-500 truncate w-35 sm:w-60">{link.originalUrl}</h4>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <h4 className="text-xs mr-4">{link.accessCount}</h4>
                <button className="bg-gray-200 p-2 rounded-md cursor-pointer hover:drop-shadow-sm hover:drop-shadow-primary"
                  onClick={ () => handleCopy(`http://localhost:5173/${link.shortUrl}`) }
                >
                  <FaRegCopy size="16px" />
                </button>
                <button
                  className="bg-gray-200 p-2 rounded-md cursor-pointer hover:drop-shadow-sm hover:drop-shadow-primary"
                  onClick={() => handleDelete(link.shortUrl)}
                >
                  <RiDeleteBin6Line size="16px" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
