import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { dummyPublishedCreationData } from "../assets";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Community() {
  const [creations, setCreations] = useState([]);
  const {user} = useUser();
  const [loading, setLoading] = useState(true);
  const {getToken} = useAuth();

  async function fetchCreations() {
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCreations(data.creations || dummyPublishedCreationData);
      } else {
        toast.error(data.message || "Failed to fetch creations");
      }
    } catch (e) {
      toast.error(e.message || "An error occurred while fetching creations");
    } finally {
      setLoading(false);
    }
  }

  const imageLikeToggle = async (creationId) => {
    try {
      const {data} = await axios.post("/api/user/toggle-like-creation", {creationId}, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });

      if(data.success) {
        toast.success(data.message || "Creation liked/unliked successfully");
        await fetchCreations();
      } else {
        toast.error(data.message || "Failed to like/unlike creation");
      }
    } catch (e) {
      toast.error(e.message || "An error occurred while liking/unliking creation");
    }
  }

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  // Framer Motion staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 18 } },
    exit: { opacity: 0, y: 40 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate="show"
        exit="exit"
        variants={containerVariants}
        className="flex flex-1 flex-col gap-4 p-6 h-full"
      >
        <h1 className="text-xl font-semibold">Creations</h1>
        <motion.div
          className="bg-white h-full rounded-xl overflow-y-scroll"
          variants={containerVariants}
        >
          {loading ? (
            <div className="flex justify-center items-center h-40 text-gray-400">
              Loading...
            </div>
          ) : (creations && creations.length > 0 ? (
            creations.map((creation, index) => (
              <motion.div
                key={index}
                className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
                whileHover={{ scale: 1.02, boxShadow: "0 2px 8px rgba(34,107,255,0.10)" }}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <img src={creation.content} alt="image" className="w-full h-full object-cover rounded-lg" />

                <div className="absolute bottom-0 top-0 left-3 right-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
                  <p className="text-sm hidden group-hover:block">{creation.prompt}</p>
                  <div className="flex gap-1 items-center">
                    <p>{(creation.likes || []).length}</p>
                    <Heart onClick={() => imageLikeToggle(creation.id)} className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${(creation.likes || []).includes(user?.id) ? 'fill-red-500 text-red-600' : 'text-white'}`} />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-40 text-gray-400">
              <p>No creations found.</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Community