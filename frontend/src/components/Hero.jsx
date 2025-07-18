import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets";
import MarqueeTrustedBrands from "./MarqueeTrustedBrands";

function Hero() {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 + i * 0.12 }
    })
  };

  const userGroupVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.6 } }
  };

  const marqueeVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 1 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center items-center bg-cover bg-no-repeat min-h-screen gap-2`}
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      <div className="text-center">
        <motion.h1
          variants={textVariants}
          className="text-4xl sm:text-6xl font-bold leading-tight mb-4"
        >
          Create amazing content <br />with <span className="text-primary">Artifinity.ai</span>
        </motion.h1>
        <motion.p
          variants={textVariants}
          className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600"
        >
          Transform your content creation with our suite of premium AI tools. Write articles, generate images, and more with ease.
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm max-sm:text-xs">
        <motion.button
          variants={buttonVariants}
          custom={0}
          onClick={() => navigate('/ai')}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          Explore AI Tools
        </motion.button>
        <motion.button
          variants={buttonVariants}
          custom={1}
          className="border-1 border-black/70 px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          Watch demo
        </motion.button>
      </div>

      <motion.div
        className="flex items-center gap-4 mt-6 mx-auto text-gray-600"
        variants={userGroupVariants}
      >
        <motion.img src={assets.user_group} alt="" className="h-8" />
        Trusted by 10k+ people
      </motion.div>

      <motion.div
        className="absolute bottom-10 w-[85%] mx-auto"
        variants={marqueeVariants}
      >
        <MarqueeTrustedBrands />
      </motion.div>
    </motion.div>
  )
}

export default Hero;