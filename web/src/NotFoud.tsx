export default function NotFound() {
  return (
    <div className="h-dvh p-10 flex items-center justify-center font-openSans">
      <div className="bg-white w-145 h-74 rounded-lg flex flex-col items-center justify-center gap-8 pl-12 pr-12">
        <img className="" src="/404.png" alt="Icone logo 404" />
        <h1 className="sm:text-4xl text-2xl font-bold text-center">Link não encontrado</h1>
        <p className="text-center text-xs sm:text-sm font-semibold text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é 
          uma URL inválida. Saiba mais em <a className='text-primary underline-offset-auto' href='/'>brev.ly</a>.
        </p>
      </div>
    </div>
  );
}
