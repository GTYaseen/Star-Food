"use client";
import React from "react";
import { useState, useEffect } from "react";
import FavButton from "./components/favBtn/favBtn";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Space } from "./components/space/Space";
import { GrFormPrevious } from "react-icons/gr";
import { TiWarningOutline } from "react-icons/ti";
import axios from "axios";
import Navpar from "./components/header/Navpar";
import { useRouter } from "next/navigation";
import AppContainer from "./components/container/container";
import useStore from "@/app/store";
import Footer from "./components/footer/footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
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
      const response = await axios.get(
        `https://star-food-b8w8.vercel.app/api/kitchen`
      );
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

  const handlePreviousClick = () => {
    router.push(`/watchAllKitchen`);
  };

  return (
    <div className="w-full h-full bg-[#FBFAF4] mih-screen">
      <Navpar />
      <AppContainer>
        <Space height={"3rem"} />

        <Slider
          dots={true}
          slidesPerRow={true}
          touchMove={true}
          speed={600}
          autoplay={true}
          autoplaySpeed={4000}
          slidesToShow={1}
          slidesToScroll={1}
          swipeToSlide={true}
          className="px-3"
          appendDots={(dots) => (
            <div>
<<<<<<< Updated upstream
              <div className="flex justify-center items-center ">{dots}</div>
=======
              <div className="flex justify-center items-center">{dots}</div>
>>>>>>> Stashed changes
            </div>
          )}
        >
          <div>
            <div
              className="ml-6 rounded-[45px] overflow-hidden w-[98%] h-[15vh] shadow-lg flex justify-end items-center shadow-custom sm:h-[15vh] md:h-[15vh] lg:h-[25vh]"
              style={{ backgroundColor: "#FFE559", margin: "5px 5px" }}
            >
              <div className="flex flex-col items-end mr-9">
                <p className="text-2xl lg:text-3xl">تخفيضات تصل الى %20</p>
                <p className="text-2xl mt-2">..أطلب الان</p>
              </div>
            </div>
          </div>
          {/* second slide */}
          <div>
            <div
<<<<<<< Updated upstream
              className="ml-6 rounded-[45px] overflow-hidden w-[98%] h-[15vh] shadow-lg flex justify-end items-center shadow-custom sm:h-[15vh] md:h-[15vh] lg:h-[25vh]"
              style={{ backgroundColor: "#eee", margin: "5px 5px" }}
            >
              <div className="flex flex-col items-end mr-9 lg:gap-3">
                <p className="text-2xl flex lg:text-4xl ">
                  تحذير
                  <TiWarningOutline className=" text-3xl text-[red]" />
                </p>
                <p className="text-2xl text-end"> ستصاب بأدمان على الطعم </p>
=======
              className=" shadow-custom ml-6 rounded-[45px] overflow-hidden w-[98%] h-[25vh] shadow-lg flex justify-end items-center shadow-custom"
              style={{ backgroundColor: "#eee", margin: "5px 5px" }}
            >
              <div className="flex flex-col items-end mr-9">
                <TiWarningOutline className=" text-3xl text-[red]" />
                <p className="text-3xl">تحذير</p>
                <p className="text-2xl"> ستصاب بأدمان على الطعم </p>
>>>>>>> Stashed changes
              </div>
            </div>
          </div>
        </Slider>

        <Space height={"2rem"} />

        {/* Kitchens Section */}
        <div className="flex justify-between mx-5">
          <div className="flex items-center">
            <div
              className="flex items-center cursor-pointer hover:scale-105 active:scale-110"
              onClick={handlePreviousClick}
            >
              <GrFormPrevious className="text-4xl text-[#FFD143]" />
              <p className="text-2xl text-[#FFD143] drop-shadow-lg">
                مشاهدة الكل
              </p>
            </div>
          </div>
          <p className="text-2xl font-normal drop-shadow-lg ">المطابخ</p>
        </div>
        {/* Kitchens */}
        <Space height={"1rem"} />
        <div className="gap-[10px] grid grid-cols-1 px-5 justify-center items-center xs:grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 ">
          {/*add Loading skeletons for card kitchens */}
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-yellow-200 border-none rounded-3xl w-[318px] h-[215px] xs:w-full xs:h-[250px]"></div>
                  <div className="bg-yellow-200 border-none rounded-3xl w-[318px] h-3 mt-2 xs:w-full"></div>
                  <div className="bg-yellow-200 border-none rounded-3xl w-[318px] h-3 mt-2 xs:w-full"></div>
                </div>
              ))
            : kitchens.map((item) => (
                <div key={item.id}>
                  <Card
                    key={item.id}
                    shadow="3xl"
                    onClick={() => handleCardClick(item.id)}
                    className="bg-white border-none rounded-3xl w-full h-full sx:w-[318px] xs:h-[250px] shadow-custom transition-transform transform hover:scale-105 active:scale-110"
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
                        <p className="text-2xl xs:text-lg">{item.name}</p>

                        <span className="text-[16px] mt-[10px] text-gray-500">
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
      <Footer />
    </div>
  );
}

export default Home;
