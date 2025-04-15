import {
  Home as HomeIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { BASE_URL } from '../lib/config'
import { GoogleLogo } from '../components/Logo/GoogleLogo'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/reducers/UserThunks'

const inputClass =
  'bg-[#2f3134] text-xs ease-linear duration-100 hover:bg-[#3d4043] rounded-md w-[310px] text-gray-300 border-[rgb(214 218 227 / 4%)] p-4 font-medium '

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch();
  const LoginHandler = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email: email.toLowerCase(), password },
        { withCredentials: true }
      )
      setMessage(res.data.message || 'Login successful ! Please wait while we are naviagting')
      dispatch(getUser());
    } catch (error) {
      setMessage(
        error?.response?.data?.message || 'Login failed. Please try again ❌'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='fixed text-gray-300 flex justify-center items-center flex-col top-0 z-30 bg-[#1d1e20] h-screen w-screen'>
      <Link to='/'>
        <IconButton
          color='inherit'
          sx={{ position: 'absolute', top: 10, left: 10 }}
        >
          <HomeIcon />
        </IconButton>
      </Link>

      <div className='mb-10 overflow-hidden relative'>
        <img
          src='https://res.cloudinary.com/drzyrq7d5/image/upload/v1744699895/binarykeeda/zipjouvv161c11xywrwk.jpg'
          className='h-14 rounded-md'
          alt='Logo'
        />
      </div>

      <div>
        <a
          href={`${BASE_URL}/auth/google/`}
          className={`${inputClass} flex gap-3 items-center mt-3 mb-2 justify-center`}
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

      <form
        onSubmit={LoginHandler}
        className='max-w-screen-sm flex flex-col gap-3 items-center p-4 m-2 w-screen transition-all duration-500'
      >
        <input
          placeholder='Enter Email'
          type='text'
          value={email}
          className={inputClass}
          onChange={e => setEmail(e.target.value)}
        />

        <div className='relative h-[45px]'>
          <input
            placeholder='Enter Password'
            value={password}
            type={showPass ? 'text' : 'password'}
            className={inputClass}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type='button'
            onClick={() => setShowPass(prev => !prev)}
            className='absolute h-full top-[2%] right-3'
          >
            {showPass ? (
              <VisibilityOff sx={{ fontSize: 18 }} />
            ) : (
              <Visibility sx={{ fontSize: 18 }} />
            )}
          </button>
        </div>

        {message && (
          <p className='text-start w-[306px] text-xs text-red-400'>
            {message}
          </p>
        )}

        <Link
          to='/forgot-password'
          className='hover:underline ml-2 text-gray-300 w-[310px] text-xs flex justify-start items-center'
        >
          Forgot password?
        </Link>

        <button
          type='submit'
          disabled={loading}
          className='bg-[#2f3134] flex justify-center items-center ease-linear duration-100 hover:bg-[#3d4043] rounded-md w-[310px] text-gray-300 border-[rgb(214 218 227 / 4%)] p-4 font-medium text-xs'
        >
          {loading ? (
            <div className='border-2 border-white border-t-transparent h-5 w-5 rounded-full animate-spin'></div>
          ) : (
            'Submit'
          )}
        </button>

        <span className='text-xs text-gray-300'>
          New user?{' '}
          <Link to='/register' className='underline'>
            Create Account
          </Link>
        </span>
      </form>

      <Link
        className='text-center text-gray-400 fixed bottom-10 px-5 text-xs hover:underline'
        to=''
      >
        By continuing, you agree to Pragyanm Terms of Service and Privacy
        Policy.
      </Link>
    </section>
  )
}

export default LoginPage
