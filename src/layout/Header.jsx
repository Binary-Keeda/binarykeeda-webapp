// import React from 'react';
// import { Avatar, IconButton } from '@mui/material'
// import { useDispatch, useSelector } from 'react-redux'
// import { CustomButton } from '../utilities/CustomButton';
// import { Logout } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { logOutUser } from '../redux/reducers/UserThunks';
// import Cookies from 'js-cookie';
// const Header = () => {
//     const { user } = useSelector(s => s.auth)
//     const dispacth = useDispatch();
//     const handleLogout = () => {
//         try {
//             console.log("Btn clicked")
//             dispacth(logOutUser(Cookies.get('token')));
//         } catch (error) {
//             console.log(error, "logout");
//         }
//     };
//     return (
//         <>
//             <header className='h-[65px] z-40  w-full relative'>
//                 <nav className='border-b-[1px] z-40 bg-white h-[65px] items-center pl-3 pr-5 top-0 w-full relative flex justify-between'>
//                     <div className='flex items-center gap-7'>
//                         <img className='h-12' src="/assets/logo/A37A874D-8E55-4BCC-BDF4-EBFA65B2F790_1_201_a.jpeg" alt="" />
//                         <a id='w' onClick={(e) => { e.preventDefault(); alert(e.target.id) }} className='text-sm hover:underline' href="">About</a>
//                         <a className='text-sm hover:underline ml-2' href="">Learning</a>
//                         <a className='text-sm hover:underline' href="">Mentorship</a>
//                         <a className='text-sm hover:underline' href="">Test Series</a>
//                         <a className='text-sm hover:underline' href="">Connect</a>
//                     </div>
//                     <div>
//                         {user ?
//                             <div className='flex gap-1 items-center'>
//                                 <Link className='mr-2 text-xs' to={`/${user.role}`}>Dashbord</Link>
//                                 <Avatar src={user.avata || user.image} />
//                                 <IconButton onClick={handleLogout}>
//                                     <Logout className='cursor-pointer' />
//                                 </IconButton>
//                             </div> :
//                             <div className='flex  h-auto items-center gap-3'>
//                                 {/* <a className="flex items-center w-[100px] text-gray-300 justify-center rounded-md hover:bg-[rgba(29,30,32,.9)] transition-all duration-300 p-2 bg-[rgba(29,30,32,1)]"  href="">Login</a>
//                                 <a className="flex items-center w-[100px] text-gray-300 justify-center rounded-md hover:bg-[rgba(29,30,32,.9)] transition-all duration-300 p-2 bg-[rgba(29,30,32,1)]" href="">Sign Up</a> */}
//                                 <a href="/login">Login</a>
//                                 <hr className='w-[1px] h-[17px] bg-[rgba(29,30,32,1)]' />
//                                 <a href="/register">Sign Up</a>
//                             </div>
//                         }
//                     </div>
//                 </nav>

//             </header>
//         </>
//     );
// }

// export default Header;

// import { Menu } from '@mui/icons-material'
// import { IconButton } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Link, Link as NavLink } from 'react-router-dom'
// import { Link as ScrollLink } from 'react-scroll'
// import { ExpandMore, DarkMode , LightMode } from '@mui/icons-material'
// import { LOGO } from '../lib/config'
// export default function Header () {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const { user } = useSelector(s => s.auth)
//   const [practiceOpen, setPracticeOpen] = useState(false)
//   const [studyOpen, setStudyOpen] = useState(false)
//   const [darkMode, setDarkMode] = useState(false)
//   const toggleMode = () => {
//     localStorage.setItem('mode', darkMode ? 'light' : 'dark')
//     setDarkMode(!darkMode)
//   }

