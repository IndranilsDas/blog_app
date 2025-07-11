'use client';
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
  const user_id = useParams().id
  console.log(user_id)
  return (
    <div className='flex flex-col'></div>
  )
}

export default page