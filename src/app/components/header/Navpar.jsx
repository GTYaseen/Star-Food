"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import SideMenu from "./sideMenu/sideMenu";

function Navpar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sideClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let width = 1000;

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b-2">
        <div className={`w-full max-w-[${width}px] mx-auto`}>
          <div className="text-3xl flex items-center justify-end h-12">
            <FiMenu onClick={sideClick} className="cursor-pointer" />
          </div>
        </div>
      </div>
      <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} user={user} />
    </div>
  );
}
export default Navpar;
