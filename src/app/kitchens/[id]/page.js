"use client";
import React from "react";
import Container from "@/app/components/container/container";
import { Space } from "@/app/components/space/Space";
import Header from "@/app/components/header/Header";
import Category from "@/app/components/category/category";
import Product from "@/app/components/product/Product";

function Page() {
  return (
    <div className="bg-[#FBFAF4] h-[100vh]">
      <Header />
      <Container>
        <Space height={"3rem"} />
        <p className="text-6xl font-normal flex justify-end items-end">
          مطبخ نجمة
        </p>
        <Space height={"3rem"} />
        <Category />
        <Space height={"3rem"} />``
        <Product />
      </Container>
    </div>
  );
}

export default Page;
