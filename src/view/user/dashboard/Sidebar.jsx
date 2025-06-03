// import { ArrowLeft, Book, Code, Edit, Home, HomeMax, LocationCity, Person, ShortText, Summarize, VolunteerActivism } from '@mui/icons-material';
// import { Avatar } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link, useLocation } from 'react-router-dom';

// const Drawer = React.memo(({ showMenu, setShowMenu }) => {
//     const { user } = useSelector(s => s.auth);
//     const location = useLocation();

//     useEffect(() => {
//         console.log("Sidebar Mounted");
//     }, []);

//     // This useEffect is no longer needed, as the menu visibility is controlled by the parent component (UserDashboardLayout)
//     // Removed: useEffect(() => { setShowMenu(false); }, [location.pathname]);

//     const NAV_ITEMS = [
//         { icon: <HomeMax color='inherit' />, label: 'Dashboard', path: '/user' },
//         { icon: <Book color='inherit' />, label: 'Practice', path: '/user/practice' },
//         {
//             icon: <Code color='inherit' />,
//             label: 'Coding',
//             path: '/user/coding'
//         },
//         {
//             icon: <LocationCity color='inherit' />,
//             label: 'Roadmaps',
//             path: '/user/roadmaps'
//         },
//         {
//             icon: <Edit />,
//             label: 'Test Series',
//             path: '/user/test-series'
//         },
//     ];

//     return (
//         <>
//             <aside
//                 onMouseEnter={() => setShowMenu(true)}  // Adjust menu state on hover
//                 onMouseLeave={() => setShowMenu(false)}  // Adjust menu state on hover
//                 className={`
//                     z-40 h-[calc(100vh-59px)] top-[60px] fixed left-0
//                     bg-primary
//                     transition-all duration-300 ease-in-out
//                     ${showMenu ? 'w-[200px]' : 'w-0 lg:w-[70px]'}
//                     overflow-hidden
//                 `}
//             >
//                 <ul>
//                     {
//                         NAV_ITEMS.map((item, i) => (
//                             <Link
//                                 to={item.path}
//                                 key={i}
//                                 className={`
//                                     flex items-center gap-4
//                                     ${showMenu ? 'justify-start' : 'lg:justify-end'}
//                                     py-4 px-3 mx-3 my-4 rounded-3xl
//                                     bg-support dark:text-white  text-black hover:bg-gray-500 hover:text-gray-100
//                                     transition-all duration-300 ease-in-out
//                                     ${showMenu ? '' : 'hidden lg:flex'}
//                                 `}
//                             >
//                                 <span className="text-end">{item.icon}</span>
//                                 <span className={`text-nowrap ${showMenu ? 'ml-2' : 'hidden'}`}>{item.label}</span>
//                             </Link>
//                         ))
//                     }
//                 </ul>
//             </aside>
//         </>
//     );
// })

// export default Drawer;

import {
  ArrowLeft,
  Assessment,
  AutoStories,
  Book,
  Code,
  Dashboard,
  Edit,
  Home,
  HomeMax,
  LocationCity,
  Person,
  School,
  ShortText,
  Summarize,
  VolunteerActivism
} from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const Drawer = React.memo(({ showMenu, setShowMenu }) => {
  const { user } = useSelector(s => s.auth)
  const location = useLocation()

  useEffect(() => {
    console.log('Sidebar Mounted')
  }, [])

  // This useEffect is no longer needed, as the menu visibility is controlled by the parent component (UserDashboardLayout)
  // Removed: useEffect(() => { setShowMenu(false); }, [location.pathname]);

  const NAV_ITEMS = [
    {
      icon: <Dashboard color='inherit' />,
      label: 'Dashboard',
      path: '/user',
      type: 'private'
    },
    {
      icon: <Book color='inherit' />,
      label: 'Practice',
      path: '/user/practice',
      type: 'private'
    },
    {
      icon: <Code color='inherit' />,
      label: 'Coding',
      path: '/user/binarykeeda-dsa-sheet',
      type: 'public'
    },
    {
        icon:<AutoStories/>,
        label:"BK Sheet", 
        path:'/user/binarykeeda-210-sheet',
        type:"public"
    },
    {
      icon: <School color='inherit' />,
      label: 'Roadmaps',
      path: '/user/binarykeeda-roadmap-sheet',
      type: 'public'
    },
    {
      icon: <Assessment />,
      label: 'Test Series',
      path: '/user/test-series',
      type: 'private'
    }
  ]

  const path = useLocation()

  return (
    <>
      <aside
        // onMouseEnter={() => setShowMenu(true)} // Adjust menu state on hover
        // onMouseLeave={() => setShowMenu(false)} // Adjust menu state on hover
        className={`
                    z-40 h-[calc(100vh-59px)] top-[60px] fixed left-0
                    bg-primary
                    transition-all duration-300 ease-in-out
                    ${showMenu ? 'w-[200px]' : 'w-0 lg:w-[90px]'}
                    overflow-hidden
                `}
      >
        <ul className='pt-5'>
          {NAV_ITEMS.map((item, i) => {
            const isActive = item.path === path.pathname
            if(!user && item.type == "private") return;
            return (
              <Link
                to={item.path}
                key={i}
                className={`
          flex flex-col items-center gap-1
          ${showMenu ? 'justify-start' : 'lg:justify-center'}
          py-3
           dark:text-white text-black hover:bg-gray-500 hover:text-gray-100
          transition-all mx-2 duration-300 ease-in-out
          ${!showMenu ? 'hidden lg:flex' : ''}
          ${isActive ? 'bg-secondary dark:bg-support ' : ''}
        `}
              >
                <span className='text-end'>{item.icon}</span>
                <span className='text-xs text-nowrap text-start'>
                  {item.label}
                </span>
                {showMenu && (
                  <span className='text-nowrap ml-2'>{item.label}</span>
                )}
              </Link>
            )
          })}
        </ul>
      </aside>
    </>
  )
})

export default Drawer
