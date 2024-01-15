"use client";
import React, { useState } from "react";
import { Space } from "@/app/components/space/Space";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  const router = useRouter();
  const handleInputFocus = (setter) => {
    setter(true);
  };

  const handleInputBlur = (setter) => {
    setter(false);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      // Handle successful login
      const token = response.data.token;
      localStorage.setItem("token", token);
      alert("Login successful");
      router.push("/kitchens/1");
    } catch (error) {
      console.error("Error logging in", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", error.message);
      }
    }
  };
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        username,
        password,
        name,
        location,
        phoneNumber,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      alert("Registration successful");
      router.push("/kitchens/1");
    } catch (error) {
      console.log("Error registering user", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", error.message);
      }
    }
  };
  return (
    <div className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-sm bg-[#fff9e6] rounded-[41px] shadow-[13px_17px_9.2px_#ffe50040] p-8">
        <Space height={"15px"} />
        <center>
          <Image
            className="flex justify-center items-center"
            alt="Vector"
            src="https://ucarecdn.com/7430de67-5e06-447a-9a27-386343f0f4cf/"
          />
        </center>
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
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => handleInputFocus(setUsernameFocus)}
              onBlur={() => handleInputBlur(setUsernameFocus)}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <input
              type="text"
              placeholder={nameFocus ? "" : "الاسم الحقيقي"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => handleInputFocus(setNameFocus)}
              onBlur={() => handleInputBlur(setNameFocus)}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <input
              type="password"
              placeholder={passwordFocus ? "" : "كلمة المرور"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleInputFocus(setPasswordFocus)}
              onBlur={() => handleInputBlur(setPasswordFocus)}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <input
              type="text"
              placeholder={locationFocus ? "" : "الموقع"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => handleInputFocus(setLocationFocus)}
              onBlur={() => handleInputBlur(setLocationFocus)}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <input
              type="text"
              placeholder={phoneNumberFocus ? "" : "رقم الهاتف"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onFocus={() => handleInputFocus(setPhoneNumberFocus)}
              onBlur={() => handleInputBlur(setPhoneNumberFocus)}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <button
              className="w-[110px] h-12 bg-[#FFE559] rounded-xl hover:scale-105 duration-300"
              onClick={handleRegister}
            >
              {" "}
              تسجيل
            </button>
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
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => handleInputFocus(setUsernameFocus)}
              onBlur={() => handleInputBlur(setUsernameFocus)}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <input
              type="password"
              placeholder={passwordFocus ? "" : "كلمة المرور"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleInputFocus(setPasswordFocus)}
              onBlur={() => handleInputBlur(setPasswordFocus)}
              className="w-[400px] h-12 border rounded-xl bg-[#FFE559] text-black placeholder-[#000000] focus:outline-none text-end p-2 "
              dir="auto"
            />
            <Space height={"20px"} />
            <button
              className="w-[110px] h-12 bg-[#FFE559] rounded-xl hover:scale-105 duration-300"
              onClick={handleLogin}
            >
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
