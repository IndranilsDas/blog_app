'use client';
import Nav from '@/components/nav';
import Sidenav from '@/components/sidenav';
import React from 'react'
import { useState } from 'react';

function page() {
  const [image, setImage] = useState<File | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className='flex w-full bg-white'>
      <Nav/>
    <div
            className="fixed left-0 top-[3.50rem] z-10 h-[calc(100vh-3.75rem)]"
            onMouseEnter={() => setIsDrawerOpen(true)}
            onMouseLeave={() => setIsDrawerOpen(false)}
          >
            <Sidenav isopen={isDrawerOpen} />
          </div>
    <div className='h-screen flex flex-col bg-white py-16 px-10 gap-4 transition-all duration-300'
    style={{
          width: isDrawerOpen ? "calc(100% - 13rem)" : "calc(100% - 4rem)",
          marginLeft: isDrawerOpen ? "13rem" : "4rem",
        }}>
        <h1 className='text-xl text-black'>Add Blog</h1>
        <input className='flex items-center h-[5rem] rounded  border border-gray-800 placeholder:text-center placeholder:text-3xl placeholder:text-gray-500' placeholder='Title'></input>
        <input className='h-[3rem] rounded  border border-gray-800'></input>
        <div className='flex gap-4 items-center'>
        <h2 className='text-black font-semibold'>Add Image :</h2>
        <input type='file' id='img-file' className='hidden'></input>
        <label htmlFor='img-file' className='py-1 px-3 hover:bg-gray-200 rounded text-black ring'>Choose Image</label>
        </div>
        {/*<div className='flex gap-4 items-center'><h2 className='text-black font-semibold'>Add images :</h2><div className='py-1 px-3 hover:bg-gray-200 hover:cursor-pointer text-black rounded ring ring-gray-800'>Choose File</div></div>*/}
        <input className='h-[10rem] rounded  border border-gray-800'></input>
    </div></div>
  )
}

export default page