"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { carData } from "./data/carData";
import Footer from "./components/Footer"

export default function LandingPage() {
  const router = useRouter();

  const handleLogoClick = (brand) => {
    router.push(`/form?brand=${brand}`);
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/bgs/carbg.jpg')",
      }}
    >
      <header className="text-center pt-8">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Sell Your Car in Minutes
        </h1>
      </header>
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl flex flex-col items-center gap-4" >
          <div>
            <h2 className="text-2xl font-semibold text-white">Select your Car's Brand</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {Object.entries(carData).map(([brand, { logo }]) => (
              <div
                key={brand}
                onClick={() => handleLogoClick(brand)}
                className="cursor-pointer hover:scale-105 transition transform border-2 p-2 rounded-2xl border-white"
              >
                <img src={logo} alt={brand} className="h-20 w-auto mx-auto " />
                <p className="text-center mt-2 font-semibold text-white">
                  {brand}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
