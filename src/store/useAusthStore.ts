import { IUser } from "@/models/IUser";
import { AuthResponse } from "@/models/response/AuthResponse";
import AuthService from "@/services/AuthService";
import { create } from "zustand";

interface AuthState {
  user: IUser;
  isAuth: boolean;
  setAuth(bool: boolean): void;
  login(email: string, password: string): Promise<void>;
  register(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: {} as IUser,
  isAuth: false,
  setAuth: (bool) => set({ isAuth: bool }),
  setUser: (user: IUser) => set({ user }),
  login: async (email: string, password: string) => {
    try {
      const { data } = await AuthService.login(email, password);
      localStorage.setItem("token", data.accessToken);
      set({ user: data.user, isAuth: true });
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  },
  register: async (email: string, password: string) => {
    try {
      const { data } = await AuthService.registration(email, password);
      localStorage.setItem("token", data.accessToken);
      set({ user: data.user, isAuth: true });
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  },
  logout: async () => {
    try {
      await AuthService.logout();
      set({ user: {} as IUser, isAuth: false });
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  },

  //immer example
  //   // setAuth: (bool) => set(produce((state)=>{state.isAuth = bool})),
  //   immerInc: () =>
  //     set(produce((state: State) => { ++state.deep.nested.obj.count })),
}));
