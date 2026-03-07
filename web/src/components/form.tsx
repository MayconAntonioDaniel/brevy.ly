export function Form() {
  return (
    <form onSubmit={ () => '' } className='flex flex-col w-full'>
      <h3 className='text-gray-500 text-xs mb-2'>LINK ORIGINAL</h3>
      <input
        className="border-gray-300 border rounded-lg p-2 text-md focus:border-primary outline-none"
      />

      <h3 className='text-gray-500 text-xs mt-4 mb-2'>LINK ENCURTADO</h3>
      <input
        className="border-gray-300 border rounded-lg p-2 text-md focus:border-primary outline-none"
      />

      <button 
        type="submit" 
        className="bg-primary hover:bg-primary-hover disabled:bg-primary-disabled text-white py-2 px-4 rounded mt-6 text-md"
      >
        Salvar link
      </button>
    </form>
  )
}