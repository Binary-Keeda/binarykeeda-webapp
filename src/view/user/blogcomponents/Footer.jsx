import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { LOGO } from "../../../lib/config";
import { Link } from "react-router-dom";
import roadmaps from '../data/roadmaps.json';

const Footer = () => (
  <footer className="bg-gray-100 border-t py-10 px-4 text-gray-700 text-sm mt-[40px]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Logo & Copyright */}
      <div className="flex flex-col items-center md:items-start space-y-3">
        <img src={LOGO} alt="logo" className="h-10" />
        <p className="text-gray-500">
          © 2025 BinaryKeeda. All rights reserved.
        </p>
      </div>

{/* Course Links */}
<div className="grid grid-cols-2 gap-x-6 gap-y-3 text-center md:text-left text-gray-600">
  {Array(2)
    .fill()
    .map((_, colIndex) => (
      <div key={colIndex} className="space-y-3">
        {roadmaps
          .slice(colIndex * 4, colIndex * 4 + 4)
          .map(({ title, slug, time }, index) => (
            <Link
              key={index}
              to={`/user/binarykeeda-roadmap-sheet/blog/${slug}`}
              className="hover:text-orange-600 cursor-pointer block"
            >
              <div className="font-semibold">{title} - {time} Plan</div>
              {/* <div className="text-sm text-gray-500">{time}</div> */}
            </Link>
          ))}
      </div>
    ))}
</div>

      {/* Social Media Icons */}
      <div className="flex justify-center md:justify-end items-center space-x-4 text-xl text-gray-600">
        <a
          href="https://facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
        </a>
        <a
          href="https://linkedin.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
        </a>
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="hover:text-sky-500 cursor-pointer" />
        </a>
        <a
          href="https://instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="hover:text-pink-600 cursor-pointer" />
        </a>
        <a
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="hover:text-red-600 cursor-pointer" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
