"use client";
import Header from "@/app/components/dashborad/Header/header";
import { Image } from "@nextui-org/react";
import AppContainer from "@/app/components/dashborad/Container/container";
import { useEffect, useState } from "react";
import { Space } from "@/app/components/space/Space";
import {
  Button,
  Modal,
  Table,
  Input,
  Typography,
  Popconfirm,
  Select,
} from "antd";
import { FaEdit } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "@nextui-org/react";
import axios from "axios";

const { Text } = Typography;

export default function Home({ params }) {
  const id = params.id;
  const [userDetails, setUserDetails] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [list, setList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
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
  // get product
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let url = `http://localhost:3000/api/dashboard/orders?id=${id}`;
        let response = await axios.get(url);
        const orders = response.data.orders;

        // Fetch user details for each order
        const userDetailsPromises = orders.map(async (order) => {
          const userId = order.userId;
          const userResponse = await axios.get(
            `http://localhost:3000/api/dashboard/users?id=${userId}`
          );
          const user = userResponse.data.users;
          return { ...order, user }; // Combine order data with user details
        });

        const ordersWithUserDetails = await Promise.all(userDetailsPromises);
        setList(ordersWithUserDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, refresh]);

  //delete
  const handleDeleteClick = async (id) => {
    try {
      axios.delete(`http://localhost:3000/api/dashboard/orders/${id}`);
      setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  //edit
  const handleChange = (value, id) => {
    setSelectedProductId(id);

    if (id) {
      try {
        let url = `http://localhost:3000/api/dashboard/orders/${id}`;
        axios
          .put(url, { status: value })
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
    }

    setSelectedProductId(null);
  };

  // const kitchen = localStorage.getItem("kitchenId");
  useEffect(() => {
    // Log userDetails after userDetails has been updated
    console.log("Updated UserDetails:", userDetails);
    console.log(
      "User Name:",
      userDetails.length > 0 ? userDetails[0].name : "N/A"
    );
  }, [userDetails]);
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div className="text-xl flex flex-col text-end">
          {Array.isArray(record.user) && record.user.length > 0 && (
            <>
              <p className="font-sans text-semibold text-2xl">
                {record.user[0].name}
              </p>
              <p>{record.user[0].phoneNumber}</p>
              <p>{record.user[0].location}</p>
            </>
          )}
        </div>
      ),
    },
    {
      title: "itmes",
      key: "items",
      render: (_, record) => (
        <p className="text-xl text-end">
          {record.items.map((item) => (
            <p className="text-xl">{item.name}</p>
          ))}
        </p>
      ),
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_, record) => (
        <p className="text-xl">
          {record.items.map((item) => (
            <p className="text-xl">x{item.quantity}</p>
          ))}
        </p>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) => (
        <p className="text-xl">
          {record.items.map((item) => (
            <p className="text-xl">
              <span className="text-red-700">{item.price}</span> د.ع
            </p>
          ))}
        </p>
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => (
        <p className="text-xl">
          <span className="text-red-700">{record.totalPrice}</span> د.ع
        </p>
      ),
    },
    {
      title: "Note",
      key: "note",
      render: (_, record) => (
        <p className="text-xl">
          {record.note ? record.note : <span className="text-gray-400">N/A</span>}
        </p>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Select
          defaultValue={record.status}
          className="w-32 h-10 text-2xl text-center font-bold font-sans "
          style={{ width: 120 }}
          onChange={(value) => handleChange(value, record.id)}
          options={[
            { value: "Pending", label: "Pending" },
            { value: "Preparing", label: "Preparing" },
            { value: "Delivered", label: "Delivered" },
          ]}
        />
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
        <Table
          columns={columns}
          dataSource={list.map((item) => ({ ...item, key: item.id }))} // Add key prop here
          loading={loading}
        />
      </AppContainer>
    </>
  );
}
