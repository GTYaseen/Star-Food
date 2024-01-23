import { Modal, Button } from "antd";
import React from "react";

const ProductModal = ({ product, isOpen, onClose }) => {
  return (
    <Modal
      title={product.name}
      open={isOpen}
      onCancel={onClose}
      width={"400px"}
      footer={[
        <Button
          key="back"
          onClick={onClose}
          className="text-1xl font-bold h-[40px] w-[60px] bg-yellow-400 rounded-xl"
        >
          الرجوع
        </Button>,
      ]}
    >
      <div style={{ border: "2px solid #eee", padding: "16px" }}>
        <p className="text-2xl"> {product.description}</p>
      </div>
    </Modal>
  );
};

export default ProductModal;
