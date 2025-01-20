  import React, { useState, useEffect } from "react";
import MasterNavbar from "../components/masterNavbar";
import MasterCarousel from "../components/masterCarousel";
import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FaArrowRight } from "react-icons/fa";
import {
  FcApproval,
  FcCustomerSupport,
  FcMultipleDevices,
  FcOk,
} from "react-icons/fc";
import MasterFooter from "../components/masterFooter";
import axios from "axios";

export default function Home() {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [email, setEmail] = useState("");

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

  const handleSubmitNotification = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    try {
      const res = axios.post(
        "https://backend.ptwpi.co.id/api/customer/send",
        data
      );
    } catch (error) {
      console.error("Error submitting notification:", error);
    }
  };

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
      <div className=" bg-wpigreen-50 xl:h-[820px] lg:h-[670px] md:h-[1100px] h-[850px]">
        <div
          className="bg-wpiblue-50 flex flex-col xl:h-[600px] md:h-[950px] lg:h-[550px] h-[750px]"
          style={{ borderRadius: "0 0 50px 50px" }}
        >
          <div className="container mx-auto flex flex-col lg:flex-row justify-between lg:h-[500px]">
            <div className="flex justify-center items-center text-white pl-4 pt-5 md:pt-8 lg:pt-0 lg:pl-10">
              <div className="">
                <div className="">
                  <Typography className="mb-4 text-center lg:text-left font-bold text-xl whitespace-no-wrap md:text-[2rem] md:!leading-10 leading-7">
                    HUB KOMODITI BERKUALITAS
                    <br /> UNTUK PERDAGANGAN DOMESTIK & INTERNASIONAL
                  </Typography>
                </div>
                <div className="">
                  <Typography
                    variant="h5"
                    className="mb-4 text-base lg:text-xl flex items-start"
                  >
                    <span className="mr-4 text-3xl">
                      <FcOk />
                    </span>
                    Ada Barang Langsung Bayar
                  </Typography>
                  <Typography
                    variant="h5"
                    className="mb-4 text-base lg:text-xl flex items-start"
                  >
                    <FcOk className="mr-4" size={30} /> Terhubung Langsung
                    dengan Buyer dan Supplier
                  </Typography>
                  <Typography
                    variant="h5"
                    className="mb-4 text-base lg:text-xl flex items-start"
                  >
                    <FcOk className="mr-4" size={30} /> Penanganan Logistik
                    Profesional
                  </Typography>
                  <Typography
                    variant="h5"
                    className="mb-4 text-base lg:text-xl flex items-start"
                  >
                    <FcOk className="mr-4" size={30} /> Akses Perdagangan
                    Internasional yang Kuat
                  </Typography>
                  <Typography
                    variant="h5"
                    className="mb-4 text-base lg:text-xl flex items-start"
                  >
                    <FcOk className="mr-4" size={30} /> Dimudahkan dengan Basis
                    Teknologi
                  </Typography>
                  <div className="flex justify-center xl:justify-start md:justify-start">
                    <a href="/mitra">
                      <Button
                        
                        className="hover:text-green-100 bg-wpigreen-50 "
                        size="lg"
                      >
                        <div id="button-join" className="flex items-center lg:text-2xl">
                          GABUNG SEKARANG <FaArrowRight  className="ml-2" />
                        </div>
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[280px] md:h-[400px] lg:h-[33vw] xl:h-full xl:w-full py-5 mt-4 lg:mt-0 md:py-0 items-center">
              <img
                src="./assets/newHero.png"
                alt="image1"
                className="h-full w-full   "
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="container mx-auto lg:-translate-y-[7vw] xl:-translate-y-[6.5vw] md:-translate-y-24
         -translate-y-11 px-4 w-full h-[130px] md:h-[200px] lg:h-[17vw] xl:h-[300px]  sm:px-0 lg:px-0 "
        >
          <MasterCarousel />
        </div>

        {/* Content 1 */}
        <div
          className="lg:-translate-y-16 px-4 md:px-0
        "
        >
          <div className="container mx-auto text-center xl:mb-10 mb-12 ">
            <Typography
              variant="h3"
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 800,
              }}
            >
              Kenapa Harus Warung Pangan Indonesia
            </Typography>
          </div>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-x-4 gap-y-12 h-full">
            <div className="flex justify-center items-center h-full">
              <Card className="w-full h-full border">
                <div color="blue-gray" className="relative h-[200px]">
                  <img
                    src="./assets/image-wpi-1.png"
                    alt="card-image"
                    className="w-full h-full"
                  />
                </div>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Jaringan Kuat dari Hulu hingga Hilir di Domestik dan Luar
                    Negeri
                  </Typography>
                  <Typography className="text-justify">
                    WPI berkomitmen untuk menyediakan komoditas- komoditas
                    perdagangan yang terbaik dengan harga yang kompetitif. Untuk
                    itu WPI sangat menjaga hubungan dengan mitra dihulu yang
                    menjadi supplier terbaik. Tidak hanya itu saja perdagangan
                    ditingkat hilir juga sangat diperhatikan agar kestabilan
                    harga menjadi seimbang. Sehingga supplier dan buyer
                    mendapatkan keekonomian yang saling menguntungkan.
                    <br /> Jaringan kerja ditingkat nasional terus dikembangkan
                    hingga minimal di tingkat kecamatan dan juga membangun
                    kerjasama bisnis yang difokuskan kepada China dan India.
                  </Typography>
                </CardBody>
              </Card>
            </div>
            <div className="flex justify-center items-center h-full">
              <Card className="w-full h-full border">
                <div color="blue-gray" className="relative h-[200px]">
                  <img
                    src="./assets/image-wpi-2.png"
                    alt="card-image"
                    className="w-full h-full"
                  />
                </div>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Kemitraan Logistik Rantai Pasok Dingin yang Mumpuni di
                    Bidangnya
                  </Typography>
                  <Typography className="text-justify">
                    Didukung oleh kemitraan logistic provider berkelas
                    Internasional yang bergerak dibidang perishable dan non
                    perishable yang terintegrasi, saat ini WPI yakin dalam hal
                    memberikan solusi terbaik kepada para mitranya dalam
                    melakukan kegiatan resourcing, supply, dan distribution.
                    <br />
                    Pemilih kemitraan yang selektif, dengan kriteria - kriteria
                    diantaranya adalah dukungan teknologi cold chain serta rekam
                    jejak dan pengalaman kerja menjadi perhatian bagi WPI
                    sehingga dapat mencapai visi dan misi perusahaan
                  </Typography>
                </CardBody>
              </Card>
            </div>
            <div className="flex justify-center items-center h-full">
              <Card className="w-full h-full border">
                <div color="blue-gray" className="relative h-[200px]">
                  <img
                    src="./assets/image-wpi-3.png"
                    alt="card-image"
                    className="w-full h-full"
                  />
                </div>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Tempat Bersinergi Para Ahli untuk Memberikan Komitmen
                    Tebaiknya
                  </Typography>
                  <Typography className="text-justify">
                    Sebagai tempat berusaha dalam mencari keuntungan perusahaan,
                    WPI juga harus bisa menjadi wadah profesional - profesional
                    yang ahli dibidang rantai pasok, rekayasa keuangan, sistem
                    informasi teknologi, operasional logistik yang juga
                    berkeinginan memberikan kontribusi yang terbaik untuk bangsa
                    dan negara.
                    <br /> Kami meyakini dengan sinergitas ini, maka komitmen
                    terbaik mereka akan berimbas kepada layanan perusahaan untuk
                    para mitra
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Content 2 */}
        <div className="container mx-auto grid xl:grid-cols-12 grid-cols-1 gap-6 lg:px-0 px-4 pt-6 lg:pt-0 ">
          <div className="lg:col-span-7 col-span-1 flex flex-col justify-start items-start">
            <div className="pb-5 lg:pb-0">
              <Typography
                variant="h3"
                className="text-[1.6rem] pr-4 lg:pr-0 lg:text-[2rem] !leading-8 text-start mb-6"
                style={{
                  fontFamily: "'M PLUS Rounded 1c', sans-serif",
                  fontWeight: 800,
                }}
              >
                Keunggulan Melakukan Perdagangan Melalui Warung Pangan Indonesia
              </Typography>
            </div>
            <div className="flex py-4 gap-3 md:gap-6">
              <span className="w-20 h-20">
                <img
                  src="./assets/check-product.png"
                  alt="img-certif"
                  className="h-auto w-full"
                />
              </span>
              <div className="w-full">
                <Typography
                  variant="lead"
                  className="text-[1.5rem] lg:pr-0 lg:text-[2rem] !leading-8 text-start"
                  style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    fontWeight: 800,
                  }}
                >
                  <b>Pasokan Produk Berkualitas</b>
                </Typography>
                <p className="text-justify pt-1 lg:pt-0">
                  Menyiapkan dan menyediakan produk lokal yang memiliki potensi
                  ekspor untuk dikembangkan baik untuk pasar domestik maupun
                  ekspor sesuai dengan standar industri komoditi pangan
                </p>
              </div>
            </div>

            <div className="flex py-4 gap-3 md:gap-6">
              <span className="w-20 h-20">
                <img
                  src="./assets/certification.png"
                  alt="img-certif"
                  className="h-auto w-full"
                />
              </span>
              <div className="w-full">
                <Typography
                  variant="lead"
                  className="text-[1.5rem] lg:pr-0 lg:text-[2rem] !leading-8 text-start"
                  style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    fontWeight: 800,
                  }}
                >
                  <b>Tersertifikasi Berkelas di Industri</b>
                </Typography>
                <p className="text-justify pt-1 lg:pt-0">
                  Memenuhi Standar industri komditi pangan GMP, HACCP (Hazzard
                  Analysis and Critical Control Points), BPOM dan Halal
                </p>
              </div>
            </div>

            <div className="flex py-4 gap-3 md:gap-6">
              <span className="w-20 h-20">
                <img
                  src="./assets/scm.png"
                  alt="img-certif"
                  className="h-auto w-full"
                />
              </span>
              <div className="w-full">
                <Typography
                  variant="lead"
                  className="text-[1.5rem] lg:pr-0 lg:text-[2rem] !leading-8 text-start"
                  style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    fontWeight: 800,
                  }}
                >
                  <b>Rekayasa Supply Chain</b>
                </Typography>
                <p className="text-justify pt-1 lg:pt-0">
                  Membantu para supplier maupun buyer untuk mendapatkan skema
                  supply chain yang efektif, efisien, ekonomis dan berkelanjutan
                  dengan memanfaatkan asset maupun prospek bisnis yang ada serta
                  dukungan B2B System Aggregator
                </p>
              </div>
            </div>
          </div>

          <div className=" lg:col-span-5 col-span-1 flex justify-center items-center">
            <img src="./assets/ipad.png" alt="image2" className="" />
          </div>
        </div>

        {/* Content 3 */}
        <div className="container mx-auto mb-6">
          <div className="my-10">
            <Typography
              className="xl:ml-2 lg:ml-4 md:ml-2 ml-6 flex justify-start"
              variant="h3"
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 800,
              }}
            >
              Cerita Mitra Warung Pangan Indonesia
            </Typography>
          </div>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-x-4 gap-y-12 h-full">
            <div className="flex justify-center items-center h-full px-4 md:px-0">
              <Card className="w-full h-full">
                <div color="blue-gray" className="relative h-[200px]">
                  <img
                    src="./assets/mitra-1.png"
                    alt="card-image"
                    className="w-full h-full"
                  />
                </div>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    Farhan Dwicahyo
                  </Typography>
                  <Typography className="mb-2 text-sm font-medium">
                    PT BPYD JAYA
                  </Typography>
                  <Typography className="text-justify">
                    WPI telah berhasil menyajikan beragam jenis komoditas dengan
                    harga yang terjangkau, sambil konsisten menjaga tingkat
                    kualitas yang unggul. Kesuksesan ini mencerminkan komitmen
                    yang kuat dari WPI untuk terus memberikan layanan yang tidak
                    hanya berkualitas tinggi tetapi juga terjangkau kepada
                    pelanggan setianya. Dalam upaya untuk memenuhi kebutuhan
                    konsumen dengan cara yang optimal, WPI secara terus-menerus
                    berusaha meningkatkan dan menyempurnakan portofolio
                    produknya agar dapat memberikan pengalaman belanja yang
                    memuaskan dan terpercaya.
                  </Typography>
                </CardBody>
              </Card>
            </div>
            <div className="flex justify-center items-center h-full px-4 md:px-0">
              <Card className="w-full h-full">
                <div color="blue-gray" className="relative h-[200px]">
                  <img
                    src="./assets/mitra-3.png"
                    alt="card-image"
                    className="w-full h-full"
                  />
                </div>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    Muhammad Rafli Akbar
                  </Typography>
                  <Typography className="mb-2 text-sm font-medium">
                    PT MAKMUR SEJAHTERA
                  </Typography>
                  <Typography className="text-justify">
                    WPI sukses menyediakan beragam komoditas dengan harga yang
                    terjangkau, sambil tetap mempertahankan standar kualitas
                    yang tinggi. Prestasi ini mencerminkan tekad WPI untuk
                    memberikan layanan berkualitas tinggi yang terjangkau kepada
                    pelanggannya.
                  </Typography>
                </CardBody>
              </Card>
            </div>
            <div className="flex justify-center items-center h-full px-4 md:px-0">
              <Card className="w-full h-full">
                <div color="blue-gray" className="relative h-[200px]">
                  <img
                    src="./assets/mitra-2.png"
                    alt="card-image"
                    className="w-full h-full"
                  />
                </div>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    Putra Fajar
                  </Typography>
                  <Typography className="mb-2 text-sm font-medium">
                    PT FAJAR
                  </Typography>
                  <Typography className="text-justify">
                    WPI telah berhasil menawarkan berbagai jenis komoditas
                    dengan harga yang terjangkau, sekaligus mempertahankan
                    tingkat kualitas yang unggul. Keberhasilan ini mencerminkan
                    komitmen WPI dalam menyediakan layanan yang berkualitas
                    tinggi dan terjangkau kepada para pelanggannya.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Content Image */}
        <div className="container mx-auto flex justify-center pb-16 py-4 px-4 md:px-0">
          <div className="overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <a href="/produk">
              <img
                src="./assets/banner.png"
                alt=""
                className="w-full rounded-lg"
              />
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
    </div>
  );
}
