import Link from "next/link";
import React from "react";

const signuppage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" w-1/2 flex h-[70vh]   flex-col items-center justify-center">
        <form className="flex flex-col">
          <Link href="/login" className="mb-4 text-blue-700"></Link>
          <label className="mb-4 ">User name</label>
          <input className="mb-4 border" />
          <label className="mb-4"> Password</label>
          <input className="mb-4 border" />
          <label className="mb-4"> Confrim Password</label>
          <input className="mb-4 border" />
          <Link href="/login">
            <p className="text-blue-700 mb-16">Already have an account?</p>
          </Link>
          <button className="px-8 py-2  bg-blue-500 rounded-full text-white">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default signuppage;
