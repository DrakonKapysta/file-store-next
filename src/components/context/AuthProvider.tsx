"use client";
import { deleteAvatar, uploadAvatar } from "@/actions/client/fileClient";
import { IUser } from "@/models/IUser";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  FC,
  useCallback,
  useEffect,
} from "react";

export interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  isAuth: boolean;
  user: IUser | null;
  uploadUserAvatar: (file: File) => void;
  deleteUserAvatar: () => void;
  isLoading: boolean;
}

const initialState: AuthContextProps = {
  isAuth: false,
  user: null,
  isLoading: true,
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
  const [isLoading, setIsLoading] = React.useState(true);

  const handleNavigation = (path: string) => {
    router.replace(path);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    let isMounted = true;
    const validateUser = async () => {
      setIsLoading(true);
      const response = await fetch("/api/auth/login", {
        credentials: "include",
        method: "GET",
      });

      if (!isMounted) return;

      if (response.status === 401) {
        const responseRefresh = await fetch("/api/auth/refresh", {
          credentials: "include",
          method: "GET",
        });
        if (responseRefresh.status === 200) {
          const data = await responseRefresh.json();
          if (data.user) {
            setIsAuth(true);
            setUser(data.user);
            handleNavigation("/disk");
          }
        } else {
          setIsAuth(false);
          setUser(null);
          handleNavigation("/");
        }
      } else if (response.status === 200) {
        const data = await response.json();

        if (data.user) {
          setIsAuth(true);
          setUser(data.user);
          handleNavigation("/disk");
        }
      } else {
        setIsAuth(false);
        setUser(null);
        handleNavigation("/");
      }
    };
    validateUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const uploadUserAvatar = useCallback(async (file: File) => {
    await deleteAvatar();
    const data = await uploadAvatar(file);

    setUser((prev) => ({ ...prev, avatar: data.avatar } as IUser));
  }, []);

  const deleteUserAvatar = useCallback(async () => {
    await deleteAvatar();
    setUser((prev) => ({ ...prev, avatar: "" } as IUser));
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const userData = await response.json();
    setIsAuth(true);
    setUser(userData.user);
    localStorage.setItem("accessToken", userData.accessToken);
    handleNavigation("/disk");
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    const response = await fetch("/api/auth/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const userData = await response.json();
    setIsAuth(true);
    localStorage.setItem("accessToken", userData.accessToken);
    handleNavigation("/disk");
  };

  const logout = async () => {
    setIsLoading(true);
    await fetch("/api/auth/logout", { method: "GET", credentials: "include" });
    setIsAuth(false);
    handleNavigation("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        isLoading,
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
