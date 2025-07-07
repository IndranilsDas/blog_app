'use client';
import React from 'react';
import { MdOutlineExplore } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi";
import { FaHome } from "react-icons/fa";

type SidenavProps = {
  isopen: boolean;
};

export default function Sidenav({ isopen }: SidenavProps) {
  return (
    <div
      className={`
        h-screen bg-stone-700 transition-width duration-300
        flex flex-col pt-6 px-2
        ${isopen ? 'w-48' : 'w-14'}
      `}
    >
      {[
        { icon: <FaHome />, label: 'Home' },
        { icon: <FaRegCompass />, label: 'Explore' },
        { icon: <HiOutlineUsers />, label: 'Following' },
      ].map(({ icon, label }) => (
        <button
          key={label}
          className="
            flex items-center gap-2 text-white 
            w-full p-2 rounded transition-colors duration-200
            hover:bg-stone-500
          "
        >
          <span className="text-2xl">{icon}</span>
          <span
            className={`
              overflow-hidden whitespace-nowrap
              transition-all duration-300
              ${isopen ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0 ml-0'}
            `}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
