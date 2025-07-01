import React from 'react'
import { CiSearch } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { HiUser } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi2";
function Nav() {
  return (
    <div className="fixed top-0 left-0 z-10 w-full py-2 flex justify-center items-center backdrop-blur-2xl bg-zinc-800/80">
      <div className='flex w-2/4 pl-6 font-thin'><button className='font-thin'>Blog App</button></div>
      <div className='flex justify-end pl-10 w-2/4  items-center gap-3 pr-6'>
        <div className='flex justify-center items-center gap-2 outline-none rounded-2xl ring ring-gray-400 bg-gray-600/40 px-3 py-1'><CiSearch/><input className='outline-none' placeholder='Search'></input></div>
        <button className='flex justify-center items-center gap-2 outline-none rounded-2xl ring ring-gray-400 bg-gray-600/40 px-3 py-1 pr-4 text-gray-400'> <IoCreateOutline/>Write</button>
        <CiUser className='text-4xl ring bg-gray-600/40 ring-gray-400 text-gray-300 p-1 rounded-full'/>
      </div>
    </div>
  )
}

export default Nav