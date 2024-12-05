import React, { FC } from "react";
import NavbarLinks from "./NavbarLinks";

export const Navbar: FC = () => {
  return (
    <nav className="flex justify-end p-4 items-center min-h-12 shadow">
      <div className="w-full flex justify-between px-2 ">
        <NavbarLinks />
      </div>
    </nav>
  );
};
