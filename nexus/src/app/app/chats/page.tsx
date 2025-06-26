"use client"
import Chat from "@/components/ui/chat";
import { Sidebar,SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import LoginCom from "@/components/ui/login";
import { useAuth } from "@/app/hooks/authprovider";
import CheckAuthPage from "@/components/ui/checkAuth";
import {Card,CardContent,CardDescription, CardTitle} from '@/components/ui/card'
import ChatList from "@/components/ui/chatList";
import { useEffect,useState } from "react";
export default function ChatPage () {
const { isAuthenticated,user, loading,  } = useAuth();
const [room, setRoom] = useState('');
const [sender,setSender] = useState('')
const [messages, setMessages] = useState([])
const roomUpdate = (k: any)=> {
  setRoom(k);
}

const userUpdate = (k: any) => {
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