'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/lib/authcontext'
import Nav from '@/components/nav'

type Blog = {
  id: number
  author: number
  author_name: string
  created_at: string
  title: string
  image: string
  content: string
}

const BACKEND_URL = 'http://127.0.0.1:8000'

function Page() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const token = useAuth()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log('Fetching blogs with token:', token)
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
  }, [token]) // include token in dependency

  return (
    <div className="relative w-full min-h-screen bg-[url('/images/cycle.jpg')] bg-fixed bg-cover bg-no-repeat">
      <Nav />
      <div className="pt-16 pb-6 px-4 flex flex-col gap-2 items-center">
        {blogs.map((blog) => (
          <div key={blog.id} className="backdrop-blur-2xl hover:bg-zinc-500/40 bg-zinc-400/40 transition duration-100 flex px-3 py-4 rounded-2xl border-b border-gray-600 w-full max-w-4xl">
            <div className='flex flex-col w-5/7'>
              <div className='flex items-center gap-1 text-sm font-light text-black'>
                by
                <span className='px-3 py-1 rounded-full bg-gradient-to-r from-gray-800 to-black/60 text-white'>
                  {blog.author_name}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-black mb-1 truncate">{blog.title}</h2>
              <p className="text-sm text-black truncate">{blog.content}</p>
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

export default Page
