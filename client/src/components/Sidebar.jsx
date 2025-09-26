import React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, ChatBubbleLeftIcon, ClipboardDocumentIcon, VideoCameraIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "Dashboard", icon: HomeIcon, path: "/" },
  { name: "Chat", icon: ChatBubbleLeftIcon, path: "/chat" },
  { name: "Task Board", icon: ClipboardDocumentIcon, path: "/tasks" },
  { name: "Document Editor", icon: PencilSquareIcon, path: "/documents" },
  { name: "Video Call", icon: VideoCameraIcon, path: "/video" },
];

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`bg-gray-100 w-64 h-screen p-6 space-y-6 fixed top-0 left-0 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-lg hover:bg-gray-200 transition ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            <link.icon className="w-6 h-6" />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
