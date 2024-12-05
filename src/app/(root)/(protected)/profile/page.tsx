"use client";
import { AuthContextProps, useAuth } from "@/components/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { AVATAR_URL } from "@/config/fileConfig";
import Image from "next/image";
import React from "react";

export default function Profile() {
  const { user, logout } = useAuth() as AuthContextProps;
  const { uploadUserAvatar, deleteUserAvatar } = useAuth();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadUserAvatar(file);
    }
    event.target.value = "";
    event.target.files = null;
  };
  const avatar = user?.avatar ? AVATAR_URL + user.avatar : "/avatar.svg";
  return (
    <div className="container mx-auto flex flex-col gap-4  p-4 mt-2 place-items-start h-full">
      <div className="flex gap-2 w-full justify-center">
        <div className="flex flex-col gap-4 border rounded-md border-gray-400 p-4 mt-2 place-items-center max-w-[400px] w-full">
          <h2 className="text-2xl text-center ">Profile Image</h2>
          <Image
            className="rounded-full"
            src={avatar}
            alt="avatar"
            width={200}
            height={200}
            style={{ objectFit: "cover", height: "200px", width: "200px" }}
            unoptimized
          />
        </div>
        <div className="mt-2 max-w-[300px] flex flex-col gap-y-2">
          <div className="border rounded-md border-gray-400 p-4 text-center">
            {user?.email}
          </div>
          <div className="border rounded-md border-gray-400 p-4 text-center">
            Roles:
            {user?.roles.map((role, index) => (
              <span className="px-1" key={index}>
                {role}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-4 border rounded-md border-gray-400 p-4 flex-1">
            <Button className="w-full" onClick={() => deleteUserAvatar()}>
              Delete Avatar
            </Button>
            <input
              accept="image/*"
              onChange={(e) => changeHandler(e)}
              type="file"
              placeholder="Upload Avatar"
              id="avatar_input"
              className="hidden"
            />
            <label htmlFor="avatar_input" className="w-full">
              <div className="rounded-md text-sm font-medium p-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 cursor-pointer w-full text-center">
                Upload Avatar
              </div>
            </label>
            <Button className="w-full" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
