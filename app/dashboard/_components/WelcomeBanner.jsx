"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

function WelcomeBanner() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="p-5 bg-blue-500 w-full text-white rounded-lg flex items-center gap-6">
      <Image src={"/laptop.png"} alt="laptop" width={100} height={100} />
      <div>
        <h2 className="font-bold text-3xl">Hello, {user?.fullName}</h2>
        <p className="">
          Welcome back, its time to get back and start learning new course
        </p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
