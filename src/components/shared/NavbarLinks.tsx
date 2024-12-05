"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { RegisterDialog } from "./RegisterDialog";
import { LoginDialog } from "./LoginDialog";
import { AuthContextProps, useAuth } from "../context/AuthProvider";
import { AVATAR_URL } from "@/config/fileConfig";
import Image from "next/image";

export default function NavbarLinks() {
  const { isAuth, user } = useAuth() as AuthContextProps;
  const avatar = user && user.avatar ? AVATAR_URL + user.avatar : "/avatar.svg";
  return (
    <>
      <div className="flex justify-between gap-4 items-center">
        <Button className="text-xl" variant="link" asChild>
          <Link href={"/"}>Home</Link>
        </Button>
        {isAuth && (
          <Button className="text-xl" variant="link" asChild>
            <Link href={"/disk"}>Disk</Link>
          </Button>
        )}
        {isAuth &&
          user &&
          user.roles
            .map((role) => role.toLocaleLowerCase().trim())
            .includes("admin") && (
            <Button className="text-xl" variant="link" asChild>
              <Link href={"/admin/panel"}>Admin</Link>
            </Button>
          )}
      </div>
      {!isAuth ? (
        <div className="flex gap-4">
          <RegisterDialog />
          <LoginDialog />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Link href={`/profile`}>
            <Image
              className="rounded-full"
              src={avatar}
              alt="avatar"
              width={40}
              height={40}
              style={{ height: "40px", width: "40px", objectFit: "cover" }}
              unoptimized
            />
          </Link>
        </div>
      )}
    </>
  );
}
