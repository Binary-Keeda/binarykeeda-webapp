import { ArrowLeft, Book, Code, Edit, Home, HomeMax, LocationCity, Person, ShortText, Summarize, VolunteerActivism } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Drawer = React.memo(({ showMenu, setShowMenu }) => {
    const { user } = useSelector(s => s.auth);
    const location = useLocation();

    useEffect(() => {
        console.log("Sidebar Mounted");
    }, []);

    // This useEffect is no longer needed, as the menu visibility is controlled by the parent component (UserDashboardLayout)
    // Removed: useEffect(() => { setShowMenu(false); }, [location.pathname]);

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
        {
            icon: <Edit />,
            label: 'Test Series',
            path: '/user/test'
        },
    ];

    return (
        <>
            <aside
                onMouseEnter={() => setShowMenu(true)}  // Adjust menu state on hover
                onMouseLeave={() => setShowMenu(false)}  // Adjust menu state on hover
                className={`
                    z-40 h-[calc(100vh-70px)] top-[71px] fixed left-0
                    border-r border-gray-200 bg-white
                    transition-all duration-300 ease-in-out
                    ${showMenu ? 'w-[200px]' : 'w-0 lg:w-[70px]'}
                    overflow-hidden
                `}
            >
                <ul>
                    {
                        NAV_ITEMS.map((item, i) => (
                            <Link
                                to={item.path}
                                key={i}
                                className={`
                                    flex items-center gap-4
                                    ${showMenu ? 'justify-start' : 'lg:justify-end'}
                                    py-4 px-3 mx-3 my-4 rounded-3xl
                                    bg-gray-800 text-white hover:bg-gray-600
                                    transition-all duration-300 ease-in-out
                                    ${showMenu ? '' : 'hidden lg:flex'}
                                `}
                            >
                                <span className="text-end">{item.icon}</span>
                                <span className={`text-nowrap ${showMenu ? 'ml-2' : 'hidden'}`}>{item.label}</span>
                            </Link>
                        ))
                    }
                </ul>
            </aside>
        </>
    );
})

export default Drawer;
