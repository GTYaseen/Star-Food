import React, { useEffect, useState } from "react";
import AppContainer from "@/app/components/container/container";
import { Space } from "@/app/components/space/Space";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Modal, Rate } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import useStore from "@/app/store";

export default function Old({ id }) {
  const router = useRouter();
  const { setUser } = useStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kitchen, setKitchen] = useState([]);
  const [Open, SetOpen] = useState(false);
  const [feedback, SetFeedback] = useState("");
  const [value, setValue] = useState(0.5);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      return;
    } else {
      console.log(token);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
    }
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/old?id=${id}`
        );
        if (response.data && response.data.order) {
          setOrders(response.data.order);
        } else {
          console.error("Failed to fetch orders:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchKitchen = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/kitchen`);
        if (response.data.success) {
          setKitchen(response.data.kitchens);
        } else {
          console.error("Failed to fetch kitchen:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching kitchen:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
    fetchKitchen();
  }, [id]);
  const handleOk = async () => {
    SetOpen(false);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/orders/${selectedOrderId}`, // Use selectedOrderId here
        { feedback, stars: value, commented: true } // Include feedback and rating in the request body
      );
      console.log("Feedback submitted successfully:", response.data);
      // Optionally, you can perform any actions after submitting feedback, such as updating state or displaying a success message
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Optionally, handle errors, display error messages, etc.
    }
  };
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <>
      <AppContainer>
        <Space height="2rem" />
        {loading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-yellow-200 shadow-custom border-none rounded-[30px] h-[200px]"></div>
              <Space height={"1rem"} />
              <div className="bg-yellow-200 border-none rounded-[30px] h-[200px]"></div>
              <Space height={"1rem"} />
            </div>
          ))
        ) : (
          <>
            {orders.length > 0 ? (
              orders.map((item) => {
                const kitchenItem = kitchen.find(
                  (k) => k.id === item.kitchenId
                );
                return (
                  <Card
                    key={item.id}
                    className="ml-6 border-2 border-black rounded-[30px] overflow-hidden p-4 mb-5 h-fit  flex justify-end items-center shadow-custom border-1 border-solid border-gray-300"
                  >
                    <CardBody className="p-4 items-start justify-between flex flex-row">
                      <div>
                        <p className="text-2xl font-sans font-semibold">
                          Order Id: {item.id}
                        </p>
                      </div>
                      {kitchenItem && (
                        <div className="flex items-center justify-end gap-4">
                          <div className="flex flex-col items-end justify-center">
                            <p className="text-2xl">{kitchenItem.name}</p>
                            <p className="text-xl text-gray-500">
                              {kitchenItem.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-center bg-white rounded-2xl p-2">
                            <Image
                              src={kitchenItem.image}
                              width={100}
                              height={100}
                              className="rounded-full object-cover h-[100px] w-[100px] z-0 border-2 border-solid border-gray-300"
                            />
                          </div>
                        </div>
                      )}
                    </CardBody>
                    <div className="text-xl bg-gray-300 px-3 rounded-md w-[900px] h-[40px] border border-solid border-gray-300 flex justify-between items-center">
                      <p>
                        <span className="text-2xl font-sans font-semibold">
                          {item.totalPrice}
                        </span>
                        د.ع
                      </p>
                      <p>المجموع</p>
                    </div>
                    <Space height={"10px"} />
                    <div
                      style={{
                        width: "900px",
                        height: "1px",
                        backgroundColor: "#ccc",
                      }}
                    />
                    <CardFooter className="p-4 flex justify-end items-center">
                      <div className="text-xl bg-gray-300 px-10 py-2 rounded-md w-[450px] h-[40px] border border-solid border-gray-300 text-center">
                        {item.status === "Pending" ? (
                          <p>قيد الانتظار</p>
                        ) : item.status === "Preparing" ? (
                          <p>جاري التحضير</p>
                        ) : item.status === "Delivered" ? (
                          <p>تم التوصيل</p>
                        ) : (
                          ""
                        )}
                      </div>
                      <Space width="2rem" />
                      {item.commented ? (
                        <div className="bg-yellow-300 text-center text-xl px-10 py-2 rounded-md w-[450px] h-[40px] border border-solid border-yellow-300">
                          تم التقييم
                        </div>
                      ) : (
                        <button
                          className="bg-yellow-300 text-xl px-10 py-2 rounded-md w-[450px] h-[40px] border border-solid border-yellow-300"
                          onClick={() => {
                            SetOpen(true);
                            setSelectedOrderId(item.id); // Store the id of the current order when the button is clicked
                          }}
                        >
                          ألتقييم
                        </button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <p className="text-2xl text-right"> ..ليس لديك طلب</p>
            )}
          </>
        )}
      </AppContainer>
      <Modal
        title="ألتقييم"
        centered
        open={Open}
        onOk={handleOk}
        className="hover:outline-none"
        cancelButtonProps={{
          style: {
            outline: "none",
            "&:hover": { outline: "none" },
          },
        }}
        okButtonProps={{ style: { backgroundColor: "yellow", color: "black" } }}
        onCancel={() => SetOpen(false)}
        style={{ textAlign: "center" }}
      >
        <div className="flex flex-col">
          <Rate
            allowHalf
            defaultValue={value} // Pass the value state variable here
            onChange={(newValue) => setValue(newValue)} // Update the value state on change
            style={{ fontSize: "30px" }}
          />
          <input
            placeholder="التعليق"
            value={feedback}
            onChange={(e) => SetFeedback(e.target.value)}
            className="border-2 border-solid border-gray-300 rounded-md p-2 mt-4 outline-none text-center text-2xl"
          />
        </div>
      </Modal>
    </>
  );
}
