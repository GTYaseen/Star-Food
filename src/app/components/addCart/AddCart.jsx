import React, { useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import useStore from "@/app/store";

function AddCart({ item }) {
  const { cart, setCart } = useStore();

  useEffect(() => {
    // Update cart with item state from localStorage on component mount
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, [setCart]);

  const isItemAdded = cart.some((cartItem) => cartItem.id === item.id);

  const handleCart = () => {
    let newArr = [];

    if (isItemAdded) {
      newArr = cart.filter((el) => el.id !== item.id);
    } else {
      newArr = [...cart, item];
    }

    setCart(newArr);

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(newArr));
  };

  return (
    <div>
      {/* Add to cart button */}
      {isItemAdded ? (
        // Content for true condition
        <IoIosCheckmarkCircle
          className="text-3xl flex items-end justify-center ml-[10px] mt-[15px] text-black lg:hover:scale-150 duration-300"
          onClick={handleCart}
        />
      ) : (
        // Content for false condition
        <IoAddCircleSharp
          className="text-3xl flex items-end justify-center ml-[10px] mt-[15px] cursor-pointer text-[#FFD143] lg:hover:scale-150 duration-300"
          onClick={handleCart}
        />
      )}
    </div>
  );
}

export default AddCart;
