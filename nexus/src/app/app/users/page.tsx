"use client";
import Link from "next/link";
import { Avatar,AvatarFallback,AvatarImage } from "@radix-ui/react-avatar";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import {  useEffect,useState } from "react";
import LoginCom from "@/components/ui/login";
import { useAuth } from "@/app/hooks/authprovider";
export default  function Users() {
  const { isAuthenticated, loading  } = useAuth()
const [usersArray, setUsersArray] = useState([])
const usersFetch = async () => {
  const response = await fetch('http://localhost:5000/api/users/', {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('Cannot fetch users data')
  }
  const data = await response.json()
  setUsersArray(data)
}
useEffect(() => {
  usersFetch()}
  ,[])

if (loading) return <div className="w-full flex justify-center items-center h-screen">Loading...</div>
if (!isAuthenticated) return <div className="w-full flex justify-center items-center h-screen">  <div>
        <p> Please login to access this page</p>
        <div className=" mx-auto flex items-center justify-center" style={{ height: '100vh' }}>
        <LoginCom />
        </div>
      
    </div>
    </div>

 return ( 
<div className="w-full h-full flex justify-center items-center">
  <div className="flex  gap-3 flex-col w-full h-full  ">
 {usersArray.map((i:any ) => {

 return (
<Link style={{
  width: '100%',
  height: '100%',

}} href={'/app/users/user?userId=' + i.email}>
  <Card className="flex justify-center mx-auto flex-col md:w-full w-64 h-64">
    <CardHeader className="flex items-center">
      <CardTitle className="text-sml lg:text-2xl" style={{ display: 'flex', whiteSpace: 'nowrap' }}>{i.name}'s Profile</CardTitle>
      <Avatar>
        <AvatarImage src={i.avatar} />
        <AvatarFallback>Df</AvatarFallback>
      </Avatar>
    </CardHeader>
    <CardContent className="flex flex-col justify-center flex-wrap items-center">
      <h1 style={{ fontSize: '12px' }}>Name: {i.name}</h1>
      <h1 style={{ fontSize: '12px' }}>Email: {i.email}</h1>
    </CardContent>
  </Card>
</Link>
 )
})}
</div>
</div>

 )


}