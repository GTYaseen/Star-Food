"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Card, Image } from "@nextui-org/react";
import { Space } from "@/app/components/space/Space";
import axios from "axios";
import useStore from "../store";
import Navpar from "../components/header/Navpar";
import AppContainer from "@/app/components/container/container";
import { useRouter } from "next/navigation";

const watchAllCategory = ({ id }) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUser } = useStore();
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
  }, [setUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (router.query && router.query.id) {
        try {
          const { id } = router.query;
          const response = await axios.get(
            `http://localhost:3000/api/category?id=${id}`
          );
          setCategory(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    };
  }, [router.query]);

  return (
    <>
      <Navpar />
      <AppContainer>
        <Space height={"1rem"} />
        <div className="text-2xl " dir="rtl">
          الاصناف
        </div>
        <Space height={"1rem"} />
        <ul className="flex flex-row gap-5 overflow-y-auto">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <li key={index} className="flex-shrink-0">
                  <div>
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
                      <Image
                        alt={item.name}
                        src={item.image}
                        className="w-full object-cover h-[140px] rounded-t-3xl rounded-b-none"
                      />
                    </Card>
                    <p className="text-2xl font-normal text-center">
                      {item.name}
                    </p>
                    <Space height={"1rem"} />
                  </div>
                </li>
              ))}
        </ul>
      </AppContainer>
    </>
  );
};

export default watchAllCategory;
