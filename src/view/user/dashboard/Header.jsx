import {
  DarkMode,
  LightMode,
  NoteAdd,
  PowerSettingsNew,
  ShortText
} from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../../redux/reducers/UserThunks'
import Cookies from 'js-cookie'
import { DARK_STRONG } from '../utils/colors'
import AccountMenu from '../utils/HeaderMenu'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
// import { handleLogout } from "../../../utils/libs/logout";

const Header = React.memo(
  ({ user, menuOpen, setMenuOpen, darkMode, toggleMode }) => {
    useEffect(() => {
      // console.log("Header Mounted");
    }, [])
    // const handleLogout = () => { }
    const dispacth = useDispatch()
    const handleLogout = () => {
      try {
        console.log('Btn clicked')
        dispacth(logOutUser(Cookies.get('token')))
      } catch (error) {
        console.log(error, 'logout')
      }
    }
    return (
      <>
        <header className='relative h-[70px]'>
          <nav
            className={`fixed shadow-sm bg-primary dark:bg-primary dark:text-gray-50 bg-blend-difference text-gray-600  h-[70px] items-center pr-5 pl-2  flex justify-between z-40 w-full top-0 dark:bg-[${DARK_STRONG}] `}
          >
            <div className='lg:hidden'>
              <ShortText onClick={() => setMenuOpen(!menuOpen)} />
            </div>
            <div className='flex gap-1 items-center'>
              {/* <video
              src='/assets/techease.mp4'
              autoPlay
              loop
              playsInline
              muted
              className='h-[60px] rounded-[20px]'
            ></video> */}
              <Link to='/'>
                {' '}
                {/* Add this wrapper */}
                <img
                  src='https://res.cloudinary.com/drzyrq7d5/image/upload/v1744699895/binarykeeda/zipjouvv161c11xywrwk.jpg'
                  className='h-10'
                  alt='Logo'
                />
              </Link>
            </div>
            <div className='flex items-center gap-3'>
              <IconButton color={darkMode ? "#fff" :"#000"} onClick={toggleMode}>{darkMode ? <LightMode sx={{color:"#f1f1f1"}} /> : <DarkMode color='inherit' />}</IconButton>
              <AccountMenu handleLogout={handleLogout} />
            </div>
          </nav>
        </header>
      </>
    )
  }
)
export default Header
