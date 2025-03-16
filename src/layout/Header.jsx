import React from 'react';
import { Avatar, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { CustomButton } from '../utilities/CustomButton';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { logOutUser } from '../redux/reducers/UserThunks';
import Cookies from 'js-cookie';
const Header = () => {
    const { user } = useSelector(s => s.auth)
    const dispacth = useDispatch();
    const handleLogout = () => {
        try {
            console.log("Btn clicked")
            dispacth(logOutUser(Cookies.get('token')));
        } catch (error) {
            console.log(error, "logout");
        }
    };
    return (
        <>
            <header className='h-[65px] z-40  w-full relative'>
                <nav className='border-b-[1px] z-40 bg-white h-[65px] items-center pl-3 pr-5 top-0 w-full relative flex justify-between'>
                    <div className='flex items-center gap-7'>
                        <img className='h-12' src="/assets/logo/A37A874D-8E55-4BCC-BDF4-EBFA65B2F790_1_201_a.jpeg" alt="" />
                        <a id='w' onClick={(e) => { e.preventDefault(); alert(e.target.id) }} className='text-sm hover:underline' href="">About</a>
                        <a className='text-sm hover:underline ml-2' href="">Learning</a>
                        <a className='text-sm hover:underline' href="">Mentorship</a>
                        <a className='text-sm hover:underline' href="">Test Series</a>
                        <a className='text-sm hover:underline' href="">Connect</a>
                    </div>
                    <div>
                        {user ?
                            <div className='flex gap-1 items-center'>
                                <Link className='mr-2 text-xs' to={`/${user.role}`}>Dashbord</Link>
                                <Avatar src={user.avata || user.image} />
                                <IconButton onClick={handleLogout}>
                                    <Logout className='cursor-pointer' />
                                </IconButton>
                            </div> :
                            <div className='flex  h-auto items-center gap-3'>
                                {/* <a className="flex items-center w-[100px] text-gray-300 justify-center rounded-md hover:bg-[rgba(29,30,32,.9)] transition-all duration-300 p-2 bg-[rgba(29,30,32,1)]"  href="">Login</a>
                                <a className="flex items-center w-[100px] text-gray-300 justify-center rounded-md hover:bg-[rgba(29,30,32,.9)] transition-all duration-300 p-2 bg-[rgba(29,30,32,1)]" href="">Sign Up</a> */}
                                <a href="/login">Login</a>
                                <hr className='w-[1px] h-[17px] bg-[rgba(29,30,32,1)]' />
                                <a href="/register">Sign Up</a>
                            </div>
                        }
                    </div>
                </nav>

            </header>
        </>
    );
}

export default Header;
