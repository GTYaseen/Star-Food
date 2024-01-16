import React from "react";
import Container from "@/app/components/container/container";
import { FiMenu } from "react-icons/fi";
import { Space } from "../space/Space";
import SideMenu from "./sideMenu/sideMenu";
import { useState } from "react";


function Header() {
  const [openSideMenu, setOpenSideMenu] = useState(false);


  const toggleSideMenu = () => {
    setOpenSideMenu(!openSideMenu);
  };

  const handleMenuItemClick = (page) => {
    history.push(`/${page}`);
    setOpenSideMenu(false);
  };

  return (
   
      <>
        <div className="bg-[#FBFAF4]">
          <div className="bg-white border-b-2">
            <Container>
              <Space height={"1rem"} />
              <div className="text-3xl flex justify-between items-center ml-4 mr-4">
                <span className="text-xl">Star Projects ✩</span>
                <FiMenu className="ml-auto" onClick={toggleSideMenu} />
              </div>
            </Container>
          </div>
        </div>
        {openSideMenu && (
          <SideMenu
            onMenuItemClick={handleMenuItemClick}
            onClose={() => setOpenSideMenu(false)}
          />
        )}
        <Space height={"1rem"} />
      </>
  );
}

export default Header;
