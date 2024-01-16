"use client";
import { useEffect, useState } from "react";
import { Container } from "@/app/components/container/container";
import Navpar, { Header } from "@/app/components/header/Navpar";
import { Space } from "@/app/components/space/Space";
import Category from "@/app/components/category/Category";
import Product from "@/app/components/product/Product";
import { decodeToken } from "@/app/auth";

function Page({ params }) {
  const id = params.id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(decodeToken(token));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://starserver.onrender.com/api/client/kitchen?id=${id}`
        );
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const width = 1000;

  return (
    <div className="bg-[#FBFAF4] h-screen">
      <Navpar user={user} />
      <div className={`w-full max-w-[${width}px] mx-auto`}>
        <Space height={"3rem"} />
        {/* Use conditional rendering to check if data exists before accessing */}
        {data.length > 0 && (
          <p className="text-6xl font-normal flex justify-end items-end">
            {data[0].name}
          </p>
        )}
        <Space height={"3rem"} />
        <Category id={id} />
        <Space height={"3rem"} />
        <Product id={id} />
        <Space height={"3rem"} />
      </div>
    </div>
  );
}

export default Page;
