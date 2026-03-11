import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function RedirectPage() {
  const { shortUrl } = useParams();

  useEffect(() => {
    async function fetchOriginalUrl() {
      try {
        const response = await axios.get(
          `http://localhost:3333/redirect/${shortUrl}`,
        );
        window.location.href = response.data;
      } catch (error) {
        console.error("Erro ao buscar URL original:", error);
      }
    }

    fetchOriginalUrl();
  }, [shortUrl]);

  return (
    <div className="h-dvh p-10 flex items-center justify-center font-openSans">
      <div className="bg-white w-145 h-74 rounded-lg flex flex-col items-center justify-center gap-8 pl-12 pr-12">
        <img className="" src="/Logo_Icon.png" alt="Icone logo" />
        <h1 className="text-4xl font-bold">Redirecionando...</h1>
        <p className="text-center font-semibold text-gray-500">
          O link será aberto automaticamente em alguns instantes. 
          Não foi redirecionado? <a className='text-primary' target="_blank" href={window.location.href}>Acesse aqui</a>
        </p>
      </div>
    </div>
  );
}
