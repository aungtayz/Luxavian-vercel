"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card,CardContent } from "./card";
import { useSocket } from "@/app/hooks/socket";
import { useEffect } from "react";
export default function CB () {
  const socket = useSocket();
const [input,setInput] = useState('')
const [message,setMessage] = useState<string[]>([])

useEffect(() => {
  if (!socket) return; 
  socket.on('message', (message: string) => {
    setMessage((prev) => [...prev, message]);
  });
  return () => {
    socket.off('message')
  };
}, [socket]);

const sendMessage = () => {
if(socket && input.trim()) {
  socket.emit("message",input)
}
setInput('')
}


  return (
    
  <Card  className="w-2/3 h-5/6 flex flex-col mx-auto gap-2">

<h1 className="mx-auto p-2 text-xl">Chat</h1>

<CardContent className="flex overflow-y-auto flex-1  flex-col gap-2">
{message.map((msg, i) => {
  return (
   <p className="border rounded p-2" key={i}>
    {msg} 
   </p>
  );
})}

</CardContent>
<div className="flex m-2 justify-center flex-row gap-2">

<Input onChange={(e) => {

setInput(e.target.value)
}} value={input} className="lg:w-2/3 sm:w-full" placeholder="Type your message here...">

</Input>
<Button onClick={sendMessage}>
Send
</Button>
</div>



  </Card>
  
  );
}