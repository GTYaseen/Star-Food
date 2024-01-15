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

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
  })
  return (
    <div className="bg-[#FBFAF4] ">
      <Header  />
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
