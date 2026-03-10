import { IoIosLink } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";
import { useLinks } from "../store/links";

export default function List() {
  const { links } = useLinks();

  return (
    <div>
      {links.size === 0 ? (
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
                <span className="text-primary text-sm font-semibold">
                  brev.ly/
                </span>
                <a className="text-primary text-sm font-semibold">
                  {link.originalUrl}
                </a>
                <h4 className="text-xs text-gray-500">{link.shortUrl}</h4>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <h4 className="text-xs mr-4">30 acessos</h4>
                <button className="bg-gray-200 p-2 rounded-md cursor-pointer hover:drop-shadow-sm hover:drop-shadow-primary">
                  <FaRegCopy size="16px" />
                </button>
                <button className="bg-gray-200 p-2 rounded-md cursor-pointer hover:drop-shadow-sm hover:drop-shadow-primary">
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
