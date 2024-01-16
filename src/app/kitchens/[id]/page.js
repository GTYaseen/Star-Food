"use client";
import React from "react";
import Container from "@/app/components/container/container";
import Header from "@/app/components/header/Header";
import Category from "@/app/components/category/Category";
import Product from "@/app/components/product/Product";
import Space from "@/app/components/space/Space";

function Page({ params }) {
  const id = params.id;

  return (
    <div className="bg-[#FBFAF4] ">
      <Header />
      <Container>
        <Space height={"3rem"} />
        <p className="text-6xl font-normal flex justify-end items-end">
          مطبخ نجمة
        </p>
        <Space height={"3rem"} />
        <Category id={id} />
        <Space height={"3rem"} />
        <Product id={id} />
      </Container>
    </div>
  );
}

export default Page;
