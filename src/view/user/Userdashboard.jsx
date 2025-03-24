import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
// import { customSignOut } from '../../utils/libs/logout'
import { useSelector } from 'react-redux'
import Header from './dashboard/Header'
import CompleteProfile from './dashboard/CompleteProfile'
import Drawer from './dashboard/Sidebar'
import { DARK_LIGHT } from './utils/colors'

const UserDashboard = (WrrapedComponent) => {

  return () => {
    const customSignOut = () => {

    }
    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => setMenuOpen(!menuOpen)
    const [darkMode, setDarkMode] = useState(false)
    const toggleMode = () => {
      localStorage.setItem('mode', `${!darkMode ? 'dark' : 'light'}`)
      setDarkMode(!darkMode)
    }
    useEffect(() => {
      const mode = localStorage.getItem('mode')
      if (mode === 'dark') {
        document.getElementById('root').classList.add('dark')
        setDarkMode(true)
      } else {
        document.getElementById('root').classList.remove('dark')
        setDarkMode(false)
      }
    }, [darkMode])
    const { user } = useSelector(s => s.auth);

    const handleLogout = async () => await customSignOut()
    const location = useLocation()

    useEffect(() => {
      setMenuOpen(false)
    }, [location])
    return <>
      {/* { (!user?.program || !user?.university || !user?.yearOfGraduation) && <CompleteProfile />} */}
      {!user.isVerified && <CompleteProfile/>}
      <Header
        toggleMode={toggleMode}
        darkMode={darkMode}
        user={user}
        handleLogout={handleLogout}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <Drawer
        setShowMenu={setMenuOpen}
        user={user}
        showMenu={menuOpen}
        toggleMenu={toggleMenu}
      />
      <main className={`pr-5 pl-5 md:pl-[80px] py-5 dark:bg-[${DARK_LIGHT}] bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 transition-all`}>
        {/* {children || <Outlet />} */}
        {<WrrapedComponent/>}
      </main>
    </>
  }

}


export default UserDashboard;