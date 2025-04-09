import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./dashboard/Header";
import Drawer from "./dashboard/Sidebar";
import CompleteProfile from './dashboard/CompleteProfile'
const UserDashboardLayout = ({children}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const { user } = useSelector((s) => s.auth);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleMode = () => {
    localStorage.setItem("mode", darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode === "dark") {
      document.getElementById("root").classList.add("dark");
      setDarkMode(true);
    } else {
      document.getElementById("root").classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = async () => await customSignOut();

  return (
    <>
      {!user?.isVerified && <CompleteProfile />}
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
      <main className={` ${menuOpen ? "md:pl-[230px] " : "pl-5 md:pl-[90px]" }  pr-5 py-5 dark:bg-gray-900 bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 transition-all`}>
      {  children || <Outlet /> } {/* This renders the nested components */}
      </main>
    </>
  );
};

export default UserDashboardLayout;
