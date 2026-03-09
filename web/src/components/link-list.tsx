import { DownloadButton } from "./download-button";
import { Header } from "./header";
import List from "./list";

export default function LinkList() {
  return (
    <div className="bg-white w-xl max-h-150 rounded-lg p-8 gap-6 flex flex-col">
      <div className='flex justify-between'>
        <Header title='Meus Links'/>
        <DownloadButton/>
      </div>
      <div className="flex flex-col gap-6 overflow-y-auto">
        <List/>
        <List/>
        <List/>
        <List/>
        <List/>
      </div>
    </div>
  )
}