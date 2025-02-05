"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const pathName = usePathname();
  if (pathName.includes("dashboard") || pathName.includes("chat-alm"))
    return null;
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container-center flex flex-wrap items-center justify-between gap-5 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <aside>
          <Link href={`/`}>
            <Image
              src={`/arban-public-school-logo.jpg`}
              alt="Arban Public School's Logo"
              height={50}
              width={50}
              className="rounded"
            />
          </Link>
          <h4 className="mt-2">
            <span className="font-semibold">Arban Public School</span>
            <br />
            Providing Quality Education Since 2001
          </h4>
        </aside>

        <div>
          <h3 className="footer-title">Quick Links</h3>
          <div className="flex flex-col items-start gap-1">
            <Link
              href="/about"
              className="hover:text-purple-500 hover:underline"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-purple-500 hover:underline"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="hover:text-purple-500 hover:underline"
            >
              Login
            </Link>
            <Link
              href="/issues"
              className="hover:text-purple-500 hover:underline"
            >
              Issues
            </Link>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Follow Us On</h3>
          <div className="flex flex-col items-start gap-1">
            <a
              href="https://www.facebook.com/arbanpublicschool"
              target="_blank"
              className="hover:text-purple-500 hover:underline"
            >
              Facebook
            </a>
            <Link href="/" className="hover:text-purple-500 hover:underline">
              LinkedIn
            </Link>
            <Link href="/" className="hover:text-purple-500 hover:underline">
              Twitter
            </Link>
            <Link href="/" className="hover:text-purple-500 hover:underline">
              Instagram
            </Link>
          </div>
        </div>

        {/* <div>
          <h3 className="footer-title">Source Code</h3>
          <div className="flex flex-col items-start gap-1">
            <a
              href="https://github.com/misbah-ul-hoq/arbanpublicschool"
              target="_blank"
              className="hover:text-purple-500 hover:underline"
            >
              Front-end
            </a>
            <a
              href="https://github.com/misbah-ul-hoq/api-arbanpublicschool.git"
              target="_blank"
              className="hover:text-purple-500 hover:underline"
            >
              Back-end
            </a>
          </div>
        </div> */}

        {/* <div>
          <h3 className="footer-title">Technologies</h3>
          <div className="flex flex-col items-start gap-1">
            <a
              href="https://react.dev/"
              target="_blank"
              className="hover:text-purple-500 hover:underline"
            >
              React
            </a>
            <a
              href="https://www.mongodb.com"
              target="_blank"
              className="hover:text-purple-500 hover:underline"
            >
              MongoDb
            </a>
            <a
              href="https://nodejs.org/en"
              target="_blank"
              className="hover:text-purple-500 hover:underline"
            >
              NodeJS
            </a>
            <a
              href="https://expressjs.com/"
              target="_blank"
              className="hover:text-purple-500 hover:underline"
            >
              ExpressJS
            </a>
          </div>
        </div> */}
      </div>
      <div className="copywright bg-black px-2 py-4 text-center text-sm text-white">
        &copy; Created with <FaHeart className="inline-block text-red-500" /> by{" "}
        <a
          href="https://misbahulhoq.vercel.app/"
          target="_blank"
          className="text-purple-500 hover:underline"
        >
          Md Mezbah Uddin
        </a>{" "}
        , 2024{" "}
        {new Date().getFullYear() > 2024 && "-" + new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
