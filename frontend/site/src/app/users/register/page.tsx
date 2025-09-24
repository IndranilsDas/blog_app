'use client';
import React, { useEffect } from 'react';
import { GoArrowUpRight } from "react-icons/go";
import axios from 'axios';
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authcontext';

const BASE =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://blog-app-2-ezgs.onrender.com";



function Register() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter()
  const {login} = useAuth()
  //console.log("fullname:",fullname, "email:",email,"password:" ,password);

async function handleRegister(e:React.FormEvent) {
  e.preventDefault();
    console.log("inside handleRegister");
    try {
      const response = await axios.post(`${BASE}/users/register/`, {
        username: username,email:email ,password: password}
      );console.log("response : ",response)
    try{
    login(response.data.token,{id:response.data.id,username:response.data.user.username})
    router.push('/home')
  }catch(e){console.error(e)}
  }
    catch (error) {
      console.error("Registration error:", error);
    }}
  return (
    <div className=" h-screen flex items-center justify-center min-h-screen bg-[url('/images/starry.jpg')] bg-cover bg-center">
      <div className="backdrop-blur-lg bg-neutral-600/40 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <h2 className={`text-center text-2xl font-thin text-white mb-4`}>Register</h2>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-light text-white mb-1"> Username</label>
            <input
              id="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Userame"
              className="px-4 py-2 rounded-2xl border border-gray-400 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-light text-white mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
          <div className='font-thin text-[0.9rem] py-1 flex gap-1 items-center justify-center'>Already a user? <h1 className='hover:underline flex justify-center items-center gap-[0.2rem]'>signup <FaExternalLinkAlt className='text-[0.5rem]' /></h1></div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 mt-4 hover:cursor-pointer bg-gradient-to-r from-cyan-400 to-amber-600 hover:ring hover:bg-gradient-to-r hover:from-black/40 hover:to-gray-800 transition duration-350 text-white text-lg font-light py-3 px-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register <GoArrowUpRight className='text-xl flex' />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
