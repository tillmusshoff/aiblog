import React from "react";
import Link from "next/link";
import aiLogo from "../public/images/ailogo.png";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-gradient-to-r from-gray-800 to-black text-white border-b-2 border-b-violet-500 shadow-lg mb-12 p-4">
      <Link href="/" className="font-bold text-white">
        <div className="flex flex-row">
          <Image src={aiLogo} alt="Logo" className="h-12 w-12 rounded-full" />
          <span className="text-white ml-2 text-xl mt-3">An AI For An AI</span>
        </div>
      </Link>
    </nav>
  );
};

export default Nav;
