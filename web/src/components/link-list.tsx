import { DownloadButton } from "./download-button";
import { Header } from "./header";
import List from "./list";

export default function LinkList() {
  return (
    <div className="bg-white relative w-95 overflow-hidden sm:w-xl max-h-120 sm:max-h-130 rounded-lg p-8 gap-6 flex flex-col mb-4">
      {/* <LoadingCar/> */}
      <div className='flex justify-between'>
        <Header title='Meus Links'/>
        <DownloadButton/>
      </div>
      {/* <LoadingLinks/> */}
      <div className="flex flex-col gap-6 overflow-y-auto">
        <List/>
      </div>
    </div>
  )
}