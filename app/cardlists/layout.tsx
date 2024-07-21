import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { LuView } from "react-icons/lu";
export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:flex">
      <div className="md:basis-1/5 md:h-screen h-16  border flex flex-col items-center ">
        <img
          className="w-32 h-28 rounded-full mt-8 mb-2"
          src="https://media.istockphoto.com/id/2099403180/photo/laughing-yougn-businesswoman-standing-with-her-arms-crossed-against-an-office-wall.jpg?s=1024x1024&w=is&k=20&c=BqAmUmk3ja-I3Ehc4jgk8eJG4jDu5ucG0uxQz7OeST0="
          alt="Profile image"
        />
        <p className="mb-8 text-lg">username </p>
        <ul className="flex flex-col justify-center items-start space-y-4">
          <Link href="/dashboard" className="flex gap-1">
            <MdDashboard className="text-slate-700" />
            <li className="mt-[-4px]">Dashbord</li>
          </Link>
          <Link href="/addtask" className="flex gap-1">
            <FaTasks className="text-slate-700" />
            <li className="mt-[-4px]">Add new task</li>
          </Link>
          <Link href="/tablelists" className="flex gap-1">
            <LuView className="text-slate-700" />
            <li className="mt-[-4px]">View Task by Table</li>
          </Link>
          <Link href="/cardlists" className="flex gap-1">
            <LuView className="text-slate-700" />
            <li className="mt-[-4px]">View Task by Card</li>
          </Link>
        </ul>
      </div>
      <section className="md:basis-4/5">{children}</section>
    </div>
  );
}
