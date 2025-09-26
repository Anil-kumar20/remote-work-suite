import React from "react";
import { BellIcon, UserCircleIcon, MenuIcon } from "@heroicons/react/24/outline";
import Button from "./shared/Button";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button onClick={toggleSidebar}>
          <MenuIcon className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Remote Work Suite</h1>
      </div>

      <div className="flex items-center gap-6">
        <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
        <UserCircleIcon className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800" />
      </div>
    </nav>
  );
};

export default Navbar;
