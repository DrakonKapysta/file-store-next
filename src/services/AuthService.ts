import $api from "@/http";
import { AuthResponse } from "@/models/response/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
  public static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>("/login", { email, password });
  }
  public static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>("/registration", { email, password });
  }
  public static async logout(): Promise<void> {
    return await $api.post("/logout");
  }
  public static isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
}
