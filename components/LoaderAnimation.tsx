import React from "react";
import Image from "next/image";

const LoaderAnimation: React.FC = () => {
  return (
    <div className=" grid justify-center items-center mt-5">
      <div className="h-full w-full flex justify-center items-center mb-14">
        <div className="relative h-32 w-32 mt-7 mb-9">
          <div
            className="absolute inset-0 animate-spin rounded-full border-4 border-blue-600 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        
        </div>
      </div>
      <span className=" font-bold ml-6">Loading...</span>
    </div>
  );
};

export default LoaderAnimation;
