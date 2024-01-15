import React, { useState } from "react";
import Container from "@/app/components/container/container";
import { FiMenu } from "react-icons/fi";
import SideMenu from "./sideMenu/sideMenu";

export default function Header({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sideClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let width = 1000;

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b-2">
        <Container width={width}>
          <div className="text-3xl flex items-center justify-end h-12">
            <FiMenu onClick={sideClick} className="cursor-pointer" />
          </div>
        </Container>
      </div>
      <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} user={user} />
    </div>
  );
}
