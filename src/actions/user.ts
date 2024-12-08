import { BASE_URL } from "@/config/config";
import { cookies } from "next/headers";

export async function getAllUsers() {
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(`${BASE_URL}/api/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status == 200) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserById(id: string) {
  console.log("GETTING USER BY ID", id);

  const accessToken = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status == 200) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
