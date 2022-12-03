import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between bg-blue-600 p-4">
      <Link href="/" className="font-bold text-white">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </Link>
    </nav>
  );
};

export default Nav;
