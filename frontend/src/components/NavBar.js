// NavBar.js
import React from "react";
import Link from "next/link";

const CustomLink = ({ href, children }) => (
  <Link href={href}>
    <div className="text-lg text-white cursor-pointer font-orbitron hover:text-gray-700 focus:text-gray-700 focus:outline-none">
      {children}
    </div>
  </Link>
);

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://media.discordapp.net/attachments/1192825905077309612/1197078880276713491/Nutriflex_logoT_2.png?ex=65b9f595&is=65a78095&hm=23b703afd2e4fbd09b079e3514540a37703271452cbdaf81db0850e038433681&=&format=webp&quality=lossless&width=455&height=455"
            alt="NutriFlex Logo"
            className="w-16 h-16 mr-2"
          />
          <div className="text-2xl font-extrabold text-white font-orbitron">
            NutriFlex
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center space-x-4">
          <CustomLink href="#home">Home</CustomLink>
          <CustomLink href="#features">Features</CustomLink>
          <CustomLink href="#solution">Solution</CustomLink>
          <CustomLink href="#contact">GitHub</CustomLink>
        </div>

        <div>
          <CustomLink
            href="/auth/login"
            className="text-white font-orbitron hover:text-gray-700 focus:text-gray-700 focus:outline-none"
          >
            Login
          </CustomLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
