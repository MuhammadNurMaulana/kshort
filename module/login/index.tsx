"use client";
import RegisterOrLogin from "@/common/components/layouts/RegisterOrLogin";
import { LoginView } from "@/common/constant/loginView";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginComponents() {
  const [error, setError] = useState("");
  const { push } = useRouter();

  const callbackUrl: any = `/`;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      if (formData.get("email") == "" || formData.get("email") == null || formData.get("password") == "" || formData.get("password") == null) {
        setError("Silahkan isi email dan password anda");
      } else {
        const res = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirect: false,
          callbackUrl,
        });

        if (!res?.error) {
          push(callbackUrl);
        } else {
          setError("Email atau password yang anda masukkan salah");
        }
      }
    } catch (error) {
      setError("Email atau password yang anda masukkan salah");
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-center md:h-screen items-center">
      <div className="w-full md:w-[30%] bg-[#7CD2D7] h-[40vh] md:h-screen flex items-center justify-center relative">
        <Image src={"/images/sign-logo.png"} width={500} height={500} alt="logo sign up" className="absolute md:-right-20 " />
      </div>
      <div className="w-full md:w-[70%]">
        <form onSubmit={submit} className="md:w-[70%] lg:w-1/2 m-auto grid gap-8 p-8 rounded-xl ">
          {error && <p className="text-white bg-red-700 p-2 rounded-md font-bold text-center text-xs">{error}</p>}

          <h1 className="font-bold text-2xl">Login</h1>

          <RegisterOrLogin form={LoginView} />

          <button type="submit" className="bg-red-700 text-white rounded-full p-2">
            Register
          </button>
        </form>
      </div>

      <div className="mt-8">
        <button onClick={() => signIn("google", { callbackUrl, redirect: false })}>Sign In With Google Account</button>
      </div>
    </div>
  );
}
