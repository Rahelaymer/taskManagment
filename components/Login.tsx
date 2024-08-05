import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" w-1/2 flex h-[70vh] flex-col items-center justify-center">
        <form className="flex flex-col">
          <label className="m-2 text-center text-blue-500 text-3xl font-extrabold">
            LOG IN
          </label>
          <label className="m-2 ">User name</label>
          <input className="m-2 border" />
          <label className="m-2"> Password</label>
          <input className="m-2 border" />
          <Link href="/forgetpassword" className="m-2 text-blue-500">
            Forget password?
          </Link>
          <button className="px-8 py-2  bg-blue-500 text-white">Login</button>
          <p className="m-2">
            Don&apos;t have an account?
            <Link href="/signup" className="m-2 text-blue-500 my-4">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
