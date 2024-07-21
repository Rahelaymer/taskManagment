import React from "react";
import Title from "../componenets/Title";

const taskPage = () => {
  return (
    <div className="px-8">
      <Title title="Task List" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        <div
          className="
      flex  gap-3  border-blue-500 border-2 px-2 py-4 rounded-2xl"
        >
          <div>
            <h3 className="text-blue-500 font-bold">Assignment</h3>
            <p>Finish the Task Managment Project.</p>
            <p>7/7/2024</p>
          </div>
          <div className="basis-1/2 ">
            <p>Priority: high</p>
            <p>Status: inprogress</p>
            <p>Category: work</p>
          </div>
        </div>
        <div
          className="
      flex gap-4  border-blue-500 border-2 px-2 py-4 rounded-2xl"
        >
          <div>
            <h3 className="text-blue-500 font-bold">Read Book</h3>
            <p>Read at least one chapter of the Next js.</p>
            <p>7/7/2024</p>
          </div>
          <div className="basis-1/2 ">
            <p>Priority: high</p>
            <p>Status: inprogress</p>
            <p>Category: work</p>
          </div>
        </div>
        <div
          className="
      flex gap-4  border-blue-500 border-2 px-2 py-4 rounded-2xl"
        >
          <div>
            <h3 className="text-blue-500 font-bold">Team Meeting</h3>
            <p>
              {" "}
              Attend the weekly team meeting to discuss project updates and
              milestones.
            </p>
            <p>7/7/2024</p>
          </div>
          <div className="basis-1/2 ">
            <p>Priority: high</p>
            <p>Status: inprogress</p>
            <p>Category: work</p>
          </div>
        </div>
        <div
          className="
      flex gap-4  border-blue-500 border-2 px-2 py-4 rounded-2xl"
        >
          <div>
            <h3 className="text-blue-500 font-bold">Going to church</h3>
            <p></p>
            <p>7/7/2024</p>
          </div>
          <div className="basis-1/2 ">
            <p>Priority: high</p>
            <p>Status: inprogress</p>
            <p>Category: Personal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default taskPage;
