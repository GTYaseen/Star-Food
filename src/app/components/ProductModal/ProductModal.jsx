import { Modal, Button } from "antd";
import React from "react";

const ProductModal = ({ product, isOpen, onClose }) => {
  return (
    <Modal
      title={<p className="text-2xl font-default text-center">{product.name}</p>}
      open={isOpen}
      onCancel={onClose}
      width={"400px"}
      key={product.id}
      footer={[
        <button className="bg-[#FFD143] h-[45px] w-[75px] hover:scale-110 duration-300 text-2xl rounded-xl border-2" onClick={onClose}>
          أغلاق
        </button>,
      ]}
    >
      <div>
        <p className="text-2xl text-end"> {product.description}</p>
      </div>
    </Modal>
  );
};

export default ProductModal;
