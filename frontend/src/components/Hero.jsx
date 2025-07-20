import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
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

  // Variant for star SVG with delay
  const starTextVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 360,
      transition: {
        type: "tween",
        duration: .5,
        delay: 1.6,
      }
    }
  };

  
  // Star position motion values and spring
  const starX = useMotionValue(0);
  const starY = useMotionValue(0);
  const springX = useSpring(starX, { type: "spring", stiffness: 180, damping: 15 });
  const springY = useSpring(starY, { type: "spring", stiffness: 180, damping: 15 });

  const handleStarMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    starX.set(x * 0.03);
    starY.set(y * 0.03);
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
      onMouseMove={handleStarMouseMove}
      className={`px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center items-center bg-cover bg-no-repeat min-h-screen gap-2`}
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      <motion.div>
        {/* star svg */}
        <motion.svg
          variants={starTextVariants}
          initial="hidden"
          animate="show"
          style={{ x: springX, y: springY }}
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          // i want to reduce the opacity of this color
          fill="#553AEB90"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 17l-5 3 1-6-4-4 6-1 2-5 2 5 6 1-4 4 1 6-5-3z"
          />
        </motion.svg>
      </motion.div>
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
          className="relative overflow-hidden bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          Explore AI Tools
          <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] animate-ping h-20 w-20 rounded-full bg-white/40" 
          />
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