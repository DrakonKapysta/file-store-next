import Link from "next/link";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { RegisterDialog } from "./RegisterDialog";
import NavbarLinks from "./NavbarLinks";

export const Navbar: FC = () => {
  return (
    <nav className="flex justify-end p-4 items-center min-w-12 shadow">
      <div className="w-full flex justify-between px-2">
        <NavbarLinks />
      </div>
    </nav>
  );
};
