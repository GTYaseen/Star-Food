"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import SideMenu from "./sideMenu/sideMenu";
import { Space } from "../space/Space";

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
          <div className="text-3xl flex items-center justify-end h-12">
            <FiMenu onClick={sideClick} className="cursor-pointer" />
          </div>
        </AppContainer>
      </div>
      <div className="mt-12"> {/* Adjust margin-top to prevent content from being hidden behind the fixed header */}
        <SideMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          user={user}
        />
      <div className="bg-white border-b-2 fixed top-0 w-full z-10">
      <Space height={"1px"} />
        <div className={`w-full max-w-[${width}px] mx-auto my-auto px-2 flex items-center justify-between`}>
          <div className="flex items-center justify-between w-full">
            <div className="ml-4">
              <h1 className="text-1xl">Star Project✩</h1>
            </div>
            <div className="text-3xl">
              <FiMenu onClick={sideClick} className="cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center">
            <SideMenu
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              user={user}
            />
          </div>
        </div>
        <Space height={"1px"} />
      </div>
    </div>
    
  );
}

export default Navpar;
