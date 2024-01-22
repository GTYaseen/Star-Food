import { Modal, Button } from "antd";
import React from "react";

const ProductModal = ({ product, isOpen, onClose }) => {
  return (
    <Modal
      title={product.name}
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose} className="bg-yellow-200 modbtn">
          الرجوع
        </Button>,
      ]}
     >
      <p className="text-2xl"> {product.description}</p>
    </Modal>
  );
};

export default ProductModal;
