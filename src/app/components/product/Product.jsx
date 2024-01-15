import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardFooter, Image, CardBody } from "@nextui-org/react";
import { GrFormPrevious } from "react-icons/gr";
import { IoAddCircleSharp } from "react-icons/io5";
import { Space } from "@/app/components/space/Space";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://star-food-bay.vercel.app/api/product`);
        setProducts(response.data);
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
        <p className="text-3xl font-normal drop-shadow-lg ">ألاطباق</p>
      </div>
      <Space height={"1rem"} />
      {/*product*/}
      <Space height={"1rem"} />
      <div className="gap-[5px] grid grid-cols-5 sm:grid-cols-4 rounded-3xl ">
        {products.map((item, index) => (
          <Card
            key={index}
            shadow="sm"
            className="bg-white border-none rounded-3xl w-[230px] shadow-custom"
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
    </div>
  );
};
export default Product;
