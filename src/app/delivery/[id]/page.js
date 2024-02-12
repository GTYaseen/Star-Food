"use client";
import React, { useEffect, useState } from "react";
import Navpar from "../../components/header/Navpar";
import AppContainer from "../../components/container/container";
import { Space } from "../../components/space/Space";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useStore from "@/app/store";
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
