import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { useState, useEffect } from "react";
import { Card, CardFooter, Image, Button, CardBody } from "@nextui-org/react";
import { Space } from "@/app/components/space/Space";
import axios from "axios";

function SkeletonLoading() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-60 h-60 bg-gray-300 animate-pulse rounded-3xl gap-2"></div>
      <div className="w-60 h-5 mt-2 bg-gray-300 animate-pulse rounded-full"></div>
    </div>
  );
}

export default function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/category`);
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
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLoading key={index} />
            ))
          : category.map((item, index) => (
              <li key={item.id} className="cursor-pointer flex-shrink-0">
                <div>
                  <Card
                    key={index}
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
    </div>
  );
}
