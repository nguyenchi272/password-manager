export function Modal({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded p-4 shadow">{children}</div>
    </div>
  )
}