import React, { useState, useEffect } from "react";
import MasterNavbar from "../components/masterNavbar";
import {
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FaRegNewspaper } from "react-icons/fa6";
import MasterFooter from "../components/masterFooter";
import axios from "axios";
import { useParams } from "react-router";

export default function DetailNews() {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
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
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsNavbarFixed(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div
        className={`bg-wpiblue-50 ${
          isNavbarFixed ? "fixed top-0 w-full z-10" : ""
        }`}
      >
        <MasterNavbar />
      </div>

      {/* Jumbotron */}
      <div
        className="bg-gradient-to-t from-wpigreen-50 to-wpiblue-50 flex flex-col justify-center items-center px-4 xl:px-36 xl:h-[400px] md:h-[500px] lg:h-[450px] h-[500px] pb-16"
        style={{ borderRadius: "0 0 50px 50px" }}
      >
        <div className="flex flex-col justify-center items-center text-center text-white">
          <FaRegNewspaper size={100} className="mb-2" />
          <Typography
            variant="h1"
            style={{
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              fontWeight: 800,
            }}
            className="font-bold text-5xl mb-2"
          >
            Blog Warung Pangan Indonesia
          </Typography>
          <Typography
            variant="h5"
            style={{
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              fontWeight: 400,
            }}
            className="font-medium text-2xl"
          >
            Dapatkan informasi bermanfaat seputar pengelolaan usaha anda dari
            artikel yang kami berikan
          </Typography>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container mx-auto flex justify-start pt-4 xl:px-0 px-4">
        {blogData && (
          <>
            <div className="flex gap-2">
              <a
                href="/blog"
                className="text-wpigreen-50 hover:text-green-900 opacity-60"
              >
                News
              </a>
              <div>/</div>
              <a
                href="#"
                className="text-wpigreen-50 hover:text-green-900 font-bold"
              >
                {blogData.title}
              </a>
            </div>
          </>
        )}
      </div>

      {/* Konten Berita */}
      <div className="container mx-auto">
        {blogData && (
          <>
            <div className=" py-8 xl:px-0 px-4">
              <Typography
                variant="h3"
                style={{
                  fontFamily: "'M PLUS Rounded 1c', sans-serif",
                  fontWeight: 800,
                }}
                className="pb-4"
              >
                {blogData.title}
              </Typography>
              <span className="">
                Dibuat oleh {blogData.writer} /{" "}
                {new Date(blogData.created_at).toLocaleString()}
              </span>
            </div>
            <div className="xl:px-0 px-4 mb-52">
              <img src={blogData.link_image} alt="" className="rounded-lg" />
              <div className="py-6">
                <Typography
                  variant="lead"
                  style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    fontWeight: 500,
                  }}
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

      {/* Form Email */}
      <div className="bg-blue-50 lg:px-28 px-0 h-[50px]">
        <div className="bg-white grid grid-cols-1 lg:grid-cols-12 border rounded-lg shadow-lg py-8 -translate-y-10">
          <div className="col-span-6 text-center flex items-center justify-center lg:justify-start px-auto md:px-0 xl:px-2">
            <Typography
              variant="h4"
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 700,
              }}
            >
              Masukkan alamat email Anda untuk mendapatkan informasi menarik
              dari kami!
            </Typography>
          </div>
          <div className="col-span-6 px-2 md:px-4 xl:px-2 flex items-center justify-center w-full">
            <div className="flex gap-2 w-full">
              <Input
                size="lg"
                placeholder="Email address"
                className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none w-full",
                }}
              />
              <Button className="hover:bg-green-400 bg-wpigreen-50">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-50">
        <div className="container mx-auto pt-40 lg:pt-18">
          <MasterFooter />
        </div>
      </div>
    </div>
  );
}
