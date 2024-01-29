"use client";
import React, { useEffect, useState } from "react";
import Navpar from "../../components/header/Navpar";
import AppContainer from "../../components/container/container";
import { Space } from "../../components/space/Space";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Delivery({ params }) {
  const id = params.id;
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders?id=${id}`
        );
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
    fetchOrders();
  }, []);


  return (
    <>
      <Navbar />
      <AppContainer>
        {orders.length > 0 ? (
          orders.map((item) => (
            <Card
              key={item.id}
              className="ml-6 rounded-[30px] overflow-hidden w-[98%] h-[40vh] flex justify-end items-center shadow-custom border-1 border-solid border-gray-300"
            >
              {/* Add content for the Card component here */}
            </Card>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </AppContainer>
    </>
  );  
}

export default Delivery;
  // const getStatusMessage = () => {
  //   if (orders && orders.length > 0) {
  //     const orderStatus = orders[0].status;
  //     switch (orderStatus) {
  //       case "Pending":
  //         return "طلبك معلق";
  //       case "Delivered":
  //         return "لقد تم تسليم طلبك";
  //       case "Preparing":
  //         return "طلبك قيد الاعداد";
  //       default:
  //         return "قيد الانتضار";
  //     }
  //   } else {
  //     // Handle the case where orders is empty or undefined
  //     return "No orders available.";
  //   }
  // };

  // return (
  //   <>
  //     <Navpar />
  //     <AppContainer>
  //       <Space height="2rem" />

  //       {loading ? (
  //         <p className="text-xl">Loading...</p>
  //       ) : (
  //         <>
  //           {orders.length > 0 ? (
  //             orders.map((item) => (
  //               <Card
  //                 key={item.id}
  //                 className="ml-6 rounded-[30px] overflow-hidden w-[98%] h-[40vh] flex justify-end items-center shadow-custom border-1 border-solid border-gray-300"
  //               >
  //                 <CardBody className="p-4 items-center">
  //                   {item.kitchen ? (
  //                     <div className="flex items-center justify-between">
  //                       <div>
  //                         <Image
  //                           src={order.kitchen.image}
  //                           width={100}
  //                           height={100}
  //                           className="rounded-3xl object-cover h-[100px] w-[100px] z-0"
  //                         />
  //                         <p className="text-xl">{order.kitchen.name}</p>
  //                         <p className="text-xl">{order.kitchen.description}</p>
  //                       </div>
  //                     </div>
  //                   ) : null}
  //                 </CardBody>
  //                 <button className="text-xl bg-gray-300 px-10 py-2 rounded-md w-[900px] h-[40px] border border-solid border-gray-300">
  //                   المجموع{item.totalPrice} د.ع
  //                 </button>
  //                 <Space height={"10px"} />
  //                 <div
  //                   style={{
  //                     width: "900px",
  //                     height: "1px",
  //                     backgroundColor: "#ccc",
  //                   }}
  //                 />
  //                 <CardFooter className="p-4 flex justify-end items-center">
  //                   <button className="text-xl bg-gray-300 px-10 py-2 rounded-md w-[450px] h-[40px] border border-solid border-gray-300"></button>
  //                   <Space width="2rem" />
  //                   <button className="bg-yellow-300 text-xl px-10 py-2 rounded-md w-[450px] h-[40px] border border-solid border-yellow-300">
  //                     متابعة التسوق
  //                   </button>
  //                 </CardFooter>
  //               </Card>
  //             ))
  //           ) : (
  //             <p>No orders available.</p>
  //           )}
  //         </>
  //       )}
  //     </AppContainer>
  //   </>
  // );