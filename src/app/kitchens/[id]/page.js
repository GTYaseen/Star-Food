"use client";
import React from "react";
import { useState, useEffect } from "react";
import Container from "@/app/components/container/container";
import Headers from "@/app/components/header/Header";
import { Space } from "@/app/components/space/Space";
import { FiMenu } from "react-icons/fi";
import { GrFormPrevious } from "react-icons/gr";
import axios from "axios";
import Image from "next/image";

function SkeletonLoading() {
    return (
      <div className="flex flex-col items-center">
        <div className="w-75 h-75 bg-gray-300 animate-pulse rounded-3xl"></div>
        <div className="w-60 h-5 mt-2 bg-gray-300 animate-pulse rounded-full"></div>
      </div>
    );
  }
  

function Page() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/category?cat=${search}`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, refresh]);

  return (
    <div className="bg-[#FBFAF4] h-lvh">
      <div className="bg-white border-b-2">
        <Container>
          <div className="text-3xl flex items-center justify-end h-12">
            <FiMenu />
          </div>
        </Container>
      </div>
      <Container>
        <Space height={"3rem"} />
        <p className="text-6xl font-normal flex justify-end items-end">
          مطبخ نجمة
        </p>
        <Space height={"3rem"} />
        {/*category top*/}
        <div className="flex justify-between">
          <div className="flex items-center">
            <GrFormPrevious className="text-4xl text-[#FFD143]" />
            <p className="text-3xl text-[#FFD143] drop-shadow-lg">
              مشاهدة الكل
            </p>
          </div>
          <p className="text-3xl font-normal drop-shadow-lg ">الاصناف</p>
        </div>
        {/*category*/}
        <Space height={"1rem"} />
        <div className="flex gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonLoading key={index} />
              ))
            : category.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <div className="w-75 h-75">
                    <Image
                      src={item.image}
                      width={200}
                      height={200}
                      className="rounded-3xl"
                    />
                    <p className="text-3xl">{item.name}</p>
                  </div>
                </div>
              ))}
        </div>
      </Container>
    </div>
  );
}

export default Page;
