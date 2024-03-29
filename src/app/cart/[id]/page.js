"use client";
import React, { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import useStore from "@/app/store";
import AppContainer from "../../components/container/container";
import { Space } from "../../components/space/Space";
import { TiPlus, TiMinus } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { Modal } from "@/app/components/modal/Modal";
import axios from "axios";

function Page({ params }) {
  const idP = params.id;
  const { cart, setCart, setUser, user } = useStore();
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [kicker, setKicker] = useState(false);
  const [note, setNote] = useState(null);
  const [showLoader, setShowLoader] = useState(false); // State for showing loader
  const router = useRouter();

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
    setId(localStorage.getItem("id"));
  }, []);

  const handleDelete = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/kitchens/" + id);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // If new quantity is zero, remove the item from the cart
    if (newQuantity === 0) {
      const updatedCart = cart.filter((item) => item.id !== itemId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
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
    }
  };

  const sideClick = () => {
    router.push("/kitchens/" + id);
  };

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const Model = (event) => {
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode(token));
    } else {
      setKicker(true);
    }
  }, []);

  const handelSingIn = () => {
    router.push("/login");
  };

  const handelHome = () => {
    router.push(`/kitchens/${id}`);
  };

  const handelOrder = async () => {
    try {
      setLoading(true);
      setShowLoader(true); // Show loader when starting order process
      const token = localStorage.getItem("token");
      if (!token) {
        setIsModalOpen(true);
        return;
      }

      const newCart = cart.map((item) => ({
        ...item,
        quantity: quantities[item.id] || 1,
      }));

      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      const response = await axios.post(
        "https://star-food-b8w8.vercel.app/api/orders",
        {
          items: newCart,
          userId: user.userId,
          totalPrice: totalPrice,
          note: note,
          kitchenId: parseInt(idP),
          status: "Pending",
        }
      );
      //take order into delivery page
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      setLoading(false);
      setShowLoader(false); // Hide loader after order process is complete
      router.push(`/delivery/${user.userId}`);
    }
  };

  return (
    <div className="bg-[#FBFAF4] h-fit px-3">
      {showLoader && ( // Conditionally render loader
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="loader"></div>
        </div>
      )}
      <Space height={"2rem"} />
      <div className="bg-white border-b-2 fixed top-0 w-full z-10 h-12 px-3">
        <AppContainer>
          <div className="text-3xl flex items-center justify-between h-12">
            <div className="cursor-pointer" onClick={(event) => Model(event)}>
              <FaTrash />
            </div>
            <p onClick={sideClick} className="cursor-pointer flex">
              السلة
              <MdArrowForwardIos />
            </p>
          </div>
        </AppContainer>
      </div>
      <Space height={"1rem"} />
      <AppContainer>
        {cart.map((item) => (
          <div
            key={item.id}
            className="w-full h-[object-fit] flex flex-col items-center mt-3"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-3 items-center justify-center text-3xl rounded-xl flex items-center justify-center w-[100px]">
                <p
                  className="hover:scale-110 duration-300 cursor-pointer bg-yellow-100 p-1 rounded-md h-[30px] w-[30px] flex items-center justify-center"
                  onClick={() => {
                    const newQuantity =
                      quantities[item.id] > 1 ? quantities[item.id] - 1 : 0;
                    handleQuantityChange(item.id, newQuantity);
                  }}
                >
                  <TiMinus />
                </p>
                <p className="font-sans font-semibold cursor-default">
                  {quantities[item.id] || 1}
                </p>
                <p
                  className="hover:scale-110 duration-300 cursor-pointer bg-yellow-100 p-1 rounded-md h-[30px] w-[30px] flex items-center justify-center"
                  onClick={() => {
                    const newQuantity = (quantities[item.id] || 1) + 1;
                    handleQuantityChange(item.id, newQuantity);
                  }}
                >
                  <TiPlus />
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-end justify-end mr-3">
                  <p className="text-2xl">{item.name}</p>
                  <p>
                    د.ع
                    <span className="text-red-500 font-sans font-semibold text-xl">
                      {item.price}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-end rounded-3xl h-24 w-24">
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    className="rounded-3xl object-cover h-[100px] w-[100px] z-0"
                  />
                </div>
              </div>
            </div>
            <hr className="w-full mt-2 border-1" />
          </div>
        ))}
        <div className="mt-4 flex items-start justify-end">
          <p className="text-2xl font-bold">
            <span className="text-[#FF0000] text-3xl font-sans font-semibold">
              {totalPrice.toFixed(2)}
            </span>{" "}
            السعر الكلي: د.ع
          </p>
        </div>
        <Space height={"10px"} />
      </AppContainer>
      <div className="bg-white border-t-2 fixed w-full bottom-0 left-0 right-0 z-10 flex items-center justify-center h-[fit-content]">
        {/* footer */}
        <div className="flex items-center justify-center w-full max-w-screen-lg ">
          <div className="text-3xl flex flex-col w-full gap-3 px-3">
            <input
              placeholder="الملاحظات"
              dir="rtl"
              onChange={(e) => setNote(e.target.value)}
              className="placeholder:text-center w-full outline-none placeholder:text-gray-700 p-2 rounded-2xl bg-gray-300 mt-3"
            />
            <button
              className="text-3xl font-bold p-2 bg-yellow-400 rounded-2xl w-full"
              onClick={handelOrder}
            >
              تأكيد الطلب
            </button>
            <Space height={"3px"} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed bg-white p-4 z-50 mt-2 rounded-2xl shadow-custom"
          style={{ top: modalPosition.top, left: modalPosition.left }}
        >
          <div className="text-3xl">هل تريد مسح السلة؟</div>
          <div className="flex justify-end mt-4 gap-3">
            <button
              className="text-2xl font-bold h-[40px] w-[60px] bg-yellow-400 rounded-xl"
              onClick={() => setIsModalOpen(false)}
            >
              الغاء
            </button>
            <button
              className="text-2xl font-bold h-[40px] w-[60px] bg-yellow-400 rounded-xl"
              onClick={handleDelete}
            >
              مسح
            </button>
          </div>
        </div>
      )}
      <Modal open={kicker} onOk={handelSingIn} onClose={handelHome}>
       يرجى تسجيل الدخول لأتمام عملية الطلب
      </Modal>
    </div>
  );
}

export default Page;
