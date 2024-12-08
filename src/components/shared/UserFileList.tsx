"use client";
import React, { FC } from "react";
import { FileType } from "@/types/fileTypes";
import { useUserFileStore } from "@/store/userFileStore";
import { UserFile } from "./UserFile";

interface UserFileListProps {
  userId: string;
}

export const UserFileList: FC<UserFileListProps> = ({ userId }) => {
  const files = useUserFileStore((state) => state.files);
  const filesView = useUserFileStore((state) => state.view);

  if (files?.length === 0) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        Files not found
      </div>
    );
  }
  if (filesView === "plate") {
    return (
      <div className="container flex flex-wrap mt-4 mb-4 mx-auto gap-2 h-full  overflow-y-auto no-scrollbar">
        {files?.map((file) => (
          <UserFile key={file._id} file={file} userId={userId} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 mb-4 h-full overflow-y-auto  no-scrollbar ">
      <div className="text-black grid grid-cols-header items-center">
        <div className="col-start-2">Name</div>
        <div className="col-start-3 justify-self-center">Date</div>
        <div className="col-start-4 justify-self-center">Size</div>
      </div>
      {files?.map((file: FileType) => (
        <UserFile key={file._id} file={file} userId={userId} />
      ))}
    </div>
  );
};
