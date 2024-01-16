"use client";
import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { useState, useEffect } from "react";
import { Card, Image } from "@nextui-org/react";
import { Space } from "@/app/components/space/Space";
import axios from "axios";

const Category = ({id}) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <p className="text-3xl font-normal drop-shadow-lg ">الاصناف</p>
      </div>
      {/*category*/}
      <Space height={"1rem"} />
      <ul className="flex flex-row gap-10 overflow-y-auto">
        {category.map((item) => (
          <li key={item.id} className="cursor-pointer flex-shrink-0">
            <div>
              <Card
                key={item.id}
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
              <p className="text-3xl font-normal text-center">{item.name}</p>
              <Space height={"1rem"} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Category;
