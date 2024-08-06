"use client";

import React, { useEffect, useState } from "react";
import ReusableModal from "./../../components/ReusableModal";
import axios from "axios";
import LoaderAnimation from "@/components/LoaderAnimation";
import ErrorMessage from "@/components/ErrorMessage";

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

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sessionData, setSessionData] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Task;
    direction: string;
  }>({
    key: "title",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasksPerPage, setTasksPerPage] = useState<number>(3);
  const [formState, setFormState] = useState<Task>({
    id: "",
    title: "",
    end_at: "",
    time: "",
    priority: "",
    category: "",
    description: "",
    isComplete: false,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  const sortData = (key: keyof Task) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setTasks(sortedTasks);
    setSortConfig({ key, direction });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTasksPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTasksPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleEdit = (task: Task) => {
    setFormState(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormState({
      id: "",
      title: "",
      end_at: "",
      time: "",
      priority: "",
      category: "",
      description: "",
      isComplete: false,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://task-manager-back-r2x9.onrender.com/api/tasks/${formState.id}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${sessionData}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask: Task = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      handleCloseModal();
      setError(null);
    } catch (error) {
      setError("Error updating task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://task-manager-back-r2x9.onrender.com/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${sessionData}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setError(null);
    } catch (error) {
      setError("Error deleting task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId: string, isComplete: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://task-manager-back-r2x9.onrender.com/api/tasks/${taskId}/complete`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${sessionData}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isComplete }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle task completion");
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, isComplete } : task
        )
      );
      setError(null);
    } catch (error) {
      setError("Error toggling task completion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className=" flex items-center justify-center">
      {loading ? (
        <td colSpan={6} className="text-center justify-center py-4">
          <LoaderAnimation />
        </td>
      ) : error ? (
        <div className="text-center py-4 text-red-600">{error}</div>
      ) : (
        <div className="relative max-w-[90vw] scrollbar-hidden max-h-screen overflow-scroll mx-6 shadow-md sm:rounded-lg bg-gray-50">
          <div className="flex flex-col justify-start sm:items-center sm:justify-between flex-wrap sm:flex-row space-y-4 md:space-y-0 pb-4 bg-gray-50">
            <div className="px-4 py-3 mt-3 sm:mt-0 sm:ml-0 font-bold text-gray-700">
              Organize your tasks &nbsp;&nbsp;&nbsp;
            </div>
            <div className="relative pr-4 py-7 ml-4 sm:ml-0">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 18l5-5"
                  />
                </svg>
              </div>
              <input
                value={searchTerm}
                onChange={handleSearch}
                type="text"
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 focus:border-blue-500 text-sm rounded-lg block w-full pl-10 p-2.5 hover:bg-gray-200 focus:ring-blue-100"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="overflow-x-auto sm:overscroll-none">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-md text-gray-700 capitalize bg-gray-200">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 cursor-pointer"
                    onClick={() => sortData("title")}
                  >
                    Title
                    {sortConfig.key === "title" &&
                      (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    End At
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Time
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Priority
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Category
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Description
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Complete
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Edit
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`bg-white border-b p-1 ${
                      task.isComplete ? "line-through" : ""
                    } hover:bg-gray-50`}
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{task.title}</td>
                    <td className="py-4 px-6">{task.end_at}</td>
                    <td className="py-4 px-6">{task.time}</td>
                    <td className="py-4 px-6">{task.priority}</td>
                    <td className="py-4 px-6">{task.category}</td>
                    <td className="py-4 px-6">{task.description}</td>
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={task.isComplete}
                        onChange={() =>
                          toggleTaskCompletion(task.id, !task.isComplete)
                        }
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </td>
                    <td className=" w-16">
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-blue-500 w-full hover:bg-blue-600 py-1 text-white font-bold  rounded"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="w-16">
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 w-full hover:bg-red-600 py-1 text-white ml-2 font-bold rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {currentTasks.length == 0 && (
            <div className=" bold text-4xl my-4 flex text-center items-center justify-center ">
              Empty Task
            </div>
          )}
          <div className="flex justify-between items-center py-4">
            <div>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(filteredTasks.length / tasksPerPage)
                    )
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredTasks.length / tasksPerPage)
                }
                className="px-4 py-2 ml-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Next
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Page {currentPage} of{" "}
              {Math.ceil(filteredTasks.length / tasksPerPage)}
            </div>
            <div className="relative">
              <select
                value={tasksPerPage}
                onChange={handleTasksPerPageChange}
                className="appearance-none border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
              >
                <option value={3}>3 per page</option>
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
              </select>
            </div>
          </div>
          {isModalOpen && (
            <ReusableModal open={isModalOpen} onClose={handleCloseModal}>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formState.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="end_at"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End At
                  </label>
                  <input
                    type="date"
                    id="end_at"
                    value={formState.end_at}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={formState.time}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Priority
                  </label>
                  <input
                    type="text"
                    id="priority"
                    value={formState.priority}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={formState.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formState.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows={3}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </ReusableModal>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
