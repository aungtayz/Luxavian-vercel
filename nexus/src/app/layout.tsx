
import type { Metadata } from "next";
import  React from "react";



import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Nav from "@/components/ui/nav";




export const metadata: Metadata = {
  title: "Luxavian",
  description: "Nexus is everything you need to build a modern web application.",
  icons: {
    icon: "/favicon.ico",
  },

}



export default function RootLayout({
   children,
}: {
 
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen w-full overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav/>
   {children}
      
         

          
        </ThemeProvider>
      </body>
    </html>
  );
}
