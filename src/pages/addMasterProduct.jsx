import React, { useState, useEffect } from "react";
import MasterSidebar from "../components/masterSidebar";
import {
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import MasterFooterAdmin from "../components/masterFooterAdmin";
import MasterNavbarAdmin from "../components/masterNavbarAdmin";
import { useDropzone } from "react-dropzone";
import { FaCloudArrowUp } from "react-icons/fa6";
import Axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function AddMasterProduct() {
  const [categoryName, setCategoryName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: "image/*",
    onDrop: handleFileUpload,
  });

  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth >= 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if categoryName or selectedFile is empty
    if (!categoryName || !selectedFile) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const authToken = Cookies.get("authToken");

      if (!authToken) {
        throw new Error("Access token not found in cookies");
      }

      const formData = new FormData();
      formData.append("category", categoryName);
      formData.append("category_image", selectedFile);

      const response = await Axios.post(
        "https://backend.ptwpi.co.id/api/categories/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Category successfully added:", response.data);

      navigate("/master-produk");
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  };

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
          className="fixed inset-0 bg-black z-40 transition-opacity duration-200 ease-in-out opacity-50 md:hidden "
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}

      {/* Navbar */}
      <MasterNavbarAdmin
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      {/* Content Product */}
      <div className="flex-grow h-full ml-4 md:ml-80 pt-10 mr-4">
        <form onSubmit={handleFormSubmit}>
          <div className="grid md:grid-cols-4 gap-2 bg-white md:mr-6 mb-6 pt-6 pb-6 px-6 rounded-lg shadow-md">
            <div className="md:col-span-4">
              <Typography variant="h5" className="pb-10">
                Tambah Kategori Produk
              </Typography>
            </div>
            <div className="md:col-span-4">
              <Typography variant="small" className="">
                Nama Kategori Produk
              </Typography>
            </div>
            <div className=" md:col-span-4 rounded-lg">
              <Input
                color="indigo"
                size="lg"
                placeholder="Nama Produk"
                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                onChange={(e) => setCategoryName(e.target.value)}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="md:col-span-4">
              <Typography variant="small" className="">
                Foto Kategori Produk
              </Typography>
            </div>
            <div
              className="md:col-span-4 border border-gray-400 w-full rounded-lg  h-[150px] flex justify-center items-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <div className="text-center flex flex-col items-center">
                  <FaCloudArrowUp className="w-8 h-8 text-wpiblue-500" />
                  <p className="mt-2">
                    {selectedFile
                      ? `File: ${selectedFile.name}`
                      : "Drag and drop file here or click to select file"}
                  </p>
                </div>
              )}
            </div>
            <div className="md:col-span-4 flex justify-end items-center pt-6">
              <a href="/master-produk" className="flex gap-2 text-wpigreen-500 ml-4 text-sm">
                <Button className="bg-red-400 flex">
                  Batal
                </Button>
              </a>
              <a href="/master-produk" className="flex gap-2 text-wpigreen-500 ml-4 text-sm">
                <Button type="submit" className="bg-wpigreen-50 flex">
                  Simpan
                </Button>
              </a>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="pt-10">
        <MasterFooterAdmin />
      </div>
    </div>
  );
}
