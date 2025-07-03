'use client';
import React from 'react';
import { MdOutlineExplore } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { FaHome } from "react-icons/fa";

type SidenavProps = {
  isopen: boolean;
};

function Sidenav({ isopen }: SidenavProps) {
  return (
    <div
      className={`
        h-screen transition-all duration-300 ${ !isopen ? 'bg-black': 'bg-gray-950/90'} border-gray-300
        flex flex-col justify-start items-center pt-6 px-2
        ${isopen ? 'w-48 items-start' : 'w-14 items-center'}
      `}
    >
      <div className="flex flex-col gap-3 w-full items-center" style={{alignItems:'flex-start'}}>
        
        {/* Home */}
        <button className={`flex items-center gap-2 ${ !isopen ?'text-black': 'text-gray-400'} w-full hover:bg-slate-500 hover:text-white p-1 rounded`}>
          <FaHome className={`text-2xl ${isopen ? '' : 'text-white'}`} />
          {isopen && <span className="text-sm whitespace-nowrap">Home</span>}
        </button>

        {/* Explore */}
        <button className={`flex items-center gap-2 ${ !isopen ?'text-black': 'text-gray-400'} w-full hover:bg-slate-500 hover:text-white p-1 rounded`}>
          <MdOutlineExplore className={`text-2xl ${isopen ? '' : 'text-white'}`} />
          {isopen && <span className="text-sm whitespace-nowrap">Explore Spaces</span>}
        </button>

        {/* Following */}
        <button className={`flex items-center gap-2 ${ !isopen ?'text-black': 'text-gray-400'} w-full hover:bg-slate-500 hover:text-white p-1 rounded`}>
          <HiOutlineUsers className={`text-2xl ${isopen ? '' : 'text-white'}`} />
          {isopen && <span className="text-sm whitespace-nowrap">Following</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
