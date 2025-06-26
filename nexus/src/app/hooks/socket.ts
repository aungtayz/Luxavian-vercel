"use client";
import {io, Socket} from 'socket.io-client';
import {useEffect, useState, useRef} from 'react';


let socket : Socket | null = null
export function useSocket () {

const [instance, setInstance] = useState<Socket | null> (null)

useEffect(() => {
if(!socket) {
 const socket = io('http://localhost:5000', {
  withCredentials: true,
  transports: ['websocket'],
 });
 setInstance(socket)
}


return () => {
socket?.disconnect()
}},[])
return instance
}