"use client";
import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { useState, useEffect } from "react";
import { Card, Image } from "@nextui-org/react";
import { Space } from "@/app/components/space/Space";
import axios from "axios";

const Category = ({id}) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://starserver.onrender.com/api/client/category?id=${id}`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <GrFormPrevious className="text-4xl text-[#FFD143]" />
          <p className="text-3xl text-[#FFD143] drop-shadow-lg">مشاهدة الكل</p>
        </div>
        <p className="text-3xl font-normal drop-shadow-lg">الاصناف</p>
      </div>
      {/*category*/}
      <Space height={"1rem"} />
      <ul className="flex flex-row gap-5 overflow-y-auto">
      {loading ? (
          // Loading skeletons for 6 Cards
          Array.from({ length: 6 }).map((_, index) => (
            <li key={index} className="flex-shrink-0">
              <div>
                <Card isFooterBlurred radius="lg" className="border-none h-[150px] w-[150px]">
                  {/* You can customize the skeleton style based on your preference */}
                  <div className="animate-pulse bg-yellow-200 rounded-3xl h-32 w-32"></div>
                </Card>
                <div className="animate-pulse bg-yellow-200 rounded-3xl h-4 w-32"/>
                <Space height={"1rem"} />
              </div>
            </li>
          ))
        ) : (
          // Actual cards when data is loaded
          category.map((item) => (
            <li key={item.id} className="cursor-pointer flex-shrink-0">
              <div>
                <Card
                  key={item.id}
                  isFooterBlurred
                  radius="lg"
                  className="border-none h-[150px] w-[150px] transition-transform transform hover:scale-105 active:scale-110"
                >
                  <Image
                    alt={item.name}
                    className="rounded-3xl"
                    height={200}
                    src={item.image}
                    width={200}
                  />
                </Card>
                <p className="text-2xl font-normal text-center">{item.name}</p>
                <Space height={"1rem"} />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Category;
