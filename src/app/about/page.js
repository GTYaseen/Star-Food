"use client";

import React, {useEffect} from "react";
import Navpar from "../components/header/Navpar";
import AppContainer from "../components/container/container";
import { FaRegStar } from "react-icons/fa";
import { Space } from "@/app/components/space/Space";
import useStore from "../store";

function About() {
  const {setUser } = useStore();

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
          <Space height={"3rem"} />

          <p className="text-3xl text-shadow">
            ولأن النجوم مميزة دائماً هنالك مطبخ بنكهة عراقية لطاهية نجمة تصنع
            الاطباق التقليدية والمطورة بطريقة مميزة ستدمن تجربة تلك الاطباق من
            أول مرة <FaRegStar />
          </p>

          <Space height={"3rem"} />

          <p className="text-3xl text-shadow "> ماهي ميزة التطبيق؟</p>
          <h1 className="text-3xl text-shadow">
            تم تصميم هذا التطبيق ليضم مجموعة متنوعة من اصحاب المطابخ السحابية
            لعرض عملها و وصفاتها, لكل مطبخ صفحة تضم مايحب عرضه الطاهي بشكل يميزه
            <FaRegStar />
          </h1>
        </AppContainer>
      </div>
    </>
  );
}

export default About;
