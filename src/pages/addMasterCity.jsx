import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import Axios from "axios";
import MasterFooterAdmin from "../components/masterFooterAdmin";
import MasterNavbarAdmin from "../components/masterNavbarAdmin";
import MasterSidebar from "../components/masterSidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function AddMasterCity() {
  const [cityName, setCityName] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]); // Add state for storing provinces
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);

  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if cityName or selectedProvince is empty
    if (!cityName || !selectedProvince) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const authToken = Cookies.get("authToken");

      if (!authToken) {
        throw new Error("Access token not found in cookies");
      }

      const formData = {
        city: cityName,
        province_id: selectedProvince,
      };

      const response = await Axios.post(
        "https://backend.ptwpi.co.id/api/cities/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(formData)
      console.log("Data successfully submitted:", response.data);

      // Redirect to /master-kota after successful submission
      navigate("/master-kota");
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  const getProvince = async () => {
    const res = await Axios.get("https://backend.ptwpi.co.id/api/provinces")
    setProvinces(res.data)
  }

  useEffect(() => {
    getProvince();
  },[])

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

  // console.log (provinces)
  console.log (cityName)
  console.log (selectedProvince)

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
                Tambah Kota
              </Typography>
            </div>
            <div className="md:col-span-4">
              <Typography variant="small" className="">
                Pilih Provinsi
              </Typography>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full p-2 mt-1 border rounded-lg"
              >
                <option value="" disabled>
                  Pilih Provinsi
                </option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.province}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-4">
              <Typography variant="small" className="">
                Nama Kota
              </Typography>
            </div>
            <div className="md:col-span-4 rounded-lg">
              <Input
                color="indigo"
                size="lg"
                placeholder="Nama Kota"
                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                onChange={(e) => setCityName(e.target.value)}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="md:col-span-4 flex justify-end items-center pt-6 gap-1">
              <a
                href="/master-kota"
                className="flex gap-2 text-wpigreen-500 ml-4 text-sm"
              >
                <Button className="bg-red-400 flex">Batal</Button>
              </a>
                <Button onClick={handleFormSubmit} className="bg-wpigreen-50 flex">
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