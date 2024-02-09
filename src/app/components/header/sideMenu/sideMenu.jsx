"use client";
import React, { useEffect, useState } from "react";
import { FaQuestion, FaSignInAlt, FaArrowRight } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";
import { Image, Link } from "@nextui-org/react";
import { Space } from "@/app/components/space/Space";
import { FaRegHeart } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { LuChefHat } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import useStore from "@/app/store";

function SideMenu({ isMenuOpen, setIsMenuOpen, favoriteKitchens }) {
  const [name, setName] = useState("");
  const { user } = useStore();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!user) {
      setName("غير مسجل");
      setIsLogin(false);
    } else {
      setName(user.username);
      setIsLogin(true);
    }
  }, [user]);

  const sideClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handelSignOut = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 z-40 duration-300 opacity-50 ${
          isMenuOpen ? "block" : "hidden"
        }`}
        onClick={sideClick}
      ></div>
      
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 duration-500 border-l-2 transition-margin-right ${
          isMenuOpen ? "w-[500px]" : "w-0"
        }`}
      >
        <div
          className={`flex flex-col h-full ${isMenuOpen ? "block" : "hidden"}`}
        >
          <div className="flex border-b-2 items-center justify-between">
            <div className="bg-white h-12 flex items-center justify-center p-4">
              <IoIosArrowBack
                className="text-2xl cursor-pointer"
                onClick={sideClick}
              />
            </div>
            <div className="bg-white h-22 flex items-center justify-end p-4 px-4">
              <p className="text-3xl font-normal drop-shadow-lg">{name}</p>
              <Image
                src="https://ucarecdn.com/c7f336d8-3164-4185-844b-d32e28880bef/-/preview/500x500/-/quality/smart_retina/-/format/auto/"
                alt="logo"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="bg-[#FBFAF4] h-[100vh]">
            <ul className="flex flex-col gap-5 p-4 text-2xl items-end justify-end mr-7 ">
              <li className="flex items-center cursor-pointer">
                <Link href="/" className="flex items-center">
                الصفحة الرئيسية
                  <Space width={"5px"} />
                  <AiOutlineHome />
                </Link>
              </li>
              <li className="flex items-center cursor-pointer">
                <Link href="/favorites" className="flex item-center">
                  المطابخ المفضلة
                  <Space width={"5px"} />
                  <FaRegHeart className="text-1xl" />
                </Link>
                {Array.isArray(favoriteKitchens) &&
                  favoriteKitchens.length > 0 && (
                    <ul>
                      {favoriteKitchens.map((kitchen) => (
                        <li key={kitchen.id}>{kitchen.name}</li>
                      ))}
                    </ul>
                  )}
              </li>
              <li className="flex items-center cursor-pointer">
                <Link href="/about" className="flex items-center">
                  من نحن ؟
                  <Space width={"5px"} />
                  <LuChefHat />
                </Link>
              </li>
              <li className="flex items-center cursor-pointer">
                <Link href="/contact" className="flex items-center">
                  تواصل معنا
                  <Space width={"5px"} />
                  <MdOutlineContacts />
                </Link>
              </li>
              {!user ? (
                <></>
              ) : (
                <li className="flex items-center cursor-pointer">
                <Link href={`/delivery/${user.userId}`} className="flex items-center">
                  تتبع الطلب
                  <Space width={"5px"} />
                  <MdDeliveryDining />
                </Link>
              </li>
              )}
              {isLogin ? (
                <li
                  className="flex items-center cursor-pointer"
                  onClick={handelSignOut}
                >
                  تسجيل خروج
                  <Space width={"5px"} />
                  <PiSignOutBold />
                </li>
              ) : (
                <li className="flex items-center">
                  <Link
                    href={"/login"}
                    className="flex items-center cursor-pointer"
                  >
                    تسجيل دخول
                    <Space width={"5px"} />
                    <FaSignInAlt />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideMenu;