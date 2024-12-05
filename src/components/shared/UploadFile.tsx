"use client";
import {
  UploadFile as UploadFileType,
  useUploadStore,
} from "@/store/uploadStore";
import React from "react";

export const UploadFile = ({ file }: { file: UploadFileType }) => {
  const removeUploadFile = useUploadStore((state) => state.removeUploadFile);

  return (
    <div className="rounded-lg bg-gray-100 px-2 py-1 mb-2">
      <div className="flex justify-between items-center">
        <div className="truncate text-clip max-w-[90%]">{file.name}</div>
        <button onClick={() => removeUploadFile(file.id)}>X</button>
      </div>
      <div className="h-4 flex m-1 items-center bg-gray-300 rounded-xl ">
        <div
          style={{ width: `${file.progress}%` }}
          className="h-full bg-green-500 rounded-xl"
        ></div>
        <div className="absolute left-1/2 -translate-x-1/2">
          {file.progress}%
        </div>
      </div>
    </div>
  );
};
