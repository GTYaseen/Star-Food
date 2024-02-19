"use client";

import React, { useState, useEffect } from "react";
import Navpar from "../components/header/Navpar";
import AppContainer from "../components/container/container";
import FavButton from "../components/favBtn/favBtn";
import { Space } from "../components/space/Space";
import { Image, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useStore from "../store";
import axios from "axios";

function watchAllKitchen() {
  const [kitchens, setKitchens] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Favorite, setFavorite, user, setUser } = useStore();

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      return;
    } else {
      console.log(token);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
    }
  }, []);

  const getKitchens = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://star-food-b8w8.vercel.app/api/kitchen`);
      if (response.data.success === true) {
        setKitchens(response.data.kitchens);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getKitchens();
  }, []);

  const handleFavoritesClick = (id) => {
    router.push(`/favorites/${id}`);
  };

  const handleCardClick = (id) => {
    router.push(`/kitchens/${id}`);
  };
  useEffect(() => {
    let fav = localStorage.getItem("fav");
    if (fav) setFavorite(JSON.parse(fav));
  }, []);

  return (
    <>
      <Navpar />
      <div className="w-full h-full bg-[#FBFAF4] mih-screen">
        <AppContainer>
          <Space height={"2rem"} />
          <div className="gap-[10px] grid grid-cols-2 sm:grid-cols-4 rounded-3xl mx-4">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-yellow-200 border-none rounded-3xl w-[200px] h-[250px]"></div>
                    <Space height={"5px"} />
                    <div className="bg-yellow-200 border-none rounded-3xl w-[200px] h-3"></div>
                    <Space height={"5px"} />
                    <div className="bg-yellow-200 border-none rounded-3xl w-[200px] h-3"></div>
                    <Space height={"5px"} />
                  </div>
                ))
              : kitchens.map((item) => (
                  <div key={item.id}>
                    <Card
                      key={item.id}
                      shadow="3xl"
                      onClick={() => handleCardClick(item.id)}
                      className="bg-white border-none rounded-3xl w-[200px] h-[250px] ml-6 shadow-custom transition-transform transform hover:scale-105 active:scale-110"
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
                      <div className="flex justify-between w-full p-[10px]">
                        <div className="flex items-center p-0 justify-center h-[full] w-[30px] pl-3">
                          <FavButton
                            item={item}
                            onClick={() => handleFavoritesClick(item.id)}
                          />
                        </div>
                        <div
                          className="flex flex-col items-end mr-[10px] cursor-pointer text-end w-[150px]"
                          onClick={() => handleCardClick(item.id)}
                        >
                          <p className="text-[20px]">{item.name}</p>

                          <span className="text-[16px] mt-[10px]">
                            {item.description}
                          </span>
                        </div>
                      </div>
                      <Space height={"5px"} />
                    </Card>
                  </div>
                ))}
          </div>
        </AppContainer>
      </div>
    </>
  );
}

export default watchAllKitchen;
