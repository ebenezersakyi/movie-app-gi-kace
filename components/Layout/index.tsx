import React from "react";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

interface Layout {
  children: React.ReactNode;
}

export default function Layout({ children }: Layout) {
  return (
    <div className="min-h-[100vh] flex-col text-white bg-black">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
