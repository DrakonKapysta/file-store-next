"use client";
import { FileType } from "@/types/fileTypes";
import React from "react";
import { File } from "./File";

export const AdminFileList = ({ files }: { files: FileType[] }) => {
  return (
    <div className="mt-4 mb-4 max-h-[80vh] overflow-y-auto">
      <div className="text-black grid grid-cols-header items-center">
        <div className="col-start-2">Name</div>
        <div className="col-start-3 justify-self-center">Date</div>
        <div className="col-start-4 justify-self-center">Size</div>
      </div>
      {files?.map((file: FileType) => (
        <File key={file._id} file={file} />
      ))}
    </div>
  );
};
