"use client";
import React, { useEffect } from "react";
import Navpar from "../components/header/Navpar";
import AppContainer from "../components/container/container";
import {Card,CardBody,Image,CardFooter} from "@nextui-org/react"
import { Space } from "../components/space/Space";
import FavButton from "../components/favBtn/favBtn";
import useStore from "@/app/store";

const FavoritesPage = () => {
  const { Favorite, setFavorite } = useStore();

  useEffect(() => {
    let fav = localStorage.getItem("test");
    if (fav) setFavorite(JSON.parse(fav));
  }, []);


  return (
    <>
      <div className="w-full h-full bg-[#FBFAF4] h-screen">
        <Navpar />
        <AppContainer>
          <div className="gap-[10px] grid grid-cols-2 sm:grid-cols-4 rounded-3xl mx-4">
            {Favorite?.map((item) => (
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
                      item={item}
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
    </>
  );
};

export default FavoritesPage;
