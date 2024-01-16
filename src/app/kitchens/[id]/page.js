"use client";
import React from "react";
import { useState, useEffect } from "react";
import Container from "@/app/components/container/container";
import { Space } from "@/app/components/space/Space";
import { FiMenu } from "react-icons/fi";
import { GrFormPrevious } from "react-icons/gr";
import axios from "axios";
import { Card, CardFooter, Image, Button, CardBody } from "@nextui-org/react";
import { IoAddCircleSharp } from "react-icons/io5";

function SkeletonLoading() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-60 h-60 bg-gray-300 animate-pulse rounded-3xl gap-2"></div>
      <div className="w-60 h-5 mt-2 bg-gray-300 animate-pulse rounded-full"></div>
    </div>
  );
}

function Page() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
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
    const fetchData2 = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/product?cat=${search}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchData2();
  }, [search, refresh]);

  return (
    <div className="bg-[#FBFAF4] h-[100vh]">
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
        <ul className="flex flex-row gap-10 overflow-y-auto">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonLoading key={index} />
              ))
            : category.map((item) => (
                <li key={item.id} className="cursor-pointer flex-shrink-0">
                  <div>
                    <Card
                      isFooterBlurred
                      radius="lg"
                      className="border-none h-[150px] w-[150px]"
                    >
                      <Image
                        alt={item.name}
                        className="rounded-3xl"
                        height={200}
                        src={item.image}
                        width={200}
                      />
                    </Card>
                    <p className="text-3xl font-normal text-center">
                      {item.name}
                    </p>
                    <Space height={"1rem"} />
                  </div>
                </li>
              ))}
        </ul>
        <Space height={"3rem"} />
        {/*product top*/}
        <div className="flex justify-between">
          <div className="flex items-center">
            <GrFormPrevious className="text-4xl text-[#FFD143]" />
            <p className="text-3xl text-[#FFD143] drop-shadow-lg">
              مشاهدة الكل
            </p>
          </div>
          <p className="text-3xl font-normal drop-shadow-lg ">ألاطباق</p>
        </div>
        <Space height={"1rem"} />
        {/*product*/}
        <Space height={"1rem"} />
        <div className="gap-[5px] grid grid-cols-5 sm:grid-cols-4 rounded-3xl ">
          {products.map((item, index) => (
            <Card
              shadow="sm"
              className="bg-white border-none rounded-3xl w-[230px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.09)]"
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.image}
                  className="w-full object-cover h-[140px] rounded-t-3xl rounded-b-none"
                  src={item.image}
                />
              </CardBody>
              <Space height={"5px"} />
              <CardFooter className="text-small justify-between">
                <IoAddCircleSharp className="text-2xl flex items-end justify-center ml-[10px] mt-[15px] cursor-pointer text-[#FFD143] drop-shadow" />
                <div className="flex flex-col items-end mr-[10px]">
                  <p className="text-[20px]">{item.name}</p>
                  <p>{item.price}</p>
                </div>
              </CardFooter>
              <Space height={"5px"} />
            </Card>
          ))}
        </div>
        <Space height={"3rem"} />
      </Container>
    </div>
  );
}

export default Page;
