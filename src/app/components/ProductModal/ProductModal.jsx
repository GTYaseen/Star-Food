import { Modal } from "antd";
import React from "react";

const ProductModal = ({ product, isOpen, onClose }) => {
  return (
    <Modal
      title={
        <p className="text-2xl font-default text-center">{product.name}</p>
      }
      open={isOpen}
      onCancel={onClose}
      width={"400px"}
      key={product.id}
      footer={[
        <button
          className="bg-[#FFD143] h-[45px] w-[75px] hover:scale-110 duration-300 text-2xl rounded-xl border-2"
          onClick={onClose}
        >
          أغلاق
        </button>,
      ]}
    >
      <div>
        <p className="text-2xl text-end border-2 rounded-2xl bg-white p-3 bg-[url('https://ucarecdn.com/cb2f9d86-3c12-47ed-a4f2-9558ba371319/-/preview/500x500/-/quality/smart_retina/-/format/auto/')]">
          {" "}
          {product.description}
        </p>
      </div>
    </Modal>
  );
};

export default ProductModal;
