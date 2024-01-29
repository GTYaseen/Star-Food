"use client";
import React, { useEffect, useState } from "react";
import Navpar from "../components/header/Navpar";
import AppContainer from "../components/container/container";
import { Space } from "../components/space/Space";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Delivery() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined" || !user) {
      return;
    }
    setUser(jwt_decode(token));
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://star-food-b8w8.vercel.app/api/orders/${user.userId}`
        );
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error("Failed to fetch orders:", response.data.error);
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [user]);
  console.log(orders);
  console.log(user);
  // const { orderId } = router.query || {};

  // const getOrderStatus = (orderId) => {
  //   const order = orders.find((order) => order.id === parseInt(orderId));
  //   return order ? order.status : null;
  // };

  // const getStatusMessage = (status) => {
  //   switch (status) {
  //     case "Pending":
  //       return "Your order is pending.";
  //     case "Delivered":
  //       return "Your order has been delivered.";
  //     case "Preparing":
  //       return "Your order is being prepared.";
  //     default:
  //       return "Unknown status.";
  //   }
  // };

  return (
    <>
      <Navpar />
      <AppContainer>
        <Space height="2rem" />
        {loading ? (
          // Render a loading indicator here
          <p>Loading...</p>
        ) : (
          orders.map((order) => (
            <Card
              key={order.id}
              className="ml-6 rounded-[30px] overflow-hidden w-[98%] h-[40vh] flex justify-end items-center shadow-custom border-1 border-solid border-gray-300"
            >
              <CardBody className="p-4 items-center">
                <button className="text-xl bg-gray-300 py-2 rounded-md ml-auto border w-[100%] h-[40px] border-solid border-gray-300">
                  المجموع
                </button>
              </CardBody>
              <div
                style={{
                  width: "900px",
                  height: "1px",
                  backgroundColor: "#ccc",
                }}
              />
              <CardFooter className="p-4 flex justify-end items-center">
                <button className="text-xl bg-gray-300 px-10 py-2 rounded-md w-[450px] h-[40px] border border-solid border-gray-300">
                  قيد الانتضار
                </button>
                <Space width="2rem" />
                <button
                  onClick={() => getStatusMessage(status)}
                  className="bg-yellow-300 text-xl px-10 py-2 rounded-md w-[450px] h-[40px] border border-solid border-yellow-300"
                >
                  متابعة التسوق
                </button>
              </CardFooter>
            </Card>
          ))
        )}
      </AppContainer>
    </>
  );
}

export default Delivery;
