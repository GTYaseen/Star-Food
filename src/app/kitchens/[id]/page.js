"use client";
import React from "react";
import { useEffect, useState } from "react";
import Container from "@/app/components/container/container";
import { Space } from "@/app/components/space/Space";
import Header from "@/app/components/header/Header";
import Product from "@/app/components/product/Product";
import Category from "@/app/components/category/Category";
import { decodeToken } from "@/app/auth";

function Page() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    } else {
      setUser(decodeToken(token));
    }
  }, []);
  return (
    <div className="bg-[#FBFAF4] ">
      <Header user={user} />
      <Container>
        <Space height={"3rem"} />
        <p className="text-6xl font-normal flex justify-end items-end">
          مطبخ نجمة
        </p>
        <Space height={"3rem"} />
        <Category />
        <Space height={"3rem"} />
        <Product />
      </Container>
    </div>
  );
}

export default Page;
