export function Button({ children, className = '', ...props }: any) {
  return (
    <button className={`bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50 ${className}`} {...props}>
      {children}
    </button>
  )
}