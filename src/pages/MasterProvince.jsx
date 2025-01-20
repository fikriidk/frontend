import React, { useState, useEffect } from "react";
import MasterSidebar from "../components/masterSidebar";
import { Button, Card, Typography } from "@material-tailwind/react";
import MasterFooterAdmin from "../components/masterFooterAdmin";
import MasterNavbarAdmin from "../components/masterNavbarAdmin";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export default function MasterProvince() {
  const [TABLE_ROWS, setTableRows] = useState([]);
  const TABLE_HEAD = ["Nomor", "Nama Provinsi", "Aksi"];
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);
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
    // Fetch data from the API using Axios
    Axios.get("https://backend.ptwpi.co.id/api/provinces", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        // Map the fetched data to match your TABLE_ROWS structure
        const mappedData = response.data.map((item,index,id) => ({
          id: item.id,
          nomor: index + 1,
          provinceName: item.province,
        }));

        // Update the TABLE_ROWS state with the mapped data
        setTableRows(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/master-edit-provinsi/${id}`);
  };
  const handleDelete = (id) => {
    try {
      const authToken = Cookies.get("authToken");
  
      if (!authToken) {
        throw new Error("Access token not found in cookies");
      }
  
      // Perform delete operation using Axios
      Axios.delete(`https://backend.ptwpi.co.id/api/provinces/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => {
          // After successful deletion, update the state to trigger re-render
          const updatedRows = TABLE_ROWS.filter((row) => row.id !== id);
          setTableRows(updatedRows);
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    } catch (error) {
      console.error("Error getting authorization token:", error.message);
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
        <div className="grid md:grid-cols-4 gap-2 bg-white md:mr-6 mb-6 pt-6 pb-6 px-6  rounded-lg shadow-md ">
          <Typography className="md:col-span-2 flex items-center">
            Provinsi
          </Typography>
          <div className=" pr-6 md:col-span-2 flex md:justify-end items-center ">
            <a href="/master-tambah-provinsi">
              <Button className="bg-wpigreen-50 flex gap-2 items-center">
                <PlusCircleIcon className="h-[15px] w-auto" />
                <p>Tambah Provinsi</p>
              </Button>
            </a>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white mr-6 mb-6 pt-6 pb-6 pr-6 pl-6 rounded-lg shadow-md">
          <Card className="h-full w-full overflow-y-scroll rounded-md">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
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
                {TABLE_ROWS.map(({ nomor, provinceName,id }) => (
                  <tr key={nomor} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nomor}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {provinceName}
                      </Typography>
                    </td>
                    <td className="">
                      <div className="">
                      <a href={`/master-edit-provinsi/${id}`}>
                          <button
                            type="button"
                            className="ml-2 mb-[-10px] bg-orange-500 text-white font-bold px-4 h-10 rounded-md"
                            onClick={() => handleEdit(id)}
                          >
                            <div className="flex justify-center items-center gap-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                            </div>
                          </button>
                        </a>
                        <button
                          type="button"
                          className="ml-2 mb-[-10px] bg-red-500 text-white font-bold px-4 h-10 rounded-md"
                          onClick={() => handleDelete(id)}
                        >
                          <div className="flex justify-center items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
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
