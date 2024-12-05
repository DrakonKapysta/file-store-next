import { useUploadStore } from "@/store/uploadStore";
import { FileType } from "@/types/fileTypes";
import axios from "axios";

export async function downloadFileClient(file: FileType) {
  try {
    const baseUrl = "http://localhost:3001/api/";
    const response = await fetch(`${baseUrl}files/download?id=${file._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFileClient(file: File, dirId: string) {
  try {
    const baseUrl = "http://localhost:3001/api/";
    const formData = new FormData();
    formData.append("file", file);

    if (dirId) {
      formData.append("parent", dirId);
    }
    const uploadFile = {
      name: file.name,
      progress: 0,
      id: Date.now().toString(),
    };
    useUploadStore.setState({ isVisible: true });
    useUploadStore.setState((state) => {
      return { files: [...state.files, uploadFile] };
    });
    const response = await axios.post(`${baseUrl}files/upload`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      onUploadProgress: (progressEvent: any) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
            progressEvent.target.getResponseHeader(
              "x-decompressed-content-length"
            );

        if (totalLength) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / totalLength
          );
          useUploadStore.setState((state) => {
            return {
              files: [
                ...state.files.map((file) => {
                  if (file.id === uploadFile.id) {
                    return { ...file, progress };
                  }
                  return file;
                }),
              ],
            };
          });
        }
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function uploadAvatar(file: File) {
  try {
    const baseUrl = "http://localhost:3001/api/";
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      `${baseUrl}files/upload-avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log("BAE", `${baseUrl}files/upload-avatar`);

    console.log("DATA", response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAvatar() {
  try {
    const baseUrl = "http://localhost:3001/api/";
    const response = await axios.delete(`${baseUrl}files/delete-avatar`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
