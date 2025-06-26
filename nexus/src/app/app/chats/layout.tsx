
import AppSide from "@/components/ui/appside"
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar"
export default function ChatLayout ({children}: {
 children: React.ReactNode
}) {
return (
 <div className="w-full  h-screen flex flex-col mx-auto items-center"> 

 <SidebarProvider defaultOpen={false}>
    <AppSide/>

     <main className="mt-20 h-screen w-full mx-auto sm:w-full">
    
  <div className="fixed w-auto float-left top-20 left-5 ">
                          <SidebarTrigger/>
               </div>
     {children}
     </main >
 </SidebarProvider>


</div>
)
}