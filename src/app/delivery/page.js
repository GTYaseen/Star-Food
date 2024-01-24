"use client";
import React, { useEffect, useState } from "react";
import Navpar from "../components/header/Navpar";
import AppContainer from "../components/container/container";
import axios from "axios";
import { Card, Text } from "@nextui-org/react";

function Delivery() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orders");
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error("Failed to fetch orders:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navpar />
      <AppContainer>
        {/* {orders.map((order) => (
          <Card key={order.id} hoverable style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3>Order #{order.id}</h3>
                <p>Kitchen: {order.kitchenName}</p>
              </div>
            </div>
            <hr />
            <div>
              {order.items.map((item) => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </div>
              ))}
            </div>
            <hr />
            <div>
              <Text b>Total Price: {order.totalPrice}</Text>
            </div>
          </Card>
        ))} */}
      </AppContainer>
    </>
  );
}

export default Delivery;
