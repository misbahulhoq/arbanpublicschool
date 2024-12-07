import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral pt-10 text-neutral-content">
      <div className="container-center"></div>
      <div className="copywright bg-black py-4 text-center text-white">
        &copy; Created with <FaHeart className="inline-block text-red-500" /> by{" "}
        <a
          href="https://misbahulhoq.vercel.app/"
          target="_blank"
          className="text-purple-500 hover:underline"
        >
          Md Mezbah Uddin
        </a>{" "}
        2024 {new Date().getFullYear() > 2024 && "-" + new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
