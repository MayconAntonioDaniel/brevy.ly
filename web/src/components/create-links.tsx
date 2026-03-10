import { Form } from "./form";
import { Header } from "./header";

export default function CreateLinks() {
  return(
    <div className="bg-white w-95 h-85 sm:mb-0 mb-4 rounded-lg p-8 gap-6 flex flex-col">
      <Header title='Novo Link'/>
      <Form/>
    </div>
  )
}
