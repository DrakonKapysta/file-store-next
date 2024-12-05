"use client";
import { useFileStore } from "@/store/fileStore";
import { FileType } from "@/types/fileTypes";
import Image from "next/image";
import React, { FC } from "react";
import { Trash, Download } from "lucide-react";
import { deleteFile } from "@/actions/file";
import sizeFormat from "@/lib/sizeFormat";
import { downloadFileClient } from "@/actions/client/fileClient";

interface FileProps {
  file: FileType;
}

export const File: FC<FileProps> = ({ file }) => {
  const setCurrentDir = useFileStore((state) => state.setCurrentDir);
  const currentDir = useFileStore((state) => state.currentDir);
  const pushToDirStack = useFileStore((state) => state.pushToDirStack);
  const deleteFileFromStore = useFileStore((state) => state.deleteFile);
  const filesView = useFileStore((state) => state.view);

  const openFileHandler = (file: FileType) => {
    if (file.type === "dir") {
      pushToDirStack(currentDir);
      setCurrentDir(file._id);
    }
  };

  const handleClientDownloadClick = async () => {
    await downloadFileClient(file);
  };
  const handleDeleteClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    const res = await deleteFile(file);
    if (res) {
      deleteFileFromStore(res.deletedFileId);
    }
  };

  if (filesView === "plate") {
    return (
      <div
        onClick={() => openFileHandler(file)}
        className="w-[128px] h-[128px] flex flex-col items-center group"
      >
        <Image
          className="justify-self-center  hover:border-gray-500/50 cursor-pointer"
          src={file.type === "dir" ? "./dir.svg" : "./file.svg"}
          alt="file"
          width={54}
          height={54}
          priority={false}
        />
        <div className="col-start-2">{file.name}</div>
        <div className="flex gap-2 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {file.type !== "dir" && (
            <button
              onClick={handleClientDownloadClick}
              className="col-start-5 hover:text-red-300  w-full  flex justify-center items-center h-full"
            >
              <Download size={18} />
            </button>
          )}
          <button
            onClick={handleDeleteClick}
            className="col-start-6 hover:text-red-300  w-full  flex justify-center items-center h-full"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => openFileHandler(file)}
      className="mb-4 mt-4 border-b border-black grid grid-cols-header items-center hover:border-gray-500/50  hover:bg-gray-200/70"
    >
      <Image
        className="justify-self-center"
        src={file.type === "dir" ? "./dir.svg" : "./file.svg"}
        alt="file"
        width={54}
        height={54}
        priority={false}
      />
      <div className="col-start-2">{file.name}</div>
      <div className="col-start-3 justify-self-center">
        {file.date.slice(0, 10)}
      </div>
      <div className="col-start-4 justify-self-center">
        {sizeFormat(file.size)}
      </div>
      {file.type !== "dir" && (
        <button
          onClick={handleClientDownloadClick}
          className="col-start-5 hover:text-red-300  w-full  flex justify-center items-center h-full"
        >
          <Download />
        </button>
      )}
      <button
        onClick={handleDeleteClick}
        className="col-start-6 hover:text-red-300  w-full  flex justify-center items-center h-full"
      >
        <Trash />
      </button>
    </div>
  );
};
