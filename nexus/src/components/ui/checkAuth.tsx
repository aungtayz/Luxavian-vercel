import React, { Suspense } from "react";
import Loading from "./loading";
import LoginCom from "./login";
import { JSX } from "react/jsx-runtime";


export default function CheckAuthPage ({children,loading,auth} :{
 children: any | React.ReactNode
 loading: boolean,
 auth: boolean
}) {
 return(
  <Suspense >
               <div className="mx-auto h-full w-full">
       {loading ? (  <Loading/>):
   (auth ? (
       <>
     {children}
       </>
   ) : (
   
  
           <div className=" flex flex-col justify-center items-center  mx-auto lg:w-1/3 w-3/4 h-full" >
            <p>Please login to access this page</p>
           <LoginCom />
           </div>
         
    
       
           
          
       
       
   ))
   
           
           
       }
           </div>
           </Suspense>
           
 )
}