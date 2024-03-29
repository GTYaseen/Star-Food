"use client";
import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { Card, CardFooter, Image, CardBody } from "@nextui-org/react";
import { GrFormPrevious } from "react-icons/gr";
import { Space } from "@/app/components/space/Space";
import { Popover } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiQuestionLine } from "react-icons/ri";
import AddCart from "../addCart/AddCart";
import { useRouter } from "next/navigation";

const Product = ({ id, selectedCategoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://star-food-b8w8.vercel.app/api/product?id=${id}`
        );
        setProducts(response.data.product);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const filterProducts = selectedCategoryId
    ? products.filter((product) => product.categoryId === selectedCategoryId)
    : products;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error("Image failed to load");
    setImageLoaded(true);
  };

  const handelWatchAll = () => {
    router.push(`/watchAllProduct/` + id);
  };

  return (
    <div className="bg-[#FBFAF4] px-3">
      <div className="flex justify-between">
        <div
          className="flex items-center cursor-pointer hover:scale-105 active:scale-110"
          onClick={handelWatchAll}
        >
          <GrFormPrevious className="text-4xl text-[#FFD143] " />
          <p className="text-3xl text-[#FFD143] drop-shadow-lg">مشاهدة الكل</p>
        </div>
        <p className="text-3xl font-normal drop-shadow-lg">الأطباق</p>
      </div>
      <Space height={"1rem"} />
      {/* product */}
      <Space height={"1rem"} />
      <div className="flex justify-center items-center">
        <div className="gap-[10px] w-full grid grid-cols-1 px-5 justify-center items-center xs:grid-cols-2  sm:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-yellow-200 border-none rounded-3xl w-[318px] h-[215px] xs:w-full xs:h-[250px]"></div>
                  <div className="bg-yellow-200 border-none rounded-3xl w-[318px] h-3 mt-2 xs:w-full"></div>
                  <div className="bg-yellow-200 border-none rounded-3xl w-[318px] h-3 mt-2 xs:w-full"></div>
                </div>
              ))
              : filterProducts.map((item, index) => (
                <Card
                  key={index}
                  className="bg-white border-none rounded-3xl w-full h-full sx:w-[318px] xs:h-[200] shadow-custom transition-transform transform hover:scale-105 active:scale-110"
                >
                  <CardBody className="overflow-visible p-0">
                    {/* Lazy load the Image component */}
                    <Suspense
                      fallback={
                        <div>
                          <div className="w-6 h-6 animate-spin" />
                        </div>
                      }
                    >
                      <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        className="w-full object-cover h-[140px] rounded-t-3xl rounded-b-none z-0"
                        src={item.image}
                        loading="lazy"
                        onLoad={handleImageLoad} // Event when the image is loaded
                        onError={handleImageError}
                      />
                      {!imageLoaded && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black opacity-50">
                          <div className="w-6 h-6 animate-spin text-[#FFD143] text-2xl font-bold">
                            <AiOutlineLoading3Quarters />
                          </div>
                        </div>
                      )}
                    </Suspense>
                  </CardBody>
                  <Space height={"5px"} />
                  <CardFooter className="text-small justify-between h-fit p-1">
                    <div className="flex items-center justify-start">
                      <AddCart item={item} />
                      <Popover
                        content={
                          <div className="w-[250px] h-[120px] text-xl">
                            {item.description}
                          </div>
                        }
                        title={
                          <div className="text-xl" dir="rtl">
                            ✩مكونات الطبق✩
                          </div>
                        }
                        trigger="click"
                      >
                        <RiQuestionLine className="text-2xl flex items-end justify-center cursor-pointer ml-[10px] mt-[15px] text-[#FFD143] lg:hover:scale-150 duration-300" />
                      </Popover>
                    </div>
                    <div className="flex flex-col items-end justify-center mr-[10px] w-full">
                      <p className="text-xl text-end xs:text-base">{item.name}</p>
                      <p>{item.price}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
        </div>
      </div>
      <Space height={"3rem"} />
    </div>
  );
};

export default Product;
