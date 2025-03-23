import React, { useState } from "react";

import {
    CircleUser,
    Clapperboard,
    DollarSign,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Theater,
    User,
    Users,
    Wallet,
  } from "lucide-react"
  
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
  import { Link } from "react-router-dom"
import secureLocalStorage from "react-secure-storage";
import { SESSION_KEY } from "@/lib/utils";

export default function Header() {
// fungsi logout, menghapus session_key pada localStorage, kemudian akan redirect ke login page
  const logout = () => {
    secureLocalStorage.removeItem(SESSION_KEY)
    window.location.replace("/admin/login")
  }

   // State untuk mengontrol visibilitas sidebar
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   // Fungsi untuk menutup sidebar
   const closeSidebar = () => setIsSidebarOpen(false);

    return(
        // <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <header className="flex h-14 items-center gap-4 border-b bg-blue-500 px-4 lg:h-[60px] lg:px-6">

      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                to="/admin"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                {/* <span className="sr-only">Acme Inc</span> */}
                <span className="">CMS One Cinema</span>
              </Link>
              
              <Link
                to="/admin"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all text- hover:text-primary hover:bg-blue-300"
                onClick={closeSidebar}
              >
                <Home className="h-4 w-4" />
                Dashboard
               </Link>

              <Link
               to="/admin/genres"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-300"
                onClick={closeSidebar}
              >
                <Package className="h-4 w-4" />
                 Genre{" "}
              </Link>
              
              <Link
                to="/admin/theaters"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-300"
                onClick={closeSidebar}
              >
                <Theater className="h-4 w-4" />
                Theaters{" "}
              </Link>

              <Link
                to="/admin/movies"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-300" 
                onClick={closeSidebar}
              >
                <Clapperboard className="h-4 w-4" />
                Movies{" "}
              </Link>

              <Link
                to="/admin/customers"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-300"
                onClick={closeSidebar}
              >
                <User className="h-4 w-4" />
                Customers{" "}
              </Link>
              
              <Link
                to="/admin/transactions"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-300"
              >
                <DollarSign className="h-4 w-4" />
                Transactions{" "}
              </Link>

              <Link
                to="/admin/wallet-transactions"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-300"
              >
                <Wallet className="h-4 w-4" />
                Wallet Transactions{" "}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    )
}