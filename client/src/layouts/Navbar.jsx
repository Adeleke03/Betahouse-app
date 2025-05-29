import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../utils/Logo";
import Hero from '../features/Hero';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <main className="wrapper bg-[url('/Frame%209325.png')] text-white bg-cover bg-center">
        <nav className="bg-black/15 flex justify-between">
          {/* section for Logo */}
          <Link to="/">
            <section>
              {" "}
              <Logo />{" "}
            </section>
          </Link>
          {/* section for nav bar links */}
          <section className='hidden md:block'>
            <ul className="font-Exo-2 font-[500] lg:text-[18px] leading-[50px] tracking-[0%] flex lg:gap-[33.05px] gap-[15px] ">
              <li>Home</li>
              <li>Properties</li>
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </section >
          {/* section for auth */}
          <section className="md:flex lg:gap-[34px] gap-[20px] hidden " >
           <Link to="/signup" ><div className=" border-[#F5F5F5] border-[2px] rounded-[8px] p-[10px] gap-[10px] hover:bg-[#3D9970] hover:border-none " >Sign Up</div></Link> 
           <Link to="/login" ><div className=" border-[#F5F5F5] border-[2px] rounded-[8px] px-[10px] py-[7px] gap-[14px] hover:bg-[#3D9970] hover:border-none "> Login </div>
</Link>
          </section>
          {/* Hamburger icon - small screens only */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        </nav>
        {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden  px-4 pb-4 text-[#C7C7C7] font-Exo-2 text-[16px]">
          <ul className="flex flex-col gap-4 items-center">
            <Link to="/"><li onClick={() => setMenuOpen(false)}>Home</li></Link>
            <Link to="properties"><li onClick={() => setMenuOpen(false)}>Properties</li></Link>
            <Link to="aboutUs"><li onClick={() => setMenuOpen(false)}>About Us</li></Link>
            <Link to="blog"><li onClick={() => setMenuOpen(false)}>Blog</li></Link>
            <Link to="contact"><li onClick={() => setMenuOpen(false)}>Contact</li></Link>
            <Link to="/signup"><li onClick={() => setMenuOpen(false)}>Sign up</li></Link>
            <Link to="/login"><li onClick={() => setMenuOpen(false)}>Login</li></Link>
          </ul>
        </div>
      )}
      {/* Hero section */}
      <section><Hero/></section>
      </main>
    </>
  );
};

export default Navbar;
