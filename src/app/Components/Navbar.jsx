"use client";
import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import LoginComponent from "./Login.jsx";
import JoinComponent from "./Join.jsx";
import Become_a_seller from "./Become_a_seller.jsx"
import Link from "next/link";
import { usePathname } from "next/navigation.js";
import newRequest from "../client/components/newRequest.jsx";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser && storedUser !== "null") {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser && storedUser !== "null") {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  

  const handleContinue = () => {
    router.push(
      `/orders?title=${encodeURIComponent(gig.title)}&price=${
        gig.price
      }&cover=${encodeURIComponent(gig.cover)}&category=${encodeURIComponent(
        gig.category
      )}&gigId=${gig._id}`
    );
  };

  return (
    <div className="w-full sticky top-0 shadow z-[999] bg-white text-black transition-all duration-500 px-20 py-4 gap-110 flex items-center justify-between">
      {/* Logo */}
      <div>
        <a className="text-3xl font-bold">
          Freelancer<span className="font-bold text-[#1dbf73]">.</span>
        </a>
      </div>

      {/* Mobile menu button */}
      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl">
          <HiMenu />
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } sm:flex absolute top-[80px] left-0 bg-base-100 sm:bg-transparent sm:gap-8 sm:items-left sm:w-auto z-50 sm:static sm:mt-0 -mt-2 sm:pt-0 pt-2 sm:px-0 px-2 text-left`}
      >
        <div className="flex flex-col pt-4 sm:flex-row gap-8 underline-offset-8">
          <div className="hover:underline">Freelancer Business</div>
          <div className="hover:underline">Explore</div>
          <div className="hover:underline">Services</div>
          <div className="hover:underline">English</div>
          {currentUser?.role === "client" && (
          <div className="hover:underline">
            <Become_a_seller />
          </div>
          )}

          {/* 👇 USER INFO OR LOGIN BUTTONS */}
          {!loading &&
            (currentUser ? (
              <div className="relative">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={
                      currentUser.img
                        ? `http://localhost:8800/uploads/${encodeURIComponent(
                            currentUser.img
                          )}`
                        : "/img/noavatar.jpg"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{currentUser.username}</span>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-md z-[999] text-gray-700 py-3 px-4 flex flex-col gap-3 text-sm">
                    <Link href="/client/gigs" className="cursor-pointer">
                          Gigs
                        </Link>
                    {currentUser.role === "freelancer" && (
                      <>
                        
                        <Link
                          href="/freelancer/add-gig"
                          className="cursor-pointer"
                        >
                          Add New Gig
                        </Link>
                      </>
                    )}
                    {pathname !== "/orders" && (
                      <Link
                        href="/orders"
                        onClick={handleContinue}
                        className="cursor-pointer"
                      >
                        Orders
                      </Link>
                    )}
                    <Link href="/messages" className="cursor-pointer">
                      Messages
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="rounded-full gap-4 sm:pb-0 pb-8">
                  <LoginComponent />
                </div>
                <JoinComponent />
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
