import { Outlet, useNavigate } from "react-router-dom"
import { assets } from "../assets";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Layout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav>
        <img src={assets.logo} alt="logo" onClick={() => navigate("/")} />
        {
          sidebarOpen ? <X className="w-6 h-6 to-gray-600 sm:hidden" />
          : <Menu className="w-6 h-6 to-gray-600 sm:hidden" />
        }
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout