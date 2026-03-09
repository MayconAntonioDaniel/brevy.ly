import { Form } from "./form";
import { Header } from "./header";

export default function CreateLinks() {
  return(
    <div className="bg-white w-95 h-85 rounded-lg p-8 gap-6 flex flex-col">
      <Header title='Novo Link'/>
      <Form/>
    </div>
  )
}