//   useEffect(() => {
//     const mode = localStorage.getItem('mode')
//     if (mode === 'dark') {
//       document.getElementById('root').classList.add('dark')
//       setDarkMode(true)
//     } else {
//       document.getElementById('root').classList.remove('dark')
//       setDarkMode(false)
//     }
//   }, [darkMode])
//   useEffect(() => {
//     window.addEventListener('scroll', () => {
//       if (window.scrollY > 1) {
//         setScroll(true)
//       } else {
//         setScroll(false)
//       }
//     })
//   }, [])
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen)
//   }
//   return (
//     <>
//       <header className='relative  bg-primary h-[60px] w-full'>
//         <nav
//           onMouseLeave={() => {
//             setPracticeOpen(false)
//             setStudyOpen(false)
//           }}
//           className='fixed shadow-sm bg-bg-primary dark:bg-support flex items-center px-3 pr-16 justify-between h-[60px] w-full  z-10'
//         >
//           <img src={LOGO} className='h-10' alt='Logo' />
//           <ul className='list-none gap-4 text-sm flex items-center'>
//             <li className='nav-link mr-2 cursor-pointer'>
//               <Link to={'/'}>Home</Link>
//             </li>
//             <li className='nav-link mr-2 cursor-pointer'>
//               <Link to={'/user'}>Dashboard</Link>
//             </li>

//             <li
//               className='nav-link cursor-pointer  flex items-center'
//               onMouseEnter={() => {
//                 setStudyOpen(true), setPracticeOpen(false)
//               }}
//             >
//               Study
//               <ExpandMore
//                 sx={{
//                   fontSize: 20,
//                   transition: 'transform 0.5s ease',
//                   transform: studyOpen ? 'rotate(360deg)' : 'rotate(0deg)'
//                 }}
//               />
//               {studyOpen && (
//                 <ul className='dropdown-header'>
//                   <li className='px-4 py-1 text-pretty   text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
//                     <Link to={'/user/binarykeeda-dsa-sheet'}>DSA Sheet</Link>
//                   </li>
//                   <li className='px-4 py-1 text-pretty   text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
//                     <Link to={'/user/binarykeeda-210-sheet'}>
//                       210 Roadmaps Sheet
//                     </Link>
//                   </li>
//                   <li className='px-4 py-1 text-pretty   text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
//                     <Link to={'/user/binarykeeda-roadmap-sheet'}>Roadmaps</Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             <li
//               className='nav-link mr-2 cursor-pointer  flex items-center'
//               onMouseEnter={() => {
//                 setPracticeOpen(true)
//                 setStudyOpen(false)
//               }}
//             >
//               Practice
//               <ExpandMore
//                 sx={{
//                   fontSize: 20,
//                   transition: 'transform 0.2s ease',
//                   transform: practiceOpen ? 'rotate(180deg)' : 'rotate(0deg)'
//                 }}
//               />
//               {practiceOpen && (
//                 <ul className='dropdown-header'>
//                   <li className='px-4 py-1 text-pretty   text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
//                     <Link to={'/user/test-series'}>Test Series</Link>
//                   </li>
//                   <li className='px-4 py-1 text-pretty   text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
//                     <Link to={'/user/practice'}>Go to quiz section</Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             <li>
//               {' '}
//               <span onClick={toggleMode} className='cursor-pointer'>
//                 {' '}
//                 {darkMode ? (
//                   <LightMode sx={{ fontSize: 21 }} />
//                 ) : (
//                   <DarkMode sx={{ fontSize: 21 }} />
//                 )}
//               </span>
//             </li>
//           </ul>
//         </nav>
//       </header>
//     </>
//   )
// }

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ExpandMore, DarkMode, LightMode, Menu } from '@mui/icons-material'
import Joyride from 'react-joyride'
import { LOGO } from '../lib/config'
import { Divider } from '@mui/material'

