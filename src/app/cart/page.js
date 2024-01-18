"use client";
import React, { useEffect, useState } from "react";
import Navpar from "@/app/components/header/Navpar";
import { Card, CardBody, Image } from "@nextui-org/react";
import useStore from "@/app/store";
import AppContainer from "../components/container/container";
import { Space } from "../components/space/Space";
import { TiDelete, TiPlus, TiMinus } from "react-icons/ti";

function Page() {
  const { cart, setCart } = useStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Calculate total price whenever quantities or cart items change
    const newTotalPrice = cart.reduce((acc, item) => {
      const quantity = quantities[item.id] || 1;
      return acc + item.price * quantity;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [quantities, cart]);
  useEffect(() => {
    let storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const handleDelete = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));

    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="bg-[#FBFAF4] h-[100vh]">
      <Space height={"3rem"} />
      <Navpar />
      <AppContainer>
        {cart.map((item) => (
          <div
            key={item.id}
            className="w-full h-[object-fit] bg-white rounded-3xl flex flex-col items-center mt-6 shadow-custom"
          >
            <div className="grid grid-cols-5 items-center text-right gap-7 text-2xl w-full">
              <TiDelete
                onClick={() => handleDelete(item.id)}
                className="text-4xl ml-5 cursor-pointer text-red-500 hover:text-red-700 hover:scale-125 duration-300"
              />
              <div className="flex gap-3 items-center justify-center text-3xl shadow-custom rounded-xl bg-white flex items-center justify-center w-[100px]">
                <p
                  className="hover:scale-110 duration-300 cursor-pointer"
                  onClick={() => {
                    const newQuantity = Math.max(
                      1,
                      quantities[item.id] - 1 || 0
                    );
                    handleQuantityChange(item.id, newQuantity);
                  }}
                >
                  <TiMinus />
                </p>
                <p className="font-sans font-semibold cursor-default">
                  {quantities[item.id] || 1}
                </p>
                <p
                  className="hover:scale-110 duration-300 cursor-pointer"
                  onClick={() => {
                    const newQuantity = (quantities[item.id] || 1) + 1;
                    handleQuantityChange(item.id, newQuantity);
                  }}
                >
                  <TiPlus />
                </p>
              </div>
              <p className="font-sans font-semibold">{item.price}</p>
              <p>{item.name}</p>
              <div className="flex items-center justify-end rounded-3xl h-24 w-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-3xl object-cover h-[100px] w-[100px]"
                />
              </div>
            </div>
          </div>
        ))}
         <div className="mt-4 flex justify-end">
          <p className="text-2xl font-bold"><span className="text-rose-400 text-3xl font-sans font-semibold">{totalPrice.toFixed(2)}</span> السعر الكلي: د.ع</p>
        </div>
      </AppContainer>
      
    </div>
  );
}

export default Page;
