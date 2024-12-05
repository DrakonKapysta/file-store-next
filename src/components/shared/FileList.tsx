"use client";
import React from "react";
import { File } from "./File";
import { useFileStore } from "@/store/fileStore";
import { FileType } from "@/types/fileTypes";

export const FileList = () => {
  const files = useFileStore((state) => state.files);
  const filesView = useFileStore((state) => state.view);

  if (files?.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Files not found
      </div>
    );
  }
  if (filesView === "plate") {
    return (
      <div className="container flex flex-wrap mt-4 mb-4 mx-auto gap-2 max-h-[80vh] overflow-y-auto">
        {files?.map((file) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    );
  }

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
