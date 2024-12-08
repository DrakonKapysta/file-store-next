import React from "react";

export const Loader = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className=" w-10 h-10 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};
