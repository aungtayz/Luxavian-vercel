"use client";

import { useAuth } from "@/app/hooks/authprovider";
import React,{ Suspense } from "react";
import LoginCom from "@/components/ui/login";
import Profile from "@/components/ui/profile";
import ProfilePost from "@/components/ui/profilePost";
import Loading from "@/components/ui/loading";

export default  function NewFeeds () {

    const {user, isAuthenticated,loading } = useAuth()


       
      
        return( <Suspense >
            <div className="w-full justify-center items-center h-100vh flex flex-col">
    {loading ? (  <Loading/>):
(isAuthenticated ? (
    <>
  
    
      
        <div className="flex flex-col mx-auto flex-grow" >
            <div className="flex gap-2 flex-col w-full mx-auto h-full">
                <Profile user={user} />
                <ProfilePost user={user} />
                
            </div>
        </div>

      

    </>
) : (

    <div>
        <p> Please login to access this page</p>
        <div className=" mx-auto flex items-center justify-center" style={{ height: '100vh' }}>
        <LoginCom />
        </div>
      
    </div>
    
        
       
    
    
))

        
        
    }
        </div>
        </Suspense>
        )
     
    }
        
 


