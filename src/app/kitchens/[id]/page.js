"use client";
import { useEffect, useState } from "react";
import AppContainer from "@/app/components/container/container";
import Navpar from "@/app/components/header/Navpar";
import { Space } from "@/app/components/space/Space";
import Category from "@/app/components/category/Category";
import Product from "@/app/components/product/Product";
//import { decodeToken } from "@/app/auth";
import { jwtDecode } from "jwt-decode";
import useStore from "@/app/store";
import Cart from "@/app/components/cart/Cart";

function Page({ params }) {
  const id = params.id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { cart, setCart } = useStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == "undefined" || !token) {
      return;
    } else {
      setUser(jwtDecode(token));
    }
  }, []);
  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) setCart(JSON.parse(cart));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/kitchen?id=${id}`
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
  useEffect(() => {
    let id = params.id;
    localStorage.setItem("id", id);
  }, []);

  return (
    <div className="bg-[#FBFAF4] h-[100vh]">
      <Navpar user={user} />
      <AppContainer>
        <Space height={"3rem"} />
        {/* Loading skeleton */}
        {loading ? (
          <>
            <div className="animate-pulse flex items-center justify-end">
              <div className="h-9 bg-yellow-200 w-[250px] rounded-3xl"></div>
            </div>
            <Space height={"3rem"} />
            <Category id={id} />
            <Space height={"3rem"} />
            <Product id={id} />
            <Cart id={id} />
          </>
        ) : (
          <>
            {data.length > 0 && (
              <p className="text-6xl font-normal flex justify-end items-end">
                {data[0].name}
              </p>
            )}
            <Space height={"3rem"} />
            <Category id={id} />
            <Space height={"3rem"} />
            <Product id={id} />
            <Cart id={id} />
          </>
        )}
      </AppContainer>
    </div>
  );
}

export default Page;
