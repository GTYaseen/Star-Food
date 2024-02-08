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
      <div className="bg-white border-b-2 fixed top-0 w-full z-10 h-12">
        <AppContainer>
        <div className="text-3xl flex items-center justify-between h-12 px-3">
            <div className="flex items-center">
              <p>Star Project</p>
              <span className="ml-2 relative flex items-center">
                <span className="text-yellow-500">✩</span> 
              </span>
            </div>
            <FiMenu onClick={sideClick} className="cursor-pointer" />
          </div>
        </AppContainer>
      </div>
      <div className="mt-12">
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
