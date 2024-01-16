"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import Container from './components/container/container';
import Header from './components/header/Header';
import FavButton from './components/favBtn/favBtn';
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Space } from './components/space/Space';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { GrFormPrevious } from "react-icons/gr";
import axios from 'axios';


function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const getKitchens = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/kitchen?cat=${search}`
      );
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleToggleFavorite = (id) => {
    const updatedKitchens = data.map((kitchen) =>
      kitchen.id === id ? { ...kitchen, isFavorite: !kitchen.isFavorite } : kitchen
    );

    setData(updatedKitchens);

    const updatedFavorites = updatedKitchens.filter((kitchen) => kitchen.isFavorite);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    getKitchens();
  }, [search, refresh]);


  return (
    <Router>
      <>

        <Header />

        <div className=" ml-6 rounded-[45px]  overflow-hidden w-[98%] h-[25vh] drop-shadow-lg" style={{ backgroundColor: '#FFE559', margin: '5px 5px' }}>
          <Card style={{ paddingRight: '5rem' }}>
            <Space height={"2rem"} />
            <CardBody className="text-right">
              <p className="text-xl">تخفيضات تصل الى %20</p>
              <p className="text-lg mt-2">..أطلب الان</p>
            </CardBody>
          </Card>
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
          {data.map((item) => (

            <Link key={item.id} to={`/kitchens/${item.id}`}>
              <Card
                shadow="3xl"
                className="bg-white border-none rounded-3xl w-[200px] h-[250px] custom-shadow ml-6"
              >

                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="xl"
                    radius="lg"
                    width="100%"
                    height="100%"
                    alt={item.image}
                    className="w-full object-cover h-[160px] rounded-t-2xl rounded-b-none"
                    src={item.image}
                  />
                </CardBody>
                <Space height={"4px"} />
                <CardFooter className="text-small justify-between">
                  <FavButton className=" mt-[20px]"
                    onToggleFavorite={() => handleToggleFavorite(item.id)}
                  />
                  <div className="flex flex-col items-end mr-[10px]">
                    <p className="text-[20px]">{item.name}</p>

                    <span className="text-[16px] mt-[10px]">{item.description}</span>
                  </div>
                </CardFooter>
                <Space height={"5px"} />
              </Card>
            </Link>

          ))}

        </div>
      </>
    </Router>
  );
}

export default Home;
