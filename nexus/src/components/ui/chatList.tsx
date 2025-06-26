"use client";
import {  useEffect,useState } from "react";
import { Card,CardContent } from "./card";
import Loading from "./loading";
import { Sidebar,SidebarContent,SidebarGroup, SidebarTrigger } from "./sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
interface User {
 name: string;
 email: string;
 avatar: string;
}

interface ChatListProps {
  func: (email: string) => void;
  func_two: (name: string) => void;
}

export default function ChatList({ func, func_two}: ChatListProps,) {
 const [data, setData] = useState<User[]>([]);
 const [room, setRoom] = useState('');
 const [loading, setLoading] = useState(true);
 const [user,setUser] = useState({
  name: '',
  email: '',
  avatar: '',
 })

const fetcher = async () => { 
 const res = await fetch('http://localhost:5000/api/users/', {
  method: 'GET',
  credentials: 'include',
});
if(!res.ok) {
 throw new Error('Failed to fetch data');
}
const response = await res.json();
setData(response);
}

  

const userfetcher = async () => { 
 const res = await fetch('http://localhost:5000/api/users/mychat', {
  method: 'GET',
  credentials: 'include',
});
if(!res.ok) {
 throw new Error('Failed to fetch data');
}
const response = await res.json();
setUser(response);
}


  // Make name pair room
const roomMaker = (a: any, b: any) => {
  if (a === undefined || b === undefined) {
    throw new Error('Names cannot be undefined');
  }
const sorted = [a, b].sort();

setRoom(`${sorted[0]}_and_${sorted[1]}`);
return func(`${sorted[0]}_and_${sorted[1]}`);
}

useEffect(() => {
 
fetcher().then(()=> {userfetcher()}).finally(() => {
 setLoading(false);})
},[])



func_two(user.name)

//Make sure to add the user to the list
const userArray = data.map((i) => {
 return (

   <Card onClick={() => roomMaker(user.name,i.name)} key={i.email} className="mt-2 w-full">
    <CardContent className="flex w-full flex-row items-center justify-center items-center gap-3">
      <div className="pt-3 flex-shrink-0">
        <Avatar className="w-10 h-10">
          <AvatarImage src={i?.avatar} className="w-10 h-10 object-cover rounded-full" />
          <AvatarFallback>Df</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col justify-center pt-3 flex-1 min-w-0">
        <h1 className="text-xs truncate">Name: {i.name}</h1>
        <h1 className="text-xs truncate">Email: {i.email}</h1>
      </div>
    </CardContent>
  </Card>
 
 )
})

 return (
<Sidebar side="right" className=" flex" variant="floating" >
  <div className="fixed  "  >
          <SidebarTrigger />
    </div>
  <SidebarContent className="flex p-3 overflow-y-auto">
    
    <SidebarGroup >

 
    {loading ? (
      <Loading />
    ) : (
      <div className="flex w-full justify-center align-center flex-col">{userArray}</div>
    )}

</SidebarGroup>
</SidebarContent>
</Sidebar>

 )
}