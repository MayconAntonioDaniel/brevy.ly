import { Toaster } from "sonner";
import CreateLinks from "./components/create-links";
import LinkList from "./components/link-list";

export function App() {
  return (
    <main className="h-dvh w-dvw flex flex-col items-center font-openSans overflow-x-auto overflow-y-auto overflow-hidden">
      <Toaster richColors/>
      <div className="flex flex-col mt-10 sm:mt-30 items-center sm:items-start justify-center max-w-5xl">
        <a className="cursor-pointer" href="/">
          <img className="mb-3 sm:mb-4 w-30" src="/Logo.png" alt="Logo" />
        </a>
        <div className="h-full flex max-w-full flex-col sm:flex-row sm:gap-8 items-center sm:items-start justify-center">
          <CreateLinks/>
          <LinkList/> 
        </div>
      </div>
    </main>
  )
}
