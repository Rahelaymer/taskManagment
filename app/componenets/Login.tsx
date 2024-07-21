import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" w-1/2 flex h-[70vh]   flex-col items-center justify-center">
        <form className="flex flex-col">
          <Link href="/signup" className="mb-4 text-blue-700">
            Do n't have an account?
          </Link>
          <label className="mb-4 ">User name</label>
          <input className="mb-4 border" />
          <label className="mb-4"> Password</label>
          <input className="mb-4 border" />
          <Link href="/forgetpassword" className="mb-4 text-blue-500 mb-16">
            forget password?
          </Link>

          <button className="px-8 py-2 rounded-full bg-blue-500 text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
