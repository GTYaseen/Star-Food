import React, { useState } from "react";
import Container from "@/app/components/container/container";
import { FiMenu } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaQuestion, FaSignInAlt } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import { MdOutlineContacts } from "react-icons/md";
import { Image, Link } from "@nextui-org/react";
import { Space } from "../space/Space";

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
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 z-40 duration-300 opacity-50 ${
          isMenuOpen ? "block" : "hidden"
        }`}
        onClick={sideClick}
      ></div>
      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 duration-500 border-l-2 transition-margin-right ${
          isMenuOpen ? "w-[500px]" : "w-0"
        }`}
      >
        <div
          className={`flex flex-col h-full ${isMenuOpen ? "block" : "hidden"}`}
        >
          <div className="bg-white h-22 flex items-center justify-end p-4 border-b-2 px-4">
            <p className="text-3xl font-normal drop-shadow-lg">غير مسجل</p>
            <Image
              src="https://ucarecdn.com/c7f336d8-3164-4185-844b-d32e28880bef/-/preview/500x500/-/quality/smart_retina/-/format/auto/"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
          <div className="bg-[#FBFAF4] h-[100vh]">
            <ul className="flex flex-col gap-5 p-4 text-2xl items-end justify-end mr-7 ">
              <li className="flex items-center mr-[-4px] cursor-pointer">
                المطابخ المفضلة
                <Space width={"0px"} />
                <IoMdHeartEmpty className="text-3xl" />
              </li>
              <li className="flex items-center cursor-pointer">
                من نحن
                <Space width={"5px"} />
                <FaQuestion />
              </li>
              <li className="flex items-center cursor-pointer">
                الاصناف
                <Space width={"5px"} />
                <TbCategory2 />
              </li>
              <li className="flex items-center cursor-pointer">
                تواصل معنا
                <Space width={"5px"} />
                <MdOutlineContacts />
              </li>
              <li className="flex items-center">
                <Link href={"/login"} className="flex items-center cursor-pointer">
                تسجيل دخول
                <Space width={"5px"} />
                <FaSignInAlt />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
