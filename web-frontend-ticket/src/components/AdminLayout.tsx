import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/sonner";

import "../shadcn.css"

export default function AdminLayout() {
    return(
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        {/* SIDEBAR */}
            <Sidebar />
              <div className="flex flex-col">
                {/* HEADER */}
               <Header/>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                  <Outlet/>
                </main>
              </div>
              <Toaster/>
            </div>
    )
}