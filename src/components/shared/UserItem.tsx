"use client";
import { AVATAR_URL } from "@/config/fileConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface UserItemProps {
  id: string;
  avatar: string;
  email: string;
}

export const UserItem: FC<UserItemProps> = ({ id, avatar, email }) => {
  const router = useRouter();
  const avatarLogo = avatar ? AVATAR_URL + avatar : "/avatar.svg";

  const handleUserClick = () => {
    router.push(`/user/${id}`);
  };

  return (
    <div
      onClick={() => {
        handleUserClick();
      }}
      className="border rounded-md border-gray-400 p-4 hover:shadow-md cursor-pointer"
    >
      <div className="flex gap-2 items-center">
        <Image
          className="rounded-full"
          src={avatarLogo}
          alt="avatar"
          width={40}
          height={40}
          style={{ objectFit: "cover", height: "50px", width: "50px" }}
          unoptimized
        />
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <p>{id}</p>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};
