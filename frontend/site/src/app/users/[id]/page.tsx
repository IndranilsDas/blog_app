'use client';
import { log } from 'console';
import { useParams } from 'next/navigation'
import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/lib/authcontext';
import Nav from '@/components/nav'
import Sidenav from '@/components/sidenav';
import { BsSuitDiamondFill } from "react-icons/bs";



const BACKEND_URL = 'http://127.0.0.1:8000'
function page() {
  const [User, setUser] = useState<UserProfile>()
  const user_id = useParams().id
  const token = useAuth()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  console.log(User?.profile_picture)


  type UserProfile = {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profile_picture: string;
  bio: string | null;
  following_count: number;
  followers_count: number;
};

  
  useEffect(()=>{
   if (!user_id) {
      console.error('User ID is not defined');
      return;
    }
    else{
      console.log(User?.profile_picture)
      console.log(`User ID is: ${user_id}`);
      // You can add more logic here to fetch user data or perform other actions
      async function fetchUserData() {
        try {
          const response = await axios.get(`${BACKEND_URL}/users/allusers/${user_id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`}})
          const data = await response.data;
          console.log("Data : ",data);
          setUser(data);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      } fetchUserData()
    } 
  },[])
  return (
    <div className='h-screen flex bg-white'>
        {/* Navigation bar stays fixed at top */}
        <Nav />
        
        {/* Side navigation bar */}
        <div
                className="fixed left-0 top-[3.25rem] z-10 h-[calc(100vh-3.75rem)]"
                onMouseEnter={() => setIsDrawerOpen(true)}
                onMouseLeave={() => setIsDrawerOpen(false)}
              >
                <Sidenav isopen={isDrawerOpen} />
              </div>

        {/* Main content area */}
        <div className='flex-1 p-4 mt-[3.75rem] transition-all duration-300 break-normal'
         style={{
          width: isDrawerOpen ? "calc(100% - 13rem)" : "calc(100% - 4rem)",
          marginLeft: isDrawerOpen ? "13rem" : "4rem",
        }}>
          <h1 className='text-2xl text-gray-800 font-bold mb-4 relative'>User Profile</h1>

        <div className='flex justify-between w-full ring rounded'>

          <div className='w-1/5 bg-stone-100 max-[1175px]:w-2/7 py-2 items-center ring flex flex-col gap-4 overflow-y-auto'>
          <h1 className='text-black text-[1.2rem] font-semibold'>{User?.username}</h1>
          <img src={User?.profile_picture} className='rounded-full h-60 w-60 max-[545px]:h-25 max-[545px]:w-25 max-[1175px]:h-30 max-[1175px]:w-30'></img>
          <h1 className='text-black text-[1rem]'>{User?.fullname}</h1>
          <div className='flex gap-2 items-center max-[1175px]:flex-col'>
          <div className='flex text-gray-900 text-[1rem] gap-2 items-center'><h1 className='font-semibold text-[1.1rem]'>{User?.followers_count}</h1> Followers</div>
          <BsSuitDiamondFill className='h-2 w-2 text-gray-900'/>
          <div className='flex text-gray-900 text-[1rem] gap-2 items-center'><h1 className='font-semibold text-[1.1rem]'>{User?.following_count}</h1> Following</div>
          </div>
          <div className='w-full px-4 text-gray-900 text-[0.95rem]'>
            {User?.bio}
          </div>
          </div>

          <div>second box</div>
        </div>
        </div>
      
    </div>
  )
}

export default page