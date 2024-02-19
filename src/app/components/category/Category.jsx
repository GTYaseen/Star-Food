"use client";
import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { useState, useEffect, Suspense } from "react";
import { Card, Image } from "@nextui-org/react";
import { Space } from "@/app/components/space/Space";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Category = ({ id }) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://star-food-b8w8.vercel.app/api/category?id=${id}`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error("Image failed to load");
    setImageLoaded(true);
  };

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${id}`);
  };


  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <GrFormPrevious
            className="text-4xl text-[#FFD143] cursor-pointer"
          />
          <p className="text-3xl text-[#FFD143] drop-shadow-lg cursor-pointer">
            مشاهدة الكل
          </p>
        </div>
        <p className="text-3xl font-normal drop-shadow-lg">الاصناف</p>
      </div>
      <Space height={"1rem"} />
      <ul className="flex flex-row gap-5 overflow-y-auto">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <li key={index} className="flex-shrink-0">
                <div onClick={handleCardClick}>
                  <Card
                    isFooterBlurred
                    radius="lg"
                    className="border-none h-[150px] w-[150px]"
                  >
                    <div className="animate-pulse bg-yellow-200 rounded-3xl h-32 w-32"></div>
                  </Card>
                  <div className="animate-pulse bg-yellow-200 rounded-3xl h-4 w-32" />
                  <Space height={"1rem"} />
                </div>
              </li>
            ))
          : category.map((item) => (
              <li key={item.id} className="cursor-pointer flex-shrink-0">
                <div>
                  <Card
                    key={item.id}
                    isFooterBlurred
                    radius="lg"
                    className="border-none h-[150px] w-[150px] transition-transform transform hover:scale-105 active:scale-110"
                  >
                    <Suspense
                      fallback={
                        <div>
                          <div className="w-6 h-6 animate-spin" />
                        </div>
                      }
                    >
                      <Image
                        alt={item.name}
                        src={item.image}
                        loading="lazy" // Use loading attribute for lazy loading
                        className="w-full object-cover h-[140px] rounded-t-3xl rounded-b-none"
                        onLoad={handleImageLoad} // Event when the image is loaded
                        onError={handleImageError} // Event when there is an error loading the image
                      />
                      {!imageLoaded && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black opacity-50">
                          <div className="w-6 h-6 animate-spin text-[#FFD143] text-2xl font-bold">
                            <AiOutlineLoading3Quarters />
                          </div>
                        </div>
                      )}
                    </Suspense>
                  </Card>
                  <p className="text-2xl font-normal text-center">
                    {item.name}
                  </p>
                  <Space height={"1rem"} />
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Category;
