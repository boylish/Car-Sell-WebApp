import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white mt-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-black font-bold text-xl mb-4 sm:mb-0">
            Sell<span className="text-pink-600 text-2xl">CAR</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-black">
            <a href="#" className="hover:text-pink-600">
              Home
            </a>
            <a href="#" className="hover:text-pink-600">
              Sell Car
            </a>
            <a href="#" className="hover:text-pink-600">
              Buy Car
            </a>
            <a href="#" className="hover:text-pink-600">
              Contact
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <div className="mt-4 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} CarSellHub. All rights reserved.
          </div>
          <div>
            <span>Developer: Rajan Verma </span>
            <span>rajanverma0879@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
