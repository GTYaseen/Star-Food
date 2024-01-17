"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import SideMenu from "./sideMenu/sideMenu";
import AppContainer from "../container/container";

function Navpar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sideClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let width = 1000;

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b-2 fixed top-0 w-full z-10">
        <div className={`w-full max-w-[${width}px] mx-auto my-auto`}>
          <div className="text-3xl flex items-center justify-end h-12">
            <FiMenu onClick={sideClick} className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-12"> {/* Adjust margin-top to prevent content from being hidden behind the fixed header */}
        <SideMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          user={user}
        />
      </div>
    </div>
  );
}

export default Navpar;
