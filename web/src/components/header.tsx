export function Header({ title }: { title: string }) {
  return (
    <h1 className="text-lg font-bold w-full">
      { title }
    </h1>
  )
}