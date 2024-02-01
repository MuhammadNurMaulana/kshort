"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data } = useSession();
  return (
    <nav className="w-full p-4 bg-teal-700 text-white flex items-center justify-between">
      <button onClick={() => (data ? signOut() : signIn("/login"))}>{data ? "Sign Out" : "Sign In"}</button>
      <h1>{data?.user?.name}</h1>
    </nav>
  );
}
