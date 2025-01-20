import React, { useState, useEffect } from "react";
import MasterSidebar from "../components/masterSidebar";
import { Card, Typography } from "@material-tailwind/react";
import MasterFooterAdmin from "../components/masterFooterAdmin";
import MasterNavbarAdmin from "../components/masterNavbarAdmin";
import { useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";

export default function Supplier() {
  const TABLE_HEAD = ["Nomor", "Nama Supplier", "Company Name", "Aksi"];
  const [tableRows, setTableRows] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);
  const [searchQuery, setSearchQuery] = useState("");
  const authToken = Cookies.get("authToken");

  const handleResize = () => {
    setOpenSidebar(window.innerWidth >= 640);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axios.get(
          "https://backend.ptwpi.com/api/supplier",
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Include the token in the request headers
            },
          }
        );
        const data = response.data;

        // Check if the response contains the expected structure
        if (data && data.status === "success" && data.data && data.data.data) {
          setTableRows(data.data.data);
        } else {
          console.error("Invalid response format from the API");
        }
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };

    fetchSupplierData();
  }, [authToken]); // Include authToken in the dependency array

  const filteredRows = tableRows.filter(
    ({ name, company_name }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const navigateToDetail = (id) => {
    navigate(`/admin-detail-supplier/${id}`); // Use navigate instead of history.push
  };

  
  const handleDelete = async (id) => {
    // You can show a confirmation dialog here before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (confirmDelete) {
      try {
        const authToken = Cookies.get("authToken");

        if (!authToken) {
          throw new Error("Access token not found in cookies");
        }
        // Make a DELETE request using Axios
        await axios.delete(`https://backend.ptwpi.com/api/supplier/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // After successful deletion, navigate to a different route or perform any other actions
        // window.location.reload();
      } catch (error) {
        console.error("Error deleting news item:", error);
      }
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
        <div className="grid grid-cols-4 gap-8 bg-white mr-6 mb-6 pt-4 pl-6 rounded-lg shadow-md ">
          <Typography id="suplier-typography" className="col-span-2 flex items-center">
            Daftar Supplier
          </Typography>
          <div className="col-span-4">
            <div className="flex justify-center items-center w-full pr-6 mb-4">
              <input
                type="text"
                placeholder="Cari Supplier"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-12 rounded-l-md border-2 border-slate-600 focus:outline-none focus:border wpigreen-500"
              />
            </div>
          </div>
        </div>

       {/* Table */}
<div className="bg-white mr-6 mb-6 pt-6 pb-6 pr-6 pl-6 rounded-lg shadow-md">
  <Card className="h-full w-full overflow-y-scroll rounded-md">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head, index) => (
            <th
              key={index}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredRows.map(({ id, name, company_name }, index) => (
          <tr key={index} className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}>
            <td className="p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {index + 1}
              </Typography>
            </td>
            <td className="p-4">
              <Typography
                id="suplier-nama"
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {name}
              </Typography>
            </td>
            <td className="p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {company_name}
              </Typography>
            </td>
            <td className="p-4">
              <div className="">
                <a href={`/admin-detail-supplier/${id}`}>
                  <button
                    id="suplier-detail"
                    type="button"
                    className="ml-2 mb-[-10px] bg-wpiblue-50 text-white font-bold px-4 h-10 rounded-md"
                  >
                    <div className="flex justify-center items-center gap-3">
                      <svg
                        
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </div>
                  </button>
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(id)}
                  className="ml-2 mb-[-10px] bg-red-500 text-white font-bold px-4 h-10 rounded-md"
                >
                  <div className="flex justify-center items-center gap-3">
                    <svg
                      id="suplier-delete"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
</div>
</div>


      {/* Footer */}
      <div className="pt-10">
        <MasterFooterAdmin />
      </div>
    </div>
  );
}
