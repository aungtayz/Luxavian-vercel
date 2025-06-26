"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card,CardContent } from "./card";
import { useSocket } from "@/app/hooks/socket";
import { useEffect } from "react";
import { set } from "zod";

interface Message {
  sender: string;
  message: string;
}
export default function Chat ({room,sender}: {room: string, sender: string}) {
  const socket = useSocket();
const [input,setInput] = useState('')
const [message, setMessage] = useState<Message[]>([])

const messageFecth = async () => {

   const res = await fetch('http://localhost:5000/api/message/?roomid=' + room , {
  method: 'GET',})
if(!res.ok) {
 throw new Error('Failed to fetch data');
}
const response = await res.json();
console.log(response)
response.map((msg: Message) => {
  const messageObject :Message = {
    message: msg.message,
    sender: msg.sender
  }
  setMessage((prev) => [...prev, messageObject]);
})

}



useEffect(() => {
  messageFecth()

  return () => {
    setMessage([])
  }
},[room])

useEffect(() => {
  if (!socket) return; 
socket.emit('private_room', room);
socket.emit('set_username', sender)
  socket.on('message', (msg,username) => {

const messageObject :Message = {
  message: msg,
  sender: username
}

    setMessage((prev) => [...prev, messageObject]);
  });
  return () => {
    socket.off('message')
  };
}, [socket, room]);

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
};
const sendMessage = () => {
if(socket && input.trim()) {
  socket.emit("message",input,room)
}
setInput('')
}



  return (
    
  <Card  className="flex flex-col  w-full md:w-2/3 h-4/5 md:h-3/4 ">

<div className="border-b text-center">
<h1 className="mx-auto p-4 text-l ">{room}</h1>

</div>
<CardContent className="flex overflow-y-auto flex-1  flex-col gap-2">
{ room ? <div>{message.map((msgs, i) => {
const isMine = msgs.sender === sender;
  return (
   <div className={`border mt-2 flex flex-col rounded p-2 ${isMine ? 'bg-secondary text-secondary-foreground self-end' : ' self-start'}`}  key={i}>
    <h3 className="pl-2">{msgs.sender}</h3>
  <p className="p-2"> {msgs.message} </p>
   </div>
  );
})}
</div>: <p className="mx-auto text-l m-5">Please choose a chat </p>}

</CardContent>
<div className="flex m-2 justify-center flex-row gap-2">

<Input onChange={(e) => {

setInput(e.target.value)
}} value={input} className="lg:w-2/3 sm:w-full" placeholder="Type your message here...">

</Input>
<Button onClick={sendMessage} disabled={!room}>
Send
</Button>
</div>



  </Card>
  
  );
}