"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardFooter, Image, CardBody } from "@nextui-org/react";
import { GrFormPrevious } from "react-icons/gr";
import { Space } from "@/app/components/space/Space";
import userStore from "@/app/store";
import AddCart from "@/app/components/addCart/AddCart";

const Product = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setProductStates, productStates } = userStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://starserver.onrender.com/api/client/product?id=${id}`
        );
        setProducts(response.data);
        // Initialize productStates with isAdded for each product as false
        const initialProductStates = response.data.reduce((acc, product) => {
          acc[product.id] = false;
          return acc;
        }, {});
        setProductStates(initialProductStates);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <GrFormPrevious className="text-4xl text-[#FFD143]" />
          <p className="text-3xl text-[#FFD143] drop-shadow-lg">مشاهدة الكل</p>
        </div>
        <p className="text-3xl font-normal drop-shadow-lg">ألاطباق</p>
      </div>
      <Space height={"1rem"} />
      {/* product */}
      <Space height={"1rem"} />
      <div className="gap-[10px] grid grid-cols-5 sm:grid-cols-4 rounded-3xl ">
        {loading
          ? // Loading skeletons for Cards
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-yellow-200 border-none rounded-3xl w-[230px] h-[180px]"></div>
                <Space height={"5px"} />
                <div className="bg-yellow-200 border-none rounded-3xl w-[230px] h-3"></div>
                <Space height={"5px"} />
                <div className="bg-yellow-200 border-none rounded-3xl w-[230px] h-3"></div>
                <Space height={"5px"} />
              </div>
            ))
          : // Actual Cards when data is loaded
            products.map((item, index) => (
              <Card
                key={index}
                shadow="sm"
                className="bg-white border-none rounded-3xl w-[230px] shadow-custom m-[10px]"
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
                  <AddCart item={item} />
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
    </div>
  );
};

export default Product;
