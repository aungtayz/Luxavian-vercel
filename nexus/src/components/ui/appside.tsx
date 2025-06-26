"use client"
import { 
 Sidebar,SidebarContent,SidebarGroup, SidebarTrigger } from "./sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"

import { MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "./button";
import { Search } from "lucide-react";
import {Label} from "./label";
import { useState,useEffect } from "react";
import { Input } from "./input";
import { Newspaper } from "lucide-react";
import { useAuth } from "@/app/hooks/authprovider";
import { Contact2 } from "lucide-react";


export default function AppSide() { 
const {logout} = useAuth();


const router = useRouter();
const [open, setOpen] = useState(false);
const [user,SetUser] = useState('')
const [profile, setprofile] = useState({
  name:'',
  email:"",
  avatar:'',
})
const [form, setForm] = useState({
  content: "",
  authorEmail: "",
})
const fetchUSer = async () => {
try{
 
  const response = await fetch(`http://localhost:5000/api/profile`,{
      credentials: 'include',
      method: 'GET',
  })
if(!response.ok) {
  throw new Error('Network response was not ok');
}
const data = await response.json();

const {user} = data
setprofile({
    name: user.name,
      email: user.email,
      avatar: user.avatar,
})
}catch (err) {
  throw new Error(String(err));
}

}
useEffect(() => {
  fetchUSer()
},[])



const postContentfetch = async (e: any) => {
  e.preventDefault();
  const res = await fetch("http://localhost:5000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
setOpen(false)
}
const searchOnclick = (e:any) => {
  e.preventDefault();
  if(user === '') {
    alert('Please enter a valid email')
    return;
  }
  router.push('/users/user?userId=' + user)
  
}
const handleSearch = (e:any) => {
e.preventDefault();
SetUser(e.target.value);

}
const handleChange = (e: any) => {
  e.preventDefault();
  const {value,name} = e.target;
  setForm(() => {
    return {
      ...form,
      [name]: value,
      authorName: profile.name,
      avatar: profile.avatar,
      authorEmail: profile.email,
    }
  })}



 return (
  <Sidebar>
   <SidebarContent>
    <SidebarTrigger />
    <SidebarGroup>
<div className="flex flex-col gap-3 justify-evenly items-center  ">
<div className="flex flex-col w-full justify-center gap-2">
  <Button className="w-full">
  <Link href='/app/newsfeeds' className="flex w-full gap-1 justify-center items-center text-center">
    Feeds<Newspaper />
  </Link>
</Button>
<Button>
  <Link href={'/app/users'} className="flex w-full gap-1 justify-center items-center text-center">
    Users<Contact2 />
  </Link>
</Button>
<Button className="w-full">
  <Link href={'/app/chats'} className=" flex w-full gap-1 justify-center items-center text-center">
    Chat<MessageCircleMore/>
  </Link>
</Button>
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger className="w-full">
  <Button className="w-full" onClick={() => setOpen(true)}> 
    Post<Plus className="w-1rem h-1rem sm:w-5 sm:h-5" />
  </Button>
  </DialogTrigger>
  <DialogContent >
    <DialogHeader>
      <DialogTitle>New Post</DialogTitle>
      <DialogDescription>
        Create a new post
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Label htmlFor="title"></Label>{profile.name}

      <Textarea onChange={handleChange}
      id="content"
      name="content"
      placeholder="Enter content"
      className="border-hidden h-full rounded-md p-2 w-full"
      rows={12}
      />
    </div>
    <DialogFooter>
         <Button className="w-full"
        onClick={(e) => {
          postContentfetch(e);
         
        }}
        type="submit"
      >
        Create
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog></div>
<div className="flex w-full flex-row gap-2 ">
  <Input required className="w-full" onChange={handleSearch} value={user} placeholder="Search an email" type="text" name="search" id="search"></Input>
  <Button onClick={searchOnclick} variant="outline" className="p">
    
    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
 
    
  </Button>
</div>
<div className="flex flex-col justify-end flex-1 w-full mt-auto">
  <Button variant="destructive" onClick={logout} className="w-full">
    Logout 
  </Button>
</div>

</div>
    </SidebarGroup>
   </SidebarContent>
  </Sidebar>
 )
}