"use client";
import Link from "next/link";
import { useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { IoMdEye, IoMdEyeOff, IoMdLock, IoMdPerson } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

const SignupPage = () => {
  const { register, loading, error } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    const minLength = 8;
    const containsLetter = /[a-zA-Z]/.test(password);
    const containsNumber = /\d/.test(password);

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return false;
    }
    if (password.length < minLength) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }
    if (!containsLetter) {
      toast.error("Password must contain at least one letter.");
      return false;
    }
    if (!containsNumber) {
      toast.error("Password must contain at least one number.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateInputs()) return;
    try {
      await register(firstName, lastName, email, password);
      toast.success("Signup successful!");
      setIsLoading(true);
      router.push("/login");
    } catch (err) {
      console.error(err);
      console.error("Signup error:", error);
    }
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex items-center justify-center h-full py-24 bg-gray-100">
      <div className="p-6 sm:p-8 sm:pt-6 mt-4 w-full mx-2 sm:mx-0 max-w-md bg-white shadow-lg rounded-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up for Free
          </h2>
        </div>
        <div className="mt-9 sm:mx-auto">
          <form className="space-y-6">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <div className="relative mt-2">
                  <IoMdPerson
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="pl-10 py-3 w-full rounded-md border border-gray-300 bg-gray-50 text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <div className="relative mt-2">
                  <IoMdPerson
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="pl-10 py-3 w-full rounded-md border border-gray-300 bg-gray-50 text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="relative mt-2">
                  <BiLogoGmail
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 py-3 w-full rounded-md border border-gray-300 bg-gray-50 text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <IoMdLock
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-12 py-3 w-full rounded-md border border-gray-300 bg-gray-50 text-gray-900"
                    />
                    {showPassword ? (
                      <IoMdEyeOff
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        size={20}
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <IoMdEye
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        size={20}
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="relative mt-2">
                  <IoMdLock
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pl-10 pr-12 py-3 w-full rounded-md border border-gray-300 bg-gray-50 text-gray-900"
                    />
                    {showConfirmPassword ? (
                      <IoMdEyeOff
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        size={20}
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    ) : (
                      <IoMdEye
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        size={20}
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin h-6 mr-2" />
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <div className="mt-5 text-center text-sm text-gray-800">
            Already have an account?
            <button
              onClick={handleSignIn}
              className="font-semibold leading-6 text-blue-600 hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
