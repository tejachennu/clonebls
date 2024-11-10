'use client'

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useAuth0 } from '@auth0/auth0-react'
import Login from "./LoginButton";

function Navbar() {
  const menuLinks = [
    { href: "/blog", label: "Blog" },
    // { href: "/services", label: "Services" },
    // { href: "/track", label: "Track My Order" },
    { href: "/aboutus", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/pickup-instructions", label: "Pickup Services" },

  ];


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 
  return (
    <header className="sticky top-0 z-50 w-full max-w-screen-xl text-white ">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <div className="flex items-center space-x-2">
        <Link href="/" passHref>
            <Image
              src={`https://res.cloudinary.com/dh8lem2fe/image/upload/v1730923835/images/btboul1xutmdzsopv0ou.avif`}
              alt="BLS Logo"
              width={100}
              height={100}
              className="h-full rounded-full max-md:w-16 max-md:h-16"
            />
        </Link>
        </div>
        <nav className="justify-around hidden w-1/2 space-x-4 md:flex">
          {menuLinks.map((link) => (
            <Link
              key={link.label}
              className="transition-colors hover:text-black hover:underline decoration-black underline-offset-4"

              href={link.href}
            >
              {link.label}
            </Link>
            
          ))}
          {/* <Login/> */}
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute w-full py-2 bg-red-900 md:hidden">
          <nav className="flex flex-col items-center space-y-2">
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                className="py-2 transition-colors hover:text-red-200"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
