'use client';
import React from 'react';
import { MdOutlineExplore } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi";
import { FaHome } from "react-icons/fa";

type SidenavProps = {
  isopen: boolean;
};

function Sidenav({ isopen }: SidenavProps) {
  return (
    <div
      className={`
        h-screen transition-all duration-400 bg-stone-700 border-gray-300
        flex flex-col justify-start items-center pt-6 px-2
        ${isopen ? 'w-48 items-start' : 'w-14 items-center'}
      `}
    >
      <div className="flex flex-col gap-2 w-full items-center" style={{alignItems:'flex-start'}}>
        
        {/* Home */}
        <button className={`flex items-center gap-2 text-white w-full hover:bg-stone-500 hover:text-white transition duration-200 p-1 rounded overflow-hidden`}>
          <FaHome className='text-2xl text-white' />
          {isopen && <span className="text-sm whitespace-nowrap">Home</span>}
        </button>

        {/* Explore */}
        <button className={`flex items-center gap-2 text-white w-full hover:bg-stone-500 hover:text-white transition duration-200 p-1 rounded overflow-hidden`}>
          <FaRegCompass className='text-2xl text-white'/>
          {isopen && <span className="text-sm whitespace-nowrap">Explore</span>}
        </button>

        {/* Following */}
        <button className={`flex items-center gap-2 text-white w-full hover:bg-stone-500 hover:text-white transition duration-200 p-1 rounded overflow-hidden`}>
          <HiOutlineUsers className='text-2xl text-white' />
          {isopen && <span className="text-sm whitespace-nowrap">Following</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
