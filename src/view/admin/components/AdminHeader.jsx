import React from 'react'
import { LOGO } from '../../../lib/config'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../../redux/reducers/UserThunks'
import Cookies from 'js-cookie'
export default function AdminHeader () {
  const dispatch = useDispatch()
  const handleLogout = () => {
    try {
      console.log('Btn clicked')
      dispatch(logOutUser(Cookies.get('token')))
    } catch (error) {
      console.log(error, 'logout')
    }
  }
  return (
    <header className='p-3  h-[70px] relative'>
      <nav className='fixed flex justify-between shadow-md z-40 items-center bg-white px-3 left-0 top-0 w-full h-[70px]'>
        <img className='h-10' src={LOGO} alt='' />
        <Button
          onClick={handleLogout}
          variant='contained'
          sx={{
            fontSize: 10
          }}
        >
          Logout
        </Button>
      </nav>
    </header>
  )
}
