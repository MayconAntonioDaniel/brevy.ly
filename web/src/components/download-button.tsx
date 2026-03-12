import  { useState } from "react"
import { CiSaveDown2 } from "react-icons/ci"
import { DownloadLinksCsv } from "../http/download-links-csv"
import { AiOutlineLoading } from "react-icons/ai";

export function DownloadButton() {
  const [loading, setLoading] = useState(false)
  
  const handleDownload = async () => {
    setLoading(true)
    const response = await DownloadLinksCsv();
    console.log(response)
    if (response && response.data && response.data.url) {
      window.open(response.data.url, '_blank');
    }
    setLoading(false)
  };

  return (
    <button
      className="cursor-pointer flex items-center gap-2 text-xs text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:drop-shadow-none disabled:bg-gray-100 font-semibold bg-gray-200 px-4 py-2 rounded hover:drop-shadow-sm hover:drop-shadow-primary"
      onClick={handleDownload} disabled={loading}
    >
      { loading ? <AiOutlineLoading className='animate-spin' size='16px' style={{ strokeWidth: '0.5px'}} /> : <CiSaveDown2 size='16px' style={{ strokeWidth: '0.5px'}} /> } 
      Baixar CSV
    </button>
  )
}