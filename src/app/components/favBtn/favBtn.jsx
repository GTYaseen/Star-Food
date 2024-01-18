"use client";
import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import useStore from "@/app/store";

const FavButton = ({ item }) => {
  const { Favorite, setFavorite } = useStore();

  let fav = Favorite.find((el) => el.id === item.id);
  
  const handleFavorite = () => {
    let newArr = [];
    if (fav) newArr = Favorite.filter((el) => el.id !== item.id);
    else newArr = [...Favorite, item];

    setFavorite(newArr);
    localStorage.setItem("test", JSON.stringify(newArr));
  };
  const heartIcon = fav ? (
    <FaHeart className="hover:scale-150 duration-300 text-yellow-500 shadow-custom" />
  ) : (
    <FaRegHeart className="hover:scale-150 duration-300 shadow-custom" />
  );

  return <button onClick={handleFavorite}
  className=" ml-auto mr-2"
  
  >{heartIcon}</button>;
};
export default FavButton;

