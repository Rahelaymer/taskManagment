"use client";

import { useState, useEffect } from "react";
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

interface FormState {
  title: string;
  end_at: string;
  time: string;
  priority: string;
  category: string;
  description: string;
}

const AddNewTask: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    title: "",
    end_at: "",
    time: "",
    priority: "",
    category: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   // Retrieve token from local storage after component mounts
  //   const storedToken = localStorage.getItem("token");
  //   setToken(storedToken);
  // }, [window]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setError("");

    // if (!token) {
    //   setError("User not authenticated.");
    //   setIsError(true);
    //   setIsLoading(false);
    //   return;
    // }
    const storedToken = window?.localStorage.getItem("token");
    console.log('====================================');
    console.log(storedToken);
    console.log('====================================');
    try {
      // API call to add a new task
      const response = await fetch(
        "https://task-manager-back-r2x9.onrender.com/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
            Accept: "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add task.");
      }

      const addedTask = await response.json();
      console.log("Task added:", addedTask);
      setIsSuccess(true);
      setFormState({
        title: "",
        end_at: "",
        time: "",
        priority: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setIsSuccess(false), 3000);
    }
    if (isError) {
      setTimeout(() => setIsError(false), 3000);
    }
  }, [isSuccess, isError]);

  return (
    <div className="grid gap-9 mt-12">
      <div className="flex justify-center gap-3 sm:mx-80">
        <div className="w-full mx-5">
          <h2 className="font-bold pb-3 flex justify-center text-xl">
            Add your task
          </h2>
          <div className="sm:max-h-[570px] max-h-screen overflow-y-auto">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="title"
                    className="block mt-4 text-sm font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    value={formState.title}
                    onChange={handleChange}
                    className="pl-3 py-3 w-full rounded-md sm:text-sm bg-gray-200 text-black outline-blue-500"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="priority"
                    className="block mt-4 text-sm font-medium text-gray-900"
                  >
                    Priority
                  </label>
                  <input
                    id="priority"
                    value={formState.priority}
                    onChange={handleChange}
                    className="pl-3 py-3 w-full rounded-md sm:text-sm bg-gray-200 text-black outline-blue-500"
                    placeholder="Enter priority level"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="end_at"
                    className="block mt-4 text-sm font-medium"
                  >
                    Date
                  </label>
                  <input
                    id="end_at"
                    type="date"
                    value={formState.end_at}
                    onChange={handleChange}
                    className="pl-3 py-3 w-full rounded-md sm:text-sm bg-gray-200 text-black outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block mt-4 text-sm font-medium"
                  >
                    Time
                  </label>
                  <input
                    id="time"
                    type="time"
                    value={formState.time}
                    onChange={handleChange}
                    className="pl-3 py-3 w-full rounded-md sm:text-sm bg-gray-200 text-black outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mt-4 text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <input
                    id="category"
                    value={formState.category}
                    onChange={handleChange}
                    className="pl-3 py-3 w-full rounded-md sm:text-sm bg-gray-200 text-black outline-blue-500"
                    placeholder="Enter category"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mt-4 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formState.description}
                    onChange={handleChange}
                    className="pl-3 py-3 w-full rounded-md sm:text-sm bg-gray-200 text-black outline-blue-500"
                    placeholder="Enter task description"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white mb-2 p-2 mt-6 bg-blue-500 hover:bg-blue-700 font-bold py-2 px-16 rounded w-full flex justify-center items-center disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin h-6 mr-2" />
                ) : (
                  "Add Task"
                )}
              </button>
            </form>
            {isSuccess && (
              <div className="flex items-center justify-center mt-4 text-green-500">
                <FaCheckCircle className="mr-2" />
                Task added successfully!
              </div>
            )}
            {isError && (
              <div className="flex items-center justify-center mt-4 text-red-500">
                <FaExclamationCircle className="mr-2" />
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTask;
