import { DarkMode, LightMode, NoteAdd, PowerSettingsNew, ShortText } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../../redux/reducers/UserThunks";
import Cookies from 'js-cookie'
import { DARK_STRONG } from "../utils/colors";
import AccountMenu from "../utils/HeaderMenu";
import React, { useEffect } from "react";
// import { handleLogout } from "../../../utils/libs/logout";

const  Header = React.memo(({user,menuOpen,setMenuOpen,darkMode,toggleMode}) => {

  useEffect(()=>{console.log("Header Mounted")} ,[])
  // const handleLogout = () => { }
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
      <header className='relative h-[70px]'>
        <nav className={`fixed shadow-sm dark:text-gray-50 bg-blend-difference text-gray-600  h-[70px] items-center pr-5 pl-2  flex justify-between z-40 w-full top-0 dark:bg-[${DARK_STRONG}] bg-white`}>
          <div className="md:hidden">
            <ShortText onClick={() => setMenuOpen(!menuOpen)} />
          </div>
          <div className='flex gap-1 items-center'>
            {/* <video
              src='/assets/techease.mp4'
              autoPlay
              loop
              playsInline
              muted
              className='h-[60px] rounded-[20px]'
            ></video> */}
            <img src='https://res.cloudinary.com/drzyrq7d5/image/upload/v1744699895/binarykeeda/zipjouvv161c11xywrwk.jpg' className='h-12' alt='' />
          </div>
          <div className='flex items-center gap-3'>
            <AccountMenu handleLogout={handleLogout}/>
          </div>
        </nav>
      </header>
    </>
  )

})
export default Header;  