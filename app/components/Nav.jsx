"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <nav className=" px-6 py-4 w-full">

      <div className="flex  justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-black">Sell<span className="text-4xl text-pink-600">CAR</span></h1>
        </Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-pink-600 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              Buy Car
            </button>
          </Link>
          <Link href="/">
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              More
            </button>
          </Link>
          <Link href="/">
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              Account
            </button>
          </Link>
          <Link href="/">
            <button className=" text-pink-600 px-4 py-2 rounded border-2 border-pink-600 cursor-pointer ">
              Customer Care
            </button>
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 flex flex-col items-start">
          <Link href="/">
            <button className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              Buy Car
            </button>
          </Link>
          <Link href="/">
            <button className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              More
            </button>
          </Link>
          <Link href="/">
            <button className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              Account
            </button>
          </Link>
          <Link href="/">
            <button className="w-full bg-white text-pink-600 px-4 py-2 rounded ">
              Customer Care
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
