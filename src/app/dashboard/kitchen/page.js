"use client";
import Header from "@/app/components/dashborad/Header/header";
import { Image } from "@nextui-org/react";
import AppContainer from "@/app/components/dashborad/Container/container";
import { useEffect, useState } from "react";
import { Space } from "@/app/components/space/Space";
import { Button, Modal, Table, Input, Typography, Popconfirm } from "antd";
import { FaEdit } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "@nextui-org/react";
import axios from "axios";

const { Text } = Typography;

export default function Home() {
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [list, setList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({}); // Define state for edit form data
  const [selectedImage, setSelectedImage] = useState(null); // Define state for selected image
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({});
  const [loading, setLoading] = useState(true);

  const showModal = (id) => {
    setSelectedProductId(id);
    const selectedProduct = list.find((product) => product.id === id);
    setEditFormData(selectedProduct);
    setSelectedImage(selectedProduct.image);
  };

  const handleCancel = () => {
    setSelectedProductId(null);
    setOpen(false);
  };

  const handleEditInputChange = (e) => {
    // Update the edit form data on input change
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddInputChange = (e) => {
    setNewData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  // get kitchens
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let url = `https://star-food-bay.vercel.app/api/kitchen?id=${search}`;
        let response = await axios.get(url);
        setList(response.data.kitchens);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, refresh]);
  //add kitchen
  const handleAddClick = () => {
    try {
      let url = `https://star-food-bay.vercel.app/api/kitchen`;
      axios.post(url, newData);
      setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setOpen(false);
    setRefresh(refresh + 1);
  };
  //delete
  const handleDeleteClick = async (id) => {
    try {
      axios.delete(`https://star-food-bay.vercel.app/api/dashboard/kitchen/${id}`);
      setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  //edit
  const handleEditClick = () => {
    try {
      let url = `https://star-food-bay.vercel.app/api/dashboard/kitchen/${selectedProductId}`;
      axios
        .put(url, editFormData)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          setRefresh((prevRefresh) => prevRefresh + 1);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setSelectedProductId(null);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image
          src={text}
          alt={text}
          className="rounded-3xl h-20 w-20"
          width={80}
          height={70}
        />
      ),
    },
    {
      title: "name",
      key: "name",
      render: (_, record) => <p className="text-2xl">{record.name}</p>,
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record.id)} size="large">
            <FaEdit />
          </Button>
        </>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Delete the item"
          description="Are you sure to delete this item?"
          okText="Yes"
          cancelText="No"
          okType="danger"
          onConfirm={() => handleDeleteClick(record.id)}
          icon={<QuestionCircleOutlined className="text-red-500" />}
        >
          <Button
            type="primary"
            danger
            size="large"
            className="hover:scale-110"
          >
            <MdDelete />
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => (
        <Link href={`/dashboard/category/${record.id}`}>
          <button className="border-2 p-2 rounded-xl hover:scale-110 hover:bg-slate-300 hover:text-black">
            Category
          </button>
        </Link>
      ),
    },
    {
      title:"Orders",
      key:"Orders",
      render: (_, record) => (
          <Link href={`/dashboard/orders/${record.id}`}>
            <button className="border-2 p-2 rounded-xl hover:scale-110 hover:bg-slate-300 hover:text-black">
              <p>Orders</p>
            </button>
          </Link>
        ),
  }
  ];
  return (
    <>
      <Header />
      <Space height={20} />
      <AppContainer width={1300}>
        <Space width="100%" height="20px" />
        <div className="flex justify-between">
          <Input
            placeholder="Search..."
            //onChange={}
            onPressEnter={(e) => setSearch(e.target.value)}
          />
          <div className="flex">
            <Space width="150px" />
            <Button onClick={() => setOpen(true)} size="large">
              Add +
            </Button>
            <Button
              className="default"
              onClick={() => setRefresh(refresh + 1)}
              size="large"
            >
              <IoIosRefresh />
            </Button>
          </div>
        </div>
        <Space width="100%" height="20px" />
        <Table columns={columns} dataSource={list} loading={loading} />
        <Modal
          title="Product Details"
          open={selectedProductId}
          onOk={handleEditClick}
          onCancel={handleCancel}
        >
          {selectedImage && (
            <Image src={selectedImage} alt={"Image"} width={350} height={350} />
          )}
          <Text>name</Text>
          <Input
            name="name"
            value={editFormData.name}
            onChange={handleEditInputChange}
          />
          <Text>image</Text>
          <Input
            name="image"
            value={editFormData.image}
            onChange={handleEditInputChange}
          />
          <Space height={10} />
          <Button type="link" style={{ fontSize: "20px" }}>
            <FaFileUpload />
          </Button>
        </Modal>
        {/* Add Modal */}
        <Modal
          title="Product Details"
          open={open}
          onOk={handleAddClick}
          onCancel={handleCancel}
          okType="default"
        >
          <Text>name</Text>
          <Input name="name" onChange={handleAddInputChange} />
          <Text>image</Text>
          <Input name="image" onChange={handleAddInputChange} />
          <Text>description</Text>
          <Input name="description" onChange={handleAddInputChange} />
        </Modal>
      </AppContainer>
    </>
  );
}
