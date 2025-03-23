import React from "react"
import {
    Bell,
    Clapperboard,
    DollarSign,
    Home,
    Package,
    Package2,
    Theater,
    User,
    Wallet,
  } from "lucide-react"
  
  // import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Link } from "react-router-dom"
  
export default function Sidebar() {
    return(
        <div className="hidden border-r bg-muted/40 md:block">
        {/* <div className="hidden bg-muted/40 md:block bg-gra-400"> */}

        <div className="flex h-full max-h-screen   flex-col gap-2 ">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-blue-500">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">CMS One Cinema</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/admin"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all text- hover:text-primary hover:bg-blue-300"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
{/* GENERE */}
              <Link
                to="/admin/genres"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-300"
              >
                <Package className="h-4 w-4" />
                Genre{" "}
              </Link>
{/* THEATER */}
              <Link
                to="/admin/theaters"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-300"
              >
                <Theater className="h-4 w-4" />
                Theaters{" "}
              </Link>
{/* Movies */}
              <Link
                to="/admin/movies"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-300"
              >
                <Clapperboard className="h-4 w-4" />
                Movies{" "}
              </Link>

              <Link
                to="/admin/customers"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-blue-300"
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
          </div>

        </div>
      </div>
    
    )
}