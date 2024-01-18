import React from "react";
import Navpar from "../components/header/Navpar";
import AppContainer from "../components/container/container";

function About() {
  return (
    <div style={{ textAlign: "center" }}>
      <Navpar />
      <AppContainer />
      <p className="text-3xl "> نحن اجمل تيم في الدونيا</p>
    </div>
  );
}

export default About;
