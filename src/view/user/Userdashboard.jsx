import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Outlet } from 'react-router-dom'
import Header from './dashboard/Header'
import Drawer from './dashboard/Sidebar'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
const UserDashboardLayout = ({ children }) => {
  const CompleteProfile = React.lazy(() => import('./dashboard/CompleteProfile'))

  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()
  const { user } = useSelector(s => s.auth)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const toggleMode = () => {
    localStorage.setItem('mode', darkMode ? 'light' : 'dark')
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

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleLogout = async () => await customSignOut()

  return (
    <>
      <Helmet>
        <title>{user?.name || "User"} - Dashboard</title>
      </Helmet>
      {user && !user?.isVerified && <Suspense fallback={<>Loader...</>}> <CompleteProfile /></Suspense>}
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
      <main
        className={` ${
          menuOpen ? 'pl-[230px] ' : 'pl-5 lg:pl-[110px]'
        }  pr-5 py-5  bg-secondary min-h-[calc(100vh-59px)] text-gray-800 transition-all`}
      >
        {children || <Outlet />}
      </main>
    </>
  )
}

export default UserDashboardLayout
