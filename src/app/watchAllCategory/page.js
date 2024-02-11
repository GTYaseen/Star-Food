"use client";

import React from 'react'
import { useState, useEffect} from "react";
import { Card, Image } from "@nextui-org/react";
import { Space } from "@/app/components/space/Space";
import axios from "axios";
import useStore from '../store';
import Navpar from '../components/header/Navpar';
import AppContainer from '../components/container/container';

function watchAllCategory() {
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
    <AppContainer >
    <div>watchAll</div>
    </AppContainer>
    </>
  )
}

export default watchAllCategory;