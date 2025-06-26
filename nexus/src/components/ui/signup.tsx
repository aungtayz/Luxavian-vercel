"use client";

import { Gsignin } from "@/components/ui/googleLogin";
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { Label } from "@/components/ui/label"


export default function SignupCom () {




    return (
        <form  className="w-full flex" >
            <div className="w-full flex justify-center items-center">
            <Card className="flex flex-col justify-center w-full h-auto self-center">
                <CardHeader className="flex justify-center items-center">
                <CardTitle className="text-lg">Sign Up</CardTitle>
                <CardDescription>Welcome</CardDescription>
           
                </CardHeader>
                <CardContent>

                <Label htmlFor="Name">Name</Label>
                <Input required name="name" id="Email" type='text' autoComplete="off"  />
<div> 

  </div>

                <Label htmlFor="Email">Email</Label>
                <Input required name="email" id="Email" type='email' autoComplete="off"  />
<div> 

  </div>
             
              


                <Label htmlFor="Password">Password</Label>
                <Input  maxLength={12} minLength={4} required name="password" id="Password" type='password'  />
               <div>
              
               </div>

            <div className="p-5 flex justify-center">
                <Button type="submit" variant={'ghost'}>Submit</Button>
            </div>
               
                </CardContent>
                <CardFooter className="flex justify-center flex-col">
                <div className="flex justify-center my-4">
             <Gsignin />
                </div>
                </CardFooter>
            </Card>
            </div>
        </form>
        
    )
}