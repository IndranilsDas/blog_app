'use client';
import Nav from '@/components/nav';
import Sidenav from '@/components/sidenav';
import React from 'react'
import { useState } from 'react';

function page() {
  const [title, SetTitle] = useState('')
  const [tagline,SetTagline] = useState('')
  const [content,SetContent] = useState('')
  const [image, setImage] = useState<File | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  const formData = new FormData();
    formData.append('title', title);
    formData.append('tagline', tagline);
    formData.append('content',content);
    if (image) formData.append('image', image);


  return (
    <div className='flex w-full'>
      <Nav/>
    <div
            className="fixed left-0 top-[3.25rem] z-10 h-[calc(100vh-3.75rem)]"
            onMouseEnter={() => setIsDrawerOpen(true)}
            onMouseLeave={() => setIsDrawerOpen(false)}
          >
            <Sidenav isopen={isDrawerOpen} />
          </div>
    <div className='h-screen flex flex-col bg-white py-20 px-10 gap-4 transition-all duration-300 pr-80'
    style={{
          width: isDrawerOpen ? "calc(100% - 13rem)" : "calc(100% - 4rem)",
          marginLeft: isDrawerOpen ? "13rem" : "4rem",
        }}>
        <h1 className='text-2xl text-black'>Add Blog</h1>
        <input value={title} onChange={(e)=>(SetTitle(e.target.value))}
         className='flex items-center h-[4rem] rounded-xl  border border-gray-800 text-black px-3 placeholder:text-center placeholder:font-semibold placeholder:text-3xl placeholder:text-gray-400' placeholder='Title'></input>
        
        <input value={tagline} onChange={(e)=>(SetTagline(e.target.value))} className='h-[3rem] rounded-xl  border border-gray-800 text-black px-3 placeholder:text-center placeholder:font-semibold placeholder:text-3xl placeholder:text-gray-400' placeholder='Tagline'></input>
        <div className='flex gap-4 items-center'>
        <h2 className='text-black font-semibold'>Add Image</h2>
        <input onChange={e => setImage(e.target.files?.[0] || null)} type='file' id='img-file' className='hidden'></input>
        <label htmlFor='img-file' className='py-1 px-3 hover:bg-gray-200 rounded-xl text-black ring'>Choose Image</label>
        </div>
        {/*<div className='flex gap-4 items-center'><h2 className='text-black font-semibold'>Add images :</h2><div className='py-1 px-3 hover:bg-gray-200 hover:cursor-pointer text-black rounded ring ring-gray-800'>Choose File</div></div>*/}
        <textarea value={content} onChange={(e)=>SetContent(e.target.value)}
         className='h-[10rem] rounded-xl  border border-gray-800 text-black px-3 placeholder:text-center placeholder:font-semibold placeholder:text-3xl placeholder:text-gray-400' placeholder='Content'></textarea>
    </div></div>
  )
}

export default page