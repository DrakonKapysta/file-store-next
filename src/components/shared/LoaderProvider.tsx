"use client";
import React, { FC } from "react";
import { useAuth } from "../context/AuthProvider";

interface LoaderProps {
  children: React.ReactNode;
}

export const LoaderProvider: FC<LoaderProps> = ({ children }) => {
  const { isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <div className=" w-10 h-10 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </>
  );
};
