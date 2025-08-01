import { Protect, useClerk, useUser } from "@clerk/clerk-react"
import { SidebarNavItems } from "../assets";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const {user} = useUser();
  const {signOut, openUserProfile} = useClerk();
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Sidebar always visible on md+ screens, toggle on mobile
  return (
    <AnimatePresence>
      {(sidebarOpen || isDesktopOrTablet) && (
        <motion.div
          initial={{ x: isMobile ? "-100%" : 0 }}
          animate={{ x: 0 }}
          exit={{ x: isMobile ? "-100%" : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center
            ${isMobile ? "fixed top-14 bottom-0 z-40 shadow-lg" : ""}
            ${isDesktopOrTablet ? "fixed top-14 left-0 h-[calc(100vh-56px)] z-30 shadow-none" : ""}`}
        >
          {isMobile && (
            <button
              className="absolute right-4 top-4 z-50"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
          <div className="my-7 w-full">
            <img onClick={openUserProfile} src={user.imageUrl} alt="user-profile" className="w-13 h-13 rounded-full mx-auto cursor-pointer"/>
            <h1 className="text-center mt-1">{user.fullName}</h1>
            <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
              {SidebarNavItems.map(({to, label, Icon}) => (
                <motion.div
                  whileHover={{ scale: 1.04, backgroundColor: "#f3f4f6" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ borderRadius: "0.5rem" }}
                  key={to}
                >
                  <NavLink
                    to={to}
                    end={to === '/ai'}
                    onClick={() => setSidebarOpen(false)}
                    className={({isActive}) => `px-3.5 py-2.5 flex items-center gap-3 rounded transition-colors duration-200 ${isActive && 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'}`}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`w-4 h-4 ${isActive && 'text-white'}`} />
                        <span>{label}</span>
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
              <div onClick={openUserProfile} className="flex gap-2 items-center cursor-pointer">
                <img src={user.imageUrl} alt="user profile" className="w-8 h-8 rounded-full" />
                <div>
                  <h1 className="text-sm font-medium">{user.fullName}</h1>
                  <p className="text-xs text-gray-500">
                    <Protect plan={"premium"} >Premium</Protect> Plan
                  </p>
                </div>
              </div>
              <LogOut onClick={signOut} className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"/>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Sidebar