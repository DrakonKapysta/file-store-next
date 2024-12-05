import { create } from "zustand";

export interface UploadFile {
  id: string;
  name: string;
  progress: number;
}

interface UploadState {
  isVisible: boolean;
  files: UploadFile[];
  showUploader: () => void;
  hideUploader: () => void;
  addUploadFile: (file: UploadFile) => void;
  removeUploadFile: (id: string) => void;
  changeUploadProgress: (id: string, progress: number) => void;
}

export const useUploadStore = create<UploadState>()((set) => ({
  isVisible: false,
  files: [],
  showUploader: () => set({ isVisible: true }),
  hideUploader: () => set({ isVisible: false }),
  addUploadFile: (file) =>
    set((state) => ({
      files: [...state.files, file],
    })),
  removeUploadFile: (id: string) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
    })),
  changeUploadProgress: (id: string, progress: number) =>
    set((state) => ({
      files: [
        ...state.files.map((file) => {
          if (file.id === id) {
            return { ...file, progress };
          }
          return file;
        }),
      ],
    })),
}));
