import React from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";

function Sidenav() {
  return (
    <div className='flex flex-col justify-between gap-6'>
        <div className='flex flex-col'>
            <button className='text-left'><MdOutlineExplore />Explore spaces</button>
            <button className='text-left'><HiOutlineUsers/>following</button>
            <button className='text-left'>Profile</button>
        </div>
    </div>
  )
}

export default Sidenav