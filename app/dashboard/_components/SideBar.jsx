"use client";
import { CourseCountContext } from "@/app/_context/CourseCountContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Shield, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

function SideBar() {
  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
    {
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];

  const { totalCourse, setTotlaCourse } = useContext(CourseCountContext);
  const path = usePathname();
  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <h2 className="font-bold text-2xl">StudyGenie </h2>
      </div>

      <div className="mt-10">
        <Link href={"/create"} className="w-full">
          <Button className="w-full">+&nbsp;Create New</Button>
        </Link>
        <div className="mt-5">
          {MenuList.map((menu, index) => (
            <div
              key={index}
              className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${
                path == menu.path && "bg-slate-200"
              }`}
            >
              <menu.icon />
              <a href={menu.path}>{menu.name}</a>
            </div>
          ))}
        </div>
      </div>
      <div className="border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[86%]">
        <h2 className="text-lg mb-3">Available Credits : {5 - totalCourse}</h2>
        <Progress value={(totalCourse / 5) * 100} />
        <h2 className="text-xs mt-1">{totalCourse} Out of 5 Credits used</h2>
        <Link href="/dashboard/upgrade" className="text-primary text-sm mt-2">
          Upgrade to create more
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
