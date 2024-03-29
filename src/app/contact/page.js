"use client";
import React ,{useEffect}from "react";
import Navpar from "../components/header/Navpar";
import AppContainer from "../components/container/container";
import { Space } from "../components/space/Space";
import useStore from "@/app/store";

function Connect() {
  const { setUser } = useStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      return;
    } else {
      console.log(token);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
    }
  }, []);

  return (
    <>
      <Navpar />
      <div
        className="bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-500 h-screen flex"
        dir="rtl"
      >
        <AppContainer>
          <Space height={"2rem"} />
          <p className="text-4xl">مرحباً</p>
          <Space height={"20px"} />

          <p className="text-3xl">التوصيل فقط لبغداد</p>
          <br />
          <h1 className="text-2xl">
            {" "}
            مطعم سحابي يختص بتقديم الطعام المنزلي صنع ايدي عراقية
          </h1>
          <Space height={"3rem"} />
          <h1 className="text-xl">تواصل معنا</h1>
          <input
            type="text"
            placeholder="رقم الهاتف"
            className="w-[350px] h-9 border rounded-l bg-[#eee] text-black placeholder-[#000000] focus:outline-none p-2 "
          />
          <Space height={"1rem"} />
          <input
            type="text"
            placeholder="رسالتك"
            className="w-[350px] h-9 border rounded-l bg-[#eee] text-black placeholder-[#000000] focus:outline-none p-2 "
          />
          <Space height={"1rem"} />
          <input
            type="text"
            placeholder="الموضوع"
            className="w-[350px] h-9 border rounded-l bg-[#eee] text-black placeholder-[#000000] focus:outline-none p-2 "
          />
        </AppContainer>
      </div>
    </>
  );
}

export default Connect;
