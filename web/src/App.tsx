import CreateLinks from "./components/create-links";
import LinkList from "./components/link-list";

export function App() {
  return (
    <main className="h-dvhflex items-center justify-center p-10 font-openSans">
      <div className="h-full flex gap-8 items-start justify-center">
        <CreateLinks/>
        <LinkList/> 
      </div>
    </main>
  )
}
