import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
 // You can use any icon or emoji

const ProductCard = ({ store, img }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = () => {
    setIsFavourite((prev) => !prev);
  };

  return (
    <div className="relative w-[230px] h-[260px] bg-white shadow-2xl rounded-lg">
      {/* ❤️ Favourite Button */}
      


      {/* Product Image */}
      <div className="h-[50%] w-full flex justify-center items-center">
        hhh<img src={img} alt={store.name} />
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{store.name}</h3>
        <p className="text-sm">Cashback: {store.cashback}</p>
      </div>
    
};

export default ProductCard;
