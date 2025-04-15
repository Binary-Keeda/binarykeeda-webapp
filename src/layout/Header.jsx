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

import { Menu } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link as NavLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scroll, setScroll] = useState(false)
  const { user } = useSelector(s => s.auth)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    })
  }, [])
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    <>
      <header id='home' className='relative h-[73px] w-full'>
        <nav
          className={`fixed w-full flex justify-between 
           shadow-lg px-3 md:px-5 pl-1
           transition-all duration-200  items-center h-[73px] top-0  bg-white z-40`}
        >
          <div className='flex items-center gap-6'>
            <ScrollLink to='home' smooth className='cursor-pointer'>
            <img src='https://res.cloudinary.com/drzyrq7d5/image/upload/v1744699895/binarykeeda/zipjouvv161c11xywrwk.jpg' className='h-14' alt='' />

            </ScrollLink>
          </div>
          <div className='lg:flex hidden'>
            <div className='flex gap-2'>
              <div className='flex items-center gap-6 mr-5'>
                <ScrollLink
                  to={'about'}
                  smooth
                  duration={1000}
                  className='cursor-pointer nav-link'
                >
                  About
                </ScrollLink>
                <ScrollLink
                  to={'features'}
                  smooth
                  offset={-60}
                  duration={1000}
                  className='cursor-pointer nav-link'
                >
                  Features
                </ScrollLink>
                <ScrollLink
                  to={'content'}
                  smooth
                  offset={-60}
                  duration={1000}
                  className='cursor-pointer nav-link'
                >
                  Quiz Portal
                </ScrollLink>
                <ScrollLink
                  to={'contact'}
                  smooth
                  duration={1000}
                  className='cursor-pointer nav-link'
                >
                  Contact Us
                </ScrollLink>
                {/* <Link>Practice</Link> */}
              </div>

              {!user ? (
                <>
                  <NavLink
                    to='/login'
                    class='flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-800 hover:border-slate-800 hover:text-slate-700 hover:bg-white focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  >
                    Login
                    {/* <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      class='w-4 h-4 ml-1.5'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                        clip-rule='evenodd'
                      />
                    </svg> */}
                  </NavLink>
                  <NavLink
                    to='/register'
                    class='flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white bg-[#0149ad] hover:border-slate-800 hover:text-slate-700 hover:bg-white focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  >
                    Sign Up
                    {/* <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      class='w-4 h-4 ml-1.5'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                        clip-rule='evenodd'
                      />
                    </svg> */}
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to='/user'
                    class='flex items-center rounded-[28px]  border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-800 hover:border-slate-800 hover:text-slate-700 hover:bg-white focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  >
                    Continue to Dashboard
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      class='w-4 h-4 ml-1.5'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                        clip-rule='evenodd'
                      />
                    </svg>
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className='lg:hidden flex'>
            <IconButton onClick={toggleMenu}>
              <Menu />
            </IconButton>
          </div>
        </nav>

        {/* Small Screen Nab */}
        <span
          onClick={toggleMenu}
          className={`${menuOpen ? '' : 'hidden '
            } fixed top-0 left-0 z-40 h-[100vh] w-[100vw] bg-black bg-opacity-60`}
        ></span>
        <header
          className={` ${menuOpen ? 'translate-x-0' : '-translate-x-full'
            }   fixed bg-white duration-300 transition-all z-50 h-screen left-0 top-0 w-[250px]`}
        >
          <div className='w-full absolute flex justify-end p-2'>
            {/* <IconButton onClick={toggleMenu}>
              <Close />
            </IconButton> */}
          </div>
          <ul className='px-5 py-7 flex justify-between h-full flex-col'>
            <div className='flex flex-col gap-2 '>
              <img className='w-[140px]' src='/assets/logo.jpg' alt='' />
              <ScrollLink
                onClick={() => {
                  setMenuOpen(false)
                }}
                smooth
                duration={500}
                to='about'
                className='text-gray-800 mt-6 text-lg bg-gray-50 p-3 rounded-lg cursor-pointer '
              >
                About
              </ScrollLink>
              <ScrollLink
                onClick={() => {
                  setMenuOpen(false)
                }}
                smooth
                duration={500}
                to='features'
                className='text-gray-800 text-lg bg-gray-50 p-3 rounded-lg cursor-pointer '
              >
                Features
              </ScrollLink>
              <ScrollLink
                onClick={() => {
                  setMenuOpen(false)
                }}
                smooth
                duration={500}
                to='content'
                className='text-gray-800 text-lg bg-gray-50 p-3 rounded-lg cursor-pointer '
              >
                Quiz Portal
              </ScrollLink>
              <ScrollLink
                onClick={() => {
                  setMenuOpen(false)
                }}
                smooth
                duration={500}
                to='contact'
                className='text-gray-800 text-lg bg-gray-50 p-3 rounded-lg cursor-pointer '
              >
                Contact
              </ScrollLink>
              <hr className='my-5' />
              {user ? <>
                <NavLink
                  to={'/user'}
                  className='hover:bg-gray-50 hover:text-gray-800 hover:border-2 border-2 border-sky-700 transition-all duration-150 text-lg bg-gray-50 p-3 rounded-lg cursor-pointer bg-sky-700 text-gray-50' >
                  Dashboard
                </NavLink>
              </> : <><NavLink
                to={'/login'}
                className='hover:bg-gray-50 hover:text-gray-800 hover:border-2 border-2 border-sky-700 transition-all duration-150 text-lg bg-gray-50 p-3 rounded-lg cursor-pointer bg-sky-700 text-gray-50' >
                Login
              </NavLink>
                <NavLink
                  to={'/register'}
                  className='hover:bg-gray-50 hover:text-gray-800 hover:border-2 border-2 border-sky-700 transition-all duration-150 text-lg bg-gray-50 p-3 rounded-lg cursor-pointer bg-sky-700 text-gray-50' >
                  Signup
                </NavLink></>}
            </div>

          </ul>
        </header>
      </header>
    </>
  )
}