export default function Header () {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useSelector(s => s.auth)
  const [practiceOpen, setPracticeOpen] = useState(false)
  const [studyOpen, setStudyOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [runTour, setRunTour] = useState(false)

  // Toggle Dark/Light mode and save in localStorage
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

  // Scroll effect if needed (you can add scroll state if you want)
  useEffect(() => {
    // example scroll listener here if
    const run = localStorage.getItem('run')
    if (run) return
    setRunTour(true)
    localStorage.setItem('run', true)
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Joyride steps for the walkthrough
  const steps = [
    {
      target: '[data-tour="home-link"]',
      content: 'Click here to go to the Home page.'
    },
    {
      target: '[data-tour="dashboard-link"]',
      content: 'This is your Dashboard where you can track your progress.'
    },
    {
      target: '[data-tour="study-menu"]',
      content: 'Hover here to explore study resources and sheets.'
    },
    {
      target: '[data-tour="practice-menu"]',
      content: 'Hover here to practice quizzes and test series.'
    },
    {
      target: '[data-tour="dark-mode-toggle"]',
      content: 'Toggle between Light and Dark mode here.'
    },
    {
      target: '[data-tour="login-link"]',
      content: 'Login using this'
    },
    {
      target: '[data-tour="sign-link"]',
      content: 'Sign in using this'
    },
    
    // {
    //   target:'[data-tour="modal-link"]',
    //   content:"Website Under Maintainance"
    // }
  ]

  return (
    <>
      {/* Joyride component */}
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        styles={{
          options: {
            zIndex: 10000
          }
        }}
        callback={data => {
          if (data.status === 'finished' || data.status === 'skipped') {
            setRunTour(false)
          }
        }}
      />

      <header className='relative bg-primary h-[60px] w-full'>
        <nav
          onMouseLeave={() => {
            setPracticeOpen(false)
            setStudyOpen(false)
          }}
          className='fixed shadow-sm bg-bg-primary dark:bg-support flex items-center px-3 pr-16 justify-between h-[60px] w-full z-10'
        >
          <img src={LOGO} className='h-10' alt='Logo' />

          <ul className='list-none gap-4 text-sm flex items-center'>
            <li className='nav-link mr-2 cursor-pointer' data-tour='home-link'>
              <Link to={'/'}>Home</Link>
            </li>
            {user && (
              <li
                className='nav-link mr-2 cursor-pointer'
                data-tour='dashboard-link'
              >
                <Link to={'/user'}>Dashboard</Link>
              </li>
            )}

            <li
              className='nav-link cursor-pointer flex items-center'
              data-tour='study-menu'
              onMouseEnter={() => {
                setStudyOpen(true)
                setPracticeOpen(false)
              }}
            >
              Study
              <ExpandMore
                sx={{
                  fontSize: 20,
                  transition: 'transform 0.5s ease',
                  transform: studyOpen ? 'rotate(360deg)' : 'rotate(0deg)'
                }}
              />
              {studyOpen && (
                <ul className='dropdown-header'>
                  <li className='px-4 py-1 text-pretty text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
                    <Link to={'/user/binarykeeda-dsa-sheet'}>DSA Sheet</Link>
                  </li>
                  <li className='px-4 py-1 text-pretty text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
                    <Link to={'/user/binarykeeda-210-sheet'}>
                      210 Roadmaps Sheet
                    </Link>
                  </li>
                  <li className='px-4 py-1 text-pretty text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
                    <Link to={'/user/binarykeeda-roadmap-sheet'}>Roadmaps</Link>
                  </li>
                </ul>
              )}
            </li>

            {user && (
              <li
                className='nav-link mr-2 cursor-pointer flex items-center'
                data-tour='practice-menu'
                onMouseEnter={() => {
                  setPracticeOpen(true)
                  setStudyOpen(false)
                }}
              >
                Practice
                <ExpandMore
                  sx={{
                    fontSize: 20,
                    transition: 'transform 0.2s ease',
                    transform: practiceOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
                {practiceOpen && (
                  <ul className='dropdown-header'>
                    <li className='px-4 py-1 text-pretty text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
                      <Link to={'/user/test-series'}>Test Series</Link>
                    </li>
                    <li className='px-4 py-1 text-pretty text-sm hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer'>
                      <Link to={'/user/practice'}>Go to quiz section</Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {!user && (
              <>
                <li
                  className='nav-link cursor-pointer'
                  data-tour='login-link'
                >
                  <Link to={'/login'}>Login</Link>
                </li>
                <Divider flexItem orientation='vertical' sx={{
                  color:'gray'
                }} />
                <li
                  className='nav-link mr-2 cursor-pointer'
                  data-tour='sign-link'
                >
                  <Link to={'/register'}>Register</Link>
                </li>
              </>
            )}

            <li data-tour='dark-mode-toggle'>
              <span onClick={toggleMode} className='cursor-pointer'>
                {darkMode ? (
                  <LightMode sx={{ fontSize: 21 }} />
                ) : (
                  <DarkMode sx={{ fontSize: 21 }} />
                )}
              </span>
            </li>
          </ul>
        </nav>
      </header>

      {/* Button to start the walkthrough */}
    </>
  )
}
