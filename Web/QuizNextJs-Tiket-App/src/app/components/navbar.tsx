"use client";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white">

      <div className="text-2xl font-bold app_text-custom_second">
        <Link href="/">  
          <span className="app_text-custom_primary">Tea</span>ke
          <span className="app_text-custom_primary">t</span>
        </Link>
      </div>

      

      <div className="hidden md:flex space-x-6 ml-auto">
        <Link href="/search-tiket" className="app_text-color flex items-center">
          Find Your Ticket
        </Link>


        <Link href="/" className="app_text-color">
          Explore
        </Link>

        <Link href="/categories" className="app_text-color">
          Browse Categories
        </Link>

        <Link href="/admin" className="app_text-color flex items-center">
          <FaUser className="mr-2" /> Admin (Khusus Buat Test)
        </Link>

        

      </div>

    </nav>
  );
}
