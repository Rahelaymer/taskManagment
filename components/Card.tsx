import React from "react";


interface CardProps {
  id: string;
  title: string;
  end_at: string;
  time: string;
  priority: string;
  category: string;
  description: string;
  isComplete: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  end_at,
  time,
  priority,
  category,
  description,
  isComplete,
}) => {
  return (
    <div className=" ml-4 max-w-72 shadow-lg rounded-lg border border-gray-100 outline-none p-4 cursor-pointer hover:border-[#2563EB] hover:shadow-lg">
      <div className="mt-3 sm:items-baseline sm:flex sm:flex-col sm:gap-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <h3 className="text-sm text-gray-500">{category}</h3>
        <p className="text-sm text-gray-700">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500 pr-2 ">{time}</span>
          <span className="text-sm text-gray-500 pr-2 ">{end_at}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span
            className={`text-sm pr-2 ${
              isComplete ? "text-green-500" : "text-red-500"
            }`}
          >
            {isComplete ? "Complete" : "Incomplete"}
          </span>
          <span className="text-sm pr-2  text-gray-500">{priority}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
