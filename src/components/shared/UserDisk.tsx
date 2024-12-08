"use client";
import { getFilesByUserId, searchFilesByUserId } from "@/actions/file";
import { useUserFileStore } from "@/store/userFileStore";
import React, { FC, use, useEffect, useRef, useState } from "react";
import { UserFileList } from "./UserFileList";
import Image from "next/image";
import { Modal } from "./Modal";
import { CreateUserFileForm } from "./CreateUserFileForm";
import { uploadFileClient } from "@/actions/client/fileClient";
interface UserFileListProps {
  userId: string;
}

export const UserDisk: FC<UserFileListProps> = ({ userId }) => {
  const [sort, setSort] = useState("type");
  const currentDir = useUserFileStore((state) => state.currentDir);
  const setCurrentDir = useUserFileStore((state) => state.setCurrentDir);
  const setFiles = useUserFileStore((state) => state.setFiles);
  const addFile = useUserFileStore((state) => state.addFile);
  const dirStack = useUserFileStore((state) => state.dirStack);
  const view = useUserFileStore((state) => state.view);
  const setView = useUserFileStore((state) => state.setView);
  const [modalOpen, setModalOpen] = React.useState(false);
  const isLoading = useUserFileStore((state) => state.isLoading);
  const setIsLoading = useUserFileStore((state) => state.setIsLoading);

  const [serachName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<any>(false);
  const serachHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    setIsLoading(true);
    const res = await searchFilesByUserId(userId, e.target.value);
    if (searchTimeout !== false) clearTimeout(searchTimeout);
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(() => {
          setFiles(res);
          setIsLoading(false);
        }, 500)
      );
    } else {
      const res = await getFilesByUserId(userId, currentDir, sort);
      setFiles(res);
      setIsLoading(false);
    }
  };

  const prevUserIdRef = useRef<string | null>(null);

  const backClickHandler = () => {
    const prevDir = dirStack.pop();
    setCurrentDir(prevDir || null);
  };

  const handleFileUploadClient = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    files.forEach(async (file) => {
      const res = await uploadFileClient(file, currentDir, userId);
      addFile(res);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (prevUserIdRef.current !== userId) {
      setCurrentDir(null);
      setFiles([]);
      setIsLoading(false);
    }
    prevUserIdRef.current = userId;
    const loadFiles = async () => {
      const files = await getFilesByUserId(userId, currentDir, sort);
      setFiles(files);
      setIsLoading(false);
    };
    loadFiles();
  }, [userId, sort, currentDir, setFiles, setCurrentDir, setIsLoading]);

  return (
    <div className="flex flex-col mt-4 container mx-auto px-4 w-full h-full overflow-hidden">
      <div className="flex gap-4">
        <div className="flex gap-4 items-center  w-full">
          <button
            onClick={backClickHandler}
            className="bg-gray-200 p-2 rounded-md max-w-[114px] w-full"
          >
            Back
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gray-200 p-2 rounded-md max-w-[114px] w-full whitespace-nowrap"
          >
            Create folder
          </button>
          <label
            htmlFor="disk_upload-input"
            className="bg-gray-200 p-2 rounded-md hover:cursor-pointer whitespace-nowrap"
          >
            Upload file
          </label>
          <input
            onChange={(event) => handleFileUploadClient(event)}
            multiple={true}
            className="hidden"
            type="file"
            id="disk_upload-input"
            name="file"
          />
          <input
            onChange={(event) => serachHandler(event)}
            className="border p-2 rounded-md "
            type="text"
            id="disk_search-input"
            name="search"
            placeholder="Search files..."
            value={serachName}
          />
        </div>
        <div className="flex items-center gap-2 ">
          <Image
            className="justify-self-center"
            src={"/sort.svg"}
            alt="sort"
            width={46}
            height={46}
            priority={false}
          />
          <select
            className="border rounded-md p-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="type">Type</option>
            <option value="date">Date</option>
          </select>
          <button onClick={() => setView("list")} className="w-8 h-8 relative">
            <Image
              className="justify-self-center"
              src={"/plate.svg"}
              alt="sort"
              width={46}
              height={46}
              priority={false}
              style={{
                filter:
                  view === "list"
                    ? "invert(45%) sepia(101%) saturate(9527%) hue-rotate(200deg) brightness(100%) contrast(91%)"
                    : "invert(89%) sepia(10%) saturate(71%) hue-rotate(182deg) brightness(105%) contrast(89%)",
              }}
            />
          </button>
          <button onClick={() => setView("plate")} className="w-8 h-8 relative">
            <Image
              className="justify-self-center "
              src={"/union.svg"}
              alt="sort"
              width={46}
              height={46}
              priority={false}
              style={{
                filter:
                  view !== "list"
                    ? "invert(48%) sepia(8%) saturate(3424%) hue-rotate(189deg) brightness(94%) contrast(89%)"
                    : "invert(89%) sepia(10%) saturate(71%) hue-rotate(182deg) brightness(105%) contrast(89%)",
              }}
            />
          </button>
        </div>
      </div>
      <UserFileList userId={userId} />
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <CreateUserFileForm
            userId={userId}
            closeModal={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};
