import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
// import { customSignOut } from '../../utils/libs/logout'
import { useSelector } from 'react-redux'
import Header from './dashboard/Header'
import CompleteProfile from './dashboard/CompleteProfile'
import Drawer from './dashboard/Sidebar'

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
      <main className='pr-5 pl-5 md:pl-[70px] py-5 dark:bg-[#313234] bg-gray-50 min-h-[calc(100vh-75px)] text-gray-800 transition-all'>
        {/* {children || <Outlet />} */}
        {<WrrapedComponent/>}
      </main>
    </>
  }

}


export default UserDashboard;