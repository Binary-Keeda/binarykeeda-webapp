import { Fab, IconButton } from '@mui/material'
import { GoogleLogo } from '../components/Logo/GoogleLogo'
import { BASE_URL } from '../lib/config'
import { Home as HomeIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Loaader from '../layout/Loader'
// import { loadEnvFile } from 'process'
const inputClass =
  'bg-[#2f3134] text-xs ease-linear duration-100 hover:bg-[#3d4043] rounded-md w-[310px] text-gray-300 border-[rgb(214 218 227 / 4%)] p-4 font-medium '

const Register = () => {
  const [email,setEmail] = useState();
  const [message, setMessage] = useState();
  const [loading,setLoading] = useState(false);
  const changeHandler = (e) => {
    setEmail(e.target.value);
  }
  const SignUpHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup`,{email:email.toLowerCase()});
      // alert(JSON.stringify(res.data))
      setMessage(res.data.message)
    } catch (e){
      
      setMessage(e.response.data.message)
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
      <section className='relative text-[#f1f1f1] flex justify-center items-center flex-col top-0 z-30 bg-[#1d1e20] h-screen w-screen'>
        <Link to='/'>
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
        </Link>
        <div className='mb-10  overflow-hidden  relative '>
          <img
            src='/assets/logo/A37A874D-8E55-4BCC-BDF4-EBFA65B2F790_1_201_a.jpeg'
            className='h-14 rounded-md'
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
        <form className='max-w-screen-sm flex flex-col gap-3 items-center p-4 m-2 w-screen transition-all duration-500 '>
          <input
            required
            placeholder='Enter Email'
            type='text'
            className={`${inputClass} backdrop-blur-xl`}
            name='email'
            onChange={changeHandler}
            id=''
          />
          <p className='text-gray-400 text-start w-[306px] text-xs' >{message}</p>
          <button
            onClick={SignUpHandler}
             type='submit'
            className='bg-[#2f3134] flex justify-center ease-linear duration-100 hover:bg-[#3d4043] rounded-md w-[310px] text-gray-300 border-[rgb(214 218 227 / 4%)] p-4 font-medium text-xs'
          >
            {loading ? <div className='border-2 border-white border-t-transparent h-5 w-5 rounded-full animate-spin' ></div> :"Submit"}
          </button>
          <span className='text-xs text-gray-300' href='#'>
            Already a user?{' '}
            <Link to='/login' className='underline'>
              Login
            </Link>
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

export default Register
