"use client";
import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { Card, CardFooter, Image, CardBody } from "@nextui-org/react";
import { GrFormPrevious } from "react-icons/gr";
import { Space } from "@/app/components/space/Space";
import userStore from "@/app/store";
import { BiDish } from "react-icons/bi";
import { useRouter } from "next/navigation";
import ProductModal from "../productModal/ProductModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AddCart from "../addCart/AddCart";

const Product = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setProductStates, productStates } = userStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://starserver.onrender.com/api/client/product?id=${id}`
        );
        setProducts(response.data);
        // Initialize productStates with isAdded for each product as false
        const initialProductStates = response.data.reduce((acc, product) => {
          acc[product.id] = false;
          return acc;
        }, {});
        setProductStates(initialProductStates);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error("Image failed to load");
    setImageLoaded(true); // Set to true to stop showing the loading indicator in case of an error
  };
  const handleBiDishClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <GrFormPrevious className="text-4xl text-[#FFD143]" />
          <p className="text-3xl text-[#FFD143] drop-shadow-lg">مشاهدة الكل</p>
        </div>
        <p className="text-3xl font-normal drop-shadow-lg">الأطباق</p>
      </div>
      <Space height={"1rem"} />
      {/* product */}
      <Space height={"1rem"} />
      <div className="gap-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded-3xl">
        {loading
          ? // Loading skeletons for Cards
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-yellow-200 border-none rounded-3xl w-[230px] h-[180px]"></div>
                <Space height={"5px"} />
                <div className="bg-yellow-200 border-none rounded-3xl w-[230px] h-3"></div>
                <Space height={"5px"} />
                <div className="bg-yellow-200 border-none rounded-3xl w-[230px] h-3"></div>
                <Space height={"5px"} />
              </div>
            ))
          : // Actual Cards when data is loaded
            products.map((item, index) => (
              <Card
                key={index}
                className="bg-white border-none mx-auto rounded-3xl w-[230px] shadow-custom m-[10px] sm:m-0 sm:mx-auto "
              >
                <CardBody className="overflow-visible p-0">
                  {/* Lazy load the Image component */}
                  <Suspense
                    fallback={
                      <div>
                        <div className="w-6 h-6 animate-spin" />
                      </div>
                    }
                  >
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      className="w-full object-cover h-[140px] rounded-t-3xl rounded-b-none"
                      src={item.image}
                      loading="lazy"
                      onLoad={handleImageLoad} // Event when the image is loaded
                      onError={handleImageError}
                    />
                    {!imageLoaded && (
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black opacity-50">
                        <div className="w-6 h-6 animate-spin text-[#FFD143] text-2xl font-bold">
                          <AiOutlineLoading3Quarters />
                        </div>
                      </div>
                    )}
                  </Suspense>
                </CardBody>
                <Space height={"5px"} />
                <CardFooter className="text-small justify-between">
                  <div className="flex items-center">
                  <Space height={"10px"} /> 
                    <AddCart item={item} />

                    <Space width={"5px"} /> 
                    <BiDish
                      className="text-2xl flex items-end justify-center cursor-pointer ml-[10px] mt-[15px] text-[#FFD143] lg:hover:scale-150 duration-300"

                      onClick={() => handleBiDishClick(item)}
                    />
                  </div>
                  <div className="flex flex-col items-end mr-[10px]">
                    <p className="text-[20px]">{item.name}</p>
                    <p>{item.price}</p>
                  </div>
                </CardFooter>
                <Space height={"5px"} />
              </Card>
            ))}
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <Space height={"3rem"} />
    </div>
  );
};

export default Product;
