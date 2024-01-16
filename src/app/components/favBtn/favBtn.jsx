import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const FavButton = ({ onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    onToggleFavorite();
  };

  return (
    <div onClick={toggleFavorite} className="text-2xl flex items-end justify-center ml-[10px] mt-[15px] cursor-pointer text-[#FFD143] drop-shadow">
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
};

export default FavButton;
