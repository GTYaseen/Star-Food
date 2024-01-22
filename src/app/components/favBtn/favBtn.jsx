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
    <FaHeart className="text-1xl hover:scale-150 duration-300 text-yellow-500 shadow-custom text-xl absolute right-2 -top-2" />
  ) : (
    <FaRegHeart className="hover:scale-150 duration-300 shadow-custom text-xl absolute right-2 -top-2" />
  );

  return <button onClick={handleFavorite}
  className="ml-auto mr-2 relative">
     <div className="relative">
    {heartIcon}
    </div>
    </button>;
  
};
export default FavButton;

