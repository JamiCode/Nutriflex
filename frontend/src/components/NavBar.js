// NavBar.js
import React from "react";
import Link from "next/link";

const CustomLink = ({ href, children }) => (
  <Link href={href}>
    <div className="text-lg text-white hover:underline cursor-pointer">
      {children}
    </div>
  </Link>
);

const NavBar = () => {
  return (
    <nav className="flex flex-wrap justify-between items-center p-4 bg-gray-800">
      <div className="flex items-center">
        <img src="/logo.png" alt="NutriFlex Logo" className="w-10 h-10 mr-2" />
        <div className="text-2xl font-extrabold text-white">NutriFlex</div>
      </div>
      <div className="flex space-x-4">
        <CustomLink href="#home">Home</CustomLink>
        <CustomLink href="#features">Features</CustomLink>
        <CustomLink href="#problem">Problem</CustomLink>
        <CustomLink href="#solution">Solution</CustomLink>
        <CustomLink href="#contact">Contact</CustomLink>
      </div>
    </nav>
  );
};

export default NavBar;
