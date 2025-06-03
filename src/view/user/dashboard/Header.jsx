import {
  DarkMode,
  Home,
  LightMode,
  NoteAdd,
  PowerSettingsNew,
  ShortText
} from '@mui/icons-material'
import { Avatar, Divider, Icon, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../../redux/reducers/UserThunks'
import Cookies from 'js-cookie'
import { DARK_STRONG } from '../utils/colors'
import AccountMenu from '../utils/HeaderMenu'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { LOGO } from '../../../lib/config'
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
        <header className='relative h-[59px]'>
          <nav
            className={`fixed shadow-sm bg-primary  dark:bg-support dark:text-gray-50 bg-blend-difference text-gray-600  h-[59px] items-center pr-5 pl-2  flex justify-between z-40 w-full top-0 dark:bg-[${DARK_STRONG}] `}
          >
            <div className='lg:hidden'>
              <ShortText onClick={() => setMenuOpen(!menuOpen)} />
            </div>
            <div className='flex gap-1 items-center'>
              <Link to='/'>
                {' '}
                {/* Add this wrapper */}
                <img
                  src={LOGO}
                  className='h-10'
                  alt='Logo'
                />
              </Link>
            </div>
            <div className='flex items-center gap-3'>
              <Link className='text-[#757575] dark:text-white' to={'/'}>
                <IconButton color='inherit'>
                  <Home />
                </IconButton>
              </Link>
              <IconButton
                color={darkMode ? '#fff' : '#000'}
                onClick={toggleMode}
              >
                {darkMode ? (
                  <LightMode sx={{ color: '#f1f1f1' }} />
                ) : (
                  <DarkMode color='inherit' />
                )}
              </IconButton>
              {user ? (
                <>
                  <AccountMenu handleLogout={handleLogout} />
                </>
              ) : (
               <div className="flex items-center space-x-4">
  <button className="text-sm font-medium hover:underline">Login</button>
  
  <Divider
    orientation="vertical"
    flexItem
    sx={{ bgcolor: 'grey.500' }}
  />

  <button className="text-sm font-medium hover:underline">Signup</button>
</div>
              )}
            </div>
          </nav>
        </header>
      </>
    )
  }
)
export default Header
