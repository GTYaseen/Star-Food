"use client";
import React, { useState } from "react";
import { Space } from "@/app/components/space/Space";
import { Button, Image } from "@nextui-org/react";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [locationFocus, setLocationFocus] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);
  const [register, setRegister] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  }

  const handleUsernameFocus = () => {
    setUsernameFocus(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  const handleNameFocus = () => {
    setNameFocus(true);
  };

  const handleLocationFocus = () => {
    setLocationFocus(true);
  };

  const handlePhoneNumberFocus = () => {
    setPhoneNumberFocus(true);
  };

  const handelUsernameBlur = () => {
    setUsernameFocus(false);
  }

  const handlePasswordBlur = () => {
    setPasswordFocus(false);
  }

  const handleNameBlur = () => {
    setNameFocus(false);
  }

  const handleLocationBlur = () => {
    setLocationFocus(false);
  }

  const handlePhoneNumberBlur = () => {
    setPhoneNumberFocus(false);
  }

  return (
    <div className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-sm bg-[#fff9e6] rounded-[41px] shadow-[13px_17px_9.2px_#ffe50040] p-8">
        <Space height={"15px"} />
        <Image
            className="flex justify-center items-center"
            alt="Vector"
            src="https://ucarecdn.com/7430de67-5e06-447a-9a27-386343f0f4cf/"
          />
        <Space height={"10px"} />
        {register ? (
          // Register Section
          <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-normal flex justify-center items-center">
              تسجيل
            </p>
            <Space height={"20px"} />
            <input
              type="text"
              placeholder={usernameFocus ? "" : "اسم المستخدم"}
              value={username}
              onChange={handleUsernameChange}
              onFocus={handleUsernameFocus}
              onBlur={handelUsernameBlur}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <input
              type="text"
              placeholder={nameFocus ? "" : "الاسم الحقيقي"}
              value={name}
              onChange={handleNameChange}
              onFocus={handleNameFocus}
              onBlur={handleNameBlur}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <input
              type="password"
              placeholder={passwordFocus ? "" : "كلمة المرور"}
              value={password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <input
              type="text"
              placeholder={locationFocus ? "" : "الموقع"}
              value={location}
              onChange={handleLocationChange}
              onFocus={handleLocationFocus}
              onBlur={handleLocationBlur}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <input
              type="text"
              placeholder={phoneNumberFocus ? "" : "رقم الهاتف"}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onFocus={handlePhoneNumberFocus}
              onBlur={handlePhoneNumberBlur}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <p>
              I already have an account{" "}
              <span
                className="cursor-pointer text-red-500"
                onClick={() => setRegister(false)}
              >
                Login
              </span>
            </p>
          </div>
        ) : (
          // Login Section
          <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-normal flex justify-center items-center">
              تسجيل الدخول
            </p>
            <Space height={"20px"} />
            <input
              type="text"
              placeholder={usernameFocus ? "" : "اسم المستخدم"}
              value={username}
              onChange={handleUsernameChange}
              onFocus={handleUsernameFocus}
              onBlur={handelUsernameBlur}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
            />
            <Space height={"20px"} />
            <input
              type="password"
              placeholder={passwordFocus ? "" : "كلمة المرور"}
              value={password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
            />
            <Space height={"20px"} />
            <button className="w-[110px] h-12 bg-[#FFE559] rounded-xl ">
              {" "}
              تسجيل الدخول
            </button>
            <Space height={"10px"} />
            <p>
              I don't have an account{" "}
              <span
                className="cursor-pointer text-red-500"
                onClick={() => setRegister(true)}
              >
                Register
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
