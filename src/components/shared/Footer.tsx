import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container-center grid gap-5 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
          <div className="flex flex-col items-start gap-1 text-sm">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/issues" className="hover:underline">
              Issues
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">Source Code</h3>
          <div className="flex flex-col items-start gap-1 text-sm">
            <a href="" target="_blank" className="hover:underline">
              Frontend
            </a>
            <a
              href="https://github.com/misbah-ul-hoq/api-arbanpublicschool.git"
              target="_blank"
              className="hover:underline"
            >
              Backend
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">Technologies</h3>
          <div className="flex flex-col items-start gap-1 text-sm">
            <a href="" target="_blank" className="hover:underline">
              React
            </a>
            <a href="" target="_blank" className="hover:underline">
              MongoDb
            </a>
            <a href="" target="_blank" className="hover:underline">
              NodeJS
            </a>
            <a href="" target="_blank" className="hover:underline">
              ExpressJS
            </a>
          </div>
        </div>
      </div>
      <div className="copywright bg-black px-2 py-4 text-center text-white">
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
