"use client";




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
import { Gsignin } from "./googleLogin";




export default function LoginCom () {
   


    return (
        <form className="flex" >
            <div className="w-full flex justify-center items-center">
            <Card className="flex flex-col justify-center w-full h-auto self-center">
                <CardHeader className="flex justify-center items-center">
                <CardTitle className="text-lg">Login</CardTitle>
                <CardDescription>Welcome back warrior</CardDescription>
           
                </CardHeader>
                <CardContent>
                <Label htmlFor="Email">Email</Label>
                <Input required name="email" id="Email" type='email' autoComplete="off"  />

              


                <Label htmlFor="Password">Password</Label>
                <Input  maxLength={12} minLength={4} required name="password" id="Password" type='password'  />
               
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