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
import Axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

export default function EditMasterProvince() {
  const [provinceName, setProvinceName] = useState("");
  const { id } = useParams();
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          throw new Error("Access token not found in cookies");
        }

        const response = await Axios.get(
          `https://backend.ptwpi.com/api/provinces/${id}`,
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
        setProvinceName(response.data.province);
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
        province: provinceName,
      };

      const response = await Axios.put(
        `https://backend.ptwpi.com/api/provinces/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Province data successfully updated:", response.data);
      navigate("/master-provinsi");
    } catch (error) {
      console.error("Error updating province data:", error.message);
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
                Edit Nama Provinsi
              </Typography>
            </div>
            <div className="md:col-span-4">
              <Typography variant="small" className="">
                Nama Provinsi
              </Typography>
            </div>
            <div className=" md:col-span-4 rounded-lg">
              <Input
                color="indigo"
                size="lg"
                placeholder="Nama Provinsi"
                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                value={provinceName}
                onChange={(e) => setProvinceName(e.target.value)}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="md:col-span-4 flex justify-end items-center pt-6">
              <a
                href="/master-provinsi"
                className="flex gap-2 text-wpigreen-500 ml-4 text-sm"
              >
                <Button className="bg-red-400 flex">Batal</Button>
              </a>
              <a
                href="/master-provinsi"
                className="flex gap-2 text-wpigreen-500 ml-4 text-sm"
              >
                <Button type="submit" className="bg-wpigreen-50 flex">Simpan</Button>
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
