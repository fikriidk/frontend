import React, { useState, useEffect } from 'react';
import MasterSidebar from '../components/masterSidebar';
import { Button, Card, Typography } from '@material-tailwind/react';
import MasterFooterAdmin from '../components/masterFooterAdmin';
import MasterNavbarAdmin from '../components/masterNavbarAdmin';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import Cookies from 'js-cookie';
import MasterPagination from "../components/masterPagination";

const MasterCity = () => {
  const TABLE_HEAD = ['Nomor', 'Nama Provinsi', 'Nama Kota', 'Aksi'];
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);
  const [provinsi, setProvinsi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // New state to store pagination data
  const [paginationData, setPaginationData] = useState({
    current_page: 1,
    last_page: 1,
    data: [],
  });
  console.log('paginationData',paginationData)
  console.log('province', provinsi)

  const onProvinsi = async () => {
    try {
      const response = await axios.get(`https://backend.ptwpi.com/api/provinces`);
      setProvinsi(response.data);  // Make sure to set 'provinsi' with the data property
    
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const authToken = Cookies.get('authToken');
      if (!authToken) {
        throw new Error('Access token not found in cookies');
      }
  
      await axios.delete(`https://backend.ptwpi.com/api/cities/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Setelah data terhapus, panggil fetchData untuk meretrieve data terbaru
      fetchData(currentPage);
  
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`https://backend.ptwpi.com/api/cities?page=${page}`);
      setPaginationData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber);
  };

  useEffect(() => {
    onProvinsi();
  }, []);

  useEffect(() => {
  }, [provinsi]);

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth >= 640);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Initial data fetch on component mount
    fetchData(currentPage);
  }, [currentPage]);

  const getProvinceName = (id) => {
    const matchingProvince = provinsi.find(province => province.id === id);
    // Access the 'province' property to get the name, if a matching province was found
    const provinceName = matchingProvince ? matchingProvince.province : 'Province Not Found';

    return provinceName
  }

  return (
    <div className="bg-gray-100 h-full flex flex-col min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white z-50 fixed top-0 h-full md:block transition-transform duration-200 ease-in-out ${
          openSidebar ? 'translate-x-0' : '-translate-x-full'
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
      <MasterNavbarAdmin openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      {/* Content Product */}
      <div className="flex-grow h-full ml-4 md:ml-80 pt-10 mr-4">
        <div className="grid md:grid-cols-4 gap-2 bg-white md:mr-6 mb-6 pt-6 pb-6 px-6 rounded-lg shadow-md">
          <Typography className="md:col-span-2 flex items-center">Kota</Typography>
          <div className="pr-6 md:col-span-2 flex md:justify-end items-center">
            <a href="/master-tambah-kota">
              <Button className="bg-wpigreen-50 flex gap-2 items-center">
                <PlusCircleIcon className="h-[15px] w-auto" />
                <p>Tambah Kota</p>
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
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginationData.data.map((data, idx) => (
                  <tr key={data.nomor} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {idx + 1 +( paginationData.current_page * 10 - 10)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {getProvinceName(data.province_id)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data.city}
                      </Typography>
                    </td>
                    <td className="">
                      <div className="">
                        <a href={`/master-edit-kota/${data.id}`}>
                          <button
                            type="button"
                            className="ml-2 mb-[-10px] bg-orange-500 text-white font-bold px-4 h-10 rounded-md"
                          >
                            <div className="flex justify-center items-center gap-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                            </div>
                          </button>
                        </a>
                        <button
                          type="button"
                          className="ml-2 mb-[-10px] bg-red-500 text-white font-bold px-4 h-10 rounded-md"
                          onClick={() => handleDelete(data.id)}
                        >
                          <div className="flex justify-center items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
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
          <div className="mt-4 flex">
            <MasterPagination
              active={paginationData.current_page}
              onPageChange={paginate}
              totalItems={paginationData.total}
              itemsOnPage={paginationData.per_page}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-10">
          <MasterFooterAdmin />
        </div>
      </div>
    </div>
  );
};

export default MasterCity;