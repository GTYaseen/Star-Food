"use client";
import React from "react";
import { useState, useEffect } from "react";
import useStore from "../store";
import Navpar from "../components/header/Navpar";
import AppContainer from "../components/container/container";

function watchAllProduct() {
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
      <AppContainer>
        <div>WatchAllProduct</div>
      </AppContainer>
    </>
  );
}

export default watchAllProduct;
