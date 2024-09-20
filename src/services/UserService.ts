import $api from "@/http";
import { IUser } from "@/models/IUser";
import { AxiosResponse } from "axios";

export default class UserService {
  public static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return await $api.get<IUser[]>("/users");
  }
}
