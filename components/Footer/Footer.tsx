import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex relative flex-col items-center content-center bg-[#0d0d0d] bg-gradient-to-b from-black via-transparent to-transparent opacity-00 text-gray-300 pt-24">
      <div className="flex space-x-3">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black rounded-full p-2 bg-white hover:text-red-700"
        >
          <FaFacebook size={20} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black rounded-full p-2 bg-white hover:text-red-700"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black rounded-full p-2 bg-white hover:text-red-700"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black rounded-full p-2 bg-white hover:text-red-700"
        >
          <FaYoutube size={20} />
        </a>
      </div>

      <ul className="flex space-x-2 md:space-x-4 pb-24 mt-6">
        <li className="hover:text-red-700">
          <Link href="#" className="text-[15px] md:text-lg">
            Home
          </Link>
        </li>
        <li className="hover:text-red-700">
          <Link href="#" className="text-[15px] md:text-lg">
            Movies
          </Link>
        </li>
        <li className="hover:text-red-700">
          <Link href="#" className="text-[15px] md:text-lg">
            TV Shows
          </Link>
        </li>
        <li className="hover:text-red-700">
          <Link href="#" className="text-[15px] md:text-lg">
            Contact Us
          </Link>
        </li>
      </ul>

      <div className="w-full flex items-center justify-center bg-black py-5 text-center text-[15px]">
        <p className="text-gray-400 text-[13px] max-w-[90%] sm:text-[17px]">
          © {new Date().getFullYear()} GI-KACE-Video-App. Digitally crafted by
          <a
            href="https://github.com/ebenezersakyi"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-[8px] hover:text-red-700"
          >
            Ebenezer Sakyi.
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
