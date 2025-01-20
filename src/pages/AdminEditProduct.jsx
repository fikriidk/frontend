import React from "react";
import MasterSidebar from "../components/masterSidebar";
import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import MasterFooterAdmin from "../components/masterFooterAdmin";
import MasterNavbarAdmin from "../components/masterNavbarAdmin";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AdminEditProduct() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [descriptionInputs, setDescriptionInputs] = useState(1);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    product_name: "",
    brand: "",
    price: "",
    stock: "",
    volume: "",
    address: "",
    item_image: "",
    description: "",
    category_id: "",
    province_id: "",
    city_id: "",
    company: "",
    company_category: "",
    company_whatsapp_number: "",
    storage_type: "",
    packaging: "",
    additional_info: [],
  });
  const [additional_info, setAdditionalInfo] = useState([])

  useEffect(() => {
    // Fetch data from the API using Axios
    Axios.get("https://backend.ptwpi.com/api/provinces", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        // Map the fetched data to match your TABLE_ROWS structure
        const mappedData = response.data.map((item, index) => ({
          id: item.id,
          nomor: index + 1,
          provinceName: item.province,
        }));

        // Update the provinces state with the mapped data
        setProvinces(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get(
          "https://backend.ptwpi.com/api/categories"
        );

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    fetchCategories();
  }, [])

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          "https://backend.ptwpi.com/api/products/" + id
        );
        setProductData(response.data.data);
        setFormData({
          additional_info: response.data.data.additional_info,
        })
        setSelectedProvince(response.data.data.province_id.toString());
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (productData) {
      setSelectedProvince(productData.province_id);
      setSelectedCity(productData.city_id);
      setSelectedCategory(productData.category_id);
    }
  }, [productData]);

  const handleAdditionalInfoChange = (index, key, value) => {
    const updatedAdditionalInfo = [...formData.additional_info];
  
    // If the index doesn't exist in the array, initialize it with an empty object
    if (!updatedAdditionalInfo[index]) {
      updatedAdditionalInfo[index] = {};
    }
  
    // Update the specified key with the new value
    updatedAdditionalInfo[index][key] = value;
  
    // Update the formData state with the modified additional_info array
    setProductData(formData => ({ ...formData, additional_info: updatedAdditionalInfo }));
  };  
  

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

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
    // Fetch cities when the selected province changes
    const fetchCities = async (pageNumber = 1) => {
      try {
        const response = await Axios.get(
          `https://backend.ptwpi.com/api/cities?province_id=${selectedProvince}&page=${pageNumber}`
        );

        const cityPageData = response.data;

        // Map cities from the current page
        const currentPageCities = cityPageData.data
          .filter((city) => city.province_id === Number(selectedProvince))
          .map((item, index) => ({
            id: item.id,
            nomor: index + 1,
            cityName: item.city,
          }));

        // Add cities from the current page to the list
        setCities((prevCities) => [...prevCities, ...currentPageCities]);

        // If there are more pages, fetch the next page
        if (cityPageData.next_page_url !== null) {
          const nextPageNumber = pageNumber + 1;
          fetchCities(nextPageNumber);
        } else {
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    if (selectedProvince !== null) {
      // Clear cities when the selected province changes
      setCities([]);
      fetchCities();
    }
  }, [selectedProvince, provinces]);

  const handleAddSpesification = () => {
    setFormData({
      ...formData,
      additional_info: [...formData.additional_info, { item: "", desc: "" }],
    });
    setDescriptionInputs(descriptionInputs + 1);
  };
  

  if (!productData) {
    // Return loading state or redirect to a loading page
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObject = new FormData();
  
      formDataObject.append("product_name", productData.product_name);
      formDataObject.append("brand", productData.brand);
      formDataObject.append("price", productData.price);
      formDataObject.append("stock", productData.stock);
      formDataObject.append("volume", productData.volume);
      formDataObject.append("address", productData.address);
      formDataObject.append("description", productData.description);
      formDataObject.append("category_id", parseInt(selectedCategory));
      formDataObject.append("province_id", parseInt(selectedProvince));
      formDataObject.append("city_id", parseInt(selectedCity));
      formDataObject.append("company", productData.company);
      formDataObject.append("company_category", productData.company_category);
      formDataObject.append("company_name", productData.company_name);
      formDataObject.append("company_whatsapp_number", productData.company_whatsapp_number);
      formDataObject.append("storage_type", productData.storage_type);
      formDataObject.append("packaging", productData.packaging);
  
      // Add the selected file to the form data
      if (selectedFile) {
        formDataObject.append("item_image", selectedFile);
      }

      productData.additional_info.forEach((info, index) => {

        if (info.item || info.desc) {
          formDataObject.append(`additional_info[${index}][${info.item}]`, info.desc);
        } else {
          formDataObject.append(`additional_info[${index}][${Object.keys(info)}]`, Object.values(info));
        }
      })

  
      const response = await Axios.post(
        `https://backend.ptwpi.com/api/products/${id}?_method=PUT`,
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Success:", response);
      navigate("/admin-produk");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };  
  

  const handleNameChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      product_name: e.target.value,
    }));
  };

  const handleBrandChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      brand: e.target.value,
    }));
  };

  const handleCompanyNameChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      company_name: e.target.value,
    }));
  };

  const handleCompanyWhatsappChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      company_whatsapp_number: e.target.value,
    }));
  };

  const handleCategoryChange = (value) => {
    setProductData((prevData) => ({
      ...prevData,
      category_id: value,
    }));
  };

  const handleStorageChange = (value) => {
    setProductData((prevData) => ({
      ...prevData,
      storage_type: value,
    }));
  };

  const handlePackaging = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      packaging: e.target.value,
    }));
  };

  const handlePrice = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      price: e.target.value,
    }));
  };

  const handleStock = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      stock: e.target.value,
    }));
  };

  const handleVolume = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      volume: e.target.value,
    }));
  };

  const handleAddress = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      address: e.target.value,
    }));
  };

  const handleDescription = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      description: e.target.value,
    }));
  };


  console.log(productData)

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

      {/* Edit Product */}
      <div className="flex-grow h-full ml-4 md:ml-80 pt-10 mr-4">
        <div className="grid grid-cols-4 gap-8 bg-white mb-6 py-6 pl-6 rounded-lg shadow-md ">
          <Typography id="admin-edit-product-typography" className="col-span-2 flex items-center">
            Edit Product
          </Typography>
        </div>

        {/* Detail Product */}
        <div className="bg-white rounded-lg shadow-md grid grid-cols-12 p-8">
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Product Name
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
            <Input
              id="admin-edit-product-name"
              color="indigo"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Input Product Name"
              value={productData.product_name}
              onChange={handleNameChange}
            />
          </div>
          <div  className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Brand Name
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
            <Input
              id="admin-edit-product-brand"
              color="indigo"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Input Brand Name"
              value={productData.brand}
              onChange={handleBrandChange}
            />
          </div>
          <div  className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Company Name
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
            <Input
              id="admin-edit-product-company"
              color="indigo"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Input Company Name"
              value={productData.company_name}
              onChange={handleCompanyNameChange}
            />
          </div>
          <div  className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Company Whatsapp Number
          </div>
            <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
              <Input
                id="admin-edit-product-whatsapp-number"
                color="indigo"
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                placeholder="Input Company Whatsapp Number"
                value={productData.company_whatsapp_number}
                onChange={handleCompanyWhatsappChange}
              />
            </div>
          <div  className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Category Product
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8">
            <select
              id="admin-edit-product-company-category"
              className="border border-gray-400 rounded-md w-full py-3 px-2"
              value={selectedCategory}
              onChange={(e) => {
                setProductData((prevData) => ({
                  ...prevData,
                  category_id: e.target.value,
                }));
                setSelectedCategory(e.target.value)}}
            >
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.category}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Storage Type
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
            <Select
              id = "admin-edit-product-storage-option"
              color="indigo"
              size="lg"
              outline="outline-1 focus:outline-1"
              className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
              value={productData.storage_type}
              onChange={handleStorageChange}
            >
              <Option value="Dry">Dry</Option>
              <Option value="Frozen">Frozen</Option>
            </Select>
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Packaging
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
            <Input
              id="admin-edit-product-packaging"
              color="indigo"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Input Packaging"
              value={productData.packaging}
              onChange={handlePackaging}
            />
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Price
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
            <Input
              id="admin-edit-product-price"
              type="number"
              color="indigo"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Input Price"
              value={productData.price}
              onChange={handlePrice}
            />
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Stock
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
            <Input
              id="admin-edit-product-stock"
              type="number"
              color="indigo"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={productData.stock}
              onChange={handleStock}
            />
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Volume
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
            <Input
              id="admin-edit-product-volume"
              color="indigo"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Input Satuan"
              value={productData.volume}
              onChange={handleVolume}
            />
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8">
            Province
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 ">
            <select
              id="admin-edit-product-province"
              className="border border-gray-400 rounded-md w-full py-3 px-2"
              value={selectedProvince}
              onChange={
                (e) => {
                  setProductData((prevData) => ({
                    ...prevData,
                    province_id: e.target.value,
                  }));
                  setSelectedProvince(e.target.value)}
              }
            >
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.provinceName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8">
            City
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 ">
            <select
              id="admin-edit-product-city"
              className="border border-gray-400 rounded-md w-full py-3 px-2"
              value={selectedCity}
              onChange={(e) => {
                setProductData((prevData) => ({
                  ...prevData,
                  city_id: e.target.value,
                }));
                setSelectedCity(e.target.value)}}
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>
          <div  className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Address
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
            <Textarea
              id="admin-edit-product-address"
              color="indigo"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={productData.address}
              onChange={handleAddress}
            />
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8 ">
            Description
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8 font-bold">
            <Textarea
              id = "admin-edit-product-description"
              color="indigo"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-blue-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={productData.description}
              onChange={handleDescription}
            />
          </div>
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-start pb-4 ">
            Specification
          </div>
          <div className="flex-row gap-2 justify-between col-span-12 lg:col-span-9 pb-4 font-bold">
          {formData.additional_info.map((info, index) => {
          return (
            <div className="w-full flex flex-row justify-between gap-3" key={index}>
              <div className="pb-8 w-full">
                <div className="pb-4">
                  <Input
                    id = "admin-edit-product-specification"
                    color="indigo"
                    size="lg"
                    className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    placeholder="Item"
                    defaultValue={Object.keys(info) ? Object.keys(info)[0] : ""}
                    onChange={(e) =>
                      handleAdditionalInfoChange(index, "item", e.target.value)
                    }
                    value={info.item}
                  />
                </div>
                <div className="pb-4">
                  <Input
                    color="indigo"
                    size="lg"
                    className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    placeholder="Value"
                    defaultValue={Object.values(info)[0]}
                    onChange={(e) =>
                      handleAdditionalInfoChange(index, "desc", e.target.value)
                    }
                    value={info.desc}
                  />
                </div>
              </div>
              <div className="flex justify-end items-center pb-8">
                <Button
                  onClick={() =>{
                    const updatedAdditionalInfo = [...formData.additional_info];
                    updatedAdditionalInfo.splice(index, 1);
                    setProductData(formData => ({ ...formData, additional_info: updatedAdditionalInfo }));
                  
                  }}
                  className="bg-red-400 text-white"
                >
                  -
                </Button>
              </div>
            </div>
          )})}
          </div>
          <div className="col-span-12 flex justify-center lg:justify-end items-center pb-8">
            <Button
              onClick={handleAddSpesification}
              className="bg-blue-500 text-white"
            >
              Add Specification
            </Button>
          </div>{" "}
          <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-between items-center pb-8">
            Photo Product
          </div>
          <div className="col-span-12 lg:col-span-9 pb-8">
            <img
              src={productData.link_image}
              alt="Product Image"
              className="w-full md:w-auto h-auto md:h-[300px] border"
            />
            <div className="flex items-center mt-2">
              <Button
                size="sm"
                className="bg-wpiblue-50 relative overflow-hidden"
              >
                Select Photo
                <input
                  id="admin-edit-product-drop-image"
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer top-0 left-0 h-full w-full"
                  onChange={handleFileUpload}
                />
              </Button>
              <Typography className="pl-1 md:pl-4">
                {selectedFile ? `${selectedFile.name}` : "No File Chosen"}
              </Typography>
            </div>
          </div>
          <div className="col-span-12 flex justify-end items-center">
            <a
              href="/admin-produk"
              className="flex gap-2 text-wpigreen-500 ml-4 text-sm"
            >
              <Button className="bg-red-400 flex">Batal</Button>
            </a>
            <a
              href="/admin-produk"
              className="flex gap-2 text-wpigreen-500 ml-4 text-sm"
            >
              <Button id="admin-edit-product-save" onClick={handleSubmit} className="bg-wpigreen-50 flex">
                Simpan
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-10">
        <MasterFooterAdmin />
      </div>
    </div>
  );
}