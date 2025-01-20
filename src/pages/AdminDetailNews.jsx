import React, { useState, useEffect } from "react";
import MasterSidebar from "../components/masterSidebar";
import { Avatar, Typography } from "@material-tailwind/react";
import MasterFooterAdmin from "../components/masterFooterAdmin";
import MasterNavbarAdmin from "../components/masterNavbarAdmin";
import axios from "axios";
import { useParams } from "react-router";

export default function AdminDetailNews() {
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);
  const [blogData, setBlogData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          "https://backend.ptwpi.com/api/blogs/" + id
        );
        setBlogData(response.data.blog);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
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
        
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white md:mr-6 mb-6 pt-6 pb-6 px-6 rounded-lg shadow-md">
          {blogData && (
            <>
              <Typography variant="h3" className="md:col-span-2 pb-4">
                {blogData.title}
              </Typography>
              <span className="">
                Dibuat oleh {blogData.writer} {" "}
                {new Date(blogData.created_at).toLocaleString()}
              </span>
              <div className=" mb-52 md:col-span-2">
                <img
                  src={blogData.link_image}
                  alt=""
                  className="rounded-lg"
                />
                <div className="py-6">
                  <Typography
                    variant="lead"
                    color="gray"
                    className="mt-3 font-normal text-justify"
                  >
                    {blogData.content}
                  </Typography>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-10">
        <MasterFooterAdmin />
      </div>
    </div>
  );
}
