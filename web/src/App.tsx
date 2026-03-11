import CreateLinks from "./components/create-links";
import LinkList from "./components/link-list";

export function App() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center font-openSans">
      <div className="flex flex-col items-center sm:items-start justify-center max-w-5xl">
        <img className="mb-3 sm:mb-4" src="/Logo.png" alt="Logo" />
        <div className="h-full flex flex-col sm:flex-row sm:gap-8 items-start justify-center">
          <CreateLinks/>
          <LinkList/> 
        </div>
      </div>
    </main>
  )
}
