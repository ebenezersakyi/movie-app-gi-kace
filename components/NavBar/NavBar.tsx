import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { CiSearch, CiUser } from "react-icons/ci";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchString, setSearchString] = useState("");
  const router = useRouter();

  // Handle scroll event to toggle navbar background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navigate to search page on pressing Enter
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleEnterPress();
    }
  };

  const handleEnterPress = () => {
    router.push(`/search?query=${searchString}`);
  };

  return (
    <header
      className={`flex p-2 py-5 w-full justify-between fixed top-0 z-10 transition-all duration-300 sm:p-5 lg:px-20 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      {/* Logo Link */}
      <Link href="/" className="text-white text-2xl font-bold">
        <Image
          src={`/logo.png`}
          alt={"logo"}
          style={{
            width: "100px",
            height: "100%",
            objectFit: "contain",
          }}
          sizes="50vw"
          width={0}
          height={0}
          priority
        />
      </Link>

      {/* Search and User Icon */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center rounded-md px-2 bg-white/25 backdrop-blur-xl">
          <CiSearch color="white" size={20} />
          <input
            type="text"
            className="border-none outline-none p-2 bg-transparent text-white placeholder:text-gray-400"
            placeholder="Search..."
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Link href="/account">
          <CiUser className="cursor-pointer" size={25} color="white" />
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
