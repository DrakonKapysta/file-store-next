"use client";
import React from "react";
import { UploadFile } from "./UploadFile";
import { useUploadStore } from "@/store/uploadStore";

export const Uploader = () => {
  const files = useUploadStore((state) => state.files);
  const isVisible = useUploadStore((state) => state.isVisible);
  const hideUploader = useUploadStore((state) => state.hideUploader);

  return (
    isVisible && (
      <div className="w-[300px] h-[300px] fixed bottom-0 right-0 bg-gray-200 p-5 rounded-2xl">
        <div className="flex justify-between mb-4 items-center">
          <div className="text-2xl">Downloads</div>
          <button onClick={() => hideUploader()} className="text-2xl">
            X
          </button>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  );
};
