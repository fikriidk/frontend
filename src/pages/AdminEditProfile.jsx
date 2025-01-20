import React, { useState, useEffect } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import MasterSidebar from "../components/masterSidebar";
import MasterFooterAdmin from "../components/masterFooterAdmin";
import MasterNavbarAdmin from "../components/masterNavbarAdmin";
import axios from "axios"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function AdminEditProfile() {
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);
  const [data, setData] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

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
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const res = await axios.get('https://backend.ptwpi.co.id/api/user', {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });

        setData(res.data)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);



  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      // Handle password mismatch (show an error message, etc.)
      alert("Passwords do not match");
      return;
    }

    // Make the API call to update the password
    try {
      const response = await axios.put(`https://backend.ptwpi.co.id/api/users/${data.id}`, 
      {
        password: newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });

        // Password updated successfully
        console.log("Password updated successfully");
        alert("Password updated successfully");
        // Add any additional logic or redirection here
        navigate("/dashboard");
    } catch (error) {
      console.error("Error updating password:", error.message);
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

      {/* Content Profile Edit */}
      <div className="flex-grow h-full ml-4 md:ml-80 pt-10 mr-4">
        <form onSubmit={handleFormSubmit}>
          <div className="grid md:grid-cols-4 gap-2 bg-white md:mr-6 mb-6 pt-6 pb-6 px-6 rounded-lg shadow-md">
            <div className="md:col-span-4">
              <Typography variant="h5" className="pb-5">
                Edit Profile
              </Typography>
            </div>
            <div className="md:col-span-4">
              <Typography variant="small">
                Email
              </Typography>
            </div>
            <div className="md:col-span-4 rounded-lg">
              <Input 
                defaultValue={data.email}  // Use the email state as the value
                color="indigo"
                size="lg"
                placeholder="Email"
                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                disabled
              />
            </div>
            <div className="md:col-span-4">
              <Typography variant="small" className="">
                New Password
              </Typography>
            </div>
            <div className=" md:col-span-4 rounded-lg">
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                color="indigo"
                size="lg"
                placeholder="New Password"
                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="md:col-span-4">
              <Typography variant="small" className="">
                Confirm New Password
              </Typography>
            </div>
            <div className=" md:col-span-4 rounded-lg">
              <Input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                color="indigo"
                size="lg"
                placeholder="Confirm New Password"
                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="md:col-span-4 flex justify-end items-center pt-6 gap-1">
              <a href="/dashboard" className="flex gap-2 text-wpigreen-500 ml-4 text-sm">
                <Button id="button-batal-edit-profile"className="bg-red-400 flex">
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
