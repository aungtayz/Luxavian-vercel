"use client";
import { useAuth } from "@/app/hooks/authprovider";
import LoginCom from "@/components/ui/login";
import {Card,CardContent, CardHeader} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect,useState } from "react";

export default function Newsfeed() {
 const {loading,isAuthenticated} = useAuth()
const [feedsArray, setFeedsArray] = useState([])
 const newsFeedsFetch = async () => {
 const response = await fetch('http://localhost:5000/api/posts/feeds')
 if(!response.ok) {
  throw new Error(' Cannot fetch feeds data')
 }
 const data = await response.json()
 setFeedsArray(data)
 
 }  
useEffect(() => {
  newsFeedsFetch()
},[])

if (loading) return <div className="w-full flex justify-center items-center h-screen">Loading...</div>
if (!isAuthenticated) return <div className="w-full flex justify-center items-center h-screen">  <div>
        <p> Please login to access this page</p>
        <div className=" mx-auto flex items-center justify-center" style={{ height: '100vh' }}>
        <LoginCom />
        </div>
      
    </div>
    </div>

return(
<div className="w-full flex flex-col gap-3">
{feedsArray.map((i: {
  id: string | number;
  createdAt: string;
  avatar?: string;
  authorName: string;
  authorEmail: string;
  email?: string;
  content: string;
}) => {

  const date = i.createdAt.slice(0,10)
 return(
  

  <Card key={i.id ?? Math.random()} className="w-full ">
<CardHeader className="flex flex-row gap-2 justify-between ">
  
<div className="flex gap-2 align-center flex-row">
<Avatar>
  <AvatarImage src={i?.avatar} />
  <AvatarFallback>Df</AvatarFallback>
 </Avatar>
<div className="flex flex-col">
  <h2>{i.authorName}</h2>
<p>{i.authorEmail}</p>
<p className="text-xs lg:text-xs sm:text-[10px]">{i.email}</p>
</div>
</div>

<div className="flex sm:flex-row items-center  flex-col gap-5">
<p className="text-xs lg:text-xs sm:text-[20px]"> {date}</p>

</div>

</CardHeader>

<CardContent>
{i.content}
</CardContent>


</Card>  
 )})}
</div>
)
}