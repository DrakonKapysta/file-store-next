"use server";
import { UploadFile } from "@/store/uploadStore";
import { FileType } from "@/types/fileTypes";
import axios from "axios";
import { cookies } from "next/headers";

const progressMap: Record<string, UploadFile> = {};

export async function getFiles(dirId?: string | null, sort?: string) {
  const token = cookies().get("accessToken")?.value;

  try {
    let url = `${process.env.BASE_URL}files`;
    if (dirId) {
      url = `${process.env.BASE_URL}files?parent=${dirId}`;
    }
    if (sort) {
      url = `${process.env.BASE_URL}files?sort=${sort}`;
    }
    if (dirId && sort) {
      url = `${process.env.BASE_URL}files?parent=${dirId}&sort=${sort}`;
    }

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getFilesByUserId(
  id: string,
  dirId?: string | null,
  sort?: string
) {
  const token = cookies().get("accessToken")?.value;

  try {
    let url = `${process.env.BASE_URL}files/getFilesByUserId?id=${id}`;
    if (dirId) {
      url = `${process.env.BASE_URL}files/getFilesByUserId?id=${id}&parent=${dirId}`;
    }
    if (sort) {
      url = `${process.env.BASE_URL}files/getFilesByUserId?id=${id}&sort=${sort}`;
    }
    if (dirId && sort) {
      url = `${process.env.BASE_URL}files/getFilesByUserId?id=${id}&parent=${dirId}&sort=${sort}`;
    }

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createDir(
  name: string,
  dirId?: string | null,
  userId?: string
) {
  const token = cookies().get("accessToken")?.value;

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}files`,
      { name, parent: dirId, type: "dir", userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(
  file: string,
  fileName: string,
  dirId?: string | null
) {
  const token = cookies().get("accessToken")?.value;

  try {
    const formData = new FormData();
    formData.append("file", new Blob([file]), fileName);
    if (dirId) {
      formData.append("parent", dirId);
    }
    let uploadProgress = 0;
    const uploadFile: UploadFile = {
      id: Date.now().toString(),
      name: fileName,
      progress: 0,
    };
    const response = await axios.post(
      `${process.env.BASE_URL}files/upload`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },

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
            console.log("progress", progress);
            uploadProgress = progress;
          }
        },
      }
    );
    if (response.status === 200) {
      return { data: response.data, uploadFile, uploadProgress };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function downloadFile(file: FileType) {
  const token = cookies().get("accessToken")?.value;

  try {
    const response = await fetch(
      `${process.env.BASE_URL}files/download?id=${file._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      const text = await response.text();
      return text;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(file: FileType) {
  const token = cookies().get("accessToken")?.value;

  try {
    const response = await axios.delete(
      `${process.env.BASE_URL}files?id=${file._id}&parent=${file.parent || ""}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProgress(id: string) {
  return progressMap[id];
}

export async function removeProgress(id: string) {
  delete progressMap[id];
}

export async function searchFiles(search: string) {
  const token = cookies().get("accessToken")?.value;
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}files/search?search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  } finally {
    console.log("finally");
  }
}
export async function searchFilesByUserId(id: string, search: string) {
  const token = cookies().get("accessToken")?.value;
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}files/searchByUserId?id=${id}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  } finally {
    console.log("finally");
  }
}
