"use client";
import { uploadFileClient } from "@/actions/client/fileClient";
import { getFiles, searchFiles } from "@/actions/file";
import { CreateFileForm } from "@/components/shared/CreateFileForm";
import { FileList } from "@/components/shared/FileList";
import { Modal } from "@/components/shared/Modal";
import { Uploader } from "@/components/shared/Uploader";
import { useFileStore } from "@/store/fileStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Disk() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [sort, setSort] = useState("type");
  const currentDir = useFileStore((state) => state.currentDir);
  const setCurrentDir = useFileStore((state) => state.setCurrentDir);
  const dirStack = useFileStore((state) => state.dirStack);
  const setFiles = useFileStore((state) => state.setFiles);
  const addFile = useFileStore((state) => state.addFile);
  const [dragEnter, setDragEnter] = useState(false);
  const view = useFileStore((state) => state.view);
  const setView = useFileStore((state) => state.setView);

  const [serachName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<any>(false);
  const serachHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    const res = await searchFiles(e.target.value);
    if (searchTimeout !== false) clearTimeout(searchTimeout);
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(() => {
          setFiles(res);
        }, 500)
      );
    } else {
      const res = await getFiles(currentDir, sort);
      setFiles(res);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getFiles(currentDir, sort);
      setFiles(res);
    })();
  }, [currentDir, setFiles, sort]);

  const backClickHandler = () => {
    const prevDir = dirStack.pop();
    setCurrentDir(prevDir || null);
  };

  const handleFileUploadClient = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = [...event.target.files];
    files.forEach(async (file) => {
      const res = await uploadFileClient(file, currentDir);
      addFile(res);
    });
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    files.forEach(async (file) => {
      const res = await uploadFileClient(file, currentDir);
      addFile(res);
    });
    setDragEnter(false);
  };

  return !dragEnter ? (
    <div
      className="mt-4 container mx-auto px-4 h-full overflow-hidden "
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
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
            className="bg-gray-200 p-2 rounded-md max-w-[114px] w-full"
          >
            Create folder
          </button>
          <label
            htmlFor="disk_upload-input"
            className="bg-gray-200 p-2 rounded-md hover:cursor-pointer"
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
            src={"./sort.svg"}
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
              src={"./plate.svg"}
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
              src={"./union.svg"}
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
      <FileList />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <CreateFileForm closeModal={() => setModalOpen(false)} />
        </Modal>
      )}
      <Uploader />
    </div>
  ) : (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="container border-4 h-full mx-auto mt-5 mb-5 flex justify-center items-center border-gray-500/50 border-dashed  text-gray-500/60 bg-slate-400/20 text-5xl"
    >
      Drag File
    </div>
  );
}
