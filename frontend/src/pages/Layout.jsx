import { Outlet, useNavigate } from "react-router-dom"
import { assets } from "../assets";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useUser, SignIn } from "@clerk/clerk-react";

function Layout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {user} = useUser();
  return user ? (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div id='logo' className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
          <img src={assets.logo} className='w-8 sm:w-9' alt="logo" />
          <span className='inline-block ml-1 text-xl md:text-2xl font-semibold text-primary'>Artifinity.ai</span>
        </div>
        {
          sidebarOpen ? <X onClick={() => setSidebarOpen(false)} className="w-6 h-6 to-gray-600 sm:hidden" />
          : <Menu onClick={() => setSidebarOpen(true)} className="w-6 h-6 to-gray-600 sm:hidden" />
        }
      </nav>
      
      <div className="flex flex-1 w-full h-[calc(100vh-64px)]">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 bg-[#F4F7FB] ml-0 md:ml-60">
          <Outlet />
        </div>
      </div>
      
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  )
}

export default Layout