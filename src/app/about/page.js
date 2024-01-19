import React from "react";
import Navpar from "../components/header/Navpar";
import AppContainer from "../components/container/container";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Space } from "@/app/components/space/Space";
import { GiPointing } from "react-icons/gi";
function About() {
  return (
    <>
    {/* لا توجد عبقرية دون مسحة الجنون */}
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
    </>
  );
}

export default About;
