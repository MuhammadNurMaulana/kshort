"use client";
import RegisterOrLogin from "@/common/components/layouts/RegisterOrLogin";
import { RegisterView } from "@/common/constant/registerView";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function RegisterComponents() {
  const [announce, setAnnounce] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    e.currentTarget.reset();
    if (
      formData.get("name") == null ||
      formData.get("email") == null ||
      formData.get("password") == null ||
      formData.get("phone") == null ||
      formData.get("name") == "" ||
      formData.get("email") == "" ||
      formData.get("password") == "" ||
      formData.get("phone") == ""
    ) {
      setError("Silahkan isi data yang masih kosong");
    } else {
      setAnnounce(false);
      const data = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          phone: formData.get("phone"),
        }),
      });
      const response = await data.json();
      if (response.message === "Register success") {
        setError("Akun anda sudah dibuat silahkan login");
      } else if (response.message === "Email already exist") {
        setError("Email anda sudah tersedia silahkan login");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:h-screen items-center">
      <div className="w-full md:w-[30%] bg-[#7CD2D7] h-[40vh] md:h-screen flex items-center justify-center relative">
        <Image src={"/images/sign-logo.png"} width={500} height={500} alt="logo sign up" className="absolute md:-right-20 " />
      </div>
      <div className="w-full md:w-[70%]">
        <form onSubmit={submit} className="md:w-[70%] lg:w-1/2 m-auto grid gap-8 p-8 rounded-xl ">
          <div>
            {error && <p className="text-white bg-red-700 p-2 rounded-md font-bold text-center text-xs mb-3">{error}</p>}
            <h1 className="font-bold text-2xl">Create Account</h1>
          </div>
          <RegisterOrLogin form={RegisterView} />

          <button type="submit" className="bg-red-700 text-white rounded-full p-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
