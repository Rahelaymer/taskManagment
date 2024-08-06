"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import axios from "axios";
import LoaderAnimation from "@/components/LoaderAnimation";

interface Task {
  id: string;
  title: string;
  end_at: string;
  time: string;
  priority: string;
  category: string;
  description: string;
  isComplete: boolean;
}

const Page: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sessionData, setSessionData] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
          "https://task-manager-back-r2x9.onrender.com/api/tasks",
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

  return (
    <div className=" flex items-center justify-center">
      <div>
        {loading ? (
          <td colSpan={6} className="text-center justify-center py-4">
            <LoaderAnimation />
          </td>
        ) : error ? (
          <div className="text-center py-4 text-red-600">{error}</div>
        ) : (
          <div className="grid w-full h-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((data, index) => (
              <Card key={index} {...data} />
            ))}
          </div>
        )}

        {tasks.length == 0 && (
          <div className=" bold text-4xl my-4 flex items-center justify-center ">
            Empty Task
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
