"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { RegisterDialog } from "./RegisterDialog";
import { useAuthStore } from "@/store/useAusthStore";
import { LoginDialog } from "./LoginDialog";

export default function NavbarLinks() {
  const { isAuth, logout } = useAuthStore((state) => state);
  return (
    <>
      <div>
        <Button variant="link" asChild>
          <Link href={"/"} className="text-lg">
            Home
          </Link>
        </Button>
      </div>
      {!isAuth ? (
        <div className="flex gap-4">
          <RegisterDialog />
          <LoginDialog />
        </div>
      ) : (
        <div>
          <Button onClick={logout} asChild>
            <Link href="/">Logout</Link>
          </Button>
        </div>
      )}
    </>
  );
}
