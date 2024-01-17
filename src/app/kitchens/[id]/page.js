"use client";
import { useEffect, useState } from "react";
import Container from "@/app/components/container/container";
import Navpar from "@/app/components/header/Navpar";
import { Space } from "@/app/components/space/Space";
import Category from "@/app/components/category/Category";
import Product from "@/app/components/product/Product";
import { decodeToken } from "@/app/auth";
import { IoCartSharp } from "react-icons/io5";
import useStore from "@/app/store";

function Page({ params }) {
  const id = params.id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { cart, setCart } = useStore();

  const handleCartModal = (product) => {};
  const [cart, setCart] = useState([]);
  const handleCartUpdate = (updatedCart) => {
    setCart([...updatedCart, ...cart]);
  };
  const handleCartModal = (product) => { };

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
  console.log(cart);
  return (
    <div className="bg-[#FBFAF4] h-full">
      <Navpar user={user} />
      <AppContainer>
        <Space height={"3rem"} />
        {/* Loading skeleton */}
        {loading ? (
          <div className="animate-pulse flex items-center justify-end">
            <div className="h-9 bg-yellow-200 w-[250px] rounded-3xl"></div>
          </div>
        ) : (
          // Actual content when data is loaded
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
            {/* Add to cart button */}
            {cart.length > 0 && (
              <div className="bg-white border-t-2 fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center ">
                <AppContainer>
                  <div className="text-3xl flex items-center justify-between h-12">
                    <div className="flex items-center justify-center bg-yellow-400 border-none rounded-3xl w-10 h-10">
                      <p className="text-3xl font-normal font-sans pr-[2px] pb-[2px]">
                        {cart.length}
                      </p>
                    </div>{" "}
                    <p>عرض السلة</p>
                    <IoCartSharp
                      onClick={handleCartModal}
                      className="cursor-pointer text-yellow-400 text-3xl flex items-center justify-center ml-[10px] mt-[15px] cursor-pointer text-[#FFD143] drop-shadow"
                    />
                  </div>
                </AppContainer>
              </div>
            )}
            <Container >
              {data.length > 0 && (
                <p className="text-6xl font-normal flex justify-end items-end">
                  {data[0].name}
                </p>
              )}
              <Space height={"3rem"} />
              <Category id={id} />
              <Space height={"3rem"} />
              <Product id={id} onCartUpdate={handleCartUpdate} />
              {/* Add to cart button */}
              {cart.length > 0 && (
                <div className="bg-white border-t-2 fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center ">
                  <div
                    className={`w-full max-w-[${width}px] text-center bg-white`}
                  >
                    <div className="text-3xl flex items-center justify-between h-12">
                      <div className="flex items-center justify-center bg-yellow-400 border-none rounded-3xl w-10 h-10">
                        <p className="text-3xl font-normal font-sans pr-[2px] pb-[2px]">{cart.length}</p>
                      </div>{" "}
                      <p>عرض السلة</p>
                      <IoCartSharp
                        onClick={handleCartModal}
                        className="cursor-pointer text-yellow-400 text-3xl flex items-center justify-center ml-[10px] mt-[15px] cursor-pointer text-[#FFD143] drop-shadow"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Container>
          </>
        )}
      </AppContainer>
    </div>
  );
}

export default Page;
