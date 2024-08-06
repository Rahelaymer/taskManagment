import React from "react";

interface ErrorMessageProps {
  dataName: string;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  return (
    <div className=" flex flex-col items-center">
      <h1 className=" mt-16 font-bold text-3xl">{props.dataName} </h1>
      <h1 className=" mt-5 mb-5">{props.message}</h1>
    </div>
  );
};

export default ErrorMessage;
