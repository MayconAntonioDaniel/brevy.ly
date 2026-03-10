import { AiOutlineLoading } from "react-icons/ai"

export default function LoadingLinks() {
  return (
    <div className='flex flex-col items-center'>
      <AiOutlineLoading size='50px' className="text-primary animate-spin mx-auto mt-4"/>
      <h3 className="text-gray-500 text-xs mt-4">CARREGANDO LINKS...</h3>
    </div> 
  )
}