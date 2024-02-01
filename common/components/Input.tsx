interface InputProps {
  type: string;
  name: string;
  placeholder: string;
}

export default function Input({ type, name, placeholder }: InputProps) {
  return <input type={type} name={name} id={name} placeholder={placeholder} className="border border-neutral-500 p-2 rounded-md text-xs font-bold" />;
}
