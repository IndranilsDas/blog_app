import React, {useEffect} from 'react'
import { CiSearch } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { HiUser } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi2";
import { Macondo_Swash_Caps } from 'next/font/google';
import { useAuth } from '@/lib/authcontext';
import axios from 'axios';
import { IoLogOutOutline } from "react-icons/io5";

const macondo = Macondo_Swash_Caps({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-macondo',
})

type UserProfile = {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profile_picture: string;
  bio: string;
  following_count: number;
  followers_count: number;
};


const BASE =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://blog-app-2-ezgs.onrender.com";

function Nav() {
  const profile = useAuth();
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [isProfile, setIsProfile] = React.useState(false);
  console.log("User in Nav: ", profile);
  console.log("User_img in Nav: ", user?.profile_picture);
  console.log("setIsProfile : ",isProfile)

useEffect(() => {
  if (!profile) {
    console.error('No token found, please log in first. Navbar');
    return;                          // exit early when there’s no token
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${BASE}/users/current/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${profile.token}`,
          },
        }
      );
      setUser(response.data);        // save the user once the request succeeds
    } catch (err) {
      console.error('Failed to fetch current user', err);
    }
  };

  fetchUser();
}, [profile]);                          // effect re‑runs whenever token changes



  return (
    <div className='fixed top-0 left-0 z-10 w-full py-2 flex justify-center items-center backdrop-blur-2xl bg-neutral-800/70'>
      <div className={`${macondo.className} flex w-2/4 pl-6 text-2xl`}><img src='/images/compass.png' className='h-1'/><button className='font-light text-white'>Meraki</button></div>
      <div className='flex justify-end pl-10 w-2/4  items-center gap-3 pr-6'>
        <div className='flex justify-center items-center gap-2 outline-none rounded-2xl ring ring-gray-400 bg-gray-600/40 px-3 w-auto py-1 text-white lg:w-auto'><CiSearch/><input className='outline-none placeholder-white' placeholder='Search'></input></div>
        <button className='flex justify-center items-center gap-2 outline-none rounded-2xl ring ring-black-400 bg-gray-600/40 px-3 py-1 pr-4 text-white'> <IoCreateOutline/>create</button>
        {user?.profile_picture ? (
  <div onClick={()=>{setIsProfile(prev => !prev)}}>        
  <img
    src={user.profile_picture}
    
    alt={user.fullname || user.username}
    className="h-10 w-10 rounded-full object-cover ring bg-gray-600/40 ring-black"
  />{isProfile && <div className='absolute flex flex-col gap-1 top-12 right-0 shadow-lg rounded-lg p-2 transtion-all duration-500'>
      <p className='text-md font-semibold text-black rounded py-1 px-3 transition-colors duration-150'>{user?.fullname || user?.username}</p>
      <h1 className='border-b w-full'/>
      <div onClick={()=>{profile.logout()}} className='text-md text-black rounded hover:bg-gray-200 hover:cursor-pointer py-1 px-3 flex gap-2 items-center transition-colors duration-150'><h1>logout?</h1> <IoLogOutOutline/></div>
    </div>}</div>
) : (
  <CiUser  className="relative text-4xl ring bg-gray-600/40 ring-gray-400 text-white p-1 rounded-full"/>
)}

      </div>
    </div>
  )
}

export default Nav