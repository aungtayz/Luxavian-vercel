"use client"
import Chat from "@/components/ui/chat";
import {SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import LoginCom from "@/components/ui/login";
import { useAuth } from "@/app/hooks/authprovider";
import ChatList from "@/components/ui/chatList";
import { useState } from "react";
export default function ChatPage () {
const { isAuthenticated,  } = useAuth();
const [room, setRoom] = useState('');
const [sender,setSender] = useState('')
const roomUpdate = (k: string)=> {
  setRoom(k);
}

const userUpdate = (k: string) => {
  setSender(k);
}

return (


<>
{isAuthenticated ? (
  <SidebarProvider  defaultOpen={false}>
<ChatList func={roomUpdate}  func_two={userUpdate}/>
<main className="flex  w-full h-screen justify-center">
<div className="fixed w-auto float-right top-20 align-center right-5">
   <SidebarTrigger >Chats </SidebarTrigger>
</div>
<Chat room={room} sender={sender} /> 
</main>
</SidebarProvider>
): <div className="w-full flex justify-center items-center h-screen"> <LoginCom/> </div> }</>




 )
}