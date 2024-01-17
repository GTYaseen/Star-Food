"use client";
import React from "react";
import { useState, useEffect } from "react";

import FavButton from "./components/favBtn/favBtn";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Space } from "./components/space/Space";
import { GrFormPrevious } from "react-icons/gr";
import axios from "axios";
import Navpar from "./components/header/Navpar";
import { useRouter } from "next/navigation";
import AppContainer from "./components/container/container";

function Home() {
  const [kitchens, setKitchens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  const getKitchens = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/kitchen`);
      if(response.data.success === true) {
        setKitchens(response.data.kitchens);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (id) => {
    const updatedKitchens = kitchens.map((kitchen) =>
      kitchen.id === id
        ? { ...kitchen, isFavorite: !kitchen.isFavorite }
        : kitchen
    );

    setKitchens(updatedKitchens);

    const updatedFavorites = updatedKitchens.filter(
      (kitchen) => kitchen.isFavorite
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    getKitchens();
  }, []);
  const width = 1000;
  const handleCardClick = (id) => {
    router.push(`/kitchens/${id}`);
  };

  return (
    <div className="w-full h-full bg-[#FBFAF4] h-screen">
      
      <Navpar />
      <AppContainer>
        {/*Modal*/}
        <Space height={"3rem"} />
        <div
          className=" ml-6 rounded-[45px]  overflow-hidden w-[98%] h-[25vh] drop-shadow-lg flex justify-end items-center"
          style={{ backgroundColor: "#FFE559", margin: "5px 5px" }}
        >
          <div className="flex flex-col items-end mr-9">
            <p className="text-3xl">تخفيضات تصل الى %20</p>
            <p className="text-2xl mt-2">..أطلب الان</p>
          </div>
        </div>
        <Space height={"2rem"} />
        <div className="flex justify-between mx-5">
          <div className="flex items-center">
            <GrFormPrevious className="text-4xl text-[#FFD143]" />
            <p className="text-2xl text-[#FFD143] drop-shadow-lg">
              مشاهدة الكل
            </p>
          </div>
          <p className="text-2xl font-normal drop-shadow-lg ">المطابخ</p>
        </div>
        <Space height={"1rem"} />
        {/* Kitchens */}
        <div className="gap-[10px] grid grid-cols-2 sm:grid-cols-4 rounded-3xl mx-4">
          {kitchens.map((item) => (
            <div key={item.id}>
              <Card
                key={item.id}
                shadow="3xl"
                className="bg-white border-none rounded-3xl w-[200px] h-[250px] ml-6 shadow-custom"
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="xl"
                    radius="lg"
                    width="100%"
                    height="100%"
                    alt={item.image}
                    className="w-full object-cover h-[160px] rounded-t-2xl rounded-b-none cursor-pointer"
                    src={item.image}
                    onClick={() => handleCardClick(item.id)}
                  />
                </CardBody>
                <Space height={"4px"} />
                <CardFooter className="text-small justify-between">
                  <FavButton
                    className=" mt-[20px]"
                    onToggleFavorite={() => handleToggleFavorite(item.id)}
                  />
                  <div
                    className="flex flex-col items-end mr-[10px] cursor-pointer"
                    onClick={() => handleCardClick(item.id)}
                  >
                    <p className="text-[20px]">{item.name}</p>

                    <span className="text-[16px] mt-[10px]">
                      {item.description}
                    </span>
                  </div>
                </CardFooter>
                <Space height={"5px"} />
              </Card>
            </div>
          ))}
        </div>
      </AppContainer>
    </div>
  );
}

export default Home;
