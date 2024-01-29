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
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/orders`);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.error("Failed to fetch orders:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const { orderId } = router.query || {};

  const getOrderStatus = (orderId) => {
    const order = orders.find((order) => order.id === parseInt(orderId));
    return order ? order.status : null;
  };
  const getStatusMessage = (status) => {
    switch (status) {
      case "Pending":
        return "Your order is pending.";
      case "Delivered":
        return "Your order has been delivered.";
      case "Preparing":
        return "Your order is being prepared.";
      default:
        return "Unknown status.";
    }
  };
  const status = getOrderStatus(orderId);

  return (
    <>
      <Navpar />
      <AppContainer>
        <Space height="2rem" />

        <Card className="ml-6 rounded-[30px] overflow-hidden w-[98%] h-[40vh] flex justify-end items-center shadow-custom border-1 border-solid border-gray-300">
          <CardBody className="p-4 items-center">
            <button className="text-xl bg-gray-300 py-2 rounded-md ml-auto border w-[100%] h-[40px] border-solid border-gray-300">
               المجموع
            </button>
          </CardBody>
          <div
            style={{ width: "900px", height: "1px", backgroundColor: "#ccc" }}/>
          <CardFooter className="p-4 flex justify-end items-center">
            <button className="text-xl bg-gray-300 px-10 py-2 rounded-md w-[450px] h-[40px] border border-solid border-gray-300">
              قيد الانتضار
            </button>
            <Space width="2rem" />
            <button
              onClick={getStatusMessage(status)}
              className="bg-yellow-300 text-xl px-10 py-2 rounded-md w-[450px] h-[40px] border border-solid border-yellow-300"
            >
              متابعة التسوق
            </button>
          </CardFooter>
        </Card>
      </AppContainer>
    </>
  );
}

export default Delivery;
