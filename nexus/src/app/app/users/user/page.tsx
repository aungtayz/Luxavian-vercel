"use client";

import { useSearchParams } from "next/navigation";
import { useEffect,useState } from "react"
import Profile from "@/components/ui/profile";

import UserPosts from "@/components/ui/userPosts";
export default function User() {
  const [user,setUser] = useState({
    name: '',
    email: '',
    avatar:''
  })
  const searchParam = useSearchParams()
  const userId = searchParam.get('userId')
 
 const apiString = "/users/user?userId=" + userId;
 const fetcher = async() => {
try{
  const response = await fetch('http://localhost:5000/api' + apiString, {credentials: 'include'})
if(!response.ok) {
  throw new Error('Cannot get the user')
}
const data = await response.json()
setUser(data)
}catch(err) {
  throw new Error('Cannot get the user' + err)
}
 }
 useEffect(() => {
  fetcher()
  }, [userId])

 return ( 
     
              <div className="flex gap-2 flex-col w-full mx-auto h-full">
            <Profile user={user}/>
            <UserPosts user={user}></UserPosts>
        </div>
        
       
      
            
         
 )
}