"use client";
import { SidebarIcon } from "lucide-react";
import React, { useState } from "react";

export type Link = {
  text: string;
  href: string;
};

interface SidebarProps {
  links: Link[];
}
const Sidebar = (props: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`border-gray-100 ${isSidebarOpen ? "border-2" : ""}`}>
      <button onClick={toggleSidebar} className="p-4 text-black">
        <SidebarIcon />
      </button>
      <div className={`h-screen w-64  ${isSidebarOpen ? "" : "hidden"}`}>
        <nav className="p-4">
          <ul>
            {props.links.map((link) => (
              <li key={link.href} className="mb-2">
                <a
                  href={link.href}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
