"use client";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import Avatar from "./../../components/Avatar";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface name {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
  time: string;
  created_at: string;
  updated_at: string;
  end_at: string;
  is_complete: boolean;
  user_id: number;
}

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<name[]>([]);
  const [sessionData, setSessionData] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window?.localStorage.getItem("token");
      setSessionData(token);
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!sessionData) return;

      setLoading(true);
      try {
        const response = await axios.get(
          "https://task-manager-back-r2x9.onrender.com/api/user/all",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionData}`,
            },
          }
        );
        setTasks(response.data);
        setError(null);
      } catch (error) {
        setError("Error fetching tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [sessionData]);

  const handlelogOut = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await logout();
      router.push("/login");
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center my-16 mx-14">
      <div className=" p-6 border border-gray-200 rounded-lg sticky">
        <div className=" flex items-center flex-col justify-center">
          <Avatar firstName="John" />
          <p className="mb-8 text-lg">username </p>
        </div>
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
          <button onClick={handlelogOut} className="flex gap-1 mt-10">
            <li className="mt-[-4px]">Log out</li>
          </button>
        </ul>
      </div>
      <section className="md:basis-4/5 ">{children}</section>
    </div>
  );
}
function setSessionData(token: string | null) {
  throw new Error("Function not implemented.");
}
