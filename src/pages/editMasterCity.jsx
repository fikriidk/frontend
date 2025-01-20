import React from "react";
import MasterSidebar from "../components/masterSidebar";
import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import MasterFooterAdmin from "../components/masterFooterAdmin";
import MasterNavbarAdmin from "../components/masterNavbarAdmin";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditMasterCity() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [city, setCity] = useState("");
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          throw new Error("Access token not found in cookies");
        }

        const response = await axios.get(
          `https://backend.ptwpi.com/api/cities/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Log the response for debugging
        console.log("API response:", response);

        // Update the state with the fetched province data
        setSelectedProvince(response.data.province_id);
        setCity(response.data.city);
      } catch (error) {
        console.error("Error fetching province data:", error.message);
      }
    };

    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const authToken = Cookies.get("authToken");
  
      if (!authToken) {
        throw new Error("Access token not found in cookies");
      }
  
      const formData = {
        city: city, //  send the city name
        province_id: selectedProvince,
      };
  
      const response = await axios.put(
        `https://backend.ptwpi.com/api/cities/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      console.log("City data successfully updated:", response.data);
      navigate("/master-kota");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Handle validation errors in the frontend
        console.error("Validation errors:", error.response.data.errors);
        // Update state or show error messages to the user
      } else {
        console.error("Error updating city data:", error.message);
      }
    }
  };  

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
                Edit Nama Kota
              </Typography>
            </div>
            <div className="md:col-span-4">
              <Typography variant="small" className="">
                Provinsi
              </Typography>
            </div>
            <div className=" md:col-span-4 rounded-lg">
              <Input
                color="indigo"
                size="lg"
                placeholder="Provinsi"
                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={selectedProvince}
                disabled
              />
            </div>
            <div className="md:col-span-4">
              <Typography variant="small" className="">
                Nama Kota
              </Typography>
            </div>
            <div className=" md:col-span-4 rounded-lg">
              <Input
                name="city"
                color="indigo"
                size="lg"
                placeholder="Nama Kota"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="md:col-span-4 flex justify-end items-center pt-6 gap-1">
              <a href="/master-kota" className="flex gap-2 text-wpigreen-500 ml-4 text-sm">
                <Button className="bg-red-400 flex">
                 Batal
                </Button>
              </a>
                <Button type="submit" className="bg-wpigreen-50 flex">
                 Simpan
                </Button>
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