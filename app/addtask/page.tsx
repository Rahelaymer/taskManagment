"use client";

import { FormEventHandler, useState } from "react";

import { useRouter } from "next/navigation";
import Title from "../componenets/Title";

const AddNewTask = () => {
  const router = useRouter();

  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [newTaskDate, setNewTaskDate] = useState<string>("");
  const [newTaskTime, setNewTaskTime] = useState<string>("");
  const [newTaskStatus, setNewTaskStatus] = useState<string>("");
  const [newTaskPriority, setNewTaskPriority] = useState<string>("");
  const [newTaskCatagorize, setNewTaskCatagorize] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setNewTaskValue("");
    setNewTaskDescription("");
    setNewTaskStatus("");
    setNewTaskPriority("");
    setNewTaskCatagorize("");
    setNewTaskDate("");
    setNewTaskTime("");
    router.refresh();
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTime(e.target.value);
  };
  return (
    <div className="px-8">
      <Title title="Add new task" />
      <form onSubmit={handleSubmitNewTodo}>
        <div className="md:flex px-8">
          <div className="md:basis-1/2 flex flex-col  gap-3 mb-4">
            <label className="text-lg ">Task Name</label>
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Read Book"
              className="h-9 text-lg w-2/3 rounded-lg 
            border-2 border-blue-500"
            />
            <label className="text-lg ">Description</label>
            <textarea
              id="comments"
              name="comments"
              value={newTaskDescription}
              rows={4}
              cols={50}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="text-lg w-2/3 rounded-lg 
                    border-2 border-blue-500 "
            />

            <label className="text-lg ">Date: </label>
            <input
              value={newTaskDate}
              onChange={handleDateChange}
              type="date"
              placeholder="date"
              className="h-9 text-lg w-2/3 rounded-lg 
            border-2 border-blue-500 "
            />
            <label className="text-lg ">Time: </label>
            <input
              value={newTaskTime}
              onChange={handleTimeChange}
              type="time"
              placeholder="time"
              className="h-9 text-lg w-2/3 rounded-lg 
            border-2 border-blue-500 "
            />
          </div>
          <div className="md:basis-1/2 ">
            <div>
              <label className="text-2xl">Status</label>
              <ul className="ml-5 mt-2 mb-5">
                <li>
                  <label className="text-lg">
                    <input
                      className="mr-2"
                      type="radio"
                      checked={newTaskStatus === "Started"}
                      name="status"
                      id="started"
                      value="Started"
                      onChange={(e) => setNewTaskStatus(e.target.value)}
                    />
                    Started
                  </label>
                </li>
                <li>
                  <label className="text-lg">
                    <input
                      className="mr-2"
                      type="radio"
                      checked={newTaskStatus === "Inprogress"}
                      name="status"
                      id="inprogress"
                      value="Inprogress"
                      onChange={(e) => setNewTaskStatus(e.target.value)}
                    />
                    Inprogress
                  </label>
                </li>
                <li>
                  <label className="text-lg">
                    <input
                      className="mr-2"
                      type="radio"
                      checked={newTaskStatus === "Completed"}
                      name="status"
                      id="completed"
                      value="Completed"
                      onChange={(e) => setNewTaskStatus(e.target.value)}
                    />
                    Completed
                  </label>
                </li>
              </ul>
            </div>
            <div>
              <label className="text-2xl">Priority</label>
              <ul className="ml-5 mt-2 mb-5">
                <li>
                  <label className="text-lg">
                    <input
                      className="mr-2"
                      type="radio"
                      checked={newTaskPriority === "High"}
                      name="priority"
                      id="high"
                      value="High"
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                    />
                    High
                  </label>
                </li>
                <li>
                  <label className="text-lg">
                    <input
                      className="mr-2"
                      type="radio"
                      checked={newTaskPriority === "Medium"}
                      name="priority"
                      id="medium"
                      value="Medium"
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                    />
                    Medium
                  </label>
                </li>
                <li>
                  <label className="text-lg">
                    <input
                      className="mr-2"
                      type="radio"
                      checked={newTaskPriority === "Low"}
                      name="priority"
                      id="low"
                      value="Low"
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                    />
                    Low
                  </label>
                </li>
              </ul>
            </div>
            <div>
              <label className="text-2xl">Catagorization</label>
              <ul className="ml-5 mt-2 mb-5">
                <li>
                  <label className="text-lg">
                    <input
                      className="mr-2"
                      type="radio"
                      checked={newTaskCatagorize === "Personal"}
                      name="catagorization"
                      id="personal"
                      value="Personal"
                      onChange={(e) => setNewTaskCatagorize(e.target.value)}
                    />
                    Personal
                  </label>
                </li>
                <li>
                  <label className="text-lg">
                    <input
                      className="mr-2"
                      type="radio"
                      checked={newTaskCatagorize === "Work"}
                      name="catagorization"
                      id="work"
                      value="Work"
                      onChange={(e) => setNewTaskCatagorize(e.target.value)}
                    />
                    Work
                  </label>
                </li>
                <li>
                  <label className="text-lg">
                    <input
                      className="mr-2"
                      type="radio"
                      checked={newTaskCatagorize === "Shooping"}
                      name="catagorization"
                      id="shooping"
                      value="Shooping"
                      onChange={(e) => setNewTaskCatagorize(e.target.value)}
                    />
                    Shooping
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 px-2 md:w-1/4 text-white 
                           rounded-lg h-9 text-xl font-bold 
                           tracking-widest ml-[45%]  mt-10"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddNewTask;
