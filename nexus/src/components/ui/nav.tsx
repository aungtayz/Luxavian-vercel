"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import { LucideMenu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react";


import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SignupCom from "@/components/ui/signup"
import LoginCom from "@/components/ui/login"
import {Label} from "@/components/ui/label"
import * as React from "react"
import { Moon, Radius, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from '@/components/ui/button'
export default function Nav() {
  const { setTheme } = useTheme();
  const [page,setpage] = useState(true)
  return (
  
<nav className='fixed flex-shrink z-10 flex justify-between pl-2 pr-2 w-full  text-white bg-background border rounded-lg text-center 
  border-border dark:border-border-dark'>

  <div className="flex items-center p-2 gap-2 bg-background rounded-lg shadow-lg">
    <Link href="/">
      <img src="/favlogo.png" alt="logo" className="h-10 w-13 rounded-full " />
    </Link>
    <h1 className="bg-background text-foreground"><span className="text-yellow-500 text-lg">L</span>uxavian</h1>
  </div>

{/* Desktop Navigation */}
  <div className=" justify-evenly hidden md:flex lg:gap-10 items-center lg:pl-2 lg:pr-2">
<Dialog>
    <NavigationMenu>
      <NavigationMenuList>
      
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground">Services
            <NavigationMenuContent className="w-[250px] h-[100px] flex items-center justify-evenly p-3 gap-3">
              <NavigationMenuLink className="hover:text-yellow-500">
             
         Quantum Computing
 
              </NavigationMenuLink>
              <NavigationMenuLink className="hover:text-yellow-500">
                Software Development
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
       

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground">About
            <NavigationMenuContent    className="w-[250px] h-[100px] flex items-center justify-evenly p-3 gap-3"       >
              <NavigationMenuLink href="/app/aboutus" className="hover:text-yellow-500">
                About Us
              </NavigationMenuLink>
              <NavigationMenuLink href="/app/aboutgoals" className="hover:text-yellow-500">
                About Goals
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuTrigger>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger  className="text-foreground">Register
            <NavigationMenuContent className="w-[250px] h-[100px] flex items-center justify-evenly p-3 gap-3">

              
<DialogTrigger asChild>
        <Button variant={'ghost'} onClick={() => {setpage(false)}}  >Signup</Button>
      
             </DialogTrigger>

              <DialogTrigger asChild>
        <Button onClick={() => {setpage(true)}} variant={'ghost'}>Login</Button>
      </DialogTrigger>


    

              
            </NavigationMenuContent>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        

      </NavigationMenuList>
    </NavigationMenu>

    <DialogContent className="w-100vh flex flex-col max-w-sm sm:max-w-md mx-auto px-4">
        <DialogHeader>
          <DialogTitle>Luxavian</DialogTitle>
        </DialogHeader>
       <div className="w-full">
         {page ? <LoginCom /> : <SignupCom />}
       </div>
        <DialogFooter className="flex text-align aling-center justify-center">
          {page ? (
            <p>
              Don't have an account?{" "}
              <Button variant="link" onClick={() => setpage(false)}>
                Signup
              </Button>
            </p>
          ) : (
            <p>
              Account already existed?{" "}
              <Button variant="link" onClick={() => setpage(true)}>
                Login
              </Button>
            </p>
          )}
        </DialogFooter>
      </DialogContent>
      </Dialog>

<Link href={"/app/profile"}>
<Avatar>
  <AvatarImage  />
  <AvatarFallback>Df</AvatarFallback>
</Avatar></Link>


    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="text-foreground h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className=" text-foreground absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
 
  </div>


   

{/* Mobile Navigation */}
<div className="flex md:hidden gap-5 justify-between items-center ">
  <div className="items-center text-foreground transition-colors cursor-pointer">
<Sheet > <SheetTrigger asChild>
  <LucideMenu  />
</SheetTrigger>
<SheetContent side={'top'} className="w-full flex h-1/5 items-center justify-center">
  <Dialog>
    <NavigationMenu>
      <NavigationMenuList>
      
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground">Services
            <NavigationMenuContent style={{
              width: '200px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              padding: '1px',
              justifyContent: 'space-evenly'
            }}>
              <NavigationMenuLink className="hover:text-yellow-500">
             
         Quantum Computing
 
              </NavigationMenuLink>
              <NavigationMenuLink className="hover:text-yellow-500">
                Software Development
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
       

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-foreground">About
            <NavigationMenuContent style={{
              width: '200px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly'
            }}>
              <NavigationMenuLink href="/app/aboutus" className="hover:text-yellow-500">
                About Us
              </NavigationMenuLink>
              <NavigationMenuLink href="/app/aboutgoals" className="hover:text-yellow-500">
                About Goals
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuTrigger>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger  className="text-foreground">Register
            <NavigationMenuContent style={{
              width: '200px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly'
            }}>

              
<DialogTrigger asChild>
        <Button variant={'ghost'} onClick={() => {setpage(false)}}  >Signup</Button>
      
             </DialogTrigger>

              <DialogTrigger asChild>
        <Button onClick={() => {setpage(true)}} variant={'ghost'}>Login</Button>
      </DialogTrigger>


     
              
            </NavigationMenuContent>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        

      </NavigationMenuList>
    </NavigationMenu>
    <DialogContent className="w-100vh flex flex-col max-w-sm sm:max-w-md mx-auto px-4">
        <DialogHeader>
          <DialogTitle>Luxavian</DialogTitle>
        </DialogHeader>
       <div className="w-full">
         {page ? <LoginCom /> : <SignupCom />}
       </div>
        <DialogFooter className="flex text-align aling-center justify-center">
          {page ? (
            <p>
              Don't have an account?{" "}
              <Button variant="link" onClick={() => setpage(false)}>
                Signup
              </Button>
            </p>
          ) : (
            <p>
              Account already existed?{" "}
              <Button variant="link" onClick={() => setpage(true)}>
                Login
              </Button>
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>

<Link href={"/app/profile"}>
<Avatar>
  <AvatarImage />
  <AvatarFallback>Df</AvatarFallback>
</Avatar></Link>


   
 
  </SheetContent>
</Sheet>


</div>


<div className="  items-center">
   <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="text-foreground h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className=" text-foreground absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
</div>
  </div>


</nav>

)
}