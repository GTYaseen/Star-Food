import React, { useState } from "react";
import Container from "@/app/components/container/container";
import { FiMenu } from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sideClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let width = 1000;
  return (
    <div>
      <div className="bg-white border-b-2">
        <Container width={width}>
          <div className="text-3xl flex items-center justify-end h-12">
            <FiMenu onClick={sideClick} className="cursor-pointer" />
          </div>
        </Container>
      </div>
      {/*Side Menu*/}
      <div className={`fixed top-0 right-0 h-full bg-white z-50 duration-300 border-l-2 transition-margin-right ${isMenuOpen ? "w-[1000px]" : "w-0"}`}>
        <div className="p-4">
          <p className="text-black">Side Menu Content</p>
          <ul className="text-black">
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
          </ul>
          <button className="bg-white text-black p-2" onClick={sideClick}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
