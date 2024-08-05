"use client";

import { Suspense, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full py-24">
      <div className="p-6 sm:p-8 sm:pt-6 mt-4 w-full mx-2 sm:mx-0 max-w-[26rem] md:max-w-[31rem] bg-white shadow-2xl rounded-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight">
            Task Management
          </h2>
        </div>
        <div className="mt-9 sm:mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative mt-2 w-full">
              <BiLogoGmail
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#2063EB]"
                size={24}
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="outline-gray-200 pl-10 pr-12 py-3 w-full border border-gray-200 rounded-md sm:text-sm text-black bg-blue-50"
              />
            </div>

            <div className="relative mt-2 w-full">
              <IoMdLock
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#2063EB]"
                size={24}
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="outline-gray-200 pl-10 pr-12 py-3 w-full rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 sm:text-sm text-black bg-blue-50"
              />
              {showPassword ? (
                <IoMdEyeOff
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#2063EB] cursor-pointer"
                  size={24}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoMdEye
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#2063EB] cursor-pointer"
                  size={24}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>

            <div className="relative mt-2 w-full">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-col text-center text-sm text-gray-800 ">
            Don't have an account yet?
            <button
              onClick={handleSignUp}
              className="font-semibold leading-6 text-blue-600 hover:underline"
            >
              Register now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <LoginPage />
    </Suspense>
  );
}
