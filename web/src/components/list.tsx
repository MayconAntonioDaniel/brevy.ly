import { IoIosLink } from "react-icons/io"
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";

export default function List() {
  return (
    <div>
      <div className=" bg-gray-300 h-px w-full mb-4"/>
      {/* <div className="flex flex-col justify-center items-center">
        <IoIosLink size='32px' className="text-gray-400 mt-4"/>
        <h3 className="text-gray-500 text-xs mt-4">AINDA NÃO EXISTEM LINKS CADASTRADOS</h3>
      </div> */}
      <div className="flex justify-between">
        <div className=''>
          <span className="text-primary text-sm font-semibold">brevly.ly/</span>
          <a className='flex1 text-primary text-sm font-semibold'>Porfolio-Dev</a>
          <h4 className='text-xs text-gray-500'>devsite.potfolio.com.br</h4>
        </div>
        <div className='flex items-center gap-1 text-gray-500'>
          <h4 className='text-xs mr-4'>30 acessos</h4>
          <button className="bg-gray-200 p-2 rounded-md cursor-pointer">
            <FaRegCopy size='16px' />
          </button>
          <button className="bg-gray-200 p-2 rounded-md cursor-pointer">
            <RiDeleteBin6Line size='16px'/>
          </button>
        </div>
      </div>

    </div>
  )

}