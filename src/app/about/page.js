import React from "react";
import Navpar from "../components/header/Navpar";
import AppContainer from "../components/container/container";
import { FaRegStar } from "react-icons/fa";
import { Space } from "@/app/components/space/Space";
import { LuChefHat } from "react-icons/lu";
function About() {
  return (
    <>
      {/* :) لا توجد عبقرية دون مسحة الجنون */}
      <Navpar />
      <Space height={"3rem"} />
      <AppContainer>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFF0A2",
            padding: "10px",
          }}
        >
          <p className="text-3xl text-shadow">
            ولأن النجوم مميزة دائماّ هنالك مطبخ بنكهة عراقية لطاهية نجمة تصنع
            الاطباق التقليدية والمطورة بطريقة مميزة ستدمن تجربة تلك الاطباق من
            أول مرة <FaRegStar />
          </p>
        </div>
      </AppContainer>
      <Space height={"2px"} />
      <AppContainer>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFF0A2",
            padding: "10px",
          }}
        >
          <p className="text-3xl text-shadow "> س/ ماهي ميزة المشروع ؟</p>
          <h1 className="text-2xl text-shadow">
            تم تصميم هذا التطبيق ليضم اصحاب مطابخ تحب عرض عملها و وصفاتها <br />
            سيكون لكل مطبخ صفحة تضم مايحب عرضه بشكل مميز <LuChefHat />
          </h1>
        </div>
      </AppContainer>
      <Space height={"2px"} />
      <AppContainer>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFF0A2",
            padding: "10px",
          }}
        >
          <p className="text-3xl text-shadow "> س/ من هو صاحب المشروع ؟</p>
          <h1 className="text-4xl text-shadow">?</h1>
        </div>
      </AppContainer>
    </>
  );
}

export default About;
