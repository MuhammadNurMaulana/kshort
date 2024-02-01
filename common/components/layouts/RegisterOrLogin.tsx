import Input from "../Input";

interface RegisterOrLoginProps {
  form: {
    name: string;
    placeholder: string;
    type: string;
  }[];
}

export default function RegisterOrLogin({ form }: RegisterOrLoginProps) {
  return (
    <div className="grid gap-4">
      {form.map((item: any, index: any) => (
        <Input key={index} type={item.type} name={item.name} placeholder={item.placeholder} />
      ))}
    </div>
  );
}
