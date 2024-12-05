"use client";
import { deleteAvatar, uploadAvatar } from "@/actions/client/fileClient";
import { IUser } from "@/models/IUser";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, FC, useCallback } from "react";

export interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  isAuth: boolean;
  user: IUser | null;
  uploadUserAvatar: (file: File) => void;
  deleteUserAvatar: () => void;
}

const initialState: AuthContextProps = {
  isAuth: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  uploadUserAvatar: async () => {},
  deleteUserAvatar: async () => {},
};

const AuthContext = createContext<AuthContextProps>(initialState);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = React.useState(false);
  const [user, setUser] = React.useState<IUser | null>(null);

  const uploadUserAvatar = useCallback(async (file: File) => {
    await deleteAvatar();
    const data = await uploadAvatar(file);
    console.log("avatar", data.avatar);

    setUser((prev) => ({ ...prev, avatar: data.avatar } as IUser));
  }, []);

  const deleteUserAvatar = useCallback(async () => {
    await deleteAvatar();
    setUser((prev) => ({ ...prev, avatar: "" } as IUser));
  }, []);

  const login = async (email: string, password: string) => {
    console.log("credentials", email, password);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const userData = await response.json();
    console.log("UserData:", userData);
    setIsAuth(true);
    setUser(userData.user);
    localStorage.setItem("accessToken", userData.accessToken);
    router.push("/disk");
  };

  const register = async (email: string, password: string) => {
    const response = await fetch("/api/auth/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const userData = await response.json();
    setIsAuth(true);
    localStorage.setItem("accessToken", userData.accessToken);
    router.push("/disk");
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "GET", credentials: "include" });
    setIsAuth(false);
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        login,
        logout,
        register,
        uploadUserAvatar,
        deleteUserAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
