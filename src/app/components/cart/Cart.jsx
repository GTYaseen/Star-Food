import React from "react";
import { IoCartSharp } from "react-icons/io5";
import AppContainer from "../container/container";
import useStore from "@/app/store";
import { Link } from "@nextui-org/react";
export default function Cart({id}) {
  const { cart } = useStore();
  return (
    <div>
      {cart.length > 0 && (
        <div className="bg-white border-t-2 fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center h-12 cursor-pointer">
          <Link href={`/cart/${id}`} className="w-full outline-none">
            <AppContainer>
              <div className="text-3xl flex items-end justify-between h-10">
                <div className="flex items-center justify-center bg-yellow-400 border-none rounded-3xl w-8 h-8">
                  <p className="text-3xl font-normal font-sans pr-[2px] pb-[2px]">
                    {cart.length}
                  </p>
                </div>{" "}
                <p>عرض السلة</p>
                <IoCartSharp
                  className="cursor-pointer text-yellow-400 text-3xl flex items-center justify-center ml-[10px] mt-[15px] text-[#FFD143] drop-shadow"
                />
              </div>
            </AppContainer>
          </Link>
        </div>
      )}
    </div>
  );
}
