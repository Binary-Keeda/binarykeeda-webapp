import { Home as HomeIcon } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { BASE_URL } from '../lib/config'
import { GoogleLogo } from '../components/Logo/GoogleLogo'
const inputClass =
  'bg-[#2f3134] text-xs ease-linear duration-100 hover:bg-[#3d4043] rounded-md w-[310px] text-gray-300 border-[rgb(214 218 227 / 4%)] p-4 font-medium '

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false)
  const LoginHandler = async () => {
    try{

    }catch{

    }
  }
  return (
    <>
      <section className='fixed text-gray-300 flex justify-center items-center flex-col top-0 z-30 bg-[#1d1e20] h-screen w-screen'>
        <a href='/'>
          <IconButton
            color='inherit'
            sx={{
              position: 'absolute',
              top: 10,
              left: 10
            }}
          >
            <HomeIcon />
          </IconButton>
        </a>
        <div className='mb-10 -mt-10 h-[140px] overflow-hidden w-[360px] relative '>
          <img
            className='h-[240px] drop-shadow-md z-50 object-contain object-center top-0  l-0 absolute w-full rounded-md'
            src='/assets/logo/8-removebg-preview.png'
            alt=''
          />
        </div>
        <div>
          <a
            href={`${BASE_URL}/auth/google/`}
            className={`${inputClass} flex text-xs gap-3 items-center mt-3 mb-2 justify-center `}
          >
            <GoogleLogo />
            Continue with Google
          </a>
        </div>
        <div className='flex text-gray-300 items-center mt-2 gap-1'>
          <hr className='text-gray-300 bg-gray-300 w-[120px]' />
          or
          <hr className='text-gray-300 bg-gray-300 w-[120px]' />
        </div>
        <form className='max-w-screen-sm  flex flex-col gap-3 items-center p-4 m-2 w-screen transition-all duration-500 '>
          <input
            placeholder='Enter Email'
            type='text'
            className={`${inputClass}`}
            name=''
            id=''
          />
          <div className='relative' >
            <input
              placeholder='Enter Password'
              type={`${!showPass ? 'password' : 'text'}`}
              className={`${inputClass}`}
              name=''
              id=''
            />

            <input className="absolute top-[35%] right-3" checked={showPass} onChange={(e)=>{setShowPass(e.target.checked)}} id="showpassword"  type="checkbox" />

          </div>
          <a href=''
            className='hover:underline text-gray-300 w-[310px] text-xs flex justify-start items-center'
          >
            Forget password ?
          </a>
          <button className='bg-[#2f3134] flex justify-center ease-linear duration-100 hover:bg-[#3d4043] rounded-md w-[310px] text-gray-300 border-[rgb(214 218 227 / 4%)] p-4 font-medium text-xs'>
            {/* Submit */}
          </button>
          <span className='text-xs text-gray-300' href='#'>
            New user?{' '}
            <a href='/register' className='underline'>
              Create Account
            </a>
          </span>
        </form>
        <a
          className='text-center text-gray-400 fixed bottom-10 px-5 text-xs hover:underline'
          href=''
        >
          By continuing, you agree to Pragyanm Terms of Service and Privacy
          Policy.
        </a>
      </section>
    </>
  )
}

export default LoginPage

