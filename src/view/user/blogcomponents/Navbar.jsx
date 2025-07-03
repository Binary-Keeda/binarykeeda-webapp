import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LOGO } from "../../../lib/config";
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchToggle = () => setShowSearch((prev) => !prev);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to='/'> <img src={LOGO} alt="Logo" className="h-10 w-auto" /> </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <li className="hover:text-orange-600 cursor-pointer"> <a href="/user/binarykeeda-roadmap-sheet"> Roadmaps </a> </li>
          <li className="hover:text-orange-600 cursor-pointer">Practice</li>
          <li className="hover:text-orange-600 cursor-pointer">Contests</li>
          <li className="hover:text-orange-600 cursor-pointer">Resources</li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to='/login' className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition">
            Sign in
          </Link>
          <FiSearch
            className="text-xl text-gray-600 hover:text-gray-800 cursor-pointer transition"
            onClick={handleSearchToggle}
          />
        </div>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="bg-gray-50 border-t">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white font-medium px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
