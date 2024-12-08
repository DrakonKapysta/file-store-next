import { FileType } from "@/types/fileTypes";
import { create } from "zustand";

interface FileState {
  files: FileType[];
  currentDir: null | string;
  dirStack: string[];
  view: "list" | "plate";
  isLoading: boolean;
  setFiles: (files: any[]) => void;
  setCurrentDir: (dir: null | string) => void;
  addFile: (file: any) => void;
  pushToDirStack: (dir: string | null) => void;
  deleteFile: (id: string) => void;
  setView: (view: "list" | "plate") => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useUserFileStore = create<FileState>()((set) => ({
  files: [],
  currentDir: null,
  dirStack: [],
  isLoading: false,
  view: "list",
  setFiles: (files) =>
    set(() => {
      return { files };
    }),
  setCurrentDir: (dir: string | null) =>
    set(() => {
      return { currentDir: dir };
    }),
  addFile: (file) =>
    set((state) => {
      return {
        files: [...state.files, file],
      };
    }),
  pushToDirStack: (dir: string | null) =>
    set((state) => {
      if (dir === null) return { state };
      return { dirStack: [...state.dirStack, dir] };
    }),
  popFromDirStack: () =>
    set((state) => {
      return { dirStack: state.dirStack.slice(0, -1) };
    }),
  deleteFile: (id: string) =>
    set((state) => {
      return {
        files: [...state.files.filter((file: FileType) => file._id !== id)],
      };
    }),
  setView: (viewPayload: "list" | "plate") =>
    set(() => ({
      view: viewPayload,
    })),
  setIsLoading: (isLoading: boolean) =>
    set(() => ({
      isLoading,
    })),
}));
