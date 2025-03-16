import { DarkMode, LightMode, NoteAdd, PowerSettingsNew, ShortText } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../../redux/reducers/UserThunks";
import Cookies from 'js-cookie'
// import { handleLogout } from "../../../utils/libs/logout";

function Header({
  user,
  menuOpen,
  setMenuOpen,
  darkMode,
  toggleMode
}) {

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
        <nav className='fixed shadow-sm dark:text-gray-50 bg-blend-difference text-gray-600  h-[70px] items-center pr-5 pl-5 md:pl-[55px] flex justify-between z-40 w-full top-0 dark:bg-[#1d1e20] bg-white'>
          <div className="md:hidden">
            <ShortText onClick={() => setMenuOpen(true)} />
          </div>
          <div className='flex gap-1 items-center'>
            <video
              src='/assets/techease.mp4'
              autoPlay
              loop
              playsInline
              muted
              className='h-[60px] rounded-[20px]'
            ></video>
          </div>
          <div className='flex items-center gap-3'>

            <IconButton color='inherit' onClick={toggleMode}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton color='inherit' onClick={handleLogout}>
              <PowerSettingsNew color='inherit' />
            </IconButton>
            <Avatar src={`${user?.image}`} />
          </div>
        </nav>
      </header>
    </>
  )

}
export default Header;  