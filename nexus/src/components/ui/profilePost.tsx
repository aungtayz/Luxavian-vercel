"use client"
import { useState,useEffect } from "react"
import {Card,CardContent, CardHeader} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trash2 } from "lucide-react"

interface profileProps {
  user: {
    email: string;
    gooogleId?: string;
    name: string;
    avatar?: string
  }
}

export default function ProfilePost({user}: profileProps) {
interface Post {
  content: string;
  createdAt: string;
}

const [posts, setPosts] = useState<Post[]>([])

const fetchPosts = async () => {
 const res = await fetch('http://localhost:5000/api/posts/me', {
  method: 'GET',
  credentials: 'include',
});
if(!res.ok) {
  throw new Error('Failed to fetch data')
}
const data = await res.json()
setPosts(data)
}

useEffect(() => {
 fetchPosts() 
},[])
const postArray =  posts.map((i) => {
const date = i.createdAt.slice(0,10)
 return (
<Card key={Math.random()}>
  <CardHeader className="flex flex-row gap-2 justify-between ">
    <div className="flex gap-2 align-center flex-row">
      <Avatar>
        <AvatarImage src={user?.avatar} />
        <AvatarFallback>Df</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h2>{user.name}</h2>
        <p className="text-xs lg:text-xs sm:text-[10px]">{user.email}</p>
      </div>
    </div>
    <div className="flex sm:flex-row items-center  flex-col gap-5">
      <p className="text-xs lg:text-xs sm:text-[20px]"> {date}</p>
      <Trash2 className="text-red-500   cursor-pointer hover:text-red-700" size={20} />
    </div>
  </CardHeader>
  <CardContent>
    {i.content}
  </CardContent>
</Card>
 )
})

return (<div className="flex flex-col justify-between gap-2">
{postArray}
 </div>
)
}
