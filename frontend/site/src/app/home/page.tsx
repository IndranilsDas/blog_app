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

const BACKEND_URL = 'http://127.0.0.1:8000'

function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const token = useAuth()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!token) {
          console.error('No token found, please log in first.')
          return
        }
        const response = await axios.get(`${BACKEND_URL}/blogs/your_blogs/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          }
        })
        setBlogs(response.data)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      }
    }

    fetchBlogs()
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
        className="pt-16 pb-6 px-4 flex flex-col transition-all duration-300"
        style={{
          width: isDrawerOpen ? "calc(100% - 13rem)" : "calc(100% - 4rem)",
          marginLeft: isDrawerOpen ? "13rem" : "4rem",
        }}
      >
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="hover:bg-zinc-300/40 transition duration-300 hover:cursor-pointer flex rounded-xl px-3 py-4 border-b-[0.15px] w-full max-w-4xl"
          >
            <div className='flex flex-col w-5/7'>
              <div className='flex items-center gap-1 text-sm font-light text-black'>
                <span className='flex gap-1 my-2 justify-center items-center px-2 py-1 text-sm font-light rounded-full ring text-black'>
                  <img
                  src={blog.profile_image || '/default-profile.png'}
                  alt={blog.author_name}
                  className="w-4 h-4 rounded-full"
                />{blog.author_name}
                </span>
              </div>
              <span className='flex gap-2 items-center font-light text-sm text-gray-900'><ImCalendar className='h-4'/>{blog.created}</span>
              <h2 className="text-[1.6rem] font-extrabold text-black mb-1 truncate">{blog.title}</h2>
              <p className="text-lg text-gray-400 truncate h-6">'{blog.tagline}'</p>
              <div className='flex justify-start '>
                <span className='flex items-center text-xl text-gray-700 gap-2 mt-2 py-2 px-2 rounded-full backdrop-blur-xl bg-gray-200/50'>
                <IoHeartOutline className='h-5 w-5'/> {blog.likes}<h1 className='h-full border-r border-gray-400'/>
                <IoHeartDislikeOutline className='h-5 w-5'/>  {blog.dislikes}
                </span>
              </div>
            </div>
            <div className='w-2/7 flex justify-end items-center pl-4'>
              <img src={blog.image} alt={blog.title} className="h-32 rounded object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
