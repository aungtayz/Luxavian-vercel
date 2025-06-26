
import Footer from "@/components/ui/footer"
import AppSide from "@/components/ui/appside";
import {SidebarTrigger,SidebarProvider} from "@/components/ui/sidebar";
export default function NewsfeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<div className="flex flex-col gap-5">
   
      
            <SidebarProvider defaultOpen={false}>
              <AppSide  />
               <main className="mt-20 lg:w-2/3 w-full mx-auto sm:w-full">
               <div className="fixed w-auto float-left top-20 left-5 ">
                          <SidebarTrigger/>
               </div>
     {children}
     </main >

            </SidebarProvider>
    
<Footer  />

  </div>
    
  
)
  
}