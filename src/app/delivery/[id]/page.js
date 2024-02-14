"use client";
import React from "react";
import Navpar from "../../components/header/Navpar";
import DeliveryStatus from "@/app/components/deliveryStatus/deliveryStatus";

function Delivery({ params }) {
  const id = params.id;
  return (
    <>
      <Navpar />
      <DeliveryStatus id={id} />
    </>
  );
}

export default Delivery;
