import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react"
import { dummyCreationData } from "../assets";
import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";

function Dashboard() {
  const [creations, setCreations] = useState([]);
  
  async function getDashboardData(){
    setCreations(dummyCreationData);
  }

  useEffect(() => {
    getDashboardData();
  }, []) 

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="h-full overscroll-y p-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
      >
        <div className="flex justify-start gap-4 flex-wrap">
          {/* Total Creations Card */}
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0 2px 8px rgba(34,107,255,0.10)" }}
            className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200"
          >
            <div className="text-slate-600">
              <p className="text-sm">Total Creations</p>
              <h2 className="text-xl font-semibold">{creations.length}</h2>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
              <Sparkles className="w-5 text-white" />
            </div>
          </motion.div>
          {/* Active Plan Card */}
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0 2px 8px rgba(255,97,197,0.10)" }}
            className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200"
          >
            <div className="text-slate-600">
              <p className="text-sm">Active Plan</p>
              <h2 className="text-xl font-semibold">
                <Protect plan='premium' fallback='Free'>Premium</Protect>
              </h2>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
              <Gem className="w-5 text-white" />
            </div>
          </motion.div>
        </div>

        <div className="space-y-3">
          <p className="mt-6 mb-4">Recent Creations</p>
          {creations.map((item, idx) => <CreationItem key={idx} item={item} />)}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Dashboard