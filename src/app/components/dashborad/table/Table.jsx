import React, { useState } from "react";
import "./table.css";
import Image from "next/image";
import { Modal } from "../modal/Modal";
import { Space } from "../space/Space";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Input, Popconfirm } from "antd";

export const Table = ({ columns, list, itemsPerPage = 10 }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false); // Added state for edit modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editFormData, setEditFormData] = useState({
    image: "",
    name: "",
    price: "",
    categoryId: "",
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showModal = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleEditClick = (item) => {
    setSelectedImage(item.image);
    setEditFormData({
      id: item.id, // Make sure to include the id property
      image: item.image,
      name: item.name,
      price: item.price,
      categoryId: item.categoryId,
    });
    setOpenEdit(true);
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "categoryId" && /^\d+$/.test(value)
        ? parseInt(value, 10)
        : value;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };
  const handleOkEdit = (editFormData) => {
    const url = `https://star-food-bay.vercel.app/api/products/${editFormData.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    });
    console.log(editFormData.id);
    setOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = (item) => {
    const url = `https://star-food-bay.vercel.app/api/products/${item.id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log("Deleting item:", item);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.key}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.key === "image" ? (
                    <button onClick={() => showModal(item[column.key])}>
                      <Image
                        src={item[column.key]}
                        alt={item.name}
                        style={{
                          borderRadius: "50%",
                          height: "70px",
                          width: "70px",
                        }}
                        width={70}
                        height={70}
                      />
                    </button>
                  ) : (
                    item[column.key]
                  )}
                </td>
              ))}
              <td key="actions">
                <div className="btn-group">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="default"
                  >
                    <FaEdit />
                  </button>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(item)}
                  >
                    <button className="secondary">
                      <MdDelete />
                    </button>
                  </Popconfirm>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center>
        <div className="pagination">
          {Array.from({ length: Math.ceil(list.length / itemsPerPage) }).map(
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </center>
      <Space height="20px" />
      {/* Image Modal */}
      <Modal
        title={"Image"}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedImage && (
          <Image src={selectedImage} alt={"Image"} width={500} height={500} />
        )}
      </Modal>
      {/* Edit Modal */}
      <Modal
        title={"Edit Product"}
        open={openEdit}
        onOk={() => handleOkEdit(editFormData)}
        onCancel={handleCancelEdit}
      >
        {selectedImage && (
          <Image src={selectedImage} alt={"Image"} width={350} height={350} />
        )}
        <p>name</p>
        <Input
          name="name"
          value={editFormData.name}
          onChange={handleEditInputChange}
        />
        <p>price</p>
        <Input
          name="price"
          value={editFormData.price}
          onChange={handleEditInputChange}
        />
        <p>image</p>
        <Input
          name="image"
          value={editFormData.image}
          onChange={handleEditInputChange}
        />
        <p>categoryId</p>
        <Input
          name="categoryId"
          value={editFormData.categoryId}
          onChange={handleEditInputChange}
        />
      </Modal>
    </div>
  );
};
