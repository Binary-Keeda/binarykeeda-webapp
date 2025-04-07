import {
  Home as HomeIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { BASE_URL } from '../lib/config'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/reducers/UserThunks'

const inputClass =
  'bg-[#2f3134] text-xs ease-linear duration-100 hover:bg-[#3d4043] rounded-md w-[310px] text-gray-300 border-[rgb(214 218 227 / 4%)] p-4 font-medium '

const VerifyPage = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const { id } = useParams()

  const VerifyToken = async e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords don't match 😬")
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(
        `${BASE_URL}/api/auth/verify`,
        { password },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${decodeURIComponent(id)}`
          }
        }
      )
      setMessage(res.data.message)
      setError('')
      navigate('/login');
    } catch (err) {
      console.error(err)
      setError('Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='fixed text-gray-300 flex justify-center items-center flex-col top-0 z-30 bg-[#1d1e20] h-screen w-screen'>
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

      <div className='mb-10 overflow-hidden relative'>
        <img
          src='/assets/logo/A37A874D-8E55-4BCC-BDF4-EBFA65B2F790_1_201_a.jpeg'
          className='h-14 rounded-md'
          alt='Logo'
        />
      </div>

      <form
        onSubmit={VerifyToken}
        className='flex flex-col gap-3 items-center p-4 m-2 w-[310px] transition-all duration-500'
      >
        <input
          placeholder='Enter Password'
          type={showPass ? 'text' : 'password'}
          className={inputClass}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <input
          placeholder='Confirm Password'
          type={showPass ? 'text' : 'password'}
          className={inputClass}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        <label className='w-[310px] ml-1 text-xs gap-2 text-start flex justify-start'>
          <input
            checked={showPass}
            onChange={e => setShowPass(e.target.checked)}
            id='showpassword'
            type='checkbox'
          />
          Show Password
        </label>

        {error && (
          <p className='text-red-400 text-start w-[306px] text-xs'>
            {error}
          </p>
        )}

        {message && (
          <p className='text-green-400 text-start w-[306px] text-xs'>
            {message}
            <Link
              to='/login'
              className='ml-1 text-blue-400 hover:underline'
            >
              Go to login
            </Link>
          </p>
        )}

        <button
          type='submit'
          className='bg-[#2f3134] flex justify-center items-center ease-linear duration-100 hover:bg-[#3d4043] rounded-md w-[310px] text-gray-300 border-[rgb(214 218 227 / 4%)] p-4 font-medium text-xs'
        >
          {loading ? (
            <div className='border-2 border-white border-t-transparent h-5 w-5 rounded-full animate-spin'></div>
          ) : (
            'Submit'
          )}
        </button>
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

export default VerifyPage
