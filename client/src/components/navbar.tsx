"use client"
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { links } from "../util/data";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  // Function to hide nav on resize
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className="flex justify-between bg-white items-center  p-1 sticky top-0 shadow">
      <nav className="flex w-full items-center justify-between mx-auto py-4 px-6 font-medium">

        <Link className="font-bold " to="/">CBM</Link>

        {/* Hidden Navbar */}
        <ul className="hidden md:flex">
          {links.map(({ id, link }) => (
            <li key={id}
              className="link-text" >
              <Link href={`#${link}`}>{link}</Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center">
          {/* <h2 className="link-text">Signup</h2> */}
          <Link type="submit" to="/signin" className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out"> Sign in </Link>
        </div>

        {/* Icons */}
        <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden" >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {/* Normal Navbar */}
        {nav && (
          <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white text-gray-500">
            {links.map(({ id, link }) => (
              <li key={id} className="px-4 cursor-pointer capitalize py-6 text-lg" >
                <Link onClick={() => setNav(!nav)} href={`#${link}`}>
                  {link}
                </Link>
              </li>
            ))}

            <h2 className="px-4 cursor-pointer capitalize py-6 text-lg">Sign up</h2>
            <Link type="submit" to="/signin" className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out"> Sign in </Link>
          </ul>
        )}

      </nav>
    </div>
  );
};

export default Navbar;