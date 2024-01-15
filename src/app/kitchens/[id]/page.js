"use client";
import React from "react";
import { useEffect, useState } from "react";
import Container from "@/app/components/container/container";
import { Space } from "@/app/components/space/Space";
import Header from "@/app/components/header/Header";
import Product from "@/app/components/product/Product";
import Category from "@/app/components/category/Category";
import { decodeToken } from "@/app/auth";

async function getData(id) {
  const product = await fetch(`https://localhost:3000/api/kitchens/${id}`);
  if (!product.ok) {
    throw new Error("Failed to fetch data");
  }
  return product.json();
}

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;

  const data = await getData(id);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.name,
    description: data.description,
    openGraph: {
      images: [data.image, ...previousImages],
    },
  };
}

export default async function kitchens({ params }) {
  let data = await getData(params.id);
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
          {data.name}
        </p>
        <Space height={"3rem"} />
        <Category data={data} />
        <Space height={"3rem"} />
        <Product data={data} />
      </Container>
    </div>
  );
}
