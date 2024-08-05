"use client";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import Avatar from "./../../components/Avatar";
export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionData = window?.localStorage.getItem("token");
  console.log(sessionData);

  return (
    <div className="md:flex my-10 mx-4">
      <div className="md:basis-1/5 md:h-screen h-16  border flex flex-col items-center ">
        <Avatar firstName="John" />
        <p className="mb-8 text-lg">username </p>
        <ul className="flex flex-col justify-center items-start space-y-4">
          <Link href="/dashboard" className="flex gap-1">
            <MdDashboard className="text-slate-700" />
            <li className="mt-[-4px]">Dashbord</li>
          </Link>
          <Link href="/dashboard/addtask" className="flex gap-1">
            <FaTasks className="text-slate-700" />
            <li className="mt-[-4px]">Add new task</li>
          </Link>
          <Link href="/dashboard/cardlists" className="flex gap-1">
            <LuView className="text-slate-700" />
            <li className="mt-[-4px]">View Task by Card</li>
          </Link>
        </ul>
      </div>
      <section className="md:basis-4/5">{children}</section>
    </div>
  );
}
