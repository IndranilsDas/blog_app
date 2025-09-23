'use client';
import Image from "next/image";
import { Macondo_Swash_Caps } from "next/font/google";
import { Raleway } from "next/font/google";
import { useRouter } from "next/navigation";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const macondo = Macondo_Swash_Caps({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-macondo',
})

export default function Home() {
  const router = useRouter()
  return (
    <div className="w-screen min-h-screen flex flex-col bg-[url('/images/strips.jpg')] bg-cover bg-center">
    <div className="top-0 w-full flex justify-between px-8 py-4">
      <div className={`${macondo.className} flex text-2xl`}><button className='font-light text-white'>Meraki</button></div>
      <div className="flex gap-4">
      <div>
      <h1 onClick={()=>{router.push('/users/register')}} className="transition duration-200 cursor-pointer hover:backdrop-blur-md hover:bg-gradient-to-r hover:bg-neutral-500/30 border border-gray-400 rounded-lg px-3 py-1">Sign-up</h1>
      </div>
      <div>
      <h1 onClick={()=>{router.push('/users/login')}} className="transition duration-200 cursor-pointer hover:backdrop-blur-md hover:bg-gradient-to-r hover:bg-neutral-500/30 border border-gray-400 rounded-lg px-3 py-1">Login</h1>
      </div>
      </div>
    </div>

    <div className="w-full flex items-center justify-center">
      <div className="w-[98vw] rounded-lg backdrop-blur-lg bg-neutral-800/30 px-6">
      <h1 className="text-xl py-10 font-thin"><b className="text-3xl">Meraki Blog app</b> by Indranil Das</h1>
      <div className="border-b h-[0.5px] border-b-gray-300 w-full"></div>
      <div>
        <div className="py-10 flex flex-col gap-4">
        <h1 className="text-3xl font-light">TechStack</h1>
        <h1 className="font-thin text-lg">Frontend :</h1>
        <div className="flex flex-col px-3">
          <h1 className="font-light">JavaScript/TypeScript</h1>
          <h1 className="font-light">NextJS</h1>
          <h1 className="font-light">Tailwind CSS</h1>
          <h1 className="font-light">HTML5</h1>
        </div>
        <h1 className="font-thin text-lg">Backend :</h1>
        <div className="flex flex-col px-3">
          <h1 className="font-light">Python</h1>
          <h1 className="font-light">Django REST Framework</h1>
          <h1 className="font-light">Django REST ORM</h1>
          <h1 className="font-light">SQLlite</h1>
        </div>
        </div>
      </div>


      
      </div> 
    </div>
      
    </div>
  );
}
