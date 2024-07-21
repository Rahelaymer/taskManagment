import React from "react";
import Title from "../componenets/Title";
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";
const tableListpage = () => {
  return (
    <div className="px-8">
      <Title title="Task Lists" />
      <table className="min-w-full divided-y divide-gray-500">
        <tr className=" text-blue-500 ">
          <th className="px-1 pt-3">Date</th>
          <th className="px-1 pt-3">Time</th>
          <th className="px-1 pt-3">Task Name</th>
          <th className="px-1 pt-3">Description</th>
          <th className="px-1 pt-3">Priority</th>
          <th className="px-1 pt-3">Status</th>
          <th className="px-1 pt-3">Category</th>
          <th className="px-1 pt-3">Action</th>
        </tr>
        <tr className="border-b">
          <td className="px-1 pt-3">7/7/2024</td>
          <td className="px-1 pt-3">09:00</td>
          <td className="px-1 pt-3">Assignment</td>
          <td className="px-1 pt-3">Finish the Task Managment Project.</td>
          <td className="px-1 pt-3">high</td>
          <td className="px-1 pt-3">inprogress</td>
          <td className="px-1 pt-3">work</td>
          <td className="px-1 pt-3 flex gap-x-2">
            <LuFileEdit className="size-6 text-blue-500" />{" "}
            <RiDeleteBin5Fill className="size-6 text-blue-500" />{" "}
          </td>
        </tr>
        <tr className="border-b ">
          <td className="px-1 pt-3">2/4/2024</td>
          <td className="px-1 pt-3">09:00</td>
          <td className="px-1 pt-3">Read Book</td>
          <td className="px-1 pt-3">
            Read at least one chapter of the Next js.
          </td>
          <td className="px-1 pt-3">high</td>
          <td className="px-1 pt-3">inprogress</td>
          <td className="px-1 pt-3">work</td>
          <td className="px-1 pt-3 flex gap-x-2">
            <LuFileEdit className="size-6 text-blue-500" />{" "}
            <RiDeleteBin5Fill className="size-6 text-blue-500" />{" "}
          </td>
        </tr>
        <tr className="border-b ">
          <td className="px-1 pt-3">2/4/2024</td>
          <td className="px-1 pt-3">09:00</td>
          <td className="px-1 pt-3">Team Meeting</td>
          <td className="px-1 pt-3">
            Attend the weekly team meeting to discuss project updates and
            milestones.
          </td>
          <td className="px-1 pt-3">high</td>
          <td className="px-1 pt-3">inprogress</td>
          <td className="px-1 pt-3">work</td>
          <td className="px-1 pt-3 flex gap-x-2">
            <LuFileEdit className="size-6 text-blue-500" />{" "}
            <RiDeleteBin5Fill className="size-6 text-blue-500" />{" "}
          </td>
        </tr>
        <tr className="border-b ">
          <td className="px-1 pt-3">2/4/2024</td>
          <td className="px-1 pt-3">09:00</td>
          <td className="px-1 pt-3">Going to church</td>
          <td className="px-1 pt-3"></td>
          <td className="px-1 pt-3">high</td>
          <td className="px-1 pt-3">start</td>
          <td className="px-1 pt-3">personal</td>
          <td className="px-1 pt-3 flex gap-x-2">
            <LuFileEdit className="size-6 text-blue-500" />{" "}
            <RiDeleteBin5Fill className="size-6 text-blue-500" />{" "}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default tableListpage;
