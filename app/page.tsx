import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col-reverse md:flex-row justify-center items-center h-screen">
      <div className="md:basis-1/2">
        <h1 className="text-blue-500 text-2xl md:text-6xl font-semibold font-serif  my-4 px-8 md:px-32">
          Welcome to TaskMaster
        </h1>
        <h3 className=" text-blue-500 text-lg md:text-3xl font-medium my-4 px-8 md:px-32 italic">
          Stay Organized, Stay Productive
        </h3>
        <Link href="/signup">
          <button className="px-8 py-2 rounded-2xl ml-32 mt-12 bg-blue-500 text-white items-center ">
            Sign Up
          </button>
        </Link>
        <Link href="/login">
          <button className="px-8 py-2 rounded-2xl ml-16 mt-12 bg-blue-500 text-white items-center ">
            Log in
          </button>
        </Link>
      </div>

      <div className="md:basis-1/2  ">
        <Image
          className="size-[70%]"
          src="./work.svg"
          width={50}
          height={50}
          alt="banner image"
        />
      </div>
    </main>
  );
}
