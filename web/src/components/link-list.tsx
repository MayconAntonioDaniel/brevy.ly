import { useLinks } from "../store/links";
import { DownloadButton } from "./download-button";
import { Header } from "./header";
import List from "./list";
import LoadingCar from "./loading-car";
import LoadingLinks from "./loading-links";

export default function LinkList() {
  const loading = useLinks(store => store.loading)
  const loadingSaveLink = useLinks(store => store.loadingSaveLink)

  return (
    <div className="bg-white relative w-95 overflow-hidden sm:w-xl max-h-120 sm:max-h-180 rounded-lg p-8 gap-6 flex flex-col mb-4">
      { (loading || loadingSaveLink) && <LoadingCar/> }
      <div className='flex justify-between'>
        <Header title='Meus Links'/>
        <DownloadButton/>
      </div>
      { loading && <LoadingLinks/> }
      <div className="flex flex-col gap-6 p-2 overflow-y-auto custom-scrollbar">
        <List/>
      </div>
    </div>
  )
}