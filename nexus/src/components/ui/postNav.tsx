"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Contact2 } from "lucide-react";

export default function ProfileNav ({ email, avatar,ename }: { email: string; avatar?: string ; ename: string;}): any {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user,SetUser] = useState('')
const [form, setForm] = useState({
  content: "",
  authorEmail: "",
})
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
      authorName: ename,
      avatar: avatar,
      authorEmail: email,
    }
  })}





 return(<div className="flex lg:flex-row flex-col justify-center items-center mt-5 w-full mx-auto">

<div className="flex flex-col gap-3 justify-evenly items-center lg:w-1/2 w-full  bg-background border-hidden rounded-lg text-center ">
<div className="flex flex-row w-full justify-center gap-2">
  <Button >
  <Link href='/app/newsfeeds' className="flex items-center  gap-1">
    Feeds<Newspaper />
  </Link>
</Button>
<Button>
  <Link href={'/app/users'} className="flex items-center gap-1">
    Users<Contact2 />
  </Link>
</Button>
<Button>
  <Link href={'/app/chats'} className="flex items-center gap-1">
    Chat<MessageCircleMore/>
  </Link>
</Button>
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>
  <Button className="flex items-center gap-2 sm:gap-1 text-sm sm:text-base"> 
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
      <Label htmlFor="title">This post can be seen by everyone</Label>

      <textarea onChange={handleChange}
      id="content"
      name="content"
      placeholder="Enter content"
      className="border-hidden h-full rounded-md p-2 w-full"
      rows={4}
      ></textarea>
    </div>
    <DialogFooter>
      <Button
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

</div>


</div>

 )
}

