/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";

const DashboardNav = () => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light",
  );
  const [showNavAnimation, setShowNavAnimation] = useState(false);
  const [showUserMenu, setUserMenu] = useState(false);
  const imageRef = useRef<HTMLButtonElement>(null);
  const { data: userInfo, isLoading } = useGetUserInfoQuery();

  const handleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("light");
    } else {
      setTheme("dim");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (imageRef.current && !imageRef.current.contains(event.target as Node)) {
      setUserMenu(false); // Handle outside click
    }
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("authToken");
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("theme", theme as string);
    const localTheme = localStorage.getItem("theme");
    //@ts-expect-error
    document?.querySelector("html").setAttribute("data-theme", localTheme);
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShowNavAnimation(true);
      } else {
        setShowNavAnimation(false);
      }
    });
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [theme]);

  return (
    <div
      className={`navbar sticky top-0 z-10 items-center justify-between text-base-content max-[400px]:max-h-14 max-[400px]:min-h-0 ${showNavAnimation ? "bg-opacity-80" : "bg-opacity-100"} ${
        showNavAnimation &&
        "shadow-[0_4px_10px_rgba(128,0,128,0.5) backdrop-blur-lg"
      } ${
        showNavAnimation &&
        "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="breadcrumbs-wrapper"></div>
      <div className="justify-self-end">
        <div className="nav-content-end mr-3 flex items-center gap-4">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={handleTheme}
              checked={theme === "light"}
            />

            {/* sun icon */}
            <svg
              className="swap-on h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          <div
            className={`user-menu-wrapper relative ${
              userInfo && !isLoading ? "block" : "hidden"
            }`}
          >
            <button
              onClick={() => {
                setUserMenu(!showUserMenu);
              }}
              ref={imageRef}
            >
              <FaUser className="select-none text-2xl" />
            </button>

            {/* <Image
              src={`/icons/user.svg`}
              alt="Clickable"
              height={30}
              width={30}
              className="cursor-pointer"
              onClick={() => {
                setUserMenu(!showUserMenu);
              }}
              ref={imageRef}
            /> */}

            <ul
              className={`menu ${
                showUserMenu ? "block" : "hidden"
              } absolute right-0 top-9 w-56 rounded-box bg-base-200 text-base-content`}
            >
              <li>
                <Link href={`/dashboard`}>Dashboard</Link>
              </li>
              <li>
                <Link href={`/me`}>Profile</Link>
              </li>
              <li className={`${userInfo && !isLoading ? "block" : "hidden"}`}>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
