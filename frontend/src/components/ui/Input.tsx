import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm font-medium mb-1">{label}</label>}
      <input className="border rounded px-3 py-2 w-full" {...props} />
    </div>
  );
}