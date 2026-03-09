import { CiSaveDown2 } from "react-icons/ci"

export function DownloadButton() {
  return (
    <button className="cursor-pointer flex items-center gap-2 text-xs text-gray-500 font-semibold bg-gray-200 px-4 py-2 rounded">
      <CiSaveDown2 size='16px' style={{ strokeWidth: '0.5px'}} />
      Baixar CSV
    </button>
  )
}