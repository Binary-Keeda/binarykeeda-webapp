import { ArrowLeft ,Book, Code, Home, HomeMax, LocationCity, Person, ShortText, Summarize, VolunteerActivism } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { use, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Drawer = ({showMenu,setShowMenu}) => {
    const { user } = useSelector(s => s.auth)
    const location = useLocation();
    useEffect(() => {
        setShowMenu(false)
    } , [location.pathname])
    const NAV_ITEMS = [
        { icon: <HomeMax color='inherit' />, label: 'Dashboard', path: '/user' },
        { icon: <Book color='inherit' />, label: 'Practice', path: '/user/practice' },
        {
            icon: <Code color='inherit' />,
            label: 'Coding',
            path: '/user/coding'
        },
        {
            icon: <LocationCity color='inherit' />,
            label: 'Roadmaps',
            path: '/user/roadmaps'
        },
        //   {
        //     icon: <Person2 color='inherit' />,
        //     label: 'Profile',
        //     path: '/user/profile'
        //   }
        // {
        //   icon: <Settings color='inherit' />,
        //   label: 'Settings',
        //   path: '/user/settings'
        // }
    ]
    return (
        <>
            <aside onMouseEnter={() => { setShowMenu(true) }} onMouseLeave={() => { setShowMenu(false) }} className={`z-40 h-screen w-[270px] left-0 fixed top-0 transition-all duration-200 ${!showMenu ? '-translate-x-[270px] md:-translate-x-[210px]' : 'translate-x-0'} border-r-[1px] border-gray-200 bg-white`}>
                <div className='flex flex-col items-center justify-center  my-10 gap-5' >
                    <span className="fixed right-6 top-5  ">
                        {
                            !showMenu ?
                                <ShortText /> : <><ArrowLeft onClick={()=>setShowMenu(false)} /></>
                        }
                    </span>
                    {showMenu && <Avatar src={user?.image} sx={{
                        width: 120,
                        height: 120,
                    }} />}
                    {
                        showMenu && <div>
                            <p className='text-center' >{user?.name}</p>
                            <p className='text-center' >{user?.email}</p>
                        </div>
                    }
                </div>
                <ul>
                    {
                        NAV_ITEMS.map((item, i) => (
                            <Link to={item.path} className={`flex gap-4 ${showMenu ? '' : 'justify-end'} py-4 cursor-pointer hover:bg-gray-100 bg-gray-50 mx-3 px-3 rounded-3xl my-4 ${showMenu ? '' : ''} `} key={i}>
                                <span className='text-end' >{item.icon}</span>
                                <span className={`${showMenu ? '' : 'hidden '}`} >{item.label}</span>
                            </Link>
                        ))
                    }
                </ul>
            </aside>

        </>
    );
}

export default Drawer;
