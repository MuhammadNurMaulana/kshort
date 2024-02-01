"use client";
import Navbar from "@/common/components/elements/Navbar";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <h1>Home</h1>
        <h1>{data?.user?.name}</h1>
        <h1>{data?.user?.email}</h1>
      </div>
    </div>
  );
}
