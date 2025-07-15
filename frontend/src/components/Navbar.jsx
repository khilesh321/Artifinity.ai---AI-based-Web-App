import { ArrowRight } from 'lucide-react'
import { assets } from '../assets'
import {SignIn, useClerk, UserButton, useUser} from '@clerk/clerk-react'

function Navbar() {
  const { user } = useUser()
  const {openSignIn} = useClerk()


  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      <div id='logo' className='flex items-center'>
        <img src={assets.logo} className='w-8 sm:w-9' alt="logo" />
        <span className='inline-block ml-1 text-xl md:text-2xl font-semibold text-primary'>Artifinity.ai</span>
      </div>

      {user ? (
        <div style={{ transform: 'scale(1.2)', transformOrigin: 'right center' }}>
          <UserButton />
        </div>
      ) : (
        <button onClick={openSignIn} className='flex items-center gap-2 px-10 py-2.5 text-sm text-white bg-primary rounded-full cursor-pointer'>Get started <ArrowRight className='w-4 h-4' /></button>
      )}
    </div>
  )
}

export default Navbar