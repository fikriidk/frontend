import React, { useState, useEffect } from "react";
import MasterNavbar from "../components/masterNavbar";
import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { TbMessage2Heart } from "react-icons/tb";
import MasterFooter from "../components/masterFooter";
import axios from "axios";

export default function AboutPage() {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: "",
    perihal: "",
    pertanyaan: "",
  });
  const [email, setEmail] = useState("");
  const [result, setResult] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const fetchData = async () => {
    try {
      const res = await axios.get("https://backend.ptwpi.com/api/about/1");
      setResult(res.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFormSubmit = () => {
    try {
      // Validasi form
      if (
        !formData.nama ||
        !formData.no_hp ||
        !formData.email ||
        !formData.perihal ||
        !formData.pertanyaan
      ) {
        alert("Harap isi semua kolom pada form.");
        return;
      }

      const wa_link =
        result?.[0]?.wa_link +
        "?text=Halo%20kak%20saya%20mau%20tanya%20perihal%20" +
        formData.perihal +
        "%20dengan pertanyaan%20" +
        formData.pertanyaan;

      window.open(wa_link, "_blank");
    } catch (error) {
      console.error(error.message);
    }
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

  useEffect(() => {
    fetchData();
  }, []);

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

      {/* Jumbotron */}
      <div
        className="bg-gradient-to-b from-wpiblue-50 to-wpiblue-100 xl:h-[650px] lg:h-[550px] md:h-[700px] sm:h-[650px] h-[600px] lg:pt-4 pt-0"
        style={{ borderRadius: "0 0 50px 50px" }}
      >
        <div className="container mx-auto grid lg:grid-cols-12 grid-cols-1 px-4 pt-8 lg:pt-0 lg:gap-8 gap-0">
          <div className=" flex justify-center items-center text-white col-span-7 ">
            <img
              src="./assets/heroAbout.png"
              alt="jumbotron"
              className="xl:h-[500px] md:h-[400px]"
            />
          </div>
          <div className=" col-span-5 xl:-translate-x-0 flex flex-col justify-center text-center lg:text-justify">
            <Typography
              variant="h1"
              className="py-4 xl:text-5xl text-4xl"
              color="white"
            >
              Kami hadir sebagai kekuatan utama dalam mengatasi tantangan di
              industri pangan dan perdagangan
            </Typography>
          </div>
        </div>
      </div>

      {/* Content 1 */}
      <div className="mx-2">
        <div className="bg-white container mx-auto lg:-translate-y-28 -translate-y-20 px-12 py-8 text-center shadow-lg rounded-lg">
          <div className="grid grid-cols-12">
            <div className="col-span-12 flex justify-center items-center gap-16">
              <img
                src="assets/logo-wpi.png"
                alt=""
                className="hidden lg:block col-span-5"
                width={250}
              />
              <iframe
                className="h-[200px] md:h-[300px] lg:h-[400px] w-full col-span-7 rounded-md "
                src="https://www.youtube.com/embed/EYwhlnbNjdo"
                title="Company Profile - Warung Pangan indonesia"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Content 2 */}
      <div className="container mx-auto xl:px-0 px-4 xl:mb-0 xl:-translate-y-20 lg:-translate-y-16 -translate-y-12">
        <div>
          <Typography
            variant="h3"
            style={{
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              fontWeight: 800,
            }}
            className="text-center lg:text-start mb-4"
          >
            Tentang Warung Pangan Indonesia
          </Typography>
          <Typography
            variant="lead"
            style={{
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              fontWeight: 400,
            }}
            color="black"
            className="text-justify text-lg lg:text-xl"
          >
            Warung Pangan Indonesia (WPI) didirikan pada tahun 2023 dan
            merupakan perusahaan baru yang telah membangun posisinya sebagai
            pemain penting dalam industri pangan. Dengan fokus pada agregasi
            komoditas pangan dan dukungan pangan lainnya, WPI mengintegrasikan
            Supply Chain Management, Trading, Finance Scheme, dan Business
            Networking dengan dukungan Teknologi Informasi. WPI tidak hanya
            terlibat dalam manajemen sumber daya pangan dari dalam dan luar
            negeri, tetapi juga berperan dalam meningkatkan nilai tambah
            komoditas pangan. Perusahaan ini aktif dalam perdagangan dan
            distribusi, menawarkan komoditas pangan dengan harga terjangkau di
            pasar domestik dan bersaing di pasar internasional. Dengan
            pendekatan holistik dan inovatif terhadap rantai pasokan, WPI
            berkontribusi pada ketahanan pangan dan memastikan ketersediaan
            berbagai jenis produk pangan untuk masyarakat Indonesia. Dengan visi
            yang jelas dan komitmen terhadap teknologi, WPI terus tumbuh sebagai
            pemain kunci dalam industri pangan, menciptakan dampak positif
            secara lokal dan global.
          </Typography>
        </div>

        {/* Produk dan Layanan */}
        <div className="container mx-auto lg:py-0 md:px-4 lg:px-6 mt-8">
          <div className="shadow-lg rounded-lg p-8 container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 justify-center items-center gap-6">
            <div className="col-span-1 flex items-center justify-center">
              <img
                src="assets/mine.png"
                alt=""
                className="block mx-auto mb-4 h-[120px] w-auto lg:mb-0 duration-300 hover:scale-105 hover:shadow-lg"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <img
                src="assets/ikan.png"
                alt=""
                className="block mx-auto mb-4 h-[120px] w-auto lg:mb-0 duration-300 hover:scale-105 hover:shadow-lg"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <img
                src="assets/horticultural.png"
                alt=""
                className="block mx-auto mb-4 h-[120px] w-auto lg:mb-0 duration-300 hover:scale-105 hover:shadow-lg"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <img
                src="assets/agricultural.png"
                alt=""
                className="block mx-auto mb-4 h-[120px] w-auto lg:mb-0 duration-300 hover:scale-105 hover:shadow-lg"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <img
                src="assets/daging.png"
                alt=""
                className="block mx-auto mb-4 h-[120px] w-auto lg:mb-0 duration-300 hover:scale-105 hover:shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Visi dan Misi */}
        <div className="container mx-auto xl:px-0 px-4">
          <div>
            <Typography
              variant="h3"
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 800,
              }}
              className="text-center lg:text-start my-6"
            >
              Visi dan Misi
            </Typography>
          </div>
          <div className="grid w-full grid-cols-1 xl:grid-cols-6 gap-2 xl:gap-8">
            <div className="col-span-3   xl:col-span-2 md:col-span-4 flex justify-center">
              <Card className="shadow-lg  w-full h-[300px] xl:h-full overflow-hidden p-4 text-center bg-gradient-to-b from-wpiblue-50 to-wpigreen-50 flex flex-col justify-center items-center ">
                <Typography
                  style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    fontWeight: 700,
                  }}
                  variant="lead"
                  color="white"
                  className="mt-3 font-normal "
                >
                  VISI
                </Typography>
                <Typography
                  style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    fontWeight: 700,
                  }}
                  variant="lead"
                  color="white"
                  className="mt-3 font-normal "
                >
                  Menjadi perusahaan aggregator pangan dan pendukung pangan
                  lainnya yang kuat secara Nasional dan terintegrasi di Pasar
                  Internasional
                </Typography>
              </Card>
            </div>
            <div className="col-span-3 md:col-span-4 flex justify-center items-center">
              <div className="grid grid-cols-1 lg:grid-cols-3  gap-2 lg:gap-4">
                <Card className="shadow-lg w-full h-[300px] overflow-hidden p-4 text-center bg-gradient-to-b from-wpiblue-50 to-wpigreen-50 flex flex-col justify-center items-center ">
                  <div>
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal "
                    >
                      MISI
                    </Typography>
                  </div>
                  <div className="h-[300px]">
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal"
                    >
                      Membeli produk unggulan komoditas pangan dari sumber local
                      dengan harga yang menari
                    </Typography>
                  </div>
                </Card>
                <Card className="shadow-lg w-full h-[300px] overflow-hidden p-4 text-center bg-gradient-to-b from-wpiblue-50 to-wpigreen-50 flex flex-col justify-center items-center ">
                  <div>
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal "
                    >
                      MISI
                    </Typography>
                  </div>
                  <div className="h-[300px]">
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal"
                    >
                      Menjual produk komoditas pangan dgn harga yang terjangkau
                    </Typography>
                  </div>
                </Card>
                <Card className="shadow-lg w-full h-[300px] overflow-hidden p-4 text-center bg-gradient-to-b from-wpiblue-50 to-wpigreen-50 flex flex-col justify-center items-center ">
                  <div>
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal "
                    >
                      MISI
                    </Typography>
                  </div>
                  <div className="h-[300px]">
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal"
                    >
                      Menyiapkan peluang ekspor ke luar negeri dgn standarisasi
                      dan perizinan yang relevan sesuai kebutuhan pasar
                    </Typography>
                  </div>
                </Card>
                <Card className="shadow-lg w-full h-[300px] overflow-hidden p-4 text-center bg-gradient-to-b from-wpiblue-50 to-wpigreen-50 flex flex-col justify-center items-center ">
                  <div>
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal "
                    >
                      MISI
                    </Typography>
                  </div>
                  <div className="h-[300px]">
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal"
                    >
                      Membantu pemerintah dgn berkolaborasi kepada kelembagaan
                      yang terkait untuk komoditas pangan
                    </Typography>
                  </div>
                </Card>
                <Card className="shadow-lg w-full h-[300px] overflow-hidden p-4 text-center bg-gradient-to-b from-wpiblue-50 to-wpigreen-50 flex flex-col justify-center items-center ">
                  <div>
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal "
                    >
                      MISI
                    </Typography>
                  </div>
                  <div className="h-[300px]">
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal"
                    >
                      Melakukan digitalisasi untuk percepatan forecasting supply
                      dan demand komoditi pangan
                    </Typography>
                  </div>
                </Card>
                <Card className="shadow-lg w-full h-[300px] overflow-hidden p-4 text-center bg-gradient-to-b from-wpiblue-50 to-wpigreen-50 flex flex-col justify-center items-center ">
                  <div className="">
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal "
                    >
                      MISI
                    </Typography>
                  </div>
                  <div className="h-[300px]">
                    <Typography
                      style={{
                        fontFamily: "'M PLUS Rounded 1c', sans-serif",
                        fontWeight: 700,
                      }}
                      variant="lead"
                      color="white"
                      className="mt-3 font-normal"
                    >
                      Menghadirkan teknologi pendukung yang efektif dan efisien
                    </Typography>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budaya Kerja */}
      <div className="container mx-auto lg:py-0 py-8 mb-8 lg:px-0 px-6">
        <div>
          <Typography
            variant="h3"
            style={{
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              fontWeight: 800,
            }}
            className="text-center lg:text-start"
          >
            Budaya Kerja ( LAPAK )
          </Typography>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-center items-center gap-6 ">
          <Card className="py-1 flex flex-col justify-center items-center overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-lg text-center">
            <div className="">
              <img
                src="assets/layanan.png"
                alt=""
                className="block mx-auto mb-4 lg:mb-0"
                width={70}
              />
            </div>
            <div className="h-[200px]">
              <Typography
                variant="h5"
                style={{
                  fontFamily: "'M PLUS Rounded 1c', sans-serif",
                  fontWeight: 700,
                }}
                color="blue-gray"
                className="mb-2"
              >
                Layanan
              </Typography>
              <Typography>
                Melayani mitra bisnis dengan sepenu hati untuk mencapai kepuasan
                pelanggan
              </Typography>
            </div>
          </Card>
          <Card className="py-1 flex flex-col justify-center items-center overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-lg text-center">
            <img
              src="assets/amanah.png"
              alt=""
              className="block mx-auto mb-4 lg:mb-0"
              width={70}
            />
            <div className="h-[200px]">
              <Typography
                variant="h5"
                style={{
                  fontFamily: "'M PLUS Rounded 1c', sans-serif",
                  fontWeight: 700,
                }}
                color="blue-gray"
                className="mb-2"
              >
                Amanah
              </Typography>
              <Typography>
                Selalu memenuhi komitmen sesuai dgn janji dan target yang telah
                disepakati
              </Typography>
            </div>
          </Card>
          <Card className="py-1 flex flex-col justify-center items-center overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-lg text-center">
            <div>
              <img
                src="assets/profesional.png"
                alt=""
                className="block mx-auto mb-4 lg:mb-0"
                width={70}
              />
            </div>
            <div className="h-[200px]">
              <Typography
                variant="h5"
                style={{
                  fontFamily: "'M PLUS Rounded 1c', sans-serif",
                  fontWeight: 700,
                }}
                color="blue-gray"
                className="mb-2"
              >
                Profesional
              </Typography>
              <Typography>
                Melayani mitra bisnis dengan sepenu hati untuk mencapai kepuasan
                pelanggan
              </Typography>
            </div>
          </Card>
          <Card className="py-1 flex flex-col justify-center items-center overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-lg text-center">
            <div>
              <img
                src="assets/adapt.png"
                alt=""
                className="block mx-auto mb-4 lg:mb-0"
                width={70}
              />
            </div>
            <div className="h-[200px]">
              <Typography
                variant="h5"
                style={{
                  fontFamily: "'M PLUS Rounded 1c', sans-serif",
                  fontWeight: 700,
                }}
                color="blue-gray"
                className="mb-2"
              >
                Adaptif
              </Typography>
              <Typography>
                Cepat beradaptasi untuk terus berinovasi terhadap perkembangan
                dunia industri yg terjadi setiap saat
              </Typography>
            </div>
          </Card>
          <Card className="py-1 flex flex-col justify-center items-center overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-lg text-center">
            <div>
              <img
                src="assets/collaborative.png"
                alt=""
                className="block mx-auto mb-4 lg:mb-0"
                width={70}
              />
            </div>
            <div className="h-[200px]">
              <Typography
                variant="h5"
                style={{
                  fontFamily: "'M PLUS Rounded 1c', sans-serif",
                  fontWeight: 700,
                }}
                color="blue-gray"
                className="mb-2"
              >
                Kolaboratif
              </Typography>
              <Typography>
                Memiliki semangat kebersamaan yang tinggi dalam memberikan
                solusi penyelesaian permasalahan yang ada
              </Typography>
            </div>
          </Card>
        </div>
      </div>

      {/* Form Supplier */}
      <div className="container mx-auto ">
        <div className="mb-10 border rounded-lg shadow-lg text-center mx-2 lg:mx-0 ">
          <div className="flex xl:flex-row flex-col">
            <div
              className="bg-gradient-to-r from-wpiblue-50 to-wpigreen-50 flex justify-center items-center text-center xl:w-1/2 w-full h-[300px] xl:h-auto"
              style={{ borderRadius: "10px 100px 100px 10px" }}
            >
              <div className="flex flex-col justify-center items-center">
                <TbMessage2Heart
                  color="white"
                  className="lg:mb-6 mb-0 lg:h-[200px] h-[100px] w-auto"
                />
                <Typography
                  variant="h1"
                  color="white"
                  className="text-2xl lg:text-5xl"
                >
                  Hubungi Kami
                </Typography>
              </div>
            </div>
            <div className=" flex justify-center items-center xl:w-1/2 w-full">
              <form className=" py-6 mt-8 mb-2 w-full px-2">
                <div className="flex flex-col gap-4">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-start"
                  >
                    Nama Lengkap
                  </Typography>
                  <Input
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    type="text"
                    size="lg"
                    placeholder="Masukan nama lengkap"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-start"
                  >
                    No Handphone
                  </Typography>
                  <Input
                    name="no_hp"
                    value={formData.no_hp}
                    onChange={handleChange}
                    type="text"
                    size="lg"
                    placeholder="Masukan nomor handphone "
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-start"
                  >
                    Email
                  </Typography>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    size="lg"
                    placeholder="Masukan email"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-start"
                  >
                    Perihal
                  </Typography>
                  <Input
                    name="perihal"
                    value={formData.perihal}
                    onChange={handleChange}
                    type="text"
                    size="lg"
                    placeholder="Perihal"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-start"
                  >
                    Pertanyaan
                  </Typography>
                  <Textarea
                    name="pertanyaan"
                    value={formData.pertanyaan}
                    onChange={handleChange}
                    class="h-full  w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700  "
                    placeholder=""
                  ></Textarea>
                </div>
                <Button
                  onClick={handleFormSubmit}
                  className="hover:text-green-100 bg-wpigreen-50 mt-2"
                  fullWidth
                >
                  KIRIM
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Content Image */}
      <div className="container mx-auto flex justify-center pb-16 px-8 lg:px-0">
        <div className="overflow-hidden transform transition-transform duration-300 hover:scale-105 rounded-lg">
          <a href="/produk">
            <img src="./assets/banner.png" alt="" className="w-full" />
          </a>
        </div>
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
