'use client';
import React, { useState } from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { FaExternalLinkAlt } from "react-icons/fa";
import axios from 'axios';
import { log } from 'console';
import { useRouter } from 'next/navigation';

const BASE = "https://blog-app-2-ezgs.onrender.com/"


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  console.log("Logging in with", username, password);
  const router = useRouter();
  
  async function handleLogin(e: React.FormEvent) {
    console.log("inside handleLogin");
    
    e.preventDefault(); // prevent page reload
    try {
      const response = await axios.post(`${BASE}users/login/`, {
        username:username,
        password:password,
      });
      console.log("Logging in with", username, password);
      console.log("Login response:", response.data);
      console.log("token : ",response.data.token)
      // Save token to localStorage or context
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      router.push('/home'); // Redirect to home page after login
      // Redirect or update UI
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center min-h-screen bg-[url('/images/register.jpg')] bg-cover bg-center">
      <div className="backdrop-blur-lg bg-neutral-600/40 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <h2 className="text-center text-2xl font-thin text-white mb-4">Login</h2>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-light text-white mb-1">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="px-4 py-2 rounded-2xl border border-gray-400 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-light text-white mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-4 py-2 rounded-2xl border border-gray-400 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div className='font-thin text-[0.9rem] py-1 flex gap-1 items-center justify-center'>
            New user?{" "}
            <h1 className='hover:underline flex justify-center items-center gap-[0.2rem]'>
              register <FaExternalLinkAlt className='text-[0.5rem]' />
            </h1>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 mt-4 hover:cursor-pointer bg-gradient-to-r from-cyan-400 to-amber-600 hover:ring hover:bg-gradient-to-r hover:from-black/40 hover:to-gray-800 transition duration-350 text-white text-lg font-light py-3 px-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login <GoArrowUpRight className='text-xl flex' />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
