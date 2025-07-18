import { PricingTable } from '@clerk/clerk-react'
import { motion } from 'framer-motion'

function Plan() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto z-20 my-30"
    >
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">Choose Your Plan</h2>
        <p className="text-gray-500 max-w-lg mx-auto">Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
      </div>

      <div className='mt-14 max-sm:mx-8'>
        <PricingTable /> 
      </div>
    </motion.div>
  )
}

export default Plan