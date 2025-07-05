'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/lib/authcontext'
import Nav from '@/components/nav'
import Sidenav from '@/components/sidenav'
import { ImCalendar } from "react-icons/im";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartDislikeOutline } from "react-icons/io5";
type Blog = {
  id: number
  author: number
  author_name: string
  profile_image: string
  created_at: string
  created: string
  reactions: any[]
  likes: number
  dislikes: number
  title: string
  tagline: string
  image: string
  content: string
}

type  Space ={
  id: number
  name: string
  description: string
  image: string
  users: any[]
  created_at: string
}

const BACKEND_URL = 'http://127.0.0.1:8000'

function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [spaces, setSpaces] = useState<Space[]>([])
  const token = useAuth()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isFeed, setIsFeed] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!token) {
          console.error('No token found, please log in first.')
          return
        }
        const response = await axios.get(`${BACKEND_URL}/blogs/all_blogs`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`}})
        setBlogs(response.data)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      }
    }

    fetchBlogs()
  }, [token])


useEffect(() => {
    const fetchSpaces = async () => {
      try {
        if (!token) {
          console.error('No token found, please log in first.')
          return
        }
        const response = await axios.get(`${BACKEND_URL}/blogs/spaces`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`}})
        setSpaces(response.data)
      } catch (error) {
        console.error('Failed to fetch spaces:', error)
      }
    }

    fetchSpaces()
  }, [token])


  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Navigation bar stays fixed at top */}
      <Nav />

      {/* Sidebar hover wrapper */}
      <div
        className="fixed left-0 top-[3.25rem] z-10 h-[calc(100vh-3.75rem)]"
        onMouseEnter={() => setIsDrawerOpen(true)}
        onMouseLeave={() => setIsDrawerOpen(false)}
      >
        <Sidenav isopen={isDrawerOpen} />
      </div>

      {/* Main content area */}
      <div
        className="pt-16 pb-6 px-4 flex transition-all duration-300 justify-between gap-2"
        style={{
          width: isDrawerOpen ? "calc(100% - 13rem)" : "calc(100% - 4rem)",
          marginLeft: isDrawerOpen ? "13rem" : "4rem",
        }}
      >
        <div className='flex flex-col justify-center w-6/7'>
        <div className='flex gap-4 pt-5 border-b'>
        <div className='relative group text-black pl-4' onClick={()=>setIsFeed(true)}>Feed
        <h1 className={`left-0 bottom-0 pb-2 border-b ${!isFeed ? 'scale-x-0' : 'scale-x-100'}`}></h1></div>
        
        <div className='relative group text-black pl-4' onClick={()=>setIsFollowing(true)}>Following
        <h1 className={`left-0 bottom-0 pb-2 border-b ${!isFollowing ? 'scale-x-0' : 'scale-x-100'}`}></h1></div>
        
        <div className='relative group text-black pl-4' onClick={()=>setIsFeatured(true)}>Featured
        <h1 className={`left-0 bottom-0 pb-2 border-b ${!isFeatured ? 'scale-x-0' : 'scale-x-100'}`}></h1></div>

      </div>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="hover:bg-zinc-300/40 transition duration-300 hover:cursor-pointer flex rounded-xl px-3 py-4 border-b-[0.15px] max-w-4xl"
          >
            <div className='flex flex-col w-5/7'>
              <div className='flex items-center gap-1 text-sm font-light text-black'>
                <span className='flex gap-1 my-2 justify-center items-center px-2 py-1 text-sm font-light rounded-full ring ring-gray-500 text-black'>
                  <img
                  src={blog.profile_image || '/default-profile.png'}
                  alt={blog.author_name}
                  className="w-4 h-4 rounded-full"
                />{blog.author_name}
                </span>
              </div>
              <span className='flex gap-1 items-center font-light text-sm text-gray-900'><ImCalendar className='h-3'/>{blog.created}</span>
              <h2 className="text-[1.6rem] font-extrabold text-black mb-1 truncate">{blog.title}</h2>
              <p className="text-lg text-gray-400 truncate h-6">'{blog.tagline}'</p>
              <div className='flex justify-start '>
                <span className='flex items-center font-semibold text-xl text-gray-600 gap-2 mt-2 py-2 px-2 rounded-full backdrop-blur-xl bg-gray-200/50'>
                <IoHeartOutline className='h-5 w-5'/> {blog.likes}<h1 className='h-full border-r border-gray-400'/>
                <IoHeartDislikeOutline className='h-5 w-5'/>  {blog.dislikes}
                </span>
              </div>
            </div>
            <div className='w-2/7 flex justify-end items-center pl-4'>
              <img src={blog.image} alt={blog.title} className="h-32 w-full object-cover max-sm:h-16 max-sm:w-full md:h-32" />
            </div>
          </div>
        ))}
        </div>
        <div className='flex flex-col h-full w-3/7 mt-4'>
            <h1 className='text-black'>more popular spaces:</h1>
            <div className='flex flex-wrap gap-3 py-4'>
              {spaces.map((space) => (
                  <h2 key={space.id} className='text-black mt-2 p-1 px-2 font-light text-sm cursor-pointer bg-gray-200 rounded-full'>{space.name}</h2>
              ))}
            
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
