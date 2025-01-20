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
import axios from "axios";
import Cookies from "js-cookie";

export default function EditAbout() {
    const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 640);
    const [result, setResult] = useState({})
    const [formData, setFormData] = useState({})
    const fetchData = async () => {
        try {
            const res = await axios.get('https://backend.ptwpi.com/api/about/1')
            setResult(res.data.data)
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    // console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put('https://backend.ptwpi.com/api/about/1', formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('authToken')}`
                }
            })

            window.location.reload()
        } catch (error) {
            console.error(error.message)
        }
    }

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
        fetchData()
    }, [])

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
                <form>
                    <div className="grid md:grid-cols-4 gap-2 bg-white md:mr-6 mb-6 pt-6 pb-6 px-6 rounded-lg shadow-md">
                        <div className="md:col-span-4">
                            <Typography variant="h5" className="pb-10">
                                Edit Profil Perusahaan
                            </Typography>
                        </div>
                        <div className="md:col-span-4">
                            <Typography variant="small" className="">
                                Alamat
                            </Typography>
                        </div>
                        <div className=" md:col-span-4 rounded-lg">
                            <Input
                                name="address"
                                color="indigo"
                                size="lg"
                                placeholder="Alamat"
                                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                defaultValue={result?.[0]?.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-4">
                            <Typography variant="small" className="">
                                Nomor Telepon
                            </Typography>
                        </div>
                        <div className=" md:col-span-4 rounded-lg">
                            <Input
                                name="phone_company"
                                color="indigo"
                                size="lg"
                                placeholder="Nomor Telepon"
                                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                value={result?.[0]?.phone_company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-4">
                            <Typography variant="small" className="">
                                Email
                            </Typography>
                        </div>
                        <div className=" md:col-span-4 rounded-lg">
                            <Input
                                name="email_company"
                                color="indigo"
                                size="lg"
                                placeholder="Email"
                                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                defaultValue={result?.[0]?.email_company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-4">
                            <Typography variant="small" className="">
                                Link Instagram
                            </Typography>
                        </div>
                        <div className=" md:col-span-4 rounded-lg">
                            <Input
                                name="ig_link"
                                color="indigo"
                                size="lg"
                                placeholder="Email"
                                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                defaultValue={result?.[0]?.ig_link}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-4">
                            <Typography variant="small" className="">
                                Link Facebook
                            </Typography>
                        </div>
                        <div className=" md:col-span-4 rounded-lg">
                            <Input
                                name="fb_link"
                                color="indigo"
                                size="lg"
                                placeholder="Email"
                                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                defaultValue={result?.[0]?.fb_link}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-4">
                            <Typography variant="small" className="">
                                Link Whatsapp
                            </Typography>
                        </div>
                        <div className=" md:col-span-4 rounded-lg">
                            <Input
                                name="wa_link"
                                color="indigo"
                                size="lg"
                                placeholder="Email"
                                className="!border-t-blue-gray-200 focus:!border-t-blue-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                defaultValue={result?.[0]?.wa_link}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="md:col-span-4 flex justify-end items-center pt-6 gap-1">
                            <a href="/dashboard">
                            <Button className="bg-red-400 flex">
                                Batal
                            </Button>
                            </a>
                            <Button onClick={handleSubmit} className="bg-wpigreen-50 flex">
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
