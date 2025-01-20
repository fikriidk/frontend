import React, { useState, useEffect } from "react";
import MasterNavbar from "../components/masterNavbar";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button, Input, Typography } from "@material-tailwind/react";
import MasterFilterCard from "../components/masterFilterCard";
import MasterCatalog from "../components/masterCatalog";
import MasterFooter from "../components/masterFooter";
import MasterPagination from "../components/masterPagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";

export default function ProductPage() {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    current_page: 1,
    last_page: 1,
    data: [],
  });
  const [category, setCategory] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState({ category_id: null });
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategory = async () => {
    try {
      const res = await axios.get("https://backend.ptwpi.com/api/categories");
      setCategory(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData({ category_id: filteredProduct.category_id }, pageNumber);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchData = async (filters, page = currentPage) => {
    try {
      let url = "https://backend.ptwpi.com/api/products";
      const params = new URLSearchParams();

      // Check if filters is an object and has properties
      if (
        typeof filters === "object" &&
        filters !== null &&
        Object.keys(filters).length > 0
      ) {
        // Handle categories as an array
        if (Array.isArray(filters.categories)) {
          filters.categories.forEach((category) => {
            params.append("category_id", parseInt(category, 10));
          });
        }

        // Append other filters
        if (filters.provinsi)
          params.append("province_id", parseInt(filters.provinsi, 10));
        if (filters.kota) params.append("city_id", parseInt(filters.kota, 10));
        if (filters.terendah !== undefined)
          params.append("min_price", parseInt(filters.terendah, 10));
        if (filters.tertinggi !== undefined)
          params.append("max_price", parseInt(filters.tertinggi, 10));
      } else if (typeof filters === "number") {
        // If filters is a number, it's assumed to be a category_id
        params.append("category_id", filters);
      }

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      // Handle pagination
      params.append("page", page);

      // Construct the final URL with all parameters
      url += `?${params.toString()}`;

      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
      };

      const res = await axios.get(url, options);
      setPaginationData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    }
  };

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

  useEffect(() => {
    fetchData(filteredProduct.category_id, currentPage);
    fetchCategory();
  }, []);

  useEffect(() => {
    if (filteredProduct.category_id) {
      fetchData(filteredProduct.category_id);
    }
  }, [filteredProduct.category_id]);

  const handleCategoryClick = (categoryId) => {
    setFilteredProduct({ category_id: categoryId });
  };

  const handleFilter = (filters) => {
    fetchData(filters);
  };

  const handleSubmitNotification = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    try {
      const res = await axios.post(
        "https://backend.ptwpi.com/api/customer/send",
        data
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div
        className={`bg-wpiblue-50 ${
          isNavbarFixed ? "fixed top-0 w-full z-50" : ""
        }`}
      >
        <MasterNavbar />
      </div>

      {/* Kategori Produk */}
      <div
        className="container max-w-[1260px]  product mx-auto md:py-0 md:px-6 
      mt-4"
      >
        <Typography
          style={{
            fontFamily: "'M PLUS Rounded 1c', sans-serif",
            fontWeight: 800,
          }}
          variant="h3"
          className="text-center  md:text-start justify-center pb-6 lg:pb-3 "
        >
          Kategori Produk
        </Typography>
        <Swiper
          className="mb-4  rounded-md"
          slidesPerView={5}
          spaceBetween={5}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          loop={true}
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            722: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            960: {
              slidesPerView: 5,
              spaceBetween: 0,
            },

            1238: {
              slidesPerView: 6,
              spaceBetween: 0,
            },
          }}
        >
          <SwiperSlide>
            <a href="/produk">
              <img
                src="./assets/all-categories.png"
                className="w-[250px] sm:w-[300px] md:w-[215px] lg:w-[175px] xl:w-[192px] mx-auto md:mx-0"
              />
            </a>
          </SwiperSlide>
          {category.map((cat, index) => (
            <SwiperSlide key={index}>
              <img
                src={cat.image_url}
                className="w-[250px] sm:w-[300px] md:w-[215px] lg:w-[175px] xl:w-[192px] mx-auto md:mx-0 cursor-pointer"
                alt={cat.category}
                onClick={() => handleCategoryClick(cat.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content */}
      <div className="container mx-auto pb-[80px]">
        <div className="md:col-span-2 px-6 pt-4 lg:pt-0 md:px-0">
          <div className="container mx-auto grid grid-cols-1 pb-4 md:w-[80%] lg:w-full">
            <div className="flex justify-center items-center md:ml-[0px] lg:ml-[460px] lg:mr-[30px]">
              <input
                type="text"
                placeholder="Cari Produk"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-12 rounded-l-md border-2 border-slate-600 focus:outline-none focus:border-wpigreen-500"
              />
              <button
                type="button"
                onClick={() => fetchData({ search: searchQuery })}
                className="bg-wpigreen-50 text-white font-bold py-2 lg-4 h-10 rounded-r-md px-4 "
              >
                <FaMagnifyingGlass />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3">
            <Typography
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 800,
                fontSize: "1.em",
              }}
              tag="h5"
              className="font-bold text-lg md:text-base text-black ml-8 mb-1"
            >
              Filter
            </Typography>
          </div>
        </div>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          <div className="md:col-span-1 md:ml-7 px-8 md:px-0">
            <div>
              <MasterFilterCard onFilter={handleFilter} />
            </div>
          </div>
          <div className="md:col-span-2">
            {paginationData.data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-0 md:mr-4">
                {paginationData.data.map((item, idx) => {
                  let price = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.price);
                  return (
                    <MasterCatalog
                      key={idx}
                      id={item.id}
                      imageUrl={item.link_image}
                      brand={item.brand}
                      description={item.description}
                      priceRange={price}
                      wa_link={item.wa_link}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <img
                  src="./assets/barang-tidak-tersedia.png"
                  alt="Barang tidak tersedia"
                  className="w-full h-full"
                />
              </div>
            )}
            <div className="flex justify-center items-center mt-6">
              <MasterPagination
                active={paginationData.current_page}
                onPageChange={paginate}
                totalItems={paginationData.total}
                itemsOnPage={paginationData.per_page}
              />
            </div>
          </div>
        </div>
        {/* <div className="bg-red-500 flex justify-center items-center   mt-6">
          <MasterPagination
            active={paginationData.current_page}
            onPageChange={paginate}
            totalItems={paginationData.total}
            itemsOnPage={paginationData.per_page}
          />
        </div> */}
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
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
                placeholder="Email address"
                className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none w-full",
                }}
              />
              <Button
                onClick={handleSubmitNotification}
                className="hover:bg-green-400 bg-wpigreen-50"
              >
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
