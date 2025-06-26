import React from "react";
import Nav from "@/components/ui/nav";
export default function Layout({children,}: {
    children: React.ReactNode;
}){
return (
    <div>
        <Nav/>
        {children}
            </div>
)
}