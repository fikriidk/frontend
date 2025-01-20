import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import MasterFooterAdmin from "../components/masterFooterAdmin";
import MasterNavbarAdmin from "../components/masterNavbarAdmin";
import MasterSidebar from "../components/masterSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function DetailSupplier() {
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);
  const [productData, setProductData] = useState(null);
  const authToken = Cookies.get("authToken");

  const { id } = useParams();

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axios.get(
          "https://backend.ptwpi.com/api/supplier/" + id,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Include the token in the request headers
            },
          }
        );
        console.log(response)
        setProductData(response.data.data);
      } catch (error) {
        console.error("Error fetching Supplier data:", error);
      }
    };

    fetchSupplierData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth >= 640);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  if (!productData) {
    // Return loading or error state while waiting for data
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100 h-full flex flex-col min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white z-50 fixed top-0 h-full md:block transition-transform duration-200 ease-in-out ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MasterSidebar />
      </div>

      {openSidebar && (
        <div
          className="fixed inset-0 bg-black z-40 transition-opacity duration-200 ease-in-out opacity-50 md:hidden"
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}

      {/* Navbar */}
      <MasterNavbarAdmin
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      {/* Content */}
      <div className="flex-grow h-full ml-4 md:ml-80 pt-10 mr-4">
        <div className="grid grid-cols-4 gap-8 bg-white mb-6 py-6 pl-6 rounded-lg shadow-md ">
          <Typography className="col-span-2 flex items-center">
            Detail Supplier
          </Typography>
        </div>

        {/* Detail Product */}
        <div className="bg-white rounded-lg shadow-md grid grid-cols-12 p-8">
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Company Name</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.company_name}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Company Email</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.company_email}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Company Phone Number</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">{productData.company_whatsapp_number}</div>
          <div className="text-red-500 col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Category Company</Typography>
            <span>:</span>
          </div>
          <div className="text-red-500 col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.company_category}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Province</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.province}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>City</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.city}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Address</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.address}
          </div>
          <div className="text-red-500 col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Product Name</Typography>
            <span>:</span>
          </div>
          <div className="text-red-500 col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.product_name}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Brand Name</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.brand}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Stock</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.stock}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Volume</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.volume}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Price</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.price}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Description</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.description}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Image Product</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            <img src={productData.link_image} />
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Name PIC</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.name}
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-4 ">
            <Typography>Email PIC</Typography>
            <span>:</span>
          </div>
          <div className="col-span-12 lg:col-span-9 pb-4 font-bold">
            {productData.company_email}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-10">
        <MasterFooterAdmin />
      </div>
    </div>
  );
}
